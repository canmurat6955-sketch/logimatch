'use client';

import { XCircle, CheckCircle } from 'lucide-react';

export default function ProblemSolution({ lang }: { lang: string }) {
    // Hardcoded content for demo since it's extensive text
    // In production, this would come from the dictionary

    const problems = [
        "Uygun yük–araç eşleşmesi yapılamıyor",
        "Araçlar boş ya da yarı dolu gidiyor",
        "Giderler kontrol edilemiyor",
        "Hangi araç gerçekten kazandırıyor bilinmiyor",
        "Şoför performansı ölçülemiyor"
    ];

    const solutions = [
        "Yükler güzergâha göre otomatik dağıtılır",
        "Navigasyon sistemi entegredir",
        "Fiyatlar araç tipi & yüke göre hesaplanır",
        "Tüm giderler araç bazlı izlenir",
        "Kârlılık anlık olarak görünür"
    ];

    return (
        <section className="py-24 bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Problem Column */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-slate-100">
                            Bugün lojistikte <span className="text-red-400">yaşanan sorunlar</span>
                        </h2>
                        <div className="space-y-4">
                            {problems.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-red-500/5 border border-red-500/10 hover:border-red-500/20 transition-colors">
                                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Solution Column */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
                        <div className="relative space-y-8 border border-white/10 bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
                            <h2 className="text-3xl font-bold text-slate-100">
                                Logimatch <span className="text-blue-400">Çözümü</span>
                            </h2>
                            <div className="space-y-4">
                                {solutions.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                            <CheckCircle className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-slate-200 text-lg">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
