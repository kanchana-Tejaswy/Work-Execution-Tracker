import { BrainCircuit, TrendingUp, AlertCircle, Sparkles, Target, Zap, Info } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export async function AISummaryPanel() {
  const supabase = createClient();
  const { data: reports, error } = await supabase
    .from('ai_reports')
    .select('*, projects(title)')
    .order('created_at', { ascending: false })
    .limit(5);

  const latestReport = reports?.[0];
  const metadata = (latestReport?.metadata as any) || {};
  const globalScore = metadata.reliability_score || 88;

  return (
    <div className="enterprise-card flex flex-col gap-8 bg-background-white border-2 border-primary-accent/10 animate-fade-in h-full relative overflow-hidden">
      {/* AI Glow Effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-text-primary">
          <div className="p-2 bg-primary-accent/10 rounded-lg">
            <BrainCircuit size={20} className="text-primary-accent" />
          </div>
          <h3 className="font-extrabold text-lg tracking-tight">Execution Intelligence</h3>
        </div>
        <div className="ai-badge">
          <Sparkles size={10} />
          <span>Live AI</span>
        </div>
      </div>

      {/* Execution Score Gauge */}
      <div className="p-5 bg-background-main rounded-2xl border border-surface-border flex flex-col items-center text-center gap-2 relative group cursor-help transition-all hover:border-primary-accent/30">
        <div className="flex items-center gap-1.5 mb-1">
          <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Global Reliability</p>
          <Info size={10} className="text-text-muted" />
        </div>
        
        <div className="relative w-28 h-14 overflow-hidden mb-1">
          <div className="absolute top-0 left-0 w-28 h-28 border-[12px] border-primary-accent/10 rounded-full"></div>
          <div 
            className="absolute top-0 left-0 w-28 h-28 border-[12px] border-primary-accent rounded-full border-t-transparent border-r-transparent transition-transform duration-1000"
            style={{ transform: `rotate(${Math.min(180, (globalScore / 100) * 180 - 45)}deg)` }}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
            <span className="text-2xl font-black text-text-primary tabular">{globalScore}</span>
          </div>
        </div>
        
        <p className={cn(
          "text-[12px] font-bold uppercase tracking-tight flex items-center gap-1.5",
          globalScore > 80 ? "text-status-success" : globalScore > 50 ? "text-status-warning" : "text-status-error"
        )}>
          {globalScore > 80 ? <TrendingUp size={12} /> : <AlertCircle size={12} />}
          {globalScore > 80 ? 'High Confidence' : globalScore > 50 ? 'Medium Confidence' : 'Critical Attention'}
        </p>
        
        {/* Tooltip detail */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg font-bold">
          Composite score: Consistency + Quality + Velocity
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2 px-1">
            <AlertCircle size={14} />
            Critical Risks
          </h4>
          <div className="space-y-3">
            {reports?.filter(r => r.risk_level === 'high' || r.risk_level === 'medium').slice(0, 2).map((report) => (
              <div key={report.id} className="p-4 rounded-xl bg-status-error/5 border border-status-error/10 flex gap-3 group/item cursor-pointer hover:bg-status-error/10 transition-colors">
                <AlertCircle className="text-status-error shrink-0 mt-0.5" size={14} />
                <div>
                  <p className="text-[12px] font-bold text-text-primary leading-none mb-1.5 group-hover/item:text-status-error transition-colors">{report.projects?.title}</p>
                  <p className="text-[11px] text-text-secondary leading-relaxed font-medium">{report.summary}</p>
                </div>
              </div>
            ))}
            {reports?.filter(r => r.risk_level === 'high' || r.risk_level === 'medium').length === 0 && (
              <p className="text-[11px] text-text-muted italic px-4 py-2 bg-background-main rounded-lg border border-surface-border">No critical risks identified.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2 px-1">
            <Zap size={14} className="text-primary-accent" />
            AI Recommendations
          </h4>
          <div className="space-y-2.5">
            {metadata.recommendations?.slice(0, 3).map((rec: string, i: number) => (
              <RecommendationItem key={i} text={rec} />
            )) || (
              <>
                <RecommendationItem text="Maintain current execution velocity." />
                <RecommendationItem text="Review next milestone dependencies." />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <button className="btn-accent w-full py-3 text-[12px] font-bold uppercase tracking-widest shadow-soft-glow">
          Generate Full Analysis
        </button>
      </div>
    </div>
  );
}

function RecommendationItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 items-start p-2 rounded-lg hover:bg-background-main transition-all cursor-pointer group">
      <div className="mt-1 p-0.5 rounded-full bg-primary-accent/10 text-primary-accent group-hover:bg-primary-accent group-hover:text-white transition-colors">
        <Target size={10} />
      </div>
      <span className="text-[12px] font-medium text-text-secondary group-hover:text-text-primary transition-colors leading-tight">{text}</span>
    </div>
  );
}

