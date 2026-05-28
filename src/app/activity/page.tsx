import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { History, Download, Filter } from "lucide-react";

export default function ActivityPage() {
  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface-border pb-10">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 mb-1">
            <History size={14} className="text-text-muted" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Compliance Audit</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-text-primary">Execution Logs</h1>
          <p className="text-text-secondary text-sm font-medium">Verifiable stream of all delivery signals and system actions.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline h-11 px-5 gap-2">
            <Download size={16} />
            <span className="font-bold text-xs uppercase tracking-widest">Export CSV</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <button className="btn-outline h-9 px-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Filter size={12} />
            Filter by Project
          </button>
          <button className="btn-outline h-9 px-4 text-[10px] font-black uppercase tracking-widest">Team Members</button>
          <button className="btn-outline h-9 px-4 text-[10px] font-black uppercase tracking-widest">Action Type</button>
        </div>

        <ActivityTimeline />
      </div>
    </div>
  );
}
