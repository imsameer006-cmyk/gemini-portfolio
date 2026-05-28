"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Must match the section labels in the case study data
const SECTIONS = [
  { label: "Overview" },
  { label: "Challenge" },
  { label: "Context" },
  { label: "Research" },
  { label: "Exploration" },
  { label: "Solution" },
  { label: "Design Decisions" },
  { label: "Architecture" },
  { label: "Interaction Flow" },
  { label: "Validation" },
  { label: "Impact" },
];

// ID format must match what Section component generates
export const toSectionId = (label: string) =>
  `cs-${label.toLowerCase().replace(/\s+/g, "-")}`;

const MOBILE_SCROLL_OFFSET = 128; // nav (64) + bar (48) + gap (16)
const DESKTOP_SCROLL_OFFSET = 88; // nav (64) + gap (24)

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 5l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActiveDot() {
  return <span className="w-1.5 h-1.5 rounded-full bg-[#5A8A75] shrink-0" aria-hidden="true" />;
}

export default function JumpToNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(toSectionId("Overview"));
  const [isVisible, setIsVisible] = useState(false);

  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // ── Visibility: show once hero scrolls away ──────────────────
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("article > div:first-child");
    if (!hero) return;

    const onScroll = () => {
      const { bottom } = hero.getBoundingClientRect();
      setIsVisible(bottom < 64);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section via Intersection Observer ─────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ label }) => {
      const el = document.getElementById(toSectionId(label));
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(toSectionId(label));
        },
        { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Close on outside click ───────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (mobileRef.current?.contains(t) || desktopRef.current?.contains(t)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Close on Escape ──────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // ── Scroll helper ────────────────────────────────────────────
  const scrollTo = (label: string) => {
    const id = toSectionId(label);
    const el = document.getElementById(id);
    if (!el) return;

    const isMobile = window.innerWidth < 1024;
    const offset = isMobile ? MOBILE_SCROLL_OFFSET : DESKTOP_SCROLL_OFFSET;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      window.scrollTo(0, top);
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }

    setActiveId(id);
    setIsOpen(false);
  };

  const activeLabel =
    SECTIONS.find((s) => toSectionId(s.label) === activeId)?.label ?? "Overview";

  // ── Shared dropdown list ─────────────────────────────────────
  const DropdownList = ({ itemHeight }: { itemHeight: string }) => (
    <motion.ul
      role="listbox"
      aria-label="Page sections"
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="mt-2 bg-[#F9F8F5]/96 backdrop-blur-xl border border-[#E6E3DD] rounded-xl shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12)] overflow-hidden"
    >
      {SECTIONS.map(({ label }) => {
        const isActive = toSectionId(label) === activeId;
        return (
          <li key={label} role="presentation">
            <button
              role="option"
              aria-selected={isActive}
              onClick={() => scrollTo(label)}
              className={[
                `w-full text-left px-4 ${itemHeight} text-sm flex items-center justify-between gap-3 transition-colors duration-150 focus-visible:outline-none focus-visible:bg-[#F2F0EB]`,
                isActive
                  ? "text-[#18171A] font-medium bg-[#F0F6F2]"
                  : "text-[#6A6764] hover:text-[#18171A] hover:bg-[#F2F0EB]",
              ].join(" ")}
            >
              <span>{label}</span>
              {isActive && <ActiveDot />}
            </button>
          </li>
        );
      })}
    </motion.ul>
  );

  // ── Render ───────────────────────────────────────────────────
  return (
    <>
      {/* ── Mobile / Tablet bar (< xl) ── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden fixed top-16 inset-x-0 z-30 pt-2"
            ref={mobileRef}
          >
            {/* Inner wrapper anchored to shared 900px grid origin */}
            <div className="max-w-[900px] mx-auto px-6 md:px-10">
            {/* Trigger */}
            <button
              onClick={() => setIsOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls="jumpto-mobile-list"
              aria-label={`Navigate to section. Current: ${activeLabel}`}
              className="w-full flex items-center justify-between gap-3 bg-[#F9F8F5]/92 backdrop-blur-xl border border-[#E6E3DD] rounded-xl px-4 h-[48px] shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)] hover:bg-[#F9F8F5] hover:border-[#CECAC2] transition-all duration-200"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[11px] text-[#9C9A95] font-medium tracking-wide shrink-0">
                  Jump to
                </span>
                <span className="w-px h-3.5 bg-[#E6E3DD] shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-[#18171A] truncate">
                  {activeLabel}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#9C9A95] shrink-0"
              >
                <ChevronIcon />
              </motion.span>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {isOpen && (
                <div id="jumpto-mobile-list">
                  <DropdownList itemHeight="h-[44px]" />
                </div>
              )}
            </AnimatePresence>
            </div>{/* end 900px anchor */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop widget (≥ xl / 1280px) ── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden xl:block fixed top-24 right-8 z-40 w-[192px]"
            ref={desktopRef}
          >
            {/* Trigger */}
            <button
              onClick={() => setIsOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls="jumpto-desktop-list"
              aria-label={`Navigate to section. Current: ${activeLabel}`}
              className="w-full flex items-center justify-between gap-2 bg-[#F9F8F5]/80 backdrop-blur-xl border border-[#E6E3DD] rounded-xl px-3.5 h-[38px] shadow-[0_1px_6px_-1px_rgba(0,0,0,0.06)] opacity-75 hover:opacity-100 hover:bg-[#F9F8F5]/96 hover:border-[#CECAC2] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-200"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] text-[#9C9A95] font-medium tracking-widest uppercase shrink-0">
                  Jump to
                </span>
                <span className="text-xs font-medium text-[#18171A] truncate">
                  {activeLabel}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#9C9A95] shrink-0"
              >
                <ChevronIcon />
              </motion.span>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {isOpen && (
                <div id="jumpto-desktop-list">
                  <DropdownList itemHeight="h-[36px]" />
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
