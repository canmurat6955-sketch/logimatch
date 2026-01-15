'use server';

import { createClient } from '@/lib/supabase/server';
import { AddVehicleFormData, Vehicle } from '@/lib/types/vehicle';
import { revalidatePath } from 'next/cache';

import { Load } from '@/lib/types/load';

export async function getVehicles(): Promise<{ data: Vehicle[] | null, error: string | null }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: 'Unauthorized' };

    const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching vehicles (using mock):', error);
        // Fallthrough to mock
    }

    // --- MOCK FALLBACK (Demo Mode) ---
    if (!data || data.length === 0) {
        return {
            data: [
                { id: 'v1', owner_id: 'mock', plate_number: '34 VP 123', vehicle_type: 'Tır', capacity: '24 Ton', status: 'available', current_km: 124500, next_service_km: 125000, created_at: new Date().toISOString() },
                { id: 'v2', owner_id: 'mock', plate_number: '06 ANK 99', vehicle_type: 'Kamyon', capacity: '15 Ton', status: 'busy', current_km: 45000, next_service_km: 60000, created_at: new Date().toISOString() },
                { id: 'v3', owner_id: 'mock', plate_number: '35 IZM 35', vehicle_type: 'Kamyonet', capacity: '3.5 Ton', status: 'maintenance', current_km: 210100, next_service_km: 210000, created_at: new Date().toISOString() }
            ] as Vehicle[],
            error: null
        };
    }
    return { data: data as Vehicle[], error: null };
}

export async function getLoads(): Promise<{ data: Load[] | null, error: string | null }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: 'Unauthorized' };

    const { data, error } = await supabase
        .from('loads')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching loads (using mock):', error);
        // Fallthrough to mock
    }

    // --- MOCK FALLBACK (Demo Mode) ---
    if (!data || data.length === 0) {
        return {
            data: [
                { id: 'l1', owner_id: 'mock', origin: 'Istanbul', destination: 'Berlin', weight: 22, price: 85000, status: 'delivered', proof_url: 'https://placehold.co/600x400?text=Teslim+Kaniti', co2_emission: 2640, created_at: new Date().toISOString() },
                { id: 'l2', owner_id: 'mock', origin: 'Ankara', destination: 'Izmir', weight: 12, price: 15000, status: 'assigned', co2_emission: 420, created_at: new Date().toISOString() },
                { id: 'l3', owner_id: 'mock', origin: 'Bursa', destination: 'Lyon', weight: 18, price: 92000, status: 'open', co2_emission: 2800, created_at: new Date().toISOString() }
            ] as Load[],
            error: null
        };
    }

    return { data: data as Load[], error: null };
}

export async function addVehicle(formData: AddVehicleFormData): Promise<{ success: boolean, error: string | null }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const { error } = await supabase
        .from('vehicles')
        .insert({
            owner_id: user.id,
            plate_number: formData.plate_number,
            vehicle_type: formData.vehicle_type,
            capacity: formData.capacity,
            status: 'available'
        });

    if (error) {
        console.error('Error adding vehicle:', error);
        return { success: false, error: 'Failed to add vehicle' };
    }

    revalidatePath('/dashboard');
    return { success: true, error: null };
}

export async function getDashboardStats() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fallback if no user (dev mode bypass) or DB error
    if (!user) {
        return { vehicleCount: 12, activeJobs: 5, monthlyRevenue: 1250000 };
    }

    const { count: vehicleCount, error: vError } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', user.id);

    // If DB error or 0 vehicles, return demo stats
    if (vError || vehicleCount === 0) {
        return {
            vehicleCount: 12,
            activeJobs: 5,
            monthlyRevenue: 1250000
        };
    }

    // Get loads for stats
    const { data: loadsData } = await supabase
        .from('loads')
        .select('price, status')
        .eq('owner_id', user.id);

    // Cast to simple type since we only selected specific fields or use Load type if compatible
    const loads = (loadsData as { price: number; status: string }[]) || [];

    const activeJobs = loads.filter(l => l.status === 'assigned').length;
    const monthlyRevenue = loads.reduce((sum, l) => sum + (l.status === 'delivered' ? l.price : 0), 0);

    return {
        vehicleCount: vehicleCount || 0,
        activeJobs,
        monthlyRevenue
    };
}
