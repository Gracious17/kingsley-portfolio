"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RiRadioButtonFill } from "react-icons/ri";
import { HiArrowLeft, HiExternalLink, HiCode, HiPlay } from "react-icons/hi";
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

interface Props {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: Props) {
  // Convert both to strings for comparison to ensure matching
  const project = (projects as Project[]).find((p) => String(p.id) === String(params.id));
  const [showVideo, setShowVideo] = useState(false);

  if (!project) return notFound();

  return (
    <div className="w-full bg-[#1a0b2e] text-white min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[60vh] lg:h-[75vh] overflow-hidden"
      >
        {/* Background Image with Parallax Effect */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={project.backgroundImg}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/60 via-transparent to-[#1a0b2e]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-purple-900/30" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[#a362ff] font-['Poppins'] font-semibold text-sm sm:text-base mb-4"
              >
                {project.company}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-['Preahvihear'] font-normal text-white mb-4 drop-shadow-2xl"
              >
                {project.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-lg sm:text-xl lg:text-2xl font-['Poppins'] text-white/90 drop-shadow-lg"
              >
                {project.stack}
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Overview Section */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-['Preahvihear'] font-normal text-white">
                Overview
              </h2>
              <p className="text-base lg:text-lg font-['Poppins'] text-white/80 leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-['Preahvihear'] font-normal text-white">
                Key Features
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 text-white/80 font-['Poppins']"
                  >
                    <span className="text-[#a362ff] mt-1">▸</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Conclusion */}
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-['Preahvihear'] font-normal text-white">
                Conclusion
              </h3>
              <p className="text-base lg:text-lg font-['Poppins'] text-white/80 leading-relaxed">
                {project.conclusion}
              </p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-8"
            >
              {project.demoUrl && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#a362ff] text-white font-['Poppins'] font-semibold shadow-lg shadow-purple-900/50 hover:bg-[#9857d3] transition-colors"
                >
                  <HiExternalLink size={20} />
                  Live Demo
                </motion.a>
              )}
              {project.codeUrl ? (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-transparent border-2 border-[#a362ff] text-[#a362ff] font-['Poppins'] font-semibold hover:bg-[#a362ff] hover:text-white transition-all"
                >
                  <HiCode size={20} />
                  View Code
                </motion.a>
              ) : (
                <button
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-transparent border-2 border-white/20 text-white/40 font-['Poppins'] font-semibold cursor-not-allowed"
                  disabled
                >
                  <HiCode size={20} />
                  Private Code
                </button>
              )}
              {project.video && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowVideo(true)}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-['Poppins'] font-semibold shadow-lg shadow-purple-900/50"
                >
                  <HiPlay size={20} />
                  Watch Demo
                </motion.button>
              )}
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              {/* Technologies Card */}
              <div className="rounded-2xl bg-gradient-to-br from-[#251043]/80 to-[#130428]/80 border border-purple-500/20 p-6 shadow-2xl shadow-purple-900/30 backdrop-blur-sm">
                <h3 className="text-xl font-['Poppins'] font-semibold text-[#a362ff] mb-6 text-center">
                  Technologies Used
                </h3>
                <div className="space-y-3">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-white/90 font-['Poppins'] py-2 px-3 rounded-lg hover:bg-purple-600/10 transition-colors"
                    >
                      <RiRadioButtonFill className="text-[#a362ff] flex-shrink-0" size={12} />
                      <span className="text-sm">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Back Button */}
              <Link href="/#projects">
                <motion.div
                  whileHover={{ scale: 1.02, x: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-transparent border-2 border-purple-500/30 text-white font-['Poppins'] font-semibold hover:border-[#a362ff] hover:bg-[#a362ff]/10 transition-all"
                >
                  <HiArrowLeft size={20} />
                  Back to Projects
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-500/30">
                <video controls autoPlay className="w-full">
                  <source src={project.video} type="video/mp4" />
                </video>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowVideo(false)}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#a362ff] text-white font-bold shadow-lg hover:bg-[#9857d3] transition-colors flex items-center justify-center"
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}