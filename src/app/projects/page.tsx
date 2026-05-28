import { getProjects } from "@/services/projects/project.service";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { Search, Filter } from "lucide-react";
import { Suspense } from "react";
import { getCurrentUser } from "@/services/users/user.service";

export default async function ProjectsPage() {
  const user = await getCurrentUser();
  const isManagerOrAdmin = user?.profile?.role === 'manager' || user?.profile?.role === 'admin';

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface-border pb-10">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl font-black tracking-tighter text-text-primary">Project Portfolio</h1>
          <p className="text-text-secondary text-sm font-medium">Manage and monitor all execution pathways.</p>
        </div>
        <div className="flex gap-3">
          {isManagerOrAdmin && <CreateProjectModal />}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background-white p-4 rounded-xl border border-surface-border shadow-subtle">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="input-field w-full pl-10 h-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-outline h-10 px-4 text-xs font-bold uppercase tracking-wider">All Status</button>
            <button className="btn-outline h-10 px-4 text-xs font-bold uppercase tracking-wider">Sort by Progress</button>
          </div>
        </div>

        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsList />
        </Suspense>
      </div>
    </div>
  );
}

async function ProjectsList() {
  const projects = await getProjects();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: any) => (
        <ProjectCard 
          key={project.id} 
          id={project.id}
          name={project.title}
          description={project.description || ""}
          progress={project.progress}
          members={project.project_members.length}
          riskLevel={(project.status as any) || "low"}
          aiIntelligence={project.ai_intelligence}
        />
      ))}
      {projects.length === 0 && (
        <div className="col-span-full text-center py-20 bg-background-main rounded-xl border-2 border-dashed border-surface-border">
          <p className="text-sm text-text-secondary font-medium italic">No projects found. Create your first project to begin tracking.</p>
        </div>
      )}
    </div>
  )
}

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-64 bg-background-white rounded-xl border border-surface-border" />
      ))}
    </div>
  )
}
