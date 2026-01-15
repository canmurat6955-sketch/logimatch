'use client';

import { ArrowLeft, MapPin, Truck, Calendar, Clock, FileText, Download, Upload, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Use absolute import to avoid relative path confusion
const MapComponent = dynamic(() => import('@/components/map/MapComponent'), {
    ssr: false,
    loading: () => <div className="w-full h-96 bg-slate-900/50 flex items-center justify-center text-slate-400">Harita Yükleniyor...</div>
});

export default function ShipmentDetails({ id }: { id: string }) {
    const router = useRouter();

    // Mock Data for specific shipment
    const shipmentData = {
        id: id || 'TR-249102',
        origin: 'İstanbul, TR',
        destination: 'Berlin, DE',
        status: 'in_transit', // pending, in_transit, customs, delivered
        eta: '14 Oca 2026, 14:30',
        driver: {
            name: 'Ahmet Yılmaz',
            plate: '34 VR 1024',
            phone: '+90 532 999 88 77',
            rating: 4.9
        },
        timeline: [
            { time: '11 Oca 09:30', status: 'Yükleme Başladı', completed: true, location: 'Gebze Lojistik Üssü' },
            { time: '11 Oca 14:00', status: 'Yola Çıktı', completed: true, location: 'Gebze, TR' },
            { time: '12 Oca 08:00', status: 'Gümrük İşlemleri', completed: true, location: 'Kapıkule Sınır Kapısı' },
            { time: 'Şu An', status: 'Transfer Halinde', completed: false, active: true, location: 'Sofya Yakınları, BG' },
            { time: 'Tahmini: 14 Oca', status: 'Teslimat', completed: false, location: 'Berlin, DE' }
        ],
        documents: [
            { name: 'e-CMR.pdf', type: 'cmr', status: 'signed', date: '11 Oca 2026' },
            { name: 'Commercial_Invoice.pdf', type: 'invoice', status: 'approved', date: '10 Oca 2026' },
            { name: 'POD_Form.pdf', type: 'pod', status: 'pending', date: '-' } // Proof of Delivery
        ]
    };

    return (
        <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-slate-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white tracking-tight">Sevkiyat #{shipmentData.id}</h1>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 capitalize">
                                {shipmentData.status === 'in_transit' ? 'Transfer Halinde' : shipmentData.status}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                            <span>{shipmentData.origin}</span>
                            <span className="text-slate-600">➔</span>
                            <span>{shipmentData.destination}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Sorun Bildir
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-500">
                        Canlı Destek
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">

                {/* Left Column: Map & Driver (2/3 width on large screens) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Map Card */}
                    <Card className="bg-slate-900 border-white/5 flex-1 min-h-[400px] flex flex-col overflow-hidden">
                        <div className="relative flex-1">
                            <MapComponent
                                className="z-0"
                                singleView={true}
                                vehiclePosition={[42.69, 23.32]} // Near Sofia
                                routePath={[
                                    [40.85, 29.30], // Origin
                                    [41.71, 26.56], // Border
                                    [42.69, 23.32], // Current
                                    [52.52, 13.40]  // Dest (Approx line)
                                ]}
                            />
                            {/* Overlay Card for Driver info on Map */}
                            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-slate-950/90 backdrop-blur-md border border-white/10 p-4 rounded-xl z-[400]">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-white text-sm">{shipmentData.driver.plate}</div>
                                        <div className="text-xs text-slate-400">{shipmentData.driver.name}</div>
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400">
                                        <MessageSquareIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Separator className="my-3 bg-white/10" />
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <div className="text-slate-500">ETA</div>
                                        <div className="text-white font-medium">{shipmentData.eta}</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500">Hız / Durum</div>
                                        <div className="text-emerald-400 font-medium">82 km/s · Hareketli</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Timeline & Docs (1/3 width) */}
                <div className="flex flex-col gap-6">

                    {/* Timeline */}
                    <Card className="bg-slate-900 border-white/5">
                        <CardHeader>
                            <CardTitle className="text-lg text-white flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-500" />
                                Sevkiyat Durumu
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative pl-4 border-l border-slate-800 space-y-6">
                                {shipmentData.timeline.map((item, i) => (
                                    <div key={i} className="relative">
                                        <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 ${item.completed ? 'bg-blue-500 border-blue-500' : item.active ? 'bg-blue-500 border-blue-500 animate-pulse' : 'bg-slate-900 border-slate-600'}`}></div>
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-medium ${item.completed || item.active ? 'text-white' : 'text-slate-500'}`}>
                                                {item.status}
                                            </span>
                                            <span className="text-xs text-slate-400 mt-0.5">{item.location}</span>
                                            <span className="text-[10px] text-slate-500 mt-0.5">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Documents */}
                    <Card className="bg-slate-900 border-white/5">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-amber-500" />
                                Dokümanlar
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-400">Tümü</Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {shipmentData.documents.map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded bg-slate-800 ${doc.status === 'signed' ? 'text-emerald-500' : doc.status === 'pending' ? 'text-amber-500' : 'text-slate-400'}`}>
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-white truncate max-w-[120px]" title={doc.name}>{doc.name}</span>
                                            <span className="text-[10px] text-slate-500 uppercase">{doc.type} · {doc.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {doc.status === 'pending' ? (
                                            <Button size="icon" variant="ghost" className="h-7 w-7 text-amber-500 hover:text-amber-400" title="Yükle">
                                                <Upload className="w-3.5 h-3.5" />
                                            </Button>
                                        ) : (
                                            <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-white" title="İndir">
                                                <Download className="w-3.5 h-3.5" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <Button className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-slate-200" variant="outline">
                                <Upload className="w-4 h-4 mr-2" />
                                Yeni Belge Yükle
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}

// Simple Icon component for the overlay
function MessageSquareIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    )
}
