import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, Zap, BrainCircuit, Leaf } from 'lucide-react';

export default function QuoteWidget() {
    // Quote Widget Logic
    const [quoteForm, setQuoteForm] = useState({ origin: '', destination: '', weight: '', dimensions: '' });
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [quoteResult, setQuoteResult] = useState<{ price: string, currency: string, distance: number, transitTime: string, co2: number } | null>(null);

    const handleGetQuote = async () => {
        setQuoteLoading(true);
        // Simulate API Calculation
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock Logic
        const trCities = ['istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'adana', 'gaziantep', 'mersin'];
        const isOriginTR = trCities.some(c => quoteForm.origin.toLowerCase().includes(c));
        const isDestTR = trCities.some(c => quoteForm.destination.toLowerCase().includes(c));
        const isDomestic = isOriginTR && isDestTR; // Default to international if unknown to be safe/impressive

        const isLongDistance = !isDomestic;

        let price = '';
        let currency = '';

        if (isDomestic) {
            price = (Math.floor(Math.random() * 15000) + 8000).toLocaleString('tr-TR');
            currency = '₺';
        } else {
            price = (Math.floor(Math.random() * 2000) + 1800).toLocaleString('de-DE');
            currency = '€';
        }

        setQuoteResult({
            price,
            currency,
            distance: isLongDistance ? 2450 : 650,
            transitTime: isLongDistance ? '5 Gün' : '1 Gün',
            co2: isLongDistance ? 145 : 42
        });
        setQuoteLoading(false);
    };

    return (
        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shrink-0 transition-all duration-500 hover:border-blue-500/30 group relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-700"></div>

            <h3 className="text-white font-bold text-sm mb-5 flex items-center gap-2 relative z-10">
                <div className="p-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30">
                    <BrainCircuit className="w-4 h-4 text-blue-400" />
                </div>
                Yapay Zeka Destekli Fiyat
            </h3>

            {!quoteResult ? (
                <div className="space-y-4 relative z-10">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-blue-300/70 font-medium uppercase tracking-wider">Çıkış Noktası</label>
                            <input
                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 focus:bg-slate-900/80 outline-none transition-all placeholder:text-slate-600"
                                placeholder="Şehir giriniz..."
                                value={quoteForm.origin}
                                onChange={(e) => setQuoteForm({ ...quoteForm, origin: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-blue-300/70 font-medium uppercase tracking-wider">Varış Noktası</label>
                            <input
                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 focus:bg-slate-900/80 outline-none transition-all placeholder:text-slate-600"
                                placeholder="Şehir giriniz..."
                                value={quoteForm.destination}
                                onChange={(e) => setQuoteForm({ ...quoteForm, destination: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-blue-300/70 font-medium uppercase tracking-wider">Yük Tonajı</label>
                            <input
                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 focus:bg-slate-900/80 outline-none transition-all placeholder:text-slate-600"
                                placeholder="Örn: 24 Ton"
                                value={quoteForm.weight}
                                onChange={(e) => setQuoteForm({ ...quoteForm, weight: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-blue-300/70 font-medium uppercase tracking-wider">Ölçüler (E x B x Y)</label>
                            <input
                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 focus:bg-slate-900/80 outline-none transition-all placeholder:text-slate-600"
                                placeholder="Örn: 2.4 x 13.6"
                                value={quoteForm.dimensions}
                                onChange={(e) => setQuoteForm({ ...quoteForm, dimensions: e.target.value })}
                            />
                        </div>
                    </div>
                    <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 h-10 text-xs font-semibold tracking-wide relative overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-white/10 group/btn"
                        onClick={handleGetQuote}
                        disabled={quoteLoading || !quoteForm.origin || !quoteForm.destination || !quoteForm.weight}
                    >
                        {quoteLoading ? (
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-white animate-spin" />
                                <span className="animate-pulse">AI Analiz Yapıyor...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-blue-100 group-hover/btn:animate-ping" />
                                <span>AI Analiz & Fiyatı Gör</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 clip-path-slant"></div>
                    </Button>
                </div>
            ) : (
                <div className="animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-500 relative z-10">
                    <div className="bg-gradient-to-b from-slate-900/80 to-slate-950/80 rounded-xl p-4 border border-blue-500/30 mb-4 relative overflow-hidden group/result">
                        {/* Animated Border Glow */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

                        <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/5">
                            <span className="text-xs text-slate-400 font-medium">AI Önerilen Fiyat</span>
                            <div className="text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded text-sm border border-emerald-500/20">
                                <Zap className="w-3 h-3 fill-emerald-400" />
                                {quoteResult.currency}{quoteResult.price}
                            </div>
                        </div>
                        <div className="space-y-2 text-[11px] text-slate-400">
                            <div className="flex justify-between items-center">
                                <span>Tahmini Mesafe</span>
                                <span className="text-white font-mono">{quoteResult.distance} km</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Transit Süre</span>
                                <span className="text-white font-mono">{quoteResult.transitTime}</span>
                            </div>
                            <div className="flex justify-between items-center text-blue-400 pt-1 border-t border-white/5 mt-2">
                                <span className="flex items-center gap-1"><Leaf className="w-3 h-3" /> Tahmini Karbon Tasarrufu</span>
                                <span className="font-bold">{quoteResult.co2} kg</span>
                            </div>
                            <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-slate-500 flex justify-between">
                                <span>Güven Skoru:</span>
                                <span className="text-emerald-500 font-bold">%94 Yüksek</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="h-9 text-[11px] border-white/10 text-slate-400 hover:text-white hover:bg-white/5 backdrop-blur-sm"
                            onClick={() => setQuoteResult(null)}
                        >
                            Yeni Analiz
                        </Button>
                        <Button className="h-9 text-[11px] bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20">
                            Hemen Kirala
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
