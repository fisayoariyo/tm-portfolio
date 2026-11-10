"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { works, type Work } from "@/lib/works";
import { BriefModal, ThankYouBubble } from "@/components/BriefModal";
import { WorkDossierModal } from "@/components/WorkDossierModal";
import { site } from "@/lib/site";

export function WorksArchiveShelf() {
  const searchParams = useSearchParams();
  const fileParam = searchParams.get("file");

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (fileParam) {
      const idx = works.findIndex((w) => w.id === fileParam);
      if (idx !== -1) return idx;
    }
    return 0;
  });
  const [inspecting, setInspecting] = useState(() => Boolean(fileParam));
  const [briefOpen, setBriefOpen] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const shelfRef = useRef<HTMLDivElement>(null);

  const total = works.length;
  const currentWork = works[currentIndex];

  // Drawer slide-out effect on mount (desktop)
  useEffect(() => {
    const timer = setTimeout(() => setDrawerOpen(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const nextFolder = useCallback(() => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
  }, [total]);

  const prevFolder = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation for shuffling folders (desktop)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (inspecting) {
        if (e.key === "Escape") setInspecting(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextFolder();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prevFolder();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setInspecting(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextFolder, prevFolder, inspecting]);

  // Trackpad / mouse wheel shuffle support on desktop
  const lastWheelTime = useRef(0);
  const onWheel = (e: React.WheelEvent) => {
    if (inspecting) return;
    const now = Date.now();
    if (now - lastWheelTime.current < 260) return;
    if (Math.abs(e.deltaY) > 24 || Math.abs(e.deltaX) > 24) {
      lastWheelTime.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) nextFolder();
      else prevFolder();
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#e7e5df] text-[#111111] overflow-x-hidden selection:bg-[#111111] selection:text-[#ededeb]"
      onWheel={onWheel}
    >
      {/* Top Shelf Bar */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#e7e5df]/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-4 sm:px-10 sm:py-5 lg:px-16">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-[#111111] transition-opacity hover:opacity-60"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
            <span>Home / {site.name}</span>
          </Link>

          <button
            type="button"
            onClick={() => setBriefOpen(true)}
            className="text-sm font-semibold tracking-tight text-[#111111] transition-opacity hover:opacity-60 cursor-pointer"
          >
            Contact
          </button>
        </div>
      </header>

      {/* Main Archival Stage */}
      <main className="relative flex flex-1 flex-col items-center justify-between px-4 pb-12 pt-4 sm:px-8 sm:pt-6 md:px-12">
        {/* Shelf Header & Status */}
        <div className="w-full max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-3.5 py-1 text-[0.7rem] sm:text-xs font-mono tracking-wider text-black/70">
            <span>INDEX CODE: TA-ARCHIVE-2026</span>
            <span>•</span>
            <span className="hidden md:inline">
              FILE {String(currentIndex + 1).padStart(2, "0")} OF {String(total).padStart(2, "0")}
            </span>
            <span className="md:hidden">06 DOSSIER FILES</span>
          </div>
          <h1 className="mt-2.5 font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight text-[#111111] sm:text-3xl md:text-5xl">
            Selected Work Dossiers
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-black/60 font-mono">
            <span className="hidden md:inline">[ Shuffle folders using arrows, wheel, or click any tab ]</span>
            <span className="md:hidden">[ Tap any dossier to inspect full scope & artifacts ]</span>
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP / TABLET MODE: 3D Archival Filing Cabinet (md: and up) */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:flex flex-col items-center w-full">
          <div
            ref={shelfRef}
            className="relative my-6 flex h-[640px] w-full max-w-[1140px] items-center justify-center lg:h-[690px]"
            style={{ perspective: "1500px" }}
          >
            {/* Cabinet Drawer Base Frame */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.88, y: 50 }}
              animate={drawerOpen ? { opacity: 1, scaleY: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute -inset-x-10 -inset-y-5 rounded-2xl border-2 border-black/15 bg-[#dad7cf]/65 shadow-[inset_0_12px_44px_rgba(0,0,0,0.07),0_30px_70px_rgba(0,0,0,0.1)] -z-20"
            >
              {/* Metal drawer handle graphic at bottom */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 rounded-md border border-black/20 bg-[#c8c4b9] px-8 py-1.5 text-xs font-mono tracking-widest text-black/70 shadow-sm whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
                DRAWER PULL // CABINET A
                <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
              </div>
            </motion.div>

            {/* Folder Stack */}
            <div
              className="relative h-[530px] w-full max-w-[880px] lg:h-[570px] lg:max-w-[960px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {works.map((work, idx) => {
                const diff = idx - currentIndex;
                const isPast = diff < 0;
                const isCurrent = diff === 0;

                // Tab horizontal staggering (4 tab slots)
                const tabSlot = idx % 4;
                const tabPositions = ["left-6", "left-[26%]", "left-[50%]", "left-[73%]"];
                const tabClass = tabPositions[tabSlot];

                // 3D transforms for shuffling
                let y = 0;
                let z = 0;
                let rotateX = 0;
                let opacity = 1;
                let scale = 1;
                let zIndex = 20 - Math.abs(diff);

                if (isPast) {
                  y = 150 + diff * 15;
                  z = 60 + diff * 22;
                  rotateX = -36;
                  opacity = Math.max(0.18, 1 + diff * 0.35);
                  scale = 0.98 + diff * 0.02;
                  zIndex = 10 + diff;
                } else if (isCurrent) {
                  y = 0;
                  z = 0;
                  rotateX = 0;
                  opacity = 1;
                  scale = 1;
                  zIndex = 40;
                } else {
                  y = -diff * 20;
                  z = -diff * 56;
                  rotateX = 5;
                  opacity = Math.max(0.38, 1 - diff * 0.14);
                  scale = 1 - diff * 0.03;
                  zIndex = 30 - diff;
                }

                return (
                  <motion.div
                    key={work.id}
                    onClick={() => {
                      if (isCurrent) {
                        setInspecting(true);
                      } else {
                        setCurrentIndex(idx);
                      }
                    }}
                    animate={{
                      y,
                      z,
                      rotateX,
                      opacity,
                      scale,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 26,
                      },
                    }}
                    style={{
                      zIndex,
                      transformOrigin: "bottom center",
                    }}
                    className={`absolute inset-0 cursor-pointer select-none transition-shadow ${
                      isCurrent ? "shadow-[0_28px_70px_rgba(0,0,0,0.22)]" : "shadow-md"
                    }`}
                  >
                    {/* Folder Tab */}
                    <div
                      className={`absolute -top-9 ${tabClass} z-10 flex h-10 items-center gap-2.5 rounded-t-xl border-t-2 border-x-2 border-black/20 px-5 text-sm font-mono font-bold tracking-wider transition-colors ${
                        isCurrent
                          ? "bg-[#f4efe4] text-[#111111] shadow-md border-b-0"
                          : "bg-[#dcd6c8] text-black/75 hover:bg-[#eae4d5]"
                      }`}
                    >
                      <span className="text-xs opacity-60">#{work.id}</span>
                      <span className="truncate max-w-[200px]">{work.title}</span>
                    </div>

                    {/* Folder Jacket Body */}
                    <div className="relative h-full w-full overflow-hidden rounded-2xl rounded-tl-sm border-2 border-black/20 bg-gradient-to-b from-[#f4efe4] via-[#ede6d8] to-[#e6dfcf] p-9 lg:p-11 flex flex-col justify-between">
                      {/* Top Folder Header */}
                      <div>
                        <div className="flex items-center justify-between border-b border-black/15 pb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="inline-block h-2.5 w-2.5 rounded-full bg-black/50" />
                            <span className="font-mono text-sm font-bold tracking-widest text-black/75">
                              CASE FILE // NO. {work.id}
                            </span>
                          </div>
                          <span className="rounded-md border border-black/20 bg-black/5 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-black/70">
                            {work.year} ARCHIVE
                          </span>
                        </div>

                        {/* Folder Content Preview */}
                        <div className="mt-6">
                          <span className="font-mono text-sm uppercase tracking-wider text-black/50">
                            {work.category}
                          </span>
                          <h2 className="mt-1.5 font-[family-name:var(--font-display)] text-3xl font-black tracking-tight text-[#111111] lg:text-5xl">
                            {work.title}
                          </h2>
                          <p className="mt-2.5 text-base text-black/75 line-clamp-2 leading-relaxed max-w-2xl">
                            {work.summary}
                          </p>
                        </div>
                      </div>

                      {/* Middle: Document Sheet Preview */}
                      <div className="relative my-3 aspect-[16/6] w-full overflow-hidden rounded-xl border border-black/15 bg-white shadow-inner">
                        <Image
                          src={work.src}
                          alt={work.alt}
                          fill
                          className="object-cover"
                          sizes="960px"
                        />
                        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                        <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2.5 py-1 font-mono text-xs text-white">
                          PREVIEW ARTIFACT
                        </div>
                      </div>

                      {/* Bottom Folder Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-black/15 text-sm">
                        <span className="font-mono text-black/60">
                          CLIENT: <span className="font-semibold text-black/90">{work.client}</span>
                        </span>
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-[#111111] hover:underline underline-offset-4">
                            <span>Pull out file</span>
                            <span className="text-lg leading-none">↗</span>
                          </span>
                        ) : (
                          <span className="font-mono text-xs text-black/45">
                            Click to inspect
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Shuffle Controls on Desktop */}
          <div className="w-full max-w-xl flex flex-col items-center gap-4 mt-2">
            <div className="flex w-full items-center justify-between gap-5">
              <button
                type="button"
                onClick={prevFolder}
                disabled={currentIndex === 0}
                className="flex-1 rounded-full border border-black/20 bg-[#dad7cf] px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-[#111111] transition-all hover:bg-[#111111] hover:text-white disabled:opacity-30 disabled:hover:bg-[#dad7cf] disabled:hover:text-[#111111] cursor-pointer shadow-sm"
              >
                ← Prev File
              </button>

              <button
                type="button"
                onClick={() => setInspecting(true)}
                className="flex-[1.2] rounded-full bg-[#111111] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-black/80 cursor-pointer"
              >
                Pull File ({currentWork.id}) ↗
              </button>

              <button
                type="button"
                onClick={nextFolder}
                disabled={currentIndex === total - 1}
                className="flex-1 rounded-full border border-black/20 bg-[#dad7cf] px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-[#111111] transition-all hover:bg-[#111111] hover:text-white disabled:opacity-30 disabled:hover:bg-[#dad7cf] disabled:hover:text-[#111111] cursor-pointer shadow-sm"
              >
                Next File →
              </button>
            </div>

            {/* Folder Indicator Dots */}
            <div className="flex items-center gap-2.5">
              {works.map((w, idx) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to file ${w.id}`}
                  className={`h-2.5 transition-all rounded-full ${
                    idx === currentIndex
                      ? "w-10 bg-[#111111]"
                      : "w-2.5 bg-black/25 hover:bg-black/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE MODE: Stacked Vertical Dossier Stream (below md)       */}
        {/* ------------------------------------------------------------- */}
        <div className="md:hidden w-full max-w-lg mx-auto flex flex-col gap-6 mt-6 pb-12">
          {works.map((work, idx) => (
            <article
              key={work.id}
              onClick={() => {
                setCurrentIndex(idx);
                setInspecting(true);
              }}
              className="group relative flex flex-col rounded-2xl border-2 border-black/15 bg-gradient-to-b from-[#f5f1e8] via-[#eee7d9] to-[#e4ded0] p-5 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
            >
              {/* Archival index bar */}
              <div className="flex items-center justify-between border-b border-black/10 pb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="font-bold tracking-wider text-black/80">
                    CASE DOSSIER // #{work.id}
                  </span>
                </div>
                <span className="rounded-md border border-black/15 bg-black/5 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-black/60">
                  {work.year}
                </span>
              </div>

              {/* Project info */}
              <div className="mt-3.5">
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-black/50 font-semibold">
                  {work.category}
                </span>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-[#111111]">
                  {work.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-black/75">
                  {work.summary}
                </p>
              </div>

              {/* Visual Artifact */}
              <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-inner">
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 95vw, 500px"
                />
                <div className="absolute bottom-2.5 right-2.5 rounded bg-black/85 px-2 py-0.5 font-mono text-[0.65rem] text-white">
                  VIEW ARTIFACT
                </div>
              </div>

              {/* Deliverables tags */}
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {work.deliverables.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-black/10 bg-black/[0.04] px-2 py-0.5 font-mono text-[0.65rem] text-black/70"
                  >
                    {item}
                  </span>
                ))}
                {work.deliverables.length > 3 ? (
                  <span className="rounded-md border border-black/10 bg-black/[0.04] px-1.5 py-0.5 font-mono text-[0.65rem] text-black/50">
                    +{work.deliverables.length - 3} more
                  </span>
                ) : null}
              </div>

              {/* Bottom footer */}
              <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 text-xs">
                <span className="font-mono text-black/55 text-[0.7rem] truncate max-w-[170px]">
                  CLIENT: <span className="font-semibold text-black/85">{work.client}</span>
                </span>
                <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[#111111] group-hover:underline underline-offset-4">
                  <span>Inspect Case</span>
                  <span className="text-sm">↗</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Pulled-Out File Dossier Modal */}
      <WorkDossierModal
        work={inspecting ? currentWork : null}
        onClose={() => setInspecting(false)}
        onInquire={() => {
          setInspecting(false);
          setBriefOpen(true);
        }}
        showShelfLink={false}
      />

      <BriefModal
        open={briefOpen}
        onOpenChange={setBriefOpen}
        onSent={() => setThankYou(true)}
      />
      <ThankYouBubble visible={thankYou} onDismiss={() => setThankYou(false)} />
    </div>
  );
}
