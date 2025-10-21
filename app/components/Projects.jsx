"use client";

import React from "react";
import { motion } from "framer-motion";
import ProjectItem from "./ProjectItem";
import Link from "next/link";
import AnimatedDarkBg from "./heroDark/AnimatedDarkBg";
import {projects} from "@/lib/data/projects"

const Projects = () => {
  return (
    <section id="projects" className="w-full relative bg-[#1a0b2e] text-white py-24 lg:py-32">
      <AnimatedDarkBg/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-lg sm:text-xl tracking-widest uppercase text-[#a362ff] font-['Poppins'] font-semibold mb-4">Projects</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Preahvihear'] font-normal text-white mb-6">What I&apos;ve Built</h2>
          <p className="text-white/75 max-w-2xl mx-auto text-base lg:text-lg font-['Poppins']">A selection of my favorite projects, showcasing my skills in modern web development and UI/UX design. Click any card for more details.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.slice(0, 6).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectItem
                title={project.title}
                stack={project.stack}
                backgroundImg={project.backgroundImg}
                projectUrl={`/project/${project.id}`}
              />
</motion.div>
          ))}
        </div>
        {projects.length > 6 && (
          <div className="w-full flex items-center justify-center pt-12">
            <Link
              href="/moreProjects"
              className="inline-block px-8 py-3 rounded-full bg-[#a362ff] text-white font-semibold shadow-lg hover:bg-[#9857d3] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a362ff]"
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
