import { ActivityTimeline } from "./ActivityTimeline";
import { AISummaryPanel } from "./AISummaryPanel";
import { StatsOverview } from "./StatsOverview";
import { ProjectSection } from "./ProjectSection";
import { getProjects } from "@/services/projects/project.service";

export async function DashboardGrid() {
  const projectsData = await getProjects();

  return (
    <div className="flex flex-col gap-12">
      {/* 1. Executive Stats */}
      <StatsOverview projects={projectsData} />

      {/* 2. Interactive Project Section (Search, Filter, Grid) */}
      <ProjectSection initialProjects={projectsData} />

      {/* 3. Deep Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 min-h-[500px]">
        <div className="lg:col-span-2">
          <ActivityTimeline />
        </div>
        <div className="lg:col-span-1">
          <AISummaryPanel />
        </div>
      </div>
    </div>
  );
}


