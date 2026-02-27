import { Suspense, type ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

interface AsyncBoundaryProps {
  pendingFallback?: ReactNode;
  rejectedFallback?: (props: FallbackProps) => ReactNode;
  children: ReactNode;
}

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
