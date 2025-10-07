import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { SectionWatermark } from "./SectionWatermark";

type SectionContainerProps = {
  id: string;
  watermark: string;
  children: ReactNode;
  className?: string;
};

export const SectionContainer = ({
  id,
  watermark,
  className,
  children,
}: SectionContainerProps) => {
  return (
    <section
      id={id}
      className="relative w-full overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <SectionWatermark text={watermark} />
      <div
        className={cn("relative z-10 mx-auto w-full max-w-6xl px-6", className)}
      >
        {children}
      </div>
    </section>
  );
};
