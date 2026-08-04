"use client";

import React, { useState } from 'react';
import { PortfolioPage, PortfolioPageProps } from "./ui/starfall-portfolio-landing";
import Contact from "./Contact";
import PlatformProjects from "./PlatformProjects";
import MobileApps from "./MobileApps";
import Footer from "./Footer";
import Review from "./Review";
import ResumeModal from "./ResumeModal";
import Skills from "./Skills";
import Capabilities from "./Capabilities";

const PortfolioWrapper = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const customPortfolioData: PortfolioPageProps = {
    logo: {
      initials: 'GK',
      name: 'Gracious Kingsley',
    },
    navLinks: [
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#projects' },
      { label: 'Expertise', href: '#skills' },
    ],
    resume: {
      label: 'Download CV',
      onClick: () => setIsResumeModalOpen(true),
    },
    hero: {
      titleLine1: 'Software Engineer &',
      titleLine2Gradient: 'Digital Innovator',
      subtitle: 'I build robust and scalable web and mobile applications with a focus on modern technologies and user-centric design.',
    },
    ctaButtons: {
      primary: {
        label: 'View Projects',
        onClick: () => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      secondary: {
        label: 'Get In Touch',
        onClick: () => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
    },
    stats: [
      { value: '4+', label: 'Years Experience' },
      { value: '15+', label: 'Technologies Mastered' },
      { value: '10+', label: 'Projects Completed' },
    ],
    showAnimatedBackground: true,
  };

  return (
    <>
      <PortfolioPage {...customPortfolioData}>
        <div className="w-full">
            <Capabilities />
        </div>
        <div className="mt-20 md:mt-32 w-full">
            <PlatformProjects />
        </div>
        <div className="mt-20 md:mt-32 w-full">
            <MobileApps />
        </div>
        <div className="mt-20 md:mt-32 w-full">
            <Skills />
        </div>
          <div className="mt-20 md:mt-32 w-full">
              <Review />
          </div>
          <div className="mt-20 md:mt-32 w-full">
              <Contact />
          </div>
          <Footer />
      </PortfolioPage>
      
      <ResumeModal 
         isOpen={isResumeModalOpen} 
         onClose={() => setIsResumeModalOpen(false)} 
       />
    </>
  );
};

export default PortfolioWrapper;
