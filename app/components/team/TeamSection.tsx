"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TeamSection = () => {
  return (
    <section className="relative w-full py-32 lg:py-40 bg-[#1a0b2e] overflow-hidden">
      {/* Central glowing logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -inset-x-20 -inset-y-20 bg-purple-600/50 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/assets/central-logo-glow.svg"
              alt="Logo"
              width={500}
              height={500}
              className="relative z-10 opacity-60"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xl sm:text-2xl lg:text-3xl font-['Preahvihear'] text-white/90 mb-3 leading-relaxed">
            I&apos;m currently looking to join a{" "}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#a362ff] font-semibold"
            >
              cross-functional
            </motion.span>{" "}
            team
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-['Preahvihear'] text-white/90 leading-relaxed">
            that values improving people&apos;s lives through accessible design
          </p>
        </motion.div>

        {/* Tech stack icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/assets/tech-stack-grid.svg"
              alt="Tech stack"
              width={700}
              height={120}
              className="mx-auto max-w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;