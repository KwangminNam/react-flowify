import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AsyncBoundary } from "../src/components/AsyncBoundary";
import { Throw } from "../src/components/Throw";
import { Suspend } from "../src/components/Suspend";

describe("AsyncBoundary", () => {
  it("renders children normally", () => {
    render(
      <AsyncBoundary
        pendingFallback={<span>Loading...</span>}
        rejectedFallback={({ error }) => <span>Error: {error.message}</span>}
      >
        <span>Content</span>
      </AsyncBoundary>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders pendingFallback when children suspend", () => {
    render(
      <AsyncBoundary
        pendingFallback={<span>Loading...</span>}
        rejectedFallback={({ error }) => <span>Error: {error.message}</span>}
      >
        <Suspend />
      </AsyncBoundary>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders rejectedFallback when children throw", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <AsyncBoundary
        pendingFallback={<span>Loading...</span>}
        rejectedFallback={({ error }) => <span>Caught: {error.message}</span>}
      >
        <Throw error={new Error("Test error")} />
      </AsyncBoundary>
    );
    expect(screen.getByText("Caught: Test error")).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it("renders resolved async content", async () => {
    const promise = Promise.resolve("Async data");

    function AsyncChild() {
      const { use } = require("react");
      const data = use(promise);
      return <span>{data}</span>;
    }

    await act(async () => {
      render(
        <AsyncBoundary
          pendingFallback={<span>Loading...</span>}
          rejectedFallback={({ error }) => <span>Error: {error.message}</span>}
        >
          <AsyncChild />
        </AsyncBoundary>
      );
    });

    expect(screen.getByText("Async data")).toBeInTheDocument();
  });
});
