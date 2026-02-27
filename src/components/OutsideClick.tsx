import { useRef, useEffect } from "react";
import type { OutsideClickProps } from "../types";

/**
 * Detects clicks outside of its children and fires a callback.
 *
 * Useful for closing dropdowns, modals, or popovers when the user
 * clicks elsewhere on the page.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(true);
 *
 * <OutsideClick onOutsideClick={() => setOpen(false)}>
 *   <Dropdown />
 * </OutsideClick>
 * ```
 */
export function OutsideClick({ onOutsideClick, children }: OutsideClickProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (
        ref.current !== null &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [onOutsideClick]);

  return <div ref={ref}>{children}</div>;
}
