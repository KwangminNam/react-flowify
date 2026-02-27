"use client";

import { Suspense } from "react";
import { Use } from "flowify";

const dataPromise = new Promise<string>((resolve) =>
  setTimeout(() => resolve("Data loaded from promise!"), 1500)
);

export default function UseDemo() {
  return (
    <Suspense fallback={<p>Loading promise data...</p>}>
      <Use promise={dataPromise}>{(data) => <p>{data}</p>}</Use>
    </Suspense>
  );
}
