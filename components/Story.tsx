import React from 'react';
import { motion } from 'framer-motion';

const AnimatedWord: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block overflow-hidden">
    <motion.span
      className="inline-block"
      initial={{ y: '100%' }}
      whileInView={{ y: '0%' }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const Story: React.FC = () => {
  return (
    <section id="story" className="py-20 md:py-40 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-6xl md:text-8xl font-black font-['Reddit_Sans_Condensed'] uppercase tracking-tighter leading-none">
          {'I don\'t have dark secrets, only bright ones'.split(' ').map((word, i) => (
            <React.Fragment key={i}>
              <AnimatedWord>{word}</AnimatedWord>{' '}
            </React.Fragment>
          ))}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mt-20">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6 text-black/70 text-lg md:text-xl font-['Inter_Display']"
            >
                <p>
                    Growing up, my journey into design started with pixels and passion. As a teen, retro games and early web sparked my visual storytelling passion, a computer science degree gave me a foundation, and product design showed new creative depths.
                </p>
                <p>
                    Now, I partner up with dynamic founders reinventing tomorrow, from YC startups to enterprises. My mission: to craft unique, intelligent interfaces for AI, SaaS, and emerging tech.
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <video src="https://framerusercontent.com/assets/dr1IAhMSSIk8zw4P6KIvDIM.mp4" loop autoPlay muted playsInline className="w-full rounded-2xl"></video>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;
