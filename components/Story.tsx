import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useAnimationFrame } from "framer-motion";
import { RoughNotation } from "react-rough-notation";


const milestones = [
    { label: 'Python', iconUrl: '/assets/story/python.png', position: '18%', yPos: '-25%' },
    { label: 'C++', iconUrl: '/assets/story/c++.png', position: '34%', yPos: '-25%' },
    { label: 'DBMS', iconUrl: '/assets/story/dbms.png', position: '50%', yPos: '-25%' },
    { label: 'Java', iconUrl: '/assets/story/java.png', position: '70%', yPos: '-25%' },
    { label: 'Go', iconUrl: '/assets/story/go.png', position: '87%', yPos: '-25%' },
];

const Polaroid: React.FC<{
  src: string;
  caption: string;
  rotation: string;
  yRange: [string, string];
  scrollProgress: any;
}> = ({ src, caption, rotation, yRange, scrollProgress }) => {
  const y = useTransform(scrollProgress, [0, 1], yRange);

  return (
    <motion.div
      className="absolute bg-white shadow-2xl rounded-md flex flex-col items-center
                 p-4 border border-neutral-300 select-none"
      style={{
        y,
        rotate: rotation,
        width: "300px",
        height: "350px",
      }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <img
        src={src}
        alt={caption}
        className="w-[270px] h-[270px] object-cover rounded-sm shadow-md"
      />

      {/* ✨ Hand-drawn underline / circle on caption */}
      <RoughNotation
        type="underline"
        show
        color="#facc15"                // warm yellow
        padding={5}
        strokeWidth={2}
        animationDelay={500}
        animationDuration={1200}
      >
        <p className="font-['Caveat'] text-center text-lg md:text-xl mt-3 text-black/70 tracking-wide">
          {caption}
        </p>
      </RoughNotation>
    </motion.div>
  );
};


const PolaroidSlideshow: React.FC<{ scrollProgress: any }> = ({ scrollProgress }) => {
  const images = [
    { src: '/assets/story/gaming.png', caption: 'Gaming was life', tilt: -4 },
    { src: '/assets/story/code.png', caption: 'Coding became my passion', tilt: 3 },
    { src: '/assets/story/night.png', caption: 'Night owl coding sessions', tilt: -2 },
    { src: '/assets/story/retro.png', caption: 'Tech fascination', tilt: 1 },
  ];

  const [index, setIndex] = useState(0);

  // Change slide every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait" custom={index}>
        <motion.div
          key={images[index].src}
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ x: 200, opacity: 0 }}     // 🡒 starts off to the right
          animate={{ x: 0, opacity: 1 }}        // 🡒 slides to center
          exit={{ x: -200, opacity: 0 }}        // 🡒 slides out to the left
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Polaroid
            src={images[index].src}
            caption={images[index].caption}
            rotation={`${images[index].tilt}deg`}
            yRange={['0%', '0%']}
            scrollProgress={scrollProgress}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


