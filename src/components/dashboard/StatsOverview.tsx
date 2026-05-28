import { ArrowUpRight, ArrowDownRight, Activity, ShieldAlert, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { HealthChart } from "./HealthChart";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ElementType;
  description: string;
  showChart?: boolean;
}

function StatCard({ title, value, trend, icon: Icon, description, showChart }: StatCardProps) {
  return (
    <div className="enterprise-card group !p-7 flex flex-col gap-4 relative overflow-hidden">
      <div className="flex justify-between items-start relative z-10">
        <div className="p-2.5 rounded-xl bg-background-main border border-surface-border text-text-secondary group-hover:text-primary-accent transition-colors">
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border",
            trend > 0 
              ? "text-status-success bg-status-success/5 border-status-success/10" 
              : "text-status-error bg-status-error/5 border-status-error/10"
          )}>
            {trend > 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            <span className="tabular">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">{title}</p>
        <h4 className="text-3xl font-black text-text-primary tracking-tight tabular">{value}</h4>
      </div>
      
      {showChart && (
        <div className="mt-2 -mx-7 -mb-5 relative h-14 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
          <HealthChart />
        </div>
      )}

      {!showChart && (
        <p className="text-[11px] text-text-secondary leading-tight font-medium italic opacity-70">
          {description}
        </p>
      )}
    </div>
  );
}

export function StatsOverview({ projects }: { projects: any[] }) {
  const activeCount = projects.filter(p => p.status === 'active' || p.status === 'low').length;
  const atRiskCount = projects.filter(p => p.status === 'at_risk' || p.status === 'medium' || p.status === 'delayed' || p.status === 'high').length;
  const avgProgress = projects.length > 0 
    ? Math.round(projects.reduce((acc, p) => acc + (p.progress || 0), 0) / projects.length) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard 
        title="Active Projects" 
        value={activeCount} 
        icon={Activity}
        trend={12}
        description="Steady execution flow detected."
        showChart
      />
      <StatCard 
        title="At-Risk Signals" 
        value={atRiskCount} 
        icon={ShieldAlert}
        trend={-5}
        description="Potential delivery bottlenecks."
        showChart
      />
      <StatCard 
        title="Avg. Progress" 
        value={`${avgProgress}%`} 
        icon={Zap}
        trend={8}
        description="Overall portfolio completion velocity."
        showChart
      />
      <StatCard 
        title="Accountability Score" 
        value="92" 
        icon={CheckCircle2}
        trend={4}
        description="Verifiable signal consistency."
        showChart
      />
    </div>
  );
}
