// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import { useTheme } from 'next-themes';

// export default function AnimatedDarkBg() {
//   const { theme } = useTheme();

//   const isDark = theme === 'dark';

//   return (
//     <AnimatePresence>
//       {isDark && (
//         <motion.div
//           className="absolute inset-0 z-0 pointer-events-none"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
//             <motion.path
//               d="M0,300 Q400,100 800,300 T1600,300"
//               stroke="rgba(96,165,250,0.3)"
//               strokeWidth="2"
//               fill="none"
//               initial={{ pathLength: 0 }}
//               animate={{ pathLength: 1 }}
//               transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
//             />
//           </svg>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function AnimatedDarkBg() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = theme === "dark";

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isDark && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* SVG tracing paths */}
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 800 600"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,200 Q400,100 800,200"
              stroke="rgba(96,165,250,0.2)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5,
              }}
            />
            <motion.path
              d="M0,400 Q400,500 800,400"
              stroke="rgba(96,165,250,0.15)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 1.5,
              }}
            />
          </svg>

          {/* Glowing radial pulses */}
          <motion.div
            className="absolute top-[30%] left-[20%] w-60 h-60 bg-blue-500 rounded-full opacity-20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-blue-700 rounded-full opacity-10 blur-2xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Smoke-like floating blobs */}
          <motion.div
            className="absolute top-[10%] left-[50%] w-40 h-40 bg-blue-400 opacity-10 blur-2xl rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[30%] w-32 h-32 bg-blue-300 opacity-10 blur-2xl rounded-full"
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
              opacity: [0.05, 0.12, 0.05],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
