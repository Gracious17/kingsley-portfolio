import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Briefcase } from 'lucide-react';

import TiltedDock from './tilted-dock';
import { NameWatermark } from './name-watermark';
import { Typewriter } from './typewriter';
import { HighlightedText } from './highlighted-text';

// Decoration only — keep three.js out of the initial bundle.
const AuroraBackground = dynamic(() => import('./aurora-background'), {
  ssr: false,
});

// --- TYPE DEFINITIONS FOR PROPS --- 
 interface NavLink { label: string; href: string; } 
 interface Project { title: string; description: string; tags: string[]; imageContent?: React.ReactNode; } 
 interface Stat { value: string; label: string; } 
 
 export interface PortfolioPageProps { 
   logo?: { initials: React.ReactNode; name: React.ReactNode; }; 
   navLinks?: NavLink[]; 
   resume?: { label: string; onClick?: () => void; }; 
   hero?: {
     /** Small line above the name, e.g. "HEY THERE ! 👋" */
     eyebrow: string;
     name: string;
     /** Cycled through by the typewriter under the name. */
     roles: string[];
     /** Supports {{phrase|accent}} tokens — see HighlightedText. */
     description: string;
     headshot: { src: string; alt: string };
   };
   ctaButtons?: { primary: { label: string; onClick?: () => void; }; secondary: { label: string; onClick?: () => void; }; }; 
   projects?: Project[]; 
   stats?: Stat[]; 
   showAnimatedBackground?: boolean; 
   children?: React.ReactNode;
 } 
 
 // --- DEFAULT DATA ---
 const defaultData: PortfolioPageProps = { 
   logo: { initials: 'MT', name: 'Meng To' }, 
   navLinks: [ { label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Skills', href: '#skills' } ], 
   resume: { label: 'Resume' }, 
   hero: {
     eyebrow: 'HEY THERE !',
     name: "I'm Meng To",
     roles: ['Creative Developer', 'Digital Designer'],
     description: 'I craft beautiful digital experiences through code and design.',
     headshot: { src: '', alt: '' },
   },
   ctaButtons: { primary: { label: 'View My Work' }, secondary: { label: 'Get In Touch' }, }, 
   projects: [ { title: 'FinTech Mobile App', description: 'React Native app with AI-powered financial insights.', tags: ['React Native', 'Node.js'] }, { title: 'Data Visualization Platform', description: 'Interactive dashboard for complex data analysis.', tags: ['D3.js', 'Python'] }, { title: '3D Portfolio Site', description: 'Immersive WebGL experience with 3D elements.', tags: ['Three.js', 'WebGL'] }, ], 
   stats: [ { value: '50+', label: 'Projects Completed' }, { value: '5+', label: 'Years Experience' }, { value: '15+', label: 'Happy Clients' }, ], 
 }; 
 
 // --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton: React.FC<{ 
    children: React.ReactNode; 
    onClick?: () => void; 
    className?: string;
}> = ({ children, onClick, className }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 15, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        mouseX.set((clientX - centerX) * 0.5);
        mouseY.set((clientY - centerY) * 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.button
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

// --- MAIN CUSTOMIZABLE PORTFOLIO COMPONENT --- 
 const PortfolioPage: React.FC<PortfolioPageProps> = ({ 
   logo = defaultData.logo!, 
   navLinks = defaultData.navLinks!, 
   resume = defaultData.resume!, 
   hero = defaultData.hero!, 
   ctaButtons = defaultData.ctaButtons!, 
   stats = defaultData.stats!, 
   showAnimatedBackground = true, 
   children,
 }) => { 
   return ( 
     <div className="bg-background text-foreground geist-font min-h-screen relative overflow-x-hidden selection:bg-white selection:text-black"> 
       {showAnimatedBackground && (
         <div className="fixed inset-0 z-0 pointer-events-none">
           <AuroraBackground />
         </div>
       )} 
       
       <NameWatermark name={logo.name as string} />
       <TiltedDock resumeClick={resume.onClick} />
       
       <div className="relative z-10 w-full flex flex-col items-center"> 
         {/* Hero Section */}
         <section id="about" className="w-full min-h-[100dvh] flex flex-col justify-center px-5 sm:px-6 pt-28 md:pt-32 pb-10">
             <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">

                 {/* Left: copy */}
                 <div className="order-2 lg:order-1 text-center lg:text-left">
                     <motion.p
                         initial={{ opacity: 0, y: 12 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5 }}
                         className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a362ff] inter-font mb-4"
                     >
                         {hero.eyebrow} <span className="ml-1">👋</span>
                     </motion.p>

                     <motion.h1
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.7, delay: 0.05 }}
                         className="text-4xl sm:text-5xl md:text-6xl font-bold text-white geist-font tracking-tight leading-[1.08]"
                     >
                         {hero.name}
                     </motion.h1>

                     <motion.div
                         initial={{ opacity: 0, y: 16 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.7, delay: 0.15 }}
                         className="mt-4 flex items-center justify-center lg:justify-start gap-3"
                     >
                         <span className="hidden sm:block h-px w-10 bg-white/25 shrink-0" />
                         <Typewriter
                             words={hero.roles}
                             className="text-lg sm:text-2xl md:text-3xl font-light text-white/80 tracking-wide geist-font"
                         />
                     </motion.div>

                     <motion.div
                         initial={{ opacity: 0, y: 16 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.7, delay: 0.25 }}
                         className="mt-6 max-w-xl mx-auto lg:mx-0"
                     >
                         <HighlightedText
                             text={hero.description}
                             className="text-sm sm:text-base text-white/60 inter-font leading-relaxed"
                         />
                     </motion.div>

                     <motion.div
                         initial={{ opacity: 0, y: 16 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.7, delay: 0.35 }}
                         className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center"
                     >
                         <MagneticButton
                             onClick={ctaButtons.primary?.onClick}
                             className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-[#a362ff] px-7 py-3.5 text-sm font-bold text-white inter-font transition-all hover:bg-[#b47dff] hover:shadow-[0_0_28px_rgba(163,98,255,0.4)]"
                         >
                             {ctaButtons.primary.label}
                             <Briefcase size={16} />
                         </MagneticButton>
                         <MagneticButton
                             onClick={ctaButtons.secondary?.onClick}
                             className="glass-button w-full sm:w-auto rounded-xl px-7 py-3.5 text-sm font-semibold text-white inter-font"
                         >
                             {ctaButtons.secondary.label}
                         </MagneticButton>
                     </motion.div>
                 </div>

                 {/* Right: headshot */}
                 {hero.headshot?.src && (
                     <motion.div
                         initial={{ opacity: 0, scale: 0.94 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                         className="order-1 lg:order-2 flex justify-center"
                     >
                         <div className="relative w-52 h-52 sm:w-72 sm:h-72 lg:w-[22rem] lg:h-[22rem]">
                             <div className="absolute -inset-5 rounded-full bg-[#a362ff]/15 blur-2xl" />
                             <div className="relative w-full h-full rounded-full overflow-hidden border border-white/15 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                                 <Image
                                     src={hero.headshot.src}
                                     alt={hero.headshot.alt}
                                     fill
                                     priority
                                     sizes="(max-width: 640px) 13rem, (max-width: 1024px) 18rem, 22rem"
                                     className="object-cover"
                                 />
                             </div>
                         </div>
                     </motion.div>
                 )}
             </div>

             {/* Stats strip */}
             <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7, delay: 0.5 }}
                 className="max-w-7xl w-full mx-auto mt-14 md:mt-20 border-t border-white/10 pt-8"
             >
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
                     {stats.map((stat, index) => (
                         <div key={index} className="text-center">
                             <div className="text-2xl md:text-3xl font-bold text-[#a362ff] geist-font tracking-tight">
                                 {stat.value}
                             </div>
                             <p className="mt-2 text-[11px] md:text-xs text-white/45 inter-font leading-snug max-w-[15rem] mx-auto">
                                 {stat.label}
                             </p>
                         </div>
                     ))}
                 </div>
             </motion.div>
         </section>

         {/* Other Sections (Children) */}
         <div className="w-full relative z-20">
            {children}
         </div>
       </div> 
     </div> 
   ); 
 }; 
 
 export {PortfolioPage}; 
