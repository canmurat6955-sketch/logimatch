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
    LogOut,
    MapPin,
    Boxes,
    FileText,
    Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const navGroups = [
    {
        title: 'Operasyon',
        items: [
            { name: 'Yük Eşleşmeleri', href: '/dashboard/loads', icon: Map },
            { name: 'Operasyon Haritası', href: '/dashboard/map', icon: MapPin },
            { name: 'Rota Planlama', href: '/dashboard/planning', icon: Boxes },
        ]
    },
    {
        title: 'Filo & Kaynaklar',
        items: [
            { name: 'Araçlarım (Garaj)', href: '/dashboard/fleet/my-vehicles', icon: Truck },
            { name: 'Filo Yönetimi (Admin)', href: '/dashboard/fleet', icon: LayoutDashboard },
            { name: 'Şoförler', href: '/dashboard/drivers', icon: Users },
        ]
    },
    {
        title: 'Finans',
        items: [
            { name: 'Finansal Özet', href: '/dashboard/finance', icon: CreditCard },
            { name: 'Cüzdan & Bakiye', href: '/dashboard/finance/wallet', icon: Wallet },
            { name: 'Raporlar', href: '/dashboard/reports', icon: BarChart3 },
        ]
    }
];

export default function Sidebar({ lang }: { lang: string }) {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex w-64 bg-slate-900 border-r border-white/5 flex-col h-screen fixed">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Truck className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-white">HAULINK</span>
                </div>

                <div className="space-y-1">
                    {/* Dashboard (Direct Link) */}
                    <Link
                        href={`/${lang}/dashboard`}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-4",
                            pathname === `/${lang}/dashboard`
                                ? "bg-blue-600/10 text-blue-400"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>

                    {/* Accordion Menu */}
                    <Accordion type="multiple" defaultValue={['item-0', 'item-1', 'item-2']} className="space-y-2">
                        {navGroups.map((group, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-none">
                                <AccordionTrigger className="px-3 py-2 text-slate-500 hover:text-white hover:no-underline rounded-lg hover:bg-white/5 text-xs uppercase tracking-wider font-bold">
                                    {group.title}
                                </AccordionTrigger>
                                <AccordionContent className="pb-0 pt-1">
                                    <div className="space-y-1 ml-2 border-l border-white/10 pl-2">
                                        {group.items.map((item) => {
                                            const href = `/${lang}${item.href}`;
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
                                                    <item.icon className="w-4 h-4" />
                                                    {item.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>

            <div className="mt-auto p-6 space-y-1 border-t border-white/5">
                <Link
                    href={`/${lang}/dashboard/settings`}
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname === `/${lang}/dashboard/settings`
                            ? "bg-blue-600/10 text-blue-400"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                >
                    <Settings className="w-5 h-5" />
                    Ayarlar
                </Link>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-900/10 text-sm font-medium transition-colors w-full">
                    <LogOut className="w-5 h-5" />
                    Çıkış Yap
                </button>
            </div>
        </aside>
    );
}
