import React from "react";
import { DesignTestimonial } from "./ui/design-testimonial";

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

const mappedTestimonials = reviews.map(review => ({
  quote: review.body,
  author: review.name,
  role: "Client",
  company: review.username.replace('@', '').toUpperCase()
}));

export function Review() {
  return (
    <section id="reviews" className="w-full bg-transparent">
      <DesignTestimonial testimonials={mappedTestimonials} />
    </section>
  );
}

export default Review;
