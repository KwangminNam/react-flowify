import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Each } from "../src/components/Each";

describe("Each", () => {
  it("renders items", () => {
    render(
      <Each items={["Alice", "Bob", "Charlie"]}>
        {(name) => <span>{name}</span>}
      </Each>
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("renders renderEmpty when items is empty", () => {
    render(
      <Each items={[]} renderEmpty={<span>No items</span>}>
        {(item) => <span>{String(item)}</span>}
      </Each>
    );
    expect(screen.getByText("No items")).toBeInTheDocument();
  });

  it("renders nothing when items is empty and no renderEmpty", () => {
    const { container } = render(
      <Each items={[]}>{(item) => <span>{String(item)}</span>}</Each>
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders separator between items", () => {
    const { container } = render(
      <Each items={["A", "B", "C"]} separator={<span data-testid="sep">|</span>}>
        {(item) => <span>{item}</span>}
      </Each>
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getAllByTestId("sep")).toHaveLength(2);
  });

  it("does not render separator for single item", () => {
    render(
      <Each items={["A"]} separator={<span data-testid="sep">|</span>}>
        {(item) => <span>{item}</span>}
      </Each>
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.queryByTestId("sep")).not.toBeInTheDocument();
  });

  it("provides index to render function", () => {
    render(
      <Each items={["A", "B"]}>
        {(item, index) => (
          <span>
            {index}: {item}
          </span>
        )}
      </Each>
    );
    expect(screen.getByText("0: A")).toBeInTheDocument();
    expect(screen.getByText("1: B")).toBeInTheDocument();
  });
});
