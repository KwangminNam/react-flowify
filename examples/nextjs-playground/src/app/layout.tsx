import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flowify Playground",
  description: "Interactive demo of all flowify components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
