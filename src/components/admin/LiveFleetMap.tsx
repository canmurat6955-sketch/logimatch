"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("@/components/map/MapComponent"), { ssr: false });
import { createClient } from "@/lib/supabase/client";
import { Vehicle } from "@/lib/types/resource";
import { MockLoad } from "@/lib/services/transport";
import { trafficSimulator } from "@/lib/services/trafficSimulator";
import { LucidePlay, LucideSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LiveFleetMap() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [simulating, setSimulating] = useState(false);
    const supabase = createClient();

    // Adapter: Convert Database Vehicle -> Map Load Interface
    const mapVehiclesToLoads = (vehs: Vehicle[]): MockLoad[] => {
        return vehs
            .filter(v => v.last_location_lat && v.last_location_lng) // Only show located vehicles
            .map(v => ({
                id: v.id,
                origin: "Istanbul", // Placeholder
                destination: "Ankara", // Placeholder
                status: v.current_status === 'moving' ? 'in_transit' : 'resting',
                coordinates: [v.last_location_lat!, v.last_location_lng!] as [number, number],
                eta: "2s",
                vehicle: `${v.plate_number} (${v.current_status})`, // Pass label string for MapComponent
                co2: 0,
                tachograph: {
                    status: 'driving',
                    remainingDaily: '4h',
                    dailyDriven: '5h',
                    dailyLimit: '9h',
                    nextRestRequired: '1h'
                },
                driver: {
                    name: "Unknown",
                    phone: "",
                    rating: 5,
                    tripsCompleted: 0
                },
                cargo: {
                    description: "General Cargo",
                    weight: "20t",
                    type: v.type, // truck/van
                    pallets: 0
                },
                documents: { pod: false, cmr: false, customs: false }
            }));
    };

    useEffect(() => {
        // 1. Initial Fetch
        const fetchVehicles = async () => {
            const { data } = await supabase.from('vehicles').select('*');
            if (data) setVehicles(data as Vehicle[]);
        };

        fetchVehicles();

        // 2. Realtime Subscription
        const channel = supabase
            .channel('live-fleet')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'vehicles' },
                (payload) => {
                    const updatedVehicle = payload.new as Vehicle;
                    setVehicles(prev => prev.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
            trafficSimulator.stop();
        };
    }, []);

    const toggleSimulation = () => {
        if (simulating) {
            trafficSimulator.stop();
            setSimulating(false);
        } else {
            trafficSimulator.start();
            setSimulating(true);
        }
    };

    const loads = mapVehiclesToLoads(vehicles);

    return (
        <div className="w-full h-full relative">
            <MapComponent loads={loads} />

            {/* Simulation Controls Overlay */}
            <div className="absolute top-4 right-4 z-[500]">
                <Button
                    size="sm"
                    onClick={toggleSimulation}
                    className={`${simulating ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white shadow-lg`}
                >
                    {simulating ? (
                        <><LucideSquare className="w-4 h-4 mr-2" /> Simülasyonu Durdur</>
                    ) : (
                        <><LucidePlay className="w-4 h-4 mr-2" /> Canlı Akışı Başlat</>
                    )}
                </Button>
            </div>
        </div>
    );
}
