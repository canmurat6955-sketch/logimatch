"use client";

import { useEffect, useState } from "react";
import { checkSystemHealth, SystemHealth } from "@/lib/actions/health";
import { LucideActivity } from "lucide-react";

export default function SystemHealthIndicator() {
    const [health, setHealth] = useState<SystemHealth | null>(null);

    useEffect(() => {
        const check = async () => {
            const status = await checkSystemHealth();
            setHealth(status);
        };

        // Check immediately
        check();

        // Poll every 30 seconds
        const interval = setInterval(check, 30000);
        return () => clearInterval(interval);
    }, []);

    if (!health) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/10 border border-zinc-800 rounded-full">
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse" />
                <span className="text-xs text-zinc-500 font-medium">Kontrol ediliyor...</span>
            </div>
        );
    }

    const getStatusColor = (status: SystemHealth['status']) => {
        switch (status) {
            case 'healthy': return 'bg-green-500 text-green-500';
            case 'degraded': return 'bg-yellow-500 text-yellow-500';
            case 'down': return 'bg-red-500 text-red-500';
            default: return 'bg-zinc-500 text-zinc-500';
        }
    };

    // Split for border/text styles
    const baseColor = health.status === 'healthy' ? 'green-500' :
        health.status === 'degraded' ? 'yellow-500' : 'red-500';

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 bg-${baseColor}/10 border border-${baseColor}/20 rounded-full transition-colors duration-500`}>
            <div className={`w-2 h-2 bg-${baseColor} rounded-full animate-pulse`} />
            <span className={`text-xs text-${baseColor} font-medium`}>
                {health.message} ({health.latency}ms)
            </span>
            <LucideActivity className={`w-3 h-3 ml-1 text-${baseColor}`} />
        </div>
    );
}
