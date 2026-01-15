"use server";

import { createClient } from "@/lib/supabase/server";

export interface LoadActivity {
    id: string;
    load_id: string;
    event_type: 'PICKUP' | 'DELIVERED' | 'DOC_MISSING' | 'DOC_UPLOADED' | 'ISSUE';
    description: string;
    created_at: string;
    load_summary?: string;
}

export async function getRecentActivities() {
    const supabase = await createClient();

    // FETCH EVENTS
    const { data: events } = await supabase
        .from('load_events')
        .select('*, loads(origin, destination, status)')
        .order('created_at', { ascending: false })
        .limit(10);

    return events;
}

export async function checkAndNotifyMissingDocs(loadId: string) {
    const supabase = await createClient();

    // 1. Fetch Load
    const { data: load } = await supabase
        .from('loads')
        .select('*')
        .eq('id', loadId)
        .single();

    if (!load) return { success: false, message: 'Load not found' };

    // 2. Check Logic (Mock: delivered but no waybill)
    // In real app, we check load.documents['waybill']
    // For demo, we'll force simulate "Missing Waybill"

    // 3. Mock Sending Message
    // await sendSMS(load.customer_phone, "Eksik evrak...");

    // 4. Log the automated action
    await supabase.from('load_events').insert({
        load_id: loadId,
        event_type: 'ISSUE',
        description: `⚠️ Otomatik Mesaj Gönderildi: "Sn. Müşteri, ${load.origin}-${load.destination} yükünüzün irsaliyesi eksiktir. Lütfen yükleyiniz."`
    });

    return { success: true, message: 'Otomatik uyarı gönderildi.' };
}

// SIMULATOR FOR DEMO: Generate random activities
export async function simulateActivity() {
    const supabase = await createClient();
    const types = ['PICKUP', 'DELIVERED', 'DOC_UPLOADED'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    // Get a random load
    const { data: loads } = await supabase.from('loads').select('id, origin, destination').limit(1);
    if (!loads || loads.length === 0) return;

    const load = loads[0];

    await supabase.from('load_events').insert({
        load_id: load.id,
        event_type: randomType,
        description: `${load.origin} > ${load.destination} seferinde yeni hareket: ${randomType}`
    });
}
