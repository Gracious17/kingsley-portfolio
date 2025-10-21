"use client";

import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

const experiences = [
  {
    id: 1,
    icon: "/assets/experience-icon-1.svg",
    title: "CIB on the Mobile",
    description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
    gradient: "linear-gradient(95.56deg, rgba(19,4,40,1) 0.58%, rgba(37,16,67,1) 16.31%, rgba(56,18,109,1) 29.32%, rgba(38,16,69,1) 45.66%, rgba(25,6,52,1) 54.44%)",
  },
  {
    id: 2,
    icon: "/assets/experience-icon-2.svg",
    title: "CIB on the Mobile",
    description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
    gradient: "linear-gradient(95.56deg, rgba(19,4,40,1) 0.58%, rgba(37,16,67,1) 16.31%, rgba(56,18,109,1) 29.32%, rgba(38,16,69,1) 45.66%, rgba(25,6,52,1) 54.44%)",
  },
  {
    id: 3,
    icon: "/assets/experience-icon-3.svg",
    title: "CIB on the Mobile",
    description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
    gradient: "linear-gradient(149.88deg, rgba(19,4,40,1) 37.22%, rgba(37,16,67,1) 70.43%, rgba(56,18,109,1) 97.89%, rgba(38,16,69,1) 132.38%, rgba(25,6,52,1) 150.9%)",
  },
  {
    id: 4,
    icon: "/assets/experience-icon-1.svg",
    title: "CIB on the Mobile",
    description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
    gradient: "linear-gradient(149.88deg, rgba(19,4,40,1) 37.22%, rgba(37,16,67,1) 70.43%, rgba(56,18,109,1) 97.89%, rgba(38,16,69,1) 132.38%, rgba(25,6,52,1) 150.9%)",
  },
];

const WorkExperience = () => {
  return (
    <section id="experience" className="relative w-full py-24 lg:py-32 bg-[#1a0b2e] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-800/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-['Preahvihear'] font-normal text-white">
            Work Experience
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ExperienceCard {...experience} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;