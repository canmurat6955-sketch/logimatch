'use server';

import { createClient } from '@/lib/supabase/server';
import { AddDriverFormData, AddExpenseFormData, Driver, Expense, Vehicle } from '@/lib/types/resource';
import { revalidatePath } from 'next/cache';

// --- DRIVERS ---

export async function getDrivers(): Promise<Driver[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
        .from('drivers')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

    if (!data || data.length === 0) {
        return [
            { id: 'd1', owner_id: 'mock', full_name: 'Ahmet Yılmaz', license_type: 'CE', status: 'active', safety_score: 95, created_at: new Date().toISOString() },
            { id: 'd2', owner_id: 'mock', full_name: 'Mehmet Demir', license_type: 'D', status: 'active', safety_score: 65, created_at: new Date().toISOString() },
            { id: 'd3', owner_id: 'mock', full_name: 'Ali Kaya', license_type: 'CE', status: 'leave', safety_score: 78, created_at: new Date().toISOString() }
        ] as Driver[];
    }

    return (data as Driver[]) || [];
}

export async function addDriver(formData: AddDriverFormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const { error } = await supabase.from('drivers').insert({
        owner_id: user.id,
        full_name: formData.full_name,
        license_type: formData.license_type,
        status: 'active'
    });

    if (error) {
        console.error('Add driver error:', error);
        return { success: false, error: 'Failed to add driver' };
    }

    revalidatePath('/dashboard/drivers');
    return { success: true };
}

// --- EXPENSES ---

export async function addExpense(formData: AddExpenseFormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const { error } = await supabase.from('expenses').insert({
        owner_id: user.id,
        vehicle_id: formData.vehicle_id,
        driver_id: formData.driver_id,
        amount: formData.amount,
        date: formData.date,
        category: formData.category,
        metadata: formData.metadata
    });

    if (error) {
        console.error('Add expense error:', error);
        return { success: false, error: 'Failed to add expense' };
    }

    revalidatePath('/dashboard/reports');
    return { success: true };
}

// --- REPORTS / ANALYTICS ---

export async function getReportStats() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Fetch basic data with explicit types
    const { data: expenses } = await supabase.from('expenses').select('*').eq('owner_id', user.id);
    const { data: vehicles } = await supabase.from('vehicles').select('*').eq('owner_id', user.id);
    // Needed for Fuel Benchmark (Driver names)
    // const { data: drivers } = await supabase.from('drivers').select('*').eq('owner_id', user.id); // Not currently used in logic but good to have if needed

    const expList = (expenses as Expense[]) || [];
    const vehicleList = (vehicles as Vehicle[]) || [];

    // --- MOCK DATA FALLBACK (If DB is empty/unreachable) ---
    if (!expList || expList.length === 0) {
        return {
            alerts: [
                { type: 'insurance', vehicle: '34 AB 123', daysLeft: 12 },
                { type: 'insurance', vehicle: '06 SC 999', daysLeft: 5 }
            ],
            tireBenchmarks: [
                { brand: 'Lassa', cost: 125000 },
                { brand: 'Michelin', cost: 180000 },
                { brand: 'Petlas', cost: 95000 }
            ],
            fuelBenchmarks: [
                { name: '34 AB 123', avgConsumption: 32.5 },
                { name: '06 CD 456', avgConsumption: 34.2 },
                { name: '35 EF 789', avgConsumption: 29.8 }
            ],
            expenseBreakdown: [
                { category: 'fuel', amount: 450000 },
                { category: 'tire', amount: 125000 },
                { category: 'maintenance', amount: 85000 },
                { category: 'insurance', amount: 65000 },
                { category: 'food', amount: 42000 }
            ]
        };
    }

    // 1. Asset Alerts (Insurance check & KM Maintenance)
    const today = new Date();
    const alerts: { type: string; vehicle: string; daysLeft?: number; kmLeft?: number }[] = [];

    vehicleList.forEach((v) => {
        // Insurance Check
        const daysToIns = v.insurance_expiry ? Math.ceil((new Date(v.insurance_expiry).getTime() - today.getTime()) / (1000 * 3600 * 24)) : null;
        if (daysToIns !== null && daysToIns < 30) {
            alerts.push({ type: 'insurance', vehicle: v.plate_number, daysLeft: daysToIns });
        }

        // Predictive Maintenance (KM Check)
        if (v.current_km && v.next_service_km) {
            const kmLeft = v.next_service_km - v.current_km;
            if (kmLeft < 1000) {
                alerts.push({ type: 'maintenance', vehicle: v.plate_number, kmLeft });
            }
        }
    });

    // 2. Tire Benchmark (Brand vs Cost)
    // Group expenses by category 'tire' and metadata.tire_brand
    const tireStats: Record<string, number> = {};
    expList.filter(e => e.category === 'tire').forEach(e => {
        const brand = e.metadata?.tire_brand || 'Unknown';
        tireStats[brand] = (tireStats[brand] || 0) + e.amount;
    });

    // 3. Fuel Efficiency Benchmark (L/100km per Vehicle/Driver)
    // We display the AVERAGE reported L/100km for each vehicle
    // Use a map: VehiclePlate -> { sumL100: number, count: number }
    const fuelStatsMap: Record<string, { sumL100: number, count: number }> = {};

    expList.filter(e => e.category === 'fuel' && e.metadata?.liters_per_100km).forEach(e => {
        // Resolve plate name from vehicle_id
        const vehicle = vehicleList.find(v => v.id === e.vehicle_id);
        const name = vehicle ? vehicle.plate_number : 'Unknown Vehicle';

        if (!fuelStatsMap[name]) fuelStatsMap[name] = { sumL100: 0, count: 0 };
        fuelStatsMap[name].sumL100 += (e.metadata.liters_per_100km || 0);
        fuelStatsMap[name].count += 1;
    });

    const fuelBenchmarks = Object.entries(fuelStatsMap).map(([name, stat]) => ({
        name,
        avgConsumption: Number((stat.sumL100 / stat.count).toFixed(1))
    }));


    // 4. General Expense Breakdown (Pie Chart data)
    const breakdown: Record<string, number> = {};
    expList.forEach(e => {
        breakdown[e.category] = (breakdown[e.category] || 0) + e.amount;
    });

    return {
        alerts,
        tireBenchmarks: Object.entries(tireStats).map(([brand, cost]) => ({ brand, cost })),
        fuelBenchmarks,
        expenseBreakdown: Object.entries(breakdown).map(([category, amount]) => ({ category, amount }))
    };
}
