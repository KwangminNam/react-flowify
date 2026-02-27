import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ErrorBoundary } from "react-error-boundary";
import { Throw } from "../src/components/Throw";

describe("Throw", () => {
  it("throws error that is caught by ErrorBoundary", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary fallbackRender={({ error }) => <span>Caught: {error.message}</span>}>
        <Throw error={new Error("Test error")} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Caught: Test error")).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it("throws the exact error object provided", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const testError = new Error("Specific error");
    let caughtError: Error | null = null;

    render(
      <ErrorBoundary
        fallbackRender={({ error }) => {
          caughtError = error;
          return <span>Error caught</span>;
        }}
      >
        <Throw error={testError} />
      </ErrorBoundary>
    );

    expect(caughtError).toBe(testError);

    vi.restoreAllMocks();
  });
});
