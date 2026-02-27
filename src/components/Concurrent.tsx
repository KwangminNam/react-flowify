import { Deferred } from "./Deferred";
import { Transition } from "./Transition";

/**
 * Namespace grouping for React Concurrent-related components.
 *
 * Groups `Deferred` and `Transition` under a single namespace
 * to clarify their relationship with React's Concurrent Rendering.
 *
 * @example
 * ```tsx
 * <Concurrent.Deferred value={query}>
 *   {(deferredQuery) => <SearchResults query={deferredQuery} />}
 * </Concurrent.Deferred>
 *
 * <Concurrent.Transition fallback={<Spinner />}>
 *   {(isPending, startTransition) => (
 *     <button onClick={() => startTransition(() => setTab("posts"))}>
 *       Show Posts
 *     </button>
 *   )}
 * </Concurrent.Transition>
 * ```
 */
export const Concurrent = {
  Deferred,
  Transition,
};
