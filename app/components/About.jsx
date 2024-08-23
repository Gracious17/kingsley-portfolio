import React, { Component } from "react";
import Image from "next/image";
import AboutImg from "../../public/assets/about.jpg";
import myImg from "../../public/assets/me2.png";
import { FaArrowDown } from "react-icons/fa";

const About = () => {
  return (
    <div id="about" className="w-full  md:h-screen p-2 flex items-center py-16">
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-sapn-2">
          <p className="uppercase tracking-widest text-xl text-[#5651e5] group">
            About
            <span className="ml-5  border border-gray-500 hidden group-hover:inline">
              KNOW ME MORE <FaArrowDown size={20} className="inline" />
            </span>
          </p>
          <h2 className="py-4"> Who I Am</h2>
          <p className="py-2 text-gray-600">
            I am a Motivated passionate Developer
          </p>
          <p className="py-2 text-gray-600">
            I have spent 2yrs in the Tech field, Learning and Building
            responsive User Interfaces While mastering backend technologies
          </p>
          <p className="py-2 text-gray-600">
            Fascinated with how intricating programming is and i am driven to
            learn more.
          </p>
          <p className="py-2 text-gray-600 underline cursor-pointer">
            Check out Some of my latest projects
          </p>
        </div>
        <div
          data-aos="fade-in"
          className="w-full group h-auto shadow-xl shadow-gray-400 rounded-xl flex items-center  justify-center p-4 hover:scale-105 ease-in duration-300"
        >
          <Image
            src={AboutImg}
            alt="about image"
            className="rounded-xl transition-all duration-300 group-hover:hidden"
          />
          <Image
            src={myImg}
            alt="about image"
            className="rounded-xl hidden group-hover:inline h-full "
            width="640"
            height="800"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
