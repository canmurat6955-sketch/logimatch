export const VEHICLE_TYPES = [
    { id: 'tir', label: 'Tır (Çekici)' },
    { id: 'kamyon', label: 'Kamyon (On Teker/Kırkayak)' },
    { id: 'kamyonet', label: 'Kamyonet (Panelvan/Pick-up)' }
];

// 1. TIR (Çekici/Tow Truck) Models
export const TIR_DATA: Record<string, string[]> = {
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

// 2. KAMYON (Rigid Truck) Models - User providing data now
export const KAMYON_DATA: Record<string, string[]> = {
    "BMC": ["Fatih", "Pro", "Tuğra"],
    // Other brands to be filled by user request, keeping basics for now
    "Ford Trucks": ["Cargo", "1846T", "2520", "3230", "F-Line"],
    "Mercedes-Benz": ["Atego", "Axor", "Actros (On Teker)"],
    "MAN": ["TGL", "TGM", "TGS"],
    "Isuzu": ["NPR", "NQR", "F-Series"],
    "Mitsubishi Fuso": ["Canter"],
    "Otokar": ["Atlas"],
    "Iveco": ["Eurocargo"]
};

// 3. KAMYONET (Van/Light Truck) - Brand names usually suffice
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
