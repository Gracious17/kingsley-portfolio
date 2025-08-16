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
    <section id="contact" className="w-full dark:bg-black dark:text-white">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full">
        <p className="text-xl tracking-widest uppercase text-[#5651e5] font-semibold mb-2">Contact</p>
        <h2 className="py-2 text-2xl md:text-3xl font-bold mb-2">Get in Touch</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center text-base">I&apos;m available for contracts or full-time positions. Feel free to reach out via the form or connect with me on social media!</p>
  <div className="grid lg:grid-cols-5 gap-8">
          {/* left */}
          <div
            className="col-span-3 lg:col-span-2 w-full rounded-2xl bg-white/60 dark:bg-gray-900/80 shadow-xl dark:shadow-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-md p-4 animate-fadeInUp"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="lg:p-4 h-full flex flex-col justify-between">
              <div className="mb-4" data-aos="zoom-in" data-aos-delay="200">
                <Image
                  className="rounded-xl hover:scale-105 transition-transform duration-300"
                  src={contactImg}
                  alt="Contact workspace"
                  width={400}
                  height={300}
                  priority
                />
              </div>
              <div data-aos="fade-up" data-aos-delay="300">
                <h2 className="py-2 text-xl font-bold">Gracious Kingsley</h2>
                <p className="text-[#5651e5] font-semibold">Full-Stack Developer</p>
                <p className="py-4 text-gray-700 dark:text-gray-300 text-sm">
                  I am available for contracts or full-time positions. Contact me and let&apos;s talk!
                </p>
              </div>
              <div data-aos="fade-up" data-aos-delay="400">
                <p className="uppercase pt-8 text-xs tracking-widest text-gray-500 dark:text-gray-400">Connect With Me</p>
                <div className="flex items-center justify-between py-4 gap-2">
                  <a
                    data-aos="fade-right"
                    data-aos-delay="500"
                    href={linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="rounded-full shadow-lg shadow-gray-400 p-4 bg-white/80 dark:bg-gray-900/80 hover:scale-110 hover:shadow-[#5651e5]/40 hover:bg-[#5651e5] hover:text-white dark:hover:bg-[#5651e5] dark:hover:text-white transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
                  >
                    <FaLinkedin size={26} />
                  </a>
                  <a
                    data-aos="fade-right"
                    data-aos-delay="600"
                    href={gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className="rounded-full shadow-lg shadow-gray-400 p-4 bg-white/80 dark:bg-gray-900/80 hover:scale-110 hover:shadow-[#5651e5]/40 hover:bg-[#5651e5] hover:text-white dark:hover:bg-[#5651e5] dark:hover:text-white transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
                  >
                    <FaGithub size={26} />
                  </a>
                  <a
                    data-aos="fade-left"
                    data-aos-delay="700"
                    href={email}
                    aria-label="Email"
                    title="Email"
                    className="rounded-full shadow-lg shadow-gray-400 p-4 bg-white/80 dark:bg-gray-900/80 hover:scale-110 hover:shadow-[#5651e5]/40 hover:bg-[#5651e5] hover:text-white dark:hover:bg-[#5651e5] dark:hover:text-white transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
                  >
                    <AiOutlineMail size={26} />
                  </a>
                  <a
                    data-aos="fade-left"
                    data-aos-delay="800"
                    href="#contact"
                    aria-label="Contact"
                    title="Contact"
                    className="rounded-full shadow-lg shadow-gray-400 p-4 bg-white/80 dark:bg-gray-900/80 hover:scale-110 hover:shadow-[#5651e5]/40 hover:bg-[#5651e5] hover:text-white dark:hover:bg-[#5651e5] dark:hover:text-white transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
                  >
                    <BsFillPersonLinesFill size={26} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* right  */}
          <div
            className="col-span-3 w-full h-auto rounded-2xl bg-white/60 dark:bg-gray-900/80 shadow-xl dark:shadow-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-md animate-fadeInUp"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="p-4">
              <AnimatePresence mode="wait">
                {status === STATUS.SUCCESS ? (
                  <SuccessMessage key="success" onClose={resetForm} />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 w-full">
                      <div className="flex flex-col" data-aos="fade-up" data-aos-delay="300">
                        <label className="uppercase text-xs font-semibold py-2 text-gray-700 dark:text-gray-300">Name</label>
                        <input
                          className="border-2 rounded-lg p-3 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 focus:border-[#5651e5] focus:ring-2 focus:ring-[#5651e5] outline-none transition-all"
                          onChange={handleChange}
                          name="name"
                          value={formData.name}
                          type="text"
                          required
                          aria-label="Name"
                        />
                      </div>
                      <div className="flex flex-col" data-aos="fade-up" data-aos-delay="350">
                        <label className="uppercase text-xs font-semibold py-2 text-gray-700 dark:text-gray-300">Phone number</label>
                        <input
                          className="border-2 rounded-lg p-3 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 focus:border-[#5651e5] focus:ring-2 focus:ring-[#5651e5] outline-none transition-all"
                          onChange={handleChange}
                          name="phone"
                          value={formData.phone}
                          type="text"
                          required
                          aria-label="Phone number"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col" data-aos="fade-up" data-aos-delay="400">
                      <label className="uppercase text-xs font-semibold py-2 text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        className="border-2 rounded-lg p-3 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 focus:border-[#5651e5] focus:ring-2 focus:ring-[#5651e5] outline-none transition-all"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        type="email"
                        required
                        aria-label="Email"
                      />
                    </div>
                    <div className="flex flex-col" data-aos="fade-up" data-aos-delay="450">
                      <label className="uppercase text-xs font-semibold py-2 text-gray-700 dark:text-gray-300">Subject</label>
                      <input
                        className="border-2 rounded-lg p-3 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 focus:border-[#5651e5] focus:ring-2 focus:ring-[#5651e5] outline-none transition-all"
                        placeholder="Subject"
                        name="subject"
                        onChange={handleChange}
                        value={formData.subject}
                        type="text"
                        required
                        aria-label="Subject"
                      />
                    </div>
                    <div className="flex flex-col" data-aos="fade-up" data-aos-delay="500">
                      <label className="uppercase text-xs font-semibold py-2 text-gray-700 dark:text-gray-300">Message</label>
                      <textarea
                        className="border-2 rounded-lg p-3 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 focus:border-[#5651e5] focus:ring-2 focus:ring-[#5651e5] outline-none transition-all"
                        rows="8"
                        onChange={handleChange}
                        value={formData.message}
                        name="message"
                        required
                        aria-label="Message"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full p-4 mt-2 rounded-full bg-[#5651e5] text-white font-semibold shadow-lg hover:bg-[#4338ca] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
                      disabled={status === STATUS.LOADING}
                    >
                      {status === STATUS.LOADING ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                    {status === STATUS.ERROR && (
                      <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
  <div className="flex justify-center py-12" data-aos="fade-up" data-aos-delay="600">
          <Link href="/">
            <div className="rounded-full shadow-lg shadow-gray-400 p-4 hover:scale-110 transition-transform duration-300 cursor-pointer hover:border border-[#5651e5] bg-white/80 dark:bg-gray-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]">
              <HiOutlineChevronDoubleUp className="text-[#5651e5] hover:animate-ping" size={30} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
