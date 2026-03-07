import type { ErrorInfo, PropsWithChildren, ReactNode } from "react";
import type { FallbackProps } from "react-error-boundary";

// ──────────────────────────────────────────────
// Core render function types
// ──────────────────────────────────────────────

/** A render function that receives a value and returns JSX. */
export type RenderProp<T> = (value: T) => ReactNode;

/** A render function that receives a value and its index, returns JSX. */
export type IndexedRenderProp<T> = (value: T, index: number) => ReactNode;

/** Metadata about the current item's position in an iteration. */
export interface EachItemMeta {
  index: number;
  isFirst: boolean;
  isLast: boolean;
  length: number;
}


// ──────────────────────────────────────────────
// Common prop patterns
// ──────────────────────────────────────────────

/** Props that include an optional fallback ReactNode. */
export interface WithFallback {
  fallback?: ReactNode;
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

export interface ShowProps extends WithFallback, PropsWithChildren {
  when: boolean;
}

export interface SwitchProps<T extends string | number> {
  value: NoInfer<T>;
  by: Partial<Record<T, ReactNode>>;
}

export interface UseProps<T> extends WithRenderProp<T> {
  promise: Promise<T>;
}

export interface AsyncBoundaryProps extends PropsWithChildren {
  suspense?: { fallback?: ReactNode };
  errorBoundary?: {
    fallbackRender: (props: FallbackProps) => ReactNode;
    onError?: (error: Error, info: ErrorInfo) => void;
    onReset?: (details: { reason: "imperative-api"; args: unknown[] } | { reason: "keys"; prev: unknown[] | undefined; next: unknown[] | undefined }) => void;
    resetKeys?: unknown[];
  };
}

export interface EachProps<T> {
  items: T[];
  children: (item: T, meta: EachItemMeta) => ReactNode;
  renderEmpty?: ReactNode;
}

export interface OutsideClickProps extends PropsWithChildren {
  onOutsideClick: () => void;
}

export interface ResponsiveProps extends PropsWithChildren {
  query: string;
}


export interface ThrowProps {
  error: Error;
}
