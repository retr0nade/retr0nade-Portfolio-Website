import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  width: string;
  top: string;
  left: string;
  link: string;
}

const projects: Project[] = [
  { id: 'p1', title: 'Cerebro', description: 'AI-powered focus and burnout tracker', imageUrl: '/assets/work/cerebro.png', width: '55%', top: '-5%', left: '45%', link: 'https://github.com/retr0nade/CereBro-Digital-Burnout-Tracker'},
  { id: 'p2', title: 'BetterMaps', description: 'Optimized Google Maps', imageUrl: '/assets/work/bettermaps.png', width: '45%', top: '30%', left: '-5%' , link: 'https://github.com/retr0nade/better-maps'},
  { id: 'p3', title: 'Abdominal Organ Segmentation', description: 'Machine Learning on medical dataset using MONAI', imageUrl: '/assets/work/AOS.png', width: '50%', top: '45%', left: '55%' , link: 'https://github.com/retr0nade/Abdominal-Organ-Segmentation-Using-MONAI'},
  { id: 'p4', title: 'Marketing Analytics', description: 'Trends, Graphs, Charts', imageUrl: '/assets/work/market_analytics.png', width: '55%', top: '80%', left: '-6.5%', link: 'https://admybrand-analytics-dashboard-iota.vercel.app/dashboard'},
  { id: 'p5', title: 'AlgoViz', description: 'DSA Algorithm Visualizer', imageUrl: '/assets/work/dsa.png', width: '45%', top: '95%', left: '57%', link: 'https://github.com/retr0nade/DSA-Algorithm-Visualizer'},
  { id: 'p6', title: 'DBMS.AI', description: 'Chatbot for DBMS', imageUrl: '/assets/work/dbms-ai.png', width: '60%', top: '127%', left: '-5%', link: 'https://github.com/retr0nade/DBMS-Chatbot'}, 
];

const Works: React.FC = () => {
  return (
    <section id="works" className="content-section relative min-h-[330vh] py-24 overflow-hidden bg-[#fffbea]">
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-24">
        <h2 className="font-black text-6xl md:text-8xl tracking-tighter uppercase font-['Reddit_Sans_Condensed']">
          My latest work
        </h2>
        <p className="font-['Caveat'] text-2xl md:text-3xl text-black/40 transform rotate-2 inline-block -mt-2">
          from 2020 'til today
        </p>
      </div>

      {/* Floating Projects */}
      <div className="relative w-full max-w-7xl mx-auto h-[150vh]">
        {projects.map((project) => {
          const randomRotation = useMemo(() => Math.random() * 4 - 2, []);
          return (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                width: project.width,
                top: project.top,
                left: project.left,
                rotate: randomRotation,
              }}
              whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="group block"
            >
              <div className="shadow-2xl rounded-2xl md:rounded-3xl p-1 bg-white border-4 border-white transition-all cursor-pointer">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto rounded-xl md:rounded-2xl"
                />
              </div>
              <div className="mt-4 text-left">
                <h3 className="text-xl md:text-2xl font-semibold font-['Inter_Display'] flex items-center gap-2">
                  {project.title}
                  <span className="opacity-50 group-hover:translate-x-1 transition-transform">→</span>
                </h3>
                <p className="text-base md:text-lg text-black/50 font-['Inter_Display']">
                  {project.description}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Turtle Illustration + Text */}
      <div className="flex flex-col items-center justify-center mt-[100vh] md:mt-[120vh] space-y-6">
        <img
          src="/assets/work/turtle.png"
          alt="Turtle Cooking Projects"
          className="w-40 h-40 opacity-90 drop-shadow-lg"
        />
        <p className="text-2xl md:text-3xl font-['Inter_Display'] text-black/60 text-center leading-snug">
          COOKING MORE PROJECTS <br />
          <span className="text-black font-semibold">SLOWLY BUT SURELY 😏</span>
        </p>
      </div>
    </section>
  );
};

export default Works;
