import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="hero-surface flex min-h-screen items-center justify-center bg-grid-soft bg-background px-6 py-16">
      <div className="flex w-full max-w-xl flex-col items-center gap-6 rounded-[2.5rem] border border-foreground/10 bg-white/70 p-12 text-center backdrop-blur-lg">
        <span className="rounded-full border border-foreground/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-foreground/50">
          404
        </span>
        <h1 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          Page under construction
        </h1>
        <p className="text-base text-foreground/70 sm:text-lg">
          The path{" "}
          <span className="font-mono text-sm">{location.pathname}</span>{" "}
          hasn&apos;t been crafted yet. Please head back and continue building
          the experience.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2 text-sm font-medium text-foreground/70 transition hover:border-foreground/40 hover:text-foreground"
        >
          Return home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
