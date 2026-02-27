import type { SwitchProps } from "../types";

/**
 * Renders content based on a value matching a key in the `by` record.
 *
 * A declarative replacement for `switch` statements or chained ternaries
 * when selecting among multiple UI variants.
 *
 * @example
 * ```tsx
 * <Switch
 *   value={status}
 *   by={{
 *     idle: <IdleView />,
 *     loading: <Spinner />,
 *     error: <ErrorView />,
 *     success: <SuccessView />,
 *   }}
 * />
 * ```
 */
export function Switch<T extends string | number>({
  value,
  by,
}: SwitchProps<T>) {
  return <>{by[value] ?? null}</>;
}
