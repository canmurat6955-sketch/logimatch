export type LoadStatus = 'open' | 'assigned' | 'delivered';

export interface Load {
    id: string;
    owner_id: string;
    origin: string;
    destination: string;
    weight: number;
    price: number;
    status: LoadStatus;
    proof_url?: string; // e-POD
    co2_emission?: number; // Green Logistics (kg CO2)
    created_at: string;
}

export interface AddLoadFormData {
    origin: string;
    destination: string;
    weight: number;
    price: number;
}
