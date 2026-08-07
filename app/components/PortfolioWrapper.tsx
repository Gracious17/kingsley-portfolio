"use client";

import React, { useState } from 'react';
import { PortfolioPage, PortfolioPageProps } from "./ui/starfall-portfolio-landing";
import { publishedAppCount } from "@/lib/data/projects";
import About from "./About";
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
      eyebrow: 'HEY THERE !',
      name: "I'm Gracious Kingsley",
      roles: [
        'Full-Stack & Mobile Engineer',
        'React & Next.js Specialist',
        'React Native Developer',
      ],
      description:
        'I build web and mobile products where the details matter: {{multi-tenant SaaS platforms|violet}}, {{role-based dashboards|sky}} and {{real-time systems|sky}}, alongside {{14 published mobile apps|violet}} on Google Play and the App Store.',
      headshot: {
        src: 'https://res.cloudinary.com/dblsgkbk4/image/upload/v1786105476/IMG-20260803-WA0013_vxkhva.jpg',
        alt: 'Gracious Kingsley',
      },
    },
    ctaButtons: {
      primary: {
        label: 'View Works',
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
      {
        value: String(publishedAppCount),
        label: 'Published mobile apps on Google Play and the App Store',
      },
      { value: '5,000+', label: 'Learners served on the Hallos live-class platform' },
      { value: '50+', label: 'Feature domains shipped in the StayOps hotel ERP' },
      { value: '4+', label: 'Years building production web and mobile systems' },
    ],
    showAnimatedBackground: true,
  };

  return (
    <>
      <PortfolioPage {...customPortfolioData}>
        <div className="w-full">
            <About onDownloadCV={() => setIsResumeModalOpen(true)} />
        </div>
        <div className="mt-20 md:mt-32 w-full">
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
