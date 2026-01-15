"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { LucideSearch, LucideUser, LucideTruck, LucideLayoutDashboard, LucideWallet, LucideFileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
            if (e.key === "Escape") {
                onOpenChange(false);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, onOpenChange]);

    const runCommand = (command: () => void) => {
        onOpenChange(false);
        command();
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh] p-4">
            <Command className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center border-b border-zinc-800 px-3" cmdk-input-wrapper="">
                    <LucideSearch className="w-5 h-5 text-zinc-500 mr-2" />
                    <Command.Input
                        placeholder="Komut yazın veya arama yapın..."
                        className="w-full bg-transparent p-4 text-white focus:outline-none placeholder:text-zinc-500"
                    />
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-py-2">
                    <Command.Empty className="p-4 text-center text-sm text-zinc-500">Sonuç bulunamadı.</Command.Empty>

                    <Command.Group heading="Sayfalar" className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">
                        <Command.Item
                            onSelect={() => runCommand(() => { })}
                            className="flex items-center gap-2 p-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white"
                        >
                            <LucideLayoutDashboard className="w-4 h-4" />
                            <span>Genel Bakış</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => { })}
                            className="flex items-center gap-2 p-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white"
                        >
                            <LucideWallet className="w-4 h-4" />
                            <span>Finansal Raporlar</span>
                        </Command.Item>
                    </Command.Group>

                    <div className="h-px bg-zinc-800 my-2 mx-2" />

                    <Command.Group heading="Kullanıcılar" className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">
                        <Command.Item className="flex items-center gap-2 p-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white">
                            <LucideUser className="w-4 h-4 text-blue-500" />
                            <span>Ahmet Yılmaz (Sürücü)</span>
                        </Command.Item>
                        <Command.Item className="flex items-center gap-2 p-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white">
                            <LucideUser className="w-4 h-4 text-orange-500" />
                            <span>Mega Lojistik (Firma)</span>
                        </Command.Item>
                    </Command.Group>

                    <div className="h-px bg-zinc-800 my-2 mx-2" />

                    <Command.Group heading="Araçlar" className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">
                        <Command.Item className="flex items-center gap-2 p-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white">
                            <LucideTruck className="w-4 h-4" />
                            <span>34 VR 1234 (Mercedes Actros)</span>
                        </Command.Item>
                        <Command.Item className="flex items-center gap-2 p-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white">
                            <LucideTruck className="w-4 h-4" />
                            <span>06 ANK 99 (Ford Cargo)</span>
                        </Command.Item>
                    </Command.Group>
                </Command.List>

                <div className="p-2 border-t border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-500 flex justify-end gap-2">
                    <span>SEÇMEK İÇİN <span className="font-bold text-zinc-400">ENTER</span></span>
                    <span>KAPATMAK İÇİN <span className="font-bold text-zinc-400">ESC</span></span>
                </div>
            </Command>
        </div>
    );
}
