"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideTruck, LucideLoader2 } from "lucide-react";

export default function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = use(params);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/${lang}/auth/callback`,
                }
            });

            if (error) throw error;

            if (data.session) {
                // Auto-login successful (Email confirmation disabled)
                router.push(`/${lang}/onboarding`);
            } else {
                // Email confirmation required
                alert("Kayıt başarılı! Lütfen e-postanızı doğrulayın.");
                router.push(`/${lang}/login`);
            }
        } catch (err: any) {
            setError(err.message || "Kayıt başarısız.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-emerald-500/10 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl"
            >
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white">
                        <div className="bg-gradient-to-br from-blue-600 to-emerald-600 p-2 rounded-lg">
                            <LucideTruck className="w-6 h-6 text-white" />
                        </div>
                        Logimatch
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white text-center mb-2">Kayıt Olun</h2>
                <p className="text-slate-400 text-center mb-6">Yeni bir hesap oluşturun</p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">E-posta</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-800 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            placeholder="ornek@sirket.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Şifre</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-800 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 transition-all font-semibold"
                        disabled={loading}
                    >
                        {loading ? <LucideLoader2 className="animate-spin mr-2" /> : "Kayıt Ol"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-slate-400 text-sm">
                    Zaten hesabınız var mı?{" "}
                    <Link href={`/${lang}/login`} className="text-blue-400 hover:text-blue-300 font-medium">
                        Giriş Yapın
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
