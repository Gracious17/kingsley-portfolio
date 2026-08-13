"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Banner where each letter of the name is flown in by a small glowing carrier
 * orb, dropped into place, and locked with a spring. Replays every time the
 * card scrolls back into view, and on click.
 *
 * Offsets are derived from a seeded hash of the letter index rather than
 * Math.random(), so server and client agree on the starting transform and
 * React doesn't throw a hydration mismatch.
 */

const seeded = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const STAGGER = 0.075;

const cardVariants: Variants = {
  scattered: { opacity: 0, y: 48, scale: 0.92 },
  assembled: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 16, mass: 0.9 },
  },
};

const letterVariants: Variants = {
  scattered: (i: number) => ({
    x: (seeded(i, 1) - 0.5) * 520,
    y: (seeded(i, 2) - 0.5) * 400 - 70,
    rotate: (seeded(i, 3) - 0.5) * 240,
    scale: 0.25,
    opacity: 0,
  }),
  assembled: (i: number) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.3 + i * STAGGER,
      type: "spring",
      stiffness: 115,
      damping: 12,
      mass: 0.65,
    },
  }),
};

// Orb / sweep / caption are variant-driven rather than using bare `animate`,
// so the whole sequence is owned by the card's scroll trigger. With `animate`
// they fire on mount and would be finished before the card is ever seen.
const orbVariants: Variants = {
  scattered: { opacity: 0, scale: 0 },
  assembled: (i: number) => ({
    opacity: [0, 1, 1, 0],
    scale: [0, 1, 1.8, 0],
    transition: {
      delay: 0.25 + i * STAGGER,
      duration: 1.1,
      times: [0, 0.15, 0.7, 1],
    },
  }),
};

export function NameAssemblyBanner({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const [runId, setRunId] = useState(0);
  const reduceMotion = useReducedMotion();

  const words = name.trim().split(/\s+/);
  const totalLetters = words.reduce((sum, w) => sum + w.length, 0);
  const settleTime = 0.3 + totalLetters * STAGGER;

  // Continuous index across words so the stagger reads as one sequence.
  let cursor = 0;

  return (
    <motion.div
      key={runId}
      variants={cardVariants}
      initial={reduceMotion ? "assembled" : "scattered"}
      whileInView="assembled"
      viewport={{ once: false, amount: 0.35 }}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-white/15",
        "bg-gradient-to-br from-zinc-900/70 via-zinc-950/60 to-black/50 backdrop-blur-md",
        "shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9),0_0_70px_-25px_rgba(163,98,255,0.5)]",
        "transition-transform duration-500 hover:-translate-y-1.5",
        className
      )}
    >
      {/* Ambient wash */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-60 w-60 rounded-full bg-[#a362ff]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-12 h-60 w-60 rounded-full bg-sky-500/15 blur-3xl" />

      {/* Grid paper */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Inner rim, sells the depth */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />

      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        aria-label="Replay name animation"
        className="relative flex h-full w-full flex-col items-center justify-center gap-1 px-4 py-14 text-center"
      >
        {words.map((word) => (
          <span key={word} className="flex justify-center whitespace-nowrap">
            {word.split("").map((char) => {
              const i = cursor++;
              return (
                <motion.span
                  key={`${word}-${i}`}
                  custom={i}
                  variants={letterVariants}
                  className="relative inline-block text-[2.25rem] sm:text-6xl lg:text-7xl font-black leading-[1.05] text-white geist-font tracking-tighter"
                >
                  {char}
                  {/* Carrier orb: rides along, releases once the letter lands. */}
                  {!reduceMotion && (
                    <motion.span
                      custom={i}
                      variants={orbVariants}
                      className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#a362ff] shadow-[0_0_12px_3px_rgba(163,98,255,0.8)]"
                    />
                  )}
                </motion.span>
              );
            })}
          </span>
        ))}

        <motion.span
          variants={{
            scattered: { opacity: 0, y: 8 },
            assembled: {
              opacity: 1,
              y: 0,
              transition: { delay: settleTime + 0.5, duration: 0.6 },
            },
          }}
          className="mt-5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/35 inter-font"
        >
          Full-Stack &amp; Mobile Engineer
        </motion.span>
      </button>

      {/* Sweep once the name is assembled */}
      {!reduceMotion && (
        <motion.div
          variants={{
            scattered: { x: "-130%" },
            assembled: {
              x: "130%",
              transition: { delay: settleTime + 0.2, duration: 1.1, ease: "easeInOut" },
            },
          }}
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent"
        />
      )}
    </motion.div>
  );
}

export default NameAssemblyBanner;
