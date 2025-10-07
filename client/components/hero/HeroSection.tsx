import { HeroScene } from "@/components/hero/HeroScene";
import { SectionContainer } from "@/components/sections/SectionContainer";

export const HeroSection = () => {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    // Watermark only in Hero
    <SectionContainer id="hero" watermark="Jessabel">
      {/* Pull the whole hero up a bit to remove extra top padding */}
      <div className="-mt-16 sm:-mt-20 relative mx-auto w-full max-w-[1400px] px-6">
        <div className="relative mx-auto flex w-full flex-col items-center">
          <div className="relative mx-auto w-full max-w-[1200px]">
            <h1 className="sr-only">Jessabel Santos</h1>

            {/* Bold decorative names (behind the dolphin) */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute left-[4%] top-[2%] z-10 select-none
                font-serif font-extrabold leading-none text-foreground
                text-[14vw] sm:text-[12vw] lg:text-[10vw]
                drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]
              "
            >
              Jessy
            </span>

            <span
              aria-hidden
              className="
                pointer-events-none absolute right-[6%] bottom-[16%] z-10 select-none
                font-serif font-extrabold leading-none text-foreground
                text-[14vw] sm:text-[12vw] lg:text-[10vw]
                drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]
              "
            >
              Santos
            </span>

            {/* Spotlight behind scene */}
            <div
              aria-hidden
              className="absolute inset-0 z-0 mx-auto h-[66%] w-[78%] -translate-y-4 rounded-[999px] blur-3xl opacity-55"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 45%, rgba(255,214,182,0.6) 0%, rgba(255,214,182,0.18) 52%, transparent 72%)",
              }}
            />

            {/* Add vertical padding to give extra gap between names and dolphins */}
            <div className="relative z-20 py-6 sm:py-8">
              <HeroScene />
            </div>
          </div>

          {/* Recruiter-first summary + supporting line + CTA */}
          <div className="mt-6 max-w-3xl text-center">
            {/* One-sentence headline recruiters see first */}
            <p className="text-2xl font-semibold text-foreground sm:text-[1.75rem] sm:leading-snug">
              Designer with a Business Ops and Strategy background turning strategy into simple, high-adoption product experiences.
            </p>

            {/* Supporting subtext */}
            <p className="mt-3 text-lg text-foreground/70 sm:text-xl">
              Research, service design, and front-end craft—reducing friction and increasing measurable outcomes.
            </p>

            <div className="mt-8">
              <button
                onClick={scrollToContact}
                className="
                  group relative inline-flex items-center justify-center rounded-full
                  bg-foreground px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.2em]
                  text-background transition-transform duration-200
                  hover:-translate-y-0.5 focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2
                  shadow-[0_12px_34px_rgba(18,28,42,0.24)]
                "
              >
                <span className="relative z-10">Contact</span>
                <span
                  aria-hidden
                  className="
                    pointer-events-none absolute inset-0 rounded-full
                    bg-gradient-to-b from-white/14 to-transparent
                    opacity-0 transition-opacity duration-200 group-hover:opacity-100
                  "
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
