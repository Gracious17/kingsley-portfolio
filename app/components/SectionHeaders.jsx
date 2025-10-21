"use client";

import { motion } from "framer-motion";

const SectionHeaders = ({ header }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl sm:text-4xl lg:text-5xl font-['Preahvihear'] font-normal text-white mb-4"
    >
      {header}
    </motion.h2>
  );
};

export default SectionHeaders;