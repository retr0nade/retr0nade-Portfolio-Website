import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SunIcon: React.FC = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 7.081 18.931 C 15.273 19.853 19.843 13.955 17.88 10.023 C 12.609 -0.53 -1.763 19.87 11.928 17.902 M 2.754 12.66 L 2.737 12.66 C 2.555 12.66 1.857 12.66 1.034 12.727 M 4.545 18.931 C 4.162 19.13 2.673 20.281 2.346 20.5 M 11.503 22 L 11.212 23 M 14.294 1.224 C 14.053 2.28 13.894 3.229 13.894 3.486 M 18.545 6.727 C 18.744 6.529 21.062 4.617 22.648 3.486 M 21.379 11.313 C 21.379 11.313 21.952 11.202 22.648 11.105 M 18.545 17.902 C 19.272 18.273 20.483 19.363 20.996 20.009 M 2.09 2.091 C 4.908 3.486 6.727 5.545 7.454 6.909" fill="transparent" strokeWidth="1.64" stroke="rgba(255, 255, 255, 0.65)" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);


const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-lg text-white/60 hover:text-white transition-colors duration-300 font-medium font-['Inter_Display']">
    {children}
  </a>
);

const Header: React.FC = () => {
    return (
        <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-center"
        >
            <div className="bg-black/75 backdrop-blur-sm rounded-full flex items-center justify-between px-3 py-2 w-full max-w-lg">
                <a href="#hero" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <SunIcon />
                </a>
                <nav className="flex items-center space-x-6">
                    <NavLink href="#works">Work</NavLink>
                    <NavLink href="#story">Story</NavLink>
                    <NavLink href="#process">Process</NavLink>
                    <NavLink href="#connect">Connect</NavLink>
                </nav>
                 <a href="mailto:hello@shreyasdeb.space" className="px-4 py-2 text-lg font-medium bg-yellow-400/15 text-yellow-400 rounded-full hover:bg-yellow-400/25 transition-colors duration-300">
                    Start project
                </a>
            </div>
        </motion.header>
    );
};

export default Header;