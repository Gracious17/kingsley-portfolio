
import React from "react";
// import Main from "./components/Main";
// import About from "./components/About";
// import Skills from "./components/Skills";
// import Projects from "./components/Projects";
// import Contact from "./components/Contact";
// import AOS from "aos";
// import "aos/dist/aos.css"; // You can also use <link> for styles
import Home  from "./components/Home"

const Page = () => {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     easing: "ease",
  //     once: true,
  //     anchorPlacement: "top-bottom",
  //   });
  // }, []);
  return (
    <div className="overflow-hidden">
      {/* <Main />
      <About />
      <Skills />
      <Projects />
      <Contact /> */}
      <Home/>
    </div>
  );
};

export default Page;
