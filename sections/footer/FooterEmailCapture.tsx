"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function FooterEmailCapture() {
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        { x: 0 },
        { x: 12, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1 },
      );
    }
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="mt-12 max-w-[400px]">
      <h4
        className="font-ui font-semibold uppercase"
        style={{ fontSize: 11, letterSpacing: "0.32em", color: "rgba(200,169,110,0.78)" }}
      >
        The Drop List
      </h4>
      <p
        className="mt-3 font-serif italic"
        style={{ fontSize: 15, color: "rgba(240,237,232,0.65)", lineHeight: 1.45 }}
      >
        Early access to limited drops, members-only flavors, and event
        invites. No spam, just signal.
      </p>

      <form onSubmit={handleSubmit} className="relative mt-5">
        <input
          type="email"
          required
          placeholder="you@legendvapestore.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent py-4 pr-12 font-ui text-[14px] text-bg-light placeholder:text-bg-light/30 outline-none transition-colors duration-200"
          style={{ borderBottom: "1px solid rgba(240,237,232,0.32)" }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#C8A96E")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(240,237,232,0.32)")}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-accent transition-colors hover:text-bg-light"
        >
          <span ref={arrowRef} className="inline-block text-[26px] leading-none">→</span>
        </button>
      </form>

      {submitted && (
        <p
          className="mt-3 font-ui text-[12px] uppercase tracking-[0.18em]"
          style={{ color: "#C8A96E" }}
        >
          ✓ You&apos;re on the list.
        </p>
      )}
    </div>
  );
}
