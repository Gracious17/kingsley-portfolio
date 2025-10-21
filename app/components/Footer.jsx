import React from 'react'
import InstagramIcon from './icons/InstagramIcon';
import DribbbleIcon from './icons/DribbbleIcon';
import GitHubIcon from './icons/GitHubIcon';

const Footer = () => {
  return (
    <footer className="w-full py-6 flex flex-col items-center justify-center border-t border-purple-500/20 bg-[#1a0b2e] text-white shadow-lg shadow-purple-900/50">
      <div className="flex items-center gap-6 mb-4">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:scale-110 transition-transform duration-200"
        >
          <InstagramIcon width={18} height={18} color="#ffffff" />
        </a>
        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dribbble"
          className="hover:scale-110 transition-transform duration-200"
        >
          <DribbbleIcon width={18} height={18} color="#ffffff" />
        </a>
        <a
          href="https://github.com/Gracious17"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:scale-110 transition-transform duration-200"
        >
          <GitHubIcon width={18} height={18} color="#ffffff" />
        </a>
      </div>
      <p className="text-sm text-white/80 mb-2">
        I&apos;m currently looking to join a cross-functional team that values improving people&apos;s lives
      </p>
      <p className="text-sm text-white/80 mb-2">
        through accessible design. or have a project in mind? Let&apos;s connect.
      </p>
      <a
        href="mailto:kingsleygracious16@gmail.com"
        className="text-sm text-white/90 hover:text-[#a362ff] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a362ff] transition-colors"
      >
        kingsleygracious16@gmail.com
      </a>
    </footer>
  );
}

export default Footer