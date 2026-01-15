'use client';

import { LucideTruck, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer({ lang, dict }: { lang: string, dict: any }) {
    const { description, sections, links, copyright } = dict.footer;

    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white mb-4">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <LucideTruck className="w-5 h-5 text-white" />
                            </div>
                            Logimatch
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {description}
                        </p>
                        <div className="flex gap-4 mt-6">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all cursor-pointer">
                                    <Icon className="w-4 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-semibold text-white mb-6">{sections.product}</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href={`/${lang}/#features`} className="hover:text-blue-400 transition-colors">{links.features}</Link></li>
                            <li><Link href={`/${lang}/#pricing`} className="hover:text-blue-400 transition-colors">{links.pricing}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">{sections.company}</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href={`/${lang}/#about`} className="hover:text-blue-400 transition-colors">{links.about}</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">{links.contact}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">{sections.legal}</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">{links.privacy}</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">{links.terms}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>{copyright}</p>

                    {/* Trust Signals / Live Status */}
                    <div className="flex flex-wrap items-center gap-6 mt-4 md:mt-0 bg-slate-900/50 px-4 py-2 rounded-full border border-white/5">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-500 font-medium text-xs">Sistemler Aktif</span>
                        </div>
                        <div className="w-px h-3 bg-white/10 hidden sm:block"></div>
                        <div className="text-xs text-slate-400 hidden sm:block">
                            <span className="text-white font-semibold">2.4s</span> Ort. Eşleşme
                        </div>
                        <div className="w-px h-3 bg-white/10 hidden sm:block"></div>
                        <div className="text-xs text-slate-400 hidden sm:block">
                            <span className="text-white font-semibold flex items-center gap-1">
                                <LucideTruck className="w-3 h-3 text-blue-500" />
                                342
                            </span> Aktif Yük
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                        {/* Language Selector Mockup */}
                        <span className="px-2 py-1 bg-slate-900 rounded text-slate-300">TR</span>
                        <span className="px-2 py-1 hover:bg-slate-900 rounded cursor-pointer">EN</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
