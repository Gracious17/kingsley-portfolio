"use client";

import React from "react";
import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Frontend Architecture",
    description: "Building scalable React applications with proper state management, code splitting, and performance optimization. Setting up tooling and best practices.",
  },
  {
    title: "Design Systems",
    description: "Creating component libraries that balance flexibility with consistency. Documentation, accessibility, and developer experience built in from day one.",
  },
  {
    title: "Product Engineering",
    description: "End-to-end feature development from requirements to deployment. Working closely with design and product to ship the right solution, not just code.",
  },
  {
    title: "Performance",
    description: "Diagnosing and fixing performance bottlenecks. Optimizing bundle size, runtime performance, and Core Web Vitals. Making fast experiences feel instant.",
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
