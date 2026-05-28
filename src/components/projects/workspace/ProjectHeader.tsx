"use client";

import { RiskIndicatorBadge } from "@/components/ui/RiskIndicatorBadge";
import { 
  Settings, 
  Plus, 
  BarChart3, 
  ArrowLeft,
  Calendar,
  Users,
  Target
} from "lucide-react";
import Link from "next/link";
import { SubmitUpdateModal } from "../SubmitUpdateModal";
import { cn } from "@/lib/utils";

interface ProjectHeaderProps {
  project: any;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const uiLevelMap: Record<string, 'GREEN' | 'YELLOW' | 'RED'> = {
    'low': 'GREEN',
    'medium': 'YELLOW',
    'high': 'RED',
    'active': 'GREEN',
    'at_risk': 'YELLOW',
    'delayed': 'RED'
  };

  return (
    <div className="flex flex-col gap-8 pb-8 border-b border-surface-border animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between">
        <Link 
          href="/projects" 
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-primary-accent transition-all"
        >
          <div className="p-1 rounded-md bg-surface group-hover:bg-primary-accent/10 transition-colors">
            <ArrowLeft size={12} />
          </div>
          Back to Portfolio
        </Link>

        <div className="flex items-center gap-3">
          <button className="btn-outline h-9 px-4 text-[10px] font-bold uppercase tracking-widest gap-2">
            <Settings size={14} />
            Configure
          </button>
          <SubmitUpdateModal 
            projectId={project.id} 
            projectTitle={project.title}
            trigger={
              <button className="btn-accent h-9 px-4 text-[10px] font-bold uppercase tracking-widest gap-2 shadow-soft-glow">
                <Plus size={14} />
                Submit Signal
              </button>
            }
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap">
            <RiskIndicatorBadge level={(project.status && uiLevelMap[project.status]) || 'GREEN'} />
            <div className="h-4 w-px bg-surface-border mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface rounded-md border border-surface-border">
              <Calendar size={12} className="text-text-muted" />
              <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">
                {project.due_date ? new Date(project.due_date).toLocaleDateString() : 'Continuous'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface rounded-md border border-surface-border">
              <Users size={12} className="text-text-muted" />
              <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">
                {project.project_members?.length || 0} Members
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-text-primary leading-tight">
              {project.title}
            </h1>
            <p className="text-text-secondary text-base font-medium leading-relaxed opacity-80">
              {project.description || "No description provided for this operational unit."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8 px-8 py-5 bg-background-main border-2 border-surface-border rounded-3xl relative overflow-hidden group hover:border-primary-accent/20 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-accent opacity-20 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.25em]">Execution</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-text-primary tracking-tighter">{project.progress}%</span>
            </div>
          </div>

          <div className="h-10 w-px bg-surface-border"></div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.25em]">Intelligence</span>
            <div className="flex items-center gap-1.5">
              <Target size={18} className="text-primary-accent" />
              <span className="text-3xl font-black text-text-primary tracking-tighter">
                {project.ai_reports?.[0]?.metadata?.execution_score || 88}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
