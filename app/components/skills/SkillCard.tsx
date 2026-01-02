"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface SkillCardProps {
  name: string;
  img: StaticImageData;
  alt: string;
  level: number;
  color: string;
  className?: string;
  index?: number;
}

const SkillCard = ({ name, img, alt, level, color, className = "", index = 0 }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`group cursor-grab active:cursor-grabbing ${className}`}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={name}
      style={{ outline: 'none' }}
    >
      <div className="relative">
        {/* Skill level ring */}
        <div className="absolute inset-0 rounded-full">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: level / 100 }}
              transition={{ duration: 2, delay: index * 0.1 }}
              style={{
                pathLength: level / 100,
                strokeDasharray: "283",
                strokeDashoffset: 283 - (283 * level) / 100,
              }}
            />
          </svg>
        </div>
        
        <Image
          src={img}
          alt={alt}
          width={100}
          height={100}
          className="pointer-events-none relative z-10 h-24 w-24 lg:h-28 lg:w-28 object-cover mx-auto drop-shadow-lg"
        />
        
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
            filter: "blur(10px)"
          }}
        />
      </div>
      
      <h3 className="mt-4 text-center text-xl lg:text-2xl font-['Poppins'] font-semibold text-white group-hover:text-purple-300 transition-colors">
        {name}
      </h3>
      
      {/* Skill level badge */}
      <motion.div
        className="mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + index * 0.1 }}
      >
        <span 
          className="px-2 py-1 text-xs font-semibold rounded-full"
          style={{ 
            backgroundColor: `${color}20`,
            color: color,
            border: `1px solid ${color}40`
          }}
        >
          {level}%
        </span>
      </motion.div>

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap z-10"
        >
          {level >= 90 ? "Expert Level" : 
           level >= 80 ? "Advanced" : 
           level >= 70 ? "Intermediate" : "Learning"}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillCard;