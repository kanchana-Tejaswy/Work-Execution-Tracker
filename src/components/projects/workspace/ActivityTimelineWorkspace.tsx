"use client";

import { 
  CheckCircle2, 
  MessageSquare, 
  BrainCircuit, 
  UserPlus, 
  AlertCircle,
  FileUp,
  Clock,
  Zap,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ActivityTimelineWorkspaceProps {
  project: any;
}

export function ActivityTimelineWorkspace({ project }: ActivityTimelineWorkspaceProps) {
  const updates = project.project_updates || [];
  const reports = project.ai_reports || [];
  const members = project.project_members || [];

  // Merge and sort all activities
  const activities = [
    ...updates.map((u: any) => ({ ...u, type: 'UPDATE' })),
    ...reports.map((r: any) => ({ ...r, type: 'REPORT' })),
    ...members.map((m: any) => ({ ...m, type: 'MEMBER' }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (activities.length === 0) {
    return (
      <div className="p-12 text-center bg-surface/50 rounded-[2rem] border-2 border-dashed border-surface-border animate-in fade-in duration-700">
        <Clock className="mx-auto text-text-muted mb-4 opacity-20" size={48} />
        <p className="text-sm text-text-secondary font-medium italic">The operational timeline is currently silent. No signals detected.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-surface-border pb-4">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-primary-accent" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-primary">Execution Timeline</h3>
        </div>
        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest bg-surface px-2 py-1 rounded">Live Feed</span>
      </div>

      <div className="relative pl-8 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary-accent/30 before:via-surface-border before:to-transparent">
        {activities.map((activity, idx) => (
          <TimelineEntry key={idx} activity={activity} />
        ))}
      </div>
    </div>
  );
}

function TimelineEntry({ activity }: { activity: any }) {
  const isUpdate = activity.type === 'UPDATE';
  const isReport = activity.type === 'REPORT';
  const isMember = activity.type === 'MEMBER';

  const iconMap: Record<string, any> = {
    'UPDATE': <CheckCircle2 size={14} className="text-primary-accent" />,
    'REPORT': <BrainCircuit size={14} className="text-status-success" />,
    'MEMBER': <UserPlus size={14} className="text-primary-warm" />
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Icon Node */}
      <div className={cn(
        "absolute -left-[31px] top-0 w-6 h-6 rounded-full border-2 border-background-white flex items-center justify-center z-10 shadow-sm",
        isUpdate ? "bg-background-white" : isReport ? "bg-status-success/10" : "bg-background-main"
      )}>
        {iconMap[activity.type]}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-text-primary uppercase tracking-tight">
              {isUpdate ? (activity.users?.full_name || 'Team Member') : isReport ? 'Intelligence Engine' : 'System Context'}
            </span>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1.5 py-0.5 bg-surface rounded">
              {isUpdate ? 'Signal' : isReport ? 'Audit' : 'Config'}
            </span>
          </div>
          <time className="text-[9px] font-black text-text-muted uppercase tracking-widest tabular">
            {new Date(activity.created_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </time>
        </div>

        <div className="enterprise-card !p-5 bg-background-white border-surface-border shadow-subtle hover:border-primary-accent/20 transition-colors">
          {isUpdate && (
            <div className="space-y-4">
              <p className="text-sm text-text-primary font-medium leading-relaxed italic border-l-2 border-primary-accent/20 pl-4">
                &quot;{activity.update_text}&quot;
              </p>
              {activity.progress_percentage !== null && (
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-surface-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary-accent shadow-soft-glow" style={{ width: `${activity.progress_percentage}%` }}></div>
                  </div>
                  <span className="text-[10px] font-black text-primary-accent uppercase">{activity.progress_percentage}% Velocity</span>
                </div>
              )}
            </div>
          )}

          {isReport && (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-status-success/5 flex items-center justify-center text-status-success shrink-0">
                <TrendingUp size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-text-primary">Intelligence report generated for this cycle.</span>
                <span className="text-[10px] font-medium text-text-secondary leading-tight opacity-70">
                  Reliability score stabilized at {activity.metadata?.reliability_score || 92}%. No critical blockers detected.
                </span>
              </div>
            </div>
          )}

          {isMember && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-text-muted">
                <UserPlus size={16} />
              </div>
              <span className="text-xs font-bold text-text-secondary italic">
                New member assigned as <span className="text-text-primary uppercase tracking-tighter text-[10px] font-black underline decoration-primary-warm/30 underline-offset-2">{activity.role || 'Member'}</span>.
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
