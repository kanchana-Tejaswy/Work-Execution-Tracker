"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
  user: any;
}

export function AppLayout({ children, user }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isDemo = user?.profile?.is_demo;
  
  // Don't show app layout on landing page, login, or register
  const isAppPage = pathname !== "/" && !pathname.startsWith('/login') && !pathname.startsWith('/register');

  if (!isAppPage) {
    return <div className="min-h-screen bg-background-main">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-background-main">
      {isDemo && (
        <div className="fixed top-0 left-0 right-0 bg-primary-accent text-white text-[10px] font-bold py-1 text-center z-[100] uppercase tracking-[0.2em] shadow-lg">
          Viewing Demo Mode • Read-Only Environment
        </div>
      )}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        isDemo={isDemo}
      />
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        "lg:pl-[240px]",
        isDemo && "pt-6"
      )}>
        <TopNav 
          onMenuClick={() => setIsSidebarOpen(true)} 
          user={user}
        />
        <main className="flex-1 p-5 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
