import { useDeferredValue } from "react";
import type { DeferredProps } from "../types";

/**
 * Wraps `useDeferredValue()` as a declarative render-prop component.
 *
 * Passes the deferred (lower-priority) version of `value` to children,
 * allowing expensive re-renders to yield to more urgent updates.
 *
 * @example
 * ```tsx
 * const [query, setQuery] = useState("");
 *
 * <input value={query} onChange={(e) => setQuery(e.target.value)} />
 * <Deferred value={query}>
 *   {(deferredQuery) => <SearchResults query={deferredQuery} />}
 * </Deferred>
 * ```
 */
export function Deferred<T>({ value, children }: DeferredProps<T>) {
  const deferredValue = useDeferredValue(value);
  return <>{children(deferredValue)}</>;
}
