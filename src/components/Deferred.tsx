import { useDeferredValue, type ReactNode } from "react";

interface DeferredProps<T> {
  value: T;
  children: (deferredValue: T) => ReactNode;
}

export function Deferred<T>({ value, children }: DeferredProps<T>) {
  const deferredValue = useDeferredValue(value);
  return <>{children(deferredValue)}</>;
}
