export interface RouteParams {
    origin: string;
    destination: string;
    weight: number; // kg
    type: 'FTL' | 'LTL'; // Full Truck / Less than Truck
}

export interface PriceEstimate {
    min: number;
    max: number;
    distance: number;
    currency: string;
    confidence: 'High' | 'Medium' | 'Low';
    emissions: number; // kg CO2
    breakdown: {
        fuel: number;
        driver: number;
        toll: number;
        margin: number;
    }
}

// Mock distances between common hubs (km)
const DISTANCE_MATRIX: Record<string, number> = {
    'istanbul-ankara': 450,
    'istanbul-izmir': 480,
    'istanbul-munich': 1900,
    'istanbul-berlin': 2200,
    'istanbul-london': 3000,
    'ankara-izmir': 600,
};

export async function calculateSmartPrice(params: RouteParams): Promise<PriceEstimate> {
    // Simulate API delay for "Thinking" effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 1. Determine Distance (Mock or Approx)
    const key = `${params.origin.toLowerCase().split(' ')[0]}-${params.destination.toLowerCase().split(' ')[0]}`;
    const reverseKey = `${params.destination.toLowerCase().split(' ')[0]}-${params.origin.toLowerCase().split(' ')[0]}`;

    // Default to a long haul average if not in matrix
    let distance = DISTANCE_MATRIX[key] || DISTANCE_MATRIX[reverseKey] || 1000;

    // 2. Base Costs
    const FUEL_PRICE_EUR = 1.5;
    const FUEL_CONS_PER_100KM = 30; // Liters (Truck)

    let fuelCost = (distance / 100) * FUEL_CONS_PER_100KM * FUEL_PRICE_EUR;
    let driverCost = distance * 0.4; // 0.40 EUR per km
    let tollCost = distance * 0.15; // Average toll

    let baseCost = fuelCost + driverCost + tollCost;

    // 3. Margin & Factors
    const MARGIN = 0.20; // 20%
    let total = baseCost * (1 + MARGIN);

    // Apply complexity
    if (params.type === 'LTL') total *= 0.6; // Less than truckload is cheaper per shipment but more expensive per kg effectively. Simplified here.

    // 4. CO2 Calculation (Green Logistics)
    // Formula: Distance (km) * Weight (ton) * Factor (kgCO2/tkm)
    // Factor ~0.062 for modern Euro 6 Diesel Truck
    const weightInTons = params.weight / 1000;
    const emissionFactor = 0.062;
    const co2Emission = Math.round(distance * weightInTons * emissionFactor);

    // 5. Create Range
    const min = Math.floor(total * 0.95 / 10) * 10;
    const max = Math.ceil(total * 1.05 / 10) * 10;

    return {
        min,
        max,
        distance,
        currency: 'EUR',
        confidence: distance === 1000 ? 'Low' : 'High', // Low confidence if using default distance
        emissions: co2Emission,
        breakdown: {
            fuel: Math.round(fuelCost),
            driver: Math.round(driverCost),
            toll: Math.round(tollCost),
            margin: Math.round(total - baseCost)
        }
    };
}
