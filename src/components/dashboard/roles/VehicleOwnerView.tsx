'use client';

import { Truck, Navigation, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VehicleOwnerView() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Araç & Yük Eşleşmeleri</h2>
                    <p className="text-slate-400">Sadece aracınıza uygun yükleri görüntüleyin.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500">
                    <Truck className="w-4 h-4 mr-2" />
                    Araç Bilgilerini Güncelle
                </Button>
            </div>

            {/* Vehicle Specs Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/20">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-bold text-white">Aktif Aracım (34 VR 1024)</h3>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">Müsait</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 rounded-lg bg-black/20">
                        <div className="text-xs text-slate-400 mb-1">Kasa Tipi</div>
                        <div className="text-slate-200 text-sm font-medium">Tenteli Tır</div>
                    </div>
                    <div className="p-3 rounded-lg bg-black/20">
                        <div className="text-xs text-slate-400 mb-1">Kargo Alanı</div>
                        <div className="text-slate-200 text-sm font-medium">13.60 x 2.45 x 2.70m</div>
                    </div>
                    <div className="p-3 rounded-lg bg-black/20">
                        <div className="text-xs text-slate-400 mb-1">Boş Ağırlık</div>
                        <div className="text-slate-200 text-sm font-medium">14.5 Ton</div>
                    </div>
                    <div className="p-3 rounded-lg bg-black/20">
                        <div className="text-xs text-slate-400 mb-1">Maks. Kapasite</div>
                        <div className="text-slate-200 text-sm font-medium">24 Ton</div>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-500">
                    <AlertCircle className="w-4 h-4" />
                    Eksik veya hatalı araç ölçüleri sistemden kalıcı olarak uzaklaştırılmanıza neden olabilir.
                </div>
            </div>

            {/* Matched Loads Only - Map Removed for Privacy as requested */}
            <div>
                <h3 className="text-lg font-medium text-white mb-4">Sizin İçin Eşleşen Yükler</h3>
                <div className="space-y-4">
                    {[
                        { route: 'Istanbul (Avr) → Münih', km: '2,140 km', price: '€ 3,200', type: 'Tam Tır', match: '98%' },
                        { route: 'Gebze → İzmir', km: '420 km', price: '₺ 18,500', type: 'Parsiyel', match: '92%' },
                        { route: 'Ankara → Bursa', km: '380 km', price: '₺ 12,000', type: '10 Teker', match: '88%' },
                    ].map((load, i) => (
                        <div key={i} className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-blue-500/50 transition-all cursor-pointer group">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Navigation className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-white font-medium">{load.route}</div>
                                    <div className="text-slate-500 text-xs">{load.km} • {load.type}</div>
                                </div>
                            </div>

                            <div className="mt-4 md:mt-0 flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <div className="text-emerald-400 font-bold text-lg">{load.price}</div>
                                    <div className="text-blue-400 text-xs bg-blue-500/10 px-2 py-0.5 rounded text-center">{load.match} Uyum</div>
                                </div>
                                <Button variant="outline" className="border-white/10 text-slate-300 hover:text-white hover:bg-slate-800">
                                    Teklif Ver
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
