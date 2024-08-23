"use client";
import Image from "next/image";
import React, { useState } from "react";
import CendriftImg from "../../public/assets/projects/cendrift.jpg";
import { RiRadioButtonFill } from "react-icons/ri";
import Video2 from "../components/Video2";
import Link from "next/link";
const Cendrift = () => {
  const [Myvid, setMyvid] = useState(false);
  const handleClick = () => {
    setMyvid(!Myvid);
  };
  return (
    <div className="w-full">
      <div className="w-screen h-[30vh] lg:h-[40vh] relative">
        {/* overlay */}
        <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10" />
        <Image
          data-aos="zoom-in"
          className="absolute z-1 "
          layout="fill"
          objectFit="cover"
          src={CendriftImg}
          alt="/"
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2">WhatsApp Automation Platform</h2>
          <h3>Next Js / Tailwind /Firebase</h3>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8">
        <div className="col-span-4">
          <p>Project</p>
          <h2>Overview</h2>
          <p>
            This app was buit using React Js , Users are able to // Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Adipisci ut nostrum
            veritatis quisquam at debitis commodi iste inventore. Quos,
            laboriosam?
          </p>
          <button className="px-8 py-2 mt-4 mr-4">Demo</button>
          <button className="px-8 py-2 mt-4">Code</button>
          {Myvid ? (
            <div className="border border-gray-600 sm:w-[90%] md:w-[55%] shadow shadow-gray-800 sm:h-[40vh] md:h-[40vh]  transition-all duration-500 z-10 absolute top-4 rounded-xl">
              <Video2 />
              <button className="px-10 mt-5" onClick={() => setMyvid(!Myvid)}>
                close clip
              </button>
            </div>
          ) : (
            <button className="px-7 py-2 mt-4 ml-3" onClick={handleClick}>
              show clip
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
                <RiRadioButtonFill className="pr-1" /> Tailwind
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Javascript
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Firebase
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Google api
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

export default Cendrift;
