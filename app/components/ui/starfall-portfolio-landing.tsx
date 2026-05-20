import React, { useEffect, useRef, useState } from 'react'; 
import * as THREE from 'three'; 
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'; 
 
 import TiltedDock from './tilted-dock';
import { NameWatermark } from './name-watermark';

// --- TYPE DEFINITIONS FOR PROPS --- 
 interface NavLink { label: string; href: string; } 
 interface Project { title: string; description: string; tags: string[]; imageContent?: React.ReactNode; } 
 interface Stat { value: string; label: string; } 
 
 export interface PortfolioPageProps { 
   logo?: { initials: React.ReactNode; name: React.ReactNode; }; 
   navLinks?: NavLink[]; 
   resume?: { label: string; onClick?: () => void; }; 
   hero?: { titleLine1: React.ReactNode; titleLine2Gradient: React.ReactNode; subtitle: React.ReactNode; }; 
   ctaButtons?: { primary: { label: string; onClick?: () => void; }; secondary: { label: string; onClick?: () => void; }; }; 
   projects?: Project[]; 
   stats?: Stat[]; 
   showAnimatedBackground?: boolean; 
   children?: React.ReactNode;
 } 
 
 // --- INTERNAL ANIMATED BACKGROUND COMPONENT --- 
 const AuroraBackground: React.FC = () => { 
     const mountRef = useRef<HTMLDivElement>(null); 
     useEffect(() => { 
         if (!mountRef.current) return; 
         const currentMount = mountRef.current; 
         const scene = new THREE.Scene(); 
         const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1); 
         const renderer = new THREE.WebGLRenderer(); 
         renderer.setSize(window.innerWidth, window.innerHeight); 
         renderer.domElement.style.position = 'fixed'; 
         renderer.domElement.style.top = '0'; 
         renderer.domElement.style.left = '0'; 
         renderer.domElement.style.zIndex = '0'; 
         renderer.domElement.style.display = 'block'; 
         currentMount.appendChild(renderer.domElement); 
         const material = new THREE.ShaderMaterial({ 
             uniforms: { iTime: { value: 0 }, iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) } }, 
             vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`, 
             fragmentShader: ` 
                 uniform float iTime; uniform vec2 iResolution; 
                 #define NUM_OCTAVES 3 
                 float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); } 
                 float noise(vec2 p){ vec2 ip=floor(p);vec2 u=fract(p);u=u*u*(3.0-2.0*u);float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);return res*res; } 
                 float fbm(vec2 x) { float v=0.0;float a=0.3;vec2 shift=vec2(100);mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.4;}return v;} 
                 void main() { 
                     vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.,-4.,4.,6.);vec4 o=vec4(0.);float f=2.+fbm(p+vec2(iTime*5.,0.))*.5; 
                     for(float i=0.;i++<35.;){vec2 v=p+cos(i*i+(iTime+p.x*.08)*.025+i*vec2(13.,11.))*3.5;float tailNoise=fbm(v+vec2(iTime*.5,i))*.3*(1.-(i/35.));vec4 auroraColors=vec4(.1+.3*sin(i*.2+iTime*.4),.3+.5*cos(i*.3+iTime*.5),.7+.3*sin(i*.4+iTime*.3),1.);vec4 currentContribution=auroraColors*exp(sin(i*i+iTime*.8))/length(max(v,vec2(v.x*f*.015,v.y*1.5)));float thinnessFactor=smoothstep(0.,1.,i/35.)*.6;o+=currentContribution*(1.+tailNoise*.8)*thinnessFactor;} 
                     o=tanh(pow(o/100.,vec4(1.6)));gl_FragColor=o*1.5; 
                 }` 
         }); 
         const geometry = new THREE.PlaneGeometry(2, 2); 
         const mesh = new THREE.Mesh(geometry, material); 
         scene.add(mesh); 
         let animationFrameId: number; 
         const animate = () => { animationFrameId = requestAnimationFrame(animate); material.uniforms.iTime.value += 0.016; renderer.render(scene, camera); }; 
         const handleResize = () => { renderer.setSize(window.innerWidth, window.innerHeight); material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight); }; 
         window.addEventListener('resize', handleResize); 
         animate(); 
         return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', handleResize); if (currentMount.contains(renderer.domElement)) currentMount.removeChild(renderer.domElement); renderer.dispose(); material.dispose(); geometry.dispose(); }; 
     }, []); 
     return <div ref={mountRef} />; 
 }; 
 
 // --- DEFAULT DATA --- 
 const defaultData: PortfolioPageProps = { 
   logo: { initials: 'MT', name: 'Meng To' }, 
   navLinks: [ { label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Skills', href: '#skills' } ], 
   resume: { label: 'Resume' }, 
   hero: { titleLine1: 'Creative Developer &', titleLine2Gradient: 'Digital Designer', subtitle: 'I craft beautiful digital experiences through code and design. Specializing in modern web development, UI/UX design, and bringing innovative ideas to life.', }, 
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
   projects = defaultData.projects!, 
   stats = defaultData.stats!, 
   showAnimatedBackground = true, 
   children,
 }) => { 
   return ( 
     <div className="bg-background text-foreground geist-font min-h-screen"> 
       {showAnimatedBackground && <AuroraBackground />} 
       <div className="relative"> 
         <NameWatermark name={logo.name as string} />
         <TiltedDock resumeClick={resume.onClick} />
         
         <main id="about" className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20"> 
             <div className="max-w-6xl mx-auto text-center"> 
                 <div className="mb-8 float-animation"> 
                     <h1 className="md:text-6xl lg:text-7xl leading-[1.1] geist-font text-5xl font-light text-foreground tracking-tight mb-4"> 
                         {hero.titleLine1} 
                         <span className="gradient-text block tracking-tight">{hero.titleLine2Gradient}</span> 
                     </h1> 
                     <p className="md:text-xl max-w-3xl leading-relaxed inter-font text-lg font-light text-muted-foreground mx-auto">{hero.subtitle}</p> 
                 </div> 
                 <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"> 
                     <MagneticButton onClick={ctaButtons.primary?.onClick} className="primary-button px-8 py-4 rounded-xl font-semibold text-sm min-w-[180px] tracking-wide group">
                         <span className="relative z-10">{ctaButtons.primary.label}</span>
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                      </MagneticButton> 
                     <MagneticButton onClick={ctaButtons.secondary?.onClick} className="glass-button min-w-[180px] inter-font text-sm font-medium text-foreground rounded-xl px-8 py-4">
                        {ctaButtons.secondary.label}
                     </MagneticButton> 
                 </div> 
                 <div id="projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16"> 
                     {projects.map((project, index) => ( 
                         <div key={index} className="glass-card rounded-2xl p-6 text-left"> 
                             <div className="project-image rounded-xl h-48 mb-4 overflow-hidden flex items-center justify-center bg-gray-800/50">
                                {('imageContent' in project && project.imageContent) ? project.imageContent : (
                                    <div className="text-4xl">🚀</div>
                                )}
                             </div> 
                             <h3 className="text-lg font-medium text-foreground mb-2 geist-font">{project.title}</h3> 
                             <p className="text-muted-foreground text-sm inter-font mb-4">{project.description}</p> 
                             <div className="flex flex-wrap gap-2"> 
                                 {project.tags.map(tag => ( 
                                     <span key={tag} className="skill-badge px-2 py-1 rounded text-xs text-muted-foreground">{tag}</span> 
                                 ))} 
                             </div> 
                         </div> 
                     ))} 
                 </div> 
                 <div id="skills" className="flex flex-col sm:flex-row justify-center items-center gap-8 text-center"> 
                     {stats.map((stat, index) => ( 
                         <React.Fragment key={stat.label}> 
                             <div> 
                                 <div className="text-3xl md:text-4xl font-light text-foreground mb-1 geist-font tracking-tight">{stat.value}</div> 
                                 <div className="text-muted-foreground text-sm inter-font font-normal">{stat.label}</div> 
                             </div> 
                             {index < stats.length - 1 && <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />} 
                         </React.Fragment> 
                     ))} 
                 </div> 
                 {children}
             </div> 
         </main> 
       </div> 
     </div> 
   ); 
 }; 
 
 export {PortfolioPage}; 
