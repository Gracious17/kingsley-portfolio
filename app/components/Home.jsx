"use client";
import React, { useEffect } from "react";
import Main from "./Main";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from './Footer'
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      anchorPlacement: "top-bottom",
    });
  }, []);
  return (
    <div className="overflow-hidden">
      <Main />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer/>
    </div>
  );
};

export default Home;
