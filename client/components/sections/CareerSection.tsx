import { motion, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { SectionContainer } from "@/components/sections/SectionContainer";

const overview = [
  "I did not begin by calling myself a designer. I found my footing at New Urban Arts, sketching, rearranging space, and testing how small decisions change how people move. I joined the NUA on the Move team and helped plan a new studio. That was my first lesson that design is a chain of choices that shape behavior.",
  "The same instincts carried into digital work. I started building ecommerce sites for small businesses, tuning SEO, and smoothing flows so people could buy what they came for. In larger organizations I worked on intranets and system implementations that served big teams. I mapped messy processes, drew the real journey on paper, and rebuilt steps so the tool matched the job.",
  "Freelance projects kept me close to founders. I helped translate rough ideas into visual systems, wrote copy that met the interface halfway, and crafted simple paths that welcomed a first wave of customers. It felt like tuning an engine until it runs clean.",
  "Today I combine a creative background with more than fifteen years in business to ship work that is clear, grounded, and a little bit daring. I design research-backed interfaces, organize information, prototype with intent, and build systems that hold up under real use. Along the way I earned a Bachelor of Science in Business Administration (Management), a Certificate in User Experience from Full Sail University, and a Master of Business Administration from Western Governors University, which sharpened the strategy behind the pixels.",
];

const timeline = [
  {
    yr: "2011",
    label: "Design Intern • NUA on the Move",
    sub: "Helped plan a new studio and learned spatial problem-solving.",
  },
  {
    yr: "2014",
    label: "Early Web + SEO",
    sub: "Built ecommerce sites and improved usability for small businesses.",
  },
  {
    yr: "2015–2018",
    label: "Platform Usability",
    sub: "Fintech and insurance: mapped flows, informed features, improved handoffs.",
  },
  {
    yr: "2018–2022",
    label: "Systems Implementation Lead",
    sub: "Healthcare SaaS: internal platform rollouts focused on adoption and change management.",
  },
  {
    yr: "2022–Present",
    label: "UX/UI Designer & Consultant",
    sub: "Research, interface design, and scalable design systems for startups and small teams.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export const CareerSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionContainer id="career" watermark="CAREER">
      {/* ---------- Intro ---------- */}
      <motion.div
        className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center"
        initial={prefersReducedMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={itemVariants}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-foreground/60">
          Career Journey
        </p>
        <h2 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          Business-centered UX strategist and product designer.
        </h2>
      </motion.div>

      {/* ---------- Narrative paragraphs ---------- */}
      <div className="mt-10 mx-auto w-full max-w-3xl space-y-5 text-left text-base leading-relaxed text-foreground/75 sm:text-lg">
        {overview.map((p, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={itemVariants}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {p}
          </motion.p>
        ))}
      </div>

      {/* ---------- Timeline ---------- */}
      <div className="relative mt-16">
        <div
          className="absolute left-[22px] top-0 h-full w-px bg-gradient-to-b from-primary/20 via-foreground/10 to-transparent"
          aria-hidden
        />

        <motion.ol
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-10"
        >
          {timeline.map((step, i) => (
            <motion.li
              key={step.label}
              custom={i}
              variants={itemVariants}
              className="relative ml-0 flex flex-col gap-3 rounded-[2rem] border border-white/60 bg-white/75 p-8 pl-16 shadow-[0_20px_70px_rgba(18,28,42,0.1)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(18,28,42,0.12)]"
            >
              <div className="absolute left-4 top-8 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-white text-primary shadow-[0_3px_12px_rgba(15,28,45,0.1)]">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">
                  {step.yr}
                </p>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {step.label}
                </h3>
                <p className="text-sm text-foreground/70">{step.sub}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </SectionContainer>
  );
};
