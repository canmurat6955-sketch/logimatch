
import { cn } from "@/lib/utils";

// --- Sparkline (Line Chart) ---
export function Sparkline({ data, color = "text-emerald-400", fill = "fill-emerald-400/10", height = 30 }: { data: number[], color?: string, fill?: string, height?: number }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 100;
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d - min) / range) * height;
        return `${x},${y}`;
    }).join(" ");

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            {/* Glow Filter */}
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Fill Area with Gradient Fade */}
            <path d={`M0,${height} ${points} V${height} H0Z`} className={cn("stroke-none transition-all duration-500", fill)} />
            {/* Line with Glow */}
            <polyline
                points={points}
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("stroke-current transition-all duration-500", color)}
                filter="url(#glow)"
            />
        </svg>
    );
}

// --- Donut Chart (Progress Ring) ---
export function DonutChart({ value, max = 100, size = 40, color = "text-blue-500", trackColor = "text-slate-800" }: { value: number, max?: number, size?: number, color?: string, trackColor?: string }) {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / max) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            {/* Glow backing */}
            <div className={cn("absolute inset-0 blur-xl opacity-40 rounded-full", color.replace('text-', 'bg-'))}></div>

            <svg width={size} height={size} viewBox="0 0 40 40" className="-rotate-90 relative z-10">
                <circle cx="20" cy="20" r={radius} strokeWidth="3" fill="transparent" className={cn("stroke-current opacity-30", trackColor)} />
                <circle
                    cx="20" cy="20" r={radius} strokeWidth="3" fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={cn("stroke-current transition-all duration-1000", color)}
                />
            </svg>
            <div className="absolute text-[10px] font-bold text-white z-20">
                {Math.round((value / max) * 100)}%
            </div>
        </div>
    );
}

// --- Tiny Bar Chart ---
export function TinyBarChart({ data, height = 30, activeIndex = -1 }: { data: number[], height?: number, activeIndex?: number }) {
    const max = Math.max(...data);

    return (
        <div className="flex items-end gap-1 h-full" style={{ height }}>
            {data.map((d, i) => (
                <div
                    key={i}
                    className={cn(
                        "w-1.5 rounded-t-sm transition-all duration-500",
                        i === activeIndex || activeIndex === -1 ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-emerald-500/20",
                        d === max ? "bg-emerald-300" : ""
                    )}
                    style={{ height: `${(d / max) * 100}%` }}
                ></div>
            ))}
        </div>
    );
}
