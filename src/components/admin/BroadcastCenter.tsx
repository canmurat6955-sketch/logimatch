import { Button } from "@/components/ui/button";
import { LucideSend } from "lucide-react";

export default function AdminBroadcast() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Duyuru Merkezi</h1>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl max-w-2xl">
                <div className="mb-4">
                    <label className="block text-sm text-zinc-400 mb-2">Başlık</label>
                    <input type="text" className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm text-zinc-400 mb-2">Mesaj İçeriği</label>
                    <textarea rows={4} className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none"></textarea>
                </div>

                <div className="flex justify-end">
                    <Button className="bg-red-600 hover:bg-red-500 text-white">
                        <LucideSend className="w-4 h-4 mr-2" />
                        Tüm Kullanıcılara Gönder
                    </Button>
                </div>
            </div>
        </div>
    );
}
