"use client";

import React from "react";
import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Full-Stack Architecture",
    description: "Building end-to-end scalable applications using the T3 stack (Next.js, Prisma, PostgreSQL). Designing robust API contracts and database schemas for high-performance systems.",
  },
  {
    title: "Real-time Systems",
    description: "Implementing low-latency communication features like live classes, chat, and collaborative tools using WebRTC and Socket.io. Experience in scaling real-time engagement.",
  },
  {
    title: "Mobile Development",
    description: "Crafting cross-platform mobile experiences with React Native and Expo. Focused on native performance, smooth animations, and consistent UX across iOS and Android.",
  },
  {
    title: "Performance & DX",
    description: "Optimizing Core Web Vitals and backend query performance. Setting up automated testing (Jest) and streamlined CI/CD workflows for developer productivity.",
  },
];

const Capabilities = () => {
  return (
    <section id="capabilities" className="w-full py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
            >
              What I can help with
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light text-foreground tracking-tight"
            >
              Capabilities
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="h-px flex-1 bg-border md:mx-12 hidden md:block"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border overflow-hidden rounded-2xl border border-border">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-950/50 backdrop-blur-sm p-8 md:p-12 hover:bg-zinc-900/50 transition-colors group"
            >
              <div className="flex flex-col h-full">
                <span className="text-zinc-600 font-mono text-xs mb-8 group-hover:text-primary transition-colors">
                  0{index + 1}
                </span>
                <h3 className="text-2xl font-medium text-foreground mb-6">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
