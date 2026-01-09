'use client';

import { Check, Minus, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Pricing({ lang }: { lang: string }) {

    const features = [
        { name: "Yük görme & teklif alma", starter: true, pro: true, enterprise: true },
        { name: "Güzergâh bazlı yük dağıtımı", starter: true, pro: true, enterprise: true },
        { name: "Navigasyon API entegrasyonu", starter: true, pro: true, enterprise: true },
        { name: "Yakıt gider takibi", starter: true, pro: true, enterprise: true },
        { name: "Dorse doluluk oranı", starter: false, pro: true, enterprise: true },
        { name: "Lastik takibi (marka + km)", starter: false, pro: true, enterprise: true },
        { name: "Bakım & Kaza maliyetleri", starter: false, pro: true, enterprise: true },
        { name: "Araç bazlı net kâr", starter: false, pro: true, enterprise: true },
        { name: "Şoför performans yönetimi", starter: false, pro: false, enterprise: true },
        { name: "L belge takibi", starter: false, pro: false, enterprise: true },
        { name: "API & ERP entegrasyonu", starter: false, pro: false, enterprise: true },
    ];

    return (
        <section id="pricing" className="py-24 bg-slate-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
                        Ölçeklenebilir Fiyatlandırma
                    </h2>
                    <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-2 text-blue-300 font-medium">
                        3 Ay Ücretsiz Deneme – Tüm Paketlerde Geçerli
                    </div>
                    <p className="mt-4 text-slate-400">Sonrasında araç bazlı SaaS modeli uygulanır.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Starter */}
                    <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-8 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                        <p className="text-sm text-slate-400 mb-6">"Yük bul, aracı çalıştır."</p>
                        <div className="text-3xl font-bold text-white mb-6">₺ -- / araç</div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {features.filter(f => f.starter).slice(0, 5).map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                    <Check className="w-4 h-4 text-blue-500" /> {f.name}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all">
                            Ücretsiz Dene
                        </button>
                    </div>

                    {/* Pro */}
                    <div className="bg-slate-950 border border-blue-500/50 rounded-2xl p-8 flex flex-col relative ring-4 ring-blue-500/10">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                            EN ÇOK TERCİH EDİLEN
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                        <p className="text-sm text-blue-300 mb-6">"Filonun gerçek kârlılığını gör."</p>
                        <div className="text-3xl font-bold text-white mb-6">₺ -- / araç</div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="text-sm text-slate-300 font-semibold">Starter'daki her şey +</li>
                            {features.filter(f => f.pro && !f.starter).slice(0, 5).map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                    <Check className="w-4 h-4 text-emerald-500" /> {f.name}
                                </li>
                            ))}
                            <li className="flex items-center gap-3 text-sm text-slate-300">... ve daha fazlası</li>
                        </ul>
                        <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-500/25">
                            Ücretsiz Dene
                        </button>
                    </div>

                    {/* Enterprise */}
                    <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-8 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                        <p className="text-sm text-slate-400 mb-6">"Filonu veriyle yönetenler için."</p>
                        <div className="text-3xl font-bold text-white mb-6">Özel Teklif</div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="text-sm text-slate-300 font-semibold">Pro'daki her şey +</li>
                            {features.filter(f => f.enterprise && !f.pro).map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                    <Check className="w-4 h-4 text-purple-500" /> {f.name}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all">
                            Teklif Al
                        </button>
                    </div>

                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-400 text-sm">
                        "3 ay sonunda filonun gerçek maliyetlerini gören kullanıcıların <span className="text-white font-bold">%80’i Pro pakete geçiyor.</span>"
                    </p>
                </div>

            </div>
        </section>
    );
}
