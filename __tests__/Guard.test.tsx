import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Guard } from "../src/components/Guard";

describe("Guard", () => {
  it("renders children with NonNullable value when `when` is truthy", () => {
    const user = { name: "Alice" };
    render(
      <Guard when={user}>{(u) => <span>{u.name}</span>}</Guard>
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("renders fallback when `when` is null", () => {
    render(
      <Guard when={null} fallback={<span>No user</span>}>
        {(u) => <span>{String(u)}</span>}
      </Guard>
    );
    expect(screen.getByText("No user")).toBeInTheDocument();
  });

  it("renders fallback when `when` is undefined", () => {
    render(
      <Guard when={undefined} fallback={<span>Fallback</span>}>
        {(u) => <span>{String(u)}</span>}
      </Guard>
    );
    expect(screen.getByText("Fallback")).toBeInTheDocument();
  });

  it("renders fallback when `when` is false", () => {
    render(
      <Guard when={false} fallback={<span>Fallback</span>}>
        {(v) => <span>{String(v)}</span>}
      </Guard>
    );
    expect(screen.getByText("Fallback")).toBeInTheDocument();
  });

  it("renders nothing when `when` is falsy and no fallback provided", () => {
    const { container } = render(
      <Guard when={null}>{(v) => <span>{String(v)}</span>}</Guard>
    );
    expect(container.innerHTML).toBe("");
  });

  it("passes non-nullable string value to children", () => {
    render(
      <Guard when="hello">{(value) => <span>{value}</span>}</Guard>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("passes non-nullable number value to children", () => {
    render(
      <Guard when={42}>{(value) => <span>{value}</span>}</Guard>
    );
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
