"use server";

import { createClient } from "@/lib/supabase/server";

export interface SystemHealth {
    status: 'healthy' | 'degraded' | 'down';
    latency: number; // ms
    message: string;
    activeConnections: number; // Mocked for now (Postgres RLS limitations)
}

export async function checkSystemHealth(): Promise<SystemHealth> {
    const supabase = await createClient();
    const start = Date.now();

    try {
        // Simple lightweight query to check DB responsiveness
        const { error } = await supabase.from('profiles').select('id').limit(1);

        if (error) throw error;

        const latency = Date.now() - start;

        let status: SystemHealth['status'] = 'healthy';
        if (latency > 500) status = 'degraded';

        return {
            status,
            latency,
            message: status === 'healthy' ? 'Sistem Sağlıklı' : 'Yüksek Gecikme',
            activeConnections: Math.floor(Math.random() * 20) + 5 // Mock: Need pg_stat_activity access
        };
    } catch (error) {
        console.error("Health check failed:", error);
        return {
            status: 'down',
            latency: Date.now() - start,
            message: 'Veritabanı Bağlantı Hatası',
            activeConnections: 0
        };
    }
}
