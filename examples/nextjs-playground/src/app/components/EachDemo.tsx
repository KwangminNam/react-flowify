"use client";

import { useState } from "react";
import { Each } from "flowify";

export default function EachDemo() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);

  return (
    <div>
      <button onClick={() => setItems([])}>Clear</button>
      <button onClick={() => setItems(["Apple", "Banana", "Cherry"])}>
        Reset
      </button>

      <Each
        items={items}
        separator={<hr />}
        renderEmpty={<p>No items to display.</p>}
      >
        {(item, index) => (
          <p>
            {index + 1}. {item}
          </p>
        )}
      </Each>
    </div>
  );
}
