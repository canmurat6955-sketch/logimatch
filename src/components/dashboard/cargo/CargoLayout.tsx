'use client';

import { Box, Info, Truck, Car, Scale } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { VehicleConfig } from '@/components/dashboard/roles/VehicleSettingsDialog';

interface CargoItem {
    id: string;
    type: 'pallet' | 'box' | 'machinery';
    position: number;
    size: number; // slots occupied
    weight: number; // kg
    description: string;
    color: string;
}

const VEHICLE_SPECS_DATA = {
    trailer: {
        label: 'Tır (Light Trailer)',
        defaultSlots: 33, // 3x11
        cols: 3,
        rows: 11,
        icon: Truck
    },
    truck: {
        label: 'Kamyon (Kırkayak)',
        defaultSlots: 21, // 3x7
        cols: 3,
        rows: 7,
        icon: Truck
    },
    van: {
        label: 'Kamyonet',
        defaultSlots: 10, // 2x5
        cols: 2,
        rows: 5,
        icon: Car
    }
};

interface CargoLayoutProps {
    config: VehicleConfig;
}

export default function CargoLayout({ config }: CargoLayoutProps) {
    const specsData = VEHICLE_SPECS_DATA[config.type];

    // Use passed config for weight, specsData for physical layout
    const capacitySlots = specsData.defaultSlots;
    const capacityWeight = config.customCapacityWeight;

    // Mock occupied slots - simulating data
    const occupiedSlots: CargoItem[] = [
        { id: 'c1', type: 'pallet', position: 1, size: 1, weight: 450, description: 'Tekstil', color: 'bg-blue-500' },
        { id: 'c2', type: 'pallet', position: 2, size: 1, weight: 450, description: 'Tekstil', color: 'bg-blue-500' },
        { id: 'c3', type: 'pallet', position: 3, size: 1, weight: 450, description: 'Tekstil', color: 'bg-blue-500' },
        { id: 'c4', type: 'machinery', position: 4, size: 2, weight: 1200, description: 'Motor Parçaları', color: 'bg-amber-600' },
        { id: 'c6', type: 'pallet', position: 6, size: 1, weight: 300, description: 'Koli', color: 'bg-purple-500' },
        { id: 'c7', type: 'pallet', position: 7, size: 1, weight: 300, description: 'Koli', color: 'bg-purple-500' },
    ];

    const visibleSlots = occupiedSlots.filter(item => item.position <= capacitySlots);
    const getItemAt = (slotIndex: number) => visibleSlots.find(item => item.position === slotIndex + 1);

    const usedSlots = visibleSlots.reduce((acc, item) => acc + item.size, 0);
    const usedWeight = visibleSlots.reduce((acc, item) => acc + item.weight, 0);

    const fillRateSlots = Math.round((usedSlots / capacitySlots) * 100);
    const fillRateWeight = Math.round((usedWeight / capacityWeight) * 100);

    return (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-xl flex flex-col h-full">
            {/* Header & Controls */}
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-sm font-bold text-white">Kasa Planı</h3>
                    </div>
                    {/* Vehicle Type Label Badge */}
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-400">
                        <specsData.icon className="w-3 h-3" />
                        {specsData.label}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 rounded-lg bg-slate-950/30 border border-white/5">
                        <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-slate-400 flex items-center gap-1"><Box className="w-3 h-3" /> Hacim</span>
                            <span className={cn("font-bold", fillRateSlots > 90 ? "text-amber-500" : "text-white")}>{fillRateSlots}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full rounded-full transition-all duration-500", fillRateSlots > 90 ? "bg-amber-500" : "bg-emerald-500")}
                                style={{ width: `${fillRateSlots}%` }}
                            ></div>
                        </div>
                        <div className="text-[9px] text-slate-500 mt-1 text-right">{usedSlots}/{capacitySlots} Palet</div>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950/30 border border-white/5">
                        <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-slate-400 flex items-center gap-1"><Scale className="w-3 h-3" /> Ağırlık</span>
                            <span className={cn("font-bold", fillRateWeight > 95 ? "text-red-500" : "text-white")}>{fillRateWeight}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full rounded-full transition-all duration-500", fillRateWeight > 95 ? "bg-red-500" : "bg-blue-500")}
                                style={{ width: `${fillRateWeight}%` }}
                            ></div>
                        </div>
                        <div className="text-[9px] text-slate-500 mt-1 text-right">{usedWeight / 1000} / {capacityWeight / 1000} Ton</div>
                    </div>
                </div>
            </div>

            {/* Truck Visualization Container */}
            <div className="flex-1 flex items-center justify-center min-h-0 bg-slate-950 border-2 border-slate-700 rounded-lg p-4 shadow-inner relative overflow-hidden">
                {/* Cabin Indicator */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2/3 h-3 bg-slate-800 rounded-t-lg border border-slate-700"></div>

                {/* Dynamic Grid Layout */}
                <div
                    className="grid gap-1 w-full max-w-[160px]" // Reduced max-width to zoom out
                    style={{
                        gridTemplateColumns: `repeat(${specsData.cols}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${specsData.rows}, minmax(0, 1fr))`,
                        aspectRatio: `${specsData.cols} / ${specsData.rows}`,
                        transform: 'scale(0.9)' // Slight scale down to ensure fit
                    }}
                >
                    {Array.from({ length: capacitySlots }).map((_, i) => {
                        const item = getItemAt(i);
                        return (
                            <TooltipProvider delayDuration={100} key={i}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div
                                            className={cn(
                                                "rounded-[2px] border border-white/5 transition-all w-full h-full relative group",
                                                item ? item.color : "bg-slate-800/20 hover:bg-emerald-500/10",
                                                "flex items-center justify-center"
                                            )}
                                        >
                                            {item && <div className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-sm"></div>}
                                            {!item && <div className="w-1 h-1 rounded-full bg-white/5 group-hover:bg-emerald-500/50"></div>}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="bg-slate-900 border-slate-700 text-white text-xs z-[500]">
                                        {item ? (
                                            <div>
                                                <p className="font-bold border-b border-white/10 pb-1 mb-1">{item.description}</p>
                                                <p className="text-slate-400">Ağırlık: {item.weight}kg</p>
                                                <p className="text-slate-400">Tip: {item.type}</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="font-bold text-emerald-400">Boş Alan #{i + 1}</p>
                                                <p className="text-slate-400">Müsait</p>
                                            </div>
                                        )}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </div>

                {/* Rear Doors Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-600 rounded-full"></div>
            </div>

            <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                        <div className="text-xs font-bold text-emerald-400">Optimizasyon Fırsatı</div>
                        <p className="text-[10px] text-slate-400 mt-1">
                            {config.type === 'van'
                                ? `Tonaj limiti: ${capacityWeight}kg. Dikkatli yükleyin.`
                                : `${capacitySlots - usedSlots} palet boşluk var. Tonaj limitine ${Math.max(0, ((capacityWeight - usedWeight) / 1000)).toFixed(1)} ton kaldı.`
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
