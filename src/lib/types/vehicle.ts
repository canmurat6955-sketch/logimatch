
export type VehicleStatus = 'available' | 'in_transit' | 'maintenance';

export interface Vehicle {
    id: string;
    owner_id: string;
    plate_number: string;
    vehicle_type: string;
    capacity: string;
    status: 'available' | 'busy' | 'maintenance';
    current_km?: number;
    next_service_km?: number;
    insurance_expiry?: string;
    created_at: string;
}

export type AddVehicleFormData = {
    plate_number: string;
    vehicle_type: string;
    capacity: string;
}
