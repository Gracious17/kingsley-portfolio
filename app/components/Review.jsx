import React from "react";
import { Marquee } from "./magicui/marquee";
import ReviewCard from "./ReviewCard";
import SectionHeaders from "./SectionHeaders";

const reviews = [
  {
    name: "Cenfrift",
    username: "@cenfrift",
    body: "Kingsley worked with us as a frontend developer on our WhatsApp automation platform. His clean UI implementation and attention to detail greatly improved the product experience.",
    img: "https://avatar.vercel.sh/cenfrift",
  },
  {
    name: "Arch Saint Nexus",
    username: "@archsaintnexus",
    body: "As our frontend developer, Kingsley contributed massively to building our laundromat app. His ability to transform ideas into a smooth, responsive interface was outstanding.",
    img: "https://avatar.vercel.sh/archsaintnexus",
  },
  {
    name: "JNS Skin Care",
    username: "@jnsskincare",
    body: "Kingsley built our full-stack skincare web app from scratch. He handled everything from frontend to backend seamlessly, giving us a reliable and beautiful digital presence.",
    img: "https://avatar.vercel.sh/jnsskincare",
  },
  {
    name: "Swwipe API Team",
    username: "@swwipeapi",
    body: "Kingsley successfully tested and integrated our API, meeting all requirements. His submission was valid, detailed, and showed strong technical expertise.",
    img: "https://avatar.vercel.sh/swwipeapi",
  },

   {
    name: "Ngozi Eze",
    username: "@ngozieze",
    body: "Collaborating with Kingsley was smooth and productive. His ability to integrate design with functionality is impressive. I’d definitely work with him again.",
    img: "https://avatar.vercel.sh/ngozieze",
  },
  {
    name: "Michael Smith",
    username: "@michaelsmith",
    body: "Kingsley’s problem-solving skills stood out during our project. He quickly understood requirements and implemented scalable solutions.",
    img: "https://avatar.vercel.sh/michaelsmith",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export function Review() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#1a0b2e] py-24 lg:py-32 animate-[var(--animate-marquee)]">
      <div className="text-center mb-12">
        <SectionHeaders header="Reviews" />
        <p className="text-lg sm:text-xl tracking-widest uppercase text-[#a362ff] font-['Poppins'] font-semibold mt-4">What Clients Say</p>
      </div>
      <Marquee pauseOnHover className="[--duration:25s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:25s] mt-4">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}

export default Review;
