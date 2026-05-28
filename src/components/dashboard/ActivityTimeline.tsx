import { GitCommit, FileUp, MessageSquare, CheckCircle2, User, Play, History, Activity as ActivityIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export async function ActivityTimeline() {
  const supabase = createClient();
  const { data: activities, error } = await supabase
    .from('activity_logs')
    .select('*, users(full_name), projects(title)')
    .order('created_at', { ascending: false })
    .limit(15);

  const getIcon = (type: string) => {
    switch (type) {
      case 'PROJECT_CREATED': return Play;
      case 'MEMBER_ADDED': return User;
      case 'UPDATE_SUBMITTED': return GitCommit;
      case 'STATUS_CHANGED': return CheckCircle2;
      default: return MessageSquare;
    }
  };

  return (
    <div className="enterprise-card flex flex-col gap-8 h-full bg-background-white animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="font-extrabold text-text-primary text-lg tracking-tight">Execution Audit Trail</h3>
          <p className="text-[11px] text-text-secondary font-medium uppercase tracking-wider italic opacity-70">Verifiable signals of work performance.</p>
        </div>
        
        {/* Activity Heatmap Mock */}
        <div className="flex items-center gap-1.5 p-2 bg-background-main border border-surface-border rounded-lg">
          <ActivityIcon size={12} className="text-primary-accent" />
          <div className="flex gap-0.5">
            {[1,2,3,4,5,6,7].map((i) => (
              <div key={i} className={cn(
                "w-2 h-2 rounded-[1px]",
                i > 4 ? "bg-primary-accent" : "bg-primary-accent/20"
              )}></div>
            ))}
          </div>
          <span className="text-[10px] font-bold text-text-primary ml-1">VIGOROUS</span>
        </div>
      </div>
      
      <div className="relative">
        {/* Timeline connector line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-surface-border"></div>
        
        <div className="flex flex-col gap-8 relative">
          {activities?.map((item, idx) => {
            const Icon = getIcon(item.activity_type);
            const timeStr = item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Unknown';
            const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Today';

            return (
              <div key={item.id} className="flex gap-6 items-start group">
                <div className="relative z-10 w-8 h-8 shrink-0 rounded-full bg-background-white border-2 border-surface-border flex items-center justify-center text-text-secondary group-hover:border-primary-accent group-hover:text-primary-accent transition-all duration-300">
                  <Icon size={14} />
                </div>
                
                <div className="flex-1 flex flex-col gap-1 pt-0.5">
                  <div className="flex justify-between items-baseline gap-4">
                    <p className="text-sm text-text-secondary leading-tight">
                      <span className="font-bold text-text-primary group-hover:text-primary-accent transition-colors">{item.users?.full_name || 'System'}</span>
                      {" "}{item.activity_type === 'PROJECT_CREATED' ? 'initiated' : item.activity_type === 'UPDATE_SUBMITTED' ? 'logged progress for' : 'updated'}{" "}
                      <span className="font-bold text-text-primary underline decoration-primary-accent/30 underline-offset-2">{item.projects?.title}</span>
                    </p>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-black text-text-primary uppercase tracking-tighter">{timeStr}</p>
                      <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest">{dateStr}</p>
                    </div>
                  </div>
                  {item.activity_type === 'UPDATE_SUBMITTED' && (
                    <div className="mt-2 p-3 bg-background-main rounded-lg border border-surface-border text-[11px] text-text-secondary leading-relaxed italic border-l-4 border-l-primary-accent/50">
                      &quot;Analyzing meta-signals for this update...&quot;
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {(!activities || activities.length === 0) && (
            <div className="py-20 text-center relative z-10 bg-background-white">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-background-main rounded-full border border-surface-border opacity-50">
                  <History className="text-text-muted w-10 h-10" />
                </div>
                <p className="text-sm text-text-secondary font-medium italic">No execution signals detected in current window.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-surface-border">
        <button className="btn-outline w-full py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all">
          View Full Project History
        </button>
      </div>
    </div>
  );
}
