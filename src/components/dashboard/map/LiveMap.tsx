'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MockLoad } from '@/lib/services/transport';
import { AlertTriangle, MapPin } from 'lucide-react';
import RestrictionLayer from '@/components/map/RestrictionLayer';

// Fix for default marker icon in Next.js
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Custom truck icon
const truckIcon = L.divIcon({
    className: 'bg-transparent',
    html: `<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg relative">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="13" x="4" y="5" rx="2" ry="2"/><rect width="6" height="3" x="9" y="2" rx="2"/><path d="M15 22v-4"/><path d="M9 22v-4"/></svg>
             <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white animate-pulse"></div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

interface LiveMapProps {
    loads: MockLoad[];
    selectedId: string | null;
}

export default function LiveMap({ loads, selectedId }: LiveMapProps) {
    const defaultCenter: [number, number] = [41.0082, 28.9784]; // Istanbul
    const [map, setMap] = useState<L.Map | null>(null);

    // Effect to fly to selected load
    useEffect(() => {
        if (selectedId && map) {
            const selected = loads.find(l => l.id === selectedId);
            if (selected) {
                map.flyTo(selected.coordinates as [number, number], 10, {
                    duration: 1.5
                });
            }
        }
    }, [selectedId, loads, map]);

    // Truck Restriction Logic (Istanbul) handled by RestrictionLayer now

    return (
        <div className="w-full h-full relative z-0">
            <MapContainer
                center={defaultCenter}
                zoom={6}
                scrollWheelZoom={true}
                className="w-full h-full bg-[#1a1b1e]" // Dark background match
                ref={setMap}
            >
                {/* Dark Mode Tiles (CartoDB Dark Matter) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <RestrictionLayer />


                {/* Render Truck Markers */}
                {loads.map((load) => {
                    const isSelected = selectedId === load.id;
                    return (
                        <Marker
                            key={load.id}
                            position={load.coordinates as [number, number]}
                            icon={truckIcon} // keeping simple icon for now, pulse effect added via CSS to this specific marker if selected? 
                        // Actually, let's use a custom icon for selected state as planned.
                        >
                            <Popup className="custom-popup" autoPan={false}>
                                <div className="p-1 space-y-2">
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                        <span className="font-bold text-slate-800">{load.vehicle}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${load.status === 'in_transit' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {load.status === 'in_transit' ? 'YOLDA' : 'BEKLEMEDE'}
                                        </span>
                                    </div>
                                    <div className="space-y-1 text-xs text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            {load.origin} ➝ {load.destination}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3 text-orange-500" />
                                            <span>Yük: {load.cargo.type} ({load.cargo.weight})</span>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                            {isSelected && (
                                <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                        </span>
                                        <span className="text-xs font-bold text-blue-600">YÜKÜNÜZ BURADA</span>
                                    </div>
                                </Tooltip>
                            )}
                        </Marker>
                    );
                })}

            </MapContainer>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur p-3 rounded-lg border border-white/10 text-xs text-white z-[1000]">
                <div className="font-bold mb-2 text-slate-400">Canlı Trafik Kuralları</div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full border border-red-500 bg-red-500/20"></div>
                    <span>Yasaklı Bölge (1. Köprü)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-orange-500 bg-orange-500/20"></div>
                    <span>Saat Kısıtlaması (FSM)</span>
                </div>
            </div>
        </div>
    );
}
