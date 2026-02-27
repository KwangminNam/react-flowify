"use client";

import { useState } from "react";
import { OutsideClick } from "flowify";

export default function OutsideClickDemo() {
  const [clicks, setClicks] = useState(0);

  return (
    <div>
      <OutsideClick onOutsideClick={() => setClicks((c) => c + 1)}>
        <div
          style={{
            padding: 16,
            border: "2px dashed #666",
            display: "inline-block",
          }}
        >
          Click outside this box
        </div>
      </OutsideClick>
      <p>Outside clicks: {clicks}</p>
    </div>
  );
}
