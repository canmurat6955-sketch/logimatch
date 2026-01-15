'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Truck, Building2, Users, Mail, ArrowRight, Github, Linkedin, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'register';
    lang: string;
}

type UserRole = 'load-owner' | 'vehicle-owner' | 'enterprise';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', lang }: AuthModalProps) {
    const router = useRouter();
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);
    const [selectedRole, setSelectedRole] = useState<UserRole>('load-owner');
    const [isLoading, setIsLoading] = useState(false);
    const [showMagicLinkSent, setShowMagicLinkSent] = useState(false);
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In a real app, this would use Supabase Auth
        // For verify/demo purposes, we route based on selected role

        if (mode === 'register') {
            setShowMagicLinkSent(true);
        } else {
            // Login simulation - redirect to dashboard with role query param logic handling in dashboard (or cookie)
            // For now, simple redirect
            document.cookie = `mock_role=${selectedRole}; path=/`; // Simple client-side cookie for mock
            router.push(`/${lang}/dashboard`);
            onClose();
        }

        setIsLoading(false);
    };

    const roles = [
        { id: 'load-owner', label: 'Yük Sahibi', icon: Users, color: 'blue' },
        { id: 'vehicle-owner', label: 'Araç Sahibi', icon: Truck, color: 'emerald' },
        { id: 'enterprise', label: 'Lojistik Firması', icon: Building2, color: 'violet' },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden scale-in-95 animate-in fade-in duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Role Selection Header */}
                <div className="bg-slate-950/50 p-6 pb-4 border-b border-white/5">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 mb-3 border border-blue-500/20">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            {mode === 'login' ? 'Tekrar Hoşgeldiniz' : 'Hesap Oluşturun'}
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                            Lütfen giriş yapmak için bir rol seçin.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {roles.map((role) => {
                            const Icon = role.icon;
                            const isSelected = selectedRole === role.id;
                            return (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.id as UserRole)}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200",
                                        isSelected
                                            ? `bg-${role.color}-500/10 border-${role.color}-500/50 text-${role.color}-400 ring-1 ring-${role.color}-500/50`
                                            : "bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800 hover:border-white/10"
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-[10px] font-medium">{role.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Form Body */}
                <div className="p-6 pt-6">
                    {showMagicLinkSent ? (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-4 animate-bounce">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Doğrulama Gönderildi!</h3>
                            <p className="text-sm text-slate-400 mb-6">
                                <span className="text-white font-medium">{email}</span> iletişim adresine bir giriş bağlantısı/kodu gönderdik. Lütfen kontrol edin.
                            </p>
                            <Button
                                variant="outline"
                                className="w-full border-white/10 text-white hover:bg-white/5"
                                onClick={onClose}
                            >
                                Pencereyi Kapat
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleAuth} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-300 ml-1">E-posta veya Telefon</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="ornek@sirket.com veya 053..."
                                        required
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Password input could be added here, currently defaulting to Magic Link flow for simplicity */}

                            <Button
                                type="submit"
                                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-blue-900/20 group"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>İşleniyor...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span>{mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>

                            {/* Social login buttons removed as per request */}

                            <p className="text-center text-xs text-slate-500 mt-4">
                                {mode === 'login' ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
                                <button
                                    type="button"
                                    onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                                    className="ml-1 text-blue-400 hover:text-blue-300 font-medium hover:underline"
                                >
                                    {mode === 'login' ? 'Hemen Kayıt Olun' : 'Giriş Yapın'}
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
