"use client";

import { useEffect, useState } from "react";
import { LucideShieldAlert, LucideClock } from "lucide-react";
import { getAuditLogs, AuditLog } from "@/lib/actions/integrity";

export default function AdminAudit() {
    const [logs, setLogs] = useState<AuditLog[]>([]);

    useEffect(() => {
        getAuditLogs().then(setLogs);
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <LucideShieldAlert className="text-red-500" />
                Güvenlik Denetim Logları
            </h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm text-zinc-400">
                    <thead className="bg-zinc-950/50 text-zinc-500 uppercase font-medium">
                        <tr>
                            <th className="p-4">Eylem</th>
                            <th className="p-4">Detaylar</th>
                            <th className="p-4">Zaman</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-zinc-600">
                                    Henüz kayıt bulunmuyor.
                                </td>
                            </tr>
                        ) : logs.map((log) => (
                            <tr key={log.id} className="hover:bg-zinc-800/30">
                                <td className="p-4 font-bold text-white">{log.action}</td>
                                <td className="p-4 font-mono text-xs text-zinc-500">
                                    {JSON.stringify(log.details)}
                                </td>
                                <td className="p-4 flex items-center gap-1">
                                    <LucideClock className="w-3 h-3" />
                                    {new Date(log.created_at).toLocaleString('tr-TR')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
