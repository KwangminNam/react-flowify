"use client";

import { Responsive } from "flowify";

export default function ResponsiveDemo() {
  return (
    <div>
      <Responsive.Mobile>
        <p>Mobile viewport (max-width: 767px)</p>
      </Responsive.Mobile>
      <Responsive.Desktop>
        <p>Desktop viewport (min-width: 768px)</p>
      </Responsive.Desktop>
    </div>
  );
}
