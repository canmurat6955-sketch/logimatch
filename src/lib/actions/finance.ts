"use server";

import { createClient } from "@/lib/supabase/server";

export interface MonthlyStats {
    name: string;
    month: string; // Alias for name
    revenue: number;
    expense: number;
    monthIndex: number; // 0-11 for sorting
}

export interface FinancialSummary {
    chartData: MonthlyStats[];
    monthlyStats: MonthlyStats[];
    totalRevenue: number;
    totalExpense: number;
    netProfit: number;
    profitMargin: number;
    totalProfit: number;
    pendingPayments: number;
    averageMargin: number;
    recentTransactions: any[];
}

export async function getFinancialStats(year: number): Promise<FinancialSummary> {
    const supabase = await createClient();
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    // 1. Fetch Revenue (Loads)
    const { data: loads, error: loadError } = await supabase
        .from('loads')
        .select('price, created_at, status')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

    if (loadError) console.error("Error fetching loads:", loadError);

    // 2. Fetch Expenses
    const { data: expenses, error: expenseError } = await supabase
        .from('expenses')
        .select('amount, date')
        .gte('date', startDate)
        .lte('date', endDate);

    if (expenseError) console.error("Error fetching expenses:", expenseError);

    // 3. Aggregate Data
    const monthlyData: Record<number, { revenue: number; expense: number }> = {};

    // Initialize months
    const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
    for (let i = 0; i < 12; i++) {
        monthlyData[i] = { revenue: 0, expense: 0 };
    }

    // Sum Revenue
    let totalRevenue = 0;
    let pendingRevenue = 0;
    loads?.forEach((load: any) => {
        const month = new Date(load.created_at).getMonth();
        const price = Number(load.price) || 0;
        monthlyData[month].revenue += price;
        totalRevenue += price;

        if (load.status !== 'delivered') { // Assuming 'delivered' means paid for simplicity, or we check 'payment_status' if exists
            // For now, let's assume 'open' or 'assigned' means pending payment
            if (load.status === 'open' || load.status === 'assigned') {
                pendingRevenue += price;
            }
        }
    });

    // Sum Expenses
    let totalExpenses = 0;
    expenses?.forEach((exp: { amount: number; date: string }) => {
        const month = new Date(exp.date).getMonth();
        const amount = Number(exp.amount) || 0;
        monthlyData[month].expense += amount;
        totalExpenses += amount;
    });

    // Format for Recharts
    const chartData = Object.keys(monthlyData).map(key => {
        const i = Number(key);
        return {
            name: monthNames[i],
            month: monthNames[i],
            revenue: monthlyData[i].revenue,
            expense: monthlyData[i].expense,
            monthIndex: i
        };
    });

    // KPI Calculations
    const totalProfit = totalRevenue - totalExpenses;
    const margin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    // TODO: Implement real transaction fetching
    const recentTransactions = [
        { type: 'income', category: 'Lojistik', description: 'Yük Teslimatı (L-6612)', amount: 12500, status: 'completed', date: '2026-01-12' },
        { type: 'expense', category: 'Yakıt', description: 'Shell İstasyon #123', amount: 4500, status: 'completed', date: '2026-01-11' }
    ];

    return {
        chartData, // Keeping this for charts that might use it
        monthlyStats: chartData, // Alias for page compatibility
        totalRevenue,
        totalExpense: totalExpenses,
        netProfit: totalProfit,
        profitMargin: Number(margin.toFixed(1)),
        totalProfit, // Duplicate
        pendingPayments: pendingRevenue,
        averageMargin: Number(margin.toFixed(1)), // Duplicate
        recentTransactions: recentTransactions as any
    };
}
