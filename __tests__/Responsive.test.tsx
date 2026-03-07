import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Responsive } from "../src/components/Responsive";

describe("Responsive", () => {
  let listeners: Map<string, (e: MediaQueryListEvent) => void>;
  let matchesMap: Map<string, boolean>;

  beforeEach(() => {
    listeners = new Map();
    matchesMap = new Map();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: matchesMap.get(query) ?? false,
        media: query,
        addEventListener: (_event: string, handler: (e: MediaQueryListEvent) => void) => {
          listeners.set(query, handler);
        },
        removeEventListener: (_event: string, _handler: (e: MediaQueryListEvent) => void) => {
          listeners.delete(query);
        },
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children when query matches", () => {
    matchesMap.set("(min-width: 768px)", true);
    render(
      <Responsive query="(min-width: 768px)">
        <span>Desktop</span>
      </Responsive>
    );
    expect(screen.getByText("Desktop")).toBeInTheDocument();
  });

  it("does not render children when query does not match", () => {
    matchesMap.set("(min-width: 768px)", false);
    const { container } = render(
      <Responsive query="(min-width: 768px)">
        <span>Desktop</span>
      </Responsive>
    );
    expect(container.innerHTML).toBe("");
  });

  it("responds to media query changes", () => {
    matchesMap.set("(min-width: 768px)", false);
    const { container } = render(
      <Responsive query="(min-width: 768px)">
        <span>Desktop</span>
      </Responsive>
    );
    expect(container.innerHTML).toBe("");

    act(() => {
      const handler = listeners.get("(min-width: 768px)");
      if (handler) {
        handler({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(screen.getByText("Desktop")).toBeInTheDocument();
  });

  it("Responsive.Mobile renders with default breakpoint (767px)", () => {
    matchesMap.set("(max-width: 767px)", true);
    render(
      <Responsive.Mobile>
        <span>Mobile</span>
      </Responsive.Mobile>
    );
    expect(screen.getByText("Mobile")).toBeInTheDocument();
  });

  it("Responsive.Mobile accepts custom breakpoint", () => {
    matchesMap.set("(max-width: 639px)", true);
    render(
      <Responsive.Mobile breakpoint={639}>
        <span>Small mobile</span>
      </Responsive.Mobile>
    );
    expect(screen.getByText("Small mobile")).toBeInTheDocument();
  });

  it("Responsive.Desktop renders with default breakpoint (768px)", () => {
    matchesMap.set("(min-width: 768px)", true);
    render(
      <Responsive.Desktop>
        <span>Desktop</span>
      </Responsive.Desktop>
    );
    expect(screen.getByText("Desktop")).toBeInTheDocument();
  });

  it("Responsive.Desktop accepts custom breakpoint", () => {
    matchesMap.set("(min-width: 1024px)", true);
    render(
      <Responsive.Desktop breakpoint={1024}>
        <span>Large desktop</span>
      </Responsive.Desktop>
    );
    expect(screen.getByText("Large desktop")).toBeInTheDocument();
  });
});
