'use client';

import { useState, useEffect } from 'react';
import { getFinancialStats, FinancialSummary } from '@/lib/actions/finance';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, TrendingUp } from 'lucide-react';
import InsuranceSection from '@/components/dashboard/finance/InsuranceSection';
import TireManagement from '@/components/dashboard/fleet/TireManagement';
import FuelManagement from '@/components/dashboard/fleet/FuelManagement';

export default function FinancePage() {
    const [stats, setStats] = useState<FinancialSummary | null>(null);

    useEffect(() => {
        getFinancialStats(2026).then(setStats);
    }, []);

    if (!stats) return <div className="text-white p-8">Finans verileri yükleniyor...</div>;

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-white">Finansal Genel Bakış</h1>
                <p className="text-slate-400">Gelir, gider ve kârlılık takibi.</p>
            </div>

            {/* KPI CARDS */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="w-24 h-24 text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-2 text-emerald-400">
                        <ArrowUpRight className="w-5 h-5" />
                        <span className="font-medium">Toplam Gelir</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        ₺ {stats.totalRevenue.toLocaleString('tr-TR')}
                    </div>
                    <div className="text-sm text-slate-500">Son 6 ay toplamı</div>
                </div>

                <div className="bg-slate-900 border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Wallet className="w-24 h-24 text-rose-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-2 text-rose-400">
                        <ArrowDownRight className="w-5 h-5" />
                        <span className="font-medium">Toplam Gider</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        ₺ {stats.totalExpense.toLocaleString('tr-TR')}
                    </div>
                    <div className="text-sm text-slate-500">Son 6 ay toplamı</div>
                </div>

                <div className="bg-slate-900 border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign className="w-24 h-24 text-blue-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-2 text-blue-400">
                        <Wallet className="w-5 h-5" />
                        <span className="font-medium">Net Kâr</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        ₺ {stats.netProfit.toLocaleString('tr-TR')}
                    </div>
                    <div className="text-sm text-blue-200/50">Kâr Marjı: %{stats.profitMargin.toFixed(1)}</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* CHART SECTION */}
                <div className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Aylık Nakit Akışı</h3>

                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                        {stats.monthlyStats.map((m, i) => {
                            const maxVal = Math.max(...stats.monthlyStats.map(s => Math.max(s.revenue, s.expense)));
                            const revH = (m.revenue / maxVal) * 100;
                            const expH = (m.expense / maxVal) * 100;

                            return (
                                <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                    <div className="w-full flex justify-center items-end gap-1 h-full relative">
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-xs p-2 rounded shadow-xl whitespace-nowrap z-10 pointer-events-none">
                                            <div>Gelir: {m.revenue.toLocaleString()} ₺</div>
                                            <div className="text-rose-400">Gider: {m.expense.toLocaleString()} ₺</div>
                                        </div>

                                        {/* Bars */}
                                        <div className="w-3 md:w-6 bg-rose-500/50 hover:bg-rose-500 transition-colors rounded-t-sm" style={{ height: `${expH}%` }}></div>
                                        <div className="w-3 md:w-6 bg-emerald-500/50 hover:bg-emerald-500 transition-colors rounded-t-sm" style={{ height: `${revH}%` }}></div>
                                    </div>
                                    <div className="text-xs text-slate-500 rotate-0 truncate w-full text-center">{m.month.substring(0, 3)}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RECENT TRANSACTIONS */}
                <div className="bg-slate-900 border border-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Son İşlemler</h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {stats.recentTransactions.map((t, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                        {t.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white flex items-center gap-2">
                                            {t.category ? t.category.toUpperCase() : 'İŞLEM'}
                                            {t.status === 'pending' && <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded">Bekliyor</span>}
                                        </div>
                                        <div className="text-xs text-slate-500 truncate max-w-[120px]">{t.description}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {t.type === 'income' && t.status === 'pending' && (
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded">
                                            Hemen Al (%2)
                                        </button>
                                    )}
                                    <div className={`font-bold text-sm ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {t.type === 'income' ? '+' : '-'} {t.amount.toLocaleString('tr-TR')} ₺
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PARTNERSHIP MODULES */}
            <div className="grid lg:grid-cols-1 gap-8 pt-8 border-t border-white/10">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Fuel Management - NEW */}
                    <div className="lg:col-span-2">
                        <FuelManagement />
                    </div>

                    {/* Insurance Module - Axa Partnership */}
                    <InsuranceSection />

                    {/* Tire Module - Good Year Partnership */}
                    <TireManagement />
                </div>
            </div>
        </div>
    );
}
