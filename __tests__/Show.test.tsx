import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Show } from "../src/components/Show";

describe("Show", () => {
  it("renders children when `when` is true", () => {
    render(
      <Show when={true}>
        <span>Visible</span>
      </Show>
    );
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });

  it("renders fallback when `when` is false", () => {
    render(
      <Show when={false} fallback={<span>Hidden</span>}>
        <span>Visible</span>
      </Show>
    );
    expect(screen.getByText("Hidden")).toBeInTheDocument();
    expect(screen.queryByText("Visible")).not.toBeInTheDocument();
  });

  it("renders nothing when `when` is false and no fallback", () => {
    const { container } = render(
      <Show when={false}>
        <span>Visible</span>
      </Show>
    );
    expect(container.innerHTML).toBe("");
  });
});
