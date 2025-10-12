import React from 'react';
// FIX: Import Variants from framer-motion to resolve type inference issues with animation properties.
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Letter: React.FC<{ char: string; imgUrl: string; isEasterEgg?: boolean }> = ({ char, imgUrl, isEasterEgg }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.span 
            className="relative inline-block"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {char}
            <AnimatePresence>
                {isHovered && (
                    isEasterEgg ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 20, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotate: -12 }}
                            exit={{ opacity: 0, scale: 0.5, y: -20, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                        >
                            <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl">
                                <span className="text-2xl md:text-4xl font-['Caveat'] font-bold text-yellow-400 whitespace-nowrap">
                                    retr0nade
                                </span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.img
                            src={imgUrl}
                            alt=""
                            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                            animate={{ opacity: 1, scale: 1, rotate: Math.random() * 20 - 10 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            className="absolute w-full h-full object-contain top-0 left-0 pointer-events-none"
                            style={{
                                width: '150%',
                                height: '150%',
                                top: '-25%',
                                left: '-25%',
                            }}
                        />
                    )
                )}
            </AnimatePresence>
        </motion.span>
    );
};


const AnimatedText: React.FC<{ text: string }> = ({ text }) => {
    const letters = text.split('');
    const imageUrls = [
        'https://framerusercontent.com/images/uIaN9OqMe04pv18mkHBrSus3C0.png',
        'https://framerusercontent.com/images/epYmEFUkGf5RAdraSFF73cFeg.png',
        'https://framerusercontent.com/images/3QcsA8TTMQXfdzHVxQGhRs9XeUM.png',
        'https://framerusercontent.com/images/rAx5p19XPwQrmLQaEWqjUnrNsG0.png',
        'https://framerusercontent.com/images/afh8DWz3dwODa0l2jxClrH96As.png',
        'https://framerusercontent.com/images/dXC5qH45pIUuYOr6asR5s01IhM.png',
        'https://framerusercontent.com/images/xRYXNkQs0bYxhH3KIB5zB38uZRc.png',
        'https://framerusercontent.com/images/V4DUk7cvcCqHYJwM5pZ1k6zI7W4.png',
        'https://framerusercontent.com/images/v5w76QJX6Tp5pJ0pVU7wpDuqqtg.png',
        'https://framerusercontent.com/images/uIaN9OqMe04pv18mkHBrSus3C0.png',
    ];

    return (
        <h1 className="font-black text-[18vw] md:text-[14vw] lg:text-[12vw] xl:text-[200px] leading-[0.9] tracking-tighter uppercase text-center font-['Reddit_Sans_Condensed'] text-black select-none">
            {letters.map((char, index) => 
                char === ' ' 
                ? <span key={index}> </span> 
                : <Letter key={index} char={char} imgUrl={imageUrls[index % imageUrls.length]} isEasterEgg={char === 'R'} />
            )}
        </h1>
    );
};


const Hero: React.FC = () => {
    // FIX: Explicitly using the Variants type tells TypeScript that properties like
    // `ease: 'easeOut'` are valid, not just generic strings, resolving the error.
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative text-center px-4 overflow-hidden">
             <motion.div
                className="absolute inset-0 z-0 opacity-30"
                initial={{ y: -200, rotate: -8, opacity: 0 }}
                animate={{ y: -300, rotate: -8, opacity: 0.3 }}
                transition={{ delay: 0.1, duration: 1.8, ease: [0.2, 0.67, 0.42, 0.96] }}
            >
                <img
                    src="https://framerusercontent.com/images/HTKvkUGiTrV9Bi4p3psUUrOY.png"
                    alt="background gradient"
                    className="w-full h-full object-cover mix-blend-soft-light"
                />
            </motion.div>
            
            <div className="z-10 relative flex flex-col items-center">
                <AnimatedText text="SHREYAS DEB" />

                <motion.div
                    className="mt-8 text-black/50 text-xl md:text-2xl font-['Inter_Display']"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p variants={itemVariants}>Top-tier Web and Product Design partner for</motion.p>
                    <motion.p variants={itemVariants}>AI, SaaS, and Emerging Tech.</motion.p>
                </motion.div>
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/50 font-['Inter_Display']">
                <p>Scroll down</p>
            </div>
        </section>
    );
};

export default Hero;