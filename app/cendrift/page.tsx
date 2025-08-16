
"use client";
import Image from "next/image";
import React, { useState } from "react";
import CendriftImg from "../../public/assets/projects/cendrift.jpg";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";
import Video2 from "../components/Video2";
import { HiArrowLeft } from "react-icons/hi2";

const techStack = [
  "React",
  "Tailwind",
  "Javascript",
  "Firebase",
  "Google API",
];

const Cendrift = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="w-full dark:bg-black dark:text-white">
      {/* Hero Section */}
      <div className="w-screen h-[50vh] lg:h-[70vh] relative flex items-center justify-center">
        {/* overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/80 via-[#5651e5]/30 to-black/80 z-10" />
        <Image
          data-aos="zoom-in"
          className="absolute z-1 object-cover"
          layout="fill"
          objectFit="cover"
          src={CendriftImg}
          alt="Cendrift project screenshot"
          priority
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-20 p-2 animate-fadeInUp">
          <h2 className="py-2 text-3xl md:text-4xl font-bold drop-shadow-lg">
            WhatsApp Automation Platform
          </h2>
          <h3 className="text-lg md:text-xl font-semibold drop-shadow">
            Next Js / Tailwind / Firebase
          </h3>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8 relative">
        <div className="col-span-4 animate-fadeInUp">
          <p className="text-[#5651e5] font-semibold mb-1">Company: <span className="font-bold text-black dark:text-white">Cendrift</span></p>
          <p className="text-[#5651e5] font-semibold mb-1">Project</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Overview</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            This app was built using React Js. Users are able to automate WhatsApp workflows for business and personal use.<br />
            <b>Key Features: </b>
            Real-time messaging, contact management, Google API and Firebase integration for authentication and data storage.<br />
            <b>Conclusion: </b>
            This project demonstrates a robust WhatsApp automation platform for business and personal productivity.
          </p>
          <div className="flex flex-wrap gap-4 mb-4">
            <a
              href="https://www.cendrift.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Demo"
              className="inline-block px-8 py-2 rounded-full bg-[#5651e5] text-white font-semibold shadow-lg hover:bg-[#4338ca] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
            >
              Demo
            </a>
            <button
              className="inline-block px-8 py-2 rounded-full bg-white text-[#5651e5] font-semibold shadow border border-[#5651e5] hover:bg-[#5651e5] hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
              aria-label="Code not available"
              disabled
            >
              Code
            </button>
            <button
              className="inline-block px-7 py-2 rounded-full bg-[#5651e5]/80 text-white font-semibold shadow-lg hover:bg-[#4338ca] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
              onClick={() => setShowVideo(true)}
              aria-label="Show Demo Clip"
            >
              Show Clip
            </button>
          </div>
          {/* Video Modal */}
          {showVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white dark:bg-black rounded-xl shadow-2xl p-4 max-w-2xl w-full relative animate-fadeInUp">
                <Video2 />
                <button
                  className="absolute top-2 right-2 px-4 py-1 rounded-full bg-[#5651e5] text-white font-semibold shadow hover:bg-[#4338ca] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
                  onClick={() => setShowVideo(false)}
                  aria-label="Close Clip"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Tech Stack Card */}
        <div className="col-span-4 md:col-span-1 rounded-2xl bg-white/60 dark:bg-gray-900/80 shadow-xl dark:shadow-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-md p-4 animate-fadeInUp">
          <div className="p-2">
            <p className="text-center font-bold pb-2 text-[#5651e5]">
              Technologies
            </p>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
              <p className="text-gray-600 py-2 flex items-center dark:text-white">
                <RiRadioButtonFill className="pr-1 text-[#5651e5]" /> React
              </p>
              <p className="text-gray-600 py-2 flex items-center dark:text-white">
                <RiRadioButtonFill className="pr-1 text-[#5651e5]" /> Tailwind
              </p>
              <p className="text-gray-600 py-2 flex items-center dark:text-white">
                <RiRadioButtonFill className="pr-1 text-[#5651e5]" /> Javascript
              </p>
              <p className="text-gray-600 py-2 flex items-center dark:text-white">
                <RiRadioButtonFill className="pr-1 text-[#5651e5]" /> Firebase
              </p>
              <p className="text-gray-600 py-2 flex items-center dark:text-white">
                <RiRadioButtonFill className="pr-1 text-[#5651e5]" /> Google API
              </p>
            </div>
          </div>
        </div>
        {/* Back Link */}
        <div className="col-span-5 flex justify-start mt-8 animate-fadeInUp">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-[#5651e5] font-semibold shadow border border-[#5651e5] hover:bg-[#5651e5] hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
          >
            <HiArrowLeft size={20} /> Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cendrift;
