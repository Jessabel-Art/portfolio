// src/App.tsx
import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

// Toast providers
import { Toaster as UiToaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";

import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* shadcn toaster (for <useToast/> etc.) */}
      <UiToaster />

      {/* sonner toaster */}
      <Sonner richColors position="top-center" />

      <BrowserRouter>
        <ErrorBoundary fallback={<div className="p-6 text-sm text-red-500">Something went wrong.</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route
                path="portfolio"
                element={
                  <PlaceholderPage
                    title="Portfolio Showcase"
                    description="We are ready to curate case studies, motion experiments, and interactive prototypes. Continue in chat to craft each story."
                  />
                }
              />
              <Route
                path="about"
                element={
                  <PlaceholderPage
                    title="About Jessabel"
                    description="Introduce the philosophy, journey, and values behind the work with your next prompt."
                  />
                }
              />
              <Route
                path="contact"
                element={
                  <PlaceholderPage
                    title="Contact"
                    description="Let's design the ideal collaboration workflow together. Add details with your next instruction."
                  />
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
