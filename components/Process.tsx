import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// -------------------------------------------
// STEP DATA (No changes here)
// -------------------------------------------
const steps = [
    {
      title: "THE SPARK",
      lines: [
        "> loading module: THE SPARK...",
        "> ideas scribbled... caffeine detected ☕",
      ],
      folder: "/assets/process/spark",
    },
    {
      title: "RESEARCH MODE",
      lines: [
        "> initializing RESEARCH MODE...",
        "> analyzing docs, exploring tools, collecting references",
      ],
      folder: "/assets/process/research",
    },
    {
      title: "THE BLUEPRINT",
      lines: [
        "> compiling structure...",
        "> design logic mapped successfully 🧠",
      ],
      folder: "/assets/process/blueprint",
    },
    {
      title: "BUILD & BREAK",
      lines: [
        "> building prototype...",
        "> bugs encountered: 42 🪲",
        "> resolved with caffeine and chaos ⚡",
      ],
      folder: "/assets/process/build",
    },
    {
      title: "REFINE & POLISH",
      lines: [
        "> refining UX... polishing pixels...",
        "> optimization complete ✔️",
      ],
      folder: "/assets/process/refine",
    },
    {
      title: "SHOWTIME",
      lines: [
        "> system stable.",
        "> pushing to production 🚀",
        "> all systems go.",
      ],
      folder: "/assets/process/showtime",
    },
];

// -------------------------------------------
// TYPEWRITER HOOK (Updated Timing)
// -------------------------------------------
function useTypewriter(lines: string[], enabled: boolean) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const clearAll = () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
    if (!enabled) {
      clearAll();
      setDisplayed([]);
      setDone(false);
      return;
    }
    setDisplayed([]);
    setDone(false);

    lines.forEach((line, i) => {
      // REDUCED DURATION: Changed from 1500 to 1000
      const t = window.setTimeout(() => {
        setDisplayed((prev) => [...prev, line]);
      }, i * 1000); 
      timers.current.push(t);
    });

    const end = window.setTimeout(
      () => setDone(true),
      lines.length * 1000 + 800
    );
    timers.current.push(end);

    return () => clearAll();
  }, [lines, enabled]);

  return { displayed, done };
}

// -------------------------------------------
// NEW: useInView HOOK
// -------------------------------------------
function useInView(threshold = 0.4) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { threshold }
      );
      if (ref.current) observer.observe(ref.current);
      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, [threshold]);
    return { ref, inView };
}

