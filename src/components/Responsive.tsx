import { useState, useEffect, type PropsWithChildren } from "react";
import type { ResponsiveProps } from "../types";

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
 * Renders children only on mobile viewports.
 * Default: max-width 767px. Override with `breakpoint`.
 *
 * @example
 * ```tsx
 * <Responsive.Mobile>Phone UI</Responsive.Mobile>
 * <Responsive.Mobile breakpoint={639}>Small phone only</Responsive.Mobile>
 * ```
 */
function Mobile({ children, breakpoint = 767 }: PropsWithChildren & { breakpoint?: number }) {
  return (
    <ResponsiveBase query={`(max-width: ${breakpoint}px)`}>
      {children}
    </ResponsiveBase>
  );
}

/**
 * Renders children only on desktop viewports.
 * Default: min-width 768px. Override with `breakpoint`.
 *
 * @example
 * ```tsx
 * <Responsive.Desktop>Desktop UI</Responsive.Desktop>
 * <Responsive.Desktop breakpoint={1024}>Large screens only</Responsive.Desktop>
 * ```
 */
function Desktop({ children, breakpoint = 768 }: PropsWithChildren & { breakpoint?: number }) {
  return (
    <ResponsiveBase query={`(min-width: ${breakpoint}px)`}>
      {children}
    </ResponsiveBase>
  );
}

export const Responsive = Object.assign(ResponsiveBase, {
  Mobile,
  Desktop,
});
