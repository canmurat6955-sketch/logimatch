'use client';

import { useEffect, useState, useRef } from "react";
import { Command } from "cmdk";
import {
    Search,
    User,
    Truck,
    LayoutDashboard,
    Wallet,
    Home,
    Settings,
    LogOut,
    Map,
    Mic
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Add specific types for Web Speech API
interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

export default function GlobalCommandPalette({ lang }: { lang: string }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [isListening, setIsListening] = useState(false);
    const router = useRouter();
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const { webkitSpeechRecognition, SpeechRecognition } = window as unknown as IWindow;
            const SpeechRecognitionConstructor = SpeechRecognition || webkitSpeechRecognition;

            if (SpeechRecognitionConstructor) {
                const recognition = new SpeechRecognitionConstructor();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = lang === 'tr' ? 'tr-TR' : 'en-US';

                recognition.onstart = () => {
                    setIsListening(true);
                };

                recognition.onend = () => {
                    setIsListening(false);
                };

                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    setSearch(transcript);
                    // Quick Action Logic
                    if (transcript.toLowerCase().includes('dashboard') || transcript.toLowerCase().includes('panel')) {
                        router.push(`/${lang}/dashboard`);
                        setOpen(false);
                    }
                };

                recognitionRef.current = recognition;
            }
        }
    }, [lang, router]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setSearch("");
            recognitionRef.current?.start();
        }
    };

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-start justify-center pt-[15vh] p-4 animation-in fade-in duration-200">
            <Command
                className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                shouldFilter={false} // Disable internal filtering to allow manual search state control if needed, but for now we keep standard behavior + external control
            >
                <div className="flex items-center border-b border-slate-800 px-4" cmdk-input-wrapper="">
                    <Search className="w-5 h-5 text-slate-500 mr-3" />
                    <Command.Input
                        value={search}
                        onValueChange={setSearch}
                        placeholder={isListening ? "Dinliyorum..." : "Ne yapmak istiyorsunuz? (Sayfa git, yük ara...)"}
                        className={cn(
                            "w-full bg-transparent p-4 text-white focus:outline-none placeholder:text-slate-500 text-lg transition-all",
                            isListening && "placeholder:text-blue-400 placeholder:animate-pulse"
                        )}
                    />
                    <button
                        onClick={toggleListening}
                        className={cn(
                            "p-2 rounded-full transition-all mr-2",
                            isListening ? "bg-red-500/20 text-red-500 animate-pulse" : "hover:bg-slate-800 text-slate-400"
                        )}
                        title="Sesli Komut (Beta)"
                    >
                        <Mic className="w-5 h-5" />
                    </button>
                    <div className="text-xs font-mono text-slate-600 border border-slate-800 rounded px-1.5 py-0.5">ESC</div>
                </div>

                <Command.List className="max-h-[400px] overflow-y-auto p-2 scroll-py-2">
                    <Command.Empty className="p-8 text-center text-sm text-slate-500">
                        {isListening ? "Sesiniz algılanıyor..." : "Sonuç bulunamadı."}
                    </Command.Empty>

                    <Command.Group heading="Hızlı Erişim" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2 mt-2">
                        <Command.Item
                            onSelect={() => runCommand(() => router.push(`/${lang}/dashboard`))}
                            className="flex items-center gap-3 p-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-all aria-selected:bg-blue-600 aria-selected:text-white"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                            <span className="ml-auto text-xs text-slate-500 aria-selected:text-blue-200">G D</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push(`/`))}
                            className="flex items-center gap-3 p-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-all aria-selected:bg-blue-600 aria-selected:text-white"
                        >
                            <Home className="w-4 h-4" />
                            <span>Ana Sayfa</span>
                            <span className="ml-auto text-xs text-slate-500 aria-selected:text-blue-200">G H</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => { })}
                            className="flex items-center gap-3 p-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-all aria-selected:bg-blue-600 aria-selected:text-white"
                        >
                            <Map className="w-4 h-4" />
                            <span>Harita Görünümü</span>
                        </Command.Item>
                    </Command.Group>

                    <div className="h-px bg-slate-800 my-2 mx-2" />

                    <Command.Group heading="Finans & Yönetim" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
                        <Command.Item
                            onSelect={() => runCommand(() => { })}
                            className="flex items-center gap-3 p-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-all aria-selected:bg-blue-600 aria-selected:text-white"
                        >
                            <Wallet className="w-4 h-4" />
                            <span>Faturalar ve Ödemeler</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => { })}
                            className="flex items-center gap-3 p-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-all aria-selected:bg-blue-600 aria-selected:text-white"
                        >
                            <Settings className="w-4 h-4" />
                            <span>Ayarlar</span>
                        </Command.Item>
                    </Command.Group>

                    <div className="h-px bg-slate-800 my-2 mx-2" />

                    <Command.Group heading="Simülasyon Araçları" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
                        <Command.Item
                            onSelect={() => runCommand(() => router.push(`/${lang}/driver/login`))}
                            className="flex items-center gap-3 p-3 rounded-lg text-sm text-yellow-500 hover:bg-slate-800 hover:text-yellow-400 cursor-pointer transition-all aria-selected:bg-blue-600 aria-selected:text-white"
                        >
                            <Truck className="w-4 h-4" />
                            <span>Sürücü Modu: Giriş Ekranı</span>
                        </Command.Item>
                    </Command.Group>

                    <div className="h-px bg-slate-800 my-2 mx-2" />

                    <Command.Group heading="Son Aramalar" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
                        <Command.Item className="flex items-center gap-3 p-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-all aria-selected:bg-blue-600 aria-selected:text-white">
                            <Truck className="w-4 h-4 text-emerald-500" />
                            <span>34 VR 1234 (Ankara - İstanbul)</span>
                        </Command.Item>
                        <Command.Item className="flex items-center gap-3 p-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-all aria-selected:bg-blue-600 aria-selected:text-white">
                            <User className="w-4 h-4 text-blue-500" />
                            <span>Ahmet Yılmaz (Sürücü)</span>
                        </Command.Item>
                    </Command.Group>

                    <div className="h-px bg-slate-800 my-2 mx-2" />

                    <Command.Item
                        onSelect={() => runCommand(() => { })}
                        className="flex items-center gap-3 p-3 rounded-lg text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 cursor-pointer transition-all aria-selected:bg-red-900/40 aria-selected:text-red-200"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Çıkış Yap</span>
                    </Command.Item>

                </Command.List>

                <div className="p-3 border-t border-slate-800 bg-slate-950/50 text-[10px] text-slate-500 flex justify-between items-center">
                    <div className="flex gap-4">
                        <span><strong className="text-slate-400">↑↓</strong> gezin</span>
                        <span><strong className="text-slate-400">↵</strong> seç</span>
                    </div>
                    <span>Haulink OS v1.2 • <span className="text-blue-400">Voice AI Active</span></span>
                </div>
            </Command>
        </div>
    );
}
