'use client';

import { Home, Map, Package, User, Wallet, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface MobileBottomNavProps {
    lang: string;
}

export default function MobileBottomNav({ lang }: MobileBottomNavProps) {
    const pathname = usePathname();

    // Default to Load Owner links for MVP as per user focus
    const navItems = [
        {
            label: 'Ana Sayfa',
            icon: Home,
            href: `/${lang}/dashboard`
        },
        {
            label: 'Yükler',
            icon: Package,
            href: `/${lang}/dashboard/loads`
        },
        {
            label: 'Harita',
            icon: Map,
            href: `/${lang}/dashboard/map`
        },
        {
            label: 'Finans',
            icon: Wallet,
            href: `/${lang}/dashboard/finance`
        },
        {
            label: 'Profil',
            icon: User,
            href: `/${lang}/dashboard/profile`
        }
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-t border-white/10 pb-safe-area-inset-bottom">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 active:scale-95",
                                isActive
                                    ? "text-blue-500"
                                    : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6", isActive && "fill-current/20")} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
