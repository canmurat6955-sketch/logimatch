'use client';

import { ArrowUpRight, TrendingUp, AlertTriangle, Truck, Map as MapIcon, Plus, Navigation, Zap, BarChart3, Globe, Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MockTransportService, MockLoad } from '@/lib/services/transport';
import { Button } from "@/components/ui/button";
import { Sparkline, DonutChart, TinyBarChart } from './KPIGraphs';
import QuoteWidget from './QuoteWidget';
import TachographStatus from './TachographStatus';
import VehicleDetailDialog from './VehicleDetailDialog';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../../map/MapComponent'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900/50 animate-pulse flex items-center justify-center text-slate-500 text-xs">Harita Yükleniyor...</div>
});

export default function EnterpriseView() {
    const [fleetLoads, setFleetLoads] = useState<MockLoad[]>([]);
    const [stats, setStats] = useState({ vehicleCount: 24, activeJobs: 18, monthlyRevenue: 142500 });
    const [selectedVehicle, setSelectedVehicle] = useState<string>('');
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    useEffect(() => {
        const fetchFleetData = async () => {
            const service = MockTransportService.getInstance();
            const loads = await service.getLoads();
            setFleetLoads(loads.slice(0, 8)); // Simulating active fleet jobs
        };
        fetchFleetData();
    }, []);

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-6 relative animate-in fade-in duration-700">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0b] to-black opacity-80 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"></div>

            {/* Header */}
            <div className="flex justify-between items-end z-10 shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Globe className="w-5 h-5 text-purple-500" />
                        Lojistik Operasyon Merkezi
                    </h2>


                </div>
                <div className="flex gap-2">
                    {/* Header Buttons if needed */}
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 z-10 shrink-0">
                {[
                    { label: 'Aktif Filo', value: stats.vehicleCount.toString(), sub: '2 araç garajda', icon: Truck, color: 'blue', chart: [22, 23, 24, 24, 22, 24, 24] },
                    { label: 'Aylık Ciro', value: `₺ ${stats.monthlyRevenue.toLocaleString('tr-TR')}`, sub: 'Hedefin %12 üzerinde', icon: TrendingUp, color: 'emerald', chart: [100, 120, 110, 130, 125, 140, 142] },
                    { label: 'Aktif İşler', value: stats.activeJobs.toString(), sub: '4 araç dönüşte', icon: AlertTriangle, color: 'amber', chart: [15, 18, 16, 18, 19, 18, 18] },
                    { label: 'Verimlilik', value: '%94', sub: 'Yapay Zeka Optimize', icon: Zap, color: 'purple', chart: [85, 88, 90, 92, 91, 93, 94] },
                ].map((stat, i) => (
                    <div key={i} className={`p-4 rounded-xl bg-${stat.color}-900/10 backdrop-blur-md border border-${stat.color}-500/20 hover:border-${stat.color}-500/40 transition-all group overflow-hidden relative`}>
                        <div className={`absolute top-0 right-0 p-8 bg-${stat.color}-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`}></div>

                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <div className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400`}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                            <Sparkline data={stat.chart} height={20} color={`text-${stat.color}-400`} fill="fill-none" />
                        </div>
                        <div className="relative z-10">
                            <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                            <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                            <div className={`text-[10px] mt-1 text-${stat.color}-400/80`}>{stat.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-12 gap-6 min-h-0 flex-1 z-10">

                {/* Left: Fleet Status List */}
                <div className="lg:col-span-8 flex flex-col bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <h3 className="text-sm font-medium text-white flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-purple-400" />
                            Canlı Operasyon İzleme
                        </h3>
                        <div className="flex gap-2 text-[10px]">
                            <span className="flex items-center gap-1 text-slate-400"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Yolda</span>
                            <span className="flex items-center gap-1 text-slate-400"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Yükleniyor</span>
                            <span className="flex items-center gap-1 text-slate-400"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Beklemede</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-950/50 sticky top-0 z-10">
                                <tr className="text-slate-500 border-b border-white/5">
                                    <th className="p-3 font-medium">Araç / Sürücü</th>
                                    <th className="p-3 font-medium">Rota</th>
                                    <th className="p-3 font-medium">Yük</th>
                                    <th className="p-3 font-medium text-center">CO2 Tasarruf</th>
                                    <th className="p-3 font-medium">Durum</th>
                                    <th className="p-3 font-medium text-right">Aksiyon</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {fleetLoads.map((load, i) => (
                                    <tr
                                        key={load.id}
                                        onClick={() => { setSelectedVehicle(load.vehicle || `34 VR ${1000 + i}`); setIsDetailOpen(true); }}
                                        className={`transition-colors group cursor-pointer ${load.alert?.severity === 'high'
                                            ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/20'
                                            : 'hover:bg-white/5'
                                            }`}
                                    >
                                        <td className="p-3">
                                            <div className="font-medium text-white">{load.vehicle || '34 VR ' + (1000 + i)}</div>
                                            <div className="text-slate-500 text-[10px]">{load.driver.name}</div>
                                            {load.alert && (
                                                <div className="flex items-center gap-1 text-[9px] text-red-400 mt-1 font-bold animate-pulse">
                                                    <AlertTriangle className="w-3 h-3" /> {load.alert.message}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <div className="text-slate-300 flex items-center gap-1">
                                                {load.origin} <span className="text-slate-600">➔</span> {load.destination}
                                            </div>
                                            <div className="text-[10px] text-purple-400 mt-0.5">ETA: {load.eta}</div>
                                        </td>
                                        <td className="p-3">
                                            <div className="text-slate-300">{load.cargo.type}</div>
                                            <div className="text-slate-500 text-[10px]">{load.cargo.weight}</div>
                                        </td>
                                        <td className="p-3 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <Leaf className="w-3 h-3" />
                                                <span className="font-bold">{load.co2} kg</span>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            {load.alert ? (
                                                <span className="px-2 py-0.5 rounded text-[10px] flex w-fit items-center gap-1 bg-red-500/10 text-red-500 border border-red-500/20 font-bold">
                                                    <AlertTriangle className="w-3 h-3" /> Alarm
                                                </span>
                                            ) : (
                                                <span className={`px-2 py-0.5 rounded text-[10px] flex w-fit items-center gap-1 ${i % 3 === 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    i % 3 === 1 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${i % 3 === 0 ? 'bg-emerald-500' : i % 3 === 1 ? 'bg-blue-500' : 'bg-amber-500'
                                                        } animate-pulse`}></div>
                                                    {i % 3 === 0 ? 'Yolda' : i % 3 === 1 ? 'Yükleniyor' : 'Mola'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3 text-right">
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full hover:bg-white/10">
                                                <Navigation className="w-3 h-3 text-slate-400" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <VehicleDetailDialog
                    isOpen={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                    vehiclePlate={selectedVehicle}
                />

                {/* Right: AI Predictions & Map */}
                <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1">

                    {/* Hızlı Teklif Widget */}
                    <QuoteWidget />

                    {/* Tachograph Status */}
                    <TachographStatus />

                    {/* Map Simulation - REPLACED WITH REAL MAP */}
                    <div className="flex-1 bg-slate-900/40 border border-white/5 rounded-2xl relative overflow-hidden group min-h-[200px]">
                        <MapComponent className="z-10" />

                        {/* Map Overlay Controls */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-[400]">
                            <div className="bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 shadow-lg pointer-events-auto">
                                <div className="text-[10px] text-slate-400">Canlı Bağlantı</div>
                                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Aktif
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-3 left-3 pointer-events-none z-[400]">
                            <div className="bg-slate-950/80 backdrop-blur px-2 py-1 rounded-lg border border-white/10">
                                <div className="text-[10px] text-slate-300 flex items-center gap-2">
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500/50 rounded-sm border border-red-500"></div> Yasak</span>
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-amber-500/50 rounded-sm border border-amber-500"></div> Kısıtlı</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
