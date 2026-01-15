"use client";

import { useState, use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    LucideShieldCheck,
    LucideLayoutDashboard,
    LucideMap,
    LucideUsers,
    LucideWallet,
    LucideRadio,
    LucideHistory,
    LucideLogOut,
    LucideMenu,
    LucideSearch,
    LucideMessageSquare
} from "lucide-react";

import LiveFleetMap from "@/components/admin/LiveFleetMap";
import NotificationBell from "@/components/layout/NotificationBell";
import AdminMobileBottomNav from "@/components/admin/AdminMobileBottomNav";

// Sections
import AdminOverview from "@/components/admin/AdminOverview";
import AdminUserManagement from "@/components/admin/UserManagement";
import AdminFinance from "@/components/admin/FinanceOverview";
import AdminBroadcast from "@/components/admin/BroadcastCenter";
import AdminAudit from "@/components/admin/AuditLogs";
import AdminMessages from "@/components/admin/AdminMessages";
import CommandPalette from "@/components/admin/CommandPalette";
import SystemHealthIndicator from "@/components/admin/SystemHealthIndicator";

export default function AdminDashboard({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = use(params);
    const [activeTab, setActiveTab] = useState("overview");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    }, []);

    const menuItems = [
        { id: "overview", label: "Genel Bakış", icon: LucideLayoutDashboard },
        { id: "map", label: "Savaş Odası (Harita)", icon: LucideMap },
        { id: "finance", label: "Finansal İstihbarat", icon: LucideWallet },
        { id: "messages", label: "Destek & Mesajlar", icon: LucideMessageSquare },
        { id: "broadcast", label: "Duyuru Merkezi", icon: LucideRadio },
        { id: "audit", label: "Denetim Kayıtları", icon: LucideHistory },
    ];

    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    return (
        <div className="min-h-screen bg-black text-slate-200 flex overflow-hidden">
            <CommandPalette open={isCommandPaletteOpen} onOpenChange={setIsCommandPaletteOpen} />
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{
                    x: isSidebarOpen ? 0 : -280,
                    width: isSidebarOpen ? 280 : 0
                }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className={`fixed lg:static inset-y-0 left-0 bg-zinc-900 border-r border-zinc-800 flex flex-col z-40 h-full
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
                `}
                style={{ width: isSidebarOpen ? 280 : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 80 : 0) }}
            >
                <div className="p-6 flex items-center gap-3 border-b border-zinc-800/50">
                    <div className="bg-red-600/20 p-2 rounded-lg min-w-[40px]">
                        <LucideShieldCheck className="w-6 h-6 text-red-500" />
                    </div>
                    {isSidebarOpen && (
                        <div className="overflow-hidden whitespace-nowrap">
                            <h1 className="font-bold text-white tracking-wide">YÖNETİCİ</h1>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider">God Mode</p>
                        </div>
                    )}
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                if (window.innerWidth < 1024) setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all whitespace-nowrap ${activeTab === item.id
                                ? "bg-red-600/10 text-red-500 border border-red-600/20"
                                : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                }`}
                        >
                            <item.icon className="w-5 h-5 min-w-[20px]" />
                            {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-900/20 text-zinc-400 hover:text-red-400 transition-colors whitespace-nowrap">
                        <LucideLogOut className="w-5 h-5 min-w-[20px]" />
                        {isSidebarOpen && <span>Çıkış Yap</span>}
                    </button>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Header */}
                <header className="h-16 bg-zinc-950/50 backdrop-blur border-b border-zinc-800 flex items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden">
                            <LucideMenu className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden md:flex items-center gap-2 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                            onClick={() => setIsCommandPaletteOpen(true)}
                        >
                            <span className="text-xs">Komut Paleti</span>
                            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-800 bg-zinc-950 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-zinc-400"
                            onClick={() => setIsCommandPaletteOpen(true)}
                        >
                            <LucideSearch className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <NotificationBell />
                        <SystemHealthIndicator />
                    </div>
                </header>

                {/* Dynamic Content Area */}
                {/* Dynamic Content Area */}
                <main className="flex-1 overflow-auto bg-black p-6 relative pb-20 lg:pb-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="h-full"
                        >
                            {activeTab === 'overview' && <AdminOverview />}
                            {activeTab === 'map' && (
                                <div className="h-full rounded-2xl overflow-hidden border border-zinc-800 relative">
                                    <div className="absolute top-4 left-4 z-[400] bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-zinc-700">
                                        <h3 className="text-white font-bold text-sm">Savaş Odası</h3>
                                        <p className="text-xs text-zinc-400">Canlı Ekosistem İzleme</p>
                                    </div>
                                    <LiveFleetMap />
                                </div>
                            )}
                            {activeTab === 'users' && <AdminUserManagement />}
                            {activeTab === 'finance' && <AdminFinance />}
                            {activeTab === 'messages' && <AdminMessages />}
                            {activeTab === 'broadcast' && <AdminBroadcast />}
                            {activeTab === 'audit' && <AdminAudit />}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            <AdminMobileBottomNav
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onMenuClick={() => setIsSidebarOpen(true)}
            />
        </div>
    );
}
