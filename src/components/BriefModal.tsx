"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSent: () => void;
};

export function BriefModal({ open, onOpenChange, onSent }: Props) {
  const titleId = useId();
  const [sending, setSending] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 40);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      onOpenChange(false);
      onSent();
    }, 420);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            aria-label="Close brief form"
            className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] w-full max-w-lg rounded-2xl border border-ghost bg-paper p-5 shadow-[0_24px_80px_rgba(22,22,21,0.18)] sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id={titleId}
                  className="font-[family-name:var(--font-display)] text-2xl text-ink"
                >
                  Send a brief
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  Tell me what you&apos;re working on — I&apos;ll take it from there.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-lg px-2 py-1 text-sm text-ink-soft transition hover:bg-black/5 hover:text-ink"
              >
                Close
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-ink-soft">
                  Name
                  <input
                    ref={firstFieldRef}
                    name="name"
                    autoComplete="name"
                    className="mt-1.5 w-full border-b border-line bg-transparent py-2 text-ink outline-none transition focus:border-accent"
                  />
                </label>
                <label className="block text-sm text-ink-soft">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-1.5 w-full border-b border-line bg-transparent py-2 text-ink outline-none transition focus:border-accent"
                  />
                </label>
              </div>
              <label className="block text-sm text-ink-soft">
                What are you working on?
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="mt-1.5 w-full resize-y border-b border-line bg-transparent py-2 text-ink outline-none transition focus:border-accent"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full sm:w-auto"
                style={{
                  backgroundColor: "#1d1d1f",
                  color: "#ffffff",
                  display: "inline-flex",
                  minHeight: "2.75rem",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0.75rem",
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                {sending ? "Sending…" : "Send"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

type BubbleProps = {
  visible: boolean;
  onDismiss: () => void;
};

export function ThankYouBubble({ visible, onDismiss }: BubbleProps) {
  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(onDismiss, 5200);
    return () => window.clearTimeout(id);
  }, [visible, onDismiss]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4 sm:inset-x-auto sm:bottom-8 sm:right-8 sm:justify-end"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
        >
          <div
            role="status"
            className="pointer-events-auto relative max-w-[min(100%,20rem)] rounded-[1.35rem] rounded-br-md px-4 py-3 text-sm leading-snug text-white shadow-[0_16px_40px_rgba(22,22,21,0.22)]"
            style={{ backgroundColor: "#1d1d1f" }}
          >
            <p>Thank you! Hit you up soon.</p>
            <button
              type="button"
              onClick={onDismiss}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-ink shadow"
              aria-label="Dismiss"
            >
              ×
            </button>
            <span
              aria-hidden
              className="absolute -bottom-1.5 right-3 h-3 w-3 rotate-45"
              style={{ backgroundColor: "#1d1d1f" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
