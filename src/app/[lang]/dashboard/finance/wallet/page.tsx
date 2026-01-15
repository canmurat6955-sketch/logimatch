"use client";

import { useState } from "react";
import { LucideWallet, LucideArrowUpRight, LucideArrowDownLeft, LucideDownload, LucideCreditCard, LucideHistory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import PaymentModal from "@/components/dashboard/finance/wallet/PaymentModal";

export default function WalletPage() {
    const [balance, setBalance] = useState(12450.00);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handlePaymentSuccess = (amount: number) => {
        setBalance(prev => prev + amount);
    };

    const transactions = [
        { id: 1, type: "payment", description: "Navlun Ödemesi - Yük #TR-8821", amount: -4500, date: "12 Ocak 2026", status: "completed" },
        { id: 2, type: "deposit", description: "Kredi Kartı ile Yükleme", amount: 10000, date: "10 Ocak 2026", status: "completed" },
        { id: 3, type: "invoice", description: "Hizmet Bedeli - Aralık 2025", amount: -250.00, date: "01 Ocak 2026", status: "completed" },
        { id: 4, type: "Refund", description: "İptal İadesi - Yük #TR-8800", amount: 2200, date: "28 Ara 2025", status: "processing" },
    ];

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Finansal Cüzdanım</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-blue-900/40 to-black border-blue-500/20 p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <LucideWallet className="w-32 h-32 text-blue-500 transform -rotate-12" />
                    </div>

                    <div className="relative z-10">
                        <p className="text-blue-300 font-medium mb-1">Toplam Bakiye</p>
                        <h2 className="text-5xl font-bold text-white tracking-tight mb-6">
                            ₺{balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </h2>

                        <div className="flex gap-4">
                            <Button
                                onClick={() => setIsPaymentModalOpen(true)}
                                className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                            >
                                <LucideArrowUpRight className="w-4 h-4 mr-2" />
                                Bakiye Yükle
                            </Button>
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                <LucideDownload className="w-4 h-4 mr-2" />
                                Ekstre İndir
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Quick Stats or Actions */}
                <Card className="bg-zinc-900/50 border-zinc-800 p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-zinc-400 font-medium mb-4 flex items-center gap-2">
                            <LucideCreditCard className="w-4 h-4" />
                            Kayıtlı Kartlar
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                                <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-red-500/80 -mr-2"></div>
                                    <div className="w-4 h-4 rounded-full bg-orange-500/80"></div>
                                </div>
                                <span className="text-sm text-zinc-300 font-mono">**** 4242</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => setIsPaymentModalOpen(true)}
                        variant="ghost"
                        className="w-full mt-4 text-zinc-400 hover:text-white border border-dashed border-zinc-700 hover:border-zinc-500"
                    >
                        + Yeni Kart Ekle
                    </Button>
                </Card>
            </div>

            {/* Transaction History */}
            <Card className="bg-zinc-900 border-zinc-800">
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <LucideHistory className="w-5 h-5 text-zinc-500" />
                        Son İşlemler
                    </h3>
                    <Button variant="ghost" size="sm" className="text-zinc-500">Tümünü Gör</Button>
                </div>
                <div className="divide-y divide-zinc-800/50">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                    {tx.amount > 0 ? <LucideArrowDownLeft className="w-5 h-5" /> : <LucideArrowUpRight className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">{tx.description}</p>
                                    <p className="text-zinc-500 text-xs">{tx.date} • {tx.type}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${tx.amount > 0 ? 'text-emerald-500' : 'text-zinc-300'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('tr-TR')} ₺
                                </p>
                                <Badge variant="outline" className={`text-[10px] h-5 ${tx.status === 'completed' ? 'border-emerald-500/30 text-emerald-500' : 'border-yellow-500/30 text-yellow-500'
                                    }`}>
                                    {tx.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSuccess={handlePaymentSuccess}
            />
        </div>
    );
}
