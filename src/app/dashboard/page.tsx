import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { Suspense } from "react";
import { Zap, Clock, ShieldCheck, Download } from "lucide-react";
import { getCurrentUser } from "@/services/users/user.service";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const isManagerOrAdmin = user?.profile?.role === 'manager' || user?.profile?.role === 'admin';

  return (
    <div className="flex flex-col gap-12 max-w-7xl mx-auto animate-fade-in pb-20">
      {/* 1. Header with Global Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-surface-border pb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-md bg-primary-accent/10 text-primary-accent">
              <ShieldCheck size={14} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-text-muted">Security Audited</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text-primary">Operational Center</h1>
          <p className="text-text-secondary text-sm sm:text-base font-medium">Real-time execution signals and delivery risk intelligence.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-8 px-8 py-3 bg-background-main border border-surface-border rounded-2xl mr-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none">System Status</span>
              <span className="text-[12px] font-black text-status-success uppercase mt-1.5">Operational</span>
            </div>
            <div className="h-8 w-px bg-surface-border"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none">Last Audit</span>
              <span className="text-[12px] font-black text-text-primary uppercase mt-1.5 tabular">2m ago</span>
            </div>
          </div>
          <button className="btn-outline h-12 px-6 gap-2">
            <Download size={18} />
            <span className="font-bold text-xs uppercase tracking-widest">Report</span>
          </button>
          {isManagerOrAdmin && <CreateProjectModal />}
        </div>
      </div>

      {/* 2. Quick Actions / Context Bar */}
      <div className="flex flex-wrap items-center gap-4 py-2">
        <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.15em] mr-2">Quick Actions:</span>
        <QuickAction icon={Zap} label="New Update" />
        <QuickAction icon={Clock} label="Team Audit" />
        <QuickAction icon={ShieldCheck} label="Risk Review" />
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardGrid />
      </Suspense>
    </div>
  );
}

function QuickAction({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-background-white border border-surface-border hover:border-primary-accent hover:text-primary-accent transition-all group shadow-sm hover:shadow-md">
      <Icon size={14} className="text-text-muted group-hover:text-primary-accent" />
      <span className="text-[11px] font-bold uppercase tracking-wide">{label}</span>
    </button>
  )
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-background-white rounded-xl border border-surface-border" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px] bg-background-white rounded-xl border border-surface-border" />
        <div className="lg:col-span-1 h-[400px] bg-background-white rounded-xl border border-surface-border" />
      </div>
    </div>
  )
}
