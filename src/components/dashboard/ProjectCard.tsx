"use client";

import { ArrowUpRight, Users, Activity, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { RiskIndicatorBadge } from "@/components/ui/RiskIndicatorBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SubmitUpdateModal } from "@/components/projects/SubmitUpdateModal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  progress: number;
  members: number;
  riskLevel: 'low' | 'medium' | 'high';
  aiIntelligence?: any;
}

export function ProjectCard({ id, name, description, progress, members, riskLevel, aiIntelligence }: ProjectCardProps) {
  // Map database values to UI levels
  const uiLevelMap: Record<string, 'GREEN' | 'YELLOW' | 'RED'> = {
    'low': 'GREEN',
    'medium': 'YELLOW',
    'high': 'RED'
  };

  const intelligence = aiIntelligence || {};
  const executionScore = intelligence.execution_score || (riskLevel === 'high' ? 62 : riskLevel === 'medium' ? 78 : 94);
  const prevScore = intelligence.previous_score || executionScore;
  const trend = executionScore > prevScore ? 'up' : executionScore < prevScore ? 'down' : 'stable';
  const healthStatus = intelligence.project_health || 'stable';

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="enterprise-card flex flex-col gap-5 group"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1.5">
          <Link href={`/projects/${id}`} className="font-bold text-text-primary text-base tracking-tight group-hover:text-primary-accent transition-colors hover:underline">
            {name}
          </Link>
          <div className="flex items-center gap-1.5 text-[11px] text-text-muted font-bold uppercase tracking-wider">
            <Clock size={10} />
            <span>Updated recently</span>
          </div>
        </div>
        <div className="shrink-0">
          <RiskIndicatorBadge level={uiLevelMap[riskLevel] || 'GREEN'} />
        </div>
      </div>
      
      <p className="text-text-secondary text-[12px] leading-relaxed line-clamp-2 min-h-[36px] font-medium">
        {description}
      </p>
      
      <div className="grid grid-cols-2 gap-4 py-3 border-y border-surface-border/50">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Execution Score</span>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-sm font-black tabular",
              executionScore > 80 ? "text-status-success" : executionScore > 50 ? "text-status-warning" : "text-status-error"
            )}>{executionScore}</span>
            <div className="flex items-center">
              {trend === 'up' && <TrendingUp size={12} className="text-status-success" />}
              {trend === 'down' && <TrendingDown size={12} className="text-status-error" />}
              {trend === 'stable' && <Minus size={12} className="text-text-muted" />}
            </div>
            <div className="flex-1 h-1.5 bg-surface-border rounded-full overflow-hidden max-w-[40px]">
              <div 
                className={cn(
                  "h-full transition-all duration-1000",
                  executionScore > 80 ? "bg-status-success" : executionScore > 50 ? "bg-status-warning" : "bg-status-error"
                )}
                style={{ width: `${executionScore}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Team Health</span>
          <div className="flex items-center gap-2">
            <Activity size={12} className={cn(
              healthStatus === 'healthy' ? "text-status-success" : healthStatus === 'critical' ? "text-status-error" : "text-status-warning"
            )} />
            <span className="text-xs font-bold text-text-primary uppercase tracking-tight">{healthStatus}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <ProgressBar progress={progress} showLabel />
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-1.5 text-text-secondary text-[11px] font-bold">
            <Users size={12} className="text-text-muted" />
            <span>{members} contributors</span>
          </div>
          <div className="flex items-center gap-1">
            <SubmitUpdateModal projectId={id} projectTitle={name} />
            <Link 
              href={`/projects/${id}`}
              className="text-text-muted hover:text-primary-accent p-2 rounded-lg hover:bg-background-main transition-all block"
              aria-label="View project details"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

