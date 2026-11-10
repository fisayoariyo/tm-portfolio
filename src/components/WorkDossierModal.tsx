"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/works";

type Props = {
  work: Work | null;
  onClose: () => void;
  onInquire: () => void;
  showShelfLink?: boolean;
};

export function WorkDossierModal({ work, onClose, onInquire, showShelfLink = true }: Props) {
  return (
    <AnimatePresence>
      {work ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm"
        >
          {/* Backdrop click to dismiss */}
          <div
            className="absolute inset-0"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 70, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto rounded-2xl border border-black/15 bg-[#fbf9f4] p-5 sm:p-12 text-[#111111] shadow-2xl"
          >
            {/* Top Dossier Bar */}
            <div className="flex items-start justify-between border-b border-black/15 pb-4 sm:pb-5">
              <div>
                <div className="flex items-center gap-2 font-mono text-[0.7rem] sm:text-xs uppercase tracking-widest text-black/60">
                  <span>JOB DOSSIER</span>
                  <span>•</span>
                  <span>FILE REF: #{work.id}</span>
                </div>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-black text-[#111111]">
                  {work.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-black/20 bg-black/5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-[#111111] hover:bg-black/10 transition-colors cursor-pointer"
              >
                Close [✕]
              </button>
            </div>

            {/* Main File Image */}
            <div className="relative mt-5 sm:mt-7 aspect-[16/9] w-full overflow-hidden rounded-xl border border-black/10 bg-black/5">
              <Image
                src={work.src}
                alt={work.alt}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* File Dossier Details */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-y border-black/10 py-5 sm:py-6">
              <div>
                <span className="font-mono text-xs text-black/50 uppercase tracking-wider">
                  Client / Organization
                </span>
                <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold">{work.client}</p>
              </div>
              <div>
                <span className="font-mono text-xs text-black/50 uppercase tracking-wider">
                  Discipline & Scope
                </span>
                <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold">{work.category}</p>
              </div>
              <div>
                <span className="font-mono text-xs text-black/50 uppercase tracking-wider">
                  Project Year
                </span>
                <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold">{work.year}</p>
              </div>
            </div>

            {/* Summary Narrative */}
            <div className="mt-5 sm:mt-7">
              <h3 className="font-mono text-xs uppercase tracking-widest text-black/60">
                About The Job & Scope
              </h3>
              <p className="mt-2 sm:mt-2.5 text-base sm:text-lg leading-relaxed text-black/85 font-light">
                {work.summary}
              </p>
            </div>

            {/* Deliverables Tags */}
            <div className="mt-5 sm:mt-7">
              <h3 className="font-mono text-xs uppercase tracking-widest text-black/60">
                Key Deliverables & Artifacts
              </h3>
              <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-2 sm:gap-2.5">
                {work.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-black/15 bg-black/[0.04] px-3.5 py-1.5 text-xs sm:text-sm font-mono text-black/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-5 sm:pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onInquire}
                  className="btn-primary"
                >
                  Inquire about a similar project →
                </button>
                {showShelfLink ? (
                  <Link
                    href={`/works?file=${work.id}`}
                    className="btn-ghost text-xs"
                  >
                    View in 3D Archive Shelf ↗
                  </Link>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-mono uppercase tracking-wider text-black/60 hover:text-black underline underline-offset-4 cursor-pointer"
              >
                Return to page
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
