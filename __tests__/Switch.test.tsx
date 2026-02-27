import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Switch } from "../src/components/Switch";

describe("Switch", () => {
  it("renders the matching value", () => {
    render(
      <Switch
        value="a"
        by={{
          a: <span>Option A</span>,
          b: <span>Option B</span>,
          c: <span>Option C</span>,
        }}
      />
    );
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.queryByText("Option B")).not.toBeInTheDocument();
  });

  it("renders another matching value", () => {
    render(
      <Switch
        value="b"
        by={{
          a: <span>Option A</span>,
          b: <span>Option B</span>,
        }}
      />
    );
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  it("renders null when value key is not provided in by", () => {
    type Tab = "home" | "settings" | "about";
    const currentTab: Tab = "about";

    const { container } = render(
      <Switch<Tab>
        value={currentTab}
        by={{
          home: <span>Home</span>,
          settings: <span>Settings</span>,
        }}
      />
    );
    expect(container.innerHTML).toBe("");
  });

  it("works with numeric values", () => {
    render(
      <Switch
        value={2}
        by={{
          1: <span>One</span>,
          2: <span>Two</span>,
          3: <span>Three</span>,
        }}
      />
    );
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});
