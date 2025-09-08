"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiRadioButtonFill } from "react-icons/ri";
import { HiArrowLeft } from "react-icons/hi2";
import { projects } from "@/lib/data/projects";

interface Props {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.id.toString() === params.id);
  const [showVideo, setShowVideo] = useState(false);

  if (!project) return notFound();
  

  return (
    <div className="w-full dark:bg-black dark:text-white">
      {/* Hero */}
      <div className="w-screen h-[50vh] lg:h-[70vh] relative flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/80 via-[#5651e5]/30 to-black/80 z-10" />
        <Image
          src={project.backgroundImg}
          alt={project.title}
          fill
          className="absolute object-cover z-1"
          priority
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-20 p-2 animate-fadeInUp">
          <h2 className="py-2 text-[min(10vw,70px)] font-bold drop-shadow-lg">
            {project.title}
          </h2>
          <h3 className="text-lg md:text-xl font-semibold drop-shadow">
            {project.stack}
          </h3>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8 relative">
        <div className="col-span-4 animate-fadeInUp">
          <p className="text-[#5651e5] font-semibold mb-1">
            Company:{" "}
            <span className="font-bold text-black dark:text-white">
              {project.company}
            </span>
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Overview</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {project.overview}
            <br />
            <b>Key Features: </b>
            {project.features.join(", ")}.
            <br />
            <b>Conclusion: </b>
            {project.conclusion}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-2 rounded-full bg-[#5651e5] text-white font-semibold shadow-lg hover:bg-[#4338ca]"
              >
                Demo
              </a>
            )}
            {project.codeUrl ? (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-2 rounded-full bg-white text-[#5651e5] font-semibold shadow border border-[#5651e5] hover:bg-[#5651e5] hover:text-white"
              >
                Code
              </a>
            ) : (
              <button
                className="inline-block px-8 py-2 rounded-full bg-white text-[#5651e5] font-semibold shadow border border-[#5651e5] opacity-60 cursor-not-allowed"
                disabled
              >
                Code
              </button>
            )}
            {project.video && (
              <button
                className="inline-block px-7 py-2 rounded-full bg-[#5651e5]/80 text-white font-semibold shadow-lg hover:bg-[#4338ca]"
                onClick={() => setShowVideo(true)}
              >
                Show Clip
              </button>
            )}
          </div>

          {/* Video Modal */}
          {showVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white dark:bg-black rounded-xl shadow-2xl p-4 max-w-2xl w-full relative animate-fadeInUp">
                <video controls autoPlay className="w-full rounded-lg">
                  <source src={project.video} type="video/mp4" />
                </video>
                <button
                  className="absolute top-2 right-2 px-4 py-1 rounded-full bg-[#5651e5] text-white font-semibold shadow hover:bg-[#4338ca]"
                  onClick={() => setShowVideo(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tech Stack */}
        <div className="col-span-4 md:col-span-1 rounded-2xl bg-white/60 dark:bg-gray-900/80 shadow-xl border p-4 animate-fadeInUp">
          <p className="text-center font-bold pb-2 text-[#5651e5]">
            Technologies
          </p>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
            {project.technologies.map((tech) => (
              <p
                key={tech}
                className="text-gray-600 py-2 flex items-center dark:text-white"
              >
                <RiRadioButtonFill className="pr-1 text-[#5651e5]" /> {tech}
              </p>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="col-span-5 flex justify-start mt-8 animate-fadeInUp">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-[#5651e5] font-semibold shadow border border-[#5651e5] hover:bg-[#5651e5] hover:text-white"
          >
            <HiArrowLeft size={20} /> Back
          </Link>
        </div>
      </div>
    </div>
  );
}
