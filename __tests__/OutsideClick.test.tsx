import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { OutsideClick } from "../src/components/OutsideClick";

describe("OutsideClick", () => {
  it("calls onOutsideClick when clicking outside", () => {
    const handler = vi.fn();
    render(
      <div>
        <OutsideClick onOutsideClick={handler}>
          <span>Inside</span>
        </OutsideClick>
        <span>Outside</span>
      </div>
    );

    fireEvent.mouseDown(screen.getByText("Outside"));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("does not call onOutsideClick when clicking inside", () => {
    const handler = vi.fn();
    render(
      <OutsideClick onOutsideClick={handler}>
        <span>Inside</span>
      </OutsideClick>
    );

    fireEvent.mouseDown(screen.getByText("Inside"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("cleans up event listener on unmount", () => {
    const handler = vi.fn();
    const spy = vi.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <OutsideClick onOutsideClick={handler}>
        <span>Inside</span>
      </OutsideClick>
    );

    unmount();
    expect(spy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    spy.mockRestore();
  });
});
