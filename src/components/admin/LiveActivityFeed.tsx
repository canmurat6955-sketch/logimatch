"use client";

import { useEffect, useState } from "react";
import { LucideActivity, LucideCheckCircle, LucideTruck, LucideAlertTriangle, LucideFileWarning, LucideSend } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { checkAndNotifyMissingDocs, simulateActivity } from "@/lib/actions/workflow";

interface Activity {
    id: string;
    event_type: 'PICKUP' | 'DELIVERED' | 'DOC_MISSING' | 'DOC_UPLOADED' | 'ISSUE';
    description: string;
    created_at: string;
}

export default function LiveActivityFeed() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const supabase = createClient();

    useEffect(() => {
        // Initial fetch logic omitted for brevity, rely on Realtime
        // Create some fake data for start
        simulateActivity(); // Trigger server to make one

        const channel = supabase
            .channel('live-workflow')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'load_events' },
                (payload) => {
                    setActivities(prev => [payload.new as Activity, ...prev].slice(0, 5));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleAutoAction = async (act: Activity) => {
        // Assume context is passed in activity or needed
        // For demo, just call the action
        await checkAndNotifyMissingDocs(act.id); // Passing event ID as proxy for load ID logic in demo
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'PICKUP': return <LucideTruck className="w-4 h-4 text-blue-500" />;
            case 'DELIVERED': return <LucideCheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'DOC_MISSING': return <LucideFileWarning className="w-4 h-4 text-red-500" />;
            case 'ISSUE': return <LucideAlertTriangle className="w-4 h-4 text-orange-500" />;
            default: return <LucideActivity className="w-4 h-4 text-zinc-500" />;
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                Canlı İş Akışı
                <span className="text-xs font-normal text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full animate-pulse">
                    ● Canlı
                </span>
            </h3>

            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
                {activities.length === 0 && (
                    <div className="text-center text-zinc-600 py-4 text-sm">
                        Akış bekleniyor... (Yeni işlemler burada görünür)
                    </div>
                )}

                {/* Demo Mock Item for Missing Doc */}
                <div className="flex gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="mt-1"><LucideFileWarning className="w-4 h-4 text-red-500" /></div>
                    <div className="flex-1">
                        <p className="text-sm text-red-200 font-medium">Bursa - Berlin Seferi (Tamamlandı)</p>
                        <p className="text-xs text-red-400 mt-1">⚠️ Teslimat yapıldı fakat İrsaliye henüz yüklenmedi.</p>
                        <button
                            onClick={() => checkAndNotifyMissingDocs('mock-id')}
                            className="mt-2 text-xs flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 rounded transition-colors"
                        >
                            <LucideSend className="w-3 h-3" /> Müşteriye Otomatik Bildir
                        </button>
                    </div>
                    <span className="text-[10px] text-zinc-500">Şimdi</span>
                </div>

                {activities.map(act => (
                    <div key={act.id} className="flex gap-3 pb-3 border-b border-zinc-800/50 last:border-0">
                        <div className="mt-1 bg-zinc-800 p-1.5 rounded-full h-fit">
                            {getIcon(act.event_type)}
                        </div>
                        <div>
                            <p className="text-sm text-zinc-300 leading-snug">{act.description}</p>
                            <span className="text-[10px] text-zinc-500">
                                {new Date(act.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
