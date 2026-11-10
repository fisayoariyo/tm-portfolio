"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Work } from "@/lib/works";

type Props = {
  works: Work[];
  onComplete: () => void;
};

function delayForIndex(index: number, total: number) {
  const t = index / Math.max(total - 1, 1);
  // Fast early flips, then stretch toward the last piece
  return 70 + Math.pow(t, 2.4) * 720;
}

export function WorkFlipIntro({ works, onComplete }: Props) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const last = works.length - 1;
  const current = works[index] ?? works[0];

  const schedule = useMemo(
    () => works.map((_, i) => delayForIndex(i, works.length)),
    [works],
  );

  useEffect(() => {
    if (reduceMotion || works.length === 0) {
      onComplete();
      return;
    }

    if (index >= last) {
      const hold = window.setTimeout(() => {
        setExiting(true);
        window.setTimeout(onComplete, 700);
      }, 900);
      return () => window.clearTimeout(hold);
    }

    const id = window.setTimeout(() => setIndex((i) => i + 1), schedule[index]);
    return () => window.clearTimeout(id);
  }, [index, last, onComplete, reduceMotion, schedule, works.length]);

  if (reduceMotion || !current) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[var(--ink)]"
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={exiting}
    >
      <button
        type="button"
        onClick={onComplete}
        className="absolute right-5 top-5 z-10 text-sm tracking-wide text-[var(--mist)]/70 transition hover:text-[var(--mist)]"
      >
        Skip
      </button>

      <div className="relative h-[70vh] w-[min(92vw,1100px)] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.id}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 28, rotateX: 18, scale: 1.04 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: -36, rotateX: -12, scale: 0.98 }}
            transition={{
              duration: index === last ? 0.55 : 0.18,
              ease: index === last ? [0.16, 1, 0.3, 1] : "easeOut",
            }}
            style={{ transformPerspective: 1200 }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1100px) 92vw, 1100px"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--ink)]/80 to-transparent p-6 sm:p-8">
              <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--mist)] sm:text-3xl">
                {current.title}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
        {works.map((w, i) => (
          <span
            key={w.id}
            className={`h-1 w-6 rounded-full transition-colors ${
              i <= index ? "bg-[var(--mist)]" : "bg-[var(--mist)]/25"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
