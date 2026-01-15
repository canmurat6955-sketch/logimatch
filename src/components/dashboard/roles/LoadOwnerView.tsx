'use client';

import {
    Plus,
    TrendingUp,
    Navigation,
    Clock,
    Leaf,
    Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { MockTransportService, TransportService, MockLoad } from '@/lib/services/transport';
import { SupabaseTransportService } from '@/lib/services/supabaseTransport';
import ShipmentDetails from './ShipmentDetails';
import { Sparkline, DonutChart, TinyBarChart } from './KPIGraphs';
import ActiveShipmentsList from './ActiveShipmentsList';
import dynamic from 'next/dynamic';

const LoadInputWidget = dynamic(() => import('./LoadInputWidget'), { ssr: false });
const LiveMap = dynamic(() => import('../map/LiveMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#1a1b1e] animate-pulse flex items-center justify-center text-slate-500">Harita Yükleniyor...</div>
});

export default function LoadOwnerView() {
    const [loads, setLoads] = useState<MockLoad[]>([]);
    const [selectedLoadId, setSelectedLoadId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'kpi' | 'list'>('list');

    // Fetch data from Mock Service on mount
    useEffect(() => {
        const fetchLoads = async () => {
            setLoading(true);
            try {
                // TRY REAL DATA FIRST
                const service: TransportService = SupabaseTransportService.getInstance();
                const data = await service.getLoads();

                if (data && data.length > 0) {
                    console.log('Using Real Supabase Data:', data);
                    setLoads(data);
                } else {
                    console.warn('Real data empty or failed, falling back to Mock.');
                    const mockService: TransportService = MockTransportService.getInstance();
                    setLoads(await mockService.getLoads());
                }
            } catch (e) {
                console.error('Failed to fetch real data', e);
                // Fallback
                const mockService: TransportService = MockTransportService.getInstance();
                setLoads(await mockService.getLoads());
            } finally {
                setLoading(false);
            }
        };
        fetchLoads();
    }, []);

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-6 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0b] to-black opacity-80 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"></div>

            {/* Top KPI Bar */}
            <div className="grid grid-cols-4 gap-4 shrink-0 z-10">
                <div className="p-4 rounded-xl bg-slate-900/20 backdrop-blur-md border border-white/5 flex flex-col justify-between overflow-hidden relative group hover:border-blue-500/20 transition-colors">
                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <Truck className="w-12 h-12 text-blue-500 transform rotate-12" />
                    </div>
                    <div className="flex justify-between items-start z-10">
                        <div>
                            <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold mb-1">Aktif Yükler</div>
                            <div className="text-3xl font-bold text-white tracking-tight">{loads.length}</div>
                        </div>
                        <div className="text-blue-400 text-xs flex items-center bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                            <TrendingUp className="w-3 h-3 mr-1" /> +2
                        </div>
                    </div>
                    {/* Sparkline for Trend */}
                    <div className="h-10 mt-2 -mx-2 opacity-70">
                        <Sparkline data={[12, 18, 15, 22, 28, 25, 32, 28, 35, 42]} color="text-blue-400" fill="fill-blue-500/5" />
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/20 backdrop-blur-md border border-white/5 flex items-center justify-between group hover:border-violet-500/20 transition-colors">
                    <div>
                        <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold mb-1">AI Tahmini: Zamanında</div>
                        <div className="text-3xl font-bold text-white tracking-tight">%98.5</div>
                        <div className="text-violet-400 text-[10px] mt-1 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></div>
                            Yapay Zeka Onaylı
                        </div>
                    </div>
                    <DonutChart value={98.5} color="text-violet-500" trackColor="text-white/5" size={60} />
                </div>

                <div className="p-4 rounded-xl bg-slate-900/20 backdrop-blur-md border border-white/5 flex flex-col justify-between group hover:border-emerald-500/20 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold mb-1">Toplam Tasarruf</div>
                            <div className="text-3xl font-bold text-white tracking-tight">€ 3,450</div>
                        </div>
                        <div className="text-emerald-400 text-xs flex items-center">
                            %12 Pazar Altı
                        </div>
                    </div>
                    {/* Tiny Bar Chart for Savings History */}
                    <div className="h-10 mt-2 flex items-end justify-between gap-1 opacity-80">
                        <TinyBarChart data={[40, 65, 45, 80, 55, 90, 75, 100]} activeIndex={7} />
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900/10 via-slate-900/20 to-slate-900/20 backdrop-blur-md border border-emerald-500/20 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full"></div>
                    <div className="flex items-center gap-2 text-emerald-400 text-[10px] uppercase tracking-wider font-semibold z-10">
                        <Leaf className="w-3 h-3" /> Yeşil Lojistik
                    </div>
                    <div className="flex items-end justify-between z-10">
                        <div>
                            <div className="text-3xl font-bold text-white tracking-tight">4.2 Ton</div>
                            <div className="text-slate-400 text-xs">CO2 Azaltımı</div>
                        </div>
                        <div className="bg-emerald-500/10 p-2 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                            <Leaf className="w-6 h-6 text-emerald-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0 z-10">

                {/* Left: Smart Load List & Tools */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 overflow-hidden">
                    <LoadInputWidget />
                    <ActiveShipmentsList
                        loads={loads}
                        selectedId={selectedLoadId || ''}
                        onSelect={setSelectedLoadId}
                    />
                </div>

                {/* Right: Static Interactive Map (Placeholder) */}
                {/* Right: Interactive Map */}
                <div className="col-span-12 lg:col-span-8 relative h-[600px] bg-[#1a1b1e] rounded-2xl border border-white/5 shadow-2xl overflow-hidden glass-panel group">
                    <div className="absolute inset-0 z-0">
                        <LiveMap loads={loads} selectedId={selectedLoadId} />
                    </div>

                    {/* Gradient Overlay for Text Readability - Minimal for map interactions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-10 opacity-50"></div>

                    {/* DETAIL PANEL SLIDE-OVER */}
                    <ShipmentDetails
                        load={loads.find(l => l.id === selectedLoadId) || null}
                        onClose={() => setSelectedLoadId(null)}
                    />

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-[400]">
                        <button className="w-8 h-8 bg-slate-900/90 backdrop-blur border border-white/10 rounded flex items-center justify-center text-white hover:bg-slate-700 shadow-lg">
                            <Plus className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-slate-900/90 backdrop-blur border border-white/10 rounded flex items-center justify-center text-white hover:bg-slate-700 shadow-lg">
                            <Navigation className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Bottom Info Bar on Map */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-900/90 backdrop-blur border border-white/10 rounded-xl flex justify-between items-center z-[400] shadow-xl">
                        <div>
                            <div className="text-white font-bold text-sm">Canlı İzleme Modu</div>
                            <div className="text-slate-400 text-xs">Yapay Zeka Destekli Rota ve Kısıtlama Kontrolü.</div>
                        </div>
                        <Button variant="outline" className="border-white/10 text-white hover:bg-slate-800 h-8 text-xs">
                            Tam Ekran
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
