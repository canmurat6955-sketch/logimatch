'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { Truck } from 'lucide-react';
import SecretTrigger from './SecretTrigger';
import AuthModal from '@/components/auth/AuthModal';
import NotificationBell from './NotificationBell';

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
    const pathname = usePathname();
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

    if (pathname?.includes('/dashboard')) return null;

    const openAuth = (mode: 'login' | 'register') => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Truck className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                                HAULINK
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href={`/${lang}#features`} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                                {dict.nav.features}
                            </Link>
                            <Link href={`/${lang}#pricing`} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                                {dict.nav.pricing}
                            </Link>
                            <Link href={`/${lang}#about`} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                                {dict.nav.about}
                            </Link>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <NotificationBell />
                            <SecretTrigger lang={lang} />
                            <LanguageSwitcher />
                            <Button
                                variant="ghost"
                                className="text-sm font-medium text-slate-300 hover:text-white hidden sm:block hover:bg-white/5"
                                onClick={() => openAuth('login')}
                            >
                                {dict.nav.login}
                            </Button>
                            <Button
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/25"
                                onClick={() => openAuth('register')}
                            >
                                {dict.nav.getStarted}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialMode={authMode}
                lang={lang}
            />
        </>
    );
}
