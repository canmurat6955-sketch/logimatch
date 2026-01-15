'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const LiveFleetMap = dynamic(() => import('./LiveFleetMap'), {
    ssr: false,
    loading: () => <MapSkeleton />,
});

function MapSkeleton() {
    return (
        <div className="h-[600px] w-full rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center animate-pulse">
            <div className="text-slate-400 flex flex-col items-center gap-2">
                <span className="text-4xl">🗺️</span>
                <span>Harita Yükleniyor...</span>
            </div>
        </div>
    );
}

export default function LiveFleetMapWrapper() {
    return <LiveFleetMap />;
}
