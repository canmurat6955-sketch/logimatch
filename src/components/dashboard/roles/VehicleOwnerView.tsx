'use client';

import { Truck, Navigation, AlertCircle, Leaf, Zap, MapPin, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sparkline, DonutChart, TinyBarChart } from './KPIGraphs';
import { useEffect, useState } from 'react';
import { MockTransportService, MockLoad } from '@/lib/services/transport';
import CargoLayout from '../cargo/CargoLayout';
import SmartOpportunityCard from './SmartOpportunityCard';
import dynamic from 'next/dynamic';
import { VehicleSettingsDialog, type VehicleConfig } from './VehicleSettingsDialog';

const MapComponent = dynamic(() => import('../../map/MapComponent'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900/50 animate-pulse flex items-center justify-center text-slate-500 text-xs">Harita Yükleniyor...</div>
});

export default function VehicleOwnerView() {
    const [matches, setMatches] = useState<MockLoad[]>([]);
    const [vehicleConfig, setVehicleConfig] = useState<VehicleConfig>({
        plate: '34 VR 1024',
        type: 'trailer',
        customCapacityWeight: 26500
    });

    useEffect(() => {
        const fetchMatches = async () => {
            const service = MockTransportService.getInstance();
            const loads = await service.getLoads();
            setMatches(loads.slice(0, 4));
        };
        fetchMatches();
    }, []);

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-6 relative animate-in fade-in duration-700">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0b] to-black opacity-80 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"></div>

            {/* Header */}
            <div className="flex justify-between items-center z-10 shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Truck className="w-5 h-5 text-emerald-500" />
                        Sürücü Kokpiti
                    </h2>


                </div>
                <div className="flex gap-2">
                    <VehicleSettingsDialog
                        currentConfig={vehicleConfig}
                        onSave={setVehicleConfig}
                    />
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs text-emerald-400 font-medium">{vehicleConfig.plate} - Yolda (İzmit)</span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 z-10 min-h-0 flex-1">

                {/* Left Column: Visuals (Cargo & Map) */}
                <div className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1">
                    {/* Cargo Layout Visualization */}
                    <CargoLayout config={vehicleConfig} />

                    {/* Active Map */}
                    <div className="flex-1 min-h-[250px] bg-slate-900/40 border border-white/5 rounded-2xl relative overflow-hidden group">
                        <MapComponent />
                        <div className="absolute top-3 right-3 z-[400]">
                            <span className="px-2 py-1 rounded bg-slate-950/80 text-[10px] text-white backdrop-blur border border-white/10">Canlı Konum</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Opportunities & Stats */}
                <div className="lg:col-span-7 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1">

                    {/* Smart Suggestion Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <SmartOpportunityCard />

                        <div className="p-5 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 relative overflow-hidden flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-xs text-slate-400">Tahmini Kazanç (Bu Ay)</div>
                                    <div className="text-2xl font-bold text-white mt-1">₺142.500</div>
                                </div>
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <TinyBarChart data={[40, 60, 45, 70, 65, 85, 80]} height={40} activeIndex={6} />
                            </div>
                        </div>
                    </div>

                    {/* Load List */}
                    <div className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <h3 className="text-sm font-medium text-white">Yük Eşleşmeleri</h3>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-400 hover:text-blue-300">Tümünü Gör</Button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-3">
                            {matches.map((load, i) => (
                                <div key={load.id} className="group relative p-3 rounded-xl bg-slate-950/40 border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                    {/* AI Match Badge */}
                                    <div className="absolute top-4 right-4 flex items-col items-end gap-1">
                                        <div className="text-2xl font-bold text-white tracking-tight">€{Math.floor(Math.random() * 2000 + 1000)}</div>
                                        <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                            <Zap className="w-3 h-3 fill-emerald-400" />
                                            %{98 - i * 3} Eşleşme
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <Navigation className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div className="space-y-3 flex-1">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2 text-white font-medium text-lg">
                                                    {load.origin}
                                                    <span className="text-slate-600 text-sm">➔</span>
                                                    {load.destination}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 rounded bg-slate-900 border border-white/10 text-[10px] text-slate-300 flex items-center gap-1">
                                                    <Truck className="w-3 h-3 text-slate-500" />
                                                    Tenteli Tır
                                                </span>
                                                <span className="px-2 py-1 rounded bg-slate-900 border border-white/10 text-[10px] text-slate-300 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-slate-500" />
                                                    {Math.floor(Math.random() * 1000 + 500)} km
                                                </span>
                                                <span className="px-2 py-1 rounded bg-slate-900 border border-white/10 text-[10px] text-slate-300">
                                                    24 Ton
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-400 hover:text-white">Detaylar</Button>
                                        <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-500">Hemen Teklif Ver</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function TrendingUp(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
        </svg>
    )
}
