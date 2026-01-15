'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Truck, Fuel, Shield, AlertTriangle, Phone, MessageSquare, MapPin, Navigation, Gauge, Thermometer } from 'lucide-react';
import { FleetService, FuelRecord, TireRecord, InsurancePolicy } from '@/lib/services/fleet';
import { MockTransportService, MockLoad } from '@/lib/services/transport';
import dynamic from 'next/dynamic';

// Dynamic import for map to avoid SSR issues
const MiniMap = dynamic(() => import('../../map/MapComponent'), {
    ssr: false,
    loading: () => <div className="h-40 bg-slate-900 animate-pulse rounded-lg" />
});

interface VehicleDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    vehiclePlate: string;
}

export default function VehicleDetailDialog({ isOpen, onClose, vehiclePlate }: VehicleDetailDialogProps) {
    const [loading, setLoading] = useState(true);
    const [fuelStats, setFuelStats] = useState<{ average: number, last: number, trend: 'up' | 'down' | 'stable' } | null>(null);
    const [tires, setTires] = useState<TireRecord[]>([]);
    const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
    const [activeLoad, setActiveLoad] = useState<MockLoad | null>(null);

    useEffect(() => {
        if (isOpen && vehiclePlate) {
            loadData();
        }
    }, [isOpen, vehiclePlate]);

    const loadData = async () => {
        setLoading(true);
        const fleetService = FleetService.getInstance();
        const transportService = MockTransportService.getInstance();

        const [fStats, tRecs, pRecs, loads] = await Promise.all([
            fleetService.calculateConsumption(vehiclePlate),
            fleetService.getTireRecords(),
            fleetService.getInsurancePolicies(),
            transportService.getLoads()
        ]);

        setFuelStats(fStats);
        setTires(tRecs.filter(t => t.vehiclePlate === vehiclePlate));
        setPolicies(pRecs.filter(p => p.vehiclePlate === vehiclePlate));

        // Find active load for this vehicle (mock logic matching plate or random assignment for demo)
        const load = loads.find(l => l.vehicle === vehiclePlate) || loads[0];
        setActiveLoad(load);

        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-slate-950 border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                <Truck className="w-6 h-6 text-blue-500" />
                                {vehiclePlate}
                            </DialogTitle>
                            <p className="text-slate-400 text-sm mt-1">Mercedes-Benz Actros 1848 • 2023 Model</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                                Aktif Operasyonda
                            </Badge>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {/* LEFT COLUMN: STATUS & ACTIONS */}
                    <div className="space-y-4">
                        {/* Driver Card */}
                        <Card className="bg-slate-900/50 border-white/5">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                        <Truck className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{activeLoad?.driver.name || 'Ahmet Yılmaz'}</div>
                                        <div className="text-xs text-slate-400">Kıdemli Sürücü (4.9 ★)</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button size="sm" variant="outline" className="w-full border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                                        <Phone className="w-4 h-4 mr-2" /> Ara
                                    </Button>
                                    <Button size="sm" variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                                        <MessageSquare className="w-4 h-4 mr-2" /> Mesaj
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-slate-900/50 border-white/5 p-4">
                                <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                                    <Fuel className="w-3 h-3 text-blue-500" /> Yakıt Ort.
                                </div>
                                <div className="text-xl font-bold text-white">
                                    {fuelStats?.average.toFixed(1) || '28.4'} <span className="text-xs font-normal text-slate-500">L/100km</span>
                                </div>
                            </Card>
                            <Card className="bg-slate-900/50 border-white/5 p-4">
                                <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                                    <Gauge className="w-3 h-3 text-emerald-500" /> Hız
                                </div>
                                <div className="text-xl font-bold text-white">
                                    82 <span className="text-xs font-normal text-slate-500">km/s</span>
                                </div>
                            </Card>
                        </div>

                        {/* Status Grid */}
                        <div className="bg-white/5 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Motor Sıcaklığı</span>
                                <span className="text-white font-mono flex items-center gap-2">
                                    <Thermometer className="w-3 h-3 text-amber-500" /> 88°C
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Kalan Sürüş</span>
                                <span className="text-white font-mono">3s 45dk</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Son Kontak</span>
                                <span className="text-emerald-400 font-mono">Aktif</span>
                            </div>
                        </div>
                    </div>

                    {/* VITAL SIGNS TABS */}
                    <div className="md:col-span-2">
                        <Tabs defaultValue="location" className="w-full">
                            <TabsList className="bg-slate-900/50 border border-white/5 w-full justify-start p-1 h-auto">
                                <TabsTrigger value="location" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-2">
                                    <MapPin className="w-4 h-4" /> Konum
                                </TabsTrigger>
                                <TabsTrigger value="tires" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black gap-2">
                                    <Gauge className="w-4 h-4" /> Lastikler
                                </TabsTrigger>
                                <TabsTrigger value="insurance" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white gap-2">
                                    <Shield className="w-4 h-4" /> Sigorta
                                </TabsTrigger>
                            </TabsList>

                            {/* Location Tab */}
                            <TabsContent value="location" className="mt-4 space-y-4">
                                <div className="h-64 rounded-xl border border-white/10 overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                                        <MiniMap className="w-full h-full" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-2 rounded-lg border border-white/10">
                                        <div className="text-xs text-slate-400">Güncel Lokasyon</div>
                                        <div className="text-sm font-bold text-white flex items-center gap-1">
                                            <Navigation className="w-3 h-3 text-blue-500" /> {activeLoad?.origin} yakınlarında
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5">
                                        <div className="text-xs text-slate-400">Kalan Mesafe</div>
                                        <div className="font-bold text-white">458 km</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5">
                                        <div className="text-xs text-slate-400">Tahmini Varış</div>
                                        <div className="font-bold text-white">Bu akşam, 20:30</div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Tires Tab */}
                            <TabsContent value="tires" className="mt-4">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {tires.length > 0 ? tires.map((tire, i) => {
                                        const life = 100 - ((tire.currentKm - tire.installKm) / tire.estimatedLifeKm * 100);
                                        return (
                                            <Card key={i} className="bg-slate-900/50 border-white/5">
                                                <CardContent className="p-3 text-center">
                                                    <div className="text-xs text-slate-400 mb-2">{tire.position}</div>
                                                    <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                            <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                                            <path className={life < 30 ? 'text-red-500' : 'text-emerald-500'} strokeDasharray={`${life}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                                        </svg>
                                                        <span className="absolute text-xs font-bold text-white">%{life.toFixed(0)}</span>
                                                    </div>
                                                    <div className="text-[10px] text-slate-500">{tire.brand}</div>
                                                </CardContent>
                                            </Card>
                                        )
                                    }) : (
                                        <div className="col-span-4 text-center py-8 text-slate-500">
                                            Lastik verisi bulunamadı.
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            {/* Insurance Tab */}
                            <TabsContent value="insurance" className="mt-4">
                                <div className="space-y-3">
                                    {policies.length > 0 ? policies.map(policy => {
                                        const daysLeft = Math.ceil((new Date(policy.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                                        return (
                                            <div key={policy.id} className="flex items-center justify-between p-4 bg-slate-900/50 border border-white/5 rounded-lg">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                                        <Shield className="w-5 h-5 text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white">{policy.type}</div>
                                                        <div className="text-xs text-slate-400">{policy.provider} • {policy.policyNumber}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`text-sm font-bold ${daysLeft < 30 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                                        {daysLeft} Gün Kaldı
                                                    </div>
                                                    <div className="text-xs text-slate-500">{new Date(policy.endDate).toLocaleDateString('tr-TR')}</div>
                                                </div>
                                            </div>
                                        )
                                    }) : (
                                        <div className="text-center py-8 text-slate-500">
                                            Poliçe bilgisi bulunamadı.
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
