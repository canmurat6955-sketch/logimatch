"use server";

import { createClient } from "@/lib/supabase/server";

export interface Profile {
    id: string;
    email: string; // from auth.users (joined)
    first_name: string;
    last_name: string;
    role: 'driver' | 'load_owner' | 'transport_company';
    company_name?: string;
    verification_status: 'pending' | 'verified' | 'rejected' | 'banned';
    created_at: string;
}

export async function getAdminUsers() {
    const supabase = await createClient();

    // Note: This requires a complex join or a view because email is in auth.users
    // For now, we will fetch from public.profiles and assume emails are there or handled via extensive query
    // Actually, easiest way for Admin is to use `supabase.auth.admin.listUsers()` if we have service_role key
    // But purely client-side/server-action with standard key might be limited access to auth.users.

    // Alternative: Just query profiles and show info present there.

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }

    return data as Profile[];
}

export async function updateUserStatus(userId: string, status: 'verified' | 'rejected' | 'banned') {
    const supabase = await createClient();
    const { error } = await supabase
        .from('profiles')
        .update({ verification_status: status })
        .eq('id', userId);

    if (error) throw error;
    return true;
}
