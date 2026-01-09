'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Map,
    Truck,
    CreditCard,
    Users,
    Settings,
    BarChart3,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Yük Eşleşmeleri', href: '/dashboard/loads', icon: Map },
    { name: 'Filo Yönetimi', href: '/dashboard/fleet', icon: Truck },
    { name: 'Şoförler', href: '/dashboard/drivers', icon: Users },
    { name: 'Finans & Kârlılık', href: '/dashboard/finance', icon: CreditCard },
    { name: 'Raporlar', href: '/dashboard/reports', icon: BarChart3 },
    { name: 'Ayarlar', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar({ lang }: { lang: string }) {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col h-screen fixed">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Truck className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-white">LOGIMATCH</span>
                </div>

                <div className="space-y-1">
                    {navItems.map((item) => {
                        const href = `/${lang}${item.href}`;
                        // Simple active check. 
                        // If pathname === href, it's active.
                        // Or if pathname starts with href/ (for nested)
                        const isActive = pathname === href || pathname?.startsWith(`${href}/`);

                        return (
                            <Link
                                key={item.href}
                                href={href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-600/10 text-blue-400"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="mt-auto p-6 border-t border-white/5">
                <button className="flex items-center gap-3 text-slate-400 hover:text-white text-sm font-medium transition-colors w-full">
                    <LogOut className="w-5 h-5" />
                    Çıkış Yap
                </button>
            </div>
        </aside>
    );
}
