"use client";

import { 
  AlertCircle, 
  Clock, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockersRisksProps {
  project: any;
}

export function BlockersRisks({ project }: BlockersRisksProps) {
  const metadata = project.ai_reports?.[0]?.metadata || {};
  const blockers = metadata.pending_work || [];
  
  // Mocked severity for visual fidelity
  const severityMap: Record<number, string> = {
    0: "CRITICAL",
    1: "MODERATE",
    2: "LOW"
  };

  if (blockers.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-surface-border pb-4">
        <ShieldAlert size={16} className="text-status-error" />
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-primary">Operational Blockers</h3>
      </div>

      <div className="space-y-4">
        {blockers.map((blocker: string, i: number) => (
          <div key={i} className="bg-background-white p-6 rounded-[2rem] border border-status-error/10 shadow-paper relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-status-error"></div>
            
            <div className="flex justify-between items-start mb-3 pl-2">
              <span className="text-[9px] font-black text-status-error uppercase tracking-widest bg-status-error/5 px-2 py-0.5 rounded border border-status-error/10">
                {severityMap[i % 3] || "CRITICAL"}
              </span>
              <div className="flex items-center gap-1.5 text-text-muted">
                <Clock size={10} />
                <span className="text-[9px] font-bold uppercase tabular">Detected 4h ago</span>
              </div>
            </div>

            <p className="text-sm font-bold text-text-primary mb-4 pl-2 leading-relaxed">
              {blocker}
            </p>

            <div className="pl-2 flex flex-col gap-3">
              <div className="p-3 bg-background-main rounded-xl border border-surface-border text-[11px] font-medium text-text-secondary italic">
                &quot;AI observation suggests this dependency is stalling the auth-migration milestone by approximately 48 hours.&quot;
              </div>
              
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-accent hover:gap-3 transition-all w-fit">
                Assign Intervention
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
