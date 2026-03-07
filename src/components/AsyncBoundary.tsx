import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { AsyncBoundaryProps } from "../types";

/**
 * Combines React `<Suspense>` and `<ErrorBoundary>` into a single declarative boundary.
 *
 * @example
 * ```tsx
 * <AsyncBoundary
 *   suspense={{ fallback: <Skeleton /> }}
 *   errorBoundary={{
 *     fallbackRender: ({ error, resetErrorBoundary }) => (
 *       <div>
 *         <p>Error: {error.message}</p>
 *         <button onClick={resetErrorBoundary}>Retry</button>
 *       </div>
 *     ),
 *     onError: (error) => console.error(error),
 *     resetKeys: [queryKey],
 *   }}
 * >
 *   <Use promise={fetchData()}>
 *     {(data) => <DataView data={data} />}
 *   </Use>
 * </AsyncBoundary>
 * ```
 */
export function AsyncBoundary({
  suspense,
  errorBoundary,
  children,
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary {...errorBoundary}>
      <Suspense fallback={suspense?.fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
