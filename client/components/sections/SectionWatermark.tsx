import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type HeroWatermarkProps = {
  className?: string;
  text?: string;
};

export const SectionWatermark = ({ className, text = "Jessabel" }: HeroWatermarkProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "font-serif font-semibold uppercase tracking-[0.48em]",
        // smaller on phones, huge on desktop
        "text-[clamp(8rem,24vw,34rem)] leading-none text-foreground/5 select-none",
        "z-0",
        className
      )}
    >
      {text}
    </motion.span>
  );
};
