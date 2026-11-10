"use client";

import Link from "next/link";
import { site, bookingHref } from "@/lib/site";

type Props = {
  onOpenBrief: () => void;
};

export function HomeHero({ onOpenBrief }: Props) {
  const booking = bookingHref();

  return (
    <section className="relative flex min-h-[calc(100dvh-5.5rem)] w-full flex-col justify-between overflow-hidden px-6 pb-8 pt-4 sm:px-10 sm:pb-10 sm:pt-6 md:px-14 md:pb-12 lg:px-20">
      {/* Background Graphic Loop & Oval Accent */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full opacity-70"
        >
          {/* Main fluid curve looping behind the title */}
          <path
            d="M 1040 160 C 920 180 720 280 620 460 C 510 650 560 820 680 920 C 800 1010 980 960 1080 840 C 1190 700 1150 480 980 340 C 840 220 660 260 560 380 C 440 520 460 760 580 920 C 650 1010 740 1080 820 1120"
            stroke="#deddd8"
            strokeWidth="52"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Oval dot mark on the right */}
          <ellipse
            cx="1230"
            cy="560"
            rx="28"
            ry="36"
            transform="rotate(-18 1230 560)"
            fill="#deddd8"
          />
        </svg>
      </div>

      {/* Top Part: Greeting + Scaled-to-Fit Headline */}
      <div className="w-full pt-2 sm:pt-4">
        {/* Greeting */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <p className="font-[family-name:var(--font-display)] text-xl font-bold leading-[1.15] tracking-tight text-[var(--ink)] sm:text-2xl md:text-3xl">
            {site.greeting.salutation}
            <br />
            {site.greeting.intro}
          </p>
        </div>

        {/* Hero Title */}
        <div className="w-full max-w-[1400px]">
          <h1 className="select-none font-[family-name:var(--font-display)] font-black tracking-[-0.035em] text-[var(--ink)]">
            <span className="block text-[clamp(2.15rem,5vw,5.35rem)] leading-[1.02] sm:whitespace-nowrap">
              {site.heroHeadline.line1}
            </span>
            <span className="block text-[clamp(2.15rem,5vw,5.35rem)] leading-[1.02] mt-2 sm:mt-3 sm:whitespace-nowrap">
              {site.heroHeadline.line2}
            </span>
          </h1>
        </div>
      </div>

      {/* Middle/Bottom Part: 3-Column Info Grid */}
      <div className="mt-10 sm:mt-14 md:mt-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-8 text-[0.9375rem] leading-[1.55] text-[var(--ink-soft)] sm:text-base md:grid-cols-3 md:gap-8 lg:gap-16">
          {/* Column 1: Subhead / Who I am */}
          <div>
            <p className="max-w-md">{site.subhead}</p>
          </div>

          {/* Column 2: Passion / Philosophy / About body */}
          <div>
            <p className="max-w-md">{site.about.body}</p>
          </div>

          {/* Column 3: Location, Phone/Call, Email */}
          <div className="space-y-1">
            <p className="text-[var(--ink)] font-normal">{site.location}</p>
            {site.phone ? (
              <p>
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-[var(--ink)]"
                >
                  {site.phone}
                </a>
              </p>
            ) : null}
            <p>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-[var(--ink)] font-normal underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenBrief}
                className="text-xs font-semibold uppercase tracking-wider text-[var(--ink)] underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Send a brief →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Center Indicator: EXPLORE MY WORK */}
      <div className="mt-10 flex justify-center pb-2 pt-4 sm:mt-12 sm:pb-3">
        <Link
          href="/works"
          className="group inline-flex flex-col items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)] transition-transform hover:translate-y-0.5"
        >
          <span>EXPLORE MY WORK</span>
          <svg
            className="h-3 w-3 text-[var(--ink)] transition-transform group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
