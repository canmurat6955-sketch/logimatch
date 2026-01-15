'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, AlertCircle, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MapAnimation from './MapAnimation';
import TruckLoadVisualizer from './TruckLoadVisualizer';
import { calculateSmartPrice, PriceEstimate } from '@/lib/pricing/smart-engine';
import { cn } from '@/lib/utils';

export default function Hero({ dict, lang }: { dict: any, lang: string }) {
    const [prices, setPrices] = useState<PriceEstimate | null>(null);
    const [loading, setLoading] = useState(false);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [activeTab, setActiveTab] = useState<'price' | 'tetris' | 'tracking'>('price');

    const handleCalculate = async () => {
        if (!origin || !destination) return;
        setLoading(true);
        setPrices(null);

        const result = await calculateSmartPrice({
            origin,
            destination,
            weight: 20000,
            type: 'FTL'
        });

        setPrices(result);
        setLoading(false);
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-950">
                <MapAnimation />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />
            </div>

            <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-sm font-medium text-blue-300">{dict.hero.badge}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
                >
                    Lojistiğin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Yeni Nesil</span><br />
                    İşletim Sistemi.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto"
                >
                    Yük eşleştirmeden finansal analize, filo yönetiminden yasal uyumluluğa kadar tüm lojistik operasyonunuzu tek platformdan yönetin.
                </motion.p>

                {/* Interactive Operations Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl p-2 shadow-2xl shadow-blue-900/20"
                >
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 md:p-8">
                        {/* Widget Tabs */}
                        <div className="flex justify-center gap-6 mb-8 border-b border-slate-200 pb-4">
                            <button
                                onClick={() => setActiveTab('price')}
                                className={cn(
                                    "font-semibold pb-4 -mb-4.5 px-2 flex items-center gap-2 transition-colors",
                                    activeTab === 'price' ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-800"
                                )}
                            >
                                <Sparkles className="w-4 h-4" /> Yapay Zeka Fiyat
                            </button>
                            <button
                                onClick={() => setActiveTab('tetris')}
                                className={cn(
                                    "font-semibold pb-4 -mb-4.5 px-2 flex items-center gap-2 transition-colors",
                                    activeTab === 'tetris' ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-800"
                                )}
                            >
                                <Box className="w-4 h-4" /> Yük Tetris'i
                            </button>
                            <button
                                onClick={() => setActiveTab('tracking')}
                                className={cn(
                                    "font-semibold pb-4 -mb-4.5 px-2 flex items-center gap-2 transition-colors",
                                    activeTab === 'tracking' ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-800"
                                )}
                            >
                                Yük Takibi
                            </button>
                        </div>

                        {/* Content */}
                        {activeTab === 'tetris' ? (
                            <TruckLoadVisualizer />
                        ) : !prices ? (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Nereden</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={origin}
                                            onChange={(e) => setOrigin(e.target.value)}
                                            placeholder="İstanbul, TR"
                                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                        />
                                        <div className="absolute right-3 top-3.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Nereye</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            placeholder="Berlin, DE"
                                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                        />
                                        <div className="absolute right-3 top-3.5 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Yük Tipi</label>
                                    <select className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium appearance-none">
                                        <option>Komple Tır (FTL)</option>
                                        <option>Parsiyel (LTL)</option>
                                        <option>Konteyner</option>
                                        <option>Frigo (Soğuk Zincir)</option>
                                    </select>
                                </div>

                                <Button
                                    onClick={handleCalculate}
                                    disabled={loading}
                                    className="h-[50px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 w-full md:w-auto"
                                >
                                    {loading ? 'Hesaplanıyor...' : 'AI Fiyat Gör'}
                                </Button>
                            </div>
                        ) : (
                            <div className="bg-slate-900 rounded-xl p-6 text-white animate-in zoom-in-95 duration-300">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">AI Fiyat Tahmini</h3>
                                            <p className="text-xs text-slate-400">Piyasa verilerine göre hesaplandı</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => setPrices(null)}>Yeni Hesaplama</Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="text-center md:text-left">
                                        <p className="text-sm text-slate-400 mb-1">Adil Piyasa Aralığı</p>
                                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                                            {prices.min}€ - {prices.max}€
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                                                GÜVEN: YÜKSEK
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm border-l border-white/10 pl-6 hidden md:block">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Mesafe</span>
                                            <span className="text-slate-300">{prices.distance} km</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Tahmini Yakıt</span>
                                            <span className="text-slate-300">{prices.breakdown.fuel}€</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-emerald-500 font-medium">CO2 Emisyonu</span>
                                            <span className="text-emerald-400 font-bold">{prices.emissions} kg</span>
                                        </div>
                                        <div className="mt-2 pt-2 border-t border-white/10 text-xs text-slate-500">
                                            <Sparkles className="w-3 h-3 inline mr-1 text-emerald-500" />
                                            Bu rota için <span className="text-emerald-500">Yeşil Lojistik</span> sertifikası alabilirsiniz.
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end">
                                        <Button className="w-full bg-white text-slate-900 hover:bg-slate-200 font-bold">
                                            Bu Fiyattan Teklif Ver
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
                            <span>*Kayıt gerektirmez, anlık piyasa verisi.</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                {activeTab === 'tetris' ? 'Optimizasyon aktif' : '254 aktif araç bölgede'}
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
