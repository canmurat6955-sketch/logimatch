export type PredictionZone = {
    id: string;
    center: [number, number];
    radius: number; // in meters
    intensity: number; // 0.0 to 1.0 (Low to High Criticality)
    type: 'shortage' | 'surplus';
    regionName: string;
    description: string;
    trend: 'up' | 'down' | 'stable';
    predictedDemand: number; // e.g., 150 loads
    availableSupply: number; // e.g., 20 trucks
};

export const PREDICTION_TIMEFRAMES = [
    { id: '24h', label: '24 Saat' },
    { id: '3d', label: '3 Gün' },
    { id: '7d', label: '1 Hafta' },
] as const;

export type Timeframe = typeof PREDICTION_TIMEFRAMES[number]['id'];

// Mock Engine Logic
export function getRegionalPredictions(timeframe: Timeframe): PredictionZone[] {
    // Determine intensity modifier based on timeframe (longer timeframe = more uncertainty/variance)
    const modifier = timeframe === '24h' ? 1 : timeframe === '3d' ? 1.2 : 1.5;

    return [
        {
            id: 'zone-1',
            center: [41.0082, 28.9784], // Istanbul
            radius: 15000,
            intensity: 0.9,
            type: 'shortage',
            regionName: 'İstanbul Avrupa',
            description: 'İhracat çıkışlarında yoğunluk bekleniyor. Araç arzı kritik seviyeye düşebilir.',
            trend: 'up',
            predictedDemand: Math.round(450 * modifier),
            availableSupply: Math.round(120 * modifier),
        },
        {
            id: 'zone-2',
            center: [40.99, 29.1], // Istanbul Asia (Gebze ind.)
            radius: 12000,
            intensity: 0.8,
            type: 'shortage',
            regionName: 'Gebze/Kocaeli',
            description: 'Sanayi bölgesinden Anadolu\'ya sevkiyat artışı.',
            trend: 'up',
            predictedDemand: Math.round(300 * modifier),
            availableSupply: Math.round(150 * modifier),
        },
        {
            id: 'zone-3',
            center: [36.8969, 30.7133], // Antalya
            radius: 20000,
            intensity: 0.6,
            type: 'surplus',
            regionName: 'Antalya',
            description: 'Sebze/Meyve sezonu öncesi araç yığılması.',
            trend: 'stable',
            predictedDemand: Math.round(100 * modifier),
            availableSupply: Math.round(400 * modifier),
        },
        {
            id: 'zone-4',
            center: [38.4237, 27.1428], // Izmir
            radius: 14000,
            intensity: 0.4,
            type: 'shortage',
            regionName: 'İzmir Liman',
            description: 'Liman çıkışlarında %15 artış öngörülüyor.',
            trend: 'down',
            predictedDemand: Math.round(200 * modifier),
            availableSupply: Math.round(220 * modifier),
        },
        {
            id: 'zone-5',
            center: [39.9334, 32.8597], // Ankara
            radius: 18000,
            intensity: 0.2,
            type: 'surplus',
            regionName: 'Ankara Lojistik Üssü',
            description: 'Dönüş yükü bekleyen araç fazlalığı.',
            trend: 'stable',
            predictedDemand: Math.round(150 * modifier),
            availableSupply: Math.round(350 * modifier),
        }
    ];
}
