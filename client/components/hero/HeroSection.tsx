import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Layers, Palette, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { HeroScene } from "@/components/hero/HeroScene";
import { SectionWatermark } from "@/components/sections/SectionWatermark";

const badges: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Sparkles, label: "Years of Experience", value: "8+" },
  { icon: Layers, label: "Core Skills", value: "UX Strategy, Spatial UI, Creative Coding" },
  { icon: Palette, label: "Favorite Tools", value: "Figma, Cinema 4D, WebGL" },
];

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden pb-16 pt-10 sm:pb-24 lg:pb-28 lg:pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Softer watermark so it doesn’t dominate */}
        <SectionWatermark className="text-foreground/5 top-[45%]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        {/* Simple, reliable 12-col grid */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* LEFT: name, subtitle, copy, CTAs, badges */}
          <div className="order-2 text-center lg:order-1 lg:col-span-6 lg:text-left">
            <h1 id="hero-heading" className="sr-only">Jessabel Santos</h1>

            <div className="flex flex-col items-center lg:items-start">
              <span
                aria-hidden
                className="font-serif text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[4.5rem] leading-[0.9]"
              >
                Jessy
              </span>
              <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-[0.35em] text-foreground/60">
                Portfolio 2025
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <p className="text-lg font-medium text-foreground/80 sm:text-xl">
                UX Designer • Digital Builder • Interactive Storyteller
              </p>
              <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">
                Crafting immersive digital experiences that feel tactile, intuitive, and alive.
                Blending human-centered systems with expressive visuals to tell meaningful,
                measurable stories.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-background transition hover:bg-foreground/90"
              >
                View Selected Work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-white/70 px-7 py-3 text-sm font-medium text-foreground/80 backdrop-blur-sm transition hover:border-foreground/40 hover:text-foreground"
              >
                Schedule a collaboration call
              </Link>
            </div>

            <div className="mt-8 grid gap-5 rounded-3xl border border-foreground/10 bg-white/60 p-6 text-left backdrop-blur-md sm:grid-cols-3">
              {badges.map((badge) => (
                <div key={badge.label} className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <badge.icon className="h-4 w-4 text-primary" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground/80">{badge.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: dolphins + “Santos” label */}
          <div className="order-1 relative lg:order-2 lg:col-span-6">
            {/* NOTE: remove any white card from HeroScene (we’ll edit next) */}
            <HeroScene />

            {/* Lower-right editorial label overlapping the dolphins */}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-4 right-0 rounded-full bg-white/40 px-5 py-2 font-serif text-3xl font-semibold uppercase tracking-[0.35em] text-foreground/90 shadow-[0_30px_60px_-40px_rgba(12,20,38,0.6)] lg:-bottom-3 lg:text-4xl xl:-bottom-5 xl:text-5xl"
            >
              Santos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

