'use client';

import { useNotification } from "@/lib/contexts/NotificationContext";
import { LucideBell, LucideCheckCircle, LucideAlertTriangle, LucideXCircle, LucideInfo } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function NotificationBell() {
    const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotification();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                    <div className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                        <LucideBell className="w-5 h-5" />
                    </div>
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-black"></span>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 bg-zinc-950 border-zinc-800" align="end">
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                    <h4 className="font-bold text-white">Bildirimler</h4>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Tümünü Okundu İşaretle
                        </button>
                    )}
                </div>
                <ScrollArea className="h-[300px]">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-zinc-500 text-sm">
                            <LucideBell className="w-8 h-8 mb-2 opacity-20" />
                            Henüz bildirim yok.
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-800">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`p-4 hover:bg-zinc-900/50 transition-colors cursor-pointer ${notif.read ? 'opacity-60' : 'bg-blue-500/5'}`}
                                    onClick={() => markAsRead(notif.id)}
                                >
                                    <div className="flex gap-3 items-start">
                                        <div className="mt-0.5">
                                            {notif.type === 'success' && <LucideCheckCircle className="w-4 h-4 text-emerald-500" />}
                                            {notif.type === 'error' && <LucideXCircle className="w-4 h-4 text-red-500" />}
                                            {notif.type === 'warning' && <LucideAlertTriangle className="w-4 h-4 text-amber-500" />}
                                            {notif.type === 'info' && <LucideInfo className="w-4 h-4 text-blue-500" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm ${notif.read ? 'text-zinc-400' : 'text-zinc-200 font-medium'}`}>
                                                {notif.message}
                                            </p>
                                            <span className="text-[10px] text-zinc-500 mt-1 block">
                                                {new Date(notif.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        {!notif.read && (
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
