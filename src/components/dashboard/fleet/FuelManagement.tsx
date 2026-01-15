'use client';

import { useEffect, useState } from 'react';
import { FleetService, FuelRecord } from '@/lib/services/fleet';
import { Fuel, TrendingUp, Plus, Truck, Droplets, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

export default function FuelManagement() {
    const [records, setRecords] = useState<FuelRecord[]>([]);
    const [consumptionStats, setConsumptionStats] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        vehiclePlate: '',
        amount: '',
        cost: '',
        odometer: '',
        location: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const service = FleetService.getInstance();
        const recs = await service.getFuelRecords();
        setRecords(recs);

        // Calculate stats for unique vehicles
        const plates = Array.from(new Set(recs.map(r => r.vehiclePlate)));
        const stats: Record<string, any> = {};

        for (const plate of plates) {
            stats[plate] = await service.calculateConsumption(plate);
        }
        setConsumptionStats(stats);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const service = FleetService.getInstance();
        await service.addFuelRecord({
            vehiclePlate: formData.vehiclePlate,
            amount: Number(formData.amount),
            cost: Number(formData.cost),
            odometer: Number(formData.odometer),
            location: formData.location || 'Unknown',
            date: formData.date,
            fullTank: true
        });
        setIsOpen(false);
        setFormData({ vehiclePlate: '', amount: '', cost: '', odometer: '', location: '', date: new Date().toISOString().split('T')[0] });
        loadData();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Fuel className="w-6 h-6 text-blue-500" />
                        Yakıt & Tüketim Yönetimi
                    </h2>
                    <p className="text-sm text-slate-400">Filo yakıt giderleri ve tüketim analizi.</p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="w-4 h-4 mr-2" /> Yakıt Fişi Gir
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Yeni Yakıt Kaydı</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>Araç Plakası</Label>
                                <Select
                                    value={formData.vehiclePlate}
                                    onValueChange={(val) => setFormData({ ...formData, vehiclePlate: val })}
                                >
                                    <SelectTrigger className="bg-slate-950 border-slate-800">
                                        <SelectValue placeholder="Plaka Seçin" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                        <SelectItem value="34 VR 8821">34 VR 8821 (Mercedes Actros)</SelectItem>
                                        <SelectItem value="06 TR 999">06 TR 999 (Ford F-Max)</SelectItem>
                                        <SelectItem value="35 KL 551">35 KL 551 (Scania R500)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Litre</Label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                        className="bg-slate-950 border-slate-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tutar (TL)</Label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.cost}
                                        onChange={e => setFormData({ ...formData, cost: e.target.value })}
                                        className="bg-slate-900 border-slate-800"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Kilometre (Odometer)</Label>
                                <Input
                                    type="number"
                                    placeholder="Örn: 145000"
                                    value={formData.odometer}
                                    onChange={e => setFormData({ ...formData, odometer: e.target.value })}
                                    className="bg-slate-900 border-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Lokasyon / İstasyon</Label>
                                <Input
                                    placeholder="Örn: Shell Bolu"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    className="bg-slate-900 border-slate-800"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                Kaydet
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* CONSUMPTION CARDS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(consumptionStats).map(([plate, stat]) => (
                    <Card key={plate} className="bg-slate-900/50 border-white/10 hover:border-blue-500/30 transition-all">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400 flex justify-between">
                                {plate}
                                {stat.average > 35 ? (
                                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                                ) : (
                                    <Truck className="w-4 h-4 text-blue-500" />
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-2xl font-bold text-white">{stat.average.toFixed(1)}</span>
                                <span className="text-sm text-slate-500">L / 100km</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] text-slate-400">
                                    <span>Verimlilik Hedefi (28L)</span>
                                    <span>
                                        {stat.average <= 30 ? 'İyi' : stat.average <= 35 ? 'Orta' : 'Kötü'}
                                    </span>
                                </div>
                                <Progress
                                    value={Math.min(100, (30 / stat.average) * 100)}
                                    className="h-1.5 bg-slate-800"
                                    indicatorClassName={stat.average > 35 ? 'bg-red-500' : stat.average > 30 ? 'bg-yellow-500' : 'bg-emerald-500'}
                                />
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                                <div className="text-slate-400">Son Tüketim</div>
                                <div className={`font-mono ${stat.trend === 'up' ? 'text-red-400' : 'text-emerald-400'} flex items-center gap-1`}>
                                    {stat.last.toFixed(1)} L
                                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* RECENT RECORDS TABLE */}
            <Card className="bg-slate-900 border-white/10">
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-300">Son Yakıt İşlemleri</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                        {records.map(r => (
                            <div key={r.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg text-sm group hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <Droplets className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{r.vehiclePlate}</div>
                                        <div className="text-xs text-slate-500">{r.location} • {new Date(r.date).toLocaleDateString('tr-TR')}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-white">{r.cost.toLocaleString('tr-TR')} ₺</div>
                                    <div className="text-xs text-slate-400">{r.amount} Lt • {r.odometer.toLocaleString()} km</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
