import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="w-full py-6 flex flex-col items-center justify-center border-t border-[#5651e5]/40 bg-white dark:bg-black dark:text-white shadow-lg shadow-gray-200 dark:shadow-gray-900">
      <div className="flex items-center gap-4 mb-2">
        <a
          href="https://www.linkedin.com/in/gracious-kingsley"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-[#5651e5] transition-colors"
        >
          <FaLinkedin size={22} />
        </a>
        <a
          href="https://github.com/Gracious17"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-[#5651e5] transition-colors"
        >
          <FaGithub size={22} />
        </a>
        <a
          href="mailto:kingsleygracious16@gmail.com"
          aria-label="Email"
          className="hover:text-[#5651e5] transition-colors"
        >
          <FaEnvelope size={22} />
        </a>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
        &copy; {new Date().getFullYear()} Kingsley Gracious. All rights reserved.
      </p>
      <a
        href="mailto:kingsleygracious16@gmail.com"
        className="text-xs text-[#5651e5] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5651e5]"
      >
        kingsleygracious16@gmail.com
      </a>
    </footer>
  );
}

export default Footer