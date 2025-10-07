import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const TITLES = [
  "UX Designer",
  "Digital Builder",
  "Interactive Storyteller",
];

export const Header = () => {
  const progress = useScrollProgress();
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 2800); // Change every 2.8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky inset-x-0 top-0 z-50">
      <div className="relative bg-white/70 shadow-[0_10px_45px_-32px_rgba(15,28,45,0.55)] backdrop-blur-xl after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/55 after:via-white/35 after:to-white/10 after:content-['']">
        {/* scroll progress line */}
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-foreground/10"
          aria-hidden
        />
        <div
          className="absolute left-0 top-0 h-[2px] bg-primary transition-[width]"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Scroll progress"
        />

        {/* header content */}
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            {/* rotating roles pill (decorative) */}
            <div
              aria-hidden
              className="relative flex items-center justify-center rounded-full border border-foreground/10 bg-white/40 px-5 py-2 text-sm font-medium text-foreground/80 backdrop-blur-sm overflow-hidden w-[200px] sm:w-[220px]"
            >
              <span
                key={titleIndex}
                className="absolute inset-0 flex items-center justify-center animate-fadeIn text-center"
              >
                {TITLES[titleIndex]}
              </span>
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold uppercase tracking-[0.3em] text-foreground/70 transition hover:text-foreground"
            >
              JS
            </Link>
          </div>

          {/* right area intentionally empty (previous pill removed) */}
          <div />
        </div>
      </div>
    </header>
  );
};
