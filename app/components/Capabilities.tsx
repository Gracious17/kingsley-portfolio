"use client";

import React from "react";
import { motion } from "framer-motion";
import { HighlightedText } from "./ui/highlighted-text";

const capabilities = [
  {
    title: "Full-Stack Architecture",
    meta: ["Next.js", "Node.js", "PostgreSQL"],
    points: [
      "Build end-to-end applications with {{Next.js|sky}} and {{Node.js|sky}} over {{PostgreSQL, MongoDB and Redis|sky}}, designing API contracts and schemas that hold up under load.",
      "Ship {{multi-tenant platforms|violet}} with {{role-based access control|violet}} and strict tenant isolation, as in StayOps ERP and the Pamela back-office.",
    ],
  },
  {
    title: "Real-time Systems",
    meta: ["WebRTC", "Socket.IO"],
    points: [
      "Implement low-latency features such as {{live classes|violet}}, chat and collaborative tools using {{WebRTC and Socket.IO|sky}}.",
      "Scaled real-time engagement to {{5,000+ learners|violet}} on the Hallos platform, with gamification lifting engagement {{35%+|amber}}.",
    ],
  },
  {
    title: "Mobile Development",
    meta: ["React Native", "Expo"],
    points: [
      "Craft cross-platform apps with {{React Native and Expo|sky}}, focused on native performance, smooth animation and consistent UX across iOS and Android.",
      "Contributed to {{14 published apps|violet}} on Google Play and the App Store across consumer AI, agritech, marketplace and enterprise domains.",
    ],
  },
  {
    title: "Performance & Quality",
    meta: ["Jest", "Core Web Vitals"],
    points: [
      "Optimize {{Core Web Vitals|sky}} and backend query performance, and set up automated testing with {{Jest|sky}}.",
      "Run {{self-directed security audits|amber}}; one caught and fixed a {{cross-tenant IDOR|amber}} before release.",
    ],
  },
];

const Capabilities = () => {
  return (
    <section id="capabilities" className="w-full py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground geist-font tracking-tight">
            Capabilities
          </h2>
          <p className="mt-3 text-sm md:text-base font-medium text-primary inter-font">
            What I can help with
          </p>
        </motion.div>

        <div className="relative">
          {/* Spine: left-aligned on mobile, centred from lg up. */}
          <div className="absolute top-2 bottom-2 left-[7px] lg:left-1/2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:-translate-x-1/2" />

          <div className="space-y-12 lg:space-y-4">
            {capabilities.map((item, index) => {
              const onLeft = index % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className="relative lg:grid lg:grid-cols-2 lg:gap-14"
                >
                  {/* Node on the spine */}
                  <span
                    className="absolute top-2 left-0 lg:left-1/2 h-[15px] w-[15px] lg:-translate-x-1/2 rounded-full border-2 border-[#a362ff] bg-zinc-950 shadow-[0_0_14px_rgba(163,98,255,0.6)]"
                    aria-hidden
                  />

                  <div
                    className={
                      "pl-9 lg:pl-0 " +
                      (onLeft ? "lg:col-start-1 lg:pr-14" : "lg:col-start-2 lg:pl-14")
                    }
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-foreground geist-font tracking-tight">
                      {item.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      {item.meta.map((tag, i) => (
                        <React.Fragment key={tag}>
                          {i > 0 && (
                            <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />
                          )}
                          <span className="text-[13px] font-bold text-muted-foreground inter-font">
                            {tag}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    <ul className="mt-4 space-y-3">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span
                            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ring-2 ring-white/20"
                            aria-hidden
                          />
                          <HighlightedText
                            text={point}
                            className="block text-[15px] md:text-base font-semibold text-muted-foreground inter-font leading-relaxed"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
