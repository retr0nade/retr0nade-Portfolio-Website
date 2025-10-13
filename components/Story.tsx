import React from 'react';
import { motion } from 'framer-motion';

// --- FIX #2: INDIVIDUAL VERTICAL POSITION ---
// Added a 'yPos' property to each milestone.
// You can now edit this value for each icon individually.
const milestones = [
    { label: 'Python', iconUrl: '/assets/story/python.png', position: '13%', yPos: '-25%' },
    { label: 'C++', iconUrl: '/assets/story/c++.png', position: '29%', yPos: '-25%' },
    { label: 'DBMS', iconUrl: '/assets/story/dbms.png', position: '47%', yPos: '-25%' },
    { label: 'Java', iconUrl: '/assets/story/java.png', position: '68%', yPos: '-25%' },
    { label: 'Go', iconUrl: '/assets/story/go.png', position: '87%', yPos: '-25%' },
];

const Story: React.FC = () => {
    return (
        <section id="story" className="content-section bg-white">
            <div className="max-w-5xl mx-auto px-4">
                
                <motion.p 
                    className="font-['Caveat'] text-2xl md:text-3xl text-black/50 text-center -rotate-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8 }}
                >
                    Every experience in my life is important and has taught me a lot
                </motion.p>

                <motion.div 
                    className="relative mt-40"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    {/* --- FIX #1: TIMELINE ROTATION --- */}
                    {/* Added the 'rotate-1' class to slightly rotate the image clockwise. */}
                    {/* You can change this to 'rotate-2' for more rotation, or '-rotate-1' for the other direction. */}
                    <img src="/assets/story/timeline.png" alt="Timeline from 2020 to now" className="w-full rotate-2" />
                    
                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className="absolute -translate-y-1/2 -translate-x-1/2 text-center"
                            // The 'top' position is now dynamic, coming from the 'yPos' property
                            style={{ left: milestone.position, top: milestone.yPos }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0, 0, 0.2, 1] }}
                            >
                                <div className="bg-white/50 backdrop-blur-sm rounded-full p-2 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center shadow-lg">
                                    <img src={milestone.iconUrl} alt={milestone.label} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                                </div>
                                <p className="mt-2 text-sm md:text-base font-medium font-['Inter_Display'] text-black/60">{milestone.label}</p>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Story;