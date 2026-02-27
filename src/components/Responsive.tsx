import { useState, useEffect } from "react";
import type { ResponsiveProps, WithChildren } from "../types";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Conditionally renders children based on a CSS media query.
 *
 * Uses `window.matchMedia` and listens for changes, re-rendering
 * when the query match state changes.
 *
 * @example
 * ```tsx
 * <Responsive query="(min-width: 1024px)">
 *   <DesktopNav />
 * </Responsive>
 * ```
 */
function ResponsiveBase({ query, children }: ResponsiveProps) {
  const matches = useMediaQuery(query);
  return matches ? <>{children}</> : null;
}

/**
 * Renders children only on mobile viewports (max-width: 767px).
 *
 * @example
 * ```tsx
 * <Responsive.Mobile>
 *   <MobileMenu />
 * </Responsive.Mobile>
 * ```
 */
function Mobile({ children }: WithChildren) {
  return (
    <ResponsiveBase query="(max-width: 767px)">{children}</ResponsiveBase>
  );
}

/**
 * Renders children only on desktop viewports (min-width: 768px).
 *
 * @example
 * ```tsx
 * <Responsive.Desktop>
 *   <Sidebar />
 * </Responsive.Desktop>
 * ```
 */
function Desktop({ children }: WithChildren) {
  return (
    <ResponsiveBase query="(min-width: 768px)">{children}</ResponsiveBase>
  );
}

export const Responsive = Object.assign(ResponsiveBase, {
  Mobile,
  Desktop,
});
