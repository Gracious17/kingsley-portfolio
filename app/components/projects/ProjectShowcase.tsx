"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ClickIcon1 from "../icons/ClickIcon1";
import ClickIcon2 from "../icons/ClickIcon2";

interface ProjectShowcaseProps {
  title: string;
  description: string;
  mockup: string;
  alignment: "left" | "right";
  demoUrl?: string;
  codeUrl?: string;
  technologies?: string[];
}

const ProjectShowcase = ({ title, description, mockup, alignment, demoUrl, codeUrl, technologies }: ProjectShowcaseProps) => {
  const isLeft = alignment === "left";
  const ClickIcon = isLeft ? ClickIcon1 : ClickIcon2;

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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex gap-6 items-center"
        >
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 8 }}
              whileTap={{ scale: 0.9 }}
              className="p-0 bg-transparent shadow-none hover:drop-shadow-[0_0_15px_rgba(163,98,255,0.5)] transition-all duration-300"
              aria-label="View live demo"
            >
              <ClickIcon width={36} height={36} color="#ccd6f6" />
              <span className="sr-only">View Demo</span>
            </motion.a>
          )}
          {codeUrl && (
            <motion.a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: -8 }}
              whileTap={{ scale: 0.9 }}
              className="p-0 bg-transparent shadow-none hover:drop-shadow-[0_0_15px_rgba(163,98,255,0.5)] transition-all duration-300"
              aria-label="View code"
            >
              <ClickIcon width={36} height={36} color="#ccd6f6" />
              <span className="sr-only">View Code</span>
            </motion.a>
          )}
        </motion.div>
        
        {technologies && technologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-sm font-medium bg-purple-900/30 text-purple-300 rounded-full border border-purple-500/30"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Mockup */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className={`${isLeft ? "lg:col-start-2" : "lg:col-start-1"} relative group`}
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -12 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-purple-600/40 to-purple-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 border-2 border-purple-500/30 group-hover:border-purple-500/50 transition-all duration-500">
            <Image
              src={mockup}
              alt={title}
              width={700}
              height={500}
              className="w-full h-auto"
            />
            
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectShowcase;