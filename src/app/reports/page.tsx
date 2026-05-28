import { AISummaryPanel } from "@/components/dashboard/AISummaryPanel";
import { BarChart3, BrainCircuit, Sparkles, Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface-border pb-10">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 mb-1">
            <BrainCircuit size={14} className="text-primary-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Predictive Analytics</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-text-primary">Intelligence Reports</h1>
          <p className="text-text-secondary text-sm font-medium">AI-driven synthesis of delivery performance and risk vectors.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-accent h-11 px-5 gap-2">
            <Sparkles size={16} />
            <span className="font-bold text-xs uppercase tracking-widest">Generate Insight</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AISummaryPanel />
        </div>
        
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="enterprise-card bg-background-white p-8 border-2 border-primary-accent/5">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="text-primary-accent" size={20} />
              <h3 className="font-extrabold text-xl tracking-tight text-text-primary">Performance Trendline</h3>
            </div>
            
            <div className="h-64 w-full bg-background-main rounded-xl border border-surface-border flex items-center justify-center relative overflow-hidden">
              {/* Mock Graph Background */}
              <div className="absolute inset-0 grid grid-cols-6 gap-4 p-6 opacity-20">
                {[1,2,3,4,5,6].map(i => <div key={i} className="border-l border-text-muted h-full"></div>)}
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <Sparkles className="text-primary-accent opacity-30 w-8 h-8" />
                <p className="text-xs text-text-secondary font-medium italic">Aggregating cross-project execution signals...</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <MetricItem label="Avg. Reliability" value="88.4%" trend="+2.1%" />
              <MetricItem label="Risk Mitigation" value="12 Projects" trend="stable" />
              <MetricItem label="Delivery Confidence" value="High" trend="optimal" />
            </div>
          </div>

          <div className="enterprise-card bg-background-main/50 border-dashed border-2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Archived Reports</h4>
              <button className="text-[10px] font-bold text-primary-accent uppercase hover:underline">View History</button>
            </div>
            <p className="text-sm text-text-secondary italic">Access historical intelligence snapshots from previous development cycles.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricItem({ label, value, trend }: { label: string, value: string, trend: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-black text-text-primary">{value}</span>
        <span className="text-[9px] font-bold text-status-success uppercase">{trend}</span>
      </div>
    </div>
  )
}
