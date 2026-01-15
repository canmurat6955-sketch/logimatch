
import LiveFleetMapWrapper from "@/components/dashboard/map/LiveFleetMapWrapper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MapDashboardPage() {
    return (
        <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Operasyon Haritası</h1>
                    <p className="text-slate-500 mt-1">Araçların canlı konumları ve operasyonel durumları.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline">Filtrele</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Yeni Rota Çiz
                    </Button>
                </div>
            </div>

            <LiveFleetMapWrapper />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatusCard title="Hareket Halinde" count={12} color="text-green-600" bg="bg-green-50" />
                <StatusCard title="Beklemede" count={5} color="text-amber-600" bg="bg-amber-50" />
                <StatusCard title="Bakımda" count={2} color="text-red-600" bg="bg-red-50" />
            </div>
        </div>
    );
}

function StatusCard({ title, count, color, bg }: { title: string, count: number, color: string, bg: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">{title}</h3>
            <div className={`mt-2 text-3xl font-bold ${color}`}>{count}</div>
            <div className={`mt-4 h-1.5 w-full rounded-full ${bg} overflow-hidden`}>
                <div className={`h-full w-[70%] rounded-full ${color.replace('text', 'bg')}`}></div>
            </div>
        </div>
    );
}
