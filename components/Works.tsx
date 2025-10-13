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
}

const projects: Project[] = [
  { id: 'p1', title: 'Cerebro', description: 'AI-powered focus and burnout tracker', imageUrl: '/assets/work/cerebro.png', width: '55%', top: '-5%', left: '45%' },
  { id: 'p2', title: 'BetterMaps', description: 'Optimized Google Maps', imageUrl: '/assets/work/bettermaps.png', width: '45%', top: '30%', left: '-5%' },
  { id: 'p3', title: 'Abdominal Organ Segmentation', description: 'Machine Learning on medical dataset using MONAI', imageUrl: '/assets/work/AOS.png', width: '50%', top: '45%', left: '55%' },
  { id: 'p4', title: 'Marketing Analytics', description: 'Trends, Graphs, Charts', imageUrl: '/assets/work/market_analytics.png', width: '55%', top: '80%', left: '-6.5%' },
  { id: 'p5', title: 'AlgoViz', description: 'DSA Algorithm Visualizer', imageUrl: '/assets/work/dsa.png', width: '45%', top: '95%', left: '57%' },
  { id: 'p6', title: 'DBMS.AI', description: 'Chatbot for DBMS', imageUrl: '/assets/work/dbms-ai.png', width: '60%', top: '127%', left: '-5%' }, 
];

const Works: React.FC = () => {
  return (
    <section id="works" className="content-section relative min-h-[300vh] py-24 overflow-hidden bg-[#fffbea]">
      <div className="max-w-7xl mx-auto px-4 text-center mb-24">
        <h2 className="font-black text-6xl md:text-8xl tracking-tighter uppercase font-['Reddit_Sans_Condensed']">
          My latest work
        </h2>
        <p className="font-['Caveat'] text-2xl md:text-3xl text-black/40 transform rotate-2 inline-block -mt-2">
          from 2020 'til today
        </p>
      </div>

      <div className="relative w-full max-w-7xl mx-auto h-[150vh]">
        {projects.map((project) => {
          const randomRotation = useMemo(() => Math.random() * 4 - 2, []);
          return (
            <motion.div
              key={project.id}
              style={{
                position: 'absolute',
                width: project.width,
                top: project.top,
                left: project.left,
                rotate: randomRotation,
              }}
              whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="group"
            >
              <div className="shadow-2xl rounded-2xl md:rounded-3xl p-1 bg-white border-4 border-white transition-all">
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
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Works;
