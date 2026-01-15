"use client";

import { useState, use } from "react";
import { adminQuickLogin } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { LucideKey, LucideShieldAlert, LucideMail, LucideLock } from "lucide-react";
import { motion } from "framer-motion";

export default function SecretEntryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = use(params);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        const key = formData.get("key") as string;

        try {
            // Create a timeout promise
            const timeoutPromise = new Promise<{ error: string }>((resolve) => {
                setTimeout(() => resolve({ error: "İşlem zaman aşımına uğradı. Sunucu yanıt vermiyor." }), 15000);
            });

            // Race the action against the timeout
            const result = await Promise.race([
                adminQuickLogin(key, lang),
                timeoutPromise
            ]);

            if (result?.error) {
                setError(result.error);
                setLoading(false);
            }
        } catch (e) {
            console.error("Login Error:", e);
            // Don't set error if it's a redirect (Next.js redirect throws an error)
            // But usually Promise.race with server action that redirects... the redirect happens.
            // If the redirect error is caught here, we should rethrow strictly speaking,
            // but usually server action redirect is handled by the framework before returning to this await.
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-[0_0_50px_rgba(255,0,0,0.1)]"
            >
                <div className="flex justify-center mb-6">
                    <div className="bg-red-500/10 p-4 rounded-full border border-red-500/20">
                        <LucideShieldAlert className="w-10 h-10 text-red-500" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-red-500 text-center mb-2 tracking-widest uppercase">Gizli Erişim</h1>
                <p className="text-zinc-500 text-center mb-8 font-mono text-sm">Giriş Yap & Yetki Yükselt</p>

                <form action={handleSubmit} className="space-y-4">
                    {/* Master Key */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <LucideKey className="w-5 h-5 text-red-500" />
                        </div>
                        <input
                            name="key"
                            type="password"
                            required
                            placeholder="Master Key"
                            className="w-full bg-black border border-zinc-800 text-red-500 placeholder:text-zinc-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-mono tracking-widest"
                            autoComplete="off"
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-xs font-mono bg-red-950/30 p-2 rounded border border-red-900/50">
                            HATA: {error}
                        </div>
                    )}

                    <Button
                        disabled={loading}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-mono uppercase tracking-wider h-12 border border-zinc-700 mt-4"
                    >
                        {loading ? "Yetkilendiriliyor..." : "Kilidi Aç"}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
