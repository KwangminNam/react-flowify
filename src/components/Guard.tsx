import type { ReactNode } from "react";

interface GuardProps<T> {
  when: T | null | undefined | false | 0 | "";
  fallback?: ReactNode;
  children: (value: NonNullable<T>) => ReactNode;
}

export function Guard<T>({ when, fallback = null, children }: GuardProps<T>) {
  if (when) {
    return <>{children(when as NonNullable<T>)}</>;
  }
  return <>{fallback}</>;
}
