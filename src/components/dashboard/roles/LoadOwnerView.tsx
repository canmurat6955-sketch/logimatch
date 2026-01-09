'use client';

import { DollarSign, Plus, AlertTriangle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function LoadOwnerView() {
    const [currency, setCurrency] = useState<'TRY' | 'USD' | 'EUR'>('TRY');

    return (
        <div className="space-y-8">
            {/* Header Actions */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Yük Yönetim Paneli</h2>
                    <p className="text-slate-400">Aktif yüklerinizi ve nakliye giderlerinizi yönetin.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-slate-900 border border-white/10 rounded-lg p-1 flex">
                        {(['TRY', 'USD', 'EUR'] as const).map((c) => (
                            <button
                                key={c}
                                onClick={() => setCurrency(c)}
                                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${currency === c ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-500">
                        <Plus className="w-4 h-4 mr-2" />
                        Yeni Yük Oluştur
                    </Button>
                </div>
            </div>

            {/* Financials */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-slate-900 border border-white/5 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <DollarSign className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-slate-400 text-sm mb-2">Bu Ay Nakliye Gideri</h3>
                    <div className="text-3xl font-bold text-white">
                        {currency === 'TRY' && '₺ 142.500'}
                        {currency === 'USD' && '$ 4,250'}
                        {currency === 'EUR' && '€ 3,950'}
                    </div>
                    <div className="text-emerald-400 text-xs mt-2 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Geçen aya göre %4 tasarruf
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-900 border border-white/5">
                    <h3 className="text-slate-400 text-sm mb-4">Gider Dağılımı</h3>
                    <div className="flex items-end gap-2 h-24">
                        {[40, 70, 45, 90, 60, 80].map((h, i) => (
                            <div key={i} className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-t transition-colors relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {h * 1000} {currency}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Create Load Form Stub */}
            <div className="p-8 rounded-xl bg-slate-900 border border-white/5">
                <h3 className="text-xl font-bold text-white mb-6">Hızlı Yük Ekle</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Yük Tipi</label>
                        <select className="w-full bg-slate-950 border border-white/10 rounded-md p-2 text-white text-sm">
                            <option>Paletli Yük</option>
                            <option>Dökme Yük</option>
                            <option>Konteyner</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Ağırlık (Ton)</label>
                        <input type="number" className="w-full bg-slate-950 border border-white/10 rounded-md p-2 text-white text-sm" placeholder="Örn: 24.5" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Hacim / Ölçü (m3)</label>
                        <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-md p-2 text-white text-sm" placeholder="Ex: 80x120x200" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Güzergah</label>
                        <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-md p-2 text-white text-sm" placeholder="Nereden - Nereye" />
                    </div>
                </div>

                {/* Penalty Warning */}
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-red-400 text-sm font-bold mb-1">Doğruluk Beyanı & Cezai Şartlar</h4>
                        <p className="text-red-400/80 text-xs">
                            Girdiğiniz yük ölçüleri ve ağırlıkları %100 doğru olmalıdır. Yanlış beyan durumunda oluşacak ek maliyetler ve cezai işlemler tarafınıza yansıtılacaktır.
                        </p>
                        <label className="flex items-center gap-2 mt-3 cursor-pointer">
                            <input type="checkbox" className="rounded border-red-500/50 bg-transparent text-red-500 focus:ring-red-500/50" />
                            <span className="text-red-300 text-xs">Okudum, beyanımın doğruluğunu taahhüt ediyorum.</span>
                        </label>
                    </div>
                </div>
            </div>

        </div>
    );
}
