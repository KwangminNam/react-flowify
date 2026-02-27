import type { ShowProps } from "../types";

/**
 * Conditionally renders children based on a boolean condition.
 *
 * A declarative replacement for `{condition && <Component />}` or
 * ternary `{condition ? <A /> : <B />}` patterns.
 *
 * @example
 * ```tsx
 * <Show when={isLoggedIn} fallback={<LoginButton />}>
 *   <Dashboard />
 * </Show>
 * ```
 */
export function Show({ when, fallback = null, children }: ShowProps) {
  return <>{when ? children : fallback}</>;
}
