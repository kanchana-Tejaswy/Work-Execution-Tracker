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
  
  // Don't show app layout on landing page, login, or register
  const isAppPage = pathname !== "/" && !pathname.startsWith('/login') && !pathname.startsWith('/register');

  if (!isAppPage) {
    return <div className="min-h-screen bg-background-main">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-background-main">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        "lg:pl-[240px]"
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
