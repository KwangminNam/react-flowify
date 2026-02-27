import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Transition } from "../src/components/Transition";

describe("Transition", () => {
  it("renders children with isPending=false initially", () => {
    render(
      <Transition fallback={<span>Pending...</span>}>
        {(isPending, _startTransition) => (
          <span>{isPending ? "Updating..." : "Ready"}</span>
        )}
      </Transition>
    );
    expect(screen.getByText("Ready")).toBeInTheDocument();
  });

  it("provides startTransition function to children", () => {
    let capturedStartTransition: any;

    render(
      <Transition>
        {(_isPending, startTransition) => {
          capturedStartTransition = startTransition;
          return <span>Content</span>;
        }}
      </Transition>
    );

    expect(capturedStartTransition).toBeInstanceOf(Function);
  });
});
