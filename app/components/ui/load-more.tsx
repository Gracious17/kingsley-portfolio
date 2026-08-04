"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export function LoadMoreButton({
  onClick,
  remaining,
  label = "Load More",
}: {
  onClick: () => void;
  remaining: number;
  label?: string;
}) {
  if (remaining <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center mt-10"
    >
      <button
        onClick={onClick}
        className="group flex items-center gap-2.5 rounded-full bg-[#a362ff] px-7 py-3 text-xs font-semibold text-white transition-all hover:bg-[#b47dff] hover:shadow-[0_0_24px_rgba(163,98,255,0.35)] active:scale-95"
      >
        {label}
        <RefreshCw
          size={14}
          className="transition-transform duration-500 group-hover:rotate-180"
        />
        <span className="sr-only">{remaining} more</span>
      </button>
    </motion.div>
  );
}

export default LoadMoreButton;
