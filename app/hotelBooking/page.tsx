"use client";
import Image from "next/image";
import React, { useState } from "react";
import hotelImg from "@/public/hotel-booking.png";
import { RiRadioButtonFill } from "react-icons/ri";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import Video3 from "../components/Video3";
import Link from "next/link";
const HotelBooking = () => {
  const [Myvid, setMyvid] = useState(false);
  const handleClick = () => {
    setMyvid(!Myvid);
  };
  return (
    <div className="w-full overflow-hidden">
      <div className="w-screen h-[30vh] lg:h-[40vh] relative">
        {/* overlay */}
        <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10" />
        <Image
          data-aos="zoom-in"
          className="absolute z-1 "
          layout="fill"
          objectFit="cover"
          src={hotelImg}
          alt="/"
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2">Hosptality Management App</h2>
          <h3>Next Js /Typescript/ TailwindCSS /NextAuth</h3>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8">
        <div className="col-span-4">
          <p>Project</p>
          <h2>Overview</h2>
          <p>
            A fully responsive hotel booking application built with Next.js 15,
            TypeScript, and Tailwind CSS, designed to streamline the hotel
            discovery and reservation process.
          </p>
          {/* <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Demo"
          > */}
          <button className="px-8 py-2 mt-4 mr-4">Demo</button>
          {/* </a> */}

          <button className="px-8 py-2 mt-4">Code</button>
          {Myvid ? (
            <div className="border border-gray-600 sm:w-[90%] md:w-[55%] shadow shadow-gray-800 sm:h-[40vh] md:h-[40vh]  transition-all duration-500 z-10 absolute top-4 rounded-xl">
              <Video3 />
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
                <RiRadioButtonFill className="pr-1" /> Next.Js
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Tailwind CSS
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Typescript
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> NextAuth
              </p>
              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Zustand
              </p>
              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Paystack
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Google api
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* more details section */}
      <div className="w-full py-4 ml-4 gap-3 px-2">
        <hr />
        <h2>Idea-To-Impact</h2>

        <details>
          <summary className="font-bold text-black text-xl tracking-wide"> Problem</summary>
          <h3 className="text-sm font-semibold">
            Hotel search platforms often lack clarity, real-time availability,
            and seamless payment flow, especially in growing markets. Users find
            it difficult to:
          </h3>
          <ul>
            <li className="text-gray-600 py-2 flex items-center ">
              {" "}
              <IoRadioButtonOnOutline className="pr-1" />
              Filter hotels based on key preferences
            </li>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              View accurate, up-to-date availability
            </li>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Pay securely and receive booking confirmation
            </li>
          </ul>
        </details>

        <details>
          <summary className="font-bold text-black text-xl tracking-wide"> Solution</summary>
          <h3 className="text-sm font-semibold">
            Built a multi-page booking flow with the following features: :
          </h3>
          <ul>
            <li className="text-gray-600 py-2 flex items-center">
              <IoRadioButtonOnOutline className="pr-1" />
              Hotel Listing Page: Shows dynamically fetched hotels with filters
              (price, rating, distance)
            </li>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Hotel Details Page: Displays selected hotel&apos;s info and room
              availability
            </li>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Pay securely and receive booking confirmation
            </li>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Payment Page: Accepts guest info and initiates payment through
              Paystack
            </li>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Confirmation Page: Displays success message, booking ID, and sends
              email confirmation
            </li>
          </ul>
        </details>

        <details>
          <summary className="font-bold text-black text-xl tracking-wide">Challenges</summary>
          <ul>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Ensuring smooth client-server state sync across pages
            </li>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Handling Paystack redirection and transaction verification
            </li>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Making the UI accessible and mobile-first
            </li>
          </ul>
        </details>
        <details>
          <summary className="font-bold text-black text-xl tracking-wide">Results</summary>
          <ul>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Completed a responsive and test-ready booking flow.
            </li>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Reduced booking steps to just 2 screens.
            </li>
            <li className="text-gray-600 py-2 flex items-center ">
              <IoRadioButtonOnOutline className="pr-1" />
              Modular and API-integrated components allow for easy scaling.
            </li>
          </ul>
        </details>
      </div>
      {/* go back  btn */}
      <div className="w-full p-4">
        <Link href="/#projects">
          <p className="underline cursor-pointer">Back</p>
        </Link>
      </div>
    </div>
  );
};

export default HotelBooking;
