import { useState, useEffect, type ReactNode } from "react";

interface ResponsiveProps {
  query: string;
  children: ReactNode;
}

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

function ResponsiveBase({ query, children }: ResponsiveProps) {
  const matches = useMediaQuery(query);
  return matches ? <>{children}</> : null;
}

function Mobile({ children }: { children: ReactNode }) {
  return (
    <ResponsiveBase query="(max-width: 767px)">{children}</ResponsiveBase>
  );
}

function Desktop({ children }: { children: ReactNode }) {
  return (
    <ResponsiveBase query="(min-width: 768px)">{children}</ResponsiveBase>
  );
}

export const Responsive = Object.assign(ResponsiveBase, {
  Mobile,
  Desktop,
});
