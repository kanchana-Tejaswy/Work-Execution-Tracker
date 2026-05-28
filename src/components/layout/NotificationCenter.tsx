"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  Zap, 
  ShieldAlert,
  CheckCircle2,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Notification {
  id: string;
  project_id?: string;
  title: string;
  message: string;
  type: 'info' | 'attention' | 'high_priority' | 'critical';
  is_read: boolean;
  created_at: string;
  projects?: { title: string };
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
        setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: id })
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const markAllRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_all_read' })
      });
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'critical': return { icon: <ShieldAlert size={16} />, bg: "bg-status-error/10", border: "border-status-error/20", text: "text-status-error" };
      case 'high_priority': return { icon: <AlertTriangle size={16} />, bg: "bg-primary-warm/10", border: "border-primary-warm/20", text: "text-primary-warm" };
      case 'attention': return { icon: <Zap size={16} />, bg: "bg-primary-accent/10", border: "border-primary-accent/20", text: "text-primary-accent" };
      default: return { icon: <Info size={16} />, bg: "bg-surface", border: "border-surface-border", text: "text-text-muted" };
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 text-text-muted hover:text-text-primary hover:bg-surface rounded-xl transition-all group"
      >
        <Bell size={20} className={cn("transition-transform", isOpen && "scale-110 text-text-primary")} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-error rounded-full ring-2 ring-background-main shadow-soft-glow animate-pulse"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-background-white border border-surface-border rounded-3xl shadow-elevated overflow-hidden z-50 flex flex-col max-h-[85vh]"
          >
            <div className="flex items-center justify-between p-5 border-b border-surface-border bg-background-main/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-text-primary">
                  <Bell size={16} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-primary">Alerts</h3>
              </div>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllRead}
                  className="text-[9px] font-black uppercase tracking-widest text-primary-accent hover:text-primary-accent/80 transition-colors bg-primary-accent/10 px-2 py-1 rounded"
                >
                  Mark All Read
                </button>
              )}
            </div>

            <div className="overflow-y-auto overflow-x-hidden flex-1 p-2 bg-background-white">
              {notifications.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {notifications.map((notification) => {
                    const styles = getTypeStyles(notification.type);
                    return (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "relative p-4 rounded-2xl flex gap-4 group transition-colors",
                          !notification.is_read ? "bg-background-main" : "hover:bg-surface/50"
                        )}
                      >
                        {!notification.is_read && (
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary-accent rounded-full"></div>
                        )}
                        
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border", styles.bg, styles.border, styles.text)}>
                          {styles.icon}
                        </div>
                        
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className="text-xs font-bold text-text-primary truncate">{notification.title}</h4>
                            <span className="text-[9px] font-black text-text-muted uppercase tracking-widest tabular whitespace-nowrap">
                              {new Date(notification.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-text-secondary leading-relaxed font-medium mb-3 line-clamp-2">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between mt-auto">
                            {notification.project_id ? (
                              <Link 
                                href={`/projects/${notification.project_id}`}
                                onClick={() => markAsRead(notification.id)}
                                className="text-[10px] font-black uppercase tracking-widest text-primary-accent hover:underline flex items-center gap-1"
                              >
                                View Context
                              </Link>
                            ) : <span />}

                            {!notification.is_read && (
                              <button 
                                onClick={() => markAsRead(notification.id)}
                                className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-status-success transition-all"
                                title="Mark as read"
                              >
                                <CheckCircle2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center opacity-50">
                  <CheckCircle2 size={40} className="mb-4 text-text-muted" />
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Inbox Zero</p>
                  <p className="text-[10px] text-text-muted mt-1">No operational alerts detected.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
