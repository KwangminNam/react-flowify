import type { GuardProps } from "../types";

/**
 * Conditionally renders children with a narrowed, non-nullable value.
 *
 * Unlike `<Show>`, `<Guard>` narrows the type of `when` so the render-prop
 * receives `NonNullable<T>` — eliminating null/undefined checks inside children.
 *
 * @example
 * ```tsx
 * const user: User | null = useUser();
 *
 * <Guard when={user} fallback={<Login />}>
 *   {(u) => <Profile name={u.name} />}
 * </Guard>
 * ```
 */
export function Guard<T>({ when, fallback = null, children }: GuardProps<T>) {
  if (when != null && when !== false && when !== 0 && when !== "") {
    return <>{children(when)}</>;
  }
  return <>{fallback}</>;
}
