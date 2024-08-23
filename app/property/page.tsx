import Image from "next/image";
import React from "react";
import propertyImg from "../../public/assets/projects/agency.jpg";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";
const Property = () => {
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
          src={propertyImg}
          alt="/"
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2">Agency Website</h2>
          <h3>Next Js / Tailwind /Aos</h3>
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
                <RiRadioButtonFill className="pr-1" /> Aos Animation
              </p>

              <p className="text-gray-600 py-2 flex items-center ">
                <RiRadioButtonFill className="pr-1" /> Typescript
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

export default Property;
