"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from "./ui/reveal-on-hover";
import { Badge } from "./ui/badge";
import { projects } from "@/lib/data/projects";

interface Project {
  id: number;
  title: string;
  stack: string;
  overview: string;
  features: string[];
  conclusion: string;
  backgroundImg: string;
  demoUrl: string;
  codeUrl: string;
  video: string;
  technologies: string[];
  company?: string;
  role?: string;
  duration?: string;
}

export default function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = window.innerWidth * 0.4; // Scroll by roughly one card width
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="w-full bg-transparent py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-1.5 border-[#a362ff]/20 text-[#a362ff] bg-[#a362ff]/5">
              Selected Works
            </Badge>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight geist-font">
              Featured <span className="text-white/40 italic">Projects</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-md text-sm md:text-base inter-font font-light leading-relaxed">
            A collection of digital experiences crafted with precision, focusing on performance, scalability, and user-centric design.
          </p>
        </motion.div>
      </div>

      <div className="relative group">
        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-40 hidden md:block">
          <button
            onClick={() => scroll('left')}
            className="p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all shadow-2xl"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-40 hidden md:block">
          <button
            onClick={() => scroll('right')}
            className="p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all shadow-2xl"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 px-4 md:px-[10vw] py-12 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {(projects as Project[]).map((project) => (
                <CardHoverReveal
                  key={project.id}
                  className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[45vw] lg:min-w-[40vw] aspect-[4/5] sm:aspect-[16/10] rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl snap-center"
                >
                  <CardHoverRevealMain>
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={project.backgroundImg}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 40vw"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        priority={project.id <= 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
                    </div>
                  </CardHoverRevealMain>

              <CardHoverRevealContent className="bg-zinc-900/80 backdrop-blur-2xl border-t border-white/10 p-5 md:p-8 space-y-4 md:space-y-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-white/5 border-white/10 text-white/60 text-[10px] md:text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="bg-white/5 border-white/10 text-white/40 text-[10px] md:text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-lg md:text-2xl font-medium text-white geist-font tracking-tight">
                        {project.title}
                      </h3>
                      {(project.company || project.role) && (
                        <p className="text-[#a362ff] text-[10px] md:text-xs font-medium uppercase tracking-widest inter-font">
                          {project.role || project.company} {project.company && project.role ? `at ${project.company}` : ''}
                        </p>
                      )}
                    </div>
                    <p className="text-white/50 text-[11px] md:text-sm line-clamp-2 md:line-clamp-3 inter-font leading-relaxed font-light">
                      {project.overview}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-1 md:pt-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-semibold text-white hover:text-[#a362ff] transition-colors group/link"
                    >
                      Live <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform md:size-[14px]" />
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-semibold text-white/60 hover:text-white transition-colors"
                    >
                      Code <Github size={12} className="md:size-[14px]" />
                    </a>
                  )}
                </div>
              </CardHoverRevealContent>
            </CardHoverReveal>
          ))}
          
            {/* Final "Contact Me" slide */}
            <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[45vw] lg:min-w-[40vw] aspect-[4/5] sm:aspect-[16/10] rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-8 md:p-12 space-y-6 bg-white/[0.01] snap-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <ArrowRight className="text-[#a362ff]" size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">Interested in working together?</h3>
            <p className="text-white/40 text-sm inter-font">Let&apos;s discuss your next project.</p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white text-black rounded-full font-semibold uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all shadow-lg shadow-white/10"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
