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
    const [firstName, lastName] = text.split(' ');

    const graffitiS = 'https://framerusercontent.com/images/xRYXNkQs0bYxhH3KIB5zB38uZRc.png';
    const graffitiD = 'https://framerusercontent.com/images/uIaN9OqMe04pv18mkHBrSus3C0.png';

    const otherImageUrls = [
        'https://framerusercontent.com/images/epYmEFUkGf5RAdraSFF73cFeg.png',
        'https://framerusercontent.com/images/3QcsA8TTMQXfdzHVxQGhRs9XeUM.png',
        'https://framerusercontent.com/images/rAx5p19XPwQrmLQaEWqjUnrNsG0.png',
        'https://framerusercontent.com/images/afh8DWz3dwODa0l2jxClrH96As.png',
        'https://framerusercontent.com/images/V4DUk7cvcCqHYJwM5pZ1k6zI7W4.png',
    ];

    const getImageUrl = (char: string, index: number, word: string) => {
        if (word === firstName) {
            if (char === 'S' && index === 0) return graffitiS;
            if (char === 'S' && index === firstName.length - 1) return graffitiS;
        }
        if (word === lastName) {
            if (char === 'D' && index === 0) return graffitiD;
        }
        return otherImageUrls[(char.charCodeAt(0) + index) % otherImageUrls.length];
    }

    const renderWord = (word: string) => (
        <h1 className="font-black text-[18vw] md:text-[14vw] lg:text-[12vw] xl:text-[200px] leading-[0.9] tracking-tighter uppercase text-center font-['Reddit_Sans_Condensed'] text-black select-none">
            {word.split('').map((char, index) => 
                <Letter 
                    key={`${word}-${index}`} 
                    char={char} 
                    imgUrl={getImageUrl(char, index, word)}
                    isEasterEgg={word === firstName && char === 'R'} 
                />
            )}
        </h1>
    );

    return (
        <div>
            {renderWord(firstName)}
            {renderWord(lastName)}
        </div>
    );
};


const Hero: React.FC = () => {
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

    // SVG data URL for a subtle grain texture
    const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-end items-center relative text-center px-4 pb-20 overflow-hidden bg-white">
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="w-full h-full"
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 1.8, ease: [0.2, 0.67, 0.42, 0.96] }}
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at -10% -10%, rgba(255, 230, 100, 0.8) 0%, transparent 35%),
                            repeating-conic-gradient(from 45deg at -10% -10%, #FFD700 0deg 7.2deg, transparent 9deg 27deg)
                        `,
                         backgroundBlendMode: 'multiply',
                    }}
                />
                <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.15]"
                    style={{
                        backgroundImage: grainTexture,
                        backgroundSize: '300px 300px',
                    }}
                />
            </div>
            
            <div className="z-10 relative flex flex-col items-center">
                 <motion.div
                    className="mb-8 text-black/50 text-xl md:text-2xl font-['Inter_Display'] text-left max-w-md"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p variants={itemVariants}>Howdy! Meet your trusted design partner,</motion.p>
                    <motion.p variants={itemVariants}>crafting strong brands for AI, SaaS, and Emerging Tech.</motion.p>
                </motion.div>

                <AnimatedText text="SHREYAS DEB" />

            </div>
            
            <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/50 font-['Inter_Display']"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <p>Scroll down</p>
            </motion.div>
        </section>
    );
};

export default Hero;