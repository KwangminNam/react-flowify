import { useRef, useEffect, type ReactNode } from "react";

interface OutsideClickProps {
  onOutsideClick: () => void;
  children: ReactNode;
}

export function OutsideClick({ onOutsideClick, children }: OutsideClickProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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
