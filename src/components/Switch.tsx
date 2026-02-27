import type { ReactNode } from "react";

interface SwitchProps<T extends string | number> {
  value: T;
  by: Partial<Record<T, ReactNode>>;
}

export function Switch<T extends string | number>({
  value,
  by,
}: SwitchProps<T>) {
  return <>{by[value] ?? null}</>;
}
