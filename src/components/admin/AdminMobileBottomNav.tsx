"use client";

import { cn } from "@/lib/utils";
import {
    LucideLayoutDashboard,
    LucideMap,
    LucideUsers,
    LucideWallet,
    LucideMenu
} from "lucide-react";

interface AdminMobileBottomNavProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
    onMenuClick: () => void;
}

export default function AdminMobileBottomNav({
    activeTab,
    onTabChange,
    onMenuClick
}: AdminMobileBottomNavProps) {

    const navItems = [
        { id: "overview", label: "Genel", icon: LucideLayoutDashboard },
        { id: "map", label: "Harita", icon: LucideMap },
        { id: "users", label: "Kullanıcılar", icon: LucideUsers },
        { id: "finance", label: "Finans", icon: LucideWallet },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-t border-white/5 pb-safe-area-inset-bottom">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 active:scale-95",
                                isActive ? "text-red-500" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <item.icon
                                className={cn("w-6 h-6", isActive && "fill-current/20")}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    );
                })}

                {/* Menu/More Button */}
                <button
                    onClick={onMenuClick}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-zinc-500 hover:text-zinc-300 active:scale-95"
                >
                    <LucideMenu className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Menü</span>
                </button>
            </div>
        </div>
    );
}
