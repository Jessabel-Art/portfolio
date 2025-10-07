// src/components/ui/sonner.tsx
import React from "react";
import { Toaster as SonnerToaster, type ToasterProps, toast } from "sonner";
import { useTheme } from "next-themes";

// Optional: re-export the toast fn so app code can do `sonnerToast(...)`
export { toast as sonnerToast };

/**
 * Named `Sonner` so it never collides with shadcn's `Toaster`.
 * Import in App.tsx as:  import { Sonner } from "@/components/ui/sonner";
 */
export function Sonner(props: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

export default Sonner;
