"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  onOpenContact?: () => void;
};

export function SiteHeader({ onOpenContact }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_80%,transparent)] backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10 md:px-14 lg:px-20"
      >
        {/* Left: About */}
        <div className="flex-1">
          <a
            href="#about"
            className="text-[0.95rem] font-medium text-[var(--ink)] transition-opacity hover:opacity-60 sm:text-base"
          >
            About
          </a>
        </div>

        {/* Center: Works */}
        <div className="flex-none text-center">
          <Link
            href="/works"
            className="text-[0.95rem] font-medium text-[var(--ink)] transition-opacity hover:opacity-60 sm:text-base"
          >
            Works
          </Link>
        </div>

        {/* Right: Contact */}
        <div className="flex-1 text-right">
          {onOpenContact ? (
            <button
              type="button"
              onClick={onOpenContact}
              className="text-[0.95rem] font-medium text-[var(--ink)] transition-opacity hover:opacity-60 sm:text-base cursor-pointer"
            >
              Contact
            </button>
          ) : (
            <a
              href="#contact"
              className="text-[0.95rem] font-medium text-[var(--ink)] transition-opacity hover:opacity-60 sm:text-base"
            >
              Contact
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
