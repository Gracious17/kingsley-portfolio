import React from "react";
import agencyImg from "../../public/assets/projects/agency.jpg";
import ProjectItem from "./ProjectItem";
import passwordGenImg from "../../public/assets/projects/password-gen.png";
import CendriftImg from "../../public/assets/projects/cendrift.jpg";
const Projects = () => {
  return (
    <div id="projects" className="w-full ">
      <div className="max-w-[1240px] mx-auto px-2 py-16">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What i&apos;ve Built </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ProjectItem
            title="Agency Website"
            stack="Next Js Project"
            backgroundImg={agencyImg}
            projectUrl="/property"
          />
          <ProjectItem
            title="Password Generator"
            stack="React Js Project"
            backgroundImg={passwordGenImg}
            projectUrl="/password"
          />
          <ProjectItem
            title="WhatsApp Automation Platform"
            stack="Next Js Project"
            backgroundImg={CendriftImg}
            projectUrl="/cendrift"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
