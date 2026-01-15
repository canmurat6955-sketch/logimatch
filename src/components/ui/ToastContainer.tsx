'use client';

import { useNotification, Notification } from "@/lib/contexts/NotificationContext";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LucideCheckCircle, LucideAlertTriangle, LucideXCircle, LucideInfo, LucideX } from "lucide-react";

export default function ToastContainer() {
    const { notifications, removeNotification } = useNotification();
    // We only show the latest 3 "unread" ones as toasts
    const [toasts, setToasts] = useState<Notification[]>([]);

    useEffect(() => {
        // When notifications change, find new ones to show as toast
        // Logic: Show recent unread ones created in last 5 seconds
        const now = Date.now();
        const recent = notifications.filter(n => n.timestamp > now - 5000 && !n.read);
        setToasts(recent.slice(0, 3));
    }, [notifications]);

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        layout
                        className="pointer-events-auto bg-zinc-900 border border-zinc-800 text-white p-4 rounded-xl shadow-2xl min-w-[320px] flex items-start gap-3 backdrop-blur-sm"
                    >
                        <div className="mt-0.5">
                            {toast.type === 'success' && <LucideCheckCircle className="w-5 h-5 text-emerald-500" />}
                            {toast.type === 'error' && <LucideXCircle className="w-5 h-5 text-red-500" />}
                            {toast.type === 'warning' && <LucideAlertTriangle className="w-5 h-5 text-amber-500" />}
                            {toast.type === 'info' && <LucideInfo className="w-5 h-5 text-blue-500" />}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm">{toast.title}</h4>
                            <p className="text-xs text-zinc-400 mt-0.5">{toast.message}</p>
                        </div>
                        <button
                            onClick={() => removeNotification(toast.id)}
                            className="text-zinc-500 hover:text-white transition-colors"
                        >
                            <LucideX className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
