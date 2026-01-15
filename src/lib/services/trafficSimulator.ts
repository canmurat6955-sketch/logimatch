import { createClient } from "@/lib/supabase/client";

const ISTANBUL_BOUNDS = {
    minLat: 40.85,
    maxLat: 41.15,
    minLng: 28.60,
    maxLng: 29.30
};

export class TrafficSimulator {
    private intervalId: NodeJS.Timeout | null = null;
    private supabase = createClient();
    private activeVehicleIds: string[] = [];

    async start() {
        if (this.intervalId) return;

        // Fetch available vehicles to animate
        const { data: vehicles } = await this.supabase
            .from('vehicles')
            .select('id')
            .eq('status', 'active');

        if (!vehicles || vehicles.length === 0) return;
        this.activeVehicleIds = vehicles.map(v => v.id);

        console.log("🚦 Traffic Simulator Started for", this.activeVehicleIds.length, "vehicles.");

        // Update random vehicle every 2 seconds
        this.intervalId = setInterval(() => this.moveRandomVehicle(), 2000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("🛑 Traffic Simulator Stopped.");
        }
    }

    private async moveRandomVehicle() {
        if (this.activeVehicleIds.length === 0) return;

        const randomId = this.activeVehicleIds[Math.floor(Math.random() * this.activeVehicleIds.length)];

        // Slight movement (random walk)
        // In real app, this would follow a route. Here just random jitter for demo.
        const deltaLat = (Math.random() - 0.5) * 0.005;
        const deltaLng = (Math.random() - 0.5) * 0.005;

        // We ideally need current pos to add delta, but for now we'll just teleport within bounds if we don't fetch first
        // Optimization: Just mock typical Istanbul coords
        const lat = ISTANBUL_BOUNDS.minLat + Math.random() * (ISTANBUL_BOUNDS.maxLat - ISTANBUL_BOUNDS.minLat);
        const lng = ISTANBUL_BOUNDS.minLng + Math.random() * (ISTANBUL_BOUNDS.maxLng - ISTANBUL_BOUNDS.minLng);

        await this.supabase
            .from('vehicles')
            .update({
                last_location_lat: lat,
                last_location_lng: lng,
                last_location_updated_at: new Date().toISOString(),
                current_status: 'moving'
            })
            .eq('id', randomId);
    }
}

export const trafficSimulator = new TrafficSimulator();
