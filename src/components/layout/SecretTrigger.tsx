"use client";

import { Lock } from "lucide-react";

export default function SecretTrigger({ lang }: { lang: string }) {
    return (
        <a
            href={`/${lang}/gizli-giris`}
            className="p-2 text-slate-600 hover:text-slate-400 transition-colors opacity-50 hover:opacity-100"
            title="Admin Girişi"
        >
            <Lock className="w-4 h-4" />
        </a>
    );
}
