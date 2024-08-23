"use client";
import Image from "next/image";
import React, { useState } from "react";
import passwordGenImg from "../../public/assets/projects/password-gen.png";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";
import Video from "../components/Video";
const PasswordApp = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="w-full ">
      <div className="w-screen h-[50vh] lg:h-[70vh] relative">
        {/* overlay */}
        <div className="absolute top-0 left-0 w-full h-[50vh] lg:h-[70vh] bg-black/80 z-10 lg:pb-20" />
        <Image
          data-aos="zoom-in"
          className="absolute z-1 "
          layout="fill"
          objectFit="cover"
          src={passwordGenImg}
          alt="/"
        />
        <div className="flex w-[20%] bg-white">
          <Image
            data-aos="zoom-in"
            className="absolute z-1 w-10 items-end"
            layout="fill"
            objectFit="cover"
            src={passwordGenImg}
            alt="/"
          />
        </div>
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2">Password Generator</h2>
          <h3>React Js / Css </h3>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8 relative">
        <div className="col-span-4">
          <p>Project</p>
          <h2>Overview</h2>
          <p>
            This app was buit using React Js , Users are able to generate secure
            passwords dynamically based on user-selected criteria
            <br />
            <b>Key Features: </b>
            customizable options for password length and character types (
            uppercase,lowercase,numbers,special characters) Easy
            copy-to-clipboard functionality for quick use
            <br />
            <b>conclusion: </b>
            This application provides a fast, user-friendly way to create strong
            passwords, focusing on customization and security.
          </p>
          <button className="px-8 py-2 mt-4 mr-4">Demo</button>
          <button className="px-8 py-2 mt-4">Code</button>
          {showVideo ? (
            <div className="border border-gray-600 sm:w-[90%] md:w-[55%] shadow shadow-gray-800 sm:h-[40vh] md:h-[40vh]  transition-all duration-500 z-10 absolute top-0 rounded-md">
              <Video />
              <button
                className="px-10 mt-5"
                onClick={() => setShowVideo(false)}
              >
                close clip
              </button>
            </div>
          ) : (
            <button
              className="px-7 py-2 mt-4 ml-3"
              onClick={() => setShowVideo(true)}
            >
              Show Clip
            </button>
          )}
        </div>
        <div className="col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4">
          <div className="p-2">
            <p className="text-center font-bold pb-2">Technologies</p>
            <div className="grid grid-cols-3 md:grid-cols-1">
              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> React
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Css
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Javascript
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> React-Toastify
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" />
                Animation
              </p>
            </div>
          </div>
        </div>
        <Link href="/#projects">
          <p className="underline cursor-pointer">Back</p>
        </Link>
      </div>
    </div>
  );
};

export default PasswordApp;
