'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Truck, ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DriverLoginPage({ params }: { params: Promise<{ lang: string }> }) {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock Validation
        // In real world, this would verify token against DB
        setTimeout(async () => {
            const { lang } = await params;
            // Success
            if (code.length === 6) {
                router.push(`/${lang}/driver/task/TR-34-VR-1234`);
            } else {
                setLoading(false);
                alert("Geçersiz Kod (6 hane olmalı)");
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]" />

            <div className="w-full max-w-sm z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl shadow-blue-900/40 mb-4">
                        <Truck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Sürücü Paneli</h1>
                    <p className="text-slate-400 text-sm">Size gönderilen 6 haneli erişim kodunu girin.</p>
                </div>

                <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-2xl space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Erişim Kodu</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <Input
                                type="text"
                                placeholder="123456"
                                className={cn(
                                    "pl-10 h-12 bg-slate-900/50 border-white/10 text-white text-lg tracking-widest font-mono text-center focus:border-blue-500 transition-all",
                                    code.length === 6 && "border-blue-500/50 bg-blue-500/10"
                                )}
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all shadow-lg shadow-blue-600/20"
                        disabled={loading || code.length < 6}
                    >
                        {loading ? 'Doğrulanıyor...' : (
                            <span className="flex items-center gap-2">
                                Giriş Yap <ArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-600 text-xs">
                        &copy; 2026 Haulink Driver App v1.0
                    </p>
                </div>
            </div>
        </div>
    );
}
