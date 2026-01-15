"use client";

import { useEffect, useState } from "react";
import { LucideCheck, LucideX, LucideUser, LucideSearch, LucideLoader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAdminUsers, updateUserStatus, Profile } from "@/lib/actions/user_admin";

export default function AdminUserManagement() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getAdminUsers();
            setUsers(data || []);
        } catch (error) {
            console.error("Failed to load users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (userId: string, newStatus: 'verified' | 'rejected' | 'banned') => {
        try {
            await updateUserStatus(userId, newStatus);
            // Optimistic update
            setUsers(users.map(u => u.id === userId ? { ...u, verification_status: newStatus } : u));
        } catch (error) {
            alert("İşlem başarısız oldu.");
        }
    };

    const filteredUsers = users.filter(user =>
        (user.first_name + " " + user.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Kullanıcı Yönetimi</h1>
                <div className="text-zinc-500 text-sm">
                    Toplam: <span className="text-white font-bold">{users.length}</span>
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden min-h-[400px]">
                <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
                    <LucideSearch className="w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="İsim, E-posta veya Firma ara..."
                        className="bg-transparent border-none focus:outline-none text-white w-full placeholder:text-zinc-600"
                    />
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64 text-zinc-500 gap-2">
                        <LucideLoader className="w-5 h-5 animate-spin" />
                        Veriler yükleniyor...
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500">
                        Kayıt bulunamadı.
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden lg:block">
                            <table className="w-full text-left text-sm text-zinc-400">
                                <thead className="bg-zinc-950/50 text-zinc-500 uppercase font-medium">
                                    <tr>
                                        <th className="p-4">Kullanıcı</th>
                                        <th className="p-4">Rol</th>
                                        <th className="p-4">Firma</th>
                                        <th className="p-4">Durum</th>
                                        <th className="p-4 text-right">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors">
                                            <td className="p-4">
                                                <div className="font-medium text-white">{user.first_name} {user.last_name}</div>
                                                <div className="text-xs text-zinc-500">{user.email}</div>
                                            </td>
                                            <td className="p-4 capitalize">{user.role?.replace('_', ' ') || '-'}</td>
                                            <td className="p-4 text-white">{user.company_name || '-'}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${user.verification_status === 'verified' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    user.verification_status === 'rejected' || user.verification_status === 'banned' ? 'bg-red-500/10 text-red-500' :
                                                        'bg-yellow-500/10 text-yellow-500'
                                                    }`}>
                                                    {user.verification_status === 'verified' ? 'Onaylı' :
                                                        user.verification_status === 'pending' ? 'Bekliyor' :
                                                            'Engelli'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                {user.verification_status !== 'verified' && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleStatusChange(user.id, 'verified')}
                                                        className="bg-emerald-600 hover:bg-emerald-500 text-white h-8 px-2"
                                                    >
                                                        <LucideCheck className="w-4 h-4 mr-1" /> Onayla
                                                    </Button>
                                                )}
                                                {user.verification_status !== 'banned' && (
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleStatusChange(user.id, 'banned')}
                                                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 px-2"
                                                    >
                                                        <LucideX className="w-4 h-4 mr-1" /> Engelle
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden p-4 space-y-4">
                            {filteredUsers.map((user) => (
                                <div key={user.id} className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl flex flex-col gap-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                                <LucideUser className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">{user.first_name} {user.last_name}</div>
                                                <div className="text-xs text-zinc-500">{user.email}</div>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${user.verification_status === 'verified' ? 'bg-emerald-500/10 text-emerald-500' :
                                            user.verification_status === 'rejected' || user.verification_status === 'banned' ? 'bg-red-500/10 text-red-500' :
                                                'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            {user.verification_status === 'verified' ? 'Onaylı' :
                                                user.verification_status === 'pending' ? 'Bekliyor' :
                                                    'Engelli'}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-xs border-t border-zinc-800/50 pt-3">
                                        <div>
                                            <span className="text-zinc-500 block">Rol</span>
                                            <span className="text-white capitalize">{user.role?.replace('_', ' ') || '-'}</span>
                                        </div>
                                        <div>
                                            <span className="text-zinc-500 block">Firma</span>
                                            <span className="text-white">{user.company_name || '-'}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        {user.verification_status !== 'verified' && (
                                            <Button
                                                size="sm"
                                                onClick={() => handleStatusChange(user.id, 'verified')}
                                                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white h-9"
                                            >
                                                <LucideCheck className="w-4 h-4 mr-2" /> Onayla
                                            </Button>
                                        )}
                                        {user.verification_status !== 'banned' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleStatusChange(user.id, 'banned')}
                                                className="flex-1 border-red-500/20 text-red-500 hover:bg-red-500/10 h-9"
                                            >
                                                <LucideX className="w-4 h-4 mr-2" /> Engelle
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
