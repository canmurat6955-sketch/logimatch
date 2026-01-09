import Sidebar from '@/components/dashboard/Sidebar';

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    return (
        <div className="min-h-screen bg-slate-950 flex font-sans">
            <Sidebar lang={lang} />
            <div className="ml-64 flex-1 flex flex-col min-h-screen">
                <header className="h-16 border-b border-white/5 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-30 px-8 flex items-center justify-between">
                    <h1 className="text-white font-medium">Filo Yönetim Paneli</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            MO
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
