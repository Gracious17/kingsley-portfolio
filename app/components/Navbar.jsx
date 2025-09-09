"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import ThemeToggle from './darkModeToggle/ThemeToggle'
const navLinks = [
  { href: "/", label: "Home", anchor: false },
  { href: "/#about", label: "About", anchor: true },
  { href: "/#skills", label: "Skills", anchor: true },
  { href: "/#projects", label: "Projects", anchor: true },
  { href: "/#contact", label: "Contact", anchor: true },
];

const socialLinks = [
  { href: "https://linkedin.com/in/yourprofile", icon: <FaLinkedin size={30} />, label: "LinkedIn" },
  { href: "https://github.com/yourprofile", icon: <FaGithub size={30} />, label: "GitHub" },
  { href: "mailto:kingsleygracious16@gmail.com", icon: <AiOutlineMail size={30} />, label: "Email" },
  { href: "/resume.pdf", icon: <BsFillPersonLinesFill size={30} />, label: "Resume" },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecF0F3");
  const [linkColor, setLinkColor] = useState("#1f2937");
  const pathname = usePathname();
  const menuRef = useRef(null);

  // Toggle mobile menu
  const handleSideMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    if (!openMenu) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openMenu]);

  // Trap focus in mobile menu
  useEffect(() => {
    if (!openMenu || !menuRef.current) return;
    const focusableEls = menuRef.current.querySelectorAll(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableEls.length) focusableEls[0].focus();
  }, [openMenu]);

  // Nav background and link color based on route
  useEffect(() => {
    if (["/agency", "/password", "/cendrift", "/hotelBooking"].includes(pathname)) {
      setNavBg("transparent");
      setLinkColor("#ecF0F3");
    } else {
      setNavBg("#ecF0F3");
      setLinkColor("#1f2937");
    }
  }, [pathname]);

  // Shadow on scroll
  useEffect(() => {
    const handleShadow = () => {
      setShadow(window.scrollY >= 90);
    };
    window.addEventListener("scroll", handleShadow);
    return () => window.removeEventListener("scroll", handleShadow);
  }, []);

  // Smooth scroll for anchor links
  const handleSmoothScroll = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.split("#")[1];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setOpenMenu(false);
      }
    }
  };

  return (
    <div
      // style={{ background: `${navBg}` }}
      className={
        `${shadow
          ? "fixed w-full h-20 shadow-xl z-[100] "
          : "fixed w-full h-20  z-[100] "
      
          }  ${navBg==='transparent'?'bg-transparent':'bg-white dark:bg-black'}  `}
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 ">
        <Link href="/" aria-label="Home" className="focus:outline-none">
          <div>
            <h1 className="text-[#5651e5] font-bold text-2xl tracking-tight">
              G<sub>r</sub>
              <sup className="underline ">acious</sup>
            </h1>
          </div>
        </Link>
        {/* Right section: Theme toggle and nav/social icons */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <nav
            className={`${navBg==='transparent'? 'text-[#ecF0F3]':'text-[#1f2937] dark:text-white'}`}  
            aria-label="Main navigation"
          >
            <ul className="hidden md:flex items-center">
              {navLinks.map(({ href, label }) => (
                <li key={label} className={`ml-8 text-sm uppercase hover:border-b transition-colors duration-200 ${
                  (href === pathname || (href.startsWith("/#") && pathname === "/" && typeof window !== 'undefined' && window.location.hash === href.replace('/', '')))
                    ? 'border-b-2 border-[#5651e5] font-semibold' : ''
                }`}>
                  <Link
                    href={href}
                    onClick={e => handleSmoothScroll(e, href)}
                    tabIndex={0}
                    aria-current={href === pathname ? "page" : undefined}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {/* Social icons on desktop nav */}
              {socialLinks.map(({ href, icon, label }) => (
                <li key={label} className="ml-4">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex items-center justify-center rounded-full shadow-md shadow-gray-300 dark:shadow-gray-800 p-2 hover:scale-110 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
                    style={{ minWidth: 36, minHeight: 36 }}
                  >
                    {React.cloneElement(icon, { size: 22 })}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSideMenu}
              className="md:hidden dark:text-white"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={openMenu}
            >
              <AiOutlineMenu size={25} />
            </button>
          </nav>
        </div>
      </div>
      {/* Mobile menu overlay */}
      <div
        className={
          openMenu
            ? `md:hidden fixed left-0 top-0 w-full h-screen bg-black/60 backdrop-blur-sm z-[200] transition-opacity duration-300`
            : ""
        }
        tabIndex={-1}
        aria-hidden={!openMenu}
      >
        <aside
          ref={menuRef}
          id="mobile-menu"
          className={
            openMenu
              ? `fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen  p-10 ease-in duration-500 dark:bg-black dark:text-white z-[201] focus:outline-none`
              : `fixed left-[-100%] top-0  p-10 ease-in duration-500`
          }
          role="dialog"
          aria-modal="true"
        >
          <div className="flex w-full items-center justify-between">
            <Link href="/" aria-label="Home" onClick={() => setOpenMenu(false)}>
              <h1 className="text-[#5651e5] font-bold text-2xl tracking-tight">
                G<sub>r</sub>
                <sup className="underline ">acious</sup>
              </h1>
            </Link>
            <button
              onClick={handleSideMenu}
              className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer focus:outline-none "
              aria-label="Close menu"
            >
              <AiOutlineClose size={25} />
            </button>
          </div>
          <div className="border-b border-gray-300 my-4">
            <p className="w-[85%] md:w-[90%] py-4">
              Let&apos;s build something legendary together
            </p>
          </div>
          <div className="py-4 flex flex-col ">
            <ul className="uppercase">
              {navLinks.map(({ href, label }) => (
                <li key={label} className="text-sm py-4">
                  <Link
                    href={href}
                    onClick={e => { handleSmoothScroll(e, href); setOpenMenu(false); }}
                    tabIndex={openMenu ? 0 : -1}
                    aria-current={href === pathname ? "page" : undefined}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
           
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Navbar;
