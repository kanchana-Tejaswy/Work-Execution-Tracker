"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, FileText, UserCircle, Target, ArrowRight, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchResults {
  projects: any[];
  updates: any[];
  users: any[];
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({ projects: [], updates: [], users: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!isOpen) return;
    if (query.length < 2) {
      setResults({ projects: [], updates: [], users: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setSelectedIndex(0);
        }
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery("");
      setResults({ projects: [], updates: [], users: [] });
    }
  }, [isOpen]);

  const allItems = [
    ...results.projects.map(p => ({ ...p, _type: 'project' })),
    ...results.updates.map(u => ({ ...u, _type: 'update' })),
    ...results.users.map(u => ({ ...u, _type: 'user' }))
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (allItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % allItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = allItems[selectedIndex];
      if (selected) {
        if (selected._type === 'project') router.push(`/projects/${selected.id}`);
        if (selected._type === 'update') router.push(`/projects/${selected.project_id}`);
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <div 
        className="relative w-full max-w-md hidden lg:block h-11 group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-primary-accent transition-colors" size={16} />
        <div className="input-field w-full h-full pl-11 !bg-surface/50 border-0 flex items-center justify-between text-text-muted transition-all group-hover:!bg-background-white group-hover:shadow-subtle">
          <span className="text-sm">Search operational data...</span>
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-background-main border border-surface-border rounded-md text-[10px] font-black uppercase tracking-widest">⌘K</kbd>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32 px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-background-white rounded-[2rem] shadow-elevated border border-surface-border overflow-hidden relative z-10 flex flex-col max-h-[70vh]"
            >
              {/* Search Input */}
              <div className="relative flex items-center p-6 border-b border-surface-border shrink-0">
                <Search className="absolute left-6 text-primary-accent" size={24} />
                <input 
                  ref={inputRef}
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search projects, updates, team members..." 
                  className="w-full pl-12 pr-4 bg-transparent border-0 text-lg font-medium text-text-primary focus:outline-none placeholder:text-text-muted/60"
                />
                {isSearching && (
                  <Loader2 className="absolute right-6 animate-spin text-text-muted" size={20} />
                )}
                {!isSearching && query.length > 0 && (
                  <button onClick={() => setQuery("")} className="absolute right-6 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-text-primary px-2 py-1 bg-surface rounded">Clear</button>
                )}
              </div>

              {/* Results Area */}
              <div className="overflow-y-auto flex-1 p-2">
                {query.length < 2 ? (
                  <div className="p-8 flex flex-col items-center justify-center text-center opacity-50">
                    <Target className="mb-4 text-text-muted" size={40} />
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Global Discovery</p>
                    <p className="text-[10px] text-text-muted mt-2">Type to search across all operational data.</p>
                  </div>
                ) : allItems.length === 0 && !isSearching ? (
                  <div className="p-8 text-center opacity-50">
                    <p className="text-sm font-medium text-text-secondary">No results found for &quot;{query}&quot;</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 p-2">
                    {/* Projects Section */}
                    {results.projects.length > 0 && (
                      <div className="mb-4">
                        <h4 className="px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Projects</h4>
                        {results.projects.map((project, idx) => {
                          const globalIdx = allItems.findIndex(i => i.id === project.id && i._type === 'project');
                          const isSelected = globalIdx === selectedIndex;
                          return (
                            <Link 
                              key={project.id} 
                              href={`/projects/${project.id}`}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "flex items-center justify-between p-3 mx-2 rounded-xl transition-colors",
                                isSelected ? "bg-primary-accent/10 text-primary-accent" : "hover:bg-surface"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <Target size={16} className={isSelected ? "text-primary-accent" : "text-text-secondary"} />
                                <span className="text-sm font-bold truncate">{project.title}</span>
                              </div>
                              <span className={cn(
                                "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded",
                                project.status === 'at_risk' || project.status === 'delayed' ? "bg-status-error/10 text-status-error" : "bg-status-success/10 text-status-success"
                              )}>{project.status?.replace('_', ' ')}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {/* Updates Section */}
                    {results.updates.length > 0 && (
                      <div className="mb-4">
                        <h4 className="px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Execution Signals</h4>
                        {results.updates.map((update, idx) => {
                          const globalIdx = allItems.findIndex(i => i.id === update.id && i._type === 'update');
                          const isSelected = globalIdx === selectedIndex;
                          return (
                            <Link 
                              key={update.id} 
                              href={`/projects/${update.project_id}`}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "flex flex-col gap-1 p-3 mx-2 rounded-xl transition-colors",
                                isSelected ? "bg-primary-accent/10 text-primary-accent" : "hover:bg-surface"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <FileText size={14} className="text-text-muted" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">In {update.projects?.title}</span>
                                <span className="text-[9px] text-text-muted ml-auto"><Clock size={10} className="inline mr-1"/>{new Date(update.created_at).toLocaleDateString()}</span>
                              </div>
                              <p className="text-xs font-medium pl-6 line-clamp-1">{update.update_text}</p>
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {/* Users Section */}
                    {results.users.length > 0 && (
                      <div className="mb-2">
                        <h4 className="px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Team Members</h4>
                        {results.users.map((user, idx) => {
                          const globalIdx = allItems.findIndex(i => i.id === user.id && i._type === 'user');
                          const isSelected = globalIdx === selectedIndex;
                          return (
                            <div 
                              key={user.id} 
                              className={cn(
                                "flex items-center justify-between p-3 mx-2 rounded-xl transition-colors cursor-default",
                                isSelected ? "bg-primary-accent/10 text-primary-accent" : "hover:bg-surface"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <UserCircle size={16} className={isSelected ? "text-primary-accent" : "text-text-secondary"} />
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold">{user.full_name || 'Anonymous User'}</span>
                                  <span className="text-[10px] text-text-muted">{user.email}</span>
                                </div>
                              </div>
                              <span className="text-[9px] font-black uppercase tracking-widest bg-background-main px-2 py-1 rounded border border-surface-border">{user.role}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-surface-border bg-background-main shrink-0 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-background-white border border-surface-border rounded shadow-sm">↑</kbd><kbd className="px-1.5 py-0.5 bg-background-white border border-surface-border rounded shadow-sm">↓</kbd> Navigate</span>
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-background-white border border-surface-border rounded shadow-sm">↵</kbd> Select</span>
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-background-white border border-surface-border rounded shadow-sm">ESC</kbd> Close</span>
                </div>
                <div className="text-[9px] font-black text-primary-accent uppercase tracking-[0.2em] flex items-center gap-1">
                  <Sparkles size={10} /> Smart Indexed
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
