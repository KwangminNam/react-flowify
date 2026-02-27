import { use } from "react";
import type { UseProps } from "../types";

/**
 * Unwraps a Promise using React 19's `use()` hook and passes the resolved
 * value to the render-prop children.
 *
 * Must be wrapped in `<Suspense>` to show a fallback while the promise is pending.
 *
 * @example
 * ```tsx
 * const dataPromise = fetchUser(id);
 *
 * <Suspense fallback={<Spinner />}>
 *   <Use promise={dataPromise}>
 *     {(user) => <UserCard name={user.name} />}
 *   </Use>
 * </Suspense>
 * ```
 */
export function Use<T>({ promise, children }: UseProps<T>) {
  const data = use(promise);
  return <>{children(data)}</>;
}
