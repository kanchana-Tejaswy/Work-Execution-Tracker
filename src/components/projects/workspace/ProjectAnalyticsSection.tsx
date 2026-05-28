"use client";

import { 
  Users, 
  Activity, 
  TrendingUp, 
  BarChart3,
  Calendar,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectAnalyticsSectionProps {
  project: any;
}

export function ProjectAnalyticsSection({ project }: ProjectAnalyticsSectionProps) {
  // Derived data for charts (mocked for visual fidelity)
  const velocityData = [40, 45, 30, 65, 75, 88, 92]; // 7-day velocity
  const activityData = [12, 8, 15, 22, 18, 25, 20]; // 7-day update count

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Execution Velocity Chart */}
      <div className="bg-background-white p-8 rounded-[2rem] border border-surface-border shadow-paper">
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Execution Velocity</h4>
            <p className="text-[10px] font-medium text-text-secondary">Measured by meta-signal depth and milestone completion.</p>
          </div>
          <div className="p-2 rounded-lg bg-primary-accent/5 text-primary-accent">
            <TrendingUp size={16} />
          </div>
        </div>

        <div className="h-40 w-full flex items-end gap-2 px-2">
          {velocityData.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div 
                className="w-full bg-surface-border rounded-t-lg group-hover:bg-primary-accent/40 transition-all relative overflow-hidden" 
                style={{ height: `${val}%` }}
              >
                <div className="absolute inset-0 bg-primary-accent opacity-20" style={{ height: `${val}%`, bottom: 0 }}></div>
              </div>
              <span className="text-[8px] font-black text-text-muted uppercase">D{i+1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Consistency */}
      <div className="bg-background-white p-8 rounded-[2rem] border border-surface-border shadow-paper">
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Operational Consistency</h4>
            <p className="text-[10px] font-medium text-text-secondary">Frequency of verified execution signals over 7 days.</p>
          </div>
          <div className="p-2 rounded-lg bg-primary-warm/5 text-primary-warm">
            <BarChart3 size={16} />
          </div>
        </div>

        <div className="h-40 w-full flex items-center justify-center gap-1">
          {activityData.map((val, i) => (
            <div 
              key={i} 
              className={cn(
                "w-full h-8 rounded-md transition-all",
                val > 20 ? "bg-primary-accent" : val > 10 ? "bg-primary-accent/60" : "bg-surface-border"
              )}
              title={`${val} updates`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-[8px] font-black text-text-muted uppercase">Mon</span>
          <span className="text-[8px] font-black text-text-muted uppercase">Sun</span>
        </div>
      </div>

      {/* Team Participation */}
      <div className="lg:col-span-2 bg-background-main/50 p-8 rounded-[2rem] border border-surface-border">
        <div className="flex items-center gap-3 mb-8">
          <Users size={16} className="text-text-primary" />
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Active Contributors</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.project_members?.map((member: any, i: number) => (
            <div key={i} className="bg-background-white p-4 rounded-2xl border border-surface-border flex items-center justify-between group hover:border-primary-accent/20 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-text-muted font-bold text-xs">
                  {member.users?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary leading-tight">{member.users?.full_name || 'Anonymous User'}</span>
                  <span className="text-[9px] font-black text-primary-accent uppercase tracking-tighter">{member.role || 'Member'}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <Activity size={10} className="text-status-success" />
                  <span className="text-[10px] font-bold text-text-primary">High</span>
                </div>
                <span className="text-[8px] font-black text-text-muted uppercase">Active 2m ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
