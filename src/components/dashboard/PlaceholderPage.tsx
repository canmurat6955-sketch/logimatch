'use client';

import { usePathname } from 'next/navigation';

export default function PlaceholderPage({ title }: { title: string }) {
    const pathname = usePathname();
    const pageName = pathname?.split('/').pop() || title;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white capitalize">{title || pageName}</h2>
                    <p className="text-slate-400">Bu modül demo sürümünde geliştirilme aşamasındadır.</p>
                </div>
                <div className="px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                    Demo Modu
                </div>
            </div>

            <div className="p-12 rounded-xl bg-slate-900 border border-white/5 border-dashed flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                    <span className="text-2xl">🚧</span>
                </div>
                <h3 className="text-white font-medium mb-2">{title} Sayfası Hazırlanıyor</h3>
                <p className="text-slate-500 max-w-md">
                    Logimatch'in bu bölümü, canlı verilerle entegre edildiğinde tam fonksiyonel olacaktır. Şu an için sadece navigasyon yapısını test edebilirsiniz.
                </p>
            </div>

            {/* Fake Data Table visual for immersion */}
            <div className="rounded-xl border border-white/5 bg-slate-900/50 overflow-hidden">
                <div className="grid grid-cols-4 p-4 bg-slate-900 border-b border-white/5 text-xs font-medium text-slate-400">
                    <div>ID</div>
                    <div>Durum</div>
                    <div>Tarih</div>
                    <div>İşlem</div>
                </div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="grid grid-cols-4 p-4 border-b border-white/5 text-sm text-slate-300 last:border-0 hover:bg-white/5 transition-colors">
                        <div className="font-mono text-slate-500">#{1000 + i}</div>
                        <div><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2" />Aktif</div>
                        <div>09.01.2026</div>
                        <div className="text-blue-400">Detay Gör</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
