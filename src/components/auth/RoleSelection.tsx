'use client';

import { Truck, Package, Factory, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function RoleSelection({ lang }: { lang: string }) {
    const router = useRouter();

    const handleRoleSelect = (role: string) => {
        // In a real app, this would set a session/cookie
        router.push(`/${lang}/dashboard?role=${role}`);
    };

    const roles = [
        {
            id: 'vehicle_owner',
            title: 'Araç Sahibi / Şoför',
            desc: 'Yük bulun, rotanızı planlayın, aracınızı yönetin.',
            icon: Truck,
            color: 'blue'
        },
        {
            id: 'load_owner',
            title: 'Yük Sahibi',
            desc: 'Yüklerinizi yayınlayın, en uygun aracı bulun, maliyetleri takip edin.',
            icon: Package,
            color: 'emerald'
        },
        {
            id: 'logistics_company',
            title: 'Lojistik Şirketi (Filo)',
            desc: 'Hem yük hem araç yönetimi. Tam kapsamlı filo kontrolü.',
            icon: Factory,
            color: 'purple'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Hoş Geldiniz</h1>
                <p className="text-slate-400">Lütfen devam etmek için çalışma modelinizi seçin.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
                {roles.map((role, i) => (
                    <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleRoleSelect(role.id)}
                        className={`
              relative p-8 rounded-2xl border cursor-pointer group transition-all duration-300
              ${role.color === 'blue' ? 'bg-blue-950/20 border-blue-500/20 hover:border-blue-500 hover:bg-blue-900/30' : ''}
              ${role.color === 'emerald' ? 'bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-900/30' : ''}
              ${role.color === 'purple' ? 'bg-purple-950/20 border-purple-500/20 hover:border-purple-500 hover:bg-purple-900/30' : ''}
            `}
                    >
                        <div className={`
              w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors
              ${role.color === 'blue' ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' : ''}
              ${role.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white' : ''}
              ${role.color === 'purple' ? 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white' : ''}
            `}>
                            <role.icon className="w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                        <p className="text-slate-400 text-sm mb-6">{role.desc}</p>

                        <div className="flex items-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                            Devam Et <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
