import { MockLoad } from '@/lib/services/transport';
import { MapPin, Calendar, ArrowRight, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MobileLoadCardProps {
    load: MockLoad;
    onClick?: () => void;
}

export default function MobileLoadCard({ load, onClick }: MobileLoadCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-slate-900/50 backdrop-blur border border-white/5 rounded-xl p-4 mb-3 active:scale-[0.98] transition-all"
        >
            {/* Header: Route & Price */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-white font-semibold">
                        <span>{load.origin}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span>{load.destination}</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Bugün, 14:00</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-emerald-400 font-bold text-lg">€{load.co2 * 12 /* Mock Price */}</div>
                    <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400 h-5">
                        {load.status}
                    </Badge>
                </div>
            </div>

            {/* Details: Truck & Cargo */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-slate-950/50 rounded-lg p-2 border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase">Araç</div>
                    <div className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                        <Truck className="w-3 h-3" />
                        {load.vehicle}
                    </div>
                </div>
                <div className="bg-slate-950/50 rounded-lg p-2 border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase">Yük</div>
                    <div className="text-xs text-slate-300 mt-0.5">
                        {load.cargo.weight} • {load.cargo.type}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg">
                Detayları Gör
            </Button>
        </div>
    );
}
