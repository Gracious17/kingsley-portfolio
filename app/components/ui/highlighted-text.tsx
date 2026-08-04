import React from "react";
import { cn } from "@/lib/utils";
import type { Accent } from "@/lib/data/projects";

const accentClasses: Record<Accent, string> = {
  violet: "text-[#a362ff] font-medium",
  sky: "text-sky-400 font-medium",
  amber: "text-amber-400 font-medium",
  emerald: "text-emerald-400 font-medium",
};

/**
 * Renders a string containing {{phrase|accent}} tokens, colouring each phrase.
 * Anything outside a token is emitted as plain text.
 */
export function HighlightedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const token = /\{\{(.+?)\|(violet|sky|amber|emerald)\}\}/g;
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = token.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    nodes.push(
      <span key={match.index} className={accentClasses[match[2] as Accent]}>
        {match[1]}
      </span>
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));

  return <span className={cn(className)}>{nodes}</span>;
}

export default HighlightedText;
