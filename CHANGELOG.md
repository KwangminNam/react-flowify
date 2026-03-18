# react-flowify

## 0.2.0

### Minor Changes

- a88537a: Add FormStatus render-prop component

  - New `<FormStatus>` component that exposes React 19's `useFormStatus()` as a render prop
  - Eliminates the need to create a separate child component just to read form submission state
  - Provides full status object: `pending`, `data`, `method`, `action`

### Patch Changes

- 9db4555: Optimize bundle output and add RSC support

  - Enable minification (ESM 4.4KB → 2.4KB, CJS 6.2KB → 3.0KB, ~48% reduction)
  - Add "use client" banner for React Server Components compatibility
  - Add verbatimModuleSyntax to prevent type leaking into runtime bundle

## 0.1.3

### Patch Changes

- e6bdd64: fix: update peerDependencies to require react >= 19 and add README documentation

## 0.1.2

### Patch Changes

- a7d21b7: Support readonly arrays in Each component items prop

## 0.1.1

### Patch Changes

- 3715856: Change AsyncBoundary errorBoundary prop to use fallback (ReactNode) instead of fallbackRender (function) for Server Component compatibility

## 0.1.0

### Minor Changes

- c54296c: Initial release with Guard, Show, Switch, Use, AsyncBoundary, Each, OutsideClick, Responsive, Throw, Suspend components
