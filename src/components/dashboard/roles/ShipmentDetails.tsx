import { MockLoad } from "@/lib/services/transport";
import { X, User, Phone, Star, Package, Thermometer, FileText, CheckCircle, Clock, Truck, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShipmentDetailsProps {
    load: MockLoad | null;
    onClose: () => void;
}

import IssueReportModal from "@/components/dashboard/shared/IssueReportModal";
import { useState } from "react";
import { toast } from "sonner";
import { Share2, AlertTriangle } from "lucide-react";

export default function ShipmentDetails({ load, onClose }: ShipmentDetailsProps) {
    const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

    if (!load) return null;

    const handleShare = () => {
        const shareText = `🚚 *Logimatch Yük Takibi*\n\n📄 Yük: ${load.id}\n📍 Rota: ${load.origin} ➔ ${load.destination}\n⏰ Tahmini Varış: ${load.eta}\n\nCanlı Takip Linki: https://logimatch.com/track/${load.id.replace('#', '')}`;

        if (navigator.share) {
            navigator.share({
                title: `Logimatch Yük Takibi - ${load.id}`,
                text: shareText,
                url: `https://logimatch.com/track/${load.id.replace('#', '')}`
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(shareText);
            toast.success("Takip bilgileri kopyalandı!");
        }
    };

    return (
        <>
            <div className={cn(
                "absolute top-0 right-0 h-full w-full md:w-[400px] bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl transition-transform duration-300 z-20 flex flex-col",
                load ? "translate-x-0" : "translate-x-full"
            )}>
                {/* Header */}
                <div className="p-5 border-b border-white/10 flex justify-between items-start bg-slate-900">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-blue-400 font-mono text-xs bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                                {load.id}
                            </span>
                            {load.status === 'in_transit' && (
                                <span className="text-[10px] text-emerald-400 font-bold animate-pulse">CANLI</span>
                            )}
                        </div>
                        <h3 className="text-white font-bold text-lg">Sevkiyat Detayı</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            <span>{load.origin}</span>
                            <span className="text-slate-600">➔</span>
                            <span className="text-white">{load.destination}</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">

                    {/* ETA Card */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs text-slate-400 font-medium">TAHMİNİ VARIŞ</span>
                            <span className="text-xs text-emerald-400 font-mono">Zamanında</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-white">{load.eta.split(' ')[0]}</span>
                            <span className="text-sm text-slate-400 mb-1.5">{load.eta.split(' ').slice(1).join(' ')} kaldı</span>
                        </div>
                        <div className="mt-3 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[65%] rounded-full"></div>
                        </div>
                    </div>

                    {/* Driver Info */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Sürücü & Araç</h4>
                        <div className="bg-slate-800/30 rounded-xl p-3 border border-white/5 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-white/10 shrink-0">
                                <User className="w-5 h-5 text-slate-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h5 className="text-sm font-bold text-white truncate">{load.driver?.name}</h5>
                                        <div className="flex items-center gap-1 text-amber-400 text-xs mt-0.5">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span>{load.driver?.rating}</span>
                                            <span className="text-slate-500 ml-1">({load.driver?.tripsCompleted} sefer)</span>
                                        </div>
                                    </div>
                                    <Button size="icon" variant="outline" className="h-7 w-7 border-white/10 hover:bg-blue-500 hover:border-transparent hover:text-white transition-colors">
                                        <Phone className="w-3 h-3" />
                                    </Button>
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-slate-500 block">Plaka</span>
                                        <span className="text-slate-300 font-mono">{load.vehicle}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block">Dorse</span>
                                        <span className="text-slate-300 font-mono">34 TR 999</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cargo Details */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Yük Bilgileri</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-800/30 rounded-lg p-3 border border-white/5">
                                <Package className="w-4 h-4 text-blue-400 mb-2" />
                                <div className="text-[10px] text-slate-500">Yük Tipi</div>
                                <div className="text-xs font-medium text-white">{load.cargo?.description}</div>
                            </div>
                            <div className="bg-slate-800/30 rounded-lg p-3 border border-white/5">
                                <ScaleIcon className="w-4 h-4 text-purple-400 mb-2" />
                                <div className="text-[10px] text-slate-500">Ağırlık</div>
                                <div className="text-xs font-medium text-white">{load.cargo?.weight}</div>
                            </div>
                            <div className="bg-slate-800/30 rounded-lg p-3 border border-white/5">
                                <LayoutGridIcon className="w-4 h-4 text-orange-400 mb-2" />
                                <div className="text-[10px] text-slate-500">Hacim</div>
                                <div className="text-xs font-medium text-white">{load.cargo?.pallets} Palet</div>
                            </div>
                            <div className="bg-slate-800/30 rounded-lg p-3 border border-white/5">
                                <Thermometer className="w-4 h-4 text-red-400 mb-2" />
                                <div className="text-[10px] text-slate-500">Isı Kontrolü</div>
                                <div className="text-xs font-medium text-white">{load.cargo?.temperature || 'Standart'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Evraklar & Durum</h4>
                        <div className="space-y-2">
                            <DocumentRow
                                label="e-CMR (Taşıma İrsaliyesi)"
                                active={load.documents?.cmr}
                                date="10 Haz 09:30"
                            />
                            <DocumentRow
                                label="Gümrük Beyannamesi"
                                active={load.documents?.customs}
                                date="10 Haz 14:15"
                            />
                            <DocumentRow
                                label="e-POD (Teslim Tutanağı)"
                                active={load.documents?.pod}
                                date="-"
                                status="waiting"
                            />
                        </div>
                    </div>

                    {/* Map Overlay Info (Only useful if map is behind, but good for context) */}
                    <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 flex gap-3 items-start">
                        <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                        <div className="text-xs">
                            <p className="text-blue-100 font-medium mb-0.5">Güvenli Taşıma Aktif</p>
                            <p className="text-blue-300/60 leading-relaxed">
                                Bu sevkiyat Haulink Sigorta Garantisi altındadır. Konum ve sensör verileri 2 dakikada bir güncellenmektedir.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-white/10 bg-slate-900 grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setIsIssueModalOpen(true)}
                        className="border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 text-white gap-2 transition-all"
                    >
                        <AlertTriangle className="w-4 h-4" />
                        Sorun Bildir
                    </Button>
                    <Button
                        onClick={handleShare}
                        className="bg-blue-600 hover:bg-blue-500 text-white gap-2"
                    >
                        <Share2 className="w-4 h-4" />
                        Paylaş
                    </Button>
                </div>
            </div>

            <IssueReportModal
                isOpen={isIssueModalOpen}
                onClose={() => setIsIssueModalOpen(false)}
                loadId={load.id}
            />
        </>
    );
}

function DocumentRow({ label, active, date, status = 'done' }: { label: string, active: boolean, date: string, status?: 'done' | 'waiting' }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-white/5">
            <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border",
                    active ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-slate-800 border-white/5 text-slate-500"
                )}>
                    {active ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div>
                    <div className={cn("text-xs font-medium", active ? "text-white" : "text-slate-500")}>{label}</div>
                    <div className="text-[10px] text-slate-500">{active ? 'Onaylandı' : 'Bekleniyor'}</div>
                </div>
            </div>
            <div className="text-[10px] text-slate-600 font-mono">{date}</div>
        </div>
    );
}

// Additional Icons requiring import or fallback
function ScaleIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M2 16a5 5 0 0 1 5-5c1.48 0 2.87.55 4 1.54C12.13 11.55 13.52 11 15 11a5 5 0 0 1 5 5" /><path d="M12 2v9" /><path d="m19 6-7-4-7 4" /></svg>
    )
}

function LayoutGridIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
    )
}
