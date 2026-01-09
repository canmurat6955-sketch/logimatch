export type UserRole = 'vehicle_owner' | 'load_owner' | 'logistics_company';

export type Currency = 'TRY' | 'USD' | 'EUR';

export interface Dimension {
    length: number;
    width: number;
    height: number;
}

export interface Vehicle {
    id: string;
    plate: string;
    type: string; // Tır, Kamyon, Kamyonet
    cargoDimensions: Dimension;
    emptyWeight: number; // Ton
    maxWeight: number; // Ton
    status: 'active' | 'maintenance' | 'busy';
}

export interface Load {
    id: string;
    route: {
        from: string;
        to: string;
        distanceKm: number;
    };
    details: {
        weight: number;
        volume?: number;
        dimensions?: Dimension;
        type: string;
    };
    financial: {
        amount: number;
        currency: Currency;
    };
}
