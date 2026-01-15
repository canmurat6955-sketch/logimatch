'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { Truck, MapPin, Brain, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { getRegionalPredictions, PredictionZone, PREDICTION_TIMEFRAMES, Timeframe } from '@/lib/ai/predictive-engine';

// Fix for Leaflet default icon issues in Next.js
// eslint-disable-next-line
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Truck Icon (using a divIcon for better styling if needed, or simple image)
const truckIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/741/741407.png', // Simple truck icon
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
});

interface Vehicle {
    id: string;
    plate: string;
    status: 'moving' | 'stopped' | 'idle';
    lat: number;
    lng: number;
    speed: number;
    destination: string;
}

const MOCK_VEHICLES: Vehicle[] = [
    { id: '1', plate: '34 AB 123', status: 'moving', lat: 41.0082, lng: 28.9784, speed: 65, destination: 'Berlin' }, // Istanbul
    { id: '2', plate: '06 CD 456', status: 'stopped', lat: 39.9334, lng: 32.8597, speed: 0, destination: 'Ankara' }, // Ankara
    { id: '3', plate: '35 EF 789', status: 'moving', lat: 38.4237, lng: 27.1428, speed: 80, destination: 'Izmir' }, // Izmir
];

// 15 Temmuz Bridge Zone (Example Restricted Zone)
const RESTRICTED_ZONE = {
    center: [41.045, 29.034] as [number, number],
    radius: 1000, // meters
    name: '15 Temmuz Şehitler Köprüsü (Yasaklı Bölge)'
};

