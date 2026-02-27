"use client";

import { useState } from "react";
import { Switch } from "flowify";

type Tab = "home" | "profile" | "settings";

export default function SwitchDemo() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setTab("home")}>Home</button>
        <button onClick={() => setTab("profile")}>Profile</button>
        <button onClick={() => setTab("settings")}>Settings</button>
      </div>

      <Switch<Tab>
        value={tab}
        by={{
          home: <p>Home Page</p>,
          profile: <p>Profile Page</p>,
          settings: <p>Settings Page</p>,
        }}
      />
    </div>
  );
}
