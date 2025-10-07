import { useEffect, useMemo, useState } from "react";

export const useSectionObserver = (
  sectionIds: string[],
  options?: IntersectionObserverInit,
) => {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  const observerOptions = useMemo<IntersectionObserverInit>(() => {
    return {
      root: null,
      threshold: options?.threshold ?? 0.4,
      rootMargin: options?.rootMargin ?? "-45% 0px -45% 0px",
    };
  }, [options?.rootMargin, options?.threshold]);

  useEffect(() => {
    if (sectionIds.length === 0 || typeof window === "undefined") {
      return undefined;
    }

    const elements = sectionIds
      .map((id) => ({ id, element: document.getElementById(id) }))
      .filter((entry): entry is { id: string; element: Element } =>
        Boolean(entry.element),
      );

    if (elements.length === 0) {
      return undefined;
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      const intersectingEntries = entries.filter(
        (entry) => entry.isIntersecting,
      );

      if (intersectingEntries.length === 0) {
        return;
      }

      const sorted = intersectingEntries.sort(
        (a, b) =>
          (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0),
      );
      const firstVisible = sorted[0];
      const matched = elements.find(
        (item) => item.element === firstVisible.target,
      );

      if (matched) {
        setActiveId(matched.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    elements.forEach((entry) => observer.observe(entry.element));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, observerOptions]);

  return activeId;
};
