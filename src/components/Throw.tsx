import type { ThrowProps } from "../types";

/**
 * Immediately throws the provided error during render.
 *
 * Designed for use inside an `<ErrorBoundary>` to declaratively
 * trigger error states — useful for testing or conditional error throwing.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallbackRender={({ error }) => <p>{error.message}</p>}>
 *   <Throw error={new Error("Something went wrong")} />
 * </ErrorBoundary>
 * ```
 */
export function Throw({ error }: ThrowProps): never {
  throw error;
}

