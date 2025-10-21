
import React from "react";
import dynamic from "next/dynamic";
import HeroSection from "./hero/HeroSection";

// Defer below-the-fold sections to reduce initial client bundle and avoid SSR issues
const WorkExperience = dynamic(() => import("./experience/WorkExperience"), { ssr: false });
const TeamSection = dynamic(() => import("./team/TeamSection"), { ssr: false });
const FeaturedProjects = dynamic(() => import("./projects/FeaturedProjects"), { ssr: false });
const About = dynamic(() => import("./About"), { ssr: false });
const Skills = dynamic(() => import("./Skills"), { ssr: false });
const Review = dynamic(() => import("./Review"), { ssr: false });
const Projects = dynamic(() => import("./Projects"), { ssr: false });
const Contact = dynamic(() => import("./Contact"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

const Home = () => {
  return (
    <div className="overflow-hidden bg-[#1a0b2e]">
      <HeroSection />
      <WorkExperience />
      <TeamSection />
      <FeaturedProjects />
      <About />
      <Skills />
      <Review />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
