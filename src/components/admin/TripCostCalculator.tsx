'use client';

import { useState, useEffect } from 'react';
import { LucideCalculator, LucideFuel, LucideDollarSign, LucideTruck, LucideUser } from 'lucide-react';

export default function TripCostCalculator() {
    // Inputs
    const [distance, setDistance] = useState(1000); // km
    const [fuelPrice, setFuelPrice] = useState(42.5); // TRY per liter
    const [consumption, setConsumption] = useState(32); // Liters per 100km
    const [driverWage, setDriverWage] = useState(2500); // Fixed per trip + daily
    const [tolls, setTolls] = useState(1200); // Bridge/Highway
    const [cargoPrice, setCargoPrice] = useState(25000); // Revenue

    // Outputs
    const [fuelCost, setFuelCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [netProfit, setNetProfit] = useState(0);
    const [margin, setMargin] = useState(0);

    useEffect(() => {
        // Calculation Logic
        const fuelRequired = (distance / 100) * consumption;
        const calculatedFuelCost = fuelRequired * fuelPrice;

        const calculatedTotalCost = calculatedFuelCost + driverWage + tolls;
        const calculatedNetProfit = cargoPrice - calculatedTotalCost;
        const calculatedMargin = cargoPrice > 0 ? (calculatedNetProfit / cargoPrice) * 100 : 0;

        setFuelCost(calculatedFuelCost);
        setTotalCost(calculatedTotalCost);
        setNetProfit(calculatedNetProfit);
        setMargin(calculatedMargin);
    }, [distance, fuelPrice, consumption, driverWage, tolls, cargoPrice]);

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <LucideCalculator className="w-5 h-5 text-purple-500" />
                Sefer Maliyet Simülatörü
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-zinc-500 font-bold uppercase block mb-1">Mesafe (KM)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={distance}
                                onChange={(e) => setDistance(Number(e.target.value))}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500"
                            />
                            <span className="absolute right-3 top-2.5 text-xs text-zinc-500">km</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-zinc-500 font-bold uppercase block mb-1">Mazot (Litre/₺)</label>
                            <div className="relative">
                                <LucideFuel className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" />
                                <input
                                    type="number"
                                    value={fuelPrice}
                                    onChange={(e) => setFuelPrice(Number(e.target.value))}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 font-bold uppercase block mb-1">Tüketim (Lt/100)</label>
                            <div className="relative">
                                <LucideTruck className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" />
                                <input
                                    type="number"
                                    value={consumption}
                                    onChange={(e) => setConsumption(Number(e.target.value))}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-zinc-500 font-bold uppercase block mb-1">Şoför Harcırah</label>
                            <div className="relative">
                                <LucideUser className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" />
                                <input
                                    type="number"
                                    value={driverWage}
                                    onChange={(e) => setDriverWage(Number(e.target.value))}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 font-bold uppercase block mb-1">Köprü/Otoyol</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-zinc-600 text-xs">₺</span>
                                <input
                                    type="number"
                                    value={tolls}
                                    onChange={(e) => setTolls(Number(e.target.value))}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-zinc-500 font-bold uppercase block mb-1">Navlun Bedeli (Gelir)</label>
                        <div className="relative">
                            <LucideDollarSign className="absolute left-3 top-2.5 w-4 h-4 text-emerald-500" />
                            <input
                                type="number"
                                value={cargoPrice}
                                onChange={(e) => setCargoPrice(Number(e.target.value))}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-zinc-950 rounded-lg p-6 flex flex-col justify-between border border-zinc-800">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3">
                            <span className="text-zinc-400">Yakıt Maliyeti ({Math.round((distance / 100) * consumption)} Lt)</span>
                            <span className="text-zinc-200">₺{fuelCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3">
                            <span className="text-zinc-400">Diğer Giderler</span>
                            <span className="text-zinc-200">₺{(totalCost - fuelCost).toLocaleString()}</span>
                        </div>

                        <div className="pt-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-zinc-400 font-medium">Toplam Maliyet</span>
                                <span className="text-white font-bold text-lg">₺{totalCost.toLocaleString()}</span>
                            </div>
                            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500" style={{ width: `${Math.min(100, (totalCost / cargoPrice) * 100)}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-800">
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-xs text-zinc-500 uppercase font-bold">Net Kâr</span>
                                <div className={`text-3xl font-bold ${netProfit > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                    ₺{netProfit.toLocaleString()}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-zinc-500 uppercase font-bold">Marj</span>
                                <div className={`text-xl font-bold ${margin > 15 ? 'text-blue-500' : 'text-zinc-400'}`}>
                                    %{margin.toFixed(1)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
