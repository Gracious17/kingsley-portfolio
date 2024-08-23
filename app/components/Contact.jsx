import Image from "next/image";
import React from "react";
import contactImg from "../../public/assets/contact.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Link from "next/link";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleUp,
} from "react-icons/hi2";
const email = "mailto:kingsleygracious16@gmail.com";
const linkedIn = "https://www.linkedin.com/in/gracious-kingsley";
const gitHub = "https://github.com/Gracious17";
const Contact = () => {
  return (
    <div id="contact" className="w-full lg:h-screen ">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full">
        <p className="text-xl tracking-widest uppercase text-[#5651e5] ">
          Contact
        </p>
        <h2 data-aos="fade-right" className="py-4">
          Get in touch
        </h2>
        <div className="grid lg:grid-cols-5 gap-8">
          {/* left */}
          <div className="col-span-3 lg:col-span-2 w-full shadow-xl shadow-gray-400 rounded-xl p-4">
            <div className="lg:p-4 h-full">
              <div data-aos="zoom-in" data-aos-delay="200">
                <Image
                  className="rounded-xl hover:scale-105 ease-in duration-300"
                  src={contactImg}
                />
              </div>
              <div>
                <h2 className="py-2">Gracious Kingsley</h2>
                <p>Front-End Developer</p>
                <p className="py-4">
                  I am available for freelance or full-time position. Contact me
                  and let's talk
                </p>
              </div>
              <div>
                <p className="uppercase pt-8">Connect With Me</p>
                <div className="flex items-center justify-between py-4">
                  <div
                    data-aos="fade-right"
                    data-aos-delay="400"
                    className=" rounded-full shadow-lg shadow-gray-400 p-6 hover:scale-110 ease-in duration-300 cursor-pointer"
                  >
                    <a
                      href={linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                    data-aos-delay="400"
                    className=" rounded-full shadow-lg shadow-gray-400 p-6 hover:scale-110 ease-in duration-300 cursor-pointer"
                  >
                    <BsFillPersonLinesFill size={30} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right */}

          <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400  rounded-xl lg:-4">
            <div className="p-4">
              <form>
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2 ">Name</label>
                    <input
                      className="border-2 rounded-lg p-3  flex border-gray-300 "
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2 ">
                      Phone number
                    </label>
                    <input
                      className="border-2 rounded-lg p-3  flex border-gray-300 "
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2 ">Email</label>
                  <input
                    className="border-2 rounded-lg p-3  flex border-gray-300 "
                    type="email"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2 ">subject</label>
                  <input
                    className="border-2 rounded-lg p-3  flex border-gray-300 "
                    type="text"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2 ">messages</label>
                  <textarea
                    className="border-2 rounded-lg p-3 border-gray-300"
                    rows="10"
                  ></textarea>
                </div>
                <button className="w-full p-4 text-gray-100 mt-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-12 ">
          <Link href="/">
            <div className="rounded-full shadow-lg shadow-gray-400 p-4 hover:scale-110 ease-in duration-300 cursor-pointer hover:border border-[#5651e5]">
              <HiOutlineChevronDoubleUp className="text-[#5651e5]" size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
