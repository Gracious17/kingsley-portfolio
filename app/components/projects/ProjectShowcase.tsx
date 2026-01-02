"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ClickIcon1 from "../icons/ClickIcon1";
import ClickIcon2 from "../icons/ClickIcon2";
import Tooltip from "../shared/Tooltip";
import FlipCard from "../shared/FlipCard";
import ProjectBackContent from "./ProjectBackContent";

interface ProjectShowcaseProps {
  title: string;
  description: string;
  mockup: string;
  alignment: "left" | "right";
  demoUrl?: string;
  codeUrl?: string;
  technologies?: string[];
  highlights?: string[];
  insights?: string[];
}

const ProjectShowcase = ({ title, description, mockup, alignment, demoUrl, codeUrl, technologies, highlights = [], insights = [] }: ProjectShowcaseProps) => {
  const isLeft = alignment === "left";
  const ClickIcon = isLeft ? ClickIcon1 : ClickIcon2;
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className={`grid lg:grid-cols-2 gap-16 items-center ${isLeft ? "" : "lg:grid-flow-dense"}`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`${isLeft ? "lg:col-start-1" : "lg:col-start-2"} space-y-8`}
      >
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#9857d3] font-['Poppins'] font-semibold text-base lg:text-lg tracking-wide"
          >
            Featured Project
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-['Poppins'] font-semibold text-[#ccd6f6] leading-tight"
          >
            {title}
          </motion.h3>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base lg:text-lg font-['Poppins'] font-medium text-[#ccd6f6]/90 leading-relaxed"
        >
          {description}
        </motion.p>

        <div className="flex gap-6 items-center">
          {demoUrl && (
            <Tooltip
              content="🚀 Launch Demo"
              show={showPreview}
              variant="purple"
            >
              <motion.a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                className="group relative p-0 bg-transparent shadow-none hover:drop-shadow-[0_0_15px_rgba(163,98,255,0.5)] transition-all duration-300"
                aria-label="View live demo"
                onMouseEnter={() => setShowPreview(true)}
                onMouseLeave={() => setShowPreview(false)}
              >
                <ClickIcon width={36} height={36} color="#ccd6f6" />
                <span className="sr-only">View Demo</span>
              </motion.a>
            </Tooltip>
          )}
          {codeUrl && (
            <Tooltip
              content="💻 View Source"
              show={true}
              variant="gray"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <motion.a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: -8 }}
                whileTap={{ scale: 0.9 }}
                className="group relative p-0 bg-transparent shadow-none hover:drop-shadow-[0_0_15px_rgba(163,98,255,0.5)] transition-all duration-300"
                aria-label="View code"
              >
                <ClickIcon width={36} height={36} color="#ccd6f6" />
                <span className="sr-only">View Code</span>
              </motion.a>
            </Tooltip>
          )}
          
          {/* Flip card button */}
          <Tooltip
            content="✨ Flip Card"
            show={true}
            variant="purple"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <motion.button
              onClick={() => setIsFlipped(!isFlipped)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group relative p-2 bg-purple-600/20 rounded-full border border-purple-500/30 hover:bg-purple-600/30 hover:border-purple-500/50 transition-all duration-300"
              aria-label="Flip project card"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-purple-300">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </motion.div>
            </motion.button>
          </Tooltip>
        </div>
        
        {technologies && technologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {technologies.map((tech, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-1 text-sm font-medium bg-purple-900/30 text-purple-300 rounded-full border border-purple-500/30 hover:bg-purple-900/50 hover:border-purple-500/50 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Mockup with Flip Animation */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className={`${isLeft ? "lg:col-start-2" : "lg:col-start-1"} relative group perspective-1000 h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px]`}
      >
        <FlipCard
          isFlipped={isFlipped}
          onFlip={(flipped) => setIsFlipped(flipped)}
          className="w-full h-full"
          height="h-full"
          clickToFlip={false}
          frontContent={
            <motion.div
              className="cursor-pointer h-full"
              whileHover={{ scale: 1.03, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={() => setIsFlipped(true)}
              aria-label="Flip card to back"
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-purple-600/40 to-purple-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 border-2 border-purple-500/30 group-hover:border-purple-500/50 transition-all duration-500 h-full">
                <Image
                  src={mockup}
                  alt={title}
                  width={700}
                  height={500}
                  className="w-full h-auto"
                />
                
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Interactive elements overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="bg-black/50 backdrop-blur-sm rounded-full p-4"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M15 12L9 16.5V7.5L15 12Z" fill="currentColor"/>
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          }
          backContent={
            <ProjectBackContent
              title={title}
              technologies={technologies}
              demoUrl={demoUrl}
              codeUrl={codeUrl}
              onFlipBack={() => setIsFlipped(false)}
              isFlipped={isFlipped}
            />
          }
        />
      </motion.div>
    </div>
  );
};

export default ProjectShowcase;