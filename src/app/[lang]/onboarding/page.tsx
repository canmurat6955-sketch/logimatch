"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { LucideTruck, LucidePackage, LucideBuilding2, LucideUpload, LucideCalendar, LucideLoader2 } from "lucide-react";

type RequirementType = "file" | "date";

interface Requirement {
    label: string;
    type: RequirementType;
    key: string; // Unique key for state management
}

const roles = [
    {
        id: "vehicle_owner",
        title: "Araç Sahibi / Şoför",
        icon: LucideTruck,
        description: "Yük arıyorum, aracım var.",
        requirements: [
            { label: "Sürücü Belgesi (Ehliyet)", type: "file", key: "ehliyet" },
            { label: "Kimlik Kartı", type: "file", key: "kimlik" },
            { label: "SRC Belgesi", type: "file", key: "src" },
            { label: "Araç Ruhsatı", type: "file", key: "ruhsat" }
        ] as Requirement[]
    },
    {
        id: "load_owner",
        title: "Yük Sahibi",
        icon: LucidePackage,
        description: "Yüküm var, araç arıyorum.",
        requirements: [
            { label: "Vergi Levhası", type: "file", key: "vergi_levhasi" },
            { label: "İmza Sirküleri", type: "file", key: "imza_sirkusu" }
        ] as Requirement[]
    },
    {
        id: "logistics_company",
        title: "Lojistik Firması",
        icon: LucideBuilding2,
        description: "Hem yüküm var hem filom var.",
        requirements: [
            { label: "Yetki Belgesi", type: "file", key: "yetki_belgesi" },
            { label: "Vergi Levhası", type: "file", key: "vergi_levhasi" },
            { label: "Sürücü Kimlikleri (Örnek)", type: "file", key: "sigorta_date" },
            { label: "Araç Ruhsatları (Örnek)", type: "file", key: "kasko_date" },
            { label: "Sigorta Bitiş Tarihi", type: "date", key: "sigorta_date" },
            { label: "Kasko Bitiş Tarihi", type: "date", key: "kasko_date" }
        ] as Requirement[]
    }
];

export default function OnboardingPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = use(params);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Record<string, File | string>>({});
    const router = useRouter();
    const supabase = createClient();

    const handleInputChange = (key: string, value: File | string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleFinish = async () => {
        if (!selectedRole) return;
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Kullanıcı bulunamadı.");

            // 1. Update Profile Role (Upsert to be safe)
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({ id: user.id, role: selectedRole })
                .select();

            if (profileError) throw profileError;

            // 2. Upload Files & Insert Documents
            const currentRole = roles.find(r => r.id === selectedRole);
            if (currentRole) {
                for (const req of currentRole.requirements) {
                    const value = formData[req.key];
                    if (!value) continue;

                    if (req.type === 'file' && value instanceof File) {
                        const fileExt = value.name.split('.').pop();
                        const fileName = `${user.id}/${req.key}.${fileExt}`;

                        // Upload to Storage
                        const { error: uploadError } = await supabase.storage
                            .from('documents')
                            .upload(fileName, value, { upsert: true });

                        if (uploadError) console.error('Upload failed:', uploadError);

                        // Save Metadata to DB
                        await supabase.from('documents').insert({
                            user_id: user.id,
                            doc_type: req.label,
                            file_url: fileName,
                            status: 'pending'
                        });
                    } else if (req.type === 'date' && typeof value === 'string') {
                        // Save Date as a special 'document' record
                        await supabase.from('documents').insert({
                            user_id: user.id,
                            doc_type: req.label,
                            expiry_date: value,
                            status: 'pending'
                        });
                    }
                }
            }

            router.push(`/${lang}/dashboard`);
            router.refresh();
        } catch (error: any) {
            alert("Bir hata oluştu: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const currentRole = roles.find(r => r.id === selectedRole);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl"
            >
                {step === 1 && (
                    <>
                        <h1 className="text-3xl font-bold text-white text-center mb-4">Ne Olarak Kayıt Oluyorsunuz?</h1>
                        <p className="text-slate-400 text-center mb-10">Size en uygun araçları sunabilmemiz için rolünüzü seçin.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => { setSelectedRole(role.id); setStep(2); }}
                                    className="bg-slate-900/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all p-6 rounded-xl flex flex-col items-center group text-center"
                                >
                                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <role.icon className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{role.title}</h3>
                                    <p className="text-sm text-slate-400">{role.description}</p>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {step === 2 && currentRole && (
                    <>
                        <h1 className="text-3xl font-bold text-white text-center mb-4">Bilgi ve Evrak Girişi</h1>
                        <p className="text-slate-400 text-center mb-8">
                            Seçtiğiniz rol: <span className="text-blue-400 font-semibold">{currentRole.title}</span>.
                            Lütfen aşağıdaki bilgileri eksiksiz doldurun.
                        </p>

                        <div className="space-y-4 max-w-lg mx-auto mb-10">
                            {currentRole.requirements.map((req, index) => (
                                <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-800 p-2 rounded">
                                            {req.type === 'date' ? (
                                                <LucideCalendar className="w-5 h-5 text-emerald-400" />
                                            ) : (
                                                <LucideUpload className="w-5 h-5 text-blue-400" />
                                            )}
                                        </div>
                                        <span className="text-slate-200">{req.label}</span>
                                    </div>

                                    {req.type === 'file' ? (
                                        <div className="flex items-center gap-2">
                                            {formData[req.key] && (
                                                <span className="text-xs text-emerald-400 flex items-center">
                                                    Seçildi
                                                </span>
                                            )}
                                            <label className="cursor-pointer">
                                                <div className="bg-transparent border border-slate-700 text-slate-300 hover:text-white hover:border-white px-3 py-1 rounded text-sm transition-colors">
                                                    Dosya Seç
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => e.target.files?.[0] && handleInputChange(req.key, e.target.files[0])}
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <input
                                            type="date"
                                            onChange={(e) => handleInputChange(req.key, e.target.value)}
                                            className="bg-slate-800 border border-slate-700 text-white rounded px-3 py-1 text-sm focus:border-blue-500 outline-none"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-4">
                            <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-400">
                                Geri Dön
                            </Button>
                            <Button onClick={handleFinish} disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8">
                                {loading ? <LucideLoader2 className="animate-spin mr-2" /> : "Tamamla ve Panele Git"}
                            </Button>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
}
