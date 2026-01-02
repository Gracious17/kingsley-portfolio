"use client";


import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Grid card with 3D flip front/back
const ProjectItem = ({ title, backgroundImg, projectUrl, stack, technologies = [] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="group perspective-1000 h-[360px] sm:h-[380px]">
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front face */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          whileHover={{ scale: 1.01, y: -6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-purple-900/40 border border-purple-500/20 bg-gradient-to-br from-[#251043]/90 to-[#130428]/90 backdrop-blur-sm h-full">
            {/* Image container */}
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full h-full">
                <Image className="w-full h-full object-cover" width={500} height={400} src={backgroundImg} alt={title} />
              </motion.div>

              {/* Animated overlays */}
              <motion.div initial={{ opacity: 0.7 }} whileHover={{ opacity: 0.95 }} transition={{ duration: 0.4 }} className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-[#1a0b2e]/70 to-transparent" />
              <motion.div initial={{ opacity: 0, x: "-100%" }} whileHover={{ opacity: 1, x: "100%" }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <motion.div initial={{ opacity: 0.8, y: 10 }} whileHover={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="text-2xl sm:text-3xl lg:text-4xl font-['Poppins'] font-bold text-white tracking-wide drop-shadow-2xl">
                  {title}
                </motion.h3>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="text-white/90 text-sm sm:text-base lg:text-lg font-['Poppins'] font-medium drop-shadow-lg px-4">
                  {stack}
                </motion.p>

                {/* Action row */}
                <div className="flex items-center justify-center gap-3">
                  <Link href={projectUrl} className="px-6 py-2 rounded-full bg-gradient-to-r from-white to-gray-100 text-[#1a0b2e] font-['Poppins'] font-bold text-sm shadow-2xl hover:from-[#a362ff] hover:to-[#9857d3] hover:text-white transition-all duration-300">
                    View Project
                  </Link>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsFlipped(true); }}
                    className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-['Poppins'] text-sm hover:bg-white/20 transition-all"
                  >
                    Flip Card
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Back face */}
        <motion.div className="absolute inset-0 backface-hidden rotate-y-180" style={{ transform: "rotateY(180deg)" }}>
          <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-purple-800/60 backdrop-blur-sm">
            <div className="p-6 h-full flex flex-col justify-center items-center text-center space-y-4">
              <h4 className="text-xl sm:text-2xl font-['Poppins'] font-bold text-white">{title}</h4>
              <p className="text-white/90 text-sm sm:text-base font-['Poppins']">{stack}</p>

              {technologies && technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full border border-white/20">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Link href={projectUrl} className="px-5 py-2 rounded-full bg-purple-600/30 border border-purple-500/50 text-white hover:bg-purple-600/40">
                  View Details
                </Link>
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsFlipped(false); }} className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20">
                  Flip Back
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectItem;