"use client";

import { useState } from "react";
import { Transition } from "flowify";

export default function TransitionDemo() {
  const [count, setCount] = useState(0);

  return (
    <Transition fallback={<p>Transitioning...</p>}>
      {(isPending, startTransition) => (
        <div>
          <button
            disabled={isPending}
            onClick={() => startTransition(() => setCount((c) => c + 1))}
          >
            Count: {count}
          </button>
          {isPending && <span> (pending...)</span>}
        </div>
      )}
    </Transition>
  );
}
