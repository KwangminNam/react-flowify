import type { ReactNode, TransitionStartFunction } from "react";
import type { FallbackProps } from "react-error-boundary";

// ──────────────────────────────────────────────
// Core render function types
// ──────────────────────────────────────────────

/** A render function that receives a value and returns JSX. */
export type RenderProp<T> = (value: T) => ReactNode;

/** A render function that receives a value and its index, returns JSX. */
export type IndexedRenderProp<T> = (value: T, index: number) => ReactNode;

// ──────────────────────────────────────────────
// Common prop patterns
// ──────────────────────────────────────────────

/** Props that include an optional fallback ReactNode. */
export interface WithFallback {
  fallback?: ReactNode;
}

/** Props that accept static children (ReactNode). */
export interface WithChildren {
  children: ReactNode;
}

/** Props that accept a render-prop children with a single argument. */
export interface WithRenderProp<T> {
  children: RenderProp<T>;
}

/** Props that accept a render-prop children with value and index. */
export interface WithIndexedRenderProp<T> {
  children: IndexedRenderProp<T>;
}

// ──────────────────────────────────────────────
// Component-specific prop types
// ──────────────────────────────────────────────

export interface GuardProps<T> extends WithFallback {
  when: T | null | undefined | false | 0 | "";
  children: RenderProp<NonNullable<T>>;
}

export interface ShowProps extends WithFallback, WithChildren {
  when: boolean;
}

export interface SwitchProps<T extends string | number> {
  value: NoInfer<T>;
  by: Partial<Record<T, ReactNode>>;
}

export interface UseProps<T> extends WithRenderProp<T> {
  promise: Promise<T>;
}

export interface AsyncBoundaryProps extends WithChildren {
  pendingFallback?: ReactNode;
  rejectedFallback?: (props: FallbackProps) => ReactNode;
}

export interface TransitionProps extends WithFallback {
  children: (
    isPending: boolean,
    startTransition: TransitionStartFunction
  ) => ReactNode;
}

export interface DeferredProps<T> extends WithRenderProp<T> {
  value: T;
}

export interface EachProps<T> extends WithIndexedRenderProp<T> {
  items: T[];
  renderEmpty?: ReactNode;
  separator?: ReactNode;
}

export interface OutsideClickProps extends WithChildren {
  onOutsideClick: () => void;
}

export interface ResponsiveProps extends WithChildren {
  query: string;
}

export interface ThrowProps {
  error: Error;
}
