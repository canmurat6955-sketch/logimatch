'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    translatedText?: string;
    sender: 'me' | 'other';
    timestamp: Date;
    lang: string;
}

export default function ChatWidget({
    otherName = "Dispeçer",
    myLang = "tr",
    otherLang = "en"
}: {
    otherName?: string;
    myLang?: string;
    otherLang?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [showOriginal, setShowOriginal] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi Ahmet, are you on schedule?",
            translatedText: "Selam Ahmet, programa uygun musun?",
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
            lang: 'en'
        }
    ]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const simulateTranslation = (text: string, targetLang: string) => {
        // Mock Translation Logic
        const dictionary: Record<string, string> = {
            "merhaba": "Hello",
            "evet": "Yes",
            "hayır": "No",
            "yoldayım": "I am on my way",
            "trafik var": "There is traffic",
            "lastik patladı": "Tire is flat",
            "tamam": "OK",
            "teşekkürler": "Thanks",
            "neredesin": "Where are you?",
            "gecikme": "Delay"
        };

        const lower = text.toLowerCase();
        for (const key in dictionary) {
            if (lower.includes(key)) return dictionary[key];
        }
        return `[Translated]: ${text}`; // Fallback
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const originalText = input;
        const msgId = Date.now().toString();

        // 1. Add my message
        const newMsg: Message = {
            id: msgId,
            text: originalText,
            sender: 'me',
            timestamp: new Date(),
            lang: myLang
        };
        setMessages(prev => [...prev, newMsg]);
        setInput('');

        // 2. Simulate reply
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const replyText = "Understood. Keep me updated.";
            const replyTranslated = "Anlaşıldı. Beni haberdar et.";

            const replyMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: replyText,
                translatedText: replyTranslated,
                sender: 'other',
                timestamp: new Date(),
                lang: otherLang
            };
            setMessages(prev => [...prev, replyMsg]);
        }, 2500);
    };

    return (
        <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="pointer-events-auto bg-slate-900 border border-slate-700 w-[320px] h-[450px] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
                    >
                        {/* Header */}
                        <div className="bg-slate-800 p-3 flex items-center justify-between border-b border-slate-700">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                        OP
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-white">{otherName}</h3>
                                    <div className="flex items-center gap-1 text-[10px] text-blue-400">
                                        <Globe className="w-3 h-3" />
                                        <span>Otomatik Çeviri Aktif</span>
                                    </div>
                                </div>
                            </div>
                            <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Translation Controls */}
                        <div className="bg-slate-950/50 p-1.5 flex justify-center border-b border-slate-800">
                            <button
                                onClick={() => setShowOriginal(!showOriginal)}
                                className="text-[10px] text-slate-400 flex items-center gap-1 hover:text-white transition-colors"
                            >
                                {showOriginal ? "Orijinal Dili Gösteriliyor" : "Türkçe Çeviri Gösteriliyor"}
                                <ChevronDown className="w-3 h-3" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/30">
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex flex-col max-w-[85%]", msg.sender === 'me' ? "ml-auto items-end" : "mr-auto items-start")}>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm relative group transition-all",
                                        msg.sender === 'me'
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-slate-800 text-slate-200 rounded-bl-none"
                                    )}>
                                        {/* Show Translated Text by default if available and not 'me', else show original */}
                                        <p>{(msg.sender === 'other' && !showOriginal && msg.translatedText) ? msg.translatedText : msg.text}</p>

                                        {/* Language Indicator */}
                                        <span className="absolute -bottom-4 text-[9px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {showOriginal ? msg.lang.toUpperCase() : 'TR'} • {msg.timestamp.getHours()}:{msg.timestamp.getMinutes().toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                    {msg.sender === 'other' && !showOriginal && msg.translatedText && (
                                        <span className="text-[9px] text-slate-600 mt-1 ml-1 flex items-center gap-0.5">
                                            <Globe className="w-2.5 h-2.5" /> Çevrildi
                                        </span>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none w-12 flex items-center justify-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-slate-900 border-t border-slate-700 flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Mesaj yaz..."
                                className="bg-slate-950 border-slate-700 text-white h-10 text-sm focus-visible:ring-blue-600"
                            />
                            <Button size="icon" className="h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white shrink-0" onClick={handleSend}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="lg"
                className="pointer-events-auto h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-900/30 flex items-center justify-center relative z-50 transition-transform hover:scale-105"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-slate-950"></span>
                )}
            </Button>
        </div>
    );
}
