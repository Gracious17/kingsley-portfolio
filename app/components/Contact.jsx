"use client";
import Image from "next/image";
import React, { useState } from "react";
import contactImg from "../../public/assets/contact.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Link from "next/link";
import { HiOutlineChevronDoubleUp } from "react-icons/hi2";
import { AnimatePresence } from "framer-motion";
import SuccessMessage from "./SuccessMessage";
const email = "mailto:kingsleygracious16@gmail.com";
const linkedIn = "https://www.linkedin.com/in/gracious-kingsley";
const gitHub = "https://github.com/Gracious17";
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });
     const [status, setStatus] = useState(STATUS.IDLE);


    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("loading");
      
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setStatus("success");
    
        } else {
          setStatus("error");
        }
      
      };
      const resetForm = () => {
       setFormData({
         name: "",
         phone: "",
         email: "",
         subject: "",
         message: "",
       });
       setStatus(STATUS.IDLE);
   }
  return (
    <div id="contact" className="w-full dark:bg-black dark:text-white">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full">
        <p className="text-xl tracking-widest uppercase text-[#5651e5] ">
          Contact
        </p>
        <h2 data-aos="fade-right" className="py-4">
          Get in touch
        </h2>
        <div className="grid lg:grid-cols-5 gap-8">
          {/* left */}
          <div className="col-span-3 lg:col-span-2 w-full shadow-xl shadow-gray-400 dark:shadow-md dark:shadow-gray-400 rounded-xl p-4">
            <div className="lg:p-4 h-full">
              <div data-aos="zoom-in" data-aos-delay="200">
                <Image
                  className="rounded-xl hover:scale-105 ease-in duration-300"
                  src={contactImg}
                  alt="contact image"
                />
              </div>
              <div>
                <h2 className="py-2">Gracious Kingsley</h2>
                <p>Full-Stack Developer</p>
                <p className="py-4">
                  I am available for Contracts or full-time position. Contact me
                  and let&apos;s talk
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
                    className="rounded-full shadow-lg shadow-gray-400 p-6 hover:scale-110 ease-in duration-300 cursor-pointer"
                  >
                    <a href={`${email}`}>
                      <AiOutlineMail size={30} />
                    </a>
                  </div>
                  <div
                    data-aos="fade-left"
                    data-aos-delay="400"
                    className="rounded-full shadow-lg shadow-gray-400 p-6 hover:scale-110 ease-in duration-300 cursor-pointer"
                  >
                    <BsFillPersonLinesFill size={30} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right  */}

          <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 dark:shadow-md dark:shadow-gray-400  rounded-xl lg:-4">
            <div className="p-4">
<AnimatePresence mode="wait">
  {status===STATUS.SUCCESS? (
    <SuccessMessage key="success" onClose={resetForm} />
  ):(

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2 ">Name</label>
                    <input
                      className="border-2 rounded-lg p-3  flex border-gray-300 "
                     onChange={handleChange}
                      name="name"
                      value={formData.name}
                      type="text"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2 ">
                      Phone number
                    </label>
                    <input
                      className="border-2 rounded-lg p-3  flex border-gray-300 "
                     onChange={handleChange}
                      name="phone"
                      value={formData.phone}
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2 ">Email</label>
                  <input
                    className="border-2 rounded-lg p-3  flex border-gray-300 "
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    type="email"
                    required
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2 ">subject</label>
                  <input
                    className="border-2 rounded-lg p-3  flex border-gray-300 "
                    placeholder="Subject"
                    name="subject"
                    onChange={handleChange}
                    value={formData.subject}
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2 ">messages</label>
                  <textarea
                    className="border-2 rounded-lg p-3 border-gray-300"
                    rows="10"
                    onChange={handleChange}
                    value={formData.message}
                    name="message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full p-4 text-gray-100 mt-4">
                
                {status===STATUS.LOADING ? "Sending...":"Send Message"}
                </button>
                {status===STATUS.ERROR && (
                  <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
                )}
              </form>
)}
</AnimatePresence>
   </div>
          </div>
        </div>
        <div className="flex justify-center py-12 ">
          <Link href="/">
            <div className="rounded-full shadow-lg shadow-gray-400 p-4 hover:scale-110 ease-in duration-300 cursor-pointer hover:border border-[#5651e5]">
              <HiOutlineChevronDoubleUp className="text-[#5651e5] hover:animate-ping" size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
