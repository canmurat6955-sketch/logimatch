import { useState } from "react";
import { LucideSearch, LucideSend, LucideMoreVertical, LucidePhone, LucideVideo, LucideArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const conversations = [
    {
        id: 1,
        user: "Ahmet Yılmaz",
        role: "Sürücü",
        avatar: "AY",
        status: "online",
        lastMessage: "Yükü teslim ettim, onayı bekliyorum.",
        time: "10:42",
        unread: 2
    },
    {
        id: 2,
        user: "Mega Lojistik",
        role: "Firma",
        avatar: "ML",
        status: "offline",
        lastMessage: "Fatura detaylarını gönderdik.",
        time: "Dün",
        unread: 0
    },
    {
        id: 3,
        user: "Mehmet Demir",
        role: "Yük Sahibi",
        avatar: "MD",
        status: "online",
        lastMessage: "İstanbul - Ankara arası araç lazım.",
        time: "Pzt",
        unread: 0
    },
];

const mockChatHistory = [
    { id: 1, sender: "other", text: "Merhaba, kolay gelsin.", time: "10:30" },
    { id: 2, sender: "me", text: "Merhaba Ahmet Bey, buyurun?", time: "10:31" },
    { id: 3, sender: "other", text: "Yükü teslim ettim, onayı bekliyorum. Sistemden fotoğraf yükleyemedim.", time: "10:35" },
    { id: 4, sender: "me", text: "Kontrol ediyorum hemen. Konumunuz depoda görünüyor.", time: "10:36" },
];

export default function AdminMessages() {
    const [activeChat, setActiveChat] = useState(1);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState(mockChatHistory);
    const [showMobileChat, setShowMobileChat] = useState(false);

    const handleSend = () => {
        if (!messageInput.trim()) return;
        setMessages([...messages, {
            id: messages.length + 1,
            sender: "me",
            text: messageInput,
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        }]);
        setMessageInput("");
    };

    const handleChatSelect = (id: number) => {
        setActiveChat(id);
        setShowMobileChat(true);
    };

    const activeUser = conversations.find(c => c.id === activeChat);

    return (
        <div className="flex h-[calc(100vh-140px)] bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden relative">
            {/* Sidebar / Conversation List */}
            <div className={`w-full md:w-80 border-r border-zinc-800 flex-col bg-zinc-900 absolute inset-0 z-10 md:static md:flex ${showMobileChat ? 'hidden' : 'flex'}`}>
                <div className="p-4 border-b border-zinc-800">
                    <div className="relative">
                        <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Görüşme ara..."
                            className="w-full bg-black border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none placeholder:text-zinc-600"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {conversations.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => handleChatSelect(chat.id)}
                            className={`p-4 flex items-start gap-3 cursor-pointer hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50 ${activeChat === chat.id ? 'bg-zinc-800/80 border-l-2 border-l-blue-500' : ''}`}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-zinc-300 font-bold text-sm">
                                    {chat.avatar}
                                </div>
                                {chat.status === 'online' && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-semibold text-white truncate">{chat.user}</h4>
                                    <span className="text-[10px] text-zinc-500">{chat.time}</span>
                                </div>
                                <p className="text-xs text-zinc-400 truncate mt-0.5">{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="min-w-[18px] h-[18px] bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold ml-2">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex-col bg-black/50 w-full md:w-auto absolute inset-0 z-20 md:static md:flex ${showMobileChat ? 'flex' : 'hidden'}`}>
                {/* Header */}
                <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 bg-zinc-900/50 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden -ml-2 text-zinc-400 hover:text-white"
                            onClick={() => setShowMobileChat(false)}
                        >
                            <LucideArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="w-9 h-9 bg-zinc-700 rounded-full flex items-center justify-center text-zinc-300 font-bold text-sm">
                            {activeUser?.avatar}
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">{activeUser?.user}</h3>
                            <div className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${activeUser?.status === 'online' ? 'bg-green-500' : 'bg-zinc-500'}`}></div>
                                <span className="text-xs text-zinc-400 capitalize">{activeUser?.status}</span>
                                <span className="text-xs text-zinc-600 hidden md:inline">• {activeUser?.role}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <LucidePhone className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <LucideVideo className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <LucideMoreVertical className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${msg.sender === 'me'
                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                : 'bg-zinc-800 text-zinc-200 rounded-tl-sm'
                                }`}>
                                <p className="text-sm">{msg.text}</p>
                                <div className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-blue-200' : 'text-zinc-500'}`}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-3 md:p-4 border-t border-zinc-800 bg-zinc-900/30">
                    <div className="flex items-center gap-2 md:gap-3">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Bir mesaj yazın..."
                            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none placeholder:text-zinc-500"
                        />
                        <Button onClick={handleSend} className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-blue-600 hover:bg-blue-500 flex items-center justify-center p-0 shrink-0">
                            <LucideSend className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
