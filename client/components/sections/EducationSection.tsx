import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { SectionContainer } from "@/components/sections/SectionContainer";

const educationHistory = [
  {
    institution: "Western Governors University",
    program: "Master of Business Administration",
    timeframe: "2024 — 2025",
    notes:
      "Developed executive-level leadership, organizational analysis, and data-driven decision-making skills to guide strategic growth and innovation.",
  },
  {
    institution: "Western Governors University",
    program: "Bachelor of Science in Business Administration in Management",
    timeframe: "2023 — 2024",
    notes:
      "Built a strong foundation in business strategy, human resource management, and organizational leadership with a focus on operational efficiency.",
  },
    {
    institution: "Full Sail University",
    program: "Graduate Certificate in User Experience",
    timeframe: "2024",
    notes:
      "Explored research methods, usability testing, and experience prototyping while designing human-centered interfaces for digital platforms.",
  },
  {
    institution: "Community College of Rhode Island",
    program: "Associate of Science in Business Administration Management",
    timeframe: "2019 — 2022",
    notes:
      "Gained essential business knowledge in accounting, finance, and project coordination, forming the groundwork for advanced managerial studies.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
      delay: index * 0.08,
    },
  }),
};

export const EducationSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionContainer id="education" watermark="EDUCATION">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-foreground/60">
          Education
        </p>
        <h2 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          Learning that anchors craft and strategy.
        </h2>
        <p className="text-base text-foreground/70 sm:text-lg">
          A lifelong learner dedicated to bridging business insight with creative innovation—
          continuously refining how systems, design, and leadership intersect.
        </p>
      </div>

      <motion.ol
        className="mt-14 flex flex-col gap-8"
        initial={prefersReducedMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {educationHistory.map((entry, index) => (
          <motion.li
            key={entry.institution + entry.program}
            custom={index}
            variants={itemVariants}
            className="flex flex-col gap-3 rounded-[2rem] border border-white/60 bg-white/75 p-7 shadow-[0_18px_60px_rgba(18,28,42,0.08)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-white">
                <GraduationCap className="h-5 w-5 text-foreground" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/55">
                  {entry.timeframe}
                </p>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {entry.program}
                </h3>
                <p className="text-sm font-medium text-foreground/70">
                  {entry.institution}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground/70 sm:max-w-[320px]">
              {entry.notes}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </SectionContainer>
  );
};

