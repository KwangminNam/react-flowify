"use client";

import { useState } from "react";
import { Guard } from "flowify";

interface User {
  name: string;
  email: string;
}

export default function GuardDemo() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div>
      <button onClick={() => setUser({ name: "John", email: "john@test.com" })}>
        Login
      </button>
      <button onClick={() => setUser(null)}>Logout</button>

      <Guard when={user} fallback={<p>Not logged in</p>}>
        {(u) => (
          <p>
            Welcome, {u.name} ({u.email})
          </p>
        )}
      </Guard>
    </div>
  );
}
