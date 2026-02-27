"use client";

import { Suspense } from "react";
import { Suspend } from "flowify";

export default function SuspendDemo() {
  return (
    <Suspense fallback={<p>Suspended forever (this fallback stays)</p>}>
      <Suspend />
    </Suspense>
  );
}
