"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { BriefModal, ThankYouBubble } from "@/components/BriefModal";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeHero } from "@/components/HomeHero";
import { WorksGrid } from "@/components/WorksGrid";
import { WorkDossierModal } from "@/components/WorkDossierModal";
import { site } from "@/lib/site";
import type { Work } from "@/lib/works";

export function HomeExperience() {
  const [briefOpen, setBriefOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [thankYou, setThankYou] = useState(false);
  const dismissThanks = useCallback(() => setThankYou(false), []);

  return (
    <>
      <div className="relative flex min-h-screen flex-1 flex-col bg-[var(--paper)] text-[var(--ink)]">
        <SiteHeader onOpenContact={() => setBriefOpen(true)} />

        <main className="flex flex-1 flex-col">
          {/* Main Hero section matching the reference design */}
          <HomeHero onOpenBrief={() => setBriefOpen(true)} />

          {/* Works Section */}
          <section
            id="works"
            className="scroll-mt-20 border-t border-[var(--line)] px-6 py-20 sm:px-10 sm:py-24 md:px-14 lg:px-20 lg:py-28"
          >
            <div className="mx-auto max-w-[1600px]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                    Portfolio
                  </span>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-black lowercase tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
                    selected works
                  </h2>
                </div>
                <div className="flex flex-col sm:items-end gap-3">
                  <Link
                    href="/works"
                    className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-black/80"
                  >
                    <span>Open Shelf Archive (06 Files)</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Works grid: clicking any project opens the job dossier directly */}
              <WorksGrid onSelectWork={(work) => setSelectedWork(work)} />
            </div>
          </section>

          {/* Other things I do */}
          <section
            id="other"
            className="scroll-mt-20 border-t border-[var(--line)] px-6 py-20 sm:px-10 sm:py-24 md:px-14 lg:px-20 lg:py-28"
          >
            <div className="mx-auto max-w-[1600px]">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                Capabilities
              </span>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-black lowercase tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
                other things i do
              </h2>
              <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {site.otherThings.map((item, index) => (
                  <li
                    key={item.title}
                    className="group rounded-2xl border border-[var(--line)] bg-[var(--paper-soft)] p-8 transition-transform duration-200 hover:-translate-y-1 hover:border-[var(--ink)]/30"
                  >
                    <span className="font-mono text-xs text-[var(--ink-muted)]">
                      0{index + 1}
                    </span>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {item.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="scroll-mt-20 border-t border-[var(--line)] px-6 py-20 sm:px-10 sm:py-24 md:px-14 lg:px-20 lg:py-28"
          >
            <div className="mx-auto max-w-[1600px]">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                Biography
              </span>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-black lowercase tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
                {site.about.title.toLowerCase()}
              </h2>
              <div className="mt-8 max-w-3xl">
                <p className="text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl md:text-2xl font-light">
                  {site.about.body}
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="scroll-mt-20 border-t border-[var(--line)] px-6 py-20 sm:px-10 sm:py-24 md:px-14 lg:px-20 lg:py-28"
          >
            <div className="mx-auto max-w-[1600px]">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                    Inquiries
                  </span>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-black lowercase tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
                    start a conversation
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--ink-soft)]">
                    Prefer writing? Leave a note with your project scope, timeline, and questions.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setBriefOpen(true)}
                    className="btn-primary cursor-pointer"
                  >
                    Open brief form
                  </button>
                  <a
                    href={`mailto:${site.email}`}
                    className="btn-ghost"
                  >
                    Direct Email
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Minimalist Editorial Footer */}
        <footer className="border-t border-[var(--line)] px-6 py-8 text-xs text-[var(--ink-muted)] sm:px-10 md:px-14 lg:px-20">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4">
            <span className="font-medium tracking-tight text-[var(--ink)]">
              © 2026 {site.name}
            </span>
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-[var(--ink)]"
              >
                {site.email}
              </a>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-bold uppercase tracking-wider text-[var(--ink)] transition-opacity hover:opacity-60 cursor-pointer"
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Direct Job Dossier Modal when selected from Home */}
      <WorkDossierModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
        onInquire={() => {
          setSelectedWork(null);
          setBriefOpen(true);
        }}
      />

      <BriefModal
        open={briefOpen}
        onOpenChange={setBriefOpen}
        onSent={() => setThankYou(true)}
      />
      <ThankYouBubble visible={thankYou} onDismiss={dismissThanks} />
    </>
  );
}
