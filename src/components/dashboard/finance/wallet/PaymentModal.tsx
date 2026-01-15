"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, CreditCard, Lock, CheckCircle, Loader2, Plus, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (amount: number) => void;
}

export default function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
    const [amount, setAmount] = useState<number>(5000);
    const [isProcessing, setIsProcessing] = useState(false);
    const [saveCard, setSaveCard] = useState(true);
    const [selectedCardId, setSelectedCardId] = useState<string>('card-1');

    // Simulate saved cards
    const [savedCards, setSavedCards] = useState([
        { id: 'card-1', brand: 'MasterCard', last4: '4242', expiry: '12/28', isDefault: true },
        { id: 'card-2', brand: 'Visa', last4: '8899', expiry: '05/27', isDefault: false },
    ]);

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        toast.success("Ödeme başarıyla alındı! Bakiye güncellendi.");
        onSuccess(amount);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[500]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-[501] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                            <div>
                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                    <Wallet className="w-5 h-5 text-blue-500" />
                                    Bakiye Yükle
                                </h3>
                                <p className="text-xs text-zinc-400">Güvenli Ödeme Altyapısı</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-zinc-500 hover:text-white">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Amount Selection */}
                            <div>
                                <label className="text-xs text-zinc-400 font-medium mb-3 block">YÜKLENECEK TUTAR</label>
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    {[1000, 5000, 10000].map((val) => (
                                        <button
                                            key={val}
                                            onClick={() => setAmount(val)}
                                            className={cn(
                                                "py-3 rounded-xl border font-bold transition-all",
                                                amount === val
                                                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20"
                                                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800"
                                            )}
                                        >
                                            ₺{val.toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₺</span>
                                    <Input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="pl-8 bg-zinc-900 border-zinc-800 text-white font-mono"
                                    />
                                </div>
                            </div>

                            {/* Payment Tabs */}
                            <Tabs defaultValue="saved" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-zinc-900 mb-4">
                                    <TabsTrigger value="saved">Kayıtlı Kartlarım</TabsTrigger>
                                    <TabsTrigger value="new">Yeni Kart</TabsTrigger>
                                </TabsList>

                                {/* Saved Cards Tab */}
                                <TabsContent value="saved" className="space-y-3">
                                    {savedCards.map((card) => (
                                        <div
                                            key={card.id}
                                            onClick={() => setSelectedCardId(card.id)}
                                            className={cn(
                                                "p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                                                selectedCardId === card.id
                                                    ? "bg-blue-900/20 border-blue-500/50 ring-1 ring-blue-500/50"
                                                    : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center border border-zinc-700">
                                                    {/* Simple Icon based on brand */}
                                                    <div className="flex -space-x-1">
                                                        <div className={`w-3 h-3 rounded-full ${card.brand === 'MasterCard' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                                                        <div className={`w-3 h-3 rounded-full ${card.brand === 'MasterCard' ? 'bg-red-500' : 'bg-yellow-500'} opacity-80`}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white">•••• •••• •••• {card.last4}</p>
                                                    <p className="text-[10px] text-zinc-500">Son Kullanma: {card.expiry}</p>
                                                </div>
                                            </div>
                                            {selectedCardId === card.id && (
                                                <CheckCircle className="w-5 h-5 text-blue-500" />
                                            )}
                                        </div>
                                    ))}
                                    <Button variant="outline" className="w-full border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-900">
                                        <Plus className="w-4 h-4 mr-2" /> Başka Kart Ekle
                                    </Button>
                                </TabsContent>

                                {/* New Card Tab */}
                                <TabsContent value="new" className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500">Kart Üzerindeki İsim</label>
                                        <Input placeholder="Ad Soyad" className="bg-zinc-900 border-zinc-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500">Kart Numarası</label>
                                        <div className="relative">
                                            <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                                            <Input placeholder="0000 0000 0000 0000" className="pl-9 bg-zinc-900 border-zinc-800 font-mono" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs text-zinc-500">Son Kullanma Tarihi</label>
                                            <Input placeholder="AA/YY" className="bg-zinc-900 border-zinc-800 text-center" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-zinc-500">CVV / CVC</label>
                                            <div className="relative">
                                                <Lock className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                                                <Input placeholder="123" maxLength={3} className="pl-8 bg-zinc-900 border-zinc-800 text-center" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-2">
                                        <div
                                            className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer ${saveCard ? 'bg-blue-600 border-blue-600' : 'border-zinc-600'}`}
                                            onClick={() => setSaveCard(!saveCard)}
                                        >
                                            {saveCard && <CheckCircle className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="text-xs text-zinc-400 cursor-pointer" onClick={() => setSaveCard(!saveCard)}>
                                            Bu kartı sonraki ödemelerim için kaydet (Tokenization)
                                        </span>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex flex-col gap-3">
                            <div className="flex justify-between items-center text-xs text-zinc-500 px-1">
                                <span>Toplam Ödenecek:</span>
                                <span className="text-lg font-bold text-white">₺{amount.toLocaleString()}</span>
                            </div>
                            <Button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-900/20"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        İşleniyor...
                                    </>
                                ) : (
                                    'Ödemeyi Onayla'
                                )}
                            </Button>
                            <p className="text-[10px] text-center text-zinc-600 flex items-center justify-center gap-1">
                                <Lock className="w-3 h-3" />
                                256-bit SSL ile güvenli ödeme. Kart bilgileriniz saklanmaz.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
