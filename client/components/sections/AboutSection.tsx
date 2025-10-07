import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, LayoutGrid, HeartHandshake } from "lucide-react";

import { SectionContainer } from "@/components/sections/SectionContainer";
import { useParallax } from "@/hooks/useParallax";

const copyVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ([0.25, 0.1, 0.25, 1] as any) },
  },
};

export const AboutSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const portrait = useParallax<HTMLDivElement>([-22, 22]);

  return (
    // NOTE: no 'watermark' prop — watermark is hero-only per your direction
    <SectionContainer id="about">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">

        {/* Copy */}
        <motion.div
          className="space-y-6 text-left"
          variants={copyVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-foreground/60">
            About
          </p>

          <h2 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            A systems thinker shaping tactile, emotionally intelligent product journeys.
          </h2>

          {/* Primary about copy — adapted from your previous site style */}
          <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">
            I design with equal parts rigor and resonance—turning research into experience maps,
            story-driven prototypes, and scalable design ecosystems. My work blends creative
            direction with product thinking to make complex services feel simple, legible, and alive.
          </p>
          <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">
            Over the years I’ve partnered with emerging teams and global brands to translate
            ambiguity into clarity: aligning business outcomes with human needs, and crafting
            interfaces that are as measured as they are memorable.
          </p>

          {/* Quick values / focus row */}
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            <li className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-white/70 p-4 backdrop-blur-sm">
              <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/55">Focus</p>
                <p className="text-sm text-foreground/85">UX Strategy, Motion, Spatial UI</p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-white/70 p-4 backdrop-blur-sm">
              <LayoutGrid className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/55">Toolkit</p>
                <p className="text-sm text-foreground/85">Figma, Cinema 4D, WebGL</p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-white/70 p-4 backdrop-blur-sm">
              <HeartHandshake className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/55">Approach</p>
                <p className="text-sm text-foreground/85">Research-led, collaborative, measurable</p>
              </div>
            </li>
          </ul>

          {/* Currently Working On */}
          <div className="mt-8 rounded-[2rem] border border-foreground/10 bg-white/70 p-6 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">
              Currently Working On
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75 sm:text-base">
              Building a 3D-interactive portfolio system and leading the end-to-end experience
              for the Sanchez Services booking and operations platform—bringing service clarity,
              real-time feedback, and motion-driven storytelling into everyday workflows.
            </p>
          </div>
        </motion.div>

        {/* Portrait / visual */}
        <motion.div
          ref={portrait.ref}
          style={portrait.style}
          className="relative mx-auto flex w-full max-w-[420px] items-center justify-center"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={copyVariants}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3rem] border border-white/60 bg-gradient-to-br from-white/60 via-white/40 to-white/20 shadow-[0_30px_80px_rgba(18,28,42,0.12)]">
            {/* Replace with your actual portrait asset when ready */}
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
              alt="Portrait of Jessabel with soft studio lighting"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-[4rem] border border-foreground/10"
          />
        </motion.div>
      </div>
    </SectionContainer>
  );
};
