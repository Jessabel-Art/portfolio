import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Lightbulb, Target } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionContainer } from "@/components/sections/SectionContainer";
import { useParallax } from "@/hooks/useParallax";

const featuredProject = {
  title: "Sanchez Services",
  image:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  alt: "Strategist presenting a service blueprint to a client team",
  role: "Product Design Lead",
  problem:
    "Fragmented scheduling, invoicing, and reporting created friction for both field teams and clients.",
  approach:
    "Partnered with operations to map the end-to-end journey, built a service OS with adaptive modules, and prototyped every touchpoint with real data.",
  outcome:
    "Launch reduced administrative time by 38%, increased client retention, and unlocked a new premium support tier.",
  metrics: [
    { label: "Admin Time", value: "-38%" },
    { label: "Retention", value: "+12%" },
    { label: "NPS", value: "+9" },
  ],
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const RecentWorkSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const featuredMedia = useParallax<HTMLDivElement>([-22, 22]);

  return (
    <SectionContainer id="work" watermark="WORK">
      {/* Intro */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-foreground/60">
          Recent Work
        </p>
        <h2 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          Service depth meets emotive product outcomes.
        </h2>
        <p className="text-base text-foreground/70 sm:text-lg">
          Blending research, storytelling, and thoughtful engineering—here’s a featured case
          shaping operations, booking, and client experience.
        </p>
      </div>

      {/* Featured Case */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch lg:gap-12">
        {/* Media */}
        <motion.figure
          ref={featuredMedia.ref}
          style={featuredMedia.style}
          className="group relative isolate overflow-hidden rounded-[2.75rem] shadow-[0_26px_90px_rgba(18,28,42,0.18)]"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={itemVariants}
        >
          <div className="relative aspect-[5/4]">
            <img
              src={featuredProject.image}
              alt={featuredProject.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/15 via-black/0 to-black/45" />
          </div>
          {/* soft overlay badge on hover */}
          <div className="pointer-events-none absolute right-4 top-4 hidden rounded-full border border-white/30 bg-white/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/80 backdrop-blur-sm shadow-sm sm:flex">
            Case Study
          </div>
        </motion.figure>

        {/* Details */}
        <motion.article
          className="flex h-full flex-col justify-between rounded-[2.75rem] border border-white/60 bg-white/75 p-8 sm:p-10 shadow-[0_24px_80px_rgba(18,28,42,0.12)] backdrop-blur-xl"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-foreground/60">
                Featured Case Study
              </p>
              <h3 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                {featuredProject.title}
              </h3>
            </div>

            <dl className="space-y-5 text-left text-sm text-foreground/75">
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.35em] text-foreground/50">
                    Role
                  </dt>
                  <dd className="mt-1 text-sm text-foreground/85">
                    {featuredProject.role}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Lightbulb className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.35em] text-foreground/50">
                    Problem → Approach
                  </dt>
                  <dd className="mt-1 space-y-3 text-sm leading-relaxed text-foreground/85">
                    <p>
                      <span className="font-semibold text-foreground">Problem.</span>{" "}
                      {featuredProject.problem}
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">Approach.</span>{" "}
                      {featuredProject.approach}
                    </p>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.35em] text-foreground/50">
                    Outcome
                  </dt>
                  <dd className="mt-1 leading-relaxed text-foreground/85">
                    {featuredProject.outcome}
                  </dd>
                </div>
              </div>
            </dl>

            {/* Metrics band */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {featuredProject.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-foreground/10 bg-white/70 px-4 py-3 text-center backdrop-blur-sm"
                >
                  <div className="text-base font-semibold text-foreground">{m.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-foreground/55">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/portfolio"
            className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-background transition hover:bg-foreground/90"
          >
            Open Case Study
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.article>
      </div>

      {/* Optional CTA row — no placeholders */}
      <motion.div
        className="mx-auto mt-14 flex max-w-4xl items-center justify-center"
        initial={prefersReducedMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={itemVariants}
      >
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/80 backdrop-blur-sm transition hover:border-foreground/30 hover:text-foreground"
        >
          More Selected Work
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </SectionContainer>
  );
};

