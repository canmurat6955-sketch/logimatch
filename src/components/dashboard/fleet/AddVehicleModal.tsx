'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Truck, Loader2 } from 'lucide-react';
import { addVehicle } from '@/lib/actions/fleet';

export default function AddVehicleModal({ onSuccess }: { onSuccess?: () => void }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        plate_number: '',
        vehicle_type: '',
        capacity: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await addVehicle(formData);

        setLoading(false);
        if (result.success) {
            setOpen(false);
            setFormData({ plate_number: '', vehicle_type: '', capacity: '' });
            if (onSuccess) onSuccess();
        } else {
            alert('Hata: ' + result.error);
        }
    };

    if (!open) {
        return (
            <Button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-500">
                <Truck className="w-4 h-4 mr-2" />
                Araç Ekle
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>
                <h3 className="text-xl font-bold text-white mb-6">Yeni Araç Ekle</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Plaka</label>
                        <Input
                            value={formData.plate_number}
                            onChange={(e) => setFormData(prev => ({ ...prev, plate_number: e.target.value }))}
                            placeholder="34 ABC 123"
                            required
                            className="bg-slate-800 border-slate-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Araç Tipi</label>
                        <select
                            value={formData.vehicle_type}
                            onChange={(e) => setFormData(prev => ({ ...prev, vehicle_type: e.target.value }))}
                            className="w-full bg-slate-800 border-slate-700 rounded-md p-2 text-white text-sm"
                            required
                        >
                            <option value="">Seçiniz</option>
                            <option value="Tır (Tenteli)">Tır (Tenteli)</option>
                            <option value="Kamyon (10 Teker)">Kamyon (10 Teker)</option>
                            <option value="Panelvan">Panelvan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Kapasite / Özellik</label>
                        <Input
                            value={formData.capacity}
                            onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                            placeholder="Örn: 24 Ton, 13.60m"
                            required
                            className="bg-slate-800 border-slate-700"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="flex-1">
                            İptal
                        </Button>
                        <Button type="submit" disabled={loading} className="flex-1 bg-emerald-600 hover:bg-emerald-500">
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Kaydet'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
