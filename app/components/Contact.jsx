"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, MapPin, Github, Send, Loader2 } from "lucide-react";
import { ContactCard } from "./ui/contact-card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import SuccessMessage from "./SuccessMessage";
import { sendEmail, getErrorMessage, initializeEmailJS } from "../../lib/emailjs-service";

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(STATUS.LOADING);
    setErrorMessage("");

    try {
      initializeEmailJS();
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
  };

  return (
    <section id="contact" className="w-full bg-transparent text-white py-20 md:py-32 relative overflow-hidden">
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
          <p className="text-lg sm:text-xl tracking-widest uppercase text-[#a362ff] font-medium mb-4">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 geist-font">
            Get in Touch
          </h2>
          <p className="text-white/75 max-w-2xl mx-auto text-base lg:text-lg inter-font">
            I&apos;m available for contracts or full-time positions. Feel free to reach out via the form or connect with me on social media!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ContactCard
            title="Let's Work Together"
            description="Have a project in mind or just want to say hi? Drop me a message and I'll get back to you as soon as possible."
            className="rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
            formSectionClassName="bg-white/5 border-white/10"
            contactInfo={[
              {
                icon: Mail,
                label: "Email",
                value: "kingsleygracious16@gmail.com",
                href: "mailto:kingsleygracious16@gmail.com",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "gracious-kingsley",
                href: "https://www.linkedin.com/in/gracious-kingsley",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Lagos, Nigeria",
              },
              {
                icon: Github,
                label: "GitHub",
                value: "Gracious17",
                href: "https://github.com/Gracious17",
              },
            ]}
          >
            <AnimatePresence mode="wait">
              {status === STATUS.SUCCESS ? (
                <SuccessMessage key="success" onClose={resetForm} />
              ) : (
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-white/40 text-xs uppercase tracking-widest ml-1">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/10 focus:border-white/40 transition-all rounded-xl h-14"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-white/40 text-xs uppercase tracking-widest ml-1">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+234..."
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/10 focus:border-white/40 transition-all rounded-xl h-14"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-white/40 text-xs uppercase tracking-widest ml-1">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/10 focus:border-white/40 transition-all rounded-xl h-14"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-white/40 text-xs uppercase tracking-widest ml-1">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can I help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/10 focus:border-white/40 transition-all rounded-xl h-14"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-white/40 text-xs uppercase tracking-widest ml-1">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/10 focus:border-white/40 transition-all rounded-xl min-h-[160px] p-4"
                    />
                  </div>

                  {status === STATUS.ERROR && (
                    <p className="text-red-400 text-sm ml-1">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === STATUS.LOADING}
                    className="w-full bg-white hover:bg-white/90 text-black py-8 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] uppercase tracking-widest text-sm"
                  >
                    {status === STATUS.LOADING ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {status === STATUS.LOADING ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </ContactCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
