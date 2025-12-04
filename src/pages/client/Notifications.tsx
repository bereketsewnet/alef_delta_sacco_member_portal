// Notifications Page
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, CheckCircle2, Info, AlertTriangle, XCircle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { api, mockNotifications } from '@/lib/api';
import { cn } from '@/lib/utils';
import type { Notification } from '@/types';

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-ET', { month: 'short', day: 'numeric' });
};

const notificationTypeConfig: Record<Notification['type'], { icon: React.ReactNode; colorClass: string }> = {
  SUCCESS: { icon: <CheckCircle2 className="h-5 w-5" />, colorClass: 'bg-success/10 text-success' },
  INFO: { icon: <Info className="h-5 w-5" />, colorClass: 'bg-primary/10 text-primary' },
  WARNING: { icon: <AlertTriangle className="h-5 w-5" />, colorClass: 'bg-warning/10 text-warning' },
  ERROR: { icon: <XCircle className="h-5 w-5" />, colorClass: 'bg-destructive/10 text-destructive' },
};

export default function Notifications() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.client.getNotifications(),
    initialData: mockNotifications,
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => api.client.markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markReadMutation.mutate(notification.id);
    }
    
    // Navigate to resource if available
    if (notification.resource_type && notification.resource_id) {
      switch (notification.resource_type) {
        case 'transaction':
          navigate('/client/accounts');
          break;
        case 'loan':
          navigate(`/client/loans/${notification.resource_id}`);
          break;
        case 'request':
          navigate('/client/requests');
          break;
      }
    }
  };

  const handleMarkAllRead = () => {
    notifications?.filter(n => !n.read).forEach(n => {
      markReadMutation.mutate(n.id);
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-4 p-4 max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{t('notifications.title')}</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              {t('notifications.mark_all_read')}
            </Button>
          )}
        </div>
      </header>

      <main className="px-4 py-4 max-w-3xl mx-auto">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 shimmer rounded-xl" />
            ))}
          </div>
        ) : notifications?.length === 0 ? (
          <div className="p-8 text-center bg-card rounded-xl border border-border/50">
            <Bell className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">{t('notifications.no_notifications')}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications?.map((notification, i) => {
              const config = notificationTypeConfig[notification.type];
              return (
                <motion.button
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => handleNotificationClick(notification)}
                  className={cn(
                    "w-full text-left bg-card rounded-xl border border-border/50 p-4 transition-all hover:shadow-sm",
                    !notification.read && "bg-primary/5 border-primary/20"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={cn("p-2 rounded-lg shrink-0", config.colorClass)}>
                      {config.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={cn(
                          "font-medium",
                          !notification.read && "text-primary"
                        )}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(notification.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                    
                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
