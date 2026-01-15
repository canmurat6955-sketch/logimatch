'use client';

import { useEffect, useState } from 'react';
import { FleetService, TireRecord } from '@/lib/services/fleet';
import { CircleDashed, TrendingUp, AlertCircle, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function TireManagement() {
    const [tires, setTires] = useState<TireRecord[]>([]);
    const [benchmarks, setBenchmarks] = useState<{ brand: string, costPer1k: number, lifespan: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const service = FleetService.getInstance();
        Promise.all([service.getTireRecords(), service.getTireBenchmark()]).then(([tData, bData]) => {
            setTires(tData);
            setBenchmarks(bData);
            setLoading(false);
        });
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        vehiclePlate: '34 VR 8821',
        brand: 'Good Year',
        model: '',
        size: '315/70 R22.5',
        price: '',
        supplier: 'Emre Lastik',
        installKm: '',
        position: 'Front-Left'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const service = FleetService.getInstance();
        await service.addTireRecord({
            vehiclePlate: formData.vehiclePlate,
            brand: formData.brand as any,
            model: formData.model || 'Standard',
            size: formData.size,
            purchaseDate: new Date().toISOString().split('T')[0],
            purchasePrice: Number(formData.price),
            supplier: formData.supplier,
            installKm: Number(formData.installKm),
            currentKm: Number(formData.installKm), // Assuming new tire
            estimatedLifeKm: 250000, // Default estimate
            position: formData.position as any,
            health: 'Good'
        });

        // Refresh Data
        const tData = await service.getTireRecords();
        setTires(tData);
        setIsOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <CircleDashed className="w-6 h-6 text-yellow-500 animate-[spin_10s_linear_infinite]" />
                        Lastik & Performans Yönetimi
                    </h2>
                    <p className="text-sm text-slate-400">Tedarik Ortağımız: <span className="text-yellow-400 font-bold">Good Year & Emre Lastik</span></p>
                </div>
                <div className="flex gap-2">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                <TrendingUp className="w-4 h-4 mr-2" /> Lastik Değişimi / Ekle
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-900 border-white/10 text-white">
                            <h2 className="text-lg font-bold mb-4">Yeni Lastik Girişi</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm">Plaka</label>
                                    <input className="w-full bg-slate-950 border border-white/10 rounded p-2 text-sm"
                                        value={formData.vehiclePlate} onChange={e => setFormData({ ...formData, vehiclePlate: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm">Marka</label>
                                        <select className="w-full bg-slate-950 border border-white/10 rounded p-2 text-sm"
                                            value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })}>
                                            <option value="Good Year">Good Year</option>
                                            <option value="Michelin">Michelin</option>
                                            <option value="Lassa">Lassa</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm">Pozisyon</label>
                                        <select className="w-full bg-slate-950 border border-white/10 rounded p-2 text-sm"
                                            value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })}>
                                            <option value="Front-Left">Ön Sol</option>
                                            <option value="Front-Right">Ön Sağ</option>
                                            <option value="Rear-Left">Arka Sol</option>
                                            <option value="Rear-Right">Arka Sağ</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm">Takılan KM</label>
                                    <input type="number" className="w-full bg-slate-950 border border-white/10 rounded p-2 text-sm"
                                        value={formData.installKm} onChange={e => setFormData({ ...formData, installKm: e.target.value })} placeholder="Örn: 150000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm">Fiyat (TL)</label>
                                    <input type="number" className="w-full bg-slate-950 border border-white/10 rounded p-2 text-sm"
                                        value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="0.00" />
                                </div>
                                <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">Kaydet</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                        <ShoppingCart className="w-4 h-4 mr-2" /> Sipariş Geç (Emre Lastik)
                    </Button>
                </div>
            </div>

            {/* BENCHMARK SECTION */}
            <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-white/10">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                            Maliyet Benchmark (TL / 1000 KM)
                        </h3>
                        <div className="space-y-4">
                            {benchmarks.map((b, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className={`font-semibold ${b.brand === 'Good Year' ? 'text-yellow-400' : 'text-slate-300'}`}>
                                            {b.brand} {b.brand === 'Good Year' && '(Önerilen)'}
                                        </span>
                                        <span className="text-white font-mono">{b.costPer1k.toFixed(2)} TL</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${b.brand === 'Good Year' ? 'bg-yellow-500' :
                                                b.costPer1k < 60 ? 'bg-emerald-500' :
                                                    'bg-slate-600'
                                                }`}
                                            style={{ width: `${(b.costPer1k / 80) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-1">
                                        Ortalama Ömür: {(b.lifespan / 1000).toFixed(0)}k km
                                        {b.brand === 'Good Year' && <span className="ml-2 text-green-400 font-bold">En Verimli Seçim</span>}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* FLEET TIRE HEALTH */}
                <Card className="bg-slate-900/50 border-white/10">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            Filo Lastik Sağlığı
                        </h3>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                            {tires.map(tire => {
                                const lifePercentage = 100 - ((tire.currentKm - tire.installKm) / tire.estimatedLifeKm * 100);
                                return (
                                    <div key={tire.id} className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-yellow-500/30 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="text-sm font-bold text-white">{tire.vehiclePlate}</div>
                                                <div className="text-[10px] text-slate-400">{tire.brand} - {tire.position}</div>
                                            </div>
                                            <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${lifePercentage < 20 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                                                }`}>
                                                %{lifePercentage.toFixed(0)} Kalan
                                            </div>
                                        </div>
                                        <Progress value={lifePercentage} className="h-1.5 bg-slate-700" indicatorClassName={lifePercentage < 20 ? 'bg-red-500' : 'bg-emerald-500'} />
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
