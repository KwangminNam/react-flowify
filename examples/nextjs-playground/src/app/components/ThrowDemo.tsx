"use client";

import { useState } from "react";
import { Throw } from "flowify";
import { ErrorBoundary } from "react-error-boundary";

export default function ThrowDemo() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <button onClick={() => setShouldThrow(true)}>Trigger Error</button>

      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div>
            <p style={{ color: "red" }}>
              Caught: {error instanceof Error ? error.message : String(error)}
            </p>
            <button
              onClick={() => {
                setShouldThrow(false);
                resetErrorBoundary();
              }}
            >
              Reset
            </button>
          </div>
        )}
      >
        {shouldThrow && <Throw error={new Error("Intentional error!")} />}
        <p>No error yet.</p>
      </ErrorBoundary>
    </div>
  );
}
