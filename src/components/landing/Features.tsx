"use client";

import { motion } from "framer-motion";
import { LucideCheckCircle2 } from "lucide-react";

const featureList = [
    "Anlık Araç Takibi ve Rota Optimizasyonu",
    "Otomatik Fatura ve İrsaliye Oluşturma",
    "Sürücü Performans Puanlama Sistemi",
    "Yakıt Tüketim Analizi ve Tasarruf Önerileri",
    "Lastik ve Periyodik Bakım Takibi",
    "AB Standartlarında Karbon Ayak İzi Raporlama",
    "Mobil Uygulama ile Sürücü İletişimi",
    "Gelişmiş API Entegrasyonları (ERP/Muhasebe)"
];

export default function Features({ dict, lang }: { dict: any, lang: string }) {
    return (
        <section className="py-24 bg-black border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Side */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-white mb-6"
                        >
                            Modern Lojistiğin <span className="text-blue-500">Geleceği</span> Bugün Sizinle
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 text-lg mb-8"
                        >
                            Geleneksel yöntemlerle zaman ve para kaybetmeyin. Logimatch'in sunduğu ileri teknoloji altyapısı ile operasyonel süreçlerinizi dijitalleştirin ve verimliliğinizi %40'a varan oranlarda artırın.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {featureList.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-start gap-3"
                                >
                                    <LucideCheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                                    <span className="text-slate-300 text-sm">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Side (Simplified for Clarity) */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative bg-slate-900/50 border border-white/10 rounded-2xl p-6 h-[400px] flex items-center justify-center overflow-hidden"
                        >
                            {/* Simple Map Representation */}
                            <div className="w-full h-full relative opacity-50">
                                {/* Simulated Map Lines */}
                                <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                                    <path d="M50 250 Q 150 100 350 50" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                                    <circle cx="50" cy="250" r="4" fill="#3b82f6" />
                                    <circle cx="350" cy="50" r="4" fill="#10b981" />
                                    {/* Moving Truck Dot */}
                                    <circle cx="50" cy="250" r="6" fill="#f59e0b">
                                        <animateMotion
                                            dur="3s"
                                            repeatCount="indefinite"
                                            path="M0 0 Q 100 -150 300 -200"
                                        />
                                    </circle>
                                </svg>
                                <div className="absolute bottom-4 left-4 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-slate-300 shadow-lg">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Araç 34 AB 123 - Hareket Halinde
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
