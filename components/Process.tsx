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
// TYPEWRITER HOOK (No changes here)
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
      const t = window.setTimeout(() => {
        setDisplayed((prev) => [...prev, line]);
      }, i * 1500);
      timers.current.push(t);
    });

    const end = window.setTimeout(
      () => setDone(true),
      lines.length * 1500 + 800
    );
    timers.current.push(end);

    return () => clearAll();
  }, [lines, enabled]);

  return { displayed, done };
}

// -------------------------------------------
// MAIN COMPONENT (Updated Logic)
// -------------------------------------------
const Process = () => {
  // 1. SETUP REFS AND SCROLL
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // 2. STATE FOR THE CURRENT STEP
  const [stepIndex, setStepIndex] = useState(0);

  // 3. MAP SCROLL TO STEP INDEX
  // The terminal animation happens between 20% and 90% of the scroll
  const stepMotionValue = useTransform(
    scrollYProgress,
    [0.2, 0.9],
    [0, steps.length - 1]
  );

  useEffect(() => {
    // Listen to changes in the motion value and update React state
    const unsubscribe = stepMotionValue.onChange((latest) => {
      const newIndex = Math.floor(latest);
      if (newIndex >= 0 && newIndex < steps.length && newIndex !== stepIndex) {
        setStepIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [stepMotionValue, stepIndex]);

  const current = steps[stepIndex];
  const { displayed, done } = useTypewriter(current.lines, true);

  // 4. SCENE-BASED TRANSFORMATIONS
  const bgColor = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    ["#fffdf5", "#0a0a0a"]
  );
  const textColor = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    ["#0a0a0a", "#e2e2e2"]
  );

  // Scene 1: "Now Presenting..."
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 1, 0]);

  // Scene 2: "Dim the lights..."
  const scene2Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.15, 0.2],
    [0, 1, 0]
  );

  // Scene 3: Terminal + Images
  const scene3Opacity = useTransform(
    scrollYProgress,
    [0.18, 0.22, 0.95, 1.0],
    [0, 1, 1, 0]
  );
  const scene3Scale = useTransform(scrollYProgress, [0.18, 0.22], [0.95, 1]);

  return (
    <motion.section
      ref={targetRef}
      className="relative h-[600vh]" // Increased height for more scroll room
      style={{ backgroundColor: bgColor }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ color: textColor }}
          className="font-['Comic_Neue'] text-center"
        >
          {/* --- SCENE 1: INTRO --- */}
          <motion.div
            style={{ opacity: scene1Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <p className="text-xl">Now Presenting...</p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">
              A retr0nade process movie
            </h1>
          </motion.div>

          {/* --- SCENE 2: DIM THE LIGHTS --- */}
          <motion.div
            style={{ opacity: scene2Opacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="text-4xl">Dim the lights...</p>
          </motion.div>

          {/* --- SCENE 3: TERMINAL + IMAGES --- */}
          <motion.div
            style={{ opacity: scene3Opacity, scale: scene3Scale }}
            className="flex w-full flex-col items-center justify-center gap-10 px-6 font-mono text-green-400 md:flex-row md:px-16"
          >
            {/* TERMINAL */}
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-green-500/30 bg-black/90 p-6 shadow-[0_0_25px_rgba(0,255,120,0.3)] md:w-[600px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.05)_0%,transparent_70%)]" />
              <div className="absolute inset-0 mix-blend-overlay opacity-[0.08] bg-[url('/assets/process/scanlines.png')]" />

              <p className="mb-2 text-green-400/70">
                retr0nade.sys boot sequence
              </p>
              <div className="mb-4 border-t border-green-500/20"></div>

              {displayed.map((line, i) => (
                <motion.p
                  key={i}
                  className="mb-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {line}
                </motion.p>
              ))}

              {!done && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  ▊
                </motion.span>
              )}
            </div>

            {/* IMAGE GRID */}
            <div className="grid h-[312px] w-full grid-cols-2 grid-rows-2 gap-3 md:h-[372px] md:w-[500px]">
              <AnimatePresence>
                {[1, 2, 3, 4].map((num, i) => (
                  <motion.img
                    key={`${current.folder}/${num}.png`}
                    src={`${current.folder}/${num}.png`}
                    alt={`${current.title} - ${num}`}
                    className="crt h-full w-full rounded-lg border border-green-900 object-cover shadow-lg"
                    initial={{ opacity: 0, x: 40, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: { duration: 0.5, delay: i * 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      x: -40,
                      scale: 0.95,
                      transition: { duration: 0.4, delay: (3 - i) * 0.1 },
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Process;