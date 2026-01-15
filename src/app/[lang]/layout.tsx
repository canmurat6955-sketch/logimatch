import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/app/globals.css";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/layout/Navbar";
import CommandPaletteProvider from "@/components/layout/CommandPaletteProvider";
import PWAInstaller from "@/components/pwa/PWAInstaller";
import SonnerToaster from "@/components/ui/SonnerToaster";
import { NotificationProvider } from "@/lib/contexts/NotificationContext";
import ToastContainer from "@/components/ui/ToastContainer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "Haulink - Smart Logistics Eco-System",
    description: "Next Generation Logistics SaaS Platform",
};

export async function generateStaticParams() {
    return [{ lang: 'tr' }, { lang: 'en' }, { lang: 'ru' }, { lang: 'it' }, { lang: 'fr' }];
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: any }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <html lang={lang} className={`${inter.variable} ${outfit.variable} dark`}>
            <body className="bg-slate-950 text-slate-50 overflow-x-hidden selection:bg-blue-500/30">
                <NotificationProvider>
                    <PWAInstaller />
                    <SonnerToaster />
                    <CommandPaletteProvider lang={lang} />
                    <ToastContainer />
                    <Navbar dict={dict} lang={lang} />
                    <main className="pt-16 min-h-screen relative">
                        {children}
                    </main>

                    <footer className="bg-slate-950 border-t border-white/5 py-12">
                        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
                            &copy; {new Date().getFullYear()} Logimatch Logistics SaaS.
                        </div>
                    </footer>
                </NotificationProvider>
            </body>
        </html>
    );
}
