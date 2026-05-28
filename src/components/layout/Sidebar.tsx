"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  History, 
  BarChart3, 
  Settings,
  LogOut,
  ShieldCheck,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/services/auth/auth.service";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Projects", icon: FolderKanban, href: "/projects" },
  { name: "Activity Logs", icon: History, href: "/activity" },
  { name: "AI Reports", icon: BarChart3, href: "/reports" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isDemo?: boolean;
}

export function Sidebar({ isOpen, onClose, isDemo }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 h-screen w-[260px] glass-panel z-50 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary-accent rounded-xl flex items-center justify-center shadow-soft-glow rotate-3 group-hover:rotate-0 transition-transform">
                <ShieldCheck className="text-white w-5 h-5" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-text-primary">WET<span className="text-primary-accent">.</span></span>
            </div>
            {isDemo && (
              <span className="demo-badge w-fit">Guest Access</span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-text-muted hover:text-text-primary p-2 rounded-full hover:bg-surface transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-6 mt-6 space-y-2.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-300",
                  isActive 
                    ? "nav-item-active" 
                    : "text-text-secondary hover:bg-surface hover:text-text-primary"
                )}
              >
                <item.icon size={19} className={cn(isActive ? "text-white" : "text-text-muted group-hover:text-text-primary")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <form action={logout}>
            <button 
              type="submit"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-text-secondary hover:bg-status-error/5 hover:text-status-error transition-all duration-300 group"
            >
              <LogOut size={18} className="text-text-muted group-hover:text-status-error" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
