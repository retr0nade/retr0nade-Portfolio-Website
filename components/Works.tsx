import React, { useRef } from 'react';
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
    { id: 'p1', title: 'Cerebro', description: 'AI-powered focus and burnout tracker', imageUrl: 'https://framerusercontent.com/images/rswgGpiYFoEy9fVZhbxz01GZqW8.png', width: '56%', top: '5%', left: '70%', transformRange: [0, 0.15] },
    { id: 'p2', title: 'Humble.AI', description: 'Sentiment-aware chatbot', imageUrl: 'https://framerusercontent.com/images/xOAD945vNzB4ZNxwOOlGFoBoI.png', width: '32%', top: '25%', left: '19%', transformRange: [0.1, 0.3] },
    { id: 'p3', title: 'DBMS.AI', description: 'Natural-language to SQL system', imageUrl: 'https://framerusercontent.com/images/F4OUDL5iGqjO9FJhsW24INIBb1I.png', width: '32%', top: '35%', left: '79%', transformRange: [0.2, 0.4] },
    { id: 'p4', title: 'Visionary OS', description: 'Next-gen operating system concept', imageUrl: 'https://framerusercontent.com/images/NhKxPMQ81nEv4q4pclRzztFygM.png', width: '55%', top: '50%', left: '28%', transformRange: [0.35, 0.55] },
    { id: 'p5', title: 'QuantumLeap', description: 'Data visualization for quantum computing', imageUrl: 'https://framerusercontent.com/images/uDK4SqDaezrDJLHUNMP6J6YsG0.png', width: '55%', top: '65%', left: '78%', transformRange: [0.5, 0.7] },
    { id: 'p6', title: 'NeuralNet', description: 'Visualizing neural network architectures', imageUrl: 'https://framerusercontent.com/images/y21PZDf5cJJ7M7LY1kjt9GpfR4.png', width: '32%', top: '80%', left: '23%', transformRange: [0.65, 0.85] },
];

const ProjectCard: React.FC<{ project: Project; scrollYProgress: any }> = ({ project, scrollYProgress }) => {
    const y = useTransform(scrollYProgress, project.transformRange, ['100px', '-100px']);
    const opacity = useTransform(scrollYProgress, [project.transformRange[0] - 0.05, project.transformRange[0], project.transformRange[1], project.transformRange[1] + 0.05], [0, 1, 1, 0]);

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
                    style={{ rotate: Math.random() * 4 - 2 }}
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
<<<<<<< HEAD
        <section id="works" className="content-section">
=======
        <section id="works" className="py-20 md:py-32">
>>>>>>> 82e8c5055700b777050e6a5e8e29eff3788563ad
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
