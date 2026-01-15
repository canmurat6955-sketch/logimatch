'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MapIcon, Truck, CheckCircle, Clock } from 'lucide-react';

export default function PublicTrackingPage() {
    const params = useParams();
    const trackingId = params.id as string;

    // Mock Data based on ID
    const [status, setStatus] = useState(loadData.status);

    // Auto-simulate delivery for demo purposes if ID contains 'demo'
    useEffect(() => {
        if (trackingId.includes('demo')) {
            setTimeout(() => setStatus('Delivered'), 5000);
        }
    }, [trackingId]);

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
            {/* Header */}
            <div className="bg-slate-900 border-b border-white/5 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Truck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Haulink Public Track</h1>
                        <p className="text-xs text-slate-500">Gelişmiş Kargo Takibi</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-400">Takip No</div>
                    <div className="font-mono text-emerald-400 font-bold">{trackingId.toUpperCase()}</div>
                </div>
            </div>

            {/* Map Area (Placeholder) */}
            <div className="flex-1 bg-slate-800/20 relative flex items-center justify-center border-b border-white/5">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/1e293b/475569?text=Map+View')] bg-cover opacity-20"></div>

                {status === 'Delivered' ? (
                    <div className="z-10 text-center p-8 bg-emerald-900/40 backdrop-blur-md rounded-xl border border-emerald-500/30 animation-in zoom-in-95 duration-500">
                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-white">Teslimat Tamamlandı</h2>
                        <p className="text-emerald-200">Kargonuz başarıyla teslim edilmiştir.</p>
                        <p className="text-sm text-emerald-300/60 mt-2">Bugün, 14:30</p>
                    </div>
                ) : (
                    <div className="z-10 text-center p-8 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                        <MapIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">Canlı Konum İzleniyor</h2>
                        <p className="text-slate-300">Bu kargo şu an hareket halinde.</p>
                    </div>
                )}
            </div>

            {/* Status Panel */}
            <div className="p-6 bg-slate-900 border-t border-white/5">
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${status === 'Delivered' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`}></div>
                            <span className={`font-bold text-lg ${status === 'Delivered' ? 'text-white' : 'text-blue-400'}`}>
                                {status === 'Delivered' ? 'Teslim Edildi' : 'Yolda (In Transit)'}
                            </span>
                        </div>

                        {status === 'Delivered' ? (
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="text-xs text-slate-500 uppercase font-bold mb-2">Teslim Alan (İmza)</div>
                                <div className="bg-white/90 rounded p-2 mb-2">
                                    {/* Mock Signature visual for demo */}
                                    <svg viewBox="0 0 300 100" className="w-full h-12 stroke-black fill-none stroke-2">
                                        <path d="M20,50 Q50,10 80,50 T140,50 T200,50" />
                                        <path d="M40,60 L200,60" />
                                    </svg>
                                </div>
                                <div className="text-xs text-emerald-400 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> E-İmza Doğrulandı
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <div className="text-sm text-slate-400">Tahmini Varış (ETA)</div>
                                <div className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-400" />
                                    {loadData.eta}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">İlerleme Durumu</span>
                                <span className="text-white font-bold">{status === 'Delivered' ? 100 : loadData.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${status === 'Delivered' ? 'bg-emerald-500' : 'bg-blue-600'}`}
                                    style={{ width: `${status === 'Delivered' ? 100 : loadData.progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="text-sm text-slate-300 bg-slate-800 p-3 rounded-lg border border-white/5">
                            <span className="text-blue-400 font-bold">Son Durum:</span> {status === 'Delivered' ? 'Alıcıya teslim edildi.' : loadData.lastUpdate}
                        </div>
                    </div>

                    {/* Details Column... */}
                    <div className="space-y-2">
                        <div className="p-4 rounded-lg bg-slate-800/50 border border-white/5">
                            <h3 className="text-sm font-bold text-slate-400 mb-2">Sevkiyat Detayları</h3>
                            <div className="flex justify-between py-1 border-b border-white/5">
                                <span className="text-slate-500 text-sm">Çıkış</span>
                                <span className="text-white text-sm">{loadData.origin}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-white/5">
                                <span className="text-slate-500 text-sm">Varış</span>
                                <span className="text-white text-sm">{loadData.destination}</span>
                            </div>
                            <div className="flex justify-between py-1 pt-2">
                                <span className="text-slate-500 text-sm">Araç</span>
                                <span className="text-white text-sm">{loadData.vehicle}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
