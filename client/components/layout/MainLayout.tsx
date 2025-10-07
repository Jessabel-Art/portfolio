import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";

export const MainLayout = () => {
  return (
    <div className="hero-surface bg-grid-soft min-h-dvh bg-background text-foreground">
      {/* a11y: skip nav */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow"
      >
        Skip to content
      </a>

      <Header />

      {/* scroll-padding keeps anchored sections visible below sticky header */}
      <main
        id="main"
        className="mx-auto w-full max-w-[1200px] flex-1 px-6 pb-16 pt-4 sm:px-8 has-sticky-scroll"
      >
        <Outlet />
      </main>
    </div>
  );
};
