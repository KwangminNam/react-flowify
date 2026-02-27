"use client";

import { use } from "react";
import { AsyncBoundary } from "flowify";

const slowPromise = new Promise<string>((resolve) =>
  setTimeout(() => resolve("Async data arrived!"), 2000)
);

function AsyncChild() {
  const data = use(slowPromise);
  return <p>{data}</p>;
}

export default function AsyncBoundaryDemo() {
  return (
    <AsyncBoundary
      pendingFallback={<p>Loading async boundary...</p>}
      rejectedFallback={({ error }) => (
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
      )}
    >
      <AsyncChild />
    </AsyncBoundary>
  );
}
