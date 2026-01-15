import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { i18n } from "./lib/dictionary";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
    // Check headers if needed, for now default to 'tr'
    return "tr";
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip internal paths for i18n check, but we might still want session update for some
    // tailored exclusion list
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('.') || // extension files
        pathname.startsWith('/api') ||
        pathname.startsWith('/auth')
    ) {
        // Just return session update or next
        return await updateSession(request);
    }

    // 1. Check Locale
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
        );
    }

    // 2. Update Session & Handle Auth Redirects
    // 2. Update Session & Handle Auth Redirects
    // Skip session update for the secret login page itself to prevent hanging if DB is down
    if (pathname.includes('/gizli-giris')) {
        return NextResponse.next();
    }

    return await updateSession(request);
    // return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
