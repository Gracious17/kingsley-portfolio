"use client";
import Image from "next/image";
import React, { useState } from "react";
import propertyImg from "../../public/assets/projects/agency.jpg";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

const Property = () => {
  const [showVideo] = useState(false); // Placeholder for future video modal
  return (
    <div className="w-full dark:bg-black dark:text-white">
      {/* Hero Section */}
      <div className="w-screen h-[30vh] lg:h-[40vh] relative flex items-center justify-center">
        {/* overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/80 via-[#5651e5]/30 to-black/80 z-10" />
        <Image
          data-aos="zoom-in"
          className="absolute z-1 object-cover"
          layout="fill"
          objectFit="cover"
          src={propertyImg}
          alt="Agency Website project screenshot"
          priority
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-20 p-2 animate-fadeInUp">
          <h2 className="py-2 text-3xl md:text-4xl font-bold drop-shadow-lg">
            Agency Website
          </h2>
          <h3 className="text-lg md:text-xl font-semibold drop-shadow">
            Next Js / Tailwind / Aos
          </h3>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8 relative">
        <div className="col-span-4 animate-fadeInUp">
          <p className="text-[#5651e5] font-semibold mb-1">Project</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Overview</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            This app was built using React Js. Users are able to manage agency
            content and showcase services with a modern, responsive UI.
            <br />
            <b>Key Features: </b>
            Clean landing page, service sections, responsive design, and smooth
            animations using Aos.
            <br />
            <b>Conclusion: </b>
            This project demonstrates a professional agency website with a focus
            on design, usability, and performance.
          </p>
          <div className="flex flex-wrap gap-4 mb-4">
            <a
              href="https://kingsley-agency-site.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Demo"
              className="inline-block px-8 py-2 rounded-full bg-[#5651e5] text-white font-semibold shadow-lg hover:bg-[#4338ca] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
            >
              Demo
            </a>
            <a
              href="https://github.com/Gracious17/agency-site"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Code"
              className="inline-block px-8 py-2 rounded-full bg-white text-[#5651e5] font-semibold shadow-lg border border-[#5651e5] hover:bg-[#5651e5] hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
            >
              Code
            </a>
          </div>
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
                <RiRadioButtonFill className="pr-1 text-[#5651e5]" /> Aos
                Animation
              </p>
              <p className="text-gray-600 py-2 flex items-center dark:text-white">
                <RiRadioButtonFill className="pr-1 text-[#5651e5]" /> Typescript
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

export default Property;
