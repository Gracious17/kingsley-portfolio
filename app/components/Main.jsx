import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import IsChecked from "./colourful/IsChecked";
const email = "mailto:kingsleygracious16@gmail.com";
const linkedIn = "https://www.linkedin.com/in/gracious-kingsley";
const gitHub = "https://github.com/Gracious17";

const Main = () => {
  let day = new Date().getDay();

  return (
    <div id="home" className="-w-full h-screen text-center dark:bg-black dark:text-white">
      {/* <IsChecked /> */}
      <div className="max-w-[1240px w-full h-full mx-auto  p-2 flex justify-center items-center">
        <div>
          <div className="h-12 w-12 bg-[#5651e5] flex justify-center mx-auto rounded-full animate-bAndc -z-40">
            <span className="h-9 w-9 bg-yellow-200 rounded-full animate-spin">
              <span className="h-8 w-8 bg-white rounded-full animate-ping font-bold text-black">
                fun
              </span>
            </span>
          </div>
          <div className="m-auto w-40 text-neutral-400">
            {day >= 1 && day <= 5 ? (
              <h1 className="text-sm">Happy Weekday💻👷🏾</h1>
            ) : (
              <h1 className="text-sm">Looking forward to the new Week🎉</h1>
            )}
          </div>
          <p className=" uppercase tracking-widest text-sm text-gray-600 dark:text-white">
            Let&apos;s build something together
          </p>
          <h1 className="py-4 text-gray-700 dark:text-white">
            Hi, i&apos;m <span className="text-[#5451e5]">Kingsley</span>
          </h1>
          <h1 className="py-2 text-gray-700 dark:text-white">A Full-Stack Web Developer</h1>
          <p className="py-4 text-gray-600 max-w-[70%] m-auto dark:text-white ">
            I&apos;m a full-stack web developer specializing in building (and
            occasionally designing ) exceptional digital experience. Currently,
            focusing on building the Do-Everything App,  (front-end web applications) and (backend services)
            
          </p>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4 md:gap-6 ">
            <div
              data-aos="fade-right"
              data-aos-delay="200"
              className=" rounded-full shadow-lg shadow-gray-400 p-6 hover:scale-110 ease-in duration-300 cursor-pointer "
            >
              <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} />
              </a>
            </div>
            <div
              data-aos="fade-right"
              className=" rounded-full shadow-lg shadow-gray-400 p-6 hover:scale-110 ease-in duration-300 cursor-pointer"
            >
              <a href={gitHub} target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} />
              </a>
            </div>
            <div
              data-aos="fade-left"
              className=" rounded-full shadow-lg shadow-gray-400 p-6 hover:scale-110 ease-in duration-300 cursor-pointer"
            >
              <a href={`${email}`}>
                <AiOutlineMail size={30} />
              </a>
            </div>
            <div
              data-aos="fade-left"
              data-aos-delay="200"
              className=" rounded-full shadow-lg shadow-gray-400 p-6 hover:scale-110 ease-in duration-300 cursor-pointer"
            >
              <BsFillPersonLinesFill size={30} />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Main;
