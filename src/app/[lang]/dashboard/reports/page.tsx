'use client';

import { useState, useEffect } from 'react';
import { getReportStats, addExpense } from '@/lib/actions/resources';
import { getVehicles, getDashboardStats } from '@/lib/actions/fleet';
import { Vehicle } from '@/lib/types/vehicle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
    AlertTriangle, TrendingUp, DollarSign, Fuel, Wrench, Settings
} from 'lucide-react';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

export default function ReportsPage() {
    // State
    const [stats, setStats] = useState<any>(null);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isExpenseModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [selectedCategory, setSelectedCategory] = useState('fuel');

    const refresh = async () => {
        const s = await getReportStats();
        setStats(s);
        const v = await getVehicles();
        if (v.data) setVehicles(v.data);
    };

    useEffect(() => {
        refresh();
    }, []);

    const handleAddExpense = async (formData: FormData) => {
        const vehicle_id = formData.get('vehicle_id') as string;
        const amount = parseFloat(formData.get('amount') as string);
        const date = formData.get('date') as string;

        const metadata: any = {};

        if (selectedCategory === 'fuel') {
            metadata.liters_per_100km = parseFloat(formData.get('liters_per_100km') as string);
            metadata.station = formData.get('station') as string;
        } else if (selectedCategory === 'tire') {
            metadata.tire_brand = formData.get('tire_brand') as string;
            metadata.lifespan_km = parseFloat(formData.get('lifespan_km') as string);
        } else if (selectedCategory === 'maintenance') {
            metadata.provider = formData.get('provider') as string;
        }

        await addExpense({
            vehicle_id,
            amount,
            date,
            category: selectedCategory as any, // Type cast to resolve potential mismatch with 'ExpenseCategory'
            metadata
        });

        setIsModalOpen(false);
        refresh();
    };

    if (!stats) return <div className="text-white">Yükleniyor...</div>;

    return (
        <div className="space-y-8 pb-12">

            {/* Header & Actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Raporlar & Analizler</h1>
                    <p className="text-slate-400">Filo performansı, giderler ve benchmark verileri.</p>
                </div>

                <Dialog open={isExpenseModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
                            <DollarSign className="w-4 h-4" /> Gider Ekle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/10 text-white max-w-md">
                        <DialogHeader>
                            <DialogTitle>Yeni Gider Kaydı</DialogTitle>
                        </DialogHeader>
                        <form action={handleAddExpense} className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Araç</label>
                                    <select name="vehicle_id" className="w-full bg-slate-950 border border-white/10 rounded-md h-10 px-3 text-sm text-white" required>
                                        <option value="">Seçiniz</option>
                                        {vehicles.map(v => <option key={v.id} value={v.id}>{v.plate_number}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Kategori</label>
                                    <select
                                        name="category"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full bg-slate-950 border border-white/10 rounded-md h-10 px-3 text-sm text-white"
                                    >
                                        <option value="fuel">Yakıt</option>
                                        <option value="tire">Lastik</option>
                                        <option value="maintenance">Bakım</option>
                                        <option value="insurance">Sigorta</option>
                                        <option value="food">Yemek/Harcırah</option>
                                        <option value="other">Diğer</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Tutar (TL)</label>
                                    <Input name="amount" type="number" step="0.01" className="bg-slate-950 border-white/10 text-white" required />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Tarih</label>
                                    <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="bg-slate-950 border-white/10 text-white" required />
                                </div>
                            </div>

                            {/* Dynamic Fields */}
                            <div className="p-3 bg-slate-950/50 rounded-lg border border-white/5 space-y-3">
                                {selectedCategory === 'fuel' && (
                                    <>
                                        <div>
                                            <label className="text-xs text-blue-400 mb-1 block">Yakıt Tüketimi (Lt/100km)</label>
                                            <Input name="liters_per_100km" type="number" step="0.1" placeholder="Örn: 32.5" className="bg-slate-900 border-white/10 text-white" />
                                            <p className="text-[10px] text-slate-500 mt-1">*Şoför geri bildirimine göre</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1 block">İstasyon</label>
                                            <Input name="station" placeholder="Shell, Opet..." className="bg-slate-900 border-white/10 text-white" />
                                        </div>
                                    </>
                                )}

                                {selectedCategory === 'tire' && (
                                    <>
                                        <div>
                                            <label className="text-xs text-blue-400 mb-1 block">Lastik Markası</label>
                                            <Input name="tire_brand" placeholder="Lassa, Michelin..." className="bg-slate-900 border-white/10 text-white" required />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1 block">Ömür Beklentisi (KM)</label>
                                            <Input name="lifespan_km" type="number" placeholder="50000" className="bg-slate-900 border-white/10 text-white" />
                                        </div>
                                    </>
                                )}

                                {selectedCategory === 'maintenance' && (
                                    <div>
                                        <label className="text-xs text-slate-400 mb-1 block">Servis Sağlayıcı</label>
                                        <Input name="provider" placeholder="Yetkili Servis X" className="bg-slate-900 border-white/10 text-white" />
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500">Kaydet</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* ALERTS Section */}
            {stats.alerts && stats.alerts.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        <h3 className="font-bold text-amber-500">Kritik Bildirimler</h3>
                    </div>
                    <div className="space-y-2">
                        {stats.alerts.map((alert: any, i: number) => (
                            <div key={i} className="text-sm text-amber-200 ml-8 list-disc">
                                {alert.vehicle} plakalı aracın sigortası <strong>{alert.daysLeft} gün</strong> içinde bitiyor.
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* BENCHMARKS Grid */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Fuel Efficiency Benchmark */}
                <div className="bg-slate-900 border border-white/5 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Fuel className="w-5 h-5 text-blue-400" />
                            <h3 className="text-lg font-bold text-white">Yakıt Verimliliği (L/100km)</h3>
                        </div>
                        <span className="text-xs text-slate-500">Düşük olan daha iyi</span>
                    </div>
                    {stats.fuelBenchmarks.length === 0 ? (
                        <p className="text-slate-500 text-sm">Veri yok. Yakıt gideri eklerken tüketimi giriniz.</p>
                    ) : (
                        <div className="space-y-4">
                            {stats.fuelBenchmarks.map((item: any, i: number) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-white font-medium">{item.name}</span>
                                            <span className="text-blue-400 font-bold">{item.avgConsumption} Lt</span>
                                        </div>
                                        {/* Simple bar visual */}
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${Math.min((item.avgConsumption / 40) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tire Brand Cost Benchmark */}
                <div className="bg-slate-900 border border-white/5 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-bold text-white">Lastik Maliyet Analizi</h3>
                        </div>
                        <span className="text-xs text-slate-500">Marka Bazlı Toplam Harcama</span>
                    </div>
                    {stats.tireBenchmarks.length === 0 ? (
                        <p className="text-slate-500 text-sm">Veri yok. Lastik gideri ekleyiniz.</p>
                    ) : (
                        <div className="space-y-4">
                            {stats.tireBenchmarks.map((item: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                                    <span className="text-white font-medium">{item.brand}</span>
                                    <span className="text-purple-400 font-bold">₺ {item.cost.toLocaleString('tr-TR')}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {/* Expense Breakdown */}
            <div className="bg-slate-900 border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Genel Gider Dağılımı</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {stats.expenseBreakdown.map((item: any, i: number) => (
                        <div key={i} className="p-4 bg-slate-950 rounded-lg text-center border border-white/5">
                            <div className="text-xs uppercase text-slate-500 mb-1">{item.category === 'fuel' ? 'Yakıt' : item.category === 'tire' ? 'Lastik' : item.category === 'maintenance' ? 'Bakım' : item.category}</div>
                            <div className="text-xl font-bold text-white">₺ {item.amount.toLocaleString('tr-TR')}</div>
                        </div>
                    ))}
                    {stats.expenseBreakdown.length === 0 && <p className="text-slate-500 text-sm col-span-full">Henüz gider verisi yok.</p>}
                </div>
            </div>

        </div>
    );
}
