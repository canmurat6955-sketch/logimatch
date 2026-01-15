"use client";

import { motion } from "framer-motion";
import { LucideTruck, LucideBarChart3, LucideFileCheck, LucideShieldCheck } from "lucide-react";

const services = [
    {
        icon: LucideTruck,
        title: "Akıllı Yük Eşleştirme",
        description: "Yapay zeka detekli algoritmamız, araç özelliklerinize ve rotanıza en uygun yükü saniyeler içinde bulur. Boş km yapmaya son.",
        color: "bg-blue-500"
    },
    {
        icon: LucideBarChart3,
        title: "Gerçek Zamanlı Filo Yönetimi",
        description: "Araçlarınızın konumunu, durumunu ve performansını tek ekrandan izleyin. Operasyonel verimliliğinizi maksimuma çıkarın.",
        color: "bg-emerald-500"
    },
    {
        icon: LucideFileCheck,
        title: "Dijital Belge ve Uyumluluk",
        description: "CMR, e-İrsaliye ve diğer tüm belgeler dijital ortamda. Takograf verileriyle %100 yasal uyumluluk takibi.",
        color: "bg-purple-500"
    },
    {
        icon: LucideShieldCheck,
        title: "Finansal Kontrol ve Kârlılık",
        description: "Araç bazlı gelir-gider analizi, yakıt takibi ve bakım maliyetleri. Filonuzun gerçek net kârını görün.",
        color: "bg-orange-500"
    }
];

export default function Services({ dict, lang }: { dict: any, lang: string }) {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6"
                    >
                        Lojistiğin İşletim Sistemi
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-400"
                    >
                        Logimatch, sadece bir yük bulma platformu değil; filonuzu, finansınızı ve operasyonunuzu tek merkezden yönetmenizi sağlayan uçtan uca bir çözümdür.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-slate-800/50 hover:border-white/10 transition-all group"
                        >
                            <div className={`${service.color}/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform`}>
                                <service.icon className={`w-7 h-7 ${service.color.replace('bg-', 'text-')}`} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
