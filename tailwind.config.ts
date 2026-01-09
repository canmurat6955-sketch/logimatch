import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#3B82F6", // Blue 500
                    foreground: "#ffffff",
                    50: '#ecf4ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                    950: '#172554',
                },
                secondary: {
                    DEFAULT: "#10B981", // Emerald 500
                    foreground: "#ffffff",
                },
                accent: {
                    DEFAULT: "#8B5CF6", // Violet 500
                    foreground: "#ffffff",
                },
                dark: {
                    900: "#0f172a", // Slate 900
                    800: "#1e293b", // Slate 800
                    700: "#334155", // Slate 700
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config;
