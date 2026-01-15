'use client';

import { useState } from 'react';
import {
    MapPin,
    Truck,
    Cpu,
    ArrowRight,
    Timer,
    Fuel,
    Save,
    RotateCcw,
    LayoutList,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock Data: Stops
const initialStops = [
    { id: 1, name: 'Depot (İstanbul)', type: 'depot', lat: 41.0082, lng: 28.9784 },
    { id: 2, name: 'Gebze Sanayi', type: 'delivery', lat: 40.8027, lng: 29.4306 },
    { id: 3, name: 'Kocaeli Liman', type: 'pickup', lat: 40.7654, lng: 29.9408 },
    { id: 4, name: 'Sakarya OSB', type: 'delivery', lat: 40.7040, lng: 30.3750 },
    { id: 5, name: 'Düzce Merkez', type: 'delivery', lat: 40.8438, lng: 31.1565 },
    { id: 6, name: 'Bolu Dağı', type: 'delivery', lat: 40.7358, lng: 31.6061 },
];

export default function RoutePlanningPage() {
    const [isOptimized, setIsOptimized] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);

    const handleOptimize = () => {
        setIsOptimizing(true);
        setTimeout(() => {
            setIsOptimized(true);
            setIsOptimizing(false);
        }, 1500);
    };

    const handleReset = () => {
        setIsOptimized(false);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-6">

            {/* Header */}
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Cpu className="w-6 h-6 text-purple-500" />
                        AI Rota Optimizasyonu
                    </h2>
                    <p className="text-slate-400">Yapay zeka ile rotalarınızı optimize edin, yakıt ve zamandan tasarruf sağlayın.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleReset} disabled={!isOptimized} className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Sıfırla
                    </Button>
                    <Button
                        onClick={handleOptimize}
                        disabled={isOptimized || isOptimizing}
                        className={cn(
                            "bg-purple-600 hover:bg-purple-500 transition-all duration-500",
                            isOptimizing && "animate-pulse"
                        )}
                    >
                        {isOptimizing ? (
                            <>Optimize Ediliyor...</>
                        ) : isOptimized ? (
                            <><CheckCircle2 className="w-4 h-4 mr-2" /> Optimize Edildi</>
                        ) : (
                            <><Cpu className="w-4 h-4 mr-2" /> AI Optimize Et</>
                        )}
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
                {/* Left Panel: Stop List */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    {/* Stats Card */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className={cn("p-4 rounded-xl border transition-all duration-500", isOptimized ? "bg-emerald-900/20 border-emerald-500/30" : "bg-slate-900 border-white/5")}>
                            <div className="text-xs text-slate-400 font-medium mb-1">Toplam Mesafe</div>
                            <div className={cn("text-2xl font-bold flex items-end gap-2", isOptimized ? "text-emerald-400" : "text-white")}>
                                {isOptimized ? "342 km" : "580 km"}
                                {isOptimized && <span className="text-xs text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded mb-1">-%41</span>}
                            </div>
                        </div>
                        <div className={cn("p-4 rounded-xl border transition-all duration-500", isOptimized ? "bg-emerald-900/20 border-emerald-500/30" : "bg-slate-900 border-white/5")}>
                            <div className="text-xs text-slate-400 font-medium mb-1">Tahmini Süre</div>
                            <div className={cn("text-2xl font-bold flex items-end gap-2", isOptimized ? "text-emerald-400" : "text-white")}>
                                {isOptimized ? "4s 15dk" : "7s 40dk"}
                                {isOptimized && <span className="text-xs text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded mb-1">-%45</span>}
                            </div>
                        </div>
                    </div>

                    {/* Route List */}
                    <div className="flex-1 bg-slate-900 border border-white/5 rounded-xl flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-bold text-white text-sm flex items-center gap-2">
                                <LayoutList className="w-4 h-4 text-slate-400" />
                                Rota Durakları
                            </h3>
                            <span className="text-xs text-slate-500">{initialStops.length} Durak</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar relative">
                            {/* Line connecting dots */}
                            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-800 z-0"></div>

                            {(isOptimized
                                ? [initialStops[0], initialStops[2], initialStops[1], initialStops[3], initialStops[5], initialStops[4]] // Mock optimized order
                                : initialStops
                            ).map((stop, index) => (
                                <div key={stop.id} className="relative z-10 flex items-center gap-3 p-3 bg-slate-950/80 rounded-lg border border-white/5 hover:border-purple-500/30 transition-all group animate-in slide-in-from-left duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
                                        stop.type === 'depot' ? "bg-blue-900 border-blue-500 text-blue-400" :
                                            index === 0 ? "bg-slate-900 border-slate-600 text-slate-400" : "bg-slate-900 border-slate-700 text-slate-500"
                                    )}>
                                        <span className="text-xs font-bold">{index + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-white">{stop.name}</div>
                                        <div className="text-xs text-slate-500 capitalize">{stop.type}</div>
                                    </div>
                                    <div className="text-slate-600">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Visual Map */}
                <div className="col-span-12 lg:col-span-8 bg-slate-900 border border-white/5 rounded-xl overflow-hidden relative group">
                    {/* Map Background */}
                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/29.5,40.8,8,0/1200x800?access_token=placeholder')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity"></div>

                    {/* Visual Route Lines (SVG Overlay) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                        {isOptimized ? (
                            /* Optimized Path (Cleaner) */
                            <path
                                d="M 200 400 L 350 380 L 450 420 L 550 400 L 700 450 L 650 350"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="4"
                                strokeDasharray="10 5"
                                className="animate-pulse"
                            />
                        ) : (
                            /* Unoptimized Path (Messy) */
                            <path
                                d="M 200 400 L 700 450 L 350 380 L 650 350 L 450 420 L 550 400"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="3"
                                strokeOpacity="0.6"
                            />
                        )}
                    </svg>

                    {/* Map Pins (Absolute Positioned for Demo) */}
                    {/* Note: These positions roughly correspond to the SVG path points for the visual demo */}
                    <div className="absolute left-[200px] top-[400px] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/20"></div>
                    </div>

                    {/* Other random pins along the path */}
                    <div className="absolute left-[350px] top-[380px] w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute left-[450px] top-[420px] w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute left-[550px] top-[400px] w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute left-[700px] top-[450px] w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute left-[650px] top-[350px] w-3 h-3 bg-white rounded-full"></div>


                    {/* Optimization Status Overlay */}
                    <div className="absolute top-6 left-6 bg-slate-950/80 backdrop-blur border border-white/10 p-4 rounded-xl flex items-center gap-4">
                        <div className={cn("w-3 h-3 rounded-full animate-pulse", isOptimized ? "bg-emerald-500" : "bg-red-500")}></div>
                        <div>
                            <div className="text-white font-bold text-sm">
                                {isOptimized ? "Rota Optimize Edildi" : "Verimsiz Rota Tespit Edildi"}
                            </div>
                            <div className="text-xs text-slate-400">
                                {isOptimized ? "En verimli güzergah uygulanıyor." : "Çapraz gidiş-gelişler mevcut."}
                            </div>
                        </div>
                    </div>

                    {isOptimized && (
                        <div className="absolute bottom-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg font-bold flex items-center gap-2 animate-bounce">
                            <Fuel className="w-5 h-5" />
                            %41 Yakıt Tasarrufu
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
