"use server";

import { createClient } from "@/lib/supabase/server";

export interface AuditLog {
    id: string;
    action: string;
    details: any;
    created_at: string;
    admin_email?: string; // Derived or joined
}

export async function getAuditLogs() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

    if (error) {
        console.error("Error fetching audit logs", error);
        return [];
    }

    return data as AuditLog[];
}

export async function logAction(action: string, details: any) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('audit_logs')
        .insert({
            action,
            details
        });

    if (error) console.error("Failed to log action:", error);
}

export async function sendBroadcast(title: string, message: string) {
    const supabase = await createClient();

    // 1. Create Broadcast Record
    const { error } = await supabase.from('broadcasts').insert({
        title,
        message,
        target_audience: 'all'
    });

    if (error) throw error;

    // 2. Log this action
    await logAction('SEND_BROADCAST', { title });

    return true;
}
