"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import contactImg from "../../public/assets/contact.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { HiOutlineChevronDoubleUp } from "react-icons/hi2";
import Link from "next/link";
import SuccessMessage from "./SuccessMessage";
import { sendEmail, getErrorMessage, initializeEmailJS } from "../../lib/emailjs-service";
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
    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus(STATUS.LOADING);
      setErrorMessage("");
      
      try {
        // Initialize EmailJS if not already done
        initializeEmailJS();
        
        // Send email using EmailJS
        await sendEmail(formData);
        
        setStatus(STATUS.SUCCESS);
      } catch (error) {
        console.error('Email sending failed:', error);
        setStatus(STATUS.ERROR);
        setErrorMessage(getErrorMessage(error));
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
       setErrorMessage("");
   }
  return (
    <section id="contact" className="w-full bg-[#1a0b2e] text-white py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-800/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-lg sm:text-xl tracking-widest uppercase text-[#a362ff] font-['Poppins'] font-semibold mb-4">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Preahvihear'] font-normal text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-white/75 max-w-2xl mx-auto text-base lg:text-lg font-['Poppins']">
            I&apos;m available for contracts or full-time positions. Feel free to reach out via the form or connect with me on social media!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left - Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-5 lg:col-span-2"
          >
            <div className="h-full rounded-2xl shadow-2xl shadow-purple-900/50 border border-purple-500/20 backdrop-blur-md p-8 bg-gradient-to-br from-[#251043]/80 to-[#130428]/80 flex flex-col justify-between">
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-xl"
                >
                  <Image
                    className="rounded-xl w-full h-auto"
                    src={contactImg}
                    alt="Contact workspace"
                    width={400}
                    height={300}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e]/60 to-transparent" />
                </motion.div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-['Poppins'] font-bold text-white">
                    Gracious Kingsley
                  </h3>
                  <p className="text-[#a362ff] font-['Poppins'] font-semibold text-lg">
                    Full-Stack Developer
                  </p>
                  <p className="text-white/80 font-['Poppins'] leading-relaxed">
                    I am available for contracts or full-time positions. Contact me and let&apos;s talk!
                  </p>
                </div>
              </div>

              <div className="pt-8 space-y-4">
                <p className="uppercase text-xs tracking-widest text-white/60 font-['Poppins'] font-semibold">
                  Connect With Me
                </p>
                <div className="flex items-center justify-between gap-3">
                  {[
                    { href: linkedIn, icon: FaLinkedin, label: "LinkedIn" },
                    { href: gitHub, icon: FaGithub, label: "GitHub" },
                    { href: email, icon: AiOutlineMail, label: "Email" },
                    { href: "#contact", icon: BsFillPersonLinesFill, label: "Resume" },
                  ].map(({ href, icon: Icon, label }, index) => (
                    <motion.a
                      key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.15, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      href={href}
                      target={href.startsWith('http') ? "_blank" : undefined}
                      rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="rounded-full shadow-lg shadow-purple-900/50 p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 hover:border-[#a362ff] hover:bg-[#a362ff]/20 transition-all duration-300 text-white"
                    >
                      <Icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-5 lg:col-span-3"
          >
            <div className="h-full rounded-2xl shadow-2xl shadow-purple-900/50 border-2 border-purple-500/20 backdrop-blur-md bg-gradient-to-br from-[#251043]/80 to-[#130428]/80 p-8">
              <AnimatePresence mode="wait">
                {status === STATUS.SUCCESS ? (
                  <SuccessMessage key="success" onClose={resetForm} />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col"
                      >
                        <label className="uppercase text-xs font-['Poppins'] font-semibold mb-2 text-white/80">
                          Name
                        </label>
                        <input
                          className="border-2 rounded-xl p-4 border-purple-500/30 bg-[#1a0b2e]/60 text-white placeholder:text-white/40 focus:border-[#a362ff] focus:ring-2 focus:ring-[#a362ff]/50 outline-none transition-all font-['Poppins']"
                          onChange={handleChange}
                          name="name"
                          value={formData.name}
                          type="text"
                          required
                          aria-label="Name"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col"
                      >
                        <label className="uppercase text-xs font-['Poppins'] font-semibold mb-2 text-white/80">
                          Phone Number
                        </label>
                        <input
                          className="border-2 rounded-xl p-4 border-purple-500/30 bg-[#1a0b2e]/60 text-white placeholder:text-white/40 focus:border-[#a362ff] focus:ring-2 focus:ring-[#a362ff]/50 outline-none transition-all font-['Poppins']"
                          onChange={handleChange}
                          name="phone"
                          value={formData.phone}
                          type="text"
                          required
                          aria-label="Phone number"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex flex-col"
                    >
                      <label className="uppercase text-xs font-['Poppins'] font-semibold mb-2 text-white/80">
                        Email
                      </label>
                      <input
                        className="border-2 rounded-xl p-4 border-purple-500/30 bg-[#1a0b2e]/60 text-white placeholder:text-white/40 focus:border-[#a362ff] focus:ring-2 focus:ring-[#a362ff]/50 outline-none transition-all font-['Poppins']"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        type="email"
                        required
                        aria-label="Email"
                        />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex flex-col"
                    >
                      <label className="uppercase text-xs font-['Poppins'] font-semibold mb-2 text-white/80">
                        Subject
                      </label>
                      <input
                        className="border-2 rounded-xl p-4 border-purple-500/30 bg-[#1a0b2e]/60 text-white placeholder:text-white/40 focus:border-[#a362ff] focus:ring-2 focus:ring-[#a362ff]/50 outline-none transition-all font-['Poppins']"
                        placeholder="Subject"
                        name="subject"
                        onChange={handleChange}
                        value={formData.subject}
                        type="text"
                        required
                        aria-label="Subject"
                        />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex flex-col"
                    >
                      <label className="uppercase text-xs font-['Poppins'] font-semibold mb-2 text-white/80">
                        Message
                      </label>
                      <textarea
                        className="border-2 rounded-xl p-4 border-purple-500/30 bg-[#1a0b2e]/60 text-white placeholder:text-white/40 focus:border-[#a362ff] focus:ring-2 focus:ring-[#a362ff]/50 outline-none transition-all font-['Poppins'] resize-none"
                        rows="6"
                        onChange={handleChange}
                        value={formData.message}
                        name="message"
                        required
                        aria-label="Message"
                        ></textarea>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full p-4 rounded-full bg-gradient-to-r from-[#a362ff] to-[#9857d3] text-white font-['Poppins'] font-semibold shadow-lg shadow-purple-900/50 hover:shadow-xl hover:shadow-purple-900/70 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a362ff] disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={status === STATUS.LOADING}
                    >
                      {status === STATUS.LOADING ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                          </svg>
                          Sending Message...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </motion.button>
                    {status === STATUS.ERROR && (
                      <p className="text-red-500 text-sm mt-2">{errorMessage || "Something went wrong. Please try again."}</p>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        {/* Back to Top Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center pt-16"
        >
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full shadow-lg shadow-purple-900/50 p-5 border-2 border-purple-500/30 hover:border-[#a362ff] bg-gradient-to-br from-[#251043]/80 to-[#130428]/80 hover:bg-[#a362ff]/20 transition-all duration-300 cursor-pointer group"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <HiOutlineChevronDoubleUp className="text-[#a362ff] group-hover:text-white transition-colors" size={32} />
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
