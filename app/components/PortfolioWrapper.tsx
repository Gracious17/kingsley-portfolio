"use client";

import React, { useState } from 'react';
import { PortfolioPage, PortfolioPageProps } from "./ui/starfall-portfolio-landing";
import { projects as projectData } from "@/lib/data/projects";
import Contact from "./Contact";
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
      subtitle: 'I build robust and scalable web applications with a focus on modern technologies and user-centric design.',
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
    projects: projectData.map((p: any) => ({
      title: p.title,
      description: p.overview,
      tags: p.technologies || [],
      imageContent: p.backgroundImg ? (
        <img 
          src={p.backgroundImg} 
          alt={p.title} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-4xl">🚀</div>
      )
    })),
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
        <div className="mt-32 w-full">
            <Skills />
        </div>
          <div className="mt-32 w-full">
              <Review />
          </div>
          <div id="contact" className="mt-32 w-full">
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
