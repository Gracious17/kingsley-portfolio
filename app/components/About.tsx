"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, Smartphone, FileText } from "lucide-react";
import { HighlightedText } from "./ui/highlighted-text";
import { NameAssemblyBanner } from "./ui/name-assembly-banner";
import { platformProjects, publishedAppCount } from "@/lib/data/projects";

const highlights = [
  { icon: Award, label: "Experience", value: "4+ Years Building" },
  {
    icon: Briefcase,
    label: "Platforms Shipped",
    value: `${platformProjects.length} Production Systems`,
  },
  { icon: Smartphone, label: "Mobile Apps", value: `${publishedAppCount} Published` },
];

const paragraphs = [
  "I'm Gracious Kingsley, a {{full-stack and mobile engineer|violet}} with {{4+ years|violet}} building production web and mobile applications across fintech, SaaS, e-commerce and edtech, alongside {{14 published mobile apps|violet}} on {{Google Play|sky}} and the App Store.",
  "My core stack is {{JavaScript and TypeScript|sky}} across {{React and Next.js|sky}} on the frontend and {{Node.js and Express|sky}} on the backend, with {{React Native and Expo|sky}} for mobile, over {{PostgreSQL, MongoDB and Redis|sky}}.",
  "I've shipped {{multi-tenant platforms|violet}} with role-based access control, built {{real-time live classes|amber}} over WebRTC and Socket.IO serving {{5,000+ learners|violet}}, and run a {{self-directed security audit|amber}} that caught and fixed a cross-tenant IDOR before release.",
  "I care about {{clean architecture|sky}}, {{correctness under load|sky}} and {{developer experience|sky}}, and I enjoy turning complex requirements into simple, reliable software.",
];

export default function About({ onDownloadCV }: { onDownloadCV?: () => void }) {
  return (
    <section id="about-me" className="w-full bg-transparent py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white geist-font tracking-tight">
            About Me
          </h2>
          <p className="mt-3 text-sm md:text-base font-medium text-white/50 inter-font">
            My Introduction
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
          {/* Animated name banner — owns its own scroll-triggered entrance. */}
          <div className="w-full max-w-md mx-auto lg:max-w-none">
            <NameAssemblyBanner name="Gracious Kingsley" className="aspect-[4/5]" />
          </div>

          {/* Copy */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="glass-card rounded-xl px-4 py-5 text-center"
                >
                  <item.icon className="mx-auto mb-3 h-5 w-5 text-[#a362ff]" />
                  <p className="text-sm font-bold text-white geist-font">{item.label}</p>
                  <p className="mt-1 text-[11px] font-medium text-white/45 inter-font">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 space-y-5">
              {paragraphs.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <HighlightedText
                    text={paragraph}
                    className="block text-sm md:text-base font-medium text-white/80 inter-font leading-relaxed"
                  />
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 }}
              onClick={onDownloadCV}
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#a362ff] px-7 py-3.5 text-sm font-bold text-white inter-font transition-all hover:bg-[#b47dff] hover:shadow-[0_0_28px_rgba(163,98,255,0.4)] active:scale-95"
            >
              Download CV
              <FileText size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
