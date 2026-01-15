import { createClient } from '../supabase/client';
import { TransportService, MockLoad } from './transport';

export class SupabaseTransportService implements TransportService {
    private static instance: SupabaseTransportService;
    private supabase = createClient();

    private constructor() { }

    public static getInstance(): SupabaseTransportService {
        if (!SupabaseTransportService.instance) {
            SupabaseTransportService.instance = new SupabaseTransportService();
        }
        return SupabaseTransportService.instance;
    }

    public async getLoads(): Promise<MockLoad[]> {
        const { data, error } = await this.supabase
            .from('loads')
            .select(`
                *,
                vehicle:vehicles(*),
                driver:profiles!vehicle_owner_id(*) 
            `);

        if (error) {
            console.error('Supabase fetch error:', error);
            return [];
        }

        // Map Supabase data to our MockLoad interface
        // Note: Real DB schema might differ, this is a mapping layer.
        return data.map((load: any) => ({
            id: load.id,
            origin: load.origin,
            destination: load.destination,
            status: load.status,
            coordinates: [load.lat || 48.0, load.lng || 11.0], // Fallback if no coord
            eta: load.eta || 'TBD',
            vehicle: load.vehicle?.plate_number || 'Unknown',
            co2: Math.floor(Math.random() * 200) + 50, // Mock calculation based on distance
            tachograph: {
                status: 'driving', // Default, real logic needed
                remainingDaily: '4h 00m',
                dailyDriven: '5h 00m',
                dailyLimit: '9h 00m',
                nextRestRequired: '18:00',
            },
            driver: {
                name: load.driver?.full_name || 'Unknown Driver',
                phone: load.driver?.phone || '+90 555 000 00 00',
                rating: 4.8,
                tripsCompleted: 100
            },
            cargo: {
                description: load.cargo_description || 'General Cargo',
                weight: `${load.weight_kg / 1000} Ton`,
                type: load.cargo_type || 'Standard',
                pallets: load.pallet_count || 33
            },
            documents: {
                pod: false,
                cmr: false,
                customs: false
            }
        }));
    }

    public async getLoadById(id: string): Promise<MockLoad | undefined> {
        // Implementation similar to getLoads but for single ID
        const { data, error } = await this.supabase
            .from('loads')
            .select(`
                *,
                vehicle:vehicles(*),
                driver:profiles!vehicle_owner_id(*)
            `)
            .eq('id', id)
            .single();

        if (error || !data) return undefined;

        return {
            id: data.id,
            origin: data.origin,
            destination: data.destination,
            status: data.status,
            coordinates: [data.lat || 48.0, data.lng || 11.0],
            eta: data.eta || 'TBD',
            vehicle: data.vehicle?.plate_number || 'Unknown',
            co2: Math.floor(Math.random() * 200) + 50,
            tachograph: {
                status: 'driving',
                remainingDaily: '4h 00m',
                dailyDriven: '5h 00m',
                dailyLimit: '9h 00m',
                nextRestRequired: '18:00',
            },
            driver: {
                name: data.driver?.full_name || 'Unknown Driver',
                phone: data.driver?.phone || '+90 555 000 00 00',
                rating: 4.8,
                tripsCompleted: 100
            },
            cargo: {
                description: data.cargo_description || 'General Cargo',
                weight: `${data.weight_kg / 1000} Ton`,
                type: data.cargo_type || 'Standard',
                pallets: data.pallet_count || 33
            },
            documents: {
                pod: false,
                cmr: false,
                customs: false
            }
        };
    }

    public async getNotifications(): Promise<any[]> {
        // 1. Fetch User Notifications
        const { data: notifs, error: notifError } = await this.supabase
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });

        if (notifError) console.error('Error fetching notifications:', notifError);

        // 2. Fetch Global Broadcasts
        const { data: broadcasts, error: broadcastError } = await this.supabase
            .from('broadcasts')
            .select('*')
            .order('created_at', { ascending: false });

        if (broadcastError) console.error('Error fetching broadcasts:', broadcastError);

        // 3. Map Broadcasts to Notification Interface
        const broadcastNotifs = (broadcasts || []).map((b: any) => ({
            id: b.id,
            user_id: 'global',
            title: b.title,
            message: b.message,
            type: 'broadcast',
            is_read: false, // Broadcasts are always "unread" unless tracked separately
            created_at: b.created_at
        }));

        const userNotifs = notifs || [];

        // 4. Merge and Sort
        return [...broadcastNotifs, ...userNotifs].sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    public async markNotificationAsRead(id: string): Promise<void> {
        const { error } = await this.supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);

        if (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    }
}
