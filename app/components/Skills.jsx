"use client";
import Image from "next/image";
import React from "react";
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
 

const skills = [
  { name: "HTML", img: Html, alt: "HTML5 logo", level: 95,
    className: "absolute top-10 left-[20%] rotate-[-5deg]",
   },
  { name: "CSS", img: Css, alt: "CSS3 logo", level: 90 ,
    className: "absolute top-40 left-[25%] rotate-[-7deg]",
  },
  { name: "JavaScript", img: Javascript, alt: "JavaScript logo", level: 90,

    className: "absolute top-5 left-[40%] rotate-[8deg]",
   },
  { name: "React.js", img: ReactLogo, alt: "React.js logo", level: 88,
     className: "absolute top-32 left-[55%] rotate-[10deg]",
   },
  { name: "Tailwind CSS", img: Tailwind, alt: "Tailwind CSS logo", level: 85,
    className: "absolute top-20 right-[35%] rotate-[2deg]",
   },
  { name: "Next.js", img: NextJs, alt: "Next.js logo", level: 80,
    className: "absolute top-24 left-[45%] rotate-[-7deg]",
   },
  { name: "Node.js", img: Nodejs, alt: "Node.js logo", level: 75,
    className: "absolute top-8 left-[30%] rotate-[4deg]",
   },
  { name: "GitHub", img: Github, alt: "GitHub logo", level: 85,
    className: "absolute top-8 left-[30%] rotate-[4deg]",
   },
];

const Skills = () => {
  return (
    <section id="skills" className="w-full lg:h-screen p-2 dark:bg-black dark:text-white">
<SectionHeaders header="What I Can Do"/>
        <DraggableCardContainer
      className="relative flex h-[600px] w-full items-center justify-center overflow-clip rounded-full">
      <p
        className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        Very Familiar with these tools .
      </p>
      {skills.map((item) => (
        <DraggableCardBody key={item.name} className={`${item.className} `}
      aria-label={item.name}
         style={{ outline: 'none' }}>
          <Image
                 src={item.img}
                 alt={item.alt}
              width={80}
               height={80}
            className="pointer-events-none relative z-10 h-30 w-30 object-cover mx-auto"
            />
          <h3
            className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.name}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
    </section>
  );
};





export default Skills;





