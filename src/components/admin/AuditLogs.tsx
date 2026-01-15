import { LucideShieldAlert, LucideUserCog, LucideDatabaseBackup, LucideClock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminAudit() {
    const logs = [
        {
            id: 1,
            time: "12:44:01",
            type: "SYS",
            message: "Admin login detected directly via Bypass",
            level: "critical",
            icon: LucideShieldAlert
        },
        {
            id: 2,
            time: "12:42:15",
            type: "USR",
            message: "ahmet_yilmaz updated vehicle status to 'Moving'",
            level: "info",
            icon: LucideUserCog
        },
        {
            id: 3,
            time: "12:40:00",
            type: "SYS",
            message: "Daily automated backup completed",
            level: "normal",
            icon: LucideDatabaseBackup
        }
    ];

    return (
        <div className="space-y-4 md:space-y-6">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <LucideClock className="w-5 h-5 md:w-6 md:h-6 text-zinc-500" />
                Denetim Kayıtları
            </h1>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800/50">
                {logs.map((log) => (
                    <div key={log.id} className="p-4 flex items-start gap-3 md:gap-4 hover:bg-zinc-800/20 transition-colors">
                        <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            log.level === 'critical' ? "bg-red-500/10 text-red-500" :
                                log.level === 'info' ? "bg-blue-500/10 text-blue-500" :
                                    "bg-zinc-800 text-zinc-400"
                        )}>
                            <log.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-1">
                                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 self-start">
                                    [{log.time}] {log.type}
                                </span>
                            </div>
                            <p className={cn(
                                "text-sm break-words",
                                log.level === 'critical' ? "text-red-400 font-medium" :
                                    log.level === 'info' ? "text-blue-300" :
                                        "text-zinc-400"
                            )}>
                                {log.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
