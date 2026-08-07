"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Types each word out, pauses, deletes it, then moves to the next.
 * Falls back to the first word rendered statically when the visitor has
 * prefers-reduced-motion set.
 */
export function Typewriter({
  words,
  className,
  typeSpeed = 70,
  deleteSpeed = 35,
  pause = 1900,
}: {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion || words.length === 0) return;

    const word = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () =>
          setText((prev) =>
            deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
          ),
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, reduceMotion]);

  return (
    <span className={cn(className)} aria-live="polite">
      {reduceMotion ? words[0] : text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle h-[0.9em]" />
    </span>
  );
}

export default Typewriter;
