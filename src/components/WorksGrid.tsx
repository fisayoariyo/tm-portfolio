"use client";

import Link from "next/link";
import { works, type Work } from "@/lib/works";

type Props = {
  onSelectWork?: (work: Work) => void;
};

export function WorksGrid({ onSelectWork }: Props) {
  return (
    <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {works.map((work) => {
        return (
          <li key={work.id}>
            {onSelectWork ? (
              <button
                type="button"
                onClick={() => onSelectWork(work)}
                className="group block w-full text-left overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper-soft)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/30 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
                  <span>FILE #{work.id}</span>
                  <span>{work.year}</span>
                </div>
                <h3 className="mt-3.5 text-xl font-bold tracking-tight text-[var(--ink)] group-hover:underline underline-offset-4">
                  {work.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-[var(--ink-soft)]">
                  {work.category}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)] line-clamp-2">
                  {work.summary}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                  <span>See about the job</span>
                  <span className="transition-transform group-hover:translate-x-1.5 text-sm">↗</span>
                </div>
              </button>
            ) : (
              <Link
                href={`/works?file=${work.id}`}
                className="group block overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper-soft)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/30 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
                  <span>FILE #{work.id}</span>
                  <span>{work.year}</span>
                </div>
                <h3 className="mt-3.5 text-xl font-bold tracking-tight text-[var(--ink)] group-hover:underline underline-offset-4">
                  {work.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-[var(--ink-soft)]">
                  {work.category}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)] line-clamp-2">
                  {work.summary}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                  <span>See about the job</span>
                  <span className="transition-transform group-hover:translate-x-1.5 text-sm">↗</span>
                </div>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
