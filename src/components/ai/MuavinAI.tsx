"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, MessageSquare, Wallet, Truck, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function MuavinAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Selam Kaptan! 🚚 Teker dönsün, para gelsin. Bugün ne yapıyoruz?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        // Add User Message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // Simulate AI Thinking
        setTimeout(() => {
            const botResponse = generateResponse(text);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            }]);
        }, 1000);
    };

    const generateResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes("para") || lowerInput.includes("bakiye") || lowerInput.includes("durum")) {
            return "Kasa fena değil ama daha çok çalışmamız lazım Patron! 💸 Şu anki bakiyeyle Mars'a gidemeyiz ama Edirne'ye varırız. Bakiye yükleyelim mi?";
        }
        if (lowerInput.includes("yük") || lowerInput.includes("iş")) {
            return "Piyasada işler kesat değil, sen merak etme. 🚛 Senin için en ballı yükleri filtreliyorum. Hamburg tarafına bi sefer atsak mı?";
        }
        if (lowerInput.includes("selam") || lowerInput.includes("merhaba")) {
            return "Aleyküm selam Kaptan! Çaylar şirketten, yola devam. ☕";
        }
        if (lowerInput.includes("şaka") || lowerInput.includes("komik")) {
            return "Tırcı girmiş bara, demiş ki 'Bana bir çay, kupası büyük olsun'. Barmen demiş 'Dorse takayım mı arkasına?' 😂 Tamam tamam, işimize dönelim.";
        }
        if (lowerInput.includes("borç") || lowerInput.includes("kredi")) {
            return "Aman Kaptan, borç yiğidin kamçısıdır derler ama biz yine de nakit çalışalım. Faizler can yakıyor bu ara! 🔥";
        }

        return "Valla kaptan, motor beynim bunu tam anlamadı ama kulağa hoş geliyor! 🤖 Sen 'Para' de, 'Yük' de ben anlarım.";
    };

    const quickActions = [
        { label: "Finans Durumu", icon: Wallet, query: "Finansal durumum ne?" },
        { label: "Yük Bul", icon: Truck, query: "Bana yük bul" },
        { label: "Canım Sıkıldı", icon: Radio, query: "Bana bir şaka yap" },
    ];

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-[9990] w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-900/40 flex items-center justify-center text-white border-2 border-blue-400/50"
                >
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900 animate-pulse" />
                    <Bot className="w-8 h-8" />
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-[9991] w-[350px] md:w-[400px] h-[500px] bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                                    <Bot className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        Muavin AI
                                        <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono border border-blue-500/20">BETA</span>
                                    </h3>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Çevrimiçi
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white hover:bg-zinc-800">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                                        msg.sender === 'user'
                                            ? "bg-zinc-800 border-zinc-700 text-zinc-300"
                                            : "bg-blue-600/20 border-blue-500/30 text-blue-400"
                                    )}>
                                        {msg.sender === 'user' ? <MessageSquare className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed",
                                        msg.sender === 'user'
                                            ? "bg-zinc-800 text-white rounded-tr-none"
                                            : "bg-blue-900/10 border border-blue-500/10 text-zinc-200 rounded-tl-none"
                                    )}>
                                        {msg.text}
                                        <span className="text-[10px] opacity-40 block mt-1 text-right">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions (if no input yet) */}
                        {messages.length < 3 && (
                            <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                                {quickActions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSendMessage(action.query)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all text-xs text-zinc-400 hover:text-blue-300 whitespace-nowrap shrink-0"
                                    >
                                        <action.icon className="w-3 h-3" />
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage(inputValue);
                                }}
                                className="flex gap-2"
                            >
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Bir şeyler yaz kaptan..."
                                    className="bg-zinc-900 border-zinc-800 focus:border-blue-500/50"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
