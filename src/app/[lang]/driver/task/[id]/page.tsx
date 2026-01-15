'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Navigation,
    Box,
    MapPin,
    Phone,
    AlertTriangle,
    CheckCircle2,
    Camera,
    Clock,
    User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatWidget from '@/components/chat/ChatWidget';
import SignaturePad from '@/components/ui/signature-pad';

export default function DriverTaskPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const [status, setStatus] = useState<'assigned' | 'enroute' | 'arrived' | 'delivered'>('assigned');
    const [showCamera, setShowCamera] = useState(false);
    const [showSignature, setShowSignature] = useState(false);
    const [signatureData, setSignatureData] = useState<string | null>(null);

    // Mock Data
    const task = {
        id: 'TR-34-VR-1234',
        origin: 'Gebze Lojistik Merkezi, Kocaeli',
        destination: 'MediaMarkt Depo, München, DE',
        load: 'Elektronik Parça (Paletli)',
        deadline: '16 Oca 14:00',
        contact: '+49 151 12345678',
        price: '2.450€'
    };

    const handleMainAction = () => {
        if (status === 'assigned') setStatus('enroute');
        else if (status === 'enroute') setStatus('arrived');
        else if (status === 'arrived') setShowCamera(true);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-24">
            {/* Header */}
            <div className="bg-slate-900 border-b border-white/5 p-4 sticky top-0 z-30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">AH</div>
                    <div>
                        <h2 className="font-bold text-sm leading-none">Ahmet Yılmaz</h2>
                        <span className="text-xs text-slate-400">34 VR 1234</span>
                    </div>
                </div>
                <Badge variant="outline" className={cn(
                    "border-0 px-3 py-1",
                    status === 'assigned' ? 'bg-blue-500/20 text-blue-400' :
                        status === 'enroute' ? 'bg-amber-500/20 text-amber-400 animate-pulse' :
                            'bg-green-500/20 text-green-400'
                )}>
                    {status === 'assigned' ? 'Yük Bekleniyor' :
                        status === 'enroute' ? 'Yolda (Sürüş)' :
                            status === 'arrived' ? 'Varış Noktasında' : 'Tamamlandı'}
                </Badge>
            </div>

            {/* Map Placeholder */}
            <div className="h-48 bg-slate-900 relative border-b border-white/5">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 bg-[url('/grid.svg')]">
                    <Navigation className="w-12 h-12 text-blue-500" />
                </div>
                {/* Route visualization would go here */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur p-3 rounded-xl border border-white/10 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-blue-500" />
                        <span>Kalan: <strong className="text-white">4s 12dk</strong> (342 km)</span>
                    </div>
                    <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
                        Navigasyonu Aç
                    </Button>
                </div>
            </div>

            {/* Task Details */}
            <div className="p-4 space-y-4">
                <div className="space-y-4">
                    {/* Origin/Dest */}
                    <div className="relative pl-6 space-y-6">
                        <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 to-emerald-500"></div>

                        <div className="relative">
                            <div className="absolute -left-[1.6rem] w-4 h-4 rounded-full bg-blue-500 ring-4 ring-slate-950"></div>
                            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Yükleme Noktası</label>
                            <p className="text-sm font-medium leading-tight mt-1">{task.origin}</p>
                            <p className="text-xs text-slate-400 mt-0.5">Depo Kapısı: A-12</p>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[1.6rem] w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-950"></div>
                            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Teslimat Noktası</label>
                            <p className="text-sm font-medium leading-tight mt-1">{task.destination}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-0 h-5 text-[10px]">
                                    {task.deadline}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Cargo Info */}
                    <Card className="bg-white/5 border-white/10 p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                <Box className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">{task.load}</h3>
                                <p className="text-xs text-slate-400">Ref: PO-998877</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-950/50 p-2 rounded border border-white/5 flex items-center gap-2">
                                <span className="text-slate-500">Ağırlık:</span>
                                <span>24.500 kg</span>
                            </div>
                            <div className="bg-slate-950/50 p-2 rounded border border-white/5 flex items-center gap-2">
                                <span className="text-slate-500">Hacim:</span>
                                <span>85 m3</span>
                            </div>
                        </div>
                    </Card>

                    {/* Contact */}
                    <Card className="bg-white/5 border-white/10 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                                <User className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Saha Sorumlusu</h3>
                                <p className="text-xs text-slate-400">Hans Müller</p>
                            </div>
                        </div>
                        <Button size="icon" variant="ghost" className="rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20">
                            <Phone className="w-5 h-5" />
                        </Button>
                    </Card>
                </div>
            </div>

            {/* Bottom Floating Action Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900 border-t border-white/10 flex gap-3 z-40">
                <Button variant="outline" className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10 bg-red-500/5">
                    <AlertTriangle className="w-4 h-4 mr-2" /> Sorun Bildir
                </Button>
                <Button
                    className={cn(
                        "flex-[2.5] font-bold text-white shadow-xl shadow-blue-900/20",
                        status === 'assigned' ? 'bg-blue-600 hover:bg-blue-700' :
                            status === 'enroute' ? 'bg-amber-600 hover:bg-amber-700' :
                                'bg-emerald-600 hover:bg-emerald-700'
                    )}
                    onClick={handleMainAction}
                >
                    {status === 'assigned' ? (
                        <>Yola Çıkış Yap <Navigation className="w-4 h-4 ml-2" /></>
                    ) : status === 'enroute' ? (
                        <>Teslimat Noktasına Vardım <MapPin className="w-4 h-4 ml-2" /></>
                    ) : (
                        <>Teslimatı Tamamla <CheckCircle2 className="w-4 h-4 ml-2" /></>
                    )}
                </Button>
            </div>

            <ChatWidget otherName="Merkez Ofis (Dispeçer)" />

            {/* Camera / POD Upload Overlay */}
            {showCamera && (
                <div className="fixed inset-0 z-50 bg-black flex flex-col animation-in slide-in-from-bottom duration-300">
                    <div className="flex-1 relative bg-slate-900 flex flex-col items-center justify-center p-6">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">Teslimat Kanıtı (POD)</h3>
                            <p className="text-slate-400 text-sm">Lütfen imzalı evrağın fotoğrafını net bir şekilde çekin.</p>
                        </div>

                        <div className="relative w-full aspect-[3/4] max-w-sm bg-slate-800 rounded-2xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center overflow-hidden group hover:border-blue-500 transition-colors cursor-pointer">
                            <input type="file" accept="image/*" capture="environment" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={() => {
                                setTimeout(() => {
                                    setShowCamera(false);
                                    setShowSignature(true); // Proceed to signature
                                }, 1000);
                            }} />
                            <Camera className="w-16 h-16 text-slate-500 mb-4 group-hover:text-blue-500 transition-colors" />
                            <span className="text-slate-400 font-medium group-hover:text-blue-400">Kamerayı Aç / Yükle</span>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-900 border-t border-slate-800">
                        <Button onClick={() => setShowCamera(false)} variant="secondary" className="w-full h-12 text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white">
                            İptal
                        </Button>
                    </div>
                </div>
            )}

            {/* Signature Overlay */}
            {showSignature && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animation-in zoom-in-95 duration-200">
                    <div className="w-full max-w-md h-[400px] bg-white rounded-xl overflow-hidden shadow-2xl">
                        <SignaturePad
                            onSave={(signature) => {
                                setSignatureData(signature);
                                setShowSignature(false);
                                setStatus('delivered');
                            }}
                            onCancel={() => setShowSignature(false)}
                        />
                    </div>
                </div>
            )}

            {/* Success Overlay */}
            {status === 'delivered' && signatureData && (
                <div className="fixed inset-0 z-40 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center animation-in fade-in duration-500">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Teslimat Başarılı!</h2>
                    <p className="text-slate-400 mb-8">Tüm veriler merkeze ve müşteriye iletildi.</p>

                    <Card className="w-full max-w-sm bg-white/5 border-white/10 p-4 mb-8">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-2 text-left">Alıcı İmzası</div>
                        <div className="bg-white rounded-lg p-2">
                            <img src={signatureData} alt="Recipient Signature" className="w-full h-auto opacity-90" />
                        </div>
                    </Card>

                    <Button className="w-full max-w-sm bg-slate-800 hover:bg-slate-700 text-white" onClick={() => window.location.reload()}>
                        Yeni Göreve Dön
                    </Button>
                </div>
            )}
        </div>
    );
}
