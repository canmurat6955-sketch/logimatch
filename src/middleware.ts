import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./lib/dictionary";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
    // Check headers if needed, for now default to 'tr'
    return "tr";
}

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname;

    // Skip public files
    if (
        pathname.includes('.') || // files
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api')
    ) {
        return;
    }

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // e.g. incoming request is /products
        // The new URL is now /en/products
        return NextResponse.redirect(
            new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
