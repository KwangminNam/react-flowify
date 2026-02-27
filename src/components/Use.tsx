import { use, type ReactNode } from "react";

interface UseProps<T> {
  promise: Promise<T>;
  children: (data: T) => ReactNode;
}

export function Use<T>({ promise, children }: UseProps<T>) {
  const data = use(promise);
  return <>{children(data)}</>;
}
