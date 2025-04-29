import React from "react";
import agencyImg from "../../public/assets/projects/agency.jpg";
import ProjectItem from "./ProjectItem";
import passwordGenImg from "../../public/assets/projects/password-gen.png";
import CendriftImg from "../../public/assets/projects/cendrift.jpg";
import HotelImg from "@/public/hotel-booking.png"
import Link from "next/link";

 const projects=[
  {
    id:1,
    title:"Agency Website",
    stack:"Next Js Project",
    backgroundImg:agencyImg,
    projectUrl:"/agency"

 },
 {
  id:2,
  title:"Password Generator",
  stack:"React Js Project",
  backgroundImg:passwordGenImg,
  projectUrl:"/password"

},
{
  id:3,
  title:"WhatsApp Automation Platform",
  stack:"Next Js Project",
  backgroundImg:CendriftImg,
  projectUrl:"/cendrift"

},
{
  id:4,
  title:"Hospitality Management App",
  stack:"Next Js Project",
  backgroundImg:HotelImg,
  projectUrl:"/hotelBooking"

},
 
]
const Projects = () => {
  return (
    <div id="projects" className="w-full ">
      <div className="max-w-[1240px] mx-auto px-2 py-16">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What i&apos;ve Built </h2>

        <div className="grid md:grid-cols-2 gap-4">


        {projects.slice(0,4).map((project,index)=>{
          return(
            <div key={index} >
          <ProjectItem
            title={project.title}
            stack={project.stack}
            backgroundImg={project.backgroundImg}
            projectUrl={project.projectUrl}
          />
          {/* <ProjectItem
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
          /> */}
        </div>
          )
        })}
        </div>
        {projects.length > 3 && 
        <div className="w-full items-center text-center justify-center pt-4">
          <Link href="/moreProjects" className="text-[#5651e5] hover:underline cursor-pointer">
          View More Projects
          </Link>
        </div>
        }
      </div>
    </div>
  );
};

export default Projects;
