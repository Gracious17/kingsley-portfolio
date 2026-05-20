"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", icon: "/assets/skill/react.png" },
      { name: "Next.js", icon: "/assets/skill/nextjs.png" },
      { name: "TypeScript", icon: null },
      { name: "JavaScript (ES6+)", icon: "/assets/skill/javascript.png" },
      { name: "Tailwind CSS", icon: "/assets/skill/tailwind.png" },
      { name: "React Native", icon: null },
      { name: "Expo", icon: null },
      { name: "HTML5 & CSS3", icon: "/assets/skill/html.png" },
    ],
  },
  {
    title: "Backend & State",
    skills: [
      { name: "Node.js", icon: "/assets/skill/node.png" },
      { name: "Express.js", icon: null },
      { name: "Zustand", icon: null },
      { name: "React Query", icon: null },
      { name: "PostgreSQL", icon: null },
      { name: "Prisma ORM", icon: null },
    ],
  },
  {
    title: "Tools & Testing",
    skills: [
      { name: "Git & GitHub", icon: "/assets/skill/github1.png" },
      { name: "Jest", icon: null },
      { name: "Postman", icon: null },
      { name: "Jira / Trello", icon: null },
      { name: "REST APIs", icon: null },
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
                        <div className="relative w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-300">
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            fill
                            className="object-contain"
                          />
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
