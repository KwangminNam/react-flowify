"use client";

import { useState } from "react";
import { Deferred } from "flowify";

export default function DeferredDemo() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <Deferred value={text}>
        {(deferred) => (
          <p>
            Deferred: <strong>{deferred || "(empty)"}</strong>
          </p>
        )}
      </Deferred>
    </div>
  );
}
