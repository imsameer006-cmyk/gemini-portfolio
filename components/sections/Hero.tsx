"use client";

import { motion } from "framer-motion";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-16"
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #E6E3DD 1px, transparent 0)`,
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
      />

      <div className="max-w-[1280px] mx-auto w-full relative">
        {/* Role label */}
        <motion.p
          {...FADE_UP}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm text-[#9C9A95] tracking-widest uppercase mb-8 font-medium"
        >
          Product Designer
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(3rem,8vw,7rem)] leading-[1.05] tracking-tight text-[#18171A] mb-6 max-w-[16ch]"
        >
          Building clarity{" "}
          <span className="not-italic font-[family-name:var(--font-instrument-serif)]">
            out of
          </span>{" "}
          complexity.
        </motion.h1>

        {/* Subtext + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
        >
          <p className="text-base md:text-lg text-[#6A6764] max-w-[38ch] leading-relaxed">
            I design products that feel obvious in hindsight — systems that work
            invisibly and interfaces that people trust.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToWork}
              className="inline-flex items-center gap-2 bg-[#18171A] text-[#F9F8F5] text-sm font-medium px-5 py-3 rounded-full hover:bg-[#C07B50] transition-colors duration-200 min-h-[44px]"
            >
              View work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 2.5v9M3 7.5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center text-sm font-medium text-[#6A6764] hover:text-[#18171A] transition-colors duration-200 min-h-[44px] px-2"
            >
              About me →
            </a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          aria-hidden="true"
          className="hidden md:flex items-center gap-3 absolute bottom-0 right-0 text-xs text-[#9C9A95] tracking-widest uppercase"
        >
          <span
            className="block w-px h-10 bg-[#E6E3DD]"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          Scroll
        </motion.div>
      </div>

      {/* Decorative accent line at bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-6 md:left-10 right-6 md:right-10 h-px bg-[#E6E3DD] origin-left"
      />
    </section>
  );
}
