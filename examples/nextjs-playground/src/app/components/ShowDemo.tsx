"use client";

import { useState } from "react";
import { Show } from "flowify";

export default function ShowDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>Toggle</button>

      <Show when={visible} fallback={<p>Hidden content</p>}>
        <p>Visible content!</p>
      </Show>
    </div>
  );
}
