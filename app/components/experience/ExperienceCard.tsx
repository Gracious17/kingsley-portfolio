"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ExperienceCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

const ExperienceCard = ({ icon, title, description, gradient }: ExperienceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative rounded-2xl p-8 shadow-2xl shadow-purple-900/40 overflow-hidden group cursor-pointer border border-purple-500/20"
      style={{ background: gradient }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex items-start gap-6">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <div className="w-28 h-28 lg:w-32 lg:h-32 relative">
            <Image
              src={icon}
              alt={title}
              width={128}
              height={128}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 pt-2">
          <h3 className="text-2xl lg:text-3xl font-['Poppins'] font-semibold text-white mb-4 leading-tight">
            {title}
          </h3>
          <p className="text-white/80 text-sm lg:text-base font-['Poppins'] font-medium leading-relaxed mb-6">
            {description}
          </p>
          <motion.button
            whileHover={{ x: 8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="text-xs lg:text-sm font-['Poppins'] font-medium text-white/90 uppercase tracking-wider hover:text-[#a362ff] transition-colors inline-flex items-center gap-2"
          >
            Learn More
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/0 group-hover:border-purple-500/40 transition-all duration-500 pointer-events-none" />
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default ExperienceCard;