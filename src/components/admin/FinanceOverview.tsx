import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getFinancialStats, FinancialSummary } from '@/lib/actions/finance';
import { LucideLoader } from 'lucide-react';
import TripCostCalculator from './TripCostCalculator';

export default function AdminFinance() {
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState(new Date().getFullYear());
    const [stats, setStats] = useState<FinancialSummary | null>(null);

    useEffect(() => {
        loadStats();
    }, [year]);

    const loadStats = async () => {
        setLoading(true);
        try {
            const data = await getFinancialStats(year);
            setStats(data);
        } catch (error) {
            console.error("Failed to load finance stats", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Finansal İstihbarat</h1>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col min-h-[400px]">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Gelir / Gider Analizi</h3>
                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="bg-black border border-zinc-800 text-sm text-zinc-400 rounded-lg p-2 focus:outline-none"
                    >
                        <option value={2026}>2026</option>
                        <option value={2025}>2025</option>
                        <option value={2024}>2024</option>
                    </select>
                </div>

                <div className="w-full h-[400px]">
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center text-zinc-500">
                            <LucideLoader className="w-6 h-6 animate-spin mr-2" /> Analiz ediliyor...
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats?.chartData || []}>
                                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => `₺${value}`} />
                                <Tooltip
                                    cursor={{ fill: '#27272a' }}
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                                    formatter={(value: any) => `₺${(Number(value) || 0).toLocaleString()}`}
                                />
                                <Legend />
                                <Bar dataKey="revenue" name="Gelir" fill="#10b981" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expense" name="Gider" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                    <h4 className="text-zinc-500 text-sm mb-1">Toplam Kar (YTD)</h4>
                    <p className={`text-2xl font-bold ${stats?.totalProfit && stats.totalProfit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {loading ? '...' : `₺${stats?.totalProfit.toLocaleString()}`}
                    </p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                    <h4 className="text-zinc-500 text-sm mb-1">Bekleyen Ödemeler</h4>
                    <p className="text-2xl font-bold text-orange-500">
                        {loading ? '...' : `₺${stats?.pendingPayments.toLocaleString()}`}
                    </p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                    <h4 className="text-zinc-500 text-sm mb-1">Ortalama Marj</h4>
                    <p className={`text-2xl font-bold ${stats?.averageMargin && stats.averageMargin >= 15 ? 'text-blue-500' : 'text-yellow-500'}`}>
                        {loading ? '...' : `%${stats?.averageMargin}`}
                    </p>
                </div>
            </div>

            <TripCostCalculator />
        </div>
    );
}
