"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import PillButton from "@/components/ui/PillButton";

const PROFILE_URL = "https://www.instagram.com/legend_vape_store_sousse_/";

type IgPost = {
  id: number;
  type: "p" | "reel";
  shortcode: string;
  likes: number;
  url: string;
};

const POSTS: IgPost[] = [
  { id: 0, type: "p",    shortcode: "DX3uUt1CNr0", likes: 124, url: "https://www.instagram.com/legend_vape_store_sousse_/p/DX3uUt1CNr0/" },
  { id: 1, type: "p",    shortcode: "DXlxFbKCPFw", likes: 382, url: "https://www.instagram.com/legend_vape_store_sousse_/p/DXlxFbKCPFw/" },
  { id: 2, type: "p",    shortcode: "DUN9X3pCBow", likes: 491, url: "https://www.instagram.com/legend_vape_store_sousse_/p/DUN9X3pCBow/" },
  { id: 3, type: "p",    shortcode: "DOZHN4JCKVg", likes: 215, url: "https://www.instagram.com/legend_vape_store_sousse_/p/DOZHN4JCKVg/" },
  { id: 4, type: "p",    shortcode: "DO1AfMvCF77", likes: 342, url: "https://www.instagram.com/legend_vape_store_sousse_/p/DO1AfMvCF77/" },
  { id: 5, type: "reel", shortcode: "DO0_sH2iGBz", likes: 189, url: "https://www.instagram.com/legend_vape_store_sousse_/reel/DO0_sH2iGBz/" },
];

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const tiles = gridRef.current!.querySelectorAll(".ig-tile");
      gsap.from(tiles, {
        scale: 0.9,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ backgroundColor: "#141414", padding: "96px 0" }}
      data-section="instagram"
    >
      <div className="text-center mb-12 px-[5vw]">
        <span className="font-ui text-accent text-[11px] uppercase tracking-[0.34em] block mb-3">
          @legend_vape_store_sousse_
        </span>
        <h2 className="font-display text-bg-light text-[clamp(40px,7vw,72px)] tracking-[0.04em] mb-8">
          FOLLOW US
        </h2>
        <PillButton href={PROFILE_URL} target="_blank" rel="noopener noreferrer" variant="gold" trailingIcon>
          Follow on Instagram
        </PillButton>
      </div>

      <div ref={gridRef} className="grid grid-cols-3 md:grid-cols-6">
        {POSTS.map((post) => (
          <div
            key={post.id}
            className="ig-tile relative aspect-square overflow-hidden group bg-black"
          >
            <iframe
              src={`https://www.instagram.com/${post.type}/${post.shortcode}/embed/`}
              title={`Instagram ${post.type === "reel" ? "reel" : "post"} ${post.shortcode}`}
              className="absolute left-0 w-full pointer-events-none transition-transform duration-700 group-hover:scale-110"
              style={{
                top: "-54px",
                height: "calc(100% + 114px)",
                border: 0,
                background: "#000",
              }}
              scrolling="no"
              loading="lazy"
              allow="encrypted-media"
            />
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open Instagram ${post.type === "reel" ? "reel" : "post"} ${post.shortcode}`}
              className="absolute inset-0 z-10 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex items-center justify-center"
            >
              <span className="font-ui text-bg-light text-[11px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                ♥ {post.likes}
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
