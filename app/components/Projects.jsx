import React from "react";
import ProjectItem from "./ProjectItem";
import Link from "next/link";
import AnimatedDarkBg from "./heroDark/AnimatedDarkBg";
import {projects} from "@/lib/data/projects"

const Projects = () => {
  return (
    <section id="projects" className="w-full relative dark:bg-black dark:text-white">
      <AnimatedDarkBg/>
      <div className="max-w-[1240px] mx-auto px-2 py-16">
        <p className="text-xl tracking-widest uppercase text-[#5651e5] font-semibold mb-2">Projects</p>
        <h2 className="py-2 text-2xl md:text-3xl font-bold mb-2">What I&apos;ve Built</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center text-base">A selection of my favorite projects, showcasing my skills in modern web development and UI/UX design. Click any card for more details.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={index}
              className="animate-fadeInUp transition-transform duration-500"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <ProjectItem
                title={project.title}
                stack={project.stack}
                backgroundImg={project.backgroundImg}
                projectUrl={`/project/${project.id}`}
              />
            </div>
          ))}
        </div>
        {projects.length > 3 && (
          <div className="w-full flex items-center justify-center pt-8">
            <Link
              href="/moreProjects"
              className="inline-block px-8 py-3 rounded-full bg-[#5651e5] text-white font-semibold shadow-lg hover:bg-[#4338ca] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
              aria-label="View more projects"
            >
              View More Projects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
