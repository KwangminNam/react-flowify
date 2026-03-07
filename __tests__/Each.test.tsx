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

  it("provides meta with index, isFirst, isLast, length", () => {
    render(
      <Each items={["A", "B", "C"]}>
        {(item, meta) => (
          <span data-testid={`item-${meta.index}`}>
            {item}:idx={meta.index},first={String(meta.isFirst)},last=
            {String(meta.isLast)},len={meta.length}
          </span>
        )}
      </Each>
    );

    expect(screen.getByTestId("item-0").textContent).toContain(
      "A:idx=0,first=true,last=false,len=3"
    );
    expect(screen.getByTestId("item-1").textContent).toContain(
      "B:idx=1,first=false,last=false,len=3"
    );
    expect(screen.getByTestId("item-2").textContent).toContain(
      "C:idx=2,first=false,last=true,len=3"
    );
  });

});
