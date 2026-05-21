"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface NameWatermarkProps {
  name: string;
}

export const NameWatermark: React.FC<NameWatermarkProps> = ({ name }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.07, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -150]);

  const words = name.split(" ");

  return (
    <motion.div
      className="fixed top-0 inset-x-0 flex flex-col justify-start items-center select-none pointer-events-none z-[1] pt-32 md:pt-48 overflow-hidden"
      style={{ opacity, y }}
    >
      {words.map((word, index) => (
        <h1 
          key={index}
          className="text-[18vw] sm:text-[20vw] md:text-[15vw] font-bold text-white text-center leading-[0.75] tracking-tighter uppercase italic"
        >
          {word}
        </h1>
      ))}
    </motion.div>
  );
};
