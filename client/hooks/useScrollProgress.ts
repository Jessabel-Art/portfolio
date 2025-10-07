import { useEffect, useState } from "react";

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      if (typeof window === "undefined") {
        setProgress(0);
        return;
      }

      frame = window.requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const maxScrollable = scrollHeight - clientHeight;

        if (maxScrollable <= 0) {
          setProgress(0);
          return;
        }

        const nextProgress = (window.scrollY / maxScrollable) * 100;
        setProgress(
          Number.isFinite(nextProgress)
            ? Math.min(Math.max(nextProgress, 0), 100)
            : 0,
        );
      });
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return progress;
};
