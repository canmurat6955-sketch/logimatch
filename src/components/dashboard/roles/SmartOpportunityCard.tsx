'use client';

import { TrendingUp, MapPin, Clock, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SmartOpportunityCard() {
    return (
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-indigo-900/30 via-slate-900/40 to-slate-900/40 border border-indigo-500/20 overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/15 transition-colors"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                            <Zap className="w-4 h-4 fill-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white">Akıllı Rota Fırsatı</h3>
                            <p className="text-[10px] text-slate-400">Boş alanınız için optimize edildi</p>
                        </div>
                    </div>
                    <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                        +8500 ₺
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Route Deviation Detail */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-white/5">
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                            <div className="w-0.5 h-6 bg-slate-800"></div>
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-slate-300">Sakarya (2. Organize)</span>
                                <span className="text-[10px] text-amber-500 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> +45 km Sapma
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-300">Ankara (Lojistik Üssü)</span>
                                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> +45 dk
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-lg bg-white/5 text-center">
                            <div className="text-[10px] text-slate-500">Yük Tipi</div>
                            <div className="text-xs font-medium text-white">3x Palet</div>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 text-center">
                            <div className="text-[10px] text-slate-500">Ek Kazanç</div>
                            <div className="text-xs font-bold text-emerald-400">%15 Bonus</div>
                        </div>
                    </div>

                    <Button className="w-full h-9 bg-indigo-600 hover:bg-indigo-500 text-xs shadow-lg shadow-indigo-900/20 group-hover:scale-[1.02] transition-transform">
                        Fırsatı Değerlendir
                        <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
