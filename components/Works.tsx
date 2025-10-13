import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  width: string;
  top: string;
  left: string;
  transformRange: [number, number];
}

const projects: Project[] = [
    { id: 'p1', title: 'Cerebro', description: 'AI-powered focus and burnout tracker', imageUrl: '/assets/work/cerebro.png', width: '56%', top: '5%', left: '70%', transformRange: [0, 0.15] },
    { id: 'p2', title: 'BetterMaps', description: 'Optimized Google Maps', imageUrl: '/assets/work/bettermaps.png', width: '32%', top: '25%', left: '19%', transformRange: [0.1, 0.3] },
    { id: 'p3', title: 'Abdominal Organ Segmentation', description: 'Machine Learning on medical datset using MONAI', imageUrl: '/assets/work/AOS.png', width: '32%', top: '35%', left: '79%', transformRange: [0.2, 0.4] },
    { id: 'p4', title: 'Marketting Analytics', description: 'Trends, Graphs, Charts', imageUrl: '/assets/work/market_analytics.png', width: '55%', top: '50%', left: '28%', transformRange: [0.35, 0.55] },
    { id: 'p5', title: 'DBMS.AI', description: 'Chatbot for DBMS', imageUrl: '/assets/work/dbms-ai.png', width: '55%', top: '65%', left: '78%', transformRange: [0.5, 0.7] },
    { id: 'p6', title: 'AlgoViz', description: 'DSA Algorithm Visualizer', imageUrl: '/assets/work/dsa.png', width: '32%', top: '80%', left: '23%', transformRange: [0.65, 0.85] },
];

const ProjectCard: React.FC<{ project: Project; scrollYProgress: any }> = ({ project, scrollYProgress }) => {
    const y = useTransform(scrollYProgress, project.transformRange, ['100px', '-100px']);
    const opacity = useTransform(scrollYProgress, [project.transformRange[0] - 0.05, project.transformRange[0], project.transformRange[1], project.transformRange[1] + 0.05], [0, 1, 1, 0]);

    // Calculate the random rotation only ONCE and store it.
    const randomRotation = useMemo(() => Math.random() * 4 - 2, []);

    return (
        <motion.div
            style={{ 
                position: 'absolute', 
                width: project.width, 
                top: project.top, 
                left: project.left,
                translateX: '-50%',
                y,
                opacity
            }}
            className="group"
        >
            <div className="relative transform-gpu transition-transform duration-500 ease-out group-hover:scale-105">
                <motion.div 
                    className="shadow-2xl rounded-2xl md:rounded-3xl p-1 bg-white border-4 border-white"
                    // Use the stored random value instead of calculating it here
                    style={{ rotate: randomRotation }}
                >
                    <img src={project.imageUrl} alt={project.title} className="w-full h-auto rounded-xl md:rounded-2xl" />
                </motion.div>
                <div className="mt-4">
                    <h3 className="text-xl md:text-3xl font-medium font-['Inter_Display']">{project.title}</h3>
                    <p className="text-base md:text-lg text-black/50 font-['Inter_Display']">{project.description}</p>
                </div>
            </div>
        </motion.div>
    );
};


const Works: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <section id="works" className="content-section">
            <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                <h2 className="font-black text-6xl md:text-8xl tracking-tighter uppercase font-['Reddit_Sans_Condensed']">
                    My latest work
                </h2>
                <p className="font-['Caveat'] text-2xl md:text-3xl text-black/40 transform rotate-2 inline-block -mt-2">from 2020 'til today</p>
            </div>
            <div ref={containerRef} className="relative h-[300vh] md:h-[400vh]">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <div className="relative w-full h-full max-w-6xl mx-auto">
                        {projects.map(project => (
                            <ProjectCard key={project.id} project={project} scrollYProgress={scrollYProgress} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Works;