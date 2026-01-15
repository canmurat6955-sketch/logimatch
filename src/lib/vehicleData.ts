export const VEHICLE_TYPES = [
    { id: 'tir', label: 'Tır (Çekici)' },
    { id: 'kamyon', label: 'Kamyon (On Teker/Kırkayak)' },
    { id: 'kamyonet', label: 'Kamyonet (Panelvan/Pick-up)' }
];

// 1. TIR (Çekici/Tow Truck) Models
export const TIR_DATA: Record<string, string[]> = {
    "BMC": ["Pro", "Tuğra"],
    "DAF": ["CF", "XF", "XG", "XG Plus"],
    "Ford Trucks": ["F-MAX", "F-Line", "Cargo"],
    "Iveco": ["S-Way", "Stralis", "Trakker"],
    "MAN": ["TGX", "TGS"],
    "Mercedes-Benz": ["Actros", "Axor", "Arocs"],
    "Renault Trucks": ["T Serisi", "Premium", "Magnum"],
    "Scania": ["S Serisi", "R Serisi", "G Serisi"],
    "Volvo": ["FH", "FM", "FMX"]
};

// 2. KAMYON (Rigid Truck) Models
export const KAMYON_DATA: Record<string, string[]> = {
    "BMC": ["Fatih", "Pro", "Tuğra"],
    "DAF": ["LF", "XF", "XFC"],
    "Ford Trucks": ["Cargo 1210", "Cargo 3226", "Trucks Serisi", "F-Line"],
    "Isuzu": ["NPR", "NQR", "N-WIDE", "TORA", "NKR", "NLR", "NNR"],
    "Iveco": ["EuroCargo", "Stralis", "Trakker", "T-Way", "65", "70", "72", "80"],
    "MAN": ["TGL", "TGS", "TGM"],
    "Mercedes-Benz": ["Atego", "Axor", "Actros", "Arocs"],
    "Mitsubishi Fuso": ["Canter 3.5B", "Canter 8B", "Canter 9B", "Canter 9BXL"],
    "Mitsubishi Temsa": ["FE", "L", "TF"],
    "Otokar": ["Atlas (Kısa Şasi)", "Atlas (Uzun Şasi)", "Atlas 3D"],
    "Renault Trucks": ["D Serisi", "K Serisi", "Midlum", "Premium"],
    "Scania": ["P Serisi", "G Serisi", "R Serisi"],
    "Volvo": ["FM", "FMX"]
};

// 3. KAMYONET (Van/Light Commercial) Models - Now detailed!
export const KAMYONET_DATA: Record<string, string[]> = {
    "Citroen": ["Jumper", "Berlingo"],
    "Dacia": ["Dokker", "Logan Pickup"],
    "DFM": ["Succe", "Rich"],
    "DFSK": ["C31", "C32"],
    "Fiat": ["Ducato", "Pratico", "Doblo", "Fiorino"],
    "Ford": ["Transit", "Transit Custom", "Ranger", "E-Transit", "Courier"],
    "GAZ": ["Gazelle", "Gazelle Next"],
    "Hyundai": ["H-100", "H-350", "Starex"],
    "Isuzu": ["D-Max"],
    "Iveco": ["Daily 35", "Daily 55", "Daily 70"],
    "JAC": ["T8", "X200"],
    "Kia": ["Bongo"],
    "MAN": ["TGE"],
    "Mercedes-Benz": ["Sprinter", "Vito", "Citan"],
    "Renault": ["Master", "Trafic", "Messenger"],
    "Tenax": ["C35", "C35D"],
    "Volkswagen": ["Crafter", "Transporter", "Caddy", "Amarok"]
};

export const TRAILER_TYPES = [
    { id: 'tenteli', label: 'Tenteli (Standart)' },
    { id: 'frigo', label: 'Frigo (Soğutuculu)' },
    { id: 'damper', label: 'Damperli (Hafriyat)' },
    { id: 'konteyner', label: 'Konteyner Taşıyıcı' },
    { id: 'lowbed', label: 'Lowbed (Ağır Nakliye)' },
    { id: 'tanker', label: 'Tanker (Sıvı)' },
    { id: 'acik', label: 'Açık Kasa' }
];

export const VEHICLE_FEATURES = [
    { id: 'lift', label: 'Liftli' },
    { id: 'adr', label: 'ADR (Tehlikeli Madde)' },
    { id: 'kayar_cati', label: 'Kayar Çatı' },
    { id: 'kayar_perde', label: 'Kayar Perde' },
    { id: 'askili', label: 'Askılı (Tekstil)' },
    { id: 'cift_kat', label: 'Çift Kat (Double Deck)' },
    { id: 'spanzet', label: 'Spanzetli' }
];
