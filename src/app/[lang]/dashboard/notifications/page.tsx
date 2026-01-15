'use client';

import React, { useEffect, useState } from 'react';
import { NotificationList, Notification } from '@/components/notifications/NotificationList';
import { SupabaseTransportService } from '@/lib/services/supabaseTransport';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Tabs import removed as component is missing

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const transportService = SupabaseTransportService.getInstance();

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        setLoading(true);
        try {
            const data = await transportService.getNotifications();
            setNotifications(data);
        } catch (error) {
            console.error("Failed to load notifications", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await transportService.markNotificationAsRead(id);
            // Optimistic update
            setNotifications(prev => prev.map(n =>
                n.id === id ? { ...n, is_read: true } : n
            ));
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
            if (unreadIds.length === 0) return;

            await Promise.all(unreadIds.map(id => transportService.markNotificationAsRead(id)));

            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    };

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Bildirimler</h1>
                    <p className="text-muted-foreground">Önemli güncellemeler ve uyarılar.</p>
                </div>
                {unreadCount > 0 && (
                    <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
                        Tümünü Okundu İşaretle
                    </Button>
                )}
            </div>

            <div className="grid gap-4">
                {/* Simple integration without Tabs first if Tabs component is missing, 
            but assuming standard UI lib usually has generic tabs or just list. 
            I'll stick to a simple list for now to reduce dependency risk, 
            or check if I can filter client side. */}

                <NotificationList
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    loading={loading}
                />
            </div>
        </div>
    );
}
