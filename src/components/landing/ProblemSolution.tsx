"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, PhoneOff, FileX, AlertTriangle, CheckCircle2, Truck, FileCheck } from "lucide-react";

export default function ProblemSolution({ lang, dict }: { lang: string, dict: any }) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMouseDown = () => { isDragging.current = true; };
    const handleMouseUp = () => { isDragging.current = false; };
    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging.current || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);

        setSliderPosition(percentage);
    };

    // Global mouse up to catch drags outside
    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden select-none">
            <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Kaos mu? <span className="text-blue-500">Düzen mi?</span>
                </h2>
                <p className="text-slate-400">Aradaki farkı görmek için kaydırın.</p>
            </div>

            <div
                ref={containerRef}
                className="max-w-5xl mx-auto h-[500px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl cursor-col-resize"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onMouseMove={handleMouseMove}
                onTouchMove={handleMouseMove}
            >
                {/* RIGHT SIDE (AFTER - LOGIMATCH) */}
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                    <div className="text-center space-y-8 p-12 w-full max-w-lg mx-auto opacity-80 pointer-events-none">
                        <div className="bg-emerald-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-white">Logimatch Düzeni</h3>

                        <div className="grid gap-4 text-left">
                            <div className="bg-slate-800 p-4 rounded-xl border border-emerald-500/20 flex items-center gap-4">
                                <div className="bg-emerald-500/20 p-2 rounded-lg"><Truck className="w-5 h-5 text-emerald-400" /></div>
                                <div>
                                    <div className="text-white font-medium">Araç Takibi</div>
                                    <div className="text-xs text-emerald-400">Canlı Konum: Berlin, 120km kaldı</div>
                                </div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl border border-emerald-500/20 flex items-center gap-4">
                                <div className="bg-emerald-500/20 p-2 rounded-lg"><FileCheck className="w-5 h-5 text-emerald-400" /></div>
                                <div>
                                    <div className="text-white font-medium">Dijital Evrak</div>
                                    <div className="text-xs text-emerald-400">e-Fatura & CMR Otomatik İletildi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LEFT SIDE (BEFORE - CHAOS) */}
                <div
                    className="absolute inset-0 bg-red-950/20 border-r border-white/20 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                >
                    <div className="absolute inset-0 bg-slate-950 flex items-center justify-center w-[calc(100vw_-_(100vw_-_100%))] max-w-5xl mx-auto">
                        {/* Note: The inner content width logic is tricky with clipping. 
                            Instead, we fix the content container size to the parent size 
                            so it doesn't squish, but gets revealed/hidden. 
                        */}
                        <div className="w-[1024px] h-full flex items-center justify-center">
                            <div className="text-center space-y-8 p-12 w-full max-w-lg mx-auto opacity-60">
                                <div className="bg-red-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <AlertTriangle className="w-10 h-10 text-red-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-white">Eski Usul Kaos</h3>

                                <div className="grid gap-4 text-left blur-[1px]">
                                    <div className="bg-red-900/10 p-4 rounded-xl border border-red-500/20 flex items-center gap-4">
                                        <div className="bg-red-500/20 p-2 rounded-lg"><PhoneOff className="w-5 h-5 text-red-400" /></div>
                                        <div>
                                            <div className="text-red-200 font-medium">Şoföre Ulaşılamıyor</div>
                                            <div className="text-xs text-red-400">Son görülme: 4 saat önce</div>
                                        </div>
                                    </div>
                                    <div className="bg-red-900/10 p-4 rounded-xl border border-red-500/20 flex items-center gap-4">
                                        <div className="bg-red-500/20 p-2 rounded-lg"><FileX className="w-5 h-5 text-red-400" /></div>
                                        <div>
                                            <div className="text-red-200 font-medium">Evrak Kayıp</div>
                                            <div className="text-xs text-red-400">Fatura nerede? WhatsApp'a bak!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SLIDER HANDLE */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform active:scale-110 transition-transform">
                        <MoveHorizontal className="w-5 h-5 text-slate-900" />
                    </div>
                </div>
            </div>

            <div className="text-center mt-8">
                <p className="text-sm text-slate-500">Operasyonunuzu modernleştirmek için sağa kaydırın.</p>
            </div>
        </section>
    );
}
