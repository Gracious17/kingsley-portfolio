"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import navLogo from "../../public/assets/navLogo.png";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecF0F3");
  const [linkColor, setLinkColor] = useState("#1f2937");
  const pathname = usePathname();
  const handleSideMenu = () => {
    setOpenMenu(!openMenu);
  };
  useEffect(() => {
    if (
      pathname === "/property" ||
      pathname === "/password" ||
      pathname === "/cendrift"
    ) {
      setNavBg("transparent");
      setLinkColor("#ecF0F3");
    } else {
      setNavBg("#ecF0F3");
      setLinkColor("#1f2937");
    }
  }, [pathname]);
  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);
  return (
    <div
      style={{ background: `${navBg}` }}
      className={
        shadow
          ? "fixed w-full h-20 shadow-xl z-[100] "
          : "fixed w-full h-20  z-[100] "
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <div>
            <h1 className="text-[#5651e5]">
              L<sub>W</sub>
              <sup className="underline ">Techie</sup>
            </h1>
          </div>
        </Link>
        <div style={{ color: `${linkColor}` }}>
          <ul className="hidden md:flex">
            <Link href="/">
              <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
            </Link>
            <Link href="/#about">
              <li className="ml-10 text-sm uppercase hover:border-b">About</li>
            </Link>
            <Link href="/#skills">
              <li className="ml-10 text-sm uppercase hover:border-b">Skills</li>
            </Link>
            <Link href="/#projects">
              <li className="ml-10 text-sm uppercase hover:border-b">
                projects
              </li>
            </Link>
            <Link href="/#contact">
              <li className="ml-10 text-sm uppercase hover:border-b">
                contact
              </li>
            </Link>
          </ul>
          <div onClick={handleSideMenu} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>
      <div
        className={
          openMenu
            ? `md:hidden fixed left-0 top-0 w-full h-screen bg-black/70`
            : ""
        }
      >
        <div
          className={
            openMenu
              ? `fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500`
              : `fixed left-[-100%] top-0  p-10 ease-in duration-500`
          }
        >
          <div className="flex w-full items-center justify-between">
            {/* <Image src={navLogo} alt="/" width="87" height="35" /> */}
            <Link href="/">
              <h1 onClick={() => setOpenMenu(false)} className="text-[#5651e5]">
                L<sub>W</sub>
                <sup className="underline ">Techie</sup>
              </h1>
            </Link>
            <div
              onClick={handleSideMenu}
              className="rounded-full  shadow-lg shadow-gray-400 p-3 cursor-pointer"
            >
              <AiOutlineClose size={25} />
            </div>
          </div>
          <div className="border-b border-gray-300 my-4">
            <p className="w-[85%] md:w-[90%] py-4">
              let's build something legendry together
            </p>
          </div>
          <div className="py-4 flex flex-col ">
            <ul className="uppercase">
              <Link href="/">
                <li onClick={() => setOpenMenu(false)} className="text-sm py-4">
                  Home
                </li>
              </Link>
              <Link href="/#about">
                <li onClick={() => setOpenMenu(false)} className="text-sm py-4">
                  About
                </li>
              </Link>
              <Link href="/#skills">
                <li onClick={() => setOpenMenu(false)} className="text-sm py-4">
                  Skills
                </li>
              </Link>
              <Link href="/#projects">
                <li onClick={() => setOpenMenu(false)} className="text-sm py-4">
                  Projects
                </li>
              </Link>
              <Link href="/#contact">
                <li onClick={() => setOpenMenu(false)} className="text-sm py-4">
                  Contacts
                </li>
              </Link>
            </ul>
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[#5651e5]">
                Let's Connect
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <div className=" rounded-full shadow-lg shadow-gray-400 p-3 hover:scale-105 ease-in duration-300 cursor-pointer">
                  <FaLinkedin size={30} />
                </div>
                <div className=" rounded-full shadow-lg shadow-gray-400 p-3 hover:scale-105 ease-in duration-300 cursor-pointer">
                  <FaGithub size={30} />
                </div>
                <div className=" rounded-full shadow-lg shadow-gray-400 p-3 hover:scale-105 ease-in duration-300 cursor-pointer">
                  <AiOutlineMail size={30} />
                </div>
                <div className=" rounded-full shadow-lg shadow-gray-400 p-3 hover:scale-105 ease-in duration-300 cursor-pointer">
                  <BsFillPersonLinesFill size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
