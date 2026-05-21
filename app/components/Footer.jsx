import React from 'react'
import InstagramIcon from './icons/InstagramIcon';
import DribbbleIcon from './icons/DribbbleIcon';
import GitHubIcon from './icons/GitHubIcon';

const Footer = () => {
  return (
    <footer className="w-full py-12 flex flex-col items-center justify-center border-t border-white/5 bg-transparent text-white">
      <a
        href="mailto:kingsleygracious16@gmail.com"
        className="text-sm text-white/40 hover:text-white transition-colors tracking-widest uppercase geist-font"
      >
        kingsleygracious16@gmail.com
      </a>
      <p className="mt-4 text-[10px] text-white/20 uppercase tracking-[0.3em] inter-font">
        © {new Date().getFullYear()} Gracious Kingsley • All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer