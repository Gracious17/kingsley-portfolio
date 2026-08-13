"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  type Transition,
  type UseInViewOptions,
  type Variant,
} from "framer-motion";

export type InViewProps = {
  children: React.ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  as?: React.ElementType;
  /** false (the default) re-runs the animation every time the element re-enters view. */
  once?: boolean;
  className?: string;
};

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions,
  as = "div",
  once = false,
  className,
}: InViewProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { ...viewOptions, once });
  const MotionComponent = motion[
    as as keyof typeof motion
  ] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref as React.RefObject<HTMLDivElement>}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

/** The three presets from the reference implementation. */
export const inViewVariants = {
  blurUp: {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  },
  slideIn: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  },
  zoomOut: {
    hidden: { opacity: 0, scale: 1.5 },
    visible: { opacity: 1, scale: 1 },
  },
} as const;

export const inViewTransition: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

/**
 * Fires once the element's top has risen 350px past the viewport bottom, so a
 * section animates as you arrive at it rather than while it's still off-screen.
 */
export const inViewOptions: UseInViewOptions = {
  margin: "0px 0px -350px 0px",
};

export default InView;
