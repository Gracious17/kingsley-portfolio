"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Html from "../../public/assets/skill/html.png";
import Css from "../../public/assets/skill/css.png";
import ReactLogo from "../../public/assets/skill/react.png";
import Javascript from "../../public/assets/skill/javascript.png";
import Tailwind from "../../public/assets/skill/tailwind.png";
import NextJs from "../../public/assets/skill/nextjs.png";
import Nodejs from "../../public/assets/skill/node.png";
import Github from "../../public/assets/skill/github1.png";

const skills = [
  { name: "HTML", img: Html, alt: "HTML5 logo", level: 95 },
  { name: "CSS", img: Css, alt: "CSS3 logo", level: 90 },
  { name: "JavaScript", img: Javascript, alt: "JavaScript logo", level: 90 },
  { name: "React.js", img: ReactLogo, alt: "React.js logo", level: 88 },
  { name: "Tailwind CSS", img: Tailwind, alt: "Tailwind CSS logo", level: 85 },
  { name: "Next.js", img: NextJs, alt: "Next.js logo", level: 80 },
  { name: "Node.js", img: Nodejs, alt: "Node.js logo", level: 75 },
  { name: "GitHub", img: Github, alt: "GitHub logo", level: 85 },
];

const Skills = () => {
  const [widths, setWidths] = useState(skills.map(() => 0));
  const timeouts = useRef([]);

  // Animate all bars on mount
  useEffect(() => {
    timeouts.current = skills.map((skill, idx) =>
      setTimeout(() => {
        setWidths(w => {
          const copy = [...w];
          copy[idx] = skill.level;
          return copy;
        });
      }, 150 + Math.random() * 300 + idx * 80)
    );
    return () => timeouts.current.forEach(t => clearTimeout(t));
  }, []);

  // Animate on hover/focus
  const handleEnter = idx => {
    setWidths(w => {
      const copy = [...w];
      copy[idx] = skills[idx].level;
      return copy;
    });
  };
  const handleLeave = idx => {
    setWidths(w => {
      const copy = [...w];
      copy[idx] = 0;
      return copy;
    });
    setTimeout(() => {
      setWidths(w => {
        const copy = [...w];
        copy[idx] = skills[idx].level;
        return copy;
      });
    }, 100);
  };

  return (
    <section id="skills" className="w-full lg:h-screen p-2 dark:bg-black dark:text-white">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl tracking-widest uppercase text-[#5651e5] font-semibold mb-2">Skills</p>
        <h2 className="py-2 text-2xl md:text-3xl font-bold mb-6">What I Can Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={skill.name}
              className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/80 shadow-xl dark:shadow-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-md flex flex-col items-center group animate-fadeIn transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-[#5651e5] hover:scale-[1.07] hover:shadow-2xl hover:border-[#5651e5] hover:bg-white/80 dark:hover:bg-gray-900/90 hover:backdrop-blur-xl hover:shadow-[#5651e5]/30 hover:z-10"
              tabIndex={0}
              aria-label={skill.name}
              onMouseEnter={() => handleEnter(idx)}
              onFocus={() => handleEnter(idx)}
              onMouseLeave={() => handleLeave(idx)}
              onBlur={() => handleLeave(idx)}
              style={{ outline: 'none' }}
            >
              <div className="flex flex-col items-center justify-center w-full">
                <Image
                  src={skill.img}
                  alt={skill.alt}
                  width={80}
                  height={80}
                  className="mb-4 object-contain dark:bg-white dark:rounded-full"
                  loading={idx < 4 ? "eager" : "lazy"}
                  priority={idx < 2}
                />
                <h3 className="tracking-widest text-base font-semibold text-gray-800 dark:text-white group-hover:text-[#5651e5] transition-colors duration-200 mb-2">
                  {skill.name}
                </h3>
                {/* Animated Skill Level Bar */}
                <div className="w-full flex flex-col items-center">
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-2 bg-[#5651e5] rounded-full shadow-inner transition-all duration-1000 ease-out"
                      style={{ width: `${widths[idx]}%` }}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      role="progressbar"
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default Skills;

