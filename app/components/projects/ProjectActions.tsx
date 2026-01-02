"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AnimatedButton from "../shared/AnimatedButton";

interface ProjectActionsProps {
  demoUrl?: string;
  codeUrl?: string;
  isFlipped?: boolean;
  variant?: "front" | "back";
  className?: string;
}

const ProjectActions = ({ 
  demoUrl, 
  codeUrl, 
  isFlipped = false, 
  variant = "front",
  className = "" 
}: ProjectActionsProps) => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (demoUrl) {
      try {
        await navigator.clipboard.writeText(demoUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  if (variant === "front") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`flex gap-6 items-center ${className}`}
      >
        {demoUrl && (
          <AnimatedButton
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            whileHover={{ scale: 1.15, rotate: 8 }}
            className="group relative p-0 bg-transparent shadow-none hover:drop-shadow-[0_0_15px_rgba(163,98,255,0.5)] transition-all duration-300"
            aria-label="View live demo"
          >
            <svg width={36} height={36} viewBox="0 0 24 24" fill="none" className="text-[#ccd6f6]">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </AnimatedButton>
        )}
        {codeUrl && (
          <AnimatedButton
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            whileHover={{ scale: 1.15, rotate: -8 }}
            className="group relative p-0 bg-transparent shadow-none hover:drop-shadow-[0_0_15px_rgba(163,98,255,0.5)] transition-all duration-300"
            aria-label="View code"
          >
            <svg width={36} height={36} viewBox="0 0 24 24" fill="none" className="text-[#ccd6f6]">
              <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </AnimatedButton>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isFlipped ? 1 : 0, scale: isFlipped ? 1 : 0.8 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className={`flex flex-wrap items-center justify-center gap-3 pt-4 pb-6 sm:pb-4 ${className}`}
    >
      {demoUrl && (
        <AnimatedButton
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
        >
          Open Demo
        </AnimatedButton>
      )}
      {codeUrl && (
        <AnimatedButton
          href={codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
        >
          View Code
        </AnimatedButton>
      )}
      <AnimatedButton
        onClick={() => setLiked(!liked)}
        variant={liked ? "secondary" : "ghost"}
        className={liked ? 'bg-yellow-400/20 border-yellow-300 text-yellow-200' : ''}
      >
        {liked ? '⭐ Saved' : '☆ Save'}
      </AnimatedButton>
      {demoUrl && (
        <AnimatedButton
          onClick={handleCopyLink}
          variant="secondary"
        >
          Copy Link
        </AnimatedButton>
      )}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded-full"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectActions;