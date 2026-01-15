'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

export default function MapAnimation() {
    const id = useId();

    // Major Hubs coordinates (approximate % on a 100x100 grid)
    const hubs = [
        { name: 'NY', x: 28, y: 35 },
        { name: 'LON', x: 48, y: 28 },
        { name: 'IST', x: 54, y: 32 },
        { name: 'DXB', x: 60, y: 40 },
        { name: 'SGP', x: 78, y: 55 },
        { name: 'TOK', x: 88, y: 35 },
        { name: 'LA', x: 15, y: 38 },
        { name: 'BER', x: 50, y: 29 },
    ];

    // Routes to animate
    const routes = [
        { from: 'IST', to: 'BER' },
        { from: 'IST', to: 'DXB' },
        { from: 'IST', to: 'LON' },
        { from: 'NY', to: 'LON' },
        { from: 'TOK', to: 'SGP' },
        { from: 'DXB', to: 'SGP' },
        { from: 'LA', to: 'NY' },
        { from: 'BER', to: 'NY' },
    ];

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full opacity-60"
            >
                <defs>
                    <radialGradient id={`${id}-gradient`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Grid Lines for "Tech" feel */}
                <pattern id={`${id}-grid`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-slate-800" />
                </pattern>
                <rect width="100" height="100" fill={`url(#${id}-grid)`} />

                {/* Hubs */}
                {hubs.map((hub, i) => (
                    <g key={hub.name}>
                        <motion.circle
                            cx={hub.x}
                            cy={hub.y}
                            r="0.5"
                            className="fill-blue-500"
                            initial={{ opacity: 0.2, scale: 0.5 }}
                            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        />
                        <circle cx={hub.x} cy={hub.y} r="2" fill={`url(#${id}-gradient)`} />
                    </g>
                ))}

                {/* Routes (Arcs) */}
                {routes.map((route, i) => {
                    const start = hubs.find(h => h.name === route.from)!;
                    const end = hubs.find(h => h.name === route.to)!;

                    // Simple quadratic bezier curve for arc effect
                    // Control point is midway X, but higher Y (lower value) to create arc
                    const midX = (start.x + end.x) / 2;
                    const midY = Math.min(start.y, end.y) - 10; // Arch upward

                    const pathD = `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;

                    return (
                        <g key={`${route.from}-${route.to}`}>
                            {/* Base Path */}
                            <path
                                d={pathD}
                                fill="none"
                                stroke="url(#line-gradient)"
                                strokeWidth="0.1"
                                className="text-slate-700 opacity-20"
                            />

                            {/* Animated Particle */}
                            <motion.circle
                                r="0.4"
                                fill="#60a5fa"
                                initial={{ offsetDistance: "0%" }}
                                animate={{ offsetDistance: "100%" }}
                                style={{ offsetPath: `path('${pathD}')` }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 2
                                }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* World Map Silhouette (Simplified SVG) */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
        </div>
    );
}
