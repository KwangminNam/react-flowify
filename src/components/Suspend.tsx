/**
 * A thenable that never resolves.
 * When thrown inside a React component wrapped with Suspense,
 * it causes the Suspense boundary to stay in suspended state indefinitely.
 */
const infiniteThenable = { then() {} };

/**
 * Suspends indefinitely when rendered.
 *
 * Throws a never-resolving thenable, keeping the nearest `<Suspense>`
 * boundary in its fallback state forever — useful for testing,
 * storybook demonstrations, or placeholder layouts.
 *
 * @example
 * ```tsx
 * <Suspense fallback={<Skeleton />}>
 *   <Suspend />
 * </Suspense>
 * ```
 */
export const Suspend = Object.assign(
  (): null => {
    throw infiniteThenable;
  },
  {
    displayName: "Suspend",
  }
);
