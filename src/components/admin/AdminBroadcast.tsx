"use client";

import { useState } from "react";
import { LucideMegaphone, LucideSend } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendBroadcast } from "@/lib/actions/integrity";

export default function AdminBroadcast() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!title || !message) return;
        setSending(true);
        try {
            await sendBroadcast(title, message);
            setTitle("");
            setMessage("");
            alert("Duyuru başarıyla gönderildi!");
        } catch (error) {
            alert("Gönderim başarısız.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <LucideMegaphone className="text-yellow-500" />
                Duyuru Merkezi
            </h1>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Başlık</label>
                    <input
                        className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-yellow-500 outline-none"
                        placeholder="Örn: Hafta Sonu Bakım Çalışması"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Mesaj İçeriği</label>
                    <textarea
                        className="w-full h-32 bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-yellow-500 outline-none resize-none"
                        placeholder="Duyuru detaylarını buraya yazın..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className="pt-2">
                    <Button
                        onClick={handleSend}
                        disabled={sending}
                        className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-6"
                    >
                        {sending ? "Gönderiliyor..." : (
                            <><LucideSend className="w-5 h-5 mr-2" /> Tüm Kullanıcılara Gönder</>
                        )}
                    </Button>
                    <p className="text-xs text-zinc-500 text-center mt-3">
                        Bu işlem kayıtlı 1,240 sürücü ve firmaya anlık bildirim gönderecektir.
                    </p>
                </div>
            </div>
        </div>
    );
}
