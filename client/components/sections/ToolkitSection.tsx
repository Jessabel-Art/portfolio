import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Compass,
  Cpu,
  Cuboid,
  LayoutGrid,
  Orbit,
  Palette,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

// Adjust path if SectionContainer is not in the same folder
import { SectionContainer } from "./SectionContainer";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: ([0.25, 0.1, 0.25, 1] as any) },
  },
};

const toolkitItems: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Spatial UX Systems", description: "Designing adaptive, multi-surface flows that translate seamlessly from desktop to immersive 3D canvases.", icon: LayoutGrid },
  { title: "Narrative Prototyping", description: "Using motion-first prototypes to tell product stories that clarify intent faster than any documentation.", icon: Sparkles },
  { title: "Design Ops Architecture", description: "Scaling design languages through reusable component libraries, feedback rituals, and governance frameworks.", icon: BrainCircuit },
  { title: "Real-time Collaboration", description: "Building multiplayer design environments and live feedback systems to accelerate decision-making.", icon: Orbit },
  { title: "Creative Engineering", description: "Shipping expressive interactions through WebGL, procedural motion, and custom shader systems.", icon: Cuboid },
  { title: "AI-assisted Workflows", description: "Embedding intelligent co-pilots that automate discovery, streamline research, and inspire new directions.", icon: Cpu },
  { title: "Brand-led Visuals", description: "Pairing elegant serif storytelling with confident sans systems to balance warmth and clarity in every product.", icon: Palette },
  { title: "Experience Mapping", description: "Translating behavioral data into journey frameworks that illuminate opportunity and measure delight.", icon: Compass },
];

export const ToolkitSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionContainer id="toolkit">
      <motion.div
        className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center"
        initial={prefersReducedMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={cardVariants}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-foreground/60">
          Toolkit
        </p>
        <h2 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          The systems, rituals, and instruments I rely on to shape meaningful products.
        </h2>
        <p className="text-base text-foreground/70 sm:text-lg">
          Every engagement blends research, design craft, and forward-thinking engineering—each tool here supports poetic yet pragmatic collaboration.
        </p>
      </motion.div>

      <motion.div
        className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4"
        variants={containerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {toolkitItems.map((item, index) => (
          <motion.article
            key={item.title}
            variants={cardVariants}
            whileHover={{
              y: -8,
              rotateX: 2,
              rotateY: -2,
              transition: { type: "spring", stiffness: 200, damping: 12 },
            }}
            className="group relative flex h-full flex-col gap-4 rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-white/80 via-white/60 to-white/40 p-7 text-left shadow-[0_18px_60px_rgba(18,28,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_32px_90px_rgba(18,28,42,0.12)]"
          >
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-colors group-hover:bg-primary/20 group-hover:text-primary"
            >
              <item.icon className="h-5 w-5" />
            </motion.span>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                {item.description}
              </p>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-40 group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-transparent" />
          </motion.article>
        ))}
      </motion.div>
    </SectionContainer>
  );
};
