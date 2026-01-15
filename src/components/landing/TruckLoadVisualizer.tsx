'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, AlertTriangle, CheckCircle2, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type VehicleType = 'trailer' | 'truck' | 'pickup';

const VEHICLES: Record<VehicleType, { label: string; capacity: number; width: number }> = {
    trailer: { label: 'Tır', capacity: 33, width: 3 },
    truck: { label: 'Kamyon', capacity: 20, width: 2 },
    pickup: { label: 'Kamyonet', capacity: 10, width: 2 }
};

export default function TruckLoadVisualizer() {
    const [palletCount, setPalletCount] = useState<number>(0);
    const [vehicleType, setVehicleType] = useState<VehicleType>('trailer');

    const config = VEHICLES[vehicleType];
    const MAX_PALLETS = config.capacity;

    // Create a grid based on capacity
    const grid = Array.from({ length: MAX_PALLETS }, (_, i) => i);

    const getStatusColor = () => {
        if (palletCount === 0) return 'text-slate-400';
        if (palletCount > MAX_PALLETS) return 'text-red-500';
        if (palletCount > MAX_PALLETS * 0.85) return 'text-emerald-500';
        return 'text-amber-500';
    };

    return (
        <div className="bg-slate-900 rounded-xl p-6 text-white animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Box className="w-5 h-5 text-blue-400" />
                        Yük Tetris'i (Araç Doluluğu)
                    </h3>
                    <p className="text-xs text-slate-400">Araca göre optimum dizilim</p>
                </div>
                <div className={cn("text-2xl font-bold", getStatusColor())}>
                    {Math.min(100, Math.round((palletCount / MAX_PALLETS) * 100))}%
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Controls */}
                <div className="w-full md:w-1/3 space-y-6">

                    {/* Vehicle Selector */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Araç Tipi</label>
                        <div className="flex flex-col gap-2">
                            {(Object.keys(VEHICLES) as VehicleType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setVehicleType(type);
                                        // Reset count if it exceeds new max, or keep it if reasonable
                                        if (palletCount > VEHICLES[type].capacity) setPalletCount(VEHICLES[type].capacity);
                                    }}
                                    className={cn(
                                        "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all border",
                                        vehicleType === type
                                            ? "bg-blue-600/20 border-blue-600 text-blue-300"
                                            : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                                    )}
                                >
                                    <span className="flex items-center gap-2">
                                        <Truck className="w-4 h-4" />
                                        {VEHICLES[type].label}
                                    </span>
                                    <span className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-slate-500">{VEHICLES[type].capacity} Palet</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Palet Sayısı</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="0"
                                max={MAX_PALLETS + 5}
                                value={palletCount}
                                onChange={(e) => setPalletCount(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <input
                                type="number"
                                value={palletCount}
                                onChange={(e) => setPalletCount(Number(e.target.value))}
                                className="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        {palletCount > MAX_PALLETS ? (
                            <div className="flex items-start gap-3 text-red-400">
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                <div className="text-sm">
                                    <strong className="block text-red-300">Kapasite Aşıldı!</strong>
                                    Seçili araç ({config.label}) için maksimum {MAX_PALLETS} palet yükleyebilirsiniz.
                                </div>
                            </div>
                        ) : palletCount === MAX_PALLETS ? (
                            <div className="flex items-start gap-3 text-emerald-400">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <div className="text-sm">
                                    <strong className="block text-emerald-300">Tam Kapasite!</strong>
                                    Araç tam doluluk oranına ulaştı.
                                </div>
                            </div>
                        ) : (
                            <div className="text-sm text-slate-400">
                                <strong>{config.label}</strong> içinde <strong>{MAX_PALLETS - palletCount}</strong> palet daha taşıyabilirsiniz.
                            </div>
                        )}
                    </div>

                    <Button className="w-full" disabled={palletCount === 0 || palletCount > MAX_PALLETS}>
                        Bu Yükü Planla
                    </Button>
                </div>

                {/* Truck Visualization */}
                <div className="w-full md:w-2/3">
                    <div className="relative bg-slate-800 rounded-lg p-4 border-2 border-slate-700 min-h-[300px] flex items-center justify-center">
                        {/* Trailer Outline */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-slate-600 font-mono text-[10px] uppercase">KAPAK</div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-600 font-mono text-[10px] uppercase">ÇEKİCİ</div>

                        <div
                            className={cn(
                                "grid gap-1 w-full max-w-[200px] bg-slate-900/50 p-1 rounded border border-slate-600/50 transition-all duration-300",
                                config.width === 3 ? "grid-cols-3" : "grid-cols-2" // 3 cols for trailer, 2 for others
                            )}
                        >
                            {grid.map((slot) => {
                                const isOccupied = slot < palletCount;
                                const isOverflow = slot < palletCount && slot >= MAX_PALLETS;

                                return (
                                    <motion.div
                                        key={slot}
                                        initial={false}
                                        animate={{
                                            scale: isOccupied ? 1 : 0.9,
                                            backgroundColor: isOverflow ? '#ef4444' : isOccupied ? '#3b82f6' : '#1e293b'
                                        }}
                                        className={cn(
                                            "rounded-sm aspect-[4/5] flex items-center justify-center text-[10px] font-mono transition-colors",
                                            isOccupied ? "text-white/80 shadow-sm" : "text-transparent"
                                        )}
                                    >
                                        {isOccupied && "PAL"}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
