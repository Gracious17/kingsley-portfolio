"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface FlipCardProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  className?: string;
  isFlipped?: boolean;
  onFlip?: (flipped: boolean) => void;
  flipDuration?: number;
  height?: string;
  clickToFlip?: boolean;
}

const FlipCard = ({ 
  frontContent, 
  backContent, 
  className = "",
  isFlipped: controlledFlipped,
  onFlip,
  flipDuration = 0.8,
  height = "h-[400px]",
  clickToFlip = true
}: FlipCardProps) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  
  const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;
  
  const handleFlip = () => {
    if (controlledFlipped === undefined) {
      setInternalFlipped(!internalFlipped);
    }
    onFlip?.(!isFlipped);
  };

  return (
    <div className={`relative perspective-1000 ${height} ${className}`}>
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: flipDuration, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={clickToFlip ? handleFlip : undefined}
      >
        {/* Front Face */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          whileHover={!isFlipped ? { scale: 1.02, y: -8 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {frontContent}
        </motion.div>

        {/* Back Face */}
        <motion.div
          className="absolute inset-0 backface-hidden rotate-y-180"
          style={{ transform: "rotateY(180deg)" }}
        >
          {backContent}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlipCard;