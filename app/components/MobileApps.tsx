"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SiGoogleplay } from "react-icons/si";
import { FaApple, FaGithub } from "react-icons/fa";
import { HighlightedText } from "./ui/highlighted-text";
import { LoadMoreButton } from "./ui/load-more";
import { mobileApps, publishedAppCount, type MobileApp } from "@/lib/data/projects";

const INITIAL = 6;
const STEP = 6;

const StoreLinks = ({ app }: { app: MobileApp }) => {
  const icons = [
    app.platforms.includes("android") && {
      key: "android",
      href: app.playUrl,
      label: `${app.name} on Google Play`,
      icon: <SiGoogleplay className="w-3.5 h-3.5" />,
    },
    app.platforms.includes("ios") && {
      key: "ios",
      href: app.appStoreUrl,
      label: `${app.name} on the App Store`,
      icon: <FaApple className="w-3.5 h-3.5" />,
    },
    app.codeUrl && {
      key: "code",
      href: app.codeUrl,
      label: `${app.name} source`,
      icon: <FaGithub className="w-3.5 h-3.5" />,
    },
  ].filter(Boolean) as Array<{
    key: string;
    href?: string;
    label: string;
    icon: React.ReactNode;
  }>;

  return (
    <div className="flex items-center gap-2 text-white/30">
      {icons.map(({ key, href, label, icon }) =>
        href ? (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="hover:text-white transition-colors"
          >
            {icon}
          </a>
        ) : (
          <span key={key} aria-label={label} role="img">
            {icon}
          </span>
        )
      )}
    </div>
  );
};

export default function MobileApps() {
  const [visible, setVisible] = useState(INITIAL);
  const shown = mobileApps.slice(0, visible);

  return (
    <section id="mobile" className="w-full bg-transparent py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white geist-font tracking-tight">
            Mobile Applications
          </h2>
          <p className="mt-3 text-sm md:text-base font-medium text-white/50 inter-font">
            {publishedAppCount} Published Apps on{" "}
            <span className="text-[#a362ff] font-semibold">Google Play</span> &amp;{" "}
            <span className="text-sky-400 font-semibold">the App Store</span>
          </p>
          <p className="mt-4 mx-auto max-w-xl text-xs md:text-sm text-white/40 inter-font leading-relaxed">
            Some of the mobile apps I&apos;ve built and collaborated on for clients and my
            company — working on the <span className="text-white/50">frontends</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {shown.map((app, index) => (
            <motion.article
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (index % STEP) * 0.06 }}
              className="glass-card rounded-2xl p-5 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-md border border-[#a362ff]/25 bg-[#a362ff]/10 px-2 py-0.5 text-[10px] font-semibold text-[#a362ff] inter-font">
                    {app.group}
                  </span>
                  {app.status === "in-progress" && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 inter-font">
                      <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse" />
                      In Progress
                    </span>
                  )}
                </div>
                <StoreLinks app={app} />
              </div>

              <h3 className="text-[15px] font-bold text-white geist-font tracking-tight">
                {app.name}
              </h3>
              <HighlightedText
                text={app.description}
                className="mt-2 block text-[12px] text-white/60 inter-font leading-relaxed"
              />
            </motion.article>
          ))}
        </div>

        <LoadMoreButton
          onClick={() => setVisible((v) => v + STEP)}
          remaining={mobileApps.length - visible}
        />
      </div>
    </section>
  );
}
