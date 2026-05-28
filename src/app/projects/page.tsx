import { getProjects } from "@/services/projects/project.service";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { Suspense } from "react";
import { getCurrentUser } from "@/services/users/user.service";
import { ProjectPortfolio } from "@/components/projects/workspace/ProjectPortfolio";

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
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsDataLoader />
        </Suspense>
      </div>
    </div>
  );
}

async function ProjectsDataLoader() {
  const projects = await getProjects();
  return <ProjectPortfolio initialProjects={projects} />
}

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse mt-16">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-64 bg-background-white rounded-xl border border-surface-border" />
      ))}
    </div>
  )
}
