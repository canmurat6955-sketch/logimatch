'use client';

import { useEffect, useState } from 'react';
import { FleetService, InsurancePolicy } from '@/lib/services/fleet';
import { Shield, AlertTriangle, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function InsuranceSection() {
    const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        FleetService.getInstance().getInsurancePolicies().then(data => {
            setPolicies(data);
            setLoading(false);
        });
    }, []);

    const totalPremium = policies.reduce((acc, p) => acc + p.premium, 0);
    const expiringSoon = policies.filter(p => p.status === 'expiring_soon').length;

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        vehiclePlate: '34 VR 8821',
        type: 'Traffic Insurance',
        provider: 'Axa Sigorta' as const,
        policyNumber: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        premium: '',
        coverage: 'Full Coverage'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const service = FleetService.getInstance();
        await service.addInsurancePolicy({
            vehiclePlate: formData.vehiclePlate,
            type: formData.type as any,
            provider: formData.provider,
            policyNumber: formData.policyNumber || `POL-${Math.floor(Math.random() * 10000)}`,
            startDate: formData.startDate,
            endDate: formData.endDate,
            premium: Number(formData.premium),
            coverage: formData.coverage,
        });

        // Refresh
        const data = await service.getInsurancePolicies();
        setPolicies(data);
        setIsOpen(false);
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Shield className="w-6 h-6 text-blue-500" />
                        Sigorta Yönetimi
                    </h2>
                    <p className="text-sm text-slate-400">Çözüm Ortağımız: <span className="text-blue-400 font-bold">Axa Sigorta</span></p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                            Yeni Poliçe Ekle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/10 text-white">
                        <DialogHeader>
                            <DialogTitle>Yeni Sigorta Poliçesi</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>Araç Plakası</Label>
                                <Input value={formData.vehiclePlate} onChange={e => setFormData({ ...formData, vehiclePlate: e.target.value })} className="bg-slate-950 border-slate-800" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Sigorta Türü</Label>
                                    <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                                        <SelectTrigger className="bg-slate-950 border-slate-800"><SelectValue /></SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            <SelectItem value="Traffic Insurance">Trafik Sigortası</SelectItem>
                                            <SelectItem value="Kasko">Kasko</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Bitiş Tarihi</Label>
                                    <Input type="date" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} className="bg-slate-950 border-slate-800" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Poliçe Tutarı (TL)</Label>
                                <Input type="number" placeholder="0.00" value={formData.premium} onChange={e => setFormData({ ...formData, premium: e.target.value })} className="bg-slate-950 border-slate-800" />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Poliçeyi Kaydet</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-slate-900/50 border-white/5">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Toplam Prim Hacmi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">₺ {totalPremium.toLocaleString('tr-TR')}</div>
                        <div className="text-xs text-blue-400 mt-1">Bu yıl Axa Sigorta güvencesinde</div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-white/5">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Aktif Poliçeler</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-400">{policies.length}</div>
                        <div className="text-xs text-slate-500 mt-1">Araç filosu %100 sigortalı</div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-white/5">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Yenileme Bekleyen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-500">{expiringSoon}</div>
                        <div className="text-xs text-slate-500 mt-1">30 gün içinde dolacaklar</div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-semibold text-white">Poliçe Listesi</h3>
                    <div className="text-xs text-slate-500">Son Güncelleme: Bugün</div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-slate-400">
                            <tr>
                                <th className="p-3">Plaka</th>
                                <th className="p-3">Tür</th>
                                <th className="p-3">Kapsam</th>
                                <th className="p-3">Bitiş Tarihi</th>
                                <th className="p-3">Tutar</th>
                                <th className="p-3">Durum</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {policies.map(policy => (
                                <tr key={policy.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-3 font-medium text-white">{policy.vehiclePlate}</td>
                                    <td className="p-3 text-slate-300">{policy.type}</td>
                                    <td className="p-3 text-slate-400 text-xs">{policy.coverage}</td>
                                    <td className="p-3 text-slate-300">{new Date(policy.endDate).toLocaleDateString('tr-TR')}</td>
                                    <td className="p-3 text-white font-mono">₺ {policy.premium.toLocaleString()}</td>
                                    <td className="p-3">
                                        <Badge variant={policy.status === 'active' ? 'default' : 'destructive'}
                                            className={
                                                policy.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                    policy.status === 'expiring_soon' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                        'bg-red-500/10 text-red-500 border-red-500/20'
                                            }>
                                            {policy.status === 'active' ? 'Aktif' : policy.status === 'expiring_soon' ? 'Yaklaşıyor' : 'Süresi Doldu'}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-right">
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
