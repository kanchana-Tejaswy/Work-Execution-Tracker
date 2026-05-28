"use client";

import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectControlBarProps {
  onSearch: (query: string) => void;
  onFilter: (status: string) => void;
}

export function ProjectControlBar({ onSearch, onFilter }: ProjectControlBarProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleFilterClick = (status: string) => {
    const nextFilter = activeFilter === status ? "all" : status;
    setActiveFilter(nextFilter);
    onFilter(nextFilter);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-2">
      <div className="relative flex-1 max-w-lg group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-accent transition-colors" size={18} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, teams, or leads (Cmd + K)..." 
          className="input-field w-full pl-12 pr-10 h-12 bg-background-white border-surface-border focus:ring-4 focus:ring-primary-accent/5"
        />
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex bg-background-white p-1 rounded-xl border border-surface-border shadow-sm">
          {['all', 'active', 'at_risk', 'delayed'].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterClick(status)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                activeFilter === status 
                  ? "bg-primary-accent text-white shadow-soft-glow" 
                  : "text-text-secondary hover:bg-background-main hover:text-text-primary"
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
        
        <button className="btn-outline h-10 w-10 p-0 flex items-center justify-center rounded-xl">
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
