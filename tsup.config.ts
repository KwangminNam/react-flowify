import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  clean: true,
  minify: true,
  target: "es2020",
  external: ["react", "react-dom", "react-error-boundary"],
  banner: {
    js: '"use client";',
  },
});
