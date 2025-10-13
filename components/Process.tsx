import React from 'react';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
    return (
        <section id="process" className="py-20 md:py-40 bg-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-6xl md:text-8xl font-black font-['Reddit_Sans_Condensed'] uppercase tracking-tighter leading-none mb-12">
                    {'What my perfect collab looks like'.split(' ').map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden">
                            <motion.span
                                className="inline-block"
                                initial={{ y: '100%' }}
                                whileInView={{ y: '0%' }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.05 }}
                            >
                                {word}{' '}
                            </motion.span>
                        </span>
                    ))}
                </h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <img
                        src="https://framerusercontent.com/images/tXJpZd4d50hazNDi8i7xjNErxbU.png"
                        alt="Process diagram"
                        className="w-full h-auto"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Process;
