import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

export default function Pricing({ lang, dict }: { lang: string, dict: any }) {
    const { title, badge, note, tiers, features, socialProof, socialProofHighlight } = dict.pricing;

    const featureList = [
        { key: "loadMatching", starter: true, pro: true, enterprise: true },
        { key: "routeDist", starter: true, pro: true, enterprise: true },
        { key: "navApi", starter: true, pro: true, enterprise: true },
        { key: "fuelTrack", starter: true, pro: true, enterprise: true },
        { key: "trailerCap", starter: false, pro: true, enterprise: true },
        { key: "tireTrack", starter: false, pro: true, enterprise: true },
        { key: "maintCost", starter: false, pro: true, enterprise: true },
        { key: "netProfit", starter: false, pro: true, enterprise: true },
        { key: "driverPerf", starter: false, pro: false, enterprise: true },
        { key: "lDocTrack", starter: false, pro: false, enterprise: true },
        { key: "apiInteg", starter: false, pro: false, enterprise: true },
    ];

    return (
        <section id="pricing" className="py-24 bg-slate-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
                        {title}
                    </h2>
                    <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-2 text-blue-300 font-medium">
                        {badge}
                    </div>
                    <p className="mt-4 text-slate-400">{note}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Starter */}
                    <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-8 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">{tiers.starter.name}</h3>
                        <p className="text-sm text-slate-400 mb-6">{tiers.starter.desc}</p>
                        <div className="text-3xl font-bold text-white mb-6">{tiers.starter.price}</div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {featureList.filter(f => f.starter).slice(0, 5).map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                    <Check className="w-4 h-4 text-blue-500" /> {features[f.key] || f.key}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all">
                            {tiers.starter.cta}
                        </button>
                    </div>

                    {/* Pro */}
                    <div className="bg-slate-950 border border-blue-500/50 rounded-2xl p-8 flex flex-col relative ring-4 ring-blue-500/10">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                            {tiers.pro.badge}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{tiers.pro.name}</h3>
                        <p className="text-sm text-blue-300 mb-6">{tiers.pro.desc}</p>
                        <div className="text-3xl font-bold text-white mb-6">{tiers.pro.price}</div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="text-sm text-slate-300 font-semibold">{tiers.starter.name}'daki her şey +</li>
                            {featureList.filter(f => f.pro && !f.starter).slice(0, 5).map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                    <Check className="w-4 h-4 text-emerald-500" /> {features[f.key] || f.key}
                                </li>
                            ))}
                            <li className="flex items-center gap-3 text-sm text-slate-300">{features.more}</li>
                        </ul>
                        <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-500/25">
                            {tiers.pro.cta}
                        </button>
                    </div>

                    {/* Enterprise */}
                    <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-8 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">{tiers.enterprise.name}</h3>
                        <p className="text-sm text-slate-400 mb-6">{tiers.enterprise.desc}</p>
                        <div className="text-3xl font-bold text-white mb-6">{tiers.enterprise.price}</div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="text-sm text-slate-300 font-semibold">{tiers.pro.name}'daki her şey +</li>
                            {featureList.filter(f => f.enterprise && !f.pro).map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                    <Check className="w-4 h-4 text-purple-500" /> {features[f.key] || f.key}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all">
                            {tiers.enterprise.cta}
                        </button>
                    </div>

                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-400 text-sm">
                        {socialProof} <span className="text-white font-bold">{socialProofHighlight}</span>
                    </p>
                </div>

            </div>
        </section>
    );
}
