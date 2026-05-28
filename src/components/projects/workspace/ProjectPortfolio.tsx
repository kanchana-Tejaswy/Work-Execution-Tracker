"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Search, Filter, SortDesc, Target, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectPortfolioProps {
  initialProjects: any[];
}

type SortOption = 'active' | 'risk' | 'deadline' | 'updated' | 'score' | 'progress';
type FilterOption = 'all' | 'active' | 'at_risk' | 'delayed' | 'completed';

export function ProjectPortfolio({ initialProjects }: ProjectPortfolioProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>('active');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...initialProjects];

    // 1. Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Filter
    if (filterBy !== 'all') {
      result = result.filter(p => p.status === filterBy);
    }

    // 3. Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'active':
          // Sort by most recently updated
          const aLatest = a.project_updates?.[0]?.created_at || a.created_at;
          const bLatest = b.project_updates?.[0]?.created_at || b.created_at;
          return new Date(bLatest).getTime() - new Date(aLatest).getTime();
        case 'risk':
          // Simplified: delayed > at_risk > active > completed
          const riskWeight: Record<string, number> = { delayed: 3, at_risk: 2, active: 1, completed: 0 };
          return (riskWeight[b.status] || 0) - (riskWeight[a.status] || 0);
        case 'deadline':
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        case 'score':
          const aScore = a.ai_intelligence?.execution_score || 0;
          const bScore = b.ai_intelligence?.execution_score || 0;
          return bScore - aScore;
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [initialProjects, searchQuery, sortBy, filterBy]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background-white p-2 rounded-[1.5rem] border border-surface-border shadow-paper">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search portfolio..." 
              className="input-field w-full pl-12 h-12 bg-transparent border-0 focus:!bg-transparent text-sm font-bold"
            />
          </div>
          
          <div className="flex items-center gap-2 pr-2">
            <div className="h-8 w-px bg-surface-border mx-2 hidden md:block"></div>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="input-field h-10 border-0 bg-background-main hover:bg-surface text-[10px] font-black uppercase tracking-widest text-text-primary cursor-pointer transition-colors"
            >
              <option value="active">Sort: Most Active</option>
              <option value="risk">Sort: Highest Risk</option>
              <option value="deadline">Sort: Nearest Deadline</option>
              <option value="score">Sort: AI Score</option>
              <option value="progress">Sort: Progress %</option>
            </select>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border border-surface-border",
                showFilters || filterBy !== 'all' ? "bg-primary-accent text-white border-primary-accent" : "bg-background-main hover:bg-surface text-text-primary"
              )}
            >
              <Filter size={14} />
              Filter {filterBy !== 'all' && "• Active"}
            </button>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-background-white border border-surface-border rounded-3xl shadow-subtle flex flex-wrap gap-6 items-center">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em]">Operational Status</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { val: 'all', label: 'All Projects' },
                      { val: 'active', label: 'Stable Active' },
                      { val: 'at_risk', label: 'At Risk' },
                      { val: 'delayed', label: 'Delayed / Blocked' },
                      { val: 'completed', label: 'Completed' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setFilterBy(opt.val as FilterOption)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                          filterBy === opt.val 
                            ? "bg-text-primary text-background-main border-text-primary shadow-elevated" 
                            : "bg-surface border-surface-border text-text-secondary hover:text-text-primary hover:border-text-primary/20"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* AI Hint */}
                <div className="ml-auto p-4 bg-primary-accent/5 rounded-2xl border border-primary-accent/10 flex items-center gap-3">
                  <Target size={16} className="text-primary-accent" />
                  <p className="text-xs font-bold text-text-primary">
                    AI suggests focusing on <span className="text-status-error underline decoration-status-error/30">Delayed</span> projects first.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAndSortedProjects.map((project: any) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={project.id}
            >
              <ProjectCard 
                id={project.id}
                name={project.title}
                description={project.description || ""}
                progress={project.progress}
                members={project.project_members.length}
                riskLevel={(project.status as any) || "low"}
                aiIntelligence={project.ai_intelligence}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredAndSortedProjects.length === 0 && (
          <div className="col-span-full text-center py-24 bg-background-main rounded-[2rem] border-2 border-dashed border-surface-border">
            <AlertTriangle className="mx-auto text-text-muted mb-4 opacity-20" size={48} />
            <p className="text-sm text-text-secondary font-bold uppercase tracking-widest">No matching operations found.</p>
            <p className="text-xs text-text-muted mt-2">Adjust your filters or search query to discover projects.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
