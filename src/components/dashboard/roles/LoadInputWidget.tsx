'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Truck, Navigation, Box, Scale, ArrowRight, MapPin, FileText, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoadInputWidget() {
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        cargoType: 'pallet',
        weight: '',
        width: '',
        length: '',
        height: '',
        quantity: '',
        description: ''
    });

    return (
        <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shrink-0 relative overflow-hidden group hover:border-blue-500/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
                        <Truck className="w-4 h-4" />
                    </div>
                    Hızlı Yük Bildirimi
                </h3>
            </div>

            <div className="space-y-3">
                {/* Route */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="group/input relative">
                        <MapPin className="w-3 h-3 text-slate-500 absolute left-3 top-3" />
                        <input
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white focus:border-blue-500 focus:bg-slate-900/80 outline-none transition-all placeholder:text-slate-600"
                            placeholder="Çıkış Noktası"
                            value={formData.origin}
                            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        />
                    </div>
                    <div className="group/input relative">
                        <Navigation className="w-3 h-3 text-slate-500 absolute left-3 top-3" />
                        <input
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white focus:border-blue-500 focus:bg-slate-900/80 outline-none transition-all placeholder:text-slate-600"
                            placeholder="Varış Noktası"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        />
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="relative">
                        <input
                            type="number"
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none placeholder:text-slate-600"
                            placeholder="Ağırlık (kg)"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none placeholder:text-slate-600"
                            placeholder="Hacim (m3)"
                            value={formData.width} // repurposed temporarily or add volume field
                            onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none placeholder:text-slate-600"
                            placeholder="Adet"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        />
                    </div>
                </div>

                {/* Description Textarea */}
                <div className="relative">
                    <textarea
                        className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none resize-none placeholder:text-slate-600 min-h-[60px]"
                        placeholder="Yük açıklaması giriniz (örn: Hassas elektronik malzeme, istiflenemez...)"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white h-9 rounded-lg shadow-lg shadow-blue-900/20 text-xs font-semibold group/btn"
                    onClick={() => alert("Fiyat hesaplanıyor: €1,250")}
                    disabled={!formData.origin || !formData.destination}
                >
                    <Sparkles className="w-3.5 h-3.5 mr-2 text-blue-200 group-hover/btn:animate-pulse" />
                    Hemen Fiyat Al
                </Button>
            </div>
        </div>
    );
}
