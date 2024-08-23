import Image from "next/image";
import React from "react";
import Html from "../../public/assets/skill/html.png";
import Css from "../../public/assets/skill/css.png";
import react from "../../public/assets/skill/react.png";
import Javascript from "../../public/assets/skill/javascript.png";
import Tailwind from "../../public/assets/skill/tailwind.png";
import NextJs from "../../public/assets/skill/nextjs.png";
import Nodejs from "../../public/assets/skill/node.png";
import Github from "../../public/assets/skill/github1.png";

const Skills = () => {
  return (
    <div id="skills" className="w-full lg:h-screen p-2">
      <div className="max-w[1240px] mx-auto flex flex-col justify-center h-full ">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Skills
        </p>
        <h2 className="py-4">What I can Do</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 justify-center items-center">
              <div data-aos="fade-up" className="m-auto">
                <Image src={Html} alt="/" width={120} height={120} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="tracking-widest">HTML</h3>
              </div>
            </div>
          </div>
          <div className="p-4 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 justify-center items-center">
              <div data-aos="fade-out" data-aos-delay="200" className="m-auto">
                <Image src={Css} alt="/" width={120} height={120} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="tracking-widest">CSS</h3>
              </div>
            </div>
          </div>
          <div className="p-4 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 justify-center items-center">
              <div data-aos="fade-up" className="m-auto">
                <Image src={Javascript} alt="/" width={120} height={120} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="tracking-widest">JAVASCRIPT</h3>
              </div>
            </div>
          </div>
          <div className="p-4 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 justify-center items-center">
              <div data-aos="fade-up" className="m-auto">
                <Image src={react} alt="/" width={120} height={120} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="tracking-widest uppercase">React.js</h3>
              </div>
            </div>
          </div>
          <div className="p-4 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 justify-center items-center">
              <div data-aos="fade-out" data-aos-delay="200" className="m-auto">
                <Image src={Tailwind} alt="/" width={120} height={120} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="tracking-widest">TAILWIND</h3>
              </div>
            </div>
          </div>
          <div className="p-4 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 justify-center items-center">
              <div data-aos="fade-out" className="m-auto">
                <Image src={NextJs} alt="/" width={120} height={120} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="tracking-widest uppercase">Next.Js</h3>
              </div>
            </div>
          </div>
          <div className="p-4 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 justify-center items-center">
              <div data-aos="fade-up" data-aos-delay="200" className="m-auto">
                <Image src={Github} alt="/" width={120} height={120} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="tracking-widest">GITHUB</h3>
              </div>
            </div>
          </div>
          <div className="p-4 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 justify-center items-center">
              <div data-aos="fade-out" className="m-auto">
                <Image src={Nodejs} alt="/" width={120} height={120} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="tracking-widest">NODE.JS</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
