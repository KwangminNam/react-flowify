import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { describe, it, expect } from "vitest";
import { Suspend } from "../src/components/Suspend";

describe("Suspend", () => {
  it("shows Suspense fallback", () => {
    render(
      <Suspense fallback={<span>Loading forever...</span>}>
        <Suspend />
      </Suspense>
    );

    expect(screen.getByText("Loading forever...")).toBeInTheDocument();
  });

  it("never resolves, keeping fallback visible", () => {
    render(
      <Suspense fallback={<span>Suspended</span>}>
        <Suspend />
      </Suspense>
    );

    expect(screen.getByText("Suspended")).toBeInTheDocument();
  });
});
