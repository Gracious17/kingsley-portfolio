"use client"
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const WeekendPoUP = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("seenWelcome");
    if (!seen) {
      setShowWelcome(true);
      sessionStorage.setItem("seenWelcome", "true");
    }
  }, []);

  // Delay confetti for drama
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 120,
          startVelocity: 35,
          origin: { y: 0.6 },
          zIndex: 99999,
          ticks: 200,
        });
      }, 800); // Delay in ms

      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  if (!showWelcome) return null;

  return (
    <>
      {/* Glow Filter */}
      <svg className="hidden">
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[1000]">
        {/* Particles */}
        <div className="absolute inset-0 z-[-1]">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              background: { color: { value: "transparent" } },
              fpsLimit: 60,
              particles: {
                number: { value: 50 },
                color: {
                  value: ["#eb9b40", "#ffffff", "#ffcc80"],
                },
                shape: { type: "circle" },
                opacity: {
                  value: 0.6,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.2,
                    sync: false,
                  },
                },
                size: {
                  value: { min: 2, max: 4 },
                  random: true,
                  anim: { enable: true, speed: 2, size_min: 1, sync: false },
                },
                move: {
                  enable: true,
                  speed: 0.4,
                  direction: "top",
                  outModes: { default: "out" },
                  random: true,
                  straight: false,
                  attract: { enable: true, rotateX: 600, rotateY: 1200 },
                },
              },
              detectRetina: true,
            }}
          />
        </div>

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          className="relative bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl w-full max-w-xl p-10 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#eb9b40] mb-4">
            Welcome to Amyafrique 🎨
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8">
            Welcome to Amyafrique — where timeless art meets your personal
            collection. Discover, fall in love, and own your next masterpiece.
          </p>
          <button
            onClick={() => setShowWelcome(false)}
            className="inline-block px-8 py-3 bg-[#eb9b40] text-white rounded-full font-semibold shadow-xl transition-all duration-300 hover:bg-[#d88a36] hover:scale-105"
            style={{ filter: "url(#glow)" }}
          >
            Let’s Explore
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default WeekendPoUP;     
