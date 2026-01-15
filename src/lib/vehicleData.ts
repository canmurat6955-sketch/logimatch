export const VEHICLE_TYPES = [
    { id: 'tir', label: 'Tır (Çekici)' },
    { id: 'kamyon', label: 'Kamyon (On Teker/Kırkayak)' },
    { id: 'kamyonet', label: 'Kamyonet (Panelvan/Pick-up)' }
];

// Complex structure for Heavy Vehicles (Brand -> Models[])
export const HEAVY_VEHICLE_DATA: Record<string, string[]> = {
    "BMC": ["Pro", "Tuğra"],
    "DAF": ["CF", "XF", "XG", "XG Plus"],
    "Ford Trucks": ["Cargo", "F-Line", "F-Max"],
    "Iveco": ["Stralis", "S-Way", "Trakker", "X-Way"],
    "MAN": ["TGS", "TGX"],
    "MAZ": ["4x2", "EURO 5"],
    "Mercedes-Benz": ["Actros", "Arocs", "Axor"],
    "Renault Trucks": ["C", "D", "Premium", "T"],
    "Scania": ["G", "R", "S"],
    "Volvo": ["FH", "FM"]
};

// Simple list for Vans/Light Trucks (Brand only for now, unless specific models needed later)
export const LIGHT_VEHICLE_BRANDS = [
    "Ford (Transit)",
    "Volkswagen (Crafter, Transporter)",
    "Fiat (Ducato, Doblo)",
    "Renault (Master, Trafic)",
    "Mercedes-Benz (Sprinter, Vito)",
    "Peugeot (Boxer)",
    "Citroen (Jumper)",
    "Iveco (Daily)"
];

export const TRAILER_TYPES = [
    { id: 'tenteli', label: 'Tenteli (Standart)' },
    { id: 'frigo', label: 'Frigo (Soğutuculu)' },
    { id: 'damper', label: 'Damperli (Hafriyat)' },
    { id: 'konteyner', label: 'Konteyner Taşıyıcı' },
    { id: 'lowbed', label: 'Lowbed (Ağır Nakliye)' },
    { id: 'tanker', label: 'Tanker (Sıvı)' },
    { id: 'acik', label: 'Açık Kasa' }
];
