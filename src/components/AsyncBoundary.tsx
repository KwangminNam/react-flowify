import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { AsyncBoundaryProps } from "../types";

/**
 * Combines React `<Suspense>` and `<ErrorBoundary>` into a single declarative boundary.
 *
 * Handles both pending (loading) and rejected (error) states of async children,
 * reducing boilerplate when using async components or `<Use>`.
 *
 * @example
 * ```tsx
 * <AsyncBoundary
 *   pendingFallback={<Skeleton />}
 *   rejectedFallback={({ error, resetErrorBoundary }) => (
 *     <div>
 *       <p>Error: {error.message}</p>
 *       <button onClick={resetErrorBoundary}>Retry</button>
 *     </div>
 *   )}
 * >
 *   <Use promise={fetchData()}>
 *     {(data) => <DataView data={data} />}
 *   </Use>
 * </AsyncBoundary>
 * ```
 */
export function AsyncBoundary({
  pendingFallback,
  rejectedFallback,
  children,
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={
        rejectedFallback ??
        (({ error }) => <span>Error: {String(error)}</span>)
      }
    >
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
