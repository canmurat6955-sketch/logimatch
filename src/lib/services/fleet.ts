// import { Vehicle } from './transport';

export interface InsurancePolicy {
    id: string;
    vehiclePlate: string;
    type: 'Traffic Insurance' | 'Kasko' | 'Other';
    provider: string;
    policyNumber?: string;
    startDate: string;
    endDate: string;
    premium: number;
    coverage: string; // e.g., "Full Coverage", "Third Party"
    status: 'active' | 'expired' | 'expiring_soon';
}

export interface TireRecord {
    id: string;
    vehiclePlate: string;
    brand: 'Good Year' | 'Michelin' | 'Lassa' | 'Other';
    model: string;
    size: string; // e.g., "315/70 R22.5"
    purchaseDate: string;
    purchasePrice: number;
    supplier: string; // e.g. "Emre Lastik"
    installKm: number;
    currentKm: number;
    estimatedLifeKm: number;
    position: 'Front-Left' | 'Front-Right' | 'Rear-Left' | 'Rear-Right' | 'Trailer';
    health: 'Good' | 'Warning' | 'Critical';
}

export interface FuelRecord {
    id: string;
    vehiclePlate: string;
    date: string;
    amount: number; // Liters
    cost: number; // TL
    odometer: number; // KM
    location: string;
    fullTank: boolean;
}

import { createClient } from '../supabase/client';

export class FleetService {
    private static instance: FleetService;
    private supabase = createClient();

    private constructor() { }

    public static getInstance(): FleetService {
        if (!FleetService.instance) {
            FleetService.instance = new FleetService();
        }
        return FleetService.instance;
    }

    public async getInsurancePolicies(): Promise<InsurancePolicy[]> {
        const { data, error } = await this.supabase
            .from('insurance_policies')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching policies:', error);
            return [];
        }

