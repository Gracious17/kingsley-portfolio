"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ProjectItem = ({ title, backgroundImg, projectUrl, stack }) => {
  return (
    <Link href={projectUrl} className="block group h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -12, scale: 1.02 }}
        className="relative overflow-hidden rounded-2xl shadow-2xl shadow-purple-900/40 border border-purple-500/20 bg-gradient-to-br from-[#251043]/90 to-[#130428]/90 backdrop-blur-sm h-full"
      >
        {/* Image container */}
        <div className="relative h-72 sm:h-80 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              className="w-full h-full object-cover"
              width={500}
              height={400}
              src={backgroundImg}
              alt={title}
            />
          </motion.div>
          
          {/* Animated gradient overlay */}
          <motion.div
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-[#1a0b2e]/70 to-transparent"
          />
          
          {/* Animated glow effect */}
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            whileHover={{ opacity: 1, x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-600/30 to-transparent"
          />

          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            initial={{ opacity: 0.8, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-['Poppins'] font-bold text-white tracking-wide drop-shadow-2xl"
            >
              {title}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/90 text-sm sm:text-base lg:text-lg font-['Poppins'] font-medium drop-shadow-lg px-4"
            >
              {stack}
            </motion.p>
            
            {/* Call to action button with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <span className="px-8 py-3 rounded-full bg-gradient-to-r from-white to-gray-100 text-[#1a0b2e] font-['Poppins'] font-bold text-base shadow-2xl group-hover:from-[#a362ff] group-hover:to-[#9857d3] group-hover:text-white transition-all duration-500 inline-flex items-center gap-2">
                View Project
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated border glow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-2xl border-2 border-[#a362ff]/60 pointer-events-none"
        />

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      </motion.div>
    </Link>
  );
};

export default ProjectItem;