import { useFormStatus } from "react-dom";
import type { FormStatusProps } from "../types";

/**
 * Exposes `useFormStatus()` via a render-prop so you don't need to
 * extract a separate child component just to read form submission state.
 *
 * Must be rendered as a child of a `<form>`.
 *
 * @example Destructure only what you need:
 * ```tsx
 * <form action={action}>
 *   <input name="title" />
 *   <FormStatus>
 *     {({ pending }) => (
 *       <button disabled={pending}>저장</button>
 *     )}
 *   </FormStatus>
 * </form>
 * ```
 *
 * @example Use all status fields:
 * ```tsx
 * <form action={action}>
 *   <input name="title" />
 *   <FormStatus>
 *     {({ pending, data, method, action }) => (
 *       <>
 *         <button disabled={pending}>저장</button>
 *         <p>{data?.get('title')}으로 저장 중...</p>
 *       </>
 *     )}
 *   </FormStatus>
 * </form>
 * ```
 */
export function FormStatus({ children }: FormStatusProps) {
  const status = useFormStatus();
  return <>{children(status)}</>;
}
