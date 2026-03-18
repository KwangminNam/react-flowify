---
"react-flowify": minor
---

Add FormStatus render-prop component

- New `<FormStatus>` component that exposes React 19's `useFormStatus()` as a render prop
- Eliminates the need to create a separate child component just to read form submission state
- Provides full status object: `pending`, `data`, `method`, `action`
