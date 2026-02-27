import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Deferred } from "../src/components/Deferred";

describe("Deferred", () => {
  it("passes deferred value to children", () => {
    render(
      <Deferred value="hello">
        {(deferred) => <span>{deferred}</span>}
      </Deferred>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("works with numeric values", () => {
    render(
      <Deferred value={42}>
        {(deferred) => <span>{deferred}</span>}
      </Deferred>
    );
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("works with object values", () => {
    const obj = { name: "test" };
    render(
      <Deferred value={obj}>
        {(deferred) => <span>{deferred.name}</span>}
      </Deferred>
    );
    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
