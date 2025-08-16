import React, { Component } from "react";
import Image from "next/image";
import AboutImg from "../../public/assets/about.jpg";
import myImg from "../../public/assets/me2.png";
import { FaArrowDown } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="w-full md:h-screen p-2 flex items-center py-16 dark:bg-black dark:text-white">
      <div className="max-w-[1240px] m-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Text Section */}
        <div className="md:col-span-2 animate-fadeIn">
          <p className="uppercase tracking-widest text-xl text-[#5651e5] font-semibold mb-2">About</p>
          <h2 className="py-2 text-3xl font-bold">Who I Am</h2>
          <p className="py-2 text-gray-600 dark:text-gray-200 text-lg">
            I am a motivated and passionate developer with over 3 years of experience building responsive user interfaces and robust backend services. My journey in tech is driven by curiosity and a love for innovation.
          </p>
          <p className="py-2 text-gray-600 dark:text-gray-200">
            I thrive on solving complex problems and creating products that make a difference. My approach combines creativity, attention to detail, and a commitment to continuous learning.
          </p>
          <div className="my-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#5651e5] text-white rounded shadow hover:bg-[#4338ca] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5] text-base font-semibold"
              aria-label="View my latest projects"
            >
              View Projects <FaArrowDown size={18} />
            </a>
          </div>
        </div>
        {/* Image Section */}
        <div
          data-aos="fade-in"
          className="w-full h-auto shadow-xl shadow-gray-400 dark:shadow-md dark:shadow-gray-400 rounded-xl flex items-center justify-center p-4 bg-white dark:bg-gray-900 hover:scale-105 transition-transform duration-300 animate-fadeIn"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={AboutImg}
              alt="Workspace with laptop and code"
              className="rounded-xl object-cover w-full h-full transition-opacity duration-300 opacity-100 hover:opacity-0"
              width={400}
              height={400}
              priority
            />
            <Image
              src={myImg}
              alt="Kingsley Gracious portrait"
              className="rounded-xl object-cover w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
