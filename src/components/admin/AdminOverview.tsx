import { LucideActivity, LucideUsers, LucideTruck, LucideDollarSign, LucideArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import LiveActivityFeed from './LiveActivityFeed';
import LiveFleetMap from "@/components/admin/LiveFleetMap";

export default function AdminOverview() {
    const stats = [
        { label: "Toplam Ciro (Aylık)", value: "₺24.5M", change: "+12.5%", icon: LucideDollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Aktif Kullanıcı", value: "1,248", change: "+85", icon: LucideUsers, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Operasyondaki Araç", value: "856", change: "+42", icon: LucideTruck, color: "text-orange-500", bg: "bg-orange-500/10" },
        { label: "Sistem Yükü", value: "%24", change: "-2%", icon: LucideActivity, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Genel Bakış</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-start justify-between">
                        <div>
                            <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                            <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
                                <LucideArrowUpRight className="w-3 h-3" />
                                <span>{stat.change}</span>
                                <span className="text-zinc-600 ml-1">geçen aya göre</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                {/* Live Workflow Feed */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden h-full">
                    <LiveActivityFeed />
                </div>

                {/* Regional Activity - Layout adjusted */}
                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col h-full">
                    <h3 className="text-lg font-bold text-white mb-4">Bölgesel Aktivite</h3>
                    <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
                        <div className="w-full h-full bg-zinc-950/50 rounded-lg overflow-hidden border border-zinc-800 relative">
                            <LiveFleetMap />
                            {/* Overlay for "Overview Mode" to prevent too much interaction if desired, or keep as is */}
                            <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] text-zinc-400 pointer-events-none z-[1000]">
                                Canlı Yoğunluk
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
