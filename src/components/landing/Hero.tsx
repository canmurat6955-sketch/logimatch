'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ dict, lang }: { dict: any, lang: string }) {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-950">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
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
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200"
                >
                    {dict.hero.h1}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto"
                >
                    {dict.hero.h2}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a href={`/${lang}#pricing`} className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold text-white transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
                        {dict.hero.cta}
                        <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
                    </a>
                    <p className="text-sm text-slate-500 mt-4 sm:mt-0">{dict.hero.ctaSub}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-20 relative mx-auto max-w-5xl rounded-xl bg-slate-900/50 border border-white/10 shadow-2xl overflow-hidden aspect-[16/9] ring-1 ring-white/10"
                >
                    {/* Dashboard Mockup Graphic Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
                        <span className="text-slate-500 text-lg">Dashboard Mockup / Video Placeholder</span>
                        {/* In real app, put an <img> or <video> here */}
                    </div>

                    {/* Floating UI Cards simulating the platform */}
                    <div className="absolute -right-10 top-20 w-64 p-4 rounded-lg bg-slate-900 border border-white/10 shadow-xl transform rotate-[-5deg]">
                        <div className="flex justify-between text-xs text-slate-400 mb-2"><span>Route Optimization</span><span>Live</span></div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-emerald-500 w-[75%]"></div>
                        </div>
                        <div className="text-lg font-bold text-white">Saved 12% Fuel</div>
                    </div>

                    <div className="absolute -left-10 bottom-20 w-64 p-4 rounded-lg bg-slate-900 border border-white/10 shadow-xl transform rotate-[5deg]">
                        <div className="flex justify-between text-xs text-slate-400 mb-2"><span>Load Match</span><span>New</span></div>
                        <div className="text-sm text-white font-medium">Istanbul → Berlin</div>
                        <div className="text-xs text-blue-400 mt-1">Match Score: 98%</div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
