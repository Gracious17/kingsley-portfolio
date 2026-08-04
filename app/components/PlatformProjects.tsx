"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { HighlightedText } from "./ui/highlighted-text";
import { LoadMoreButton } from "./ui/load-more";
import { platformProjects, type PlatformProject } from "@/lib/data/projects";

const INITIAL = 4;
const STEP = 4;

const ProjectCard = ({ project, index }: { project: PlatformProject; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.45, delay: (index % STEP) * 0.07 }}
    className="glass-card rounded-2xl p-5 flex flex-col h-full"
  >
    <div className="flex items-start justify-between gap-3">
      <h3 className="text-sm font-semibold text-white geist-font tracking-tight leading-snug">
        {project.title}
      </h3>
      {(project.demoUrl || project.codeUrl) && (
        <div className="flex items-center gap-2 shrink-0 text-white/30 pt-0.5">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="hover:text-[#a362ff] transition-colors"
            >
              <ExternalLink size={13} />
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source`}
              className="hover:text-white transition-colors"
            >
              <Github size={13} />
            </a>
          )}
        </div>
      )}
    </div>

    <p className="mt-1.5 font-mono text-[10px] text-white/30 leading-relaxed">{project.stack}</p>

    <HighlightedText
      text={project.description}
      className="mt-4 line-clamp-4 text-[12px] text-white/55 inter-font font-light leading-relaxed"
    />

    <div className="mt-4 flex flex-wrap gap-1.5">
      {project.tags.slice(0, 4).map((tag) => (
        <span
          key={tag}
          className="rounded border border-[#a362ff]/20 bg-[#a362ff]/[0.07] px-2 py-0.5 font-mono text-[9px] text-[#a362ff]/90"
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="mt-auto pt-5">
      <div className="divider mb-4" />
      <dl className="grid grid-cols-3 gap-2">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="min-w-0">
            <dt className="font-mono text-sm text-[#a362ff] leading-none truncate">
              {metric.value}
            </dt>
            <dd className="mt-1 text-[9px] text-white/35 inter-font leading-snug">
              {metric.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </motion.article>
);

export default function PlatformProjects() {
  const [visible, setVisible] = useState(INITIAL);
  const shown = platformProjects.slice(0, visible);

  return (
    <section id="projects" className="w-full bg-transparent py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white geist-font tracking-tight">
            Portfolio
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/40 inter-font font-light">
            My Recent Works
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#a362ff]"
        >
          Selected Platform Projects
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
          {shown.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <LoadMoreButton
          onClick={() => setVisible((v) => v + STEP)}
          remaining={platformProjects.length - visible}
        />
      </div>
    </section>
  );
}
