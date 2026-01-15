'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import RestrictionLayer from '@/components/map/RestrictionLayer';
import { MockLoad } from '@/lib/services/transport';

// Fix Leaflet Default Icon Issue in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

// Custom Icons for Vehicles
const createTruckIcon = (color: string = '#10b981', isSelected: boolean = false) => L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: ${isSelected ? 16 : 12}px; height: ${isSelected ? 16 : 12}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 ${isSelected ? '20px' : '10px'} ${color}; ${isSelected ? 'animation: pulse 1.5s infinite;' : ''}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

interface MapProps {
    className?: string;
    singleView?: boolean;
    vehiclePosition?: [number, number];
    routePath?: [number, number][];
    loads?: MockLoad[];
    selectedId?: string | null;
}

export default function MapComponent({
    className,
    singleView = false,
    vehiclePosition, // Legacy prop support
    routePath, // Legacy prop support
    loads = [],
    selectedId
}: MapProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <div className="w-full h-full bg-slate-900 animate-pulse rounded-2xl flex items-center justify-center text-slate-500 text-xs">Harita Yükleniyor...</div>;

    // Determine center and markers based on props
    let centerPosition: [number, number] = [40.99, 29.10]; // Istanbul default
    let zoomLevel = 10;

    // Find active load if selected
    const activeLoad = selectedId ? loads.find(l => l.id === selectedId) : null;

    // Check if we have a specific vehicle position passed (Legacy or Single View)
    if (vehiclePosition) {
        centerPosition = vehiclePosition;
        zoomLevel = 13;
    }
    // Or if we have an active selected load with location data
    else if (activeLoad?.coordinates) {
        centerPosition = activeLoad.coordinates;
        zoomLevel = 13;
    }

    return (
        <MapContainer
            center={centerPosition}
            zoom={zoomLevel}
            scrollWheelZoom={true}
            className={`w-full h-full rounded-2xl z-0 ${className}`}
            style={{ background: '#0f172a' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            <RestrictionLayer />

            {/* Render vehicle for active load */}
            {activeLoad && activeLoad.coordinates && (
                <Marker
                    position={activeLoad.coordinates}
                    icon={createTruckIcon('#3b82f6', true)}
                >
                    <Popup className="custom-popup" autoPan={false}>
                        <div className="p-2 min-w-[150px]">
                            <h3 className="font-bold text-sm text-slate-800">{activeLoad.vehicle || 'Araç'}</h3>
                            <p className="text-xs text-slate-600 mb-1">Yük: {activeLoad.cargo.type}</p>
                            <div className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded inline-block">
                                Canlı Takip Aktif
                            </div>
                        </div>
                    </Popup>
                    <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                        <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded shadow-lg">
                            Yükünüz Burada
                        </span>
                    </Tooltip>
                </Marker>
            )}

            {/* Render other loads (faded) if no specific one selected, or just single vehicle if prop passed */}
            {!activeLoad && loads.length > 0 && loads.map(load => (
                load.coordinates && (
                    <Marker
                        key={load.id}
                        position={load.coordinates}
                        icon={createTruckIcon('#64748b', false)}
                    >
                        <Popup className="custom-popup">
                            <div className="p-1">
                                <h3 className="font-bold text-xs">{load.vehicle}</h3>
                            </div>
                        </Popup>
                    </Marker>
                )
            ))}

            {/* Legacy Single Vehicle Marker (if used in other views) */}
            {vehiclePosition && !activeLoad && (
                <Marker position={vehiclePosition} icon={createTruckIcon('#10b981', true)}>
                    <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                        <span className="text-[10px] font-bold">Aracınız</span>
                    </Tooltip>
                </Marker>
            )}

            {/* Route Line */}
            {routePath && (
                <Polyline
                    positions={routePath}
                    pathOptions={{ color: '#10b981', weight: 3, opacity: 0.7, dashArray: '10, 10' }}
                />
            )}

            {/* Style for pulsing animation */}
            <style jsx global>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                }
            `}</style>

        </MapContainer>
    );
}
