"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function AnimatedProjectGrid({ projects }: { projects: any[] }) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project: any) => (
        <motion.div key={project.id} variants={item}>
          <ProjectCard 
            id={project.id}
            name={project.title}
            description={project.description || ""}
            progress={project.progress}
            members={project.project_members.length}
            riskLevel={(project.status as any) || "low"}
            aiIntelligence={project.ai_intelligence}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
