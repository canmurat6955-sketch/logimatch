
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createMockClient } from './mockClient'

export async function createClient() {
    const cookieStore = await cookies()

    if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
        return createMockClient() as any
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!.replace("localhost", "127.0.0.1");

    return createServerClient(
        supabaseUrl,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
