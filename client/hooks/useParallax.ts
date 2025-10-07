import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const useParallax = <T extends HTMLElement>(
  range: [number, number] = [-18, 18],
) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<T | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], range);

  return {
    ref,
    style: prefersReducedMotion ? undefined : { y: translateY },
  } as const;
};
