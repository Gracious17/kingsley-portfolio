// BACKUP: Original Navbar component - renamed to avoid conflicts
// This is your original navbar component, kept as backup
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import ThemeToggle from './darkModeToggle/ThemeToggle'
const navLinks = [
  { href: "/", label: "Home", anchor: false },
  { href: "/#about", label: "About", anchor: true },
  { href: "/#projects", label: "Projects", anchor: true },
  { href: "/#skills", label: "Skills", anchor: true },
  { href: "/#contact", label: "Contact", anchor: true },
];

const socialLinks = [
  { 
    href: "https://www.linkedin.com/in/kingsley-okon-a19932230/", 
    label: "LinkedIn", 
    icon: <FaLinkedinIn /> 
  },
  { 
    href: "https://github.com/Kingsley-Opara", 
    label: "GitHub", 
    icon: <FaGithub /> 
  },
  { 
    href: "mailto:kingsleyopara59@gmail.com", 
    label: "Email", 
    icon: <AiOutlineMail /> 
  },
  { 
    href: "tel:+2348149793913", 
    label: "Phone", 
    icon: <BsFillPersonLinesFill /> 
  }
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
      className={
        `${shadow
          ? "fixed w-full h-20 shadow-xl z-[100] backdrop-blur-md"
          : "fixed w-full h-20 z-[100]"
          }  ${navBg==='transparent'?'bg-transparent':'bg-[#1a0b2e]/90 dark:bg-[#1a0b2e]/90'}  transition-all duration-300`}
    >
      <div className="flex justify-between items-center w-full h-full px-4 md:px-8 2xl:px-16 max-w-7xl mx-auto">
        <Link href="/" aria-label="Home" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a362ff] rounded-md">
          <div className="flex items-center">
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              width={40}
              height={44}
              className="w-10 h-auto hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>
        {/* Right section: Theme toggle and nav links */}
        <div className="flex items-center gap-6">
          <nav
            className="text-white"
            aria-label="Main navigation"
          >
            <ul className="hidden md:flex items-center gap-2">
              {navLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={e => handleSmoothScroll(e, href)}
                    tabIndex={0}
                    aria-current={href === pathname ? "page" : undefined}
                    className={`px-4 py-2 rounded-md text-base font-medium hover:text-[#a362ff] hover:bg-white/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a362ff] ${
                      (href === pathname || (href.startsWith("/#") && pathname === "/" && typeof window !== 'undefined' && window.location.hash === href.replace('/', '')))
                        ? 'text-[#a362ff] bg-white/10' : 'text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <ThemeToggle />
          
          <button
            onClick={handleSideMenu}
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={openMenu}
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>
      </div>
      {/* Mobile menu overlay */}
      <div
        className={
          openMenu
            ? `md:hidden fixed left-0 top-0 w-full h-screen bg-black/80 backdrop-blur-sm z-[200] transition-opacity duration-300`
            : `md:hidden fixed left-0 top-0 w-full h-screen bg-transparent pointer-events-none z-[200] transition-opacity duration-300`
        }
        tabIndex={-1}
        aria-hidden={!openMenu}
        onClick={handleSideMenu}
      >
        <aside
          ref={menuRef}
          id="mobile-menu"
          className={
            openMenu
              ? `fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen p-6 ease-in duration-300 bg-[#1a0b2e]/95 backdrop-blur-md text-white z-[201] focus:outline-none overflow-y-auto`
              : `fixed left-[-100%] top-0 p-6 ease-in duration-300 h-screen bg-[#1a0b2e]/95`
          }
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full items-center justify-between mb-8">
            <Link href="/" aria-label="Home" onClick={() => setOpenMenu(false)} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a362ff] rounded-md">
              <Image
                src="/assets/logo.svg"
                alt="Logo"
                width={40}
                height={44}
                className="w-10 h-auto"
              />
            </Link>
            <button
              onClick={handleSideMenu}
              className="rounded-full bg-white/10 hover:bg-white/20 p-2 cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a362ff]"
              aria-label="Close menu"
            >
              <AiOutlineClose size={20} className="text-white" />
            </button>
          </div>
          <div className="border-b border-white/20 my-4">
            <p className="w-full py-4 text-[#ccd6f6] font-medium">
              Let&apos;s build something legendary together
            </p>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="space-y-1">
              {navLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={e => { handleSmoothScroll(e, href); setOpenMenu(false); }}
                    tabIndex={openMenu ? 0 : -1}
                    aria-current={href === pathname ? "page" : undefined}
                    className={`block py-3 px-4 rounded-md text-base font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a362ff] ${
                      (href === pathname || (href.startsWith("/#") && pathname === "/" && typeof window !== 'undefined' && window.location.hash === href.replace('/', '')))
                        ? 'text-[#a362ff] bg-white/10' : 'text-white hover:text-[#a362ff] hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-12 mt-auto">
              <p className="tracking-wider text-[#a362ff] font-medium text-sm mb-4">
                Let&apos;s Connect
              </p>
              <div className="flex items-center gap-4 my-4">
                {socialLinks.map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? "_blank" : undefined}
                    rel={href.startsWith('http') ? "noreferrer" : undefined}
                    aria-label={label}
                    className="rounded-full bg-white/10 hover:bg-white/20 p-3 cursor-pointer hover:scale-110 transition-all duration-300 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a362ff]"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Navbar;
