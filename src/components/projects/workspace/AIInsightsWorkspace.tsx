"use client";

import { 
  BrainCircuit, 
  Target, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles,
  Zap,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightsWorkspaceProps {
  project: any;
}

export function AIInsightsWorkspace({ project }: AIInsightsWorkspaceProps) {
  const latestReport = project.ai_reports?.[0] || {};
  const metadata = latestReport.metadata || {};
  
  const accomplishments = metadata.completed_work || [];
  const risks = metadata.pending_work || [];
  const recommendations = metadata.recommendations || [];
  const patterns = metadata.behavioral_patterns || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 p-4 bg-primary-accent/5 rounded-2xl border border-primary-accent/10 mb-2">
        <Sparkles size={18} className="text-primary-accent animate-pulse" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-primary-accent uppercase tracking-widest">Active Intelligence</span>
          <p className="text-xs font-bold text-text-primary">Continuous observation active for {project.title}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Risk Analysis Card */}
        <div className="bg-background-white p-6 rounded-[2rem] border border-surface-border shadow-paper">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle size={16} className="text-primary-warm" />
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Operational Risks</h4>
          </div>
          
          <div className="space-y-4">
            {risks.length > 0 ? risks.map((risk: string, idx: number) => (
              <div key={idx} className="flex gap-4 p-4 bg-background-main rounded-2xl border border-surface-border group hover:border-primary-warm/30 transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary-warm mt-1.5 shrink-0 group-hover:scale-125 transition-transform"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-text-primary">{risk}</span>
                  <span className="text-[10px] font-medium text-text-secondary opacity-70">Impact: High Probability of minor delay</span>
                </div>
              </div>
            )) : (
              <div className="p-4 text-center bg-surface/50 rounded-2xl border border-dashed border-surface-border">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">No active risks detected</p>
              </div>
            )}
          </div>
        </div>

        {/* Behavioral Patterns */}
        <div className="bg-background-white p-6 rounded-[2rem] border border-surface-border shadow-paper">
          <div className="flex items-center gap-2 mb-6">
            <BrainCircuit size={16} className="text-primary-accent" />
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Team Dynamics</h4>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {patterns.length > 0 ? patterns.map((pattern: string, idx: number) => (
              <div key={idx} className="px-4 py-2 bg-surface rounded-xl border border-surface-border flex items-center gap-2 group hover:bg-primary-accent hover:text-white transition-all cursor-default">
                <Zap size={10} className="text-primary-accent group-hover:text-white" />
                <span className="text-[10px] font-black uppercase tracking-tighter">{pattern}</span>
              </div>
            )) : (
              <span className="text-[10px] font-bold text-text-muted italic">Insufficient data for pattern analysis.</span>
            )}
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="bg-primary text-white p-8 rounded-[2rem] shadow-elevated relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <Target size={16} className="text-primary-accent" />
              <h4 className="text-xs font-black uppercase tracking-[0.2em]">Manager Intervention</h4>
            </div>

            <div className="space-y-6">
              {recommendations.map((rec: string, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black">{idx + 1}</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed opacity-90">{rec}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <TrendingUp size={120} />
          </div>
        </div>
      </div>
    </div>
  );
}
