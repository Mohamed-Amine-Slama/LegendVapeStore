"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import PillButton from "@/components/ui/PillButton";

const PROFILE_URL = "https://www.instagram.com/legend_vape_store_sousse_/";

type IgPost = {
  id: number;
  image: string;
  alt: string;
  likes: number;
  url: string;
};

const POSTS: IgPost[] = [
  { id: 0, image: "/instagram/post-1.jpg", alt: "Legend Vape Store post 1", likes: 124, url: PROFILE_URL },
  { id: 1, image: "/instagram/post-2.jpg", alt: "Legend Vape Store post 2", likes: 382, url: PROFILE_URL },
  { id: 2, image: "/instagram/post-3.jpg", alt: "Legend Vape Store post 3", likes: 491, url: PROFILE_URL },
  { id: 3, image: "/instagram/post-4.jpg", alt: "Legend Vape Store post 4", likes: 215, url: PROFILE_URL },
  { id: 4, image: "/instagram/post-5.jpg", alt: "Legend Vape Store post 5", likes: 342, url: PROFILE_URL },
  { id: 5, image: "/instagram/post-6.jpg", alt: "Legend Vape Store post 6", likes: 189, url: PROFILE_URL },
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
            <Image
              src={post.image}
              alt={post.alt}
              fill
              sizes="(min-width: 768px) 16vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={post.alt}
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
