'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Check if Label exists, if not use standard label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Car, Settings, AlertTriangle } from "lucide-react";

// Define specs constant here as well or import it. Ideally import.
// For now, mirroring the specs to ensure validation logic is correct.
export type VehicleType = 'trailer' | 'truck' | 'van';

export interface VehicleConfig {
    plate: string;
    type: VehicleType;
    customCapacityWeight: number; // kg
}

const VEHICLE_LIMITS = {
    trailer: { label: 'Tır (Light Trailer)', maxWeight: 26500 },
    truck: { label: 'Kamyon (Kırkayak)', maxWeight: 32000 },
    van: { label: 'Kamyonet', maxWeight: 3500 }
};

interface VehicleSettingsDialogProps {
    currentConfig: VehicleConfig;
    onSave: (config: VehicleConfig) => void;
}

export function VehicleSettingsDialog({ currentConfig, onSave }: VehicleSettingsDialogProps) {
    const [open, setOpen] = useState(false);
    const [config, setConfig] = useState<VehicleConfig>(currentConfig);
    const [error, setError] = useState<string | null>(null);

    // Reset config when dialog opens
    useEffect(() => {
        if (open) {
            setConfig(currentConfig);
            setError(null);
        }
    }, [open, currentConfig]);

    const handleTypeChange = (value: VehicleType) => {
        const limit = VEHICLE_LIMITS[value].maxWeight;
        setConfig(prev => ({
            ...prev,
            type: value,
            // Reset weight to limit if current weight exceeds new limit, otherwise keep or default?
            // Safer to set to max limit of new type to avoid invalid state.
            customCapacityWeight: limit
        }));
        setError(null);
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (isNaN(val)) return;

        setConfig(prev => ({ ...prev, customCapacityWeight: val }));

        const limit = VEHICLE_LIMITS[config.type].maxWeight;
        if (val > limit) {
            setError(`Seçilen araç tipi için yasal sınır ${limit} kg'dır.`);
        } else {
            setError(null);
        }
    };

    const handleSave = () => {
        const limit = VEHICLE_LIMITS[config.type].maxWeight;
        if (config.customCapacityWeight > limit) {
            // Force correct before save or block?
            // Let's block
            setError(`Kaydetmeden önce ağırlığı yasal sınırın (${limit} kg) altına düşürün.`);
            return;
        }
        onSave(config);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-white/10 bg-slate-900/50 hover:bg-slate-800 text-slate-300">
                    <Settings className="w-4 h-4" />
                    Araç Ayarları
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-emerald-500" />
                        Araç Yapılandırması
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Aracınızın teknik özelliklerini güncelleyin. Yasal sınırlar otomatik kontrol edilir.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-300">Araç Tipi</label>
                        <Select value={config.type} onValueChange={(val) => handleTypeChange(val as VehicleType)}>
                            <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                {Object.entries(VEHICLE_LIMITS).map(([key, val]) => (
                                    <SelectItem key={key} value={key}>{val.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-300">Plaka</label>
                        <Input
                            value={config.plate}
                            onChange={(e) => setConfig({ ...config, plate: e.target.value.toUpperCase() })}
                            className="bg-slate-900 border-slate-800 text-white font-mono"
                            placeholder="34 VR 1024"
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-slate-300">Maks. Yük Kapasitesi (kg)</label>
                            <span className="text-xs text-slate-500">Yasal Sınır: {VEHICLE_LIMITS[config.type].maxWeight} kg</span>
                        </div>
                        <Input
                            type="number"
                            value={config.customCapacityWeight}
                            onChange={handleWeightChange}
                            className={`bg-slate-900 border-slate-800 text-white ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-xs mt-1 animate-in slide-in-from-top-1">
                                <AlertTriangle className="w-3 h-3" />
                                {error}
                            </div>
                        )}
                        {!error && (
                            <div className="text-[10px] text-slate-500">
                                * Bu değer yük eşleşmelerinde ve doluluk hesaplamalarında kullanılacaktır.
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                        Değişiklikleri Kaydet
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
