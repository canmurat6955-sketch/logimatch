import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest, { params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? `/${lang}/dashboard`

    if (token_hash && type) {
        // Create a response object that we can modify
        const response = NextResponse.next()

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            // Set cookies on the response object instead of request
                            response.cookies.set(name, value, options)
                        })
                    },
                },
            }
        )

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })

        if (!error) {
            // We need to redirect, but we must preserve the cookies set on 'response'
            const redirectResponse = NextResponse.redirect(new URL(next, request.url))
            
            // Copy cookies from our temporary response to the redirect response
            response.cookies.getAll().forEach((cookie) => {
                redirectResponse.cookies.set(cookie)
            })

            return redirectResponse
        }
    }

    // return the user to an error page with some instructions
    return NextResponse.redirect(new URL(`/${lang}/auth/auth-code-error`, request.url))
}
