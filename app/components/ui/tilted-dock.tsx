"use client"; 
 
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"; 
import { Home, Briefcase, Cpu, Mail, FileText } from "lucide-react"; 
import { useState, useEffect, useRef } from "react"; 
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
 
interface TiltedDockProps {
  resumeClick?: () => void;
}

export default function TiltedDock({ resumeClick }: TiltedDockProps) { 
  const [hovered, setHovered] = useState<number | null>(null); 
  const [mouse, setMouse] = useState({ x: 0, y: 0 }); 
 
  useEffect(() => { 
    const handleMouseMove = (e: MouseEvent) => { 
      setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 }); 
    }; 
    window.addEventListener("mousemove", handleMouseMove); 
    return () => window.removeEventListener("mousemove", handleMouseMove); 
  }, []); 

  const icons = [ 
    { id: 1, icon: <Home className="w-5 h-5 md:w-6 md:h-6" />, label: "About", href: "#about" }, 
    { id: 2, icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />, label: "Projects", href: "#projects" }, 
    { id: 3, icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />, label: "Expertise", href: "#skills" }, 
    { id: 4, icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />, label: "Contact", href: "#contact" }, 
    { id: 5, icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />, label: "Resume", onClick: resumeClick }, 
  ]; 
 
  return ( 
    <TooltipProvider delayDuration={0}>
      <div className="fixed bottom-6 md:bottom-auto md:top-8 left-1/2 -translate-x-1/2 z-[100] w-auto max-w-[95vw]"> 
        <motion.div 
          className="flex gap-2 md:gap-8 px-4 md:px-10 py-3 md:py-4 rounded-2xl md:rounded-3xl 
                     backdrop-blur-3xl bg-white/[0.05] dark:bg-black/20 
                     border border-white/10
                     shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
          style={{ 
            transformStyle: "preserve-3d", 
          }} 
          animate={{ 
            rotateX: 15, 
            rotateY: mouse.x * 8, 
          }} 
          transition={{ type: "spring", stiffness: 100, damping: 25 }} 
        > 
          {icons.map((item) => ( 
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <motion.div 
                  className="relative flex flex-col items-center justify-center cursor-pointer" 
                  onHoverStart={() => setHovered(item.id)} 
                  onHoverEnd={() => setHovered(null)} 
                  animate={{ 
                    scale: hovered === item.id ? 1.25 : 1, 
                    z: hovered === item.id ? 100 : hovered ? -10 : 0, 
                    opacity: hovered && hovered !== item.id ? 0.6 : 1, 
                  }} 
                  transition={{ type: "spring", stiffness: 250, damping: 20 }} 
                  style={{ transformStyle: "preserve-3d" }} 
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else if (item.href) {
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                > 
                  <motion.div 
                    animate={{ 
                      rotateX: hovered === item.id ? -10 : 0, 
                      rotateY: hovered === item.id ? 10 : 0, 
                    }} 
                    transition={{ type: "spring", stiffness: 150, damping: 15 }} 
                    className="text-white/70 hover:text-white transition-colors p-2" 
                  > 
                    {item.icon} 
                  </motion.div> 
                </motion.div> 
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="bg-zinc-900/90 border-white/10 text-white backdrop-blur-xl mb-4"
              >
                <p className="text-xs font-medium tracking-widest uppercase">{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))} 
        </motion.div> 
      </div> 
    </TooltipProvider>
  ); 
} 
