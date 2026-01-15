'use client';

import { cn } from '@/lib/utils';
import { ChevronRight, Clock } from 'lucide-react';
import { MockLoad } from '@/lib/services/transport';
import MobileLoadCard from '@/components/mobile/MobileLoadCard';

interface ActiveShipmentsListProps {
    loads: MockLoad[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export default function ActiveShipmentsList({ loads, selectedId, onSelect }: ActiveShipmentsListProps) {
    return (
        <div className="flex-1 bg-slate-900 border border-white/5 rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-bold text-white text-sm">Aktif Sevkiyatlar</h3>
                <span className="text-xs text-slate-500">{loads.filter(l => l.status === 'in_transit').length} araç yolda</span>
            </div>
            {/* Desktop View */}
            <div className="hidden md:block overflow-y-auto p-2 space-y-2 flex-1 custom-scrollbar">
                {loads.map((load) => (
                    <div
                        key={load.id}
                        onClick={() => onSelect(load.id)}
                        className={cn("p-3 rounded-lg border transition-colors group cursor-pointer",
                            selectedId === load.id ? "bg-blue-900/20 border-blue-500/50" : "bg-slate-950/50 border-white/5 hover:border-blue-500/30"
                        )}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full",
                                    load.status === 'in_transit' ? 'bg-blue-500 animate-pulse' :
                                        load.status === 'resting' ? 'bg-amber-500' : 'bg-emerald-500'
                                )}></div>
                                <span className="text-xs font-bold text-white">{load.id}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">{load.vehicle}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-300 mb-3">
                            <span>{load.origin}</span>
                            <ChevronRight className="w-3 h-3 text-slate-600" />
                            <span>{load.destination}</span>
                        </div>

                        {/* Tachograph Metrics for Customer Visibility */}
                        {load.status !== 'delivered' && (
                            <div className="space-y-2 pt-2 border-t border-white/5 border-dashed">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                        <Clock className="w-3 h-3" />
                                        <span>Sürücü Durumu:</span>
                                        <span className={cn("font-medium", load.tachograph.status === 'resting' ? 'text-amber-400' : 'text-blue-400')}>
                                            {load.tachograph.status === 'resting' ? 'MOLA (Zorunlu)' : 'SÜRÜŞTE'}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-slate-500">
                                        Günlük: {load.tachograph.dailyDriven} / {load.tachograph.dailyLimit}
                                    </div>
                                </div>
                                {/* Tachograph Progress Bar */}
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    {/* Calculate width roughly based on strings for demo */}
                                    <div
                                        className={cn("h-full rounded-full", load.tachograph.status === 'resting' ? 'bg-amber-500' : 'bg-blue-500')}
                                        style={{ width: load.tachograph.status === 'resting' ? '95%' : '80%' }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex-1 overflow-y-auto p-2 pb-20 space-y-3">
                {loads.map((load) => (
                    <MobileLoadCard
                        key={load.id}
                        load={load}
                        onClick={() => onSelect(load.id)}
                    />
                ))}
            </div>
        </div>
    );
}
