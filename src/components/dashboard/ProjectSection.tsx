"use client";

import { useState, useMemo } from "react";
import { ProjectControlBar } from "./ProjectControlBar";
import { AnimatedProjectGrid } from "./AnimatedProjectGrid";
import { Search } from "lucide-react";

export function ProjectSection({ initialProjects }: { initialProjects: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === "all" || project.status === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [initialProjects, searchQuery, activeFilter]);

  return (
    <div className="flex flex-col gap-8">
      <ProjectControlBar 
        onSearch={setSearchQuery}
        onFilter={setActiveFilter}
      />

      <AnimatedProjectGrid projects={filteredProjects} />
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-background-main rounded-3xl border-2 border-dashed border-surface-border">
          <div className="max-w-xs mx-auto flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-surface-border/30 flex items-center justify-center text-text-muted">
              <Search size={32} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold text-text-primary tracking-tight">No results found</p>
              <p className="text-sm text-text-secondary font-medium italic">Adjust your filters or try a different search term.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
