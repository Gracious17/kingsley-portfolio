"use client";

import { motion, useAnimation } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";

interface SkillProgressBarProps {
  name: string;
  img: StaticImageData;
  alt: string;
  level: number;
  color: string;
  index: number;
  inView: boolean;
}

const SkillProgressBar = ({ name, img, alt, level, color, index, inView }: SkillProgressBarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${level}%`,
        transition: {
          duration: 1.5,
          delay: index * 0.2,
          ease: "easeOut"
        }
      });
      
      if (level >= 85) {
        setTimeout(() => {
          setShowAchievement(true);
        }, 1500 + (index * 200));
      }
    }
  }, [inView, controls, level, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={img}
              alt={alt}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            {showAchievement && level >= 85 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <span className="text-xs">⭐</span>
              </motion.div>
            )}
          </div>
          <span className="text-white font-['Poppins'] font-medium text-sm lg:text-base">
            {name}
          </span>
        </div>
        <motion.span
          className="text-purple-300 font-['Poppins'] font-semibold text-sm"
          animate={isHovered ? { scale: 1.1, color: color } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {level}%
        </motion.span>
      </div>
      
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={isHovered ? { 
            boxShadow: `0 0 20px ${color}40` 
          } : {}}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={controls}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
          />
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
        <motion.div
          className="absolute top-0 h-full w-1 bg-white/60 rounded-full"
          initial={{ left: 0 }}
          animate={controls}
          style={{ left: `${level}%` }}
        />
      </div>
      
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

export default SkillProgressBar;