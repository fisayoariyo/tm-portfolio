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

  // Auto-inspect if file query changes
  useEffect(() => {
    if (fileParam) {
      const idx = works.findIndex((w) => w.id === fileParam);
      if (idx !== -1) {
        setCurrentIndex(idx);
        setInspecting(true);
      }
    }
  }, [fileParam]);

  // Drawer slide-out effect on mount
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

  // Keyboard navigation for shuffling folders
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

  // Touch swipe & mobile scroll shuffle support
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchHandledRef = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    if (inspecting) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    touchHandledRef.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (inspecting || !touchStartRef.current || touchHandledRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // Sensitivity threshold for thumb swipe (35px)
    if (absX > 35 || absY > 35) {
      touchHandledRef.current = true;
      if (absX >= absY) {
        // Horizontal swipe (left = next, right = prev)
        if (dx < 0) nextFolder();
        else prevFolder();
      } else {
        // Vertical swipe / scroll (up = next, down = prev)
        if (dy < 0) nextFolder();
        else prevFolder();
      }
    }
  };

  const onTouchEnd = () => {
    touchStartRef.current = null;
    touchHandledRef.current = false;
  };

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
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
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

          <div className="flex items-center gap-2 font-mono text-[0.7rem] sm:text-xs uppercase tracking-widest text-black/60">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>DRAWER 01 // ARCHIVE</span>
          </div>

          <button
            type="button"
            onClick={() => setBriefOpen(true)}
            className="text-sm font-semibold tracking-tight text-[#111111] transition-opacity hover:opacity-60 cursor-pointer"
          >
            Contact
          </button>
        </div>
      </header>

      {/* Main Archival Shelf Stage */}
      <main className="relative flex flex-1 flex-col items-center justify-between px-3 pb-8 pt-4 sm:px-8 sm:pt-6 md:px-12">
        {/* Shelf Header & Status */}
        <div className="w-full max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-3.5 py-1 text-[0.7rem] sm:text-xs font-mono tracking-wider text-black/70">
            <span>INDEX CODE: TA-ARCHIVE-2026</span>
            <span>•</span>
            <span>FILE {String(currentIndex + 1).padStart(2, "0")} OF {String(total).padStart(2, "0")}</span>
          </div>
          <h1 className="mt-2.5 font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight text-[#111111] sm:text-3xl md:text-5xl">
            Selected Work Dossiers
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-black/60 font-mono">
            <span className="hidden sm:inline">[ Shuffle folders using arrows, wheel, or click any tab ]</span>
            <span className="sm:hidden font-medium text-black/80">[ ⇄ Swipe or scroll screen to shuffle folders ]</span>
          </p>
        </div>

        {/* The 3D Shelf / Filing Cabinet Drawer */}
        <div
          ref={shelfRef}
          className="relative my-4 sm:my-6 flex h-[480px] w-full max-w-[1140px] items-center justify-center sm:h-[640px] lg:h-[690px] touch-pan-y"
          style={{ perspective: "1500px" }}
        >
          {/* Cabinet Drawer Base Frame */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0.88, y: 50 }}
            animate={drawerOpen ? { opacity: 1, scaleY: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute -inset-x-2 -inset-y-3 rounded-2xl border-2 border-black/15 bg-[#dad7cf]/65 shadow-[inset_0_12px_44px_rgba(0,0,0,0.07),0_30px_70px_rgba(0,0,0,0.1)] -z-20 sm:-inset-x-10 sm:-inset-y-5"
          >
            {/* Metal drawer handle graphic at bottom */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-md border border-black/20 bg-[#c8c4b9] px-5 py-1 text-[0.65rem] sm:px-8 sm:py-1.5 sm:text-xs font-mono tracking-widest text-black/70 shadow-sm whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
              DRAWER PULL // CABINET A
              <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
            </div>
          </motion.div>

          {/* Folder Stack */}
          <div
            className="relative h-[390px] w-full max-w-[94vw] sm:h-[530px] sm:max-w-[880px] lg:h-[570px] lg:max-w-[960px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {works.map((work, idx) => {
              const diff = idx - currentIndex;
              const isPast = diff < 0;
              const isCurrent = diff === 0;
              const isFuture = diff > 0;

              // Tab horizontal staggering (4 tab slots, adjusted for mobile widths)
              const tabSlot = idx % 4;
              const tabPositions = [
                "left-2 sm:left-6",
                "left-[23%] sm:left-[26%]",
                "left-[46%] sm:left-[50%]",
                "left-[68%] sm:left-[73%]",
              ];
              const tabClass = tabPositions[tabSlot];

              // Realistic 3D transforms for shuffling
              let y = 0;
              let z = 0;
              let rotateX = 0;
              let opacity = 1;
              let scale = 1;
              let zIndex = 20 - Math.abs(diff);

              if (isPast) {
                // Tilted forward towards the viewer like a pulled folder in a file drawer
                y = 130 + diff * 14;
                z = 50 + diff * 20;
                rotateX = -36;
                opacity = Math.max(0.18, 1 + diff * 0.35);
                scale = 0.98 + diff * 0.02;
                zIndex = 10 + diff;
              } else if (isCurrent) {
                // Upright active file
                y = 0;
                z = 0;
                rotateX = 0;
                opacity = 1;
                scale = 1;
                zIndex = 40;
              } else {
                // Future folders waiting upright behind
                y = -diff * 18;
                z = -diff * 52;
                rotateX = 5;
                opacity = Math.max(0.38, 1 - diff * 0.14);
                scale = 1 - diff * 0.03;
                zIndex = 30 - diff;
              }

              return (
                <motion.div
                  key={work.id}
                  drag={isCurrent ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                    if (Math.abs(info.offset.x) > 40) {
                      if (info.offset.x < 0) nextFolder();
                      else prevFolder();
                    }
                  }}
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
                  {/* Folder Tab (Sticks out at top, responsive for mobile) */}
                  <div
                    className={`absolute -top-7 sm:-top-9 ${tabClass} z-10 flex h-8 sm:h-10 items-center gap-1.5 sm:gap-2.5 rounded-t-lg sm:rounded-t-xl border-t-2 border-x-2 border-black/20 px-2.5 sm:px-5 text-[0.68rem] sm:text-sm font-mono font-bold tracking-wider transition-colors ${
                      isCurrent
                        ? "bg-[#f4efe4] text-[#111111] shadow-md border-b-0"
                        : "bg-[#dcd6c8] text-black/75 hover:bg-[#eae4d5]"
                    }`}
                  >
                    <span className="text-[0.65rem] sm:text-xs opacity-60">#{work.id}</span>
                    <span className="truncate max-w-[70px] xs:max-w-[90px] sm:max-w-[200px]">
                      {work.title}
                    </span>
                  </div>

                  {/* Folder Jacket Body (Manila Archival Texture) */}
                  <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl rounded-tl-sm border-2 border-black/20 bg-gradient-to-b from-[#f4efe4] via-[#ede6d8] to-[#e6dfcf] p-4 sm:p-9 lg:p-11 flex flex-col justify-between">
                    {/* Top Folder Header */}
                    <div>
                      <div className="flex items-center justify-between border-b border-black/15 pb-2.5 sm:pb-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-black/50" />
                          <span className="font-mono text-[0.7rem] sm:text-sm font-bold tracking-widest text-black/75">
                            CASE FILE // NO. {work.id}
                          </span>
                        </div>
                        <span className="rounded-md border border-black/20 bg-black/5 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[0.65rem] sm:text-xs uppercase tracking-wider text-black/70">
                          {work.year} ARCHIVE
                        </span>
                      </div>

                      {/* Folder Content Preview */}
                      <div className="mt-3 sm:mt-6">
                        <span className="font-mono text-[0.68rem] sm:text-sm uppercase tracking-wider text-black/50">
                          {work.category}
                        </span>
                        <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111]">
                          {work.title}
                        </h2>
                        <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-base text-black/75 line-clamp-2 leading-relaxed max-w-2xl">
                          {work.summary}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Document Sheet Preview peeking out */}
                    <div className="relative my-2 sm:my-3 aspect-[16/7] sm:aspect-[16/6] w-full overflow-hidden rounded-lg sm:rounded-xl border border-black/15 bg-white shadow-inner">
                      <Image
                        src={work.src}
                        alt={work.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 95vw, 960px"
                      />
                      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 rounded bg-black/80 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[0.65rem] sm:text-xs text-white">
                        PREVIEW ARTIFACT
                      </div>
                    </div>

                    {/* Bottom Folder Footer & Action */}
                    <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-black/15 text-xs sm:text-sm">
                      <span className="font-mono text-black/60 text-[0.68rem] sm:text-sm truncate max-w-[170px] sm:max-w-none">
                        CLIENT: <span className="font-semibold text-black/90">{work.client}</span>
                      </span>
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 sm:gap-2 font-bold uppercase tracking-wider text-[#111111] hover:underline underline-offset-4">
                          <span>Pull out file</span>
                          <span className="text-base sm:text-lg leading-none">↗</span>
                        </span>
                      ) : (
                        <span className="font-mono text-xs text-black/45">
                          Tap to select
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Shuffle Controls & Tactile Buttons */}
        <div className="w-full max-w-xl flex flex-col items-center gap-3 sm:gap-4 mt-2">
          <div className="flex w-full items-center justify-between gap-2.5 sm:gap-5">
            <button
              type="button"
              onClick={prevFolder}
              disabled={currentIndex === 0}
              className="flex-1 rounded-full border border-black/20 bg-[#dad7cf] px-3.5 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] transition-all hover:bg-[#111111] hover:text-white disabled:opacity-30 disabled:hover:bg-[#dad7cf] disabled:hover:text-[#111111] cursor-pointer shadow-sm active:scale-95"
            >
              ← Prev
            </button>

            {/* Pull out active file button */}
            <button
              type="button"
              onClick={() => setInspecting(true)}
              className="flex-[1.4] rounded-full bg-[#111111] px-4 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-black/80 cursor-pointer active:scale-95"
            >
              Pull File ({currentWork.id}) ↗
            </button>

            <button
              type="button"
              onClick={nextFolder}
              disabled={currentIndex === total - 1}
              className="flex-1 rounded-full border border-black/20 bg-[#dad7cf] px-3.5 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] transition-all hover:bg-[#111111] hover:text-white disabled:opacity-30 disabled:hover:bg-[#dad7cf] disabled:hover:text-[#111111] cursor-pointer shadow-sm active:scale-95"
            >
              Next →
            </button>
          </div>

          {/* Folder Indicator Dots */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {works.map((w, idx) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to file ${w.id}`}
                className={`h-2 sm:h-2.5 transition-all rounded-full ${
                  idx === currentIndex
                    ? "w-8 sm:w-10 bg-[#111111]"
                    : "w-2 sm:w-2.5 bg-black/25 hover:bg-black/50"
                }`}
              />
            ))}
          </div>
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
