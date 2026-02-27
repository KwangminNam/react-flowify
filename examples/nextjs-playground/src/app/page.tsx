"use client";

import dynamic from "next/dynamic";
import GuardDemo from "./components/GuardDemo";
import ShowDemo from "./components/ShowDemo";
import SwitchDemo from "./components/SwitchDemo";
import TransitionDemo from "./components/TransitionDemo";
import DeferredDemo from "./components/DeferredDemo";
import EachDemo from "./components/EachDemo";
import OutsideClickDemo from "./components/OutsideClickDemo";
import ResponsiveDemo from "./components/ResponsiveDemo";
import ThrowDemo from "./components/ThrowDemo";

const UseDemo = dynamic(() => import("./components/UseDemo"), { ssr: false });
const AsyncBoundaryDemo = dynamic(
  () => import("./components/AsyncBoundaryDemo"),
  { ssr: false }
);
const SuspendDemo = dynamic(() => import("./components/SuspendDemo"), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: 32 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Flowify Playground</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Interactive demo of all flowify components
      </p>

      <Section title="Guard">
        <GuardDemo />
      </Section>
      <Section title="Show">
        <ShowDemo />
      </Section>
      <Section title="Switch">
        <SwitchDemo />
      </Section>
      <Section title="Use">
        <UseDemo />
      </Section>
      <Section title="AsyncBoundary">
        <AsyncBoundaryDemo />
      </Section>
      <Section title="Transition">
        <TransitionDemo />
      </Section>
      <Section title="Deferred">
        <DeferredDemo />
      </Section>
      <Section title="Each">
        <EachDemo />
      </Section>
      <Section title="OutsideClick">
        <OutsideClickDemo />
      </Section>
      <Section title="Responsive">
        <ResponsiveDemo />
      </Section>
      <Section title="Throw">
        <ThrowDemo />
      </Section>
      <Section title="Suspend">
        <SuspendDemo />
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        borderBottom: "1px solid #eee",
        paddingBottom: 16,
        marginBottom: 16,
      }}
    >
      <h2 style={{ fontSize: 20, marginBottom: 8 }}>{title}</h2>
      {children}
    </section>
  );
}
