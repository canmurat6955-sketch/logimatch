import { createBrowserClient } from '@supabase/ssr'
import { createMockClient } from './mockClient'

export function createClient() {
    // if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
    //     return createMockClient() as any
    // }

    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
