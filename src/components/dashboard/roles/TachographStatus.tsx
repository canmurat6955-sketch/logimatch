'use client';

import { Clock, AlertTriangle, CheckCircle2, Truck } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DriverStatus {
    id: string;
    name: string;
    vehiclePlate: string;
    dailyDrivingTime: number; // minutes
    weeklyDrivingTime: number; // minutes
    status: 'driving' | 'rest' | 'work';
    lastRestTime: string;
}

export default function TachographStatus() {
    // Mock Data simulating real tachograph inputs
    const drivers: DriverStatus[] = [
        { id: '1', name: 'Ahmet Yılmaz', vehiclePlate: '34 VR 8821', dailyDrivingTime: 480, weeklyDrivingTime: 2400, status: 'driving', lastRestTime: '2s önce' }, // 8h driving
        { id: '2', name: 'Mehmet Demir', vehiclePlate: '06 ANK 123', dailyDrivingTime: 520, weeklyDrivingTime: 2100, status: 'rest', lastRestTime: '15dk' }, // 8h 40m - warning
        { id: '3', name: 'Ali Vural', vehiclePlate: '35 IZM 456', dailyDrivingTime: 120, weeklyDrivingTime: 800, status: 'driving', lastRestTime: '4s önce' },
    ];

    const MAX_DAILY_MINUTES = 540; // 9 hours
    const WARNING_THRESHOLD = 480; // 8 hours

    return (
        <div className="p-5 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5">
            <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Takoğraf & Sürücü Durumu</h3>
            </div>

            <div className="space-y-4">
                {drivers.map(driver => {
                    const dailyPercentage = Math.min((driver.dailyDrivingTime / MAX_DAILY_MINUTES) * 100, 100);
                    const isWarning = driver.dailyDrivingTime > WARNING_THRESHOLD;
                    const isCritical = driver.dailyDrivingTime >= MAX_DAILY_MINUTES;

                    return (
                        <div key={driver.id} className="group">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${driver.status === 'driving' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                                        }`}>
                                        <Truck className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-white">{driver.name}</div>
                                        <div className="text-[10px] text-slate-500">{driver.vehiclePlate}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-xs font-bold ${isCritical ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-slate-200'}`}>
                                        {Math.floor(driver.dailyDrivingTime / 60)}s {driver.dailyDrivingTime % 60}dk
                                    </div>
                                    <div className="text-[10px] text-slate-500">Günlük Sürüş</div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-1">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-blue-500'
                                        }`}
                                    style={{ width: `${dailyPercentage}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between items-center text-[10px]">
                                <span className="text-slate-500">Kalan: {Math.max(0, Math.floor((MAX_DAILY_MINUTES - driver.dailyDrivingTime) / 60))}s {Math.max(0, (MAX_DAILY_MINUTES - driver.dailyDrivingTime) % 60)}dk</span>
                                {isWarning && (
                                    <span className="flex items-center gap-1 text-amber-400">
                                        <AlertTriangle className="w-3 h-3" /> Mola Gerekli
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Button variant="ghost" className="w-full mt-4 text-xs text-slate-400 hover:text-white hover:bg-white/5 h-8">
                Tüm Filo Raporu
            </Button>
        </div>
    );
}
