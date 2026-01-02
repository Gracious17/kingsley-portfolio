"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Html from "../../public/assets/skill/html.png";
import Css from "../../public/assets/skill/css.png";
import ReactLogo from "../../public/assets/skill/react.png";
import Javascript from "../../public/assets/skill/javascript.png";
import Tailwind from "../../public/assets/skill/tailwind.png";
import NextJs from "../../public/assets/skill/nextjs.png";
import Nodejs from "../../public/assets/skill/node.png";
import Github from "../../public/assets/skill/github1.png";
import SectionHeaders from "./SectionHeaders";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "./ui/draggable-card";
import SkillCard from "./skills/SkillCard";
import SkillProgressBar from "./skills/SkillProgressBar";

const skills = [
  { name: "HTML", img: Html, alt: "HTML5 logo", level: 95,
    className: "absolute top-10 left-[20%] rotate-[-5deg]",
    color: "#e34c26"
   },
  { name: "CSS", img: Css, alt: "CSS3 logo", level: 90,
    className: "absolute top-40 left-[25%] rotate-[-7deg]",
    color: "#1572b6"
  },
  { name: "JavaScript", img: Javascript, alt: "JavaScript logo", level: 90,
    className: "absolute top-5 left-[40%] rotate-[8deg]",
    color: "#f7df1e"
   },
  { name: "React.js", img: ReactLogo, alt: "React.js logo", level: 88,
     className: "absolute top-32 left-[55%] rotate-[10deg]",
     color: "#61dafb"
   },
  { name: "Tailwind CSS", img: Tailwind, alt: "Tailwind CSS logo", level: 85,
    className: "absolute top-20 right-[35%] rotate-[2deg]",
    color: "#06b6d4"
   },
  { name: "Next.js", img: NextJs, alt: "Next.js logo", level: 80,
    className: "absolute top-24 left-[45%] rotate-[-7deg]",
    color: "#000000"
   },
  { name: "Node.js", img: Nodejs, alt: "Node.js logo", level: 75,
    className: "absolute top-8 left-[30%] rotate-[4deg]",
    color: "#339933"
   },
  { name: "GitHub", img: Github, alt: "GitHub logo", level: 85,
    className: "absolute top-8 left-[30%] rotate-[4deg]",
    color: "#181717"
   },
];

// Animated Skill Bar Component
const AnimatedSkillBar = ({ skill, index, inView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${skill.level}%`,
        transition: {
          duration: 1.5,
          delay: index * 0.2,
          ease: "easeOut"
        }
      });
      
      if (skill.level >= 85) {
        setTimeout(() => {
          setShowAchievement(true);
        }, 1500 + (index * 200));
      }
    }
  }, [inView, controls, skill.level, index]);

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
              src={skill.img}
              alt={skill.alt}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            {showAchievement && skill.level >= 85 && (
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
            {skill.name}
          </span>
        </div>
        <motion.span
          className="text-purple-300 font-['Poppins'] font-semibold text-sm"
          animate={isHovered ? { scale: 1.1, color: skill.color } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={isHovered ? { 
            boxShadow: `0 0 20px ${skill.color}40` 
          } : {}}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ backgroundColor: skill.color }}
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
          style={{ left: `${skill.level}%` }}
        />
      </div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap z-10"
        >
          {skill.level >= 90 ? "Expert Level" : 
           skill.level >= 80 ? "Advanced" : 
           skill.level >= 70 ? "Intermediate" : "Learning"}
        </motion.div>
      )}
    </motion.div>
  );
};

const Skills = () => {
  const [viewMode, setViewMode] = useState("draggable"); // "draggable" or "bars"
  const skillBarsRef = React.useRef(null);
  const isInView = useInView(skillBarsRef, { once: true, threshold: 0.3 });

  return (
    <section id="skills" className="w-full lg:min-h-screen p-2 bg-[#1a0b2e] text-white py-24 lg:py-32">
      <div className="text-center mb-16">
        <SectionHeaders header="What I Can Do"/>
        
        {/* View Mode Toggle */}
        <motion.div 
          className="flex justify-center mt-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/10 rounded-full p-1 backdrop-blur-sm">
            <button
              onClick={() => setViewMode("draggable")}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-['Poppins'] text-sm ${
                viewMode === "draggable" 
                  ? "bg-purple-600 text-white shadow-lg" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              Interactive View
            </button>
            <button
              onClick={() => setViewMode("bars")}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-['Poppins'] text-sm ${
                viewMode === "bars" 
                  ? "bg-purple-600 text-white shadow-lg" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              Progress View
            </button>
          </div>
        </motion.div>
      </div>

      {/* Draggable Skills View */}
      {viewMode === "draggable" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <DraggableCardContainer
            className="relative flex h-[600px] lg:h-[700px] w-full items-center justify-center overflow-clip rounded-full">
            <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-xl sm:text-2xl lg:text-3xl font-['Preahvihear'] font-normal text-white/60">
              Very Familiar with these tools.
            </p>
            {skills.map((item, index) => (
              <DraggableCardBody 
                key={item.name} 
                className={`${item.className} group cursor-grab active:cursor-grabbing`}
                aria-label={item.name}
                style={{ outline: 'none' }}
              >
                <SkillCard
                  index={index}
                  name={item.name}
                  img={item.img}
                  alt={item.alt}
                  level={item.level}
                  color={item.color}
                />
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </motion.div>
      )}

      {/* Animated Progress Bars View */}
      {viewMode === "bars" && (
        <motion.div
          ref={skillBarsRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4"
        >
          <div className="grid gap-6 md:gap-8">
            {skills.map((skill, index) => (
              <SkillProgressBar
                key={skill.name}
                name={skill.name}
                img={skill.img}
                alt={skill.alt}
                level={skill.level}
                color={skill.color}
                index={index}
                inView={isInView}
              />
            ))}
          </div>
          
          {/* Achievement Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 2 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-full border border-purple-500/30">
              <span className="text-yellow-400 text-xl">🏆</span>
              <span className="text-white font-['Poppins'] font-medium">
                {skills.filter(s => s.level >= 85).length} Expert Skills Unlocked
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Skills;





