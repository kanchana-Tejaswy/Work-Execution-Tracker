import { getProjectById } from "@/services/projects/project.service";
import { notFound } from "next/navigation";
import { ProjectHeader } from "@/components/projects/workspace/ProjectHeader";
import { ExecutionHealthOverview } from "@/components/projects/workspace/ExecutionHealthOverview";
import { ActivityTimelineWorkspace } from "@/components/projects/workspace/ActivityTimelineWorkspace";
import { AIInsightsWorkspace } from "@/components/projects/workspace/AIInsightsWorkspace";
import { ProjectAnalyticsSection } from "@/components/projects/workspace/ProjectAnalyticsSection";
import { BlockersRisks } from "@/components/projects/workspace/BlockersRisks";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-[1600px] mx-auto animate-fade-in pb-32">
      {/* 1. Command Center Header */}
      <ProjectHeader project={project} />

      {/* 2. Primary Workspace Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 mt-12">
        
        {/* LEFT COLUMN: Operational Health & Analytics (xl:col-span-8) */}
        <div className="xl:col-span-8 flex flex-col gap-12">
          
          {/* Health Summary Cards */}
          <ExecutionHealthOverview project={project} />

          {/* Main Action Tabs */}
          <div className="flex flex-col gap-8">
            <div className="border-b border-surface-border">
              <div className="flex gap-8">
                <button className="pb-4 text-xs font-black uppercase tracking-[0.2em] text-primary-accent border-b-2 border-primary-accent">Execution Log</button>
                <button className="pb-4 text-xs font-black uppercase tracking-[0.2em] text-text-muted hover:text-text-primary transition-colors">Intelligence Analytics</button>
                <button className="pb-4 text-xs font-black uppercase tracking-[0.2em] text-text-muted hover:text-text-primary transition-colors">Project Assets</button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {/* Timeline is the primary focus */}
              <ActivityTimelineWorkspace project={project} />
              
              {/* Analytics Section */}
              <div className="pt-12 border-t border-surface-border">
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-primary">Performance Trends</h3>
                </div>
                <ProjectAnalyticsSection project={project} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Intelligence & Critical Risks (xl:col-span-4) */}
        <aside className="xl:col-span-4 flex flex-col gap-12">
          
          {/* AI Intelligence Panel */}
          <AIInsightsWorkspace project={project} />

          {/* Critical Blockers */}
          <BlockersRisks project={project} />

          {/* Quick Support / Contact Section */}
          <div className="p-8 bg-background-main rounded-[2rem] border border-surface-border relative overflow-hidden group">
            <div className="relative z-10 flex flex-col gap-4">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Support Node</span>
              <h4 className="text-sm font-black text-text-primary uppercase tracking-tight">Need Intervention?</h4>
              <p className="text-xs text-text-secondary font-medium leading-relaxed">
                Escalate critical blockers to the global governance team if signals remain stalled for {'>'}48h.
              </p>
              <button className="btn-outline w-full py-3 text-[10px] font-bold uppercase tracking-widest bg-background-white">
                Contact Stakeholders
              </button>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
