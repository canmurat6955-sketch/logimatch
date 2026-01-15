"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LucideDownload, LucideX } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function PWAInstaller() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallBtn, setShowInstallBtn] = useState(false);

    useEffect(() => {
        // Register Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js').then(function (registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function (err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }

        // Listen for install prompt
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallBtn(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        setDeferredPrompt(null);
        setShowInstallBtn(false);
    };

    return (
        <AnimatePresence>
            {showInstallBtn && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm"
                >
                    <div className="bg-zinc-900/90 backdrop-blur border border-zinc-800 p-4 rounded-xl shadow-2xl flex items-center gap-4">
                        <div className="bg-blue-600/20 p-3 rounded-lg">
                            <LucideDownload className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-bold text-sm">Uygulamayı Yükle</h4>
                            <p className="text-xs text-zinc-400">Daha hızlı ve kesintisiz deneyim için.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button size="sm" onClick={handleInstallClick} className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-8">
                                Yükle
                            </Button>
                            <button
                                onClick={() => setShowInstallBtn(false)}
                                className="text-[10px] text-zinc-500 hover:text-white underline decoration-zinc-700"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
