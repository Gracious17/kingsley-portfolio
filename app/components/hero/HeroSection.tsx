"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const fullText = "I&apos;m a Software Engineer.";
  
  // Mouse tracking for avatar interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(springY, [-300, 300], [10, -10]);
  const rotateY = useTransform(springX, [-300, 300], [-10, 10]);

  // Typing animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
      
      return () => clearInterval(typingInterval);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Mouse move handler for avatar interaction
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#1a0b2e] pt-20 pb-16">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
        
        {/* Background gradient effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-purple-800/30 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Interactive Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end order-2 lg:order-1"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
          >
            <div className="relative w-full max-w-md group cursor-pointer">
              {/* Enhanced glow effect with interaction */}
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                whileHover={{ scale: 1.2, opacity: 0.8 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -inset-x-12 -inset-y-12 bg-gradient-radial from-purple-600/50 via-purple-600/30 to-transparent rounded-full blur-3xl"
              />
              
              {/* Interactive avatar with mouse tracking */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                style={{
                  rotateX,
                  rotateY,
                  transformPerspective: 1000,
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.3 }
                }}
                className="relative z-10 transform-gpu"
              >
                <Image
                  src="/assets/hero-avatar.svg"
                  alt="Developer avatar"
                  width={350}
                  height={400}
                  className="w-full h-auto max-w-[280px] lg:max-w-[350px] mx-auto drop-shadow-2xl"
                  priority
                />
                
                {/* Hover sparkles */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${30 + i * 20}%`,
                        top: `${20 + i * 15}%`,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-center lg:text-left order-1 lg:order-2 space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 text-base sm:text-lg font-['Preahvihear'] tracking-tight"
            >
              Hello! I Am{" "}
              <motion.span 
                className="text-[#a362ff] font-medium"
                whileHover={{ 
                  textShadow: "0 0 20px rgba(163, 98, 255, 0.8)",
                  scale: 1.05 
                }}
                transition={{ duration: 0.2 }}
              >
                Gracious Kingsley
              </motion.span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3"
            >
              <p className="text-white/80 text-base sm:text-lg font-['Preahvihear'] underline underline-offset-4">
                A Designer who
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-['Preahvihear'] font-normal leading-tight text-white">
                Judges a book
                <br />
                by its{" "}
                <motion.span 
                  className="text-[#a362ff]"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(163, 98, 255, 0)",
                      "0 0 20px rgba(163, 98, 255, 0.8)",
                      "0 0 0px rgba(163, 98, 255, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  cover
                </motion.span>
                ...
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="relative inline-block group"
            >
              <motion.div 
                className="absolute inset-0 border border-white/20 rounded-full blur-[2px]"
                whileHover={{ borderColor: "rgba(163, 98, 255, 0.5)" }}
              />
              <p className="relative text-white/60 text-xs sm:text-sm font-['Preahvihear'] px-6 py-2.5 rounded-full group-hover:text-white/80 transition-colors">
                Because if the cover does not impress you what else can?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4 pt-4"
            >
              {/* Typing animation for main title */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-['Preahvihear'] font-normal text-white min-h-[1.2em]">
                {isTyping ? (
                  <>
                    {displayText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-[#a362ff]"
                    >
                      |
                    </motion.span>
                  </>
                ) : (
                  <span className="opacity-0">I&apos;m a Software Engineer.</span>
                )}
              </h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.5 }}
                className="text-lg sm:text-xl font-['Preahvihear'] text-white/90 flex items-center justify-center lg:justify-start gap-2 flex-wrap"
              >
                Currently, I&apos;m a Software Engineer at
                <motion.span 
                  className="inline-flex items-center gap-1.5"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-[#a362ff] font-medium">Freelancer</span>
                </motion.span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 3 }}
                className="text-white/75 text-base sm:text-lg font-['Preahvihear'] max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                A self-taught UI/UX designer, functioning in the industry for 4+ years now.
                I make meaningful and delightful digital products that create an equilibrium
                between user needs and business goals.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <Link href="#experience" className="block group">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            whileHover={{ scale: 1.1 }}
            transition={{ 
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.2 }
            }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2 group-hover:border-[#a362ff]/60 transition-colors"
          >
            <motion.div 
              className="w-1.5 h-2 bg-white/40 rounded-full group-hover:bg-[#a362ff]/80 transition-colors"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;