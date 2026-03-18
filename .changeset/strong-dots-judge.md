---
"react-flowify": patch
---

Optimize bundle output and add RSC support

- Enable minification (ESM 4.4KB → 2.4KB, CJS 6.2KB → 3.0KB, ~48% reduction)
- Add "use client" banner for React Server Components compatibility
- Add verbatimModuleSyntax to prevent type leaking into runtime bundle
