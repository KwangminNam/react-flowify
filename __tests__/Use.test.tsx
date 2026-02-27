import { render, screen, act, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { describe, it, expect } from "vitest";
import { Use } from "../src/components/Use";

describe("Use", () => {
  it("renders children with resolved promise data", async () => {
    const promise = Promise.resolve("Hello World");

    await act(async () => {
      render(
        <Suspense fallback={<span>Loading...</span>}>
          <Use promise={promise}>
            {(data) => <span>{data}</span>}
          </Use>
        </Suspense>
      );
    });

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("shows suspense fallback while promise is pending", () => {
    const promise = new Promise<string>(() => {});

    render(
      <Suspense fallback={<span>Loading...</span>}>
        <Use promise={promise}>
          {(data) => <span>{data}</span>}
        </Use>
      </Suspense>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
