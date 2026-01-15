'use client';

import { Polygon, Tooltip } from 'react-leaflet';

export default function RestrictionLayer() {

    // 15 July Martyrs Bridge (1. Bridge) - Ban for Heavy Vehicles
    const firstBridgeZone: [number, number][] = [
        [41.045, 29.030],
        [41.050, 29.040],
        [41.040, 29.045],
        [41.035, 29.035]
    ];

    // Historical Peninsula (Fatih) - Time Restrictions (10:00 - 16:00 Allowed)
    const historicalZone: [number, number][] = [
        [41.020, 28.940],
        [41.025, 28.980],
        [41.000, 28.990],
        [40.990, 28.950]
    ];

    return (
        <>
            {/* 1. Köprü Yasağı (Kırmızı Bölge) */}
            <Polygon
                positions={firstBridgeZone}
                pathOptions={{
                    color: '#ef4444',
                    fillColor: '#ef4444',
                    fillOpacity: 0.2,
                    weight: 1,
                    dashArray: '5, 5'
                }}
            >
                <Tooltip sticky direction="center" className="bg-red-500 text-white border-0">
                    <div className="text-center">
                        <div className="font-bold text-xs">YASAKLI BÖLGE</div>
                        <div className="text-[10px]">15 Temmuz Şehitler Köprüsü</div>
                        <div className="text-[9px] opacity-80">Ağır Vasıta Giremez</div>
                    </div>
                </Tooltip>
            </Polygon>

            {/* Tarihi Yarımada (Sarı Bölge - Saatli) */}
            <Polygon
                positions={historicalZone}
                pathOptions={{
                    color: '#f59e0b',
                    fillColor: '#f59e0b',
                    fillOpacity: 0.15,
                    weight: 1
                }}
            >
                <Tooltip sticky direction="center" className="bg-amber-500 text-white border-0">
                    <div className="text-center">
                        <div className="font-bold text-xs">KISITLI BÖLGE</div>
                        <div className="text-[10px]">Tarihi Yarımada</div>
                        <div className="text-[9px] opacity-80">Giriş: 10:00 - 16:00</div>
                    </div>
                </Tooltip>
            </Polygon>
        </>
    );
}
