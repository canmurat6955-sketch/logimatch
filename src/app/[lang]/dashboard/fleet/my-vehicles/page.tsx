"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Truck, MoreVertical, Filter, MapPin, User, Settings as SettingsIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VEHICLE_TYPES, TIR_DATA, KAMYON_DATA, KAMYONET_DATA, TRAILER_TYPES } from "@/lib/vehicleData";
import { toast } from "sonner";

export default function MyVehiclesPage({ params }: { params: { lang: string } }) {
    const [vehicles, setVehicles] = useState<any[]>([]); // Mock data for now, will connect to supabase
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        plate: "",
        type: "",
        brand: "",
        model: "", // Free text or specific
        trailer: "",
        driver: ""
    });

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
        setFormData({ plate: "", type: "", brand: "", model: "", trailer: "", driver: "" });
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
                            <div className="space-y-4 py-4">
                                {/* Type Selection */}
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

                                {formData.type && (
                                    <>
                                        {/* Brand Select */}
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Marka</label>
                                            <Select
                                                value={formData.brand}
                                                onValueChange={(val) => setFormData({ ...formData, brand: val, model: '' })}
                                            >
                                                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                                    <SelectValue placeholder="Marka Seçiniz..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                    {formData.type === 'tir' ? (
                                                        Object.keys(TIR_DATA).map(b => (
                                                            <SelectItem key={b} value={b}>{b}</SelectItem>
                                                        ))
                                                    ) : formData.type === 'kamyon' ? (
                                                        Object.keys(KAMYON_DATA).map(b => (
                                                            <SelectItem key={b} value={b}>{b}</SelectItem>
                                                        ))
                                                    ) : (
                                                        Object.keys(KAMYONET_DATA).map(b => (
                                                            <SelectItem key={b} value={b}>{b}</SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Model Select (Now works for ALL types) */}
                                        {formData.brand && (
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">Model</label>
                                                <Select
                                                    value={formData.model}
                                                    onValueChange={(val) => setFormData({ ...formData, model: val })}
                                                >
                                                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                                        <SelectValue placeholder="Model Seçiniz..." />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                        {formData.type === 'tir' ? (
                                                            TIR_DATA[formData.brand]?.map(m => (
                                                                <SelectItem key={m} value={m}>{m}</SelectItem>
                                                            ))
                                                        ) : formData.type === 'kamyon' ? (
                                                            KAMYON_DATA[formData.brand]?.map(m => (
                                                                <SelectItem key={m} value={m}>{m}</SelectItem>
                                                            ))
                                                        ) : (
                                                            KAMYONET_DATA[formData.brand]?.map(m => (
                                                                <SelectItem key={m} value={m}>{m}</SelectItem>
                                                            ))
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Plate & Model */}
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
                                    {/* All types now use the Select above. Fallback input removed. */}
                                </div>

                                {/* Trailer Type (If Tir or Kamyon) */}
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

                                {/* Driver Name */}
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Zimmetli Sürücü (Opsiyonel)</label>
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

                                <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-500 text-white mt-4">
                                    Kaydet ve Ekle
                                </Button>
                            </div>
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
