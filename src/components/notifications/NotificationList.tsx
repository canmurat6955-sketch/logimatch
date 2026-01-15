'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Info, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a utils file for class merging

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    is_read: boolean;
    created_at: string;
}

interface NotificationListProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    loading?: boolean;
}

export function NotificationList({ notifications, onMarkAsRead, loading }: NotificationListProps) {
    if (loading) {
        return <div className="p-4 text-center">Loading notifications...</div>;
    }

    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                <Bell className="h-12 w-12 mb-4 opacity-20" />
                <p>No notifications yet</p>
            </div>
        );
    }

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
            case 'success': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
            default: return <Info className="h-5 w-5 text-blue-500" />;
        }
    };

    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <Card key={notification.id} className={cn("transition-colors", notification.is_read ? "bg-background" : "bg-muted/30 border-l-4 border-l-primary")}>
                    <div className="flex items-start p-4 gap-4">
                        <div className="mt-1">
                            {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm">{notification.title}</h4>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(notification.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {notification.message}
                            </p>
                        </div>
                        {!notification.is_read && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onMarkAsRead(notification.id)}
                                title="Mark as read"
                                className="h-8 w-8"
                            >
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Mark as read</span>
                            </Button>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
}
