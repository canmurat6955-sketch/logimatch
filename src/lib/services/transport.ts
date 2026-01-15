// import { Vehicle, Load, TachographStatus } from '../types/vehicle';

// Extended Types for our Mock Service
export interface MockLoad {
    id: string;
    origin: string;
    destination: string;
    status: 'pending' | 'in_transit' | 'delivered' | 'resting';
    coordinates: [number, number];
    eta: string;
    vehicle: string;
    co2: number; // kg saved or emitted
    tachograph: {
        status: 'driving' | 'resting' | 'break';
        remainingDaily: string;
        dailyDriven: string;
        dailyLimit: string;
        nextRestRequired: string;
    };
    // New Fields for Detail Panel
    driver: {
        name: string;
        phone: string;
        rating: number; // 0-5
        tripsCompleted: number;
        avatarUrl?: string;
    };
    cargo: {
        description: string;
        weight: string; // e.g. "24.5 Ton"
        type: string; // e.g. "Palletized"
        pallets: number;
        temperature?: string; // e.g. "+4°C" for reefer
    };
    documents: {
        pod: boolean; // Proof of Delivery
        cmr: boolean;
        customs: boolean;
    };
    alert?: {
        type: 'excess_stop' | 'route_deviation';
        severity: 'high' | 'medium';
        message: string;
    };
}

// Extended Types for our Mock Service
export interface TransportService {
    getLoads(): Promise<MockLoad[]>;
    getLoadById(id: string): Promise<MockLoad | undefined>;
}

export class MockTransportService implements TransportService {
    private static instance: MockTransportService;
    private loads: MockLoad[] = [];

    private constructor() {
        this.generateMockLoads();
    }

    public static getInstance(): MockTransportService {
        if (!MockTransportService.instance) {
            MockTransportService.instance = new MockTransportService();
        }
        return MockTransportService.instance;
    }

    private generateMockLoads() {
        this.loads = [
            {
                id: 'L-6612',
                origin: 'Ankara, TR',
                destination: 'Berlin, DE',
                status: 'resting',
                coordinates: [41.0082, 28.9784],
                eta: '3d 2h',
                vehicle: '06 TR 999',
                co2: 0,
                tachograph: {
                    status: 'resting',
                    remainingDaily: '8h 00m',
                    dailyDriven: '1h 00m',
                    dailyLimit: '9h 00m',
                    nextRestRequired: 'NOW',
                },
                driver: {
                    name: 'Osman Vural',
                    phone: '+90 532 999 88 77',
                    rating: 3.9,
                    tripsCompleted: 45
                },
                cargo: {
                    description: 'Endüstriyel Makine',
                    weight: '12.0 Ton',
                    type: 'Standart',
                    pallets: 12
                },
                documents: {
                    pod: false,
                    cmr: true,
                    customs: true
                },
                alert: {
                    type: 'excess_stop',
                    severity: 'high',
                    message: '45 dk üzeri plansız duruş'
                }
            },
            {
                id: 'L-8821',
                origin: 'Istanbul, TR',
                destination: 'Munich, DE',
                status: 'in_transit',
                coordinates: [48.1351, 11.5820], // Near Munich
                eta: '2d 4h',
                vehicle: '34 AB 123',
                co2: 156,
                tachograph: {
                    status: 'driving',
                    remainingDaily: '2h 15m',
                    dailyDriven: '6h 45m',
                    dailyLimit: '9h 00m',
                    nextRestRequired: '17:30',
                },
                driver: {
                    name: 'Ahmet Yılmaz',
                    phone: '+90 532 123 45 67',
                    rating: 4.8,
                    tripsCompleted: 142
                },
                cargo: {
                    description: 'Tekstil Hammaddesi',
                    weight: '21.4 Ton',
                    type: 'Parsiyel',
                    pallets: 18
                },
                documents: {
                    pod: false,
                    cmr: true,
                    customs: true
                }
            },
            {
                id: 'L-9932',
                origin: 'Bursa, TR',
                destination: 'London, UK',
                status: 'resting',
                coordinates: [48.8566, 2.3522], // Paris (resting)
                eta: '3d 12h',
                vehicle: '16 CD 456',
                co2: 245,
                tachograph: {
                    status: 'resting',
                    remainingDaily: '0h 00m',
                    dailyDriven: '8h 55m',
                    dailyLimit: '9h 00m',
                    nextRestRequired: 'NOW',
                },
                driver: {
                    name: 'Mehmet Demir',
                    phone: '+90 533 987 65 43',
                    rating: 4.9,
                    tripsCompleted: 89
                },
                cargo: {
                    description: 'Otomotiv Yedek Parça',
                    weight: '16.2 Ton',
                    type: 'Komple Tır',
                    pallets: 24,
                    temperature: 'N/A'
                },
                documents: {
                    pod: false,
                    cmr: true,
                    customs: false
                }
            },
            {
                id: 'L-7741',
                origin: 'Izmir, TR',
                destination: 'Milan, IT',
                status: 'in_transit',
                coordinates: [45.4642, 9.1900], // Milan
                eta: '5h 30m',
                vehicle: '35 EF 789',
                co2: 89,
                tachograph: {
                    status: 'driving',
                    remainingDaily: '4h 10m',
                    dailyDriven: '4h 50m',
                    dailyLimit: '9h 00m',
                    nextRestRequired: '19:45',
                },
                driver: {
                    name: 'Ali Kaya',
                    phone: '+90 555 111 22 33',
                    rating: 4.7,
                    tripsCompleted: 215
                },
                cargo: {
                    description: 'Kuru Gıda (İncir)',
                    weight: '23.0 Ton',
                    type: 'Komple Tır',
                    pallets: 33,
                    temperature: '+18°C'
                },
                documents: {
                    pod: false,
                    cmr: true,
                    customs: true
                }
            },
            {
                id: 'L-5529',
                origin: 'Antalya, TR',
                destination: 'Vienna, AT',
                status: 'in_transit',
                coordinates: [42.6977, 23.3219], // Sofia
                eta: '1d 18h',
                vehicle: '07 GH 890',
                co2: 110,
                tachograph: {
                    status: 'driving',
                    remainingDaily: '3h 30m',
                    dailyDriven: '5h 30m',
                    dailyLimit: '9h 00m',
                    nextRestRequired: '20:15',
                },
                driver: {
                    name: 'Hasan Yılmaz',
                    phone: '+90 536 789 01 23',
                    rating: 4.5,
                    tripsCompleted: 65
                },
                cargo: {
                    description: 'Taze Sebze',
                    weight: '19.5 Ton',
                    type: 'Frigo',
                    pallets: 26,
                    temperature: '+4°C'
                },
                documents: {
                    pod: false,
                    cmr: true,
                    customs: true
                },
                alert: {
                    type: 'route_deviation',
                    severity: 'high',
                    message: 'Rota dışına çıkıldı (Sofia)'
                }
            }
        ];
    }

    public getLoads(): Promise<MockLoad[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.loads]);
            }, 300);
        });
    }

    public getLoadById(id: string): Promise<MockLoad | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.loads.find(l => l.id === id));
            }, 200);
        });
    }
}
