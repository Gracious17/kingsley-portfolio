"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  SiTypescript, 
  SiExpress, 
  SiPostgresql, 
  SiPrisma, 
  SiJest, 
  SiPostman, 
  SiJira, 
  SiTrello, 
  SiReactquery,
  SiExpo
} from "react-icons/si";
import { TbBrandReactNative, TbApi } from "react-icons/tb";
import { LuBrainCircuit } from "react-icons/lu";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", icon: "/assets/skill/react.png" },
      { name: "Next.js", icon: "/assets/skill/nextjs.png" },
      { name: "TypeScript", icon: <SiTypescript className="w-full h-full text-[#3178C6]" /> },
      { name: "JavaScript (ES6+)", icon: "/assets/skill/javascript.png" },
      { name: "Tailwind CSS", icon: "/assets/skill/tailwind.png" },
      { name: "React Native", icon: <TbBrandReactNative className="w-full h-full text-[#61DAFB]" /> },
      { name: "Expo", icon: <SiExpo className="w-full h-full text-white" /> },
      { name: "HTML5 & CSS3", icon: "/assets/skill/html.png" },
    ],
  },
  {
    title: "Backend & State",
    skills: [
      { name: "Node.js", icon: "/assets/skill/node.png" },
      { name: "Express.js", icon: <SiExpress className="w-full h-full text-white" /> },
      { name: "Zustand", icon: <LuBrainCircuit className="w-full h-full text-[#43392F]" /> },
      { name: "React Query", icon: <SiReactquery className="w-full h-full text-[#FF4154]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-full h-full text-[#4169E1]" /> },
      { name: "Prisma ORM", icon: <SiPrisma className="w-full h-full text-white" /> },
    ],
  },
  {
    title: "Tools & Testing",
    skills: [
      { name: "Git & GitHub", icon: "/assets/skill/github1.png" },
      { name: "Jest", icon: <SiJest className="w-full h-full text-[#C21325]" /> },
      { name: "Postman", icon: <SiPostman className="w-full h-full text-[#FF6C37]" /> },
      { name: "Jira / Trello", icon: <div className="flex gap-1 w-full h-full"><SiJira className="text-[#0052CC]" /><SiTrello className="text-[#0052CC]" /></div> },
      { name: "REST APIs", icon: <TbApi className="w-full h-full text-primary" /> },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="w-full py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light text-foreground tracking-tight mb-4"
          >
            Technical <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="h-px w-24 bg-primary mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="flex flex-col"
            >
              <h3 className="text-xl font-medium text-foreground mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ x: 10 }}
                    className="group flex items-center justify-between p-4 rounded-xl glass-card border border-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      {skill.icon ? (
                        <div className="relative w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-300 flex items-center justify-center">
                          {typeof skill.icon === 'string' ? (
                            <Image
                              src={skill.icon}
                              alt={skill.name}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            skill.icon
                          )}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                          ⚡
                        </div>
                      )}
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                        {skill.name}
                      </span>
                    </div>
                    
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-all duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