export default function LiveFleetMap() {
    const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [showPredictions, setShowPredictions] = useState(false);
    const [timeframe, setTimeframe] = useState<Timeframe>('24h');
    const [predictions, setPredictions] = useState<PredictionZone[]>([]);

    // Fetch predictions when mode is toggled or timeframe changes
    useEffect(() => {
        if (showPredictions) {
            const data = getRegionalPredictions(timeframe);
            setPredictions(data);
        } else {
            setPredictions([]);
        }
    }, [showPredictions, timeframe]);

    // Simulate Movement
    useEffect(() => {
        const interval = setInterval(() => {
            setVehicles(prev => prev.map(v => {
                if (v.status !== 'moving') return v;
                return {
                    ...v,
                    lat: v.lat + (Math.random() - 0.5) * 0.001,
                    lng: v.lng + (Math.random() - 0.5) * 0.001
                };
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[600px] w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm relative z-0 group">
            <MapContainer
                center={[39.9334, 32.8597]}
                zoom={6}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={showPredictions
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark map for AI mode
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                />

                {/* Restricted Zone */}
                <Circle
                    center={RESTRICTED_ZONE.center}
                    radius={RESTRICTED_ZONE.radius}
                    pathOptions={{ color: 'red', fillColor: '#ff0000', fillOpacity: 0.2 }}
                >
                    <Popup>
                        <div className="text-red-600 font-bold">{RESTRICTED_ZONE.name}</div>
                        <div className="text-xs text-slate-500">Ağır vasıta girişi yasaktır.</div>
                    </Popup>
                </Circle>

                {/* AI Prediction Zones */}
                {showPredictions && predictions.map(zone => (
                    <Circle
                        key={zone.id}
                        center={zone.center}
                        radius={zone.radius}
                        pathOptions={{
                            color: zone.type === 'shortage' ? '#ef4444' : '#22c55e',
                            fillColor: zone.type === 'shortage' ? '#ef4444' : '#22c55e',
                            fillOpacity: zone.intensity * 0.4,
                            className: 'animate-pulse'
                        }}
                    >
                        <Popup>
                            <div className="min-w-[240px]">
                                <div className="flex items-center gap-2 mb-2 border-b pb-2">
                                    {zone.type === 'shortage' ? (
                                        <div className="bg-red-100 p-1.5 rounded-full"><TrendingUp className="w-4 h-4 text-red-600" /></div>
                                    ) : (
                                        <div className="bg-green-100 p-1.5 rounded-full"><TrendingDown className="w-4 h-4 text-green-600" /></div>
                                    )}
                                    <div>
                                        <div className="font-bold text-slate-800">{zone.regionName}</div>
                                        <div className={cn("text-xs font-bold", zone.type === 'shortage' ? "text-red-600" : "text-green-600")}>
                                            {zone.type === 'shortage' ? '🔥 Yüksek Araç Talebi' : '🟢 Araç Fazlalığı'}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                                    {zone.description}
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded border border-slate-100">
                                    <div className="flex flex-col">
                                        <span className="text-slate-500">Tahmini Yük</span>
                                        <span className="font-bold text-slate-900">{zone.predictedDemand} Adet</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-500">Mevcut Araç</span>
                                        <span className="font-bold text-slate-900">{zone.availableSupply} Adet</span>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Circle>
                ))}

                {/* Vehicles (Dimmed in AI Mode) */}
                {vehicles.map(vehicle => (
                    <Marker
                        key={vehicle.id}
                        position={[vehicle.lat, vehicle.lng]}
                        icon={truckIcon}
                        opacity={showPredictions ? 0.5 : 1}
                        eventHandlers={{
                            click: () => setSelectedVehicle(vehicle),
                        }}
                    >
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <div className="flex items-center gap-2 mb-2 border-b pb-2">
                                    <div className="bg-blue-100 p-1.5 rounded-full">
                                        <Truck className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="font-bold text-lg">{vehicle.plate}</span>
                                </div>
                                <div className="space-y-1 text-sm bg-slate-50 p-2 rounded">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Durum:</span>
                                        <span className={vehicle.status === 'moving' ? 'text-green-600 font-semibold' : 'text-amber-600'}>
                                            {vehicle.status === 'moving' ? 'Hareket Halinde' : 'Duruyor'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Hız:</span>
                                        <span className="text-slate-700">{vehicle.speed} km/s</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Rota:</span>
                                        <span className="text-slate-700">{vehicle.destination}</span>
                                    </div>
                                </div>
                                <button className="mt-3 w-full bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700 transition-colors">
                                    Detayları Gör
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* AI Control Panel */}
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                {/* Mode Toggle */}
                <div className="bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-lg border border-slate-200 flex items-center gap-1">
                    <button
                        onClick={() => setShowPredictions(false)}
                        className={cn(
                            "px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2",
                            !showPredictions ? "bg-slate-800 text-white shadow-md" : "text-slate-500 hover:bg-slate-100"
                        )}
                    >
                        <MapPin className="w-3.5 h-3.5" />
                        Canlı Filo
                    </button>
                    <button
                        onClick={() => setShowPredictions(true)}
                        className={cn(
                            "px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2",
                            showPredictions ? "bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200" : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                        )}
                    >
                        <Brain className="w-3.5 h-3.5" />
                        AI Stratejik Zeka
                    </button>
                </div>

                {/* Prediction Controls (Shown only in AI Mode) */}
                {showPredictions && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-slate-700 text-white w-64"
                    >
                        <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <span className="font-bold text-xs">Gelecek Tahmini</span>
                        </div>

                        <div className="flex bg-slate-800 rounded-lg p-1 mb-4">
                            {PREDICTION_TIMEFRAMES.map((tf) => (
                                <button
                                    key={tf.id}
                                    onClick={() => setTimeframe(tf.id)}
                                    className={cn(
                                        "flex-1 py-1.5 text-[10px] font-bold rounded transition-all",
                                        timeframe === tf.id ? "bg-indigo-500 text-white shadow" : "text-slate-400 hover:text-white"
                                    )}
                                >
                                    {tf.label}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-start gap-2 text-xs">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
                                <div>
                                    <span className="font-bold text-red-400 block">Araç Açığı (Yüksek Talep)</span>
                                    <span className="text-slate-400 text-[10px]">Fiyatlarda artış bekleniyor.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-xs">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-1" />
                                <div>
                                    <span className="font-bold text-green-400 block">Araç Fazlalığı</span>
                                    <span className="text-slate-400 text-[10px]">Dönüş yükü bulmak zorlaşabilir.</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function vehicleStatusColor(status: string) {
    if (status === 'moving') return 'text-green-600 bg-green-100';
    if (status === 'stopped') return 'text-amber-600 bg-amber-100';
    return 'text-slate-500 bg-slate-100';
}
