"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle, Upload, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface IssueReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    loadId: string;
}

export default function IssueReportModal({ isOpen, onClose, loadId }: IssueReportModalProps) {
    const [issueType, setIssueType] = useState<string>('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!issueType) {
            toast.error("Lütfen bir sorun tipi seçin.");
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("Sorun bildirimi başarıyla oluşturuldu. Operasyon ekibi bilgilendirildi.");
        setIsSubmitting(false);
        onClose();
        setIssueType('');
        setDescription('');
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[500]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-[501] overflow-hidden"
                    >
                        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                                Sorun Bildir
                            </h3>
                            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-zinc-500 hover:text-white">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-xs text-zinc-400 block mb-2 font-medium">SORUN TİPİ</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Gecikme', 'Hasar', 'Kaza', 'Belge Eksik', 'Diğer'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setIssueType(type)}
                                            className={`p-2 text-sm rounded-lg border transition-all ${issueType === type
                                                    ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                                                    : 'bg-zinc-800/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-zinc-400 block mb-2 font-medium">AÇIKLAMA</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Sorunu detaylı açıklayınız..."
                                    className="w-full h-24 bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-zinc-700 resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-zinc-400 block mb-2 font-medium">KANIT YÜKLE</label>
                                <div className="border border-dashed border-zinc-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-zinc-500 hover:bg-zinc-800/20 cursor-pointer transition-colors">
                                    <div className="flex gap-2">
                                        <Camera className="w-5 h-5" />
                                        <Upload className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs">Fotoğraf Çek veya Yükle</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 flex justify-end gap-2">
                            <Button variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white">
                                İptal
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="bg-red-600 hover:bg-red-500 text-white"
                            >
                                {isSubmitting ? 'Gönderiliyor...' : 'Bildirimi Gönder'}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
