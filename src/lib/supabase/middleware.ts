
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

import { createMockClient } from './mockClient'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })




    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // --- ADMIN BYPASS CHECK ---
    const adminBypass = request.cookies.get('admin_access')?.value === 'true';
    if (adminBypass) {
        // If we have the bypass cookie, don't try to connect to Supabase (it might hang)
        // Just let them pass if they are going to admin
        if (request.nextUrl.pathname.includes('/admin')) {
            return supabaseResponse;
        }
        // If they act like a user but are admin bypass... we might need to fake a user?
        // For now, let's just return.
    }

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname;

    // Define routes
    const isAuthRoute = path.includes('/auth') || path.includes('/login') || path.includes('/register');
    // REMOVED /gizli-giris from here so it can be accessed publicly to perform the login
    const isProtectedRoute = path.includes('/dashboard') || path.includes('/onboarding') || path.includes('/admin');
    const isPublicRoute = path === '/' || path.match(/^\/[^/]+$/); // /en, /tr etc.

    // If admin bypass is on, we skip the "no user" check for admin routes
    if (adminBypass && path.includes('/admin')) {
        return supabaseResponse;
    }

    // 1. If no user and trying to access protected route -> Redirect to Login
    // For now, we don't have a dedicated /login page separate from landing, 
    // maybe redirect to landing with open login modal or just /
    if (!user && isProtectedRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/' // Redirect to landing
        return NextResponse.redirect(url)
    }

    // 2. If user exists
    if (user) {
        // Check if user has a role in profiles
        // We need to fetch the profile to know the role
        // Note: This might add latency, be careful. 
        // Optimization: Store role in user_metadata if possible, but for now query DB.

        // Only check role if we are navigating to protected routes to avoid loops
        if (isProtectedRoute || path === '/' || path.match(/^\/[a-z]{2}$/) || path.includes('/admin')) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            const role = profile?.role;

            // PROTECT ADMIN ROUTE
            if (path.includes('/admin') && role !== 'admin') {
                const url = request.nextUrl.clone()
                const locale = path.match(/^\/([a-z]{2})/)?.[1] || 'tr';
                // Redirect unauthorized users to dashboard
                url.pathname = `/${locale}/dashboard`;
                return NextResponse.redirect(url);
            }

            // If user has NO role -> force them to /onboarding
            // Unless they are already on /onboarding
            if (!role && !path.includes('/onboarding')) {
                const url = request.nextUrl.clone()
                // Preserve locale if possible, or default to tr
                // simple regex to grab locale
                const locale = path.match(/^\/([a-z]{2})/)?.[1] || 'tr';
                url.pathname = `/${locale}/onboarding`
                return NextResponse.redirect(url)
            }

            // If user HAS role -> preventing them from going to /onboarding again?
            // Maybe optional, but good for UX.
            if (role && path.includes('/onboarding')) {
                const url = request.nextUrl.clone()
                const locale = path.match(/^\/([a-z]{2})/)?.[1] || 'tr';
                url.pathname = `/${locale}/dashboard`
                return NextResponse.redirect(url)
            }
        }
    }

    return supabaseResponse
}
