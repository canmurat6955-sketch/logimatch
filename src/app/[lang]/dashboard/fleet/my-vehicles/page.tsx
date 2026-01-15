"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Truck, MoreVertical, Filter, MapPin, User, Settings as SettingsIcon, Info, Calendar as CalendarIcon, FileText, Ruler, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { VEHICLE_TYPES, TIR_DATA, KAMYON_DATA, KAMYONET_DATA, TRAILER_TYPES, VEHICLE_FEATURES } from "@/lib/vehicleData";
import { toast } from "sonner";
import { useEffect } from "react";

export default function MyVehiclesPage({ params }: { params: { lang: string } }) {
    const [vehicles, setVehicles] = useState<any[]>([]); // Mock data for now, will connect to supabase
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        plate: "",
        type: "",
        brand: "",
        model: "",
        trailer: "",
        driver: "",
        // New Fields
        length: "",
        width: "",
        height: "",
        volume: "",
        features: [] as string[],
        insurance_expiry: "",
        inspection_expiry: ""
    });

    // Auto-calculate Volume (m3)
    useEffect(() => {
        if (formData.length && formData.width && formData.height) {
            const l = parseFloat(formData.length);
            const w = parseFloat(formData.width);
            const h = parseFloat(formData.height);
            if (!isNaN(l) && !isNaN(w) && !isNaN(h)) {
                // Determine divisor based on unit (assuming CM input, result in M3)
                // Volume = (L * W * H) / 1000000
                const vol = (l * w * h) / 10000; // Actually wait, if inputs are cm: 100cm * 100cm * 100cm = 1,000,000 cm3 = 1 m3.
                // Calculation: (L_cm * W_cm * H_cm) / 1,000,000
                const volumeM3 = (l * w * h) / 1000000;
                setFormData(prev => ({ ...prev, volume: volumeM3.toFixed(2) }));
            }
        }
    }, [formData.length, formData.width, formData.height]);

    const toggleFeature = (featureId: string) => {
        setFormData(prev => {
            const exists = prev.features.includes(featureId);
            if (exists) return { ...prev, features: prev.features.filter(f => f !== featureId) };
            return { ...prev, features: [...prev.features, featureId] };
        });
    };

    const handleSave = () => {
        if (!formData.plate || !formData.type || !formData.brand) {
            toast.error("Lütfen zorunlu alanları doldurun (Plaka, Tip, Marka)");
            return;
        }

        const newVehicle = {
            id: Date.now().toString(),
            ...formData,
            status: 'active',
            location: 'İstanbul, TR' // Mock location
        };

        setVehicles([...vehicles, newVehicle]);
        setIsAddOpen(false);
        setFormData({
            plate: "", type: "", brand: "", model: "", trailer: "", driver: "",
            length: "", width: "", height: "", volume: "", features: [], insurance_expiry: "", inspection_expiry: ""
        });
        toast.success("Araç başarıyla garajınıza eklendi! 🚛");
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Truck className="w-8 h-8 text-blue-500" />
                        Araçlarım (Garaj)
                    </h1>
                    <p className="text-zinc-400 mt-1">Filonuzdaki tüm araçları buradan yönetin.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                        <Filter className="w-4 h-4 mr-2" /> Filtrele
                    </Button>
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                                <Plus className="w-4 h-4 mr-2" /> Yeni Araç Ekle
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
                            <DialogHeader>
                                <DialogTitle>Garaja Yeni Araç Ekle</DialogTitle>
                            </DialogHeader>

                            <Tabs defaultValue="identity" className="w-full mt-4">
                                <TabsList className="grid w-full grid-cols-4 bg-zinc-900">
                                    <TabsTrigger value="identity">Kimlik</TabsTrigger>
                                    <TabsTrigger value="specs">Teknik</TabsTrigger>
                                    <TabsTrigger value="features">Özellik</TabsTrigger>
                                    <TabsTrigger value="docs">Evrak</TabsTrigger>
                                </TabsList>

                                {/* TAB 1: KIMLIK (IDENTITY) */}
                                <TabsContent value="identity" className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Plaka</label>
                                            <Input
                                                placeholder="34 ABC 123"
                                                className="bg-zinc-900 border-zinc-800 uppercase"
                                                value={formData.plate}
                                                onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Araç Tipi</label>
                                            <Select
                                                value={formData.type}
                                                onValueChange={(val) => setFormData({ ...formData, type: val, brand: '' })}
                                            >
                                                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                                    <SelectValue placeholder="Seçiniz..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                    {VEHICLE_TYPES.map(t => (
                                                        <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {formData.type && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">Marka</label>
                                                <Select
                                                    value={formData.brand}
                                                    onValueChange={(val) => setFormData({ ...formData, brand: val, model: '' })}
                                                >
                                                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                                        <SelectValue placeholder="Seçiniz..." />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                        {formData.type === 'tir' ? (
                                                            Object.keys(TIR_DATA).map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)
                                                        ) : formData.type === 'kamyon' ? (
                                                            Object.keys(KAMYON_DATA).map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)
                                                        ) : (
                                                            Object.keys(KAMYONET_DATA).map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {formData.brand && (
                                                <div className="space-y-2">
                                                    <label className="text-sm text-zinc-400">Model</label>
                                                    <Select
                                                        value={formData.model}
                                                        onValueChange={(val) => setFormData({ ...formData, model: val })}
                                                    >
                                                        <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                                            <SelectValue placeholder="Seçiniz..." />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                            {formData.type === 'tir' ? (
                                                                TIR_DATA[formData.brand]?.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)
                                                            ) : formData.type === 'kamyon' ? (
                                                                KAMYON_DATA[formData.brand]?.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)
                                                            ) : (
                                                                KAMYONET_DATA[formData.brand]?.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {['tir', 'kamyon'].includes(formData.type) && (
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Dorse / Kasa Tipi</label>
                                            <Select
                                                value={formData.trailer}
                                                onValueChange={(val) => setFormData({ ...formData, trailer: val })}
                                            >
                                                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                                    <SelectValue placeholder="Seçiniz..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                    {TRAILER_TYPES.map(t => (
                                                        <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Sürücü (Opsiyonel)</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <Input
                                                placeholder="Ad Soyad"
                                                className="pl-9 bg-zinc-900 border-zinc-800"
                                                value={formData.driver}
                                                onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* TAB 2: TEKNIK (SPECS) */}
                                <TabsContent value="specs" className="space-y-4 py-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Uzunluk (cm)</label>
                                            <div className="relative">
                                                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                <Input
                                                    type="number"
                                                    placeholder="1360"
                                                    className="pl-9 bg-zinc-900 border-zinc-800"
                                                    value={formData.length}
                                                    onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Genişlik (cm)</label>
                                            <Input
                                                type="number"
                                                placeholder="245"
                                                className="bg-zinc-900 border-zinc-800"
                                                value={formData.width}
                                                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Yükseklik (cm)</label>
                                            <Input
                                                type="number"
                                                placeholder="280"
                                                className="bg-zinc-900 border-zinc-800"
                                                value={formData.height}
                                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <Info className="w-4 h-4" />
                                            <span className="text-sm">Hesaplanan Hacim</span>
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            {formData.volume ? `${formData.volume} m³` : '-'}
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* TAB 3: OZELLIK (FEATURES) */}
                                <TabsContent value="features" className="space-y-4 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {VEHICLE_FEATURES.map(feat => {
                                            const isSelected = formData.features.includes(feat.id);
                                            return (
                                                <div
                                                    key={feat.id}
                                                    onClick={() => toggleFeature(feat.id)}
                                                    className={`
                                                        cursor-pointer px-4 py-2 rounded-full border text-sm font-medium transition-all
                                                        ${isSelected
                                                            ? 'bg-blue-600 border-blue-500 text-white'
                                                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                                        }
                                                    `}
                                                >
                                                    {feat.label}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </TabsContent>

                                {/* TAB 4: EVRAK (DOCS) */}
                                <TabsContent value="docs" className="space-y-4 py-4">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Trafik Sigortası Bitiş Tarihi</label>
                                            <div className="relative">
                                                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                <Input
                                                    type="date"
                                                    className="pl-9 bg-zinc-900 border-zinc-800 block w-full"
                                                    value={formData.insurance_expiry}
                                                    onChange={(e) => setFormData({ ...formData, insurance_expiry: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Muayene Geçerlilik Tarihi</label>
                                            <div className="relative">
                                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                <Input
                                                    type="date"
                                                    className="pl-9 bg-zinc-900 border-zinc-800 block w-full"
                                                    value={formData.inspection_expiry}
                                                    onChange={(e) => setFormData({ ...formData, inspection_expiry: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-500 text-white mt-2">
                                Kaydet ve Ekle
                            </Button>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Content State */}
            {vehicles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                        <Truck className="w-8 h-8 text-zinc-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Garajınız Boş</h3>
                    <p className="text-zinc-500 max-w-md text-center mt-2 mb-6">
                        Sisteme henüz bir araç eklemediniz. Yük bulmak ve filonuzu yönetmek için ilk aracınızı ekleyin.
                    </p>
                    <Button onClick={() => setIsAddOpen(true)} variant="secondary">
                        <Plus className="w-4 h-4 mr-2" /> İlk Aracı Ekle
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="group bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-blue-500/50 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center border border-blue-500/20 text-blue-400">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{vehicle.plate}</h3>
                                        <p className="text-xs text-zinc-400">{vehicle.brand}</p>
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${vehicle.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {vehicle.status === 'active' ? 'AKTİF' : 'SERVİSTE'}
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Araç Tipi:</span>
                                    <span className="text-zinc-300 capitalize">{vehicle.type}</span>
                                </div>

                                {/* Specs Display */}
                                {vehicle.volume && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-500">Kapasite:</span>
                                        <span className="text-zinc-300 font-medium">
                                            {vehicle.volume}m³ <span className="text-zinc-500 text-xs font-normal">({vehicle.length}x{vehicle.width}x{vehicle.height})</span>
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Dorse:</span>
                                    <span className="text-zinc-300 capitalize">{TRAILER_TYPES.find(t => t.id === vehicle.trailer)?.label || '-'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Sürücü:</span>
                                    <span className="text-zinc-300">{vehicle.driver || 'Atanmadı'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Konum:</span>
                                    <span className="text-blue-400 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {vehicle.location}
                                    </span>
                                </div>
                            </div>

                            {/* Features Badges */}
                            {vehicle.features && vehicle.features.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {vehicle.features.map((fid: string) => {
                                        const label = VEHICLE_FEATURES.find(f => f.id === fid)?.label;
                                        return label ? (
                                            <Badge key={fid} variant="secondary" className="bg-zinc-800 text-zinc-400 border-zinc-700 text-[10px] px-1.5 py-0">
                                                {label}
                                            </Badge>
                                        ) : null;
                                    })}
                                </div>
                            )}

                            {/* Footer / Actions */}
                            <div className="flex gap-2 pt-2 border-t border-zinc-800">
                                <Button size="sm" variant="ghost" className="flex-1 h-8 text-zinc-400 hover:text-white">
                                    <MapPin className="w-3 h-3 mr-2" /> Haritada Gör
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                                    <SettingsIcon className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
