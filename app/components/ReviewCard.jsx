import React from 'react'
import { cn } from "@/lib/utils";

const ReviewCard = ({
  img,
  name,
  username,
  body,
}) => {
  return (
    <div className="relative h-full w-64">
      {/* Animated border container */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9857d3]/30 via-[#ccd6f6]/50 to-[#9857d3]/30 animate-[pulse_3s_ease-in-out_infinite]"></div>
      </div>
      
      {/* Card content */}
      <figure
        className={cn( 
          "animate-[var(--animate-marquee)] relative h-full w-full cursor-pointer overflow-hidden rounded-xl p-4 z-10",
          "border border-[#9857d3]/30 bg-gray-950/[.05] backdrop-blur-sm",
          "dark:bg-gray-50/[.05]",
        )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-[#ccd6f6]">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-[#ccd6f6]/70">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm font-medium text-[#ccd6f6]">{body}</blockquote>
    </figure>
    </div>
  );
};
export default ReviewCard