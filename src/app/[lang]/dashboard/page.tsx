'use client';

import { useState } from 'react';
import LoadOwnerView from '@/components/dashboard/roles/LoadOwnerView';
import VehicleOwnerView from '@/components/dashboard/roles/VehicleOwnerView';
import EnterpriseView from '@/components/dashboard/roles/EnterpriseView';
import { Button } from '@/components/ui/button';
import { Users, Truck, Building2 } from 'lucide-react';

export default function DashboardPage() {
    // SIMULATION STATE
    const [currentView, setCurrentView] = useState<'load-owner' | 'vehicle-owner' | 'enterprise'>('load-owner');

    return (
        <div className="animate-in fade-in duration-500 relative min-h-screen">

            {/* SIMULATION CONTROLS (Floating Top Center) */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-950/80 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-2xl flex items-center gap-1 hover:scale-105 transition-transform duration-300">
                <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full h-8 text-xs font-medium transition-all ${currentView === 'load-owner' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    onClick={() => setCurrentView('load-owner')}
                >
                    <Users className="w-3.5 h-3.5 mr-2" /> Yük Sahibi
                </Button>
                <div className="w-px h-4 bg-white/10 mx-1"></div>
                <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full h-8 text-xs font-medium transition-all ${currentView === 'vehicle-owner' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    onClick={() => setCurrentView('vehicle-owner')}
                >
                    <Truck className="w-3.5 h-3.5 mr-2" /> Araç Sahibi
                </Button>
                <div className="w-px h-4 bg-white/10 mx-1"></div>
                <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full h-8 text-xs font-medium transition-all ${currentView === 'enterprise' ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    onClick={() => setCurrentView('enterprise')}
                >
                    <Building2 className="w-3.5 h-3.5 mr-2" /> Lojistik Firması
                </Button>
            </div>

            {/* View Render */}
            <div className="pt-0">
                {currentView === 'load-owner' && <LoadOwnerView />}
                {currentView === 'vehicle-owner' && <VehicleOwnerView />}
                {currentView === 'enterprise' && <EnterpriseView />}
            </div>
        </div>
    );
}
