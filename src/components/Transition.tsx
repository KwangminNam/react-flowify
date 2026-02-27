import { useTransition } from "react";
import type { TransitionProps } from "../types";

/**
 * Provides `useTransition()` state as a declarative render-prop component.
 *
 * Gives children access to `isPending` and `startTransition` without
 * needing a separate hook call. Optionally renders a fallback while a
 * transition is pending.
 *
 * @example
 * ```tsx
 * <Transition fallback={<Spinner />}>
 *   {(isPending, startTransition) => (
 *     <button
 *       disabled={isPending}
 *       onClick={() => startTransition(() => setTab("posts"))}
 *     >
 *       Show Posts
 *     </button>
 *   )}
 * </Transition>
 * ```
 */
export function Transition({ fallback, children }: TransitionProps) {
  const [isPending, startTransition] = useTransition();

  if (isPending && fallback) {
    return <>{fallback}</>;
  }

  return <>{children(isPending, startTransition)}</>;
}
