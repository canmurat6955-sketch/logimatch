import RoleSelection from '@/components/auth/RoleSelection';
import LoadOwnerView from '@/components/dashboard/roles/LoadOwnerView';
import VehicleOwnerView from '@/components/dashboard/roles/VehicleOwnerView';
import EnterpriseView from '@/components/dashboard/roles/EnterpriseView';

export default async function DashboardPage({
    searchParams,
    params
}: {
    searchParams: Promise<{ role?: string }>;
    params: Promise<{ lang: string }>;
}) {
    const resolvedSearchParams = await searchParams;
    const { lang } = await params;
    const role = resolvedSearchParams?.role;

    if (!role) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl text-slate-400 mb-4">Lütfen Görünüm Seçiniz</h2>
                    <div className="p-8 rounded-xl bg-slate-900 border border-white/5">
                        <RoleSelection lang={lang} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            {role === 'load_owner' && <LoadOwnerView />}
            {role === 'vehicle_owner' && <VehicleOwnerView />}
            {role === 'logistics_company' && <EnterpriseView />}

            {!['load_owner', 'vehicle_owner', 'logistics_company'].includes(role) && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-center text-red-400 mt-20">
                    Geçersiz Rol Seçimi. Lütfen tekrar deneyiniz.
                </div>
            )}
        </div>
    );
}
