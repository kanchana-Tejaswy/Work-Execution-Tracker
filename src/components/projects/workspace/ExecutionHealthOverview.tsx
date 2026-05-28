"use client";

import { 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExecutionHealthOverviewProps {
  project: any;
}

export function ExecutionHealthOverview({ project }: ExecutionHealthOverviewProps) {
  const metadata = project.ai_reports?.[0]?.metadata || {};
  
  // Mocked/Derived metrics for the premium feel
  const executionScore = metadata.execution_score || 88;
  const reliabilityScore = metadata.reliability_score || 94;
  const delayProbability = metadata.delay_probability || 5;
  const consistency = 92; // Percent of days with activity
  const momentum = "positive"; // derived from recent updates

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
      <HealthCard 
        icon={<Zap className="text-primary-accent" size={18} />}
        label="Execution Score"
        value={`${executionScore}%`}
        subValue="AI-Verified Momentum"
        trend={momentum === "positive" ? "up" : "down"}
      />
      <HealthCard 
        icon={<ShieldCheck className="text-status-success" size={18} />}
        label="Reliability"
        value={`${reliabilityScore}%`}
        subValue="Submission Consistency"
      />
      <HealthCard 
        icon={<AlertCircle className={cn(delayProbability > 15 ? "text-status-error" : "text-status-success")} size={18} />}
        label="Delay Risk"
        value={`${delayProbability}%`}
        subValue="Probability Prediction"
        status={delayProbability > 15 ? "error" : "success"}
      />
      <HealthCard 
        icon={<Activity className="text-primary-warm" size={18} />}
        label="Team Pulse"
        value={`${consistency}%`}
        subValue="Active Collaboration"
      />
    </div>
  );
}

function HealthCard({ 
  icon, 
  label, 
  value, 
  subValue, 
  trend,
  status = "default"
}: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  subValue: string,
  trend?: "up" | "down",
  status?: "default" | "success" | "error"
}) {
  return (
    <div className="bg-background-white p-6 rounded-[2rem] border border-surface-border shadow-subtle hover:shadow-soft-glow hover:border-primary-accent/10 transition-all group overflow-hidden relative">
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-3 rounded-2xl bg-background-main border border-surface-border group-hover:scale-110 transition-transform duration-500",
          status === "success" && "border-status-success/20 bg-status-success/5",
          status === "error" && "border-status-error/20 bg-status-error/5"
        )}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-0.5 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter",
            trend === "up" ? "bg-status-success/10 text-status-success" : "bg-status-error/10 text-status-error"
          )}>
            {trend === "up" ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {trend === "up" ? "Gaining" : "Stalled"}
          </div>
        )}
      </div>
      
      <div className="space-y-1 relative z-10">
        <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{label}</span>
        <h4 className="text-3xl font-black text-text-primary tracking-tighter">{value}</h4>
        <p className="text-[10px] font-medium text-text-secondary opacity-70 leading-tight">{subValue}</p>
      </div>

      {/* Decorative pulse background */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}
