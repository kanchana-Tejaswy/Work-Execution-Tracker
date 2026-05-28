import { getProjectById } from "@/services/projects/project.service";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  BrainCircuit, 
  Activity, 
  AlertCircle,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { RiskIndicatorBadge } from "@/components/ui/RiskIndicatorBadge";
import { cn } from "@/lib/utils";
import { SubmitUpdateModal } from "@/components/projects/SubmitUpdateModal";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const uiLevelMap: Record<string, 'GREEN' | 'YELLOW' | 'RED'> = {
    'low': 'GREEN',
    'medium': 'YELLOW',
    'high': 'RED',
    'active': 'GREEN',
    'at_risk': 'YELLOW',
    'delayed': 'RED'
  };

  const aiIntelligence = project.ai_reports?.[0]?.metadata || (project as any).ai_intelligence || {};
  const executionScore = aiIntelligence.execution_score || 85;
  const projectHealth = aiIntelligence.project_health || 'stable';

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto animate-fade-in pb-20">
      
      {/* Header / Breadcrumb */}
      <div className="flex flex-col gap-6 border-b border-surface-border pb-8">
        <Link href="/projects" className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-primary-accent transition-colors flex items-center gap-1 w-fit">
          <ArrowLeft size={12} />
          Back to Portfolio
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col gap-2 flex-1">
            <h1 className="text-3xl font-black tracking-tight text-text-primary">{project.title}</h1>
            <p className="text-text-secondary text-sm font-medium leading-relaxed max-w-2xl">{project.description}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <RiskIndicatorBadge level={uiLevelMap[project.status] || 'GREEN'} />
            <SubmitUpdateModal projectId={project.id} projectTitle={project.title} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Metadata & Activity */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          <div className="enterprise-card !p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Progress</span>
              <span className="text-xl font-black text-text-primary">{project.progress}%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Team Size</span>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-text-secondary" />
                <span className="text-lg font-black text-text-primary">{project.project_members?.length || 0}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Target Date</span>
              <span className="text-sm font-bold text-text-secondary mt-1">
                {project.due_date ? new Date(project.due_date).toLocaleDateString() : 'Continuous'}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Created</span>
              <span className="text-sm font-bold text-text-secondary mt-1">
                {new Date(project.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="col-span-full pt-2">
              <ProgressBar progress={project.progress || 0} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-primary border-b border-surface-border pb-2">Recent Execution Signals</h3>
            
            <div className="flex flex-col gap-4">
              {project.project_updates && project.project_updates.length > 0 ? (
                project.project_updates.map((update: any, idx: number) => (
                  <div key={idx} className="p-4 bg-background-white border border-surface-border rounded-xl shadow-paper flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-background-main border border-surface-border flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-primary-accent" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-text-primary">{update.users?.full_name || 'Team Member'} logged progress</span>
                        <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">{new Date(update.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{update.update_text || "Routine update submitted."}</p>
                      {update.progress_percentage !== null && (
                        <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 bg-surface rounded w-fit">
                          <span className="text-[10px] font-black text-text-muted uppercase">Progress marked at</span>
                          <span className="text-[10px] font-black text-primary-accent">{update.progress_percentage}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-background-main rounded-xl border border-dashed border-surface-border">
                  <p className="text-sm text-text-secondary font-medium italic">No execution signals recorded yet for this project.</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Deep Intelligence */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="enterprise-card !p-6 flex flex-col gap-6 bg-background-white border-2 border-primary-accent/10">
            <div className="flex items-center gap-2">
              <BrainCircuit size={16} className="text-primary-accent" />
              <h3 className="font-extrabold text-base tracking-tight">AI Intelligence</h3>
            </div>

            <div className="flex flex-col gap-1 items-center p-4 bg-background-main rounded-xl border border-surface-border">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em]">Execution Score</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-black text-text-primary tracking-tighter leading-none">{executionScore}</span>
                <span className="text-sm font-bold text-text-muted">/100</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-surface-border">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Structural Health</span>
                <div className="flex items-center gap-1">
                  <Activity size={12} className={cn(
                    projectHealth === 'healthy' ? "text-status-success" : projectHealth === 'critical' ? "text-status-error" : "text-status-warning"
                  )} />
                  <span className="text-[10px] font-black uppercase tracking-wider text-text-primary">{projectHealth}</span>
                </div>
              </div>

              {aiIntelligence.completed_work && aiIntelligence.completed_work.length > 0 && (
                <div className="flex flex-col gap-2 pb-2 border-b border-surface-border">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Extracted Accomplishments</span>
                  <ul className="flex flex-col gap-1.5">
                    {aiIntelligence.completed_work.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-2 items-start text-xs text-text-primary font-medium">
                        <CheckCircle2 size={12} className="text-status-success shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {aiIntelligence.pending_work && aiIntelligence.pending_work.length > 0 && (
                <div className="flex flex-col gap-2 pb-2 border-b border-surface-border">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Active Blockers / Pending</span>
                  <ul className="flex flex-col gap-1.5">
                    {aiIntelligence.pending_work.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-2 items-start text-xs text-text-primary font-medium">
                        <Clock size={12} className="text-primary-warm shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {aiIntelligence.behavioral_patterns && (
                <div className="flex flex-col gap-2 pb-2 border-b border-surface-border">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Behavioral Patterns</span>
                  <div className="flex flex-wrap gap-1.5">
                    {aiIntelligence.behavioral_patterns.map((pattern: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-surface rounded text-[9px] font-bold text-text-primary uppercase tracking-tighter">
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {aiIntelligence.recommendations && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Actionable Interventions</span>
                  <ul className="flex flex-col gap-2">
                    {aiIntelligence.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex gap-2 items-start text-xs text-text-primary font-medium">
                        <TrendingUp size={12} className="text-primary-accent shrink-0 mt-0.5" />
                        <span className="leading-tight">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