const Story: React.FC = () => {
    const parallaxRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: parallaxRef,
        offset: ['start end', 'end start']
    });

    return (
        <section id="story" className="content-section bg-white relative min-h-[2300px] overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 relative">

                {/* --- FLOATING QUOTE --- */}
                <motion.p
                    className="font-['Caveat'] text-2xl md:text-3xl text-black/50 text-center absolute"
                    style={{ top: '100px', left: '30%', rotate: '4deg' }}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.8 }}
                >
                    Every experience in my life is <br/>important and has taught me a lot
                </motion.p>

                {/* --- TIMELINE SECTION --- */}
                <motion.div
                    className="absolute"
                    style={{ top: '350px', left: '-25%', width: '140%' }}
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: "easeOut" }}
                >
                    <img src="/assets/story/timeline.png" alt="Timeline" className="w-full rotate-1" />
                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className="absolute -translate-y-1/2 -translate-x-1/2 text-center"
                            style={{ left: milestone.position, top: milestone.yPos }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.1, y: -10 }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0, 0, 0.2, 1] }}
                            >
                                <motion.div whileHover={{ scale: 1.1, y: -10 }}>
                                    <div className="bg-white/50 backdrop-blur-sm rounded-full p-2 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center shadow-lg">
                                        <img src={milestone.iconUrl} alt={milestone.label} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                                    </div>
                                    <p className="mt-2 text-sm md:text-base font-medium font-['Inter_Display'] text-black/60">{milestone.label}</p>
                                </motion.div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                {/* --- HEADING --- */}
                <motion.h2
                    className="text-4xl md:text-8xl font-black font-['Reddit_Sans_Condensed'] uppercase tracking-tighter leading-none absolute"
                    style={{ top: '800px', left: '-19%' }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1 }}
                >
                    No dark secrets,
                </motion.h2>

                <motion.h3
                    className="text-4xl md:text-6xl font-black font-['Reddit_Sans_Condensed'] uppercase tracking-tighter leading-none absolute"
                    style={{ top: '900px', left: '-19%' }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1 }}
                >
                    only late-night ideas that somehow worked.
                </motion.h3>

                {/* --- ABOUT ME TEXT BOX --- */}
                <motion.div
                  className="absolute bg-neutral-100 rounded-3xl shadow-sm p-10"
                  style={{
                    top: '1150px',
                    left: '-20%',
                    width: '70%',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="space-y-6 text-black/70 text-lg md:text-xl font-['Inter_Display']"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <p>
                      Grew up in Bangalore, India. I was exposed to computers at a young age, 
                      and I was instantly hooked. Spent a lot of my time gaming and then went on to wonder
                      how games work, what was behind it all.<br />
                      This curosity led me to learn programming, and I started with Python, my first language.<br />                      
                      From there, I explored various programming languages and technologies, including C++, Java, Go, and DBMS.
                    </p>
                    <p>
                      Pursing computer science gives me a solid technical foundation, and
                      diving into product design showed me new creative depths I hadn't
                      imagined.
                    </p>
                    <p>
                      Now, I'm building projects, learning new skills, and embracing the journey ahead.
                      Every experience, every challenge, and every success is a stepping stone
                      towards becoming the best version of myself.
                     </p>
                  </motion.div>
                </motion.div>

                {/* --- POLAROID BOX --- */}
                <motion.div
                  className="absolute bg-neutral-100 rounded-3xl shadow-sm p-10"
                  style={{
                    top: '1150px',
                    left: '55%',
                    width: '65%',
                    height: '493px',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <div ref={parallaxRef} className="relative w-full h-full">
                    <PolaroidSlideshow scrollProgress={scrollYProgress} />
                  </div>

                </motion.div>


                {/* --- MISSION IMAGE BOX --- */}
                <motion.div
                  className="absolute bg-neutral-100 rounded-3xl shadow-sm p-10 flex justify-center items-center"
                  style={{
                    top: '1700px',
                    left: '-20%',
                    width: '50%',
                    height: '393px',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.img
                    src="/assets/story/rocket.gif"
                    alt="Showcase GIF"
                    className="w-full rounded-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>

                {/* --- MISSION TEXT BOX --- */}
                <motion.div
                  className="absolute bg-neutral-100 rounded-3xl shadow-sm p-10"
                  style={{
                    top: '1700px',
                    left: '34.5%',
                    width: '85.5%',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="space-y-6 text-black/70 text-lg md:text-xl font-['Inter_Display']"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-4xl font-bold font-['Reddit_Sans_Condensed'] text-black">
                      The Way Forward...
                    </h3>
                    <p>
                      I’m focused on building intelligent systems that don’t just analyze data 
                      they understand people. From crafting mindful tools like Cerebro to AI assistants that teach, 
                      track, and adapt, my goal is to bridge technical precision with human impact.<br/>
                    </p>
                    <br/>
                    The journey ahead is about experimenting boldly, merging creativity, empathy, 
                    and AI to design experiences that feel alive. Whether it’s rethinking productivity, emotional wellbeing, 
                    or human–AI interaction, I want my work to shape tools that grow with people, not just for them.
                    <p>
                      
                    </p>
                  </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Story;
