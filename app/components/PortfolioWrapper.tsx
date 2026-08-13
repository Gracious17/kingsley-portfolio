"use client";

import React, { useState } from 'react';
import { PortfolioPage, PortfolioPageProps } from "./ui/starfall-portfolio-landing";
import { publishedAppCount } from "@/lib/data/projects";
import {
  InView,
  inViewVariants,
  inViewTransition,
  inViewOptions,
} from "./core/in-view";
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

  const sections = [
    {
      key: "about",
      node: <About onDownloadCV={() => setIsResumeModalOpen(true)} />,
      spaced: false,
    },
    { key: "capabilities", node: <Capabilities />, spaced: true },
    { key: "projects", node: <PlatformProjects />, spaced: true },
    { key: "mobile", node: <MobileApps />, spaced: true },
    { key: "skills", node: <Skills />, spaced: true },
    { key: "review", node: <Review />, spaced: true },
    { key: "contact", node: <Contact />, spaced: true },
    { key: "footer", node: <Footer />, spaced: false },
  ];

  return (
    <>
      <PortfolioPage {...customPortfolioData}>
        {/*
          Every section shares one scroll-triggered reveal. `once` stays false,
          so a section re-animates each time it comes back into view.
          overflow-x-hidden guards against the transform briefly widening the
          page during the reveal.
        */}
        <div className="w-full overflow-x-hidden">
          {sections.map(({ key, node, spaced }) => (
            <div key={key} className={spaced ? "mt-20 md:mt-32 w-full" : "w-full"}>
              <InView
                variants={inViewVariants.blurUp}
                transition={inViewTransition}
                viewOptions={inViewOptions}
              >
                {node}
              </InView>
            </div>
          ))}
        </div>
      </PortfolioPage>
      
      <ResumeModal 
         isOpen={isResumeModalOpen} 
         onClose={() => setIsResumeModalOpen(false)} 
       />
    </>
  );
};

export default PortfolioWrapper;
