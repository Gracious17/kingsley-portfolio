// // components/SuccessMessage.tsx
// 'use client';

// import { motion } from 'framer-motion';

// export default function SuccessMessage({ onClose }: { onClose: () => void }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 30 }}
//       className="bg-green-100 border border-green-300 p-4 rounded-lg text-green-800 shadow-lg"
//     >
//       <h2 className="text-lg font-bold">Message Sent!</h2>
//       <p>Thanks for reaching out. I&pos;ll get back to you soon.</p>
//       <button
//         onClick={onClose}
//         className="mt-2 text-sm text-green-700 underline"
//       >
//         Send another message
//       </button>
//     </motion.div>
//   );
// }
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SuccessMessageProps {
  title?: string;
  subtitle?: string;
  message?: string;
  onClose: () => void;
  zIndex?: number;
}

export default function SuccessMessage({
  title = "Successful!",
  subtitle = "Message Sent!",
  message = "Thanks for reaching out. I'll get back to you as soon as possible.",
  onClose,
  zIndex = 50,
}: SuccessMessageProps) {
  const [animateCheck, setAnimateCheck] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCheck(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-zinc-900/90 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-8 text-center"
      >
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#a362ff]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#a362ff]/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="group p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:rotate-90"
          >
            <X size={20} className="text-white/70 group-hover:text-white" />
          </button>
        </div>

        {/* Animated Checkmark */}
        <div className="flex items-center justify-center mb-8 mt-4">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: animateCheck ? 1 : 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="absolute inset-0 bg-[#a362ff]/20 rounded-full blur-xl"
            />
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                stroke="#a362ff"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animateCheck ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="#a362ff"
                initial={{ scale: 0 }}
                animate={{ scale: animateCheck ? 1 : 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 12 }}
              />
              <motion.path
                d="M34 50L45 61L66 40"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animateCheck ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-light tracking-tight text-white">
            {title}
          </h2>
          <h3 className="text-[#a362ff] font-medium tracking-widest uppercase text-xs">
            {subtitle}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed max-w-[280px] mx-auto">
            {message}
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <button
            onClick={onClose}
            className="w-full bg-white text-black py-4 rounded-xl font-semibold uppercase tracking-widest text-xs transition-all hover:bg-white/90 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