// -------------------------------------------
// MAIN COMPONENT (With final animation corrections)
// -------------------------------------------
const Process = () => {
  // --- PART 1: INTRO SECTION (No changes here) ---
  const introRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"],
  });
  const bgColor = useTransform(introProgress, [0.2, 0.6], ["#fffdf5", "#0a0a0a"]);
  const textColor = useTransform(introProgress, [0.2, 0.6], ["#0a0a0a", "#e2e2e2"]);
  const scene1Opacity = useTransform(introProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const scene2Opacity = useTransform(introProgress, [0.5, 0.8, 1.0], [0, 1, 0]);

  // --- PART 2: TERMINAL SECTION (Logic is the same) ---
  const [stepIndex, setStepIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { ref: terminalViewRef, inView } = useInView(0.5);
  const current = steps[stepIndex];
  const { displayed, done } = useTypewriter(current.lines, inView && !isTransitioning);

  useEffect(() => {
    if (inView && done) setIsTransitioning(true);
  }, [inView, done]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => (prev + 1) % steps.length);
        setIsTransitioning(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  
  const imageTransforms = [
      { rotate: -3.5, y: -10, x: -5 }, { rotate: 2, y: 5, x: 10 },
      { rotate: 4, y: 15, x: -5 }, { rotate: -2.5, y: -5, x: 5 },
  ];

  // --- PART 3: OUTRO TRANSITION SETUP (Ranges corrected) ---
  const outroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: outroProgress } = useScroll({
    target: outroRef,
    offset: ["start end", "end start"],
  });

  const outroBgColor = useTransform(outroProgress, [0.5, 0.9], ["#0a0a0a", "#f5f5f5"]);
  
  // Content fades out between 20% and 50% of the scroll
  const contentOpacity = useTransform(outroProgress, [0.2, 0.5], [1, 0]);
  const contentScale = useTransform(outroProgress, [0.2, 0.5], [1, 0.9]);
  
  // Text appears AFTER content fades out (from 55%), then fades out later
  const outroTextOpacity = useTransform(outroProgress, [0.55, 0.65, 0.85, 0.95], [0, 1, 1, 0]);
  const outroTextColor = useTransform(outroProgress, [0.5, 0.9], ["#e2e2e2", "#0a0a0a"]);


  return (
    <>
      {/* --- INTRO SECTION (No changes here) --- */}
      <motion.section ref={introRef} className="relative h-[250vh]" style={{ backgroundColor: bgColor }}>
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <motion.div style={{ color: textColor }} className="absolute inset-0 font-['Comic_Neue'] text-center">
            <motion.div style={{ opacity: scene1Opacity }} className="flex h-full flex-col items-center justify-center">
              <p className="text-xl">Now Presenting...</p>
              <h1 className="mt-4 text-4xl font-bold md:text-5xl">The retr0nade Process</h1>
            </motion.div>
            <motion.div style={{ opacity: scene2Opacity }} className="absolute inset-0 flex h-full items-center justify-center">
              <p className="text-4xl">Dim the lights...</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- TERMINAL & OUTRO SECTION --- */}
      {/* INCREASED HEIGHT: From 200vh to 300vh for more scroll room */}
      <motion.section ref={outroRef} style={{ backgroundColor: outroBgColor }} className="relative h-[500vh]">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          {/* Main Content (Terminal + Images) */}
          <motion.div
            ref={terminalViewRef}
            style={{ opacity: contentOpacity, scale: contentScale }}
            className="flex w-full max-w-7xl flex-col items-center justify-center gap-10 md:flex-row"
          >
            {/* Terminal */}
            <div className="relative h-[400px] w-full shrink-0 overflow-hidden rounded-xl border border-green-500/30 bg-black/90 p-6 font-mono text-green-400 shadow-[0_0_25px_rgba(0,25_5,120,0.3)] md:w-[600px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.05)_0%,transparent_70%)]" />
                <div className="absolute inset-0 mix-blend-overlay opacity-[0.08] bg-[url('/assets/process/scanlines.png')]" />
                <p className="mb-2 text-green-400/70">retr0nade.sys boot sequence</p>
                <div className="mb-4 border-t border-green-500/20"></div>
                {isTransitioning ? (
                  <p className="animate-pulse">{stepIndex === steps.length - 1 ? "> And we start over again..." : "> Loading Next..."}</p>
                ) : (
                  <>
                    {displayed.map((line, i) => ( <motion.p key={i} className="mb-1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} > {line} </motion.p> ))}
                    {!done && (<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>▊</motion.span>)}
                  </>
                )}
            </div>
            {/* Image Grid */}
            <div className="grid h-[312px] w-full grid-cols-2 grid-rows-2 gap-3 md:h-[372px] md:w-[500px]">
              <AnimatePresence>
                {!isTransitioning && [1, 2, 3, 4].map((num, i) => (
                  <motion.div
                    key={`${current.folder}/${num}.png`}
                    className="relative h-full w-full overflow-hidden rounded-lg border border-green-900 shadow-lg"
                    style={{ rotate: imageTransforms[i].rotate, translateY: imageTransforms[i].y, translateX: imageTransforms[i].x }}
                    initial={{ opacity: 0, x: 40, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, delay: i * 0.15 } }}
                    exit={{ opacity: 0, x: -40, scale: 0.9, transition: { duration: 0.4, delay: (3 - i) * 0.1 } }}
                  >
                    <img src={`${current.folder}/${num}.png`} alt={`${current.title} - ${num}`} className="crt h-full w-full object-cover" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Final Outro Text */}
          <motion.div
            style={{ opacity: outroTextOpacity, color: outroTextColor }}
            className="absolute inset-0 flex items-center justify-center p-8 text-center"
          >
            <h2 className="font-['Comic_Neue'] text-4xl md:text-6xl">
              ...and that sums it up.
            </h2>
          </motion.div>

        </div>
      </motion.section>
    </>
  );
};

export default Process;