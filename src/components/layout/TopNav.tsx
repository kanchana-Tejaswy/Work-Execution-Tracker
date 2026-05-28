import { Bell, Search, UserCircle, LogOut, Menu, Moon, Sun } from "lucide-react";
import { logout } from "@/services/auth/auth.service";
import { useState, useEffect } from "react";

interface TopNavProps {
  onMenuClick?: () => void;
  user?: any; // We'll pass user as a prop since it's now a client component
}

export function TopNav({ onMenuClick, user }: TopNavProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const darkMode = localStorage.getItem('theme') === 'dark' || 
                    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(darkMode);
    if (darkMode) document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  return (
    <header className="h-20 glass-panel sticky top-0 z-40 px-6 sm:px-12 flex items-center justify-between border-b-0">
      <div className="flex items-center gap-6 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden h-10 w-10 flex items-center justify-center text-text-secondary hover:text-primary-accent transition-colors bg-surface rounded-xl"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        
        <div className="relative w-full max-w-md hidden lg:block h-11">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <input 
            type="text" 
            placeholder="Search operational data..." 
            aria-label="Search resources"
            className="input-field w-full h-full pl-11 !bg-surface/50 border-0 focus:!bg-background-white transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6 h-11">
        <button 
          onClick={toggleDarkMode}
          className="h-11 w-11 flex items-center justify-center text-text-secondary hover:text-primary-accent transition-all bg-surface rounded-xl group"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button 
          className="h-11 w-11 flex items-center justify-center text-text-secondary hover:text-primary-accent transition-all relative bg-surface rounded-xl group"
          aria-label="View notifications"
        >
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-primary-warm rounded-full border-2 border-background-white"></span>
        </button>

        <div className="flex items-center gap-4 pl-4 border-l border-surface-border h-11">
          <div className="text-right hidden sm:flex flex-col justify-center">
            <p className="text-xs font-black text-text-primary leading-none">
              {user?.profile?.full_name || user?.email || 'Guest Participant'}
            </p>
            <p className="text-[10px] font-bold text-primary-accent mt-1.5 uppercase tracking-widest leading-none">
              {user?.profile?.role || 'Stakeholder'}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-surface border-2 border-background-white shadow-paper flex items-center justify-center text-text-muted overflow-hidden shrink-0">
            <UserCircle size={32} />
          </div>
          <form action={logout} className="hidden lg:block">
            <button className="h-11 w-11 flex items-center justify-center text-text-muted hover:text-status-error transition-all rounded-xl hover:bg-status-error/5" title="Sign Out">
              <LogOut size={20} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

