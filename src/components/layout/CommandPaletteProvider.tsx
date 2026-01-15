'use client';

import dynamic from 'next/dynamic';

const GlobalCommandPalette = dynamic(() => import('./GlobalCommandPalette'), {
    ssr: false
});

export default function CommandPaletteProvider({ lang }: { lang: string }) {
    return <GlobalCommandPalette lang={lang} />;
}
