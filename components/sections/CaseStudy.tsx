"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { projects } from "@/lib/data/projects";

interface Props {
  project: Project;
}

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function CaseStudy({ project }: Props) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <article>
      {/* Hero */}
      <div
        className="min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end px-6 md:px-10 pt-32 pb-16"
        style={{ backgroundColor: project.coverColor }}
      >
        <div className="max-w-[1280px] mx-auto w-full">
          <motion.p {...FADE_UP(0)} className="text-xs text-[#18171A]/50 tracking-widest uppercase font-medium mb-4">
            {project.category} · {project.year}
          </motion.p>
          <motion.h1
            {...FADE_UP(0.1)}
            className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(2rem,5vw,4rem)] leading-tight text-[#18171A] max-w-[22ch] mb-6"
          >
            {project.title}
          </motion.h1>
          <motion.p {...FADE_UP(0.2)} className="text-base text-[#18171A]/70 max-w-[44ch] leading-relaxed mb-8">
            {project.description}
          </motion.p>
          <motion.span
            {...FADE_UP(0.3)}
            className="inline-block text-sm font-medium text-[#18171A] bg-[#18171A]/10 px-3 py-1.5 rounded-full"
          >
            {project.impact}
          </motion.span>
        </div>
      </div>

      {/* Tags */}
      <div className="border-b border-[#E6E3DD] px-6 md:px-10 py-5">
        <div className="max-w-[1280px] mx-auto flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs text-[#6A6764] border border-[#E6E3DD] rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Placeholder case study body */}
      <div className="px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-[720px] mx-auto">
          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <h2 className="text-xs text-[#9C9A95] tracking-widest uppercase font-medium mb-5">Overview</h2>
            <p className="text-lg text-[#18171A] leading-relaxed">
              This case study outlines the full end-to-end process — from discovery and research
              through to final design and measured outcomes. Each decision was informed by data,
              user feedback, and a clear understanding of business constraints.
            </p>
          </motion.section>

          <div className="border-t border-[#E6E3DD] mb-16" />

          {/* Problem */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <h2 className="text-xs text-[#9C9A95] tracking-widest uppercase font-medium mb-5">The Problem</h2>
            <p className="text-[#18171A] leading-relaxed mb-4">
              Users were encountering significant friction at a critical point in the experience.
              Drop-off rates signalled a fundamental mismatch between the product&apos;s mental model
              and what users actually needed.
            </p>
            <p className="text-[#6A6764] leading-relaxed">
              The challenge was not simply to redesign a screen — it was to understand why
              the existing flow felt broken, and to rebuild it from first principles.
            </p>
          </motion.section>

          {/* Visual placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-64 md:h-80 rounded-2xl mb-16 flex items-center justify-center"
            style={{ backgroundColor: project.coverColor }}
          >
            <span className="text-[#18171A]/20 text-sm font-medium tracking-wide">Design artifact placeholder</span>
          </motion.div>

          {/* Process */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <h2 className="text-xs text-[#9C9A95] tracking-widest uppercase font-medium mb-5">Process</h2>
            <div className="space-y-6">
              {["Research & Discovery", "Synthesis & Framing", "Design & Iteration", "Validation & Refinement"].map((phase) => (
                <div key={phase} className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C07B50] mt-2.5 shrink-0" />
                  <div>
                    <p className="font-medium text-[#18171A] mb-1">{phase}</p>
                    <p className="text-[#6A6764] text-sm leading-relaxed">
                      Detailed notes on this phase will appear here. Every step was documented,
                      critiqued, and evolved through collaborative sessions with stakeholders and users.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Outcome */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#F2F0EB] rounded-2xl p-8 mb-16"
          >
            <h2 className="text-xs text-[#9C9A95] tracking-widest uppercase font-medium mb-5">Outcome</h2>
            <p className="font-[family-name:var(--font-instrument-serif)] italic text-2xl text-[#18171A] leading-snug mb-4">
              &ldquo;{project.impact}&rdquo;
            </p>
            <p className="text-[#6A6764] text-sm leading-relaxed">
              Results were measured over a 6-week post-launch window, with statistical significance
              confirmed before drawing conclusions.
            </p>
          </motion.section>
        </div>
      </div>

      {/* Next project */}
      <div className="border-t border-[#E6E3DD] px-6 md:px-10 py-12">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-[#9C9A95] tracking-widest uppercase font-medium mb-1">Next Project</p>
            <p className="text-[#18171A] font-medium">{next.title}</p>
          </div>
          <Link
            href={`/work/${next.slug}`}
            className="inline-flex items-center gap-2 bg-[#18171A] text-[#F9F8F5] text-sm font-medium px-5 py-3 rounded-full hover:bg-[#C07B50] transition-colors duration-200 min-h-[44px]"
          >
            View case study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
