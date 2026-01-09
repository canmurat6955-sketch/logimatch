'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from '@/lib/dictionary';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    const redirectedPathName = (locale: Locale) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const locale = e.target.value as Locale;
        router.push(redirectedPathName(locale));
    };

    const currentLocale = pathname?.split('/')[1] || i18n.defaultLocale;

    return (
        <div className="flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4 opacity-70" />
            <select
                value={currentLocale}
                onChange={handleLocaleChange}
                className="bg-transparent border-none focus:ring-0 cursor-pointer outline-none"
            >
                {i18n.locales.map((locale) => (
                    <option key={locale} value={locale} className="text-black">
                        {locale.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}
