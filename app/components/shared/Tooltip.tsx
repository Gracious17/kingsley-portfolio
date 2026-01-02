"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
  show: boolean;
  position?: "top" | "bottom" | "left" | "right";
  variant?: "default" | "purple" | "gray";
  className?: string;
}

const Tooltip = ({ 
  children, 
  content, 
  show, 
  position = "top", 
  variant = "default",
  className = "" 
}: TooltipProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "purple":
        return "bg-purple-600 text-white border-t-purple-600";
      case "gray":
        return "bg-gray-800 text-white border-t-gray-800";
      default:
        return "bg-black/80 text-white border-t-black/80";
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case "bottom":
        return "top-full mt-2";
      case "left":
        return "right-full mr-2 top-1/2 transform -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 transform -translate-y-1/2";
      default:
        return "-top-12";
    }
  };

  const getArrowStyles = () => {
    switch (position) {
      case "bottom":
        return "bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent";
      case "left":
        return "left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent";
      case "right":
        return "right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent";
      default:
        return "top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent";
    }
  };

  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? 10 : -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === "top" ? 10 : -10, scale: 0.8 }}
            className={`absolute ${getPositionStyles()} left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm rounded-lg whitespace-nowrap z-20 ${getVariantStyles()} ${className}`}
          >
            {content}
            <div className={`absolute ${getArrowStyles()} ${getVariantStyles().split(' ')[0]}`}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;