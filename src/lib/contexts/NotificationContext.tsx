'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    read: boolean;
    timestamp: number;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (title: string, message: string, type?: NotificationType) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (title: string, message: string, type: NotificationType = 'info') => {
        const newNotif: Notification = {
            id: Math.random().toString(36).substring(7),
            title,
            message,
            type,
            read: false,
            timestamp: Date.now(),
        };
        setNotifications((prev) => [newNotif, ...prev]);

        // Auto remove toast part after 5 seconds (but keep in history if needed, for now we remove)
        // Ideally we split "Toast" and "History". Let's keep it simple: 
        // We will have a separate "Toasts" state if we want transient popups, 
        // but for now let's treat "notifications" as the persistent history, and we'll use a derived state for toasts.
    };

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    // Simulate some initial notifications for demo
    useEffect(() => {
        if (notifications.length === 0) {
            setTimeout(() => {
                addNotification("Sisteme Hoşgeldiniz", "Haulink v2.0 ekosistemi aktif.", "success");
            }, 1000);
        }
    }, [notifications.length]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                addNotification,
                markAsRead,
                markAllAsRead,
                removeNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}
