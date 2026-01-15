export interface Driver {
    id: string;
    owner_id: string;
    full_name: string;
    license_type: string;
    status: 'active' | 'leave' | 'terminated';
    safety_score?: number; // 0-100
    current_vehicle_id?: string | null;
    created_at: string;
}

export interface Vehicle {
    id: string;
    owner_id: string;
    plate_number: string;
    brand_model: string;
    type: 'truck' | 'van' | 'pickup';
    status: 'active' | 'maintenance' | 'inactive';
    current_km?: number;
    next_service_km?: number;
    insurance_expiry?: string;
    last_location_lat?: number;
    last_location_lng?: number;
    last_location_updated_at?: string;
    current_status?: 'moving' | 'parked' | 'offline';
    created_at: string;
}

export type ExpenseCategory = 'tire' | 'maintenance' | 'insurance' | 'food' | 'fuel' | 'other';

export interface ExpenseMetadata {
    // Tire
    tire_brand?: string;
    tire_serial?: string;
    lifespan_km?: number;

    // Maintenance
    provider?: string;
    parts?: string[];

    // Fuel
    liters_per_100km?: number;
    station_name?: string;
    liters_bought?: number;
}

export interface Expense {
    id: string;
    owner_id: string;
    vehicle_id?: string;
    driver_id?: string;
    amount: number;
    date: string;
    category: ExpenseCategory;
    metadata: ExpenseMetadata;
    created_at: string;
}

export interface AddDriverFormData {
    full_name: string;
    license_type: string;
}

export interface AddExpenseFormData {
    vehicle_id?: string;
    driver_id?: string;
    amount: number;
    date: string;
    category: ExpenseCategory;
    metadata: ExpenseMetadata;
}
