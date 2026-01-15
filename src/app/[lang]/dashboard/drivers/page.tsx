'use client';

import { useState, useEffect } from 'react';
import { getDrivers, addDriver } from '@/lib/actions/resources';
import { Driver } from '@/lib/types/resource';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function DriversPage() {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getDrivers().then(setDrivers);
    }, []);

    const handleAdd = async (formData: FormData) => {
        const full_name = formData.get('full_name') as string;
        const license_type = formData.get('license_type') as string;

        await addDriver({ full_name, license_type });
        setIsModalOpen(false);
        getDrivers().then(setDrivers);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Şoför Yönetimi</h1>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
                            <Plus className="w-4 h-4" /> Yeni Şoför Ekle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/10 text-white">
                        <DialogHeader>
                            <DialogTitle>Yeni Şoför Kartı</DialogTitle>
                        </DialogHeader>
                        <form action={handleAdd} className="space-y-4">
                            <div>
                                <label className="text-sm text-slate-400">Ad Soyad</label>
                                <Input name="full_name" className="bg-slate-950 border-white/10 text-white" required />
                            </div>
                            <div>
                                <label className="text-sm text-slate-400">Ehliyet Sınıfı</label>
                                <Input name="license_type" className="bg-slate-950 border-white/10 text-white" placeholder="Örn: CE, D" required />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">Kaydet</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map(d => (
                    <div key={d.id} className="p-6 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                            <User className="w-6 h-6 text-slate-400" />
                        </div>
                        <div>
                            <div className="font-bold text-white">{d.full_name}</div>
                            <div className="text-sm text-slate-500">{d.license_type} • {d.status === 'active' ? 'Aktif' : 'Pasif'}</div>
                            {d.safety_score && (
                                <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold mt-1 
                                    ${d.safety_score >= 90 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                        d.safety_score >= 70 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                            'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                                    Güvenlik Puanı: {d.safety_score}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {drivers.length === 0 && (
                    <p className="col-span-full text-slate-500 text-center py-12">Henüz şoför eklenmemiş.</p>
                )}
            </div>
        </div>
    );
}
