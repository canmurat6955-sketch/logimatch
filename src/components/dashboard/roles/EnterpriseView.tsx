'use client';

import { ArrowUpRight, TrendingUp, AlertTriangle, Truck, Map as MapIcon } from 'lucide-react';

export default function EnterpriseView() {
    return (
        <div className="space-y-8">
            {/* Enterprise Notice */}
            <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-300 text-sm flex items-center gap-3">
                <Truck className="w-5 h-5" />
                <span>Lojistik Şirketi Modu: Tüm araçları, yükleri ve finansal verileri yönetme yetkisine sahipsiniz.</span>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Aktif Araçlar', value: '24', sub: 'Toplam 32 araçtan', icon: Truck, color: 'blue' },
                    { label: 'Aylık Ciro', value: '₺ 1.2M', sub: '+12% geçen aya göre', icon: TrendingUp, color: 'emerald' },
                    { label: 'Rota Sapmaları', value: '3', sub: 'Kritik uyarı', icon: AlertTriangle, color: 'amber' },
                    { label: 'Dorse Doluluk', value: '%78', sub: 'Ortalama verimlilik', icon: ArrowUpRight, color: 'purple' },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-xl bg-slate-900 border border-white/5 hover:border-white/10 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-500`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full bg-${stat.color}-500/10 text-${stat.color}-400`}>
                                Canlı
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-400">{stat.label}</div>
                        <div className="text-xs text-slate-500 mt-2">{stat.sub}</div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Map / Route Module */}
                <div className="lg:col-span-2 p-6 rounded-xl bg-slate-900 border border-white/5 min-h-[400px]">
                    <h3 className="text-lg font-medium text-white mb-6">Canlı Harita & Rota Durumu</h3>
                    <div className="w-full h-80 bg-slate-800/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                        <span className="text-slate-500 flex items-center gap-2 relative z-10">
                            <MapIcon className="w-5 h-5" /> Google Maps API Integration
                        </span>

                        {/* Mock Vehicle Dots */}
                        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
                        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]" />
                    </div>
                </div>

                {/* Load Suggestions */}
                <div className="p-6 rounded-xl bg-slate-900 border border-white/5">
                    <h3 className="text-lg font-medium text-white mb-6">Akıllı Yük Önerileri</h3>
                    <div className="space-y-4">
                        {[
                            { route: 'Istanbul → Berlin', profit: '₺ 45.000', deviation: '+12 km', match: '98%' },
                            { route: 'Ankara → Izmir', profit: '₺ 12.500', deviation: '+2 km', match: '95%' },
                            { route: 'Bursa → Lyon', profit: '₺ 62.000', deviation: '+45 km', match: '88%' },
                        ].map((load, i) => (
                            <div key={i} className="p-4 rounded-lg bg-slate-800/30 border border-white/5 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-white">{load.route}</span>
                                    <span className="text-xs font-bold text-emerald-400">{load.profit}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-slate-400">
                                    <span className="group-hover:text-amber-400 transition-colors">⚠️ {load.deviation} sapma</span>
                                    <span className="text-blue-400">{load.match} uyum</span>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-2 mt-4 text-sm text-center text-blue-400 hover:text-blue-300 border border-blue-500/20 rounded-lg hover:bg-blue-500/10 transition-colors">
                            Tüm Önerileri Gör
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}
