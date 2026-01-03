import React from "react";
import dynamic from "next/dynamic";
import HeroSection from "./hero/HeroSection";

// Defer below-the-fold sections to reduce initial client bundle and avoid SSR issues
// Added loading states for better UX
const GlobalNetwork = dynamic(() => import("./experience/GlobalNetwork"), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-800/20 animate-pulse rounded-lg" />
});

const TeamSection = dynamic(() => import("./team/TeamSection"), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-800/20 animate-pulse rounded-lg" />
});

const FeaturedProjects = dynamic(() => import("./projects/FeaturedProjects"), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-800/20 animate-pulse rounded-lg" />
});

const About = dynamic(() => import("./About"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-800/20 animate-pulse rounded-lg" />
});

const Skills = dynamic(() => import("./Skills"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-800/20 animate-pulse rounded-lg" />
});

const Review = dynamic(() => import("./Review"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-800/20 animate-pulse rounded-lg" />
});

const Projects = dynamic(() => import("./Projects"), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-800/20 animate-pulse rounded-lg" />
});

const Contact = dynamic(() => import("./Contact"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-800/20 animate-pulse rounded-lg" />
});

const Footer = dynamic(() => import("./Footer"), { 
  ssr: false,
  loading: () => <div className="h-32 bg-gray-800/20 animate-pulse rounded-lg" />
});

const Home = () => {
  return (
    <div className="overflow-hidden bg-[#1a0b2e]">
      <HeroSection />
      <GlobalNetwork />
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
