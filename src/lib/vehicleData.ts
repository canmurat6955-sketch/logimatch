export const VEHICLE_TYPES = [
    { id: 'tir', label: 'Tır (Çekici)' },
    { id: 'kamyon', label: 'Kamyon (On Teker/Kırkayak)' },
    { id: 'kamyonet', label: 'Kamyonet (Panelvan/Pick-up)' }
];

export const VEHICLE_BRANDS: Record<string, string[]> = {
    tir: [
        "Mercedes-Benz (Actros, Axor)",
        "Ford Trucks (F-MAX)",
        "Scania (R Serisi, S Serisi)",
        "Volvo (FH, FM)",
        "Renault Trucks (T Serisi)",
        "DAF (XF, CF)",
        "MAN (TGX, TGS)",
        "Iveco (S-Way, Stralis)"
    ],
    kamyon: [
        "Ford Trucks (Cargo)",
        "Mercedes-Benz (Atego, Axor)",
        "MAN (TGM, TGL)",
        "Isuzu (NPR, NQR)",
        "Mitsubishi Fuso (Canter)",
        "Otokar (Atlas)",
        "Iveco (Eurocargo)"
    ],
    kamyonet: [
        "Ford (Transit)",
        "Volkswagen (Crafter, Transporter)",
        "Fiat (Ducato, Doblo)",
        "Renault (Master, Trafic)",
        "Mercedes-Benz (Sprinter, Vito)",
        "Peugeot (Boxer)",
        "Citroen (Jumper)",
        "Iveco (Daily)"
    ]
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
