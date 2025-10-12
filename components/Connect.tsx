import React from 'react';
import { motion } from 'framer-motion';

const ConnectButton: React.FC = () => {
    return (
        <motion.a
            href="mailto:hello@shreyasdeb.space"
            className="relative block w-full max-w-xl mx-auto aspect-[726/308] group"
            whileHover="hover"
            whileTap="tap"
            initial="rest"
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-400 rounded-[128px] shadow-[0px_6px_6px_0px_#B8B8B8,inset_0px_-8px_1px_0px_#FFFFFF,inset_0px_-7px_3px_0px_#CFCFCF] transform rotate-[4deg]"
                variants={{ rest: { rotate: 4 }, hover: { rotate: 2 }, tap: { rotate: 4 } }}
            />
            <motion.div
                className="absolute inset-[10px_22px_32px] bg-black rounded-[110px] shadow-[0px_3px_0px_4px_#000000,0px_14px_8px_0px_rgba(0,0,0,0.2),0px_19px_8px_0px_rgba(0,0,0,0.3),0px_64px_128px_0px_rgba(0,0,0,0.25)]"
                variants={{ rest: { y: 0 }, hover: { y: -5 }, tap: { y: 10 } }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <div className="absolute inset-0 bg-[#1F1F1F] rounded-[110px] shadow-[inset_0px_-3px_16px_0px_rgba(255,222,10,0)]" />
                <div className="absolute inset-[0_0_15px] bg-gradient-to-b from-[#424242] to-[#2B2B2B] rounded-[110px] shadow-[inset_0px_-3px_1px_0px_rgba(255,255,255,0.1),inset_0px_12px_6px_0px_rgba(0,0,0,0.1)]">
                    <motion.p
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-medium font-['Inter'] tracking-tighter"
                        style={{
                            backgroundImage: 'linear-gradient(0deg, rgba(255, 255, 255, 0.8) 0%, rgb(255, 255, 255) 100%)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Connect
                    </motion.p>
                </div>
            </motion.div>

            <motion.div
                className="absolute w-[165px] h-[102px] top-[87.4%] left-[76.3%] -translate-x-1/2 -translate-y-1/2 rounded-[562%/909%] blur-3xl"
                style={{ background: 'linear-gradient(270deg, rgba(254, 238, 134, 0.5) 3%, rgba(255, 213, 0, 0.89) 51%, rgb(255, 217, 0) 73%, rgba(255, 239, 133, 0.5) 93%)' }}
                variants={{
                    rest: { opacity: 0, scale: 0.5, rotate: 4 },
                    hover: { opacity: 1, scale: 1.5, rotate: 10, transition: { duration: 0.3 } },
                    tap: { opacity: 0.5, scale: 1, rotate: 2 }
                }}
            />
            <motion.div
                className="absolute w-[58px] h-[33px] top-[5.5%] left-[41%] -translate-x-1/2 -translate-y-1/2 rounded-[1600%/2812%] blur-3xl"
                style={{ background: 'linear-gradient(270deg, rgba(254, 238, 134, 0.5) 3%, rgb(255, 217, 0) 46.8%, rgba(255, 239, 133, 0.5) 93%)' }}
                variants={{
                    rest: { opacity: 0, scale: 0.5, rotate: 4 },
                    hover: { opacity: 1, scale: 2, rotate: -10, transition: { duration: 0.3 } },
                    tap: { opacity: 0.5, scale: 1, rotate: 0 }
                }}
            />
        </motion.a>
    );
};

const Connect: React.FC = () => {
    return (
        <section id="connect" className="py-20 md:py-40 min-h-screen flex flex-col justify-center items-center">
            <div className="text-center w-full max-w-6xl mx-auto px-6">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-['Caveat'] text-2xl md:text-3xl text-black/40 transform -rotate-3 mb-8"
                >
                    Tap this 'tiny' button to highlight your product =)
                </motion.p>
                <div className="w-full">
                    <ConnectButton />
                </div>
            </div>
        </section>
    );
};

export default Connect;