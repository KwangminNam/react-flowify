import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AsyncBoundary } from "../src/components/AsyncBoundary";
import { Throw } from "../src/components/Throw";
import { Suspend } from "../src/components/Suspend";

describe("AsyncBoundary", () => {
  it("renders children normally", () => {
    render(
      <AsyncBoundary
        suspense={{ fallback: <span>Loading...</span> }}
        errorBoundary={{
          fallbackRender: ({ error }) => <span>Error: {error.message}</span>,
        }}
      >
        <span>Content</span>
      </AsyncBoundary>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders suspense fallback when children suspend", () => {
    render(
      <AsyncBoundary suspense={{ fallback: <span>Loading...</span> }}>
        <Suspend />
      </AsyncBoundary>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders errorBoundary fallback when children throw", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <AsyncBoundary
        errorBoundary={{
          fallbackRender: ({ error }) => (
            <span>Caught: {error.message}</span>
          ),
        }}
      >
        <Throw error={new Error("Test error")} />
      </AsyncBoundary>
    );
    expect(screen.getByText("Caught: Test error")).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it("calls onError when children throw", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const onError = vi.fn();

    render(
      <AsyncBoundary
        errorBoundary={{
          fallbackRender: () => <span>Error</span>,
          onError,
        }}
      >
        <Throw error={new Error("Test error")} />
      </AsyncBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Test error" }),
      expect.objectContaining({ componentStack: expect.any(String) })
    );

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
        <AsyncBoundary suspense={{ fallback: <span>Loading...</span> }}>
          <AsyncChild />
        </AsyncBoundary>
      );
    });

    expect(screen.getByText("Async data")).toBeInTheDocument();
  });
});
