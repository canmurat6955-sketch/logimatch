'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function seedLoads() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    const dummyLoads = [
        { owner_id: user.id, origin: 'Istanbul', destination: 'Berlin', weight: 22, price: 85000, status: 'delivered' },
        { owner_id: user.id, origin: 'Ankara', destination: 'Izmir', weight: 12, price: 15000, status: 'assigned' },
        { owner_id: user.id, origin: 'Bursa', destination: 'Lyon', weight: 18, price: 92000, status: 'open' },
        { owner_id: user.id, origin: 'Izmir', destination: 'Sofia', weight: 20, price: 45000, status: 'delivered' },
        { owner_id: user.id, origin: 'Antalya', destination: 'Munich', weight: 24, price: 110000, status: 'assigned' },
    ];

    const { error } = await supabase.from('loads').insert(dummyLoads);

    if (error) {
        console.error('Seed error:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
}
