"use client";

import { motion } from "framer-motion";
import ProjectShowcase from "./ProjectShowcase";
import { projects } from "@/lib/data/projects";

// Select the first two projects for featured display
const featuredProjects = projects
  .filter(project => project.id !== 3) // Skip the commented out project
  .slice(0, 2)
  .map((project, index) => ({
    id: project.id,
    title: project.title,
    description: project.overview,
    mockup: project.backgroundImg,
    demoUrl: project.demoUrl,
    codeUrl: project.codeUrl,
    technologies: project.technologies,
    alignment: index % 2 === 0 ? ("left" as const) : ("right" as const),
  }));

const FeaturedProjects = () => {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-[#1a0b2e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
            className="mb-40 last:mb-0"
          >
            <ProjectShowcase {...project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;