        return data.map((p: any) => ({
            id: p.id,
            vehiclePlate: p.vehicle_plate,
            type: p.type as any,
            provider: p.provider,
            policyNumber: p.policy_number,
            startDate: p.start_date,
            endDate: p.end_date,
            premium: p.premium,
            coverage: p.coverage,
            status: p.status as any
        }));
    }

    public async addInsurancePolicy(policy: Omit<InsurancePolicy, 'id' | 'status'>): Promise<InsurancePolicy> {
        const { data, error } = await this.supabase
            .from('insurance_policies')
            .insert({
                vehicle_plate: policy.vehiclePlate,
                type: policy.type,
                provider: policy.provider,
                policy_number: policy.policyNumber,
                start_date: policy.startDate,
                end_date: policy.endDate,
                premium: policy.premium,
                coverage: policy.coverage,
                status: 'active'
            })
            .select()
            .single();

        if (error) throw error;

        return {
            id: data.id,
            vehiclePlate: data.vehicle_plate,
            type: data.type,
            provider: data.provider,
            policyNumber: data.policy_number,
            startDate: data.start_date,
            endDate: data.end_date,
            premium: data.premium,
            coverage: data.coverage,
            status: data.status
        };
    }

    public async getTireRecords(): Promise<TireRecord[]> {
        const { data, error } = await this.supabase
            .from('tire_records')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching tire records:', error);
            return [];
        }

        return data.map((t: any) => ({
            id: t.id,
            vehiclePlate: t.vehicle_plate,
            brand: t.brand as any,
            model: t.model,
            size: t.size,
            purchaseDate: t.purchase_date,
            purchasePrice: t.purchase_price,
            supplier: t.supplier,
            installKm: t.install_km,
            currentKm: t.current_km,
            estimatedLifeKm: t.estimated_life_km,
            position: t.position as any,
            health: t.health as any
        }));
    }

    public async addTireRecord(record: Omit<TireRecord, 'id'>): Promise<TireRecord> {
        const { data, error } = await this.supabase
            .from('tire_records')
            .insert({
                vehicle_plate: record.vehiclePlate,
                brand: record.brand,
                model: record.model,
                size: record.size,
                purchase_date: record.purchaseDate,
                purchase_price: record.purchasePrice,
                supplier: record.supplier,
                install_km: record.installKm,
                current_km: record.currentKm,
                estimated_life_km: record.estimatedLifeKm,
                position: record.position,
                health: record.health
            })
            .select()
            .single();

        if (error) throw error;

        return {
            id: data.id,
            vehiclePlate: data.vehicle_plate,
            brand: data.brand,
            model: data.model,
            size: data.size,
            purchaseDate: data.purchase_date,
            purchasePrice: data.purchase_price,
            supplier: data.supplier,
            installKm: data.install_km,
            currentKm: data.current_km,
            estimatedLifeKm: data.estimated_life_km,
            position: data.position,
            health: data.health
        };
    }

    public async getFuelRecords(plate?: string): Promise<FuelRecord[]> {
        let query = this.supabase
            .from('fuel_records')
            .select('*')
            .order('odometer', { ascending: false });

        if (plate) {
            query = query.eq('vehicle_plate', plate);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching fuel records:', error);
            return [];
        }

        return data.map((f: any) => ({
            id: f.id,
            vehiclePlate: f.vehicle_plate,
            date: f.date,
            amount: f.amount,
            cost: f.cost,
            odometer: f.odometer,
            location: f.location,
            fullTank: f.full_tank
        }));
    }

    public async addFuelRecord(record: Omit<FuelRecord, 'id'>): Promise<FuelRecord> {
        const { data, error } = await this.supabase
            .from('fuel_records')
            .insert({
                vehicle_plate: record.vehiclePlate,
                date: record.date,
                amount: record.amount,
                cost: record.cost,
                odometer: record.odometer,
                location: record.location,
                full_tank: record.fullTank
            })
            .select()
            .single();

        if (error) throw error;

        return {
            id: data.id,
            vehiclePlate: data.vehicle_plate,
            date: data.date,
            amount: data.amount,
            cost: data.cost,
            odometer: data.odometer,
            location: data.location,
            fullTank: data.full_tank
        };
    }

    public async calculateConsumption(plate: string): Promise<{ average: number, last: number, trend: 'up' | 'down' | 'stable' }> {
        const records = await this.getFuelRecords(plate);

        if (records.length < 2) return { average: 0, last: 0, trend: 'stable' };

        // Calculate latest consumption
        const lastRec = records[0];
        const prevRec = records[1];
        const dist = lastRec.odometer - prevRec.odometer;
        const lastConsumption = dist > 0 ? (lastRec.amount / dist) * 100 : 0;

        // Calculate Average logic remains...
        let totalDist = 0;
        let totalFuel = 0;
        for (let i = 0; i < records.length - 1; i++) {
            const curr = records[i];
            const next = records[i + 1];
            if (curr.fullTank && next.fullTank) {
                totalDist += (curr.odometer - next.odometer);
                totalFuel += curr.amount;
            }
        }
        const average = totalDist > 0 ? (totalFuel / totalDist) * 100 : 0;

        return {
            average,
            last: lastConsumption,
            trend: lastConsumption > average * 1.05 ? 'up' : lastConsumption < average * 0.95 ? 'down' : 'stable'
        };
    }

    // Benchmark Calculation: Cost per 1000 KM
    public getTireBenchmark(): Promise<{ brand: string, costPer1k: number, lifespan: number }[]> {
        // Still mock for now, or fetch from a 'benchmarks' table if it existed
        return Promise.resolve([
            { brand: 'Good Year', costPer1k: 58, lifespan: 250000 },
            { brand: 'Michelin', costPer1k: 65, lifespan: 280000 },
            { brand: 'Lassa', costPer1k: 72, lifespan: 180000 },
            { brand: 'Pirelli', costPer1k: 68, lifespan: 210000 },
        ]);
    }
}

