"use client";

import { motion, TargetAndTransition, VariantLabels } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "purple";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  whileHover?: TargetAndTransition | VariantLabels;
  whileTap?: TargetAndTransition | VariantLabels;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const AnimatedButton = ({ 
  children, 
  variant = "primary", 
  size = "md",
  href,
  target,
  rel,
  whileHover = { scale: 1.05, y: -2 },
  whileTap = { scale: 0.95 },
  className = "",
  onClick,
  disabled,
  type = "button"
}: AnimatedButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-purple-600/30 border border-purple-500/50 text-white hover:bg-purple-600/40";
      case "secondary":
        return "bg-white/10 border border-white/20 text-white hover:bg-white/15";
      case "ghost":
        return "bg-transparent border border-purple-500/30 text-purple-300 hover:bg-purple-600/20";
      case "purple":
        return "bg-purple-600/20 border border-purple-500/30 text-white hover:bg-purple-600/30";
      default:
        return "bg-purple-600/30 border border-purple-500/50 text-white hover:bg-purple-600/40";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1 text-xs";
      case "lg":
        return "px-6 py-3 text-lg";
      default:
        return "px-4 py-2 text-sm";
    }
  };

  const baseStyles = "rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50";
  const combinedStyles = `${baseStyles} ${getVariantStyles()} ${getSizeStyles()} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={whileHover}
        whileTap={whileTap}
        className={combinedStyles}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={whileHover}
      whileTap={whileTap}
      className={combinedStyles}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;