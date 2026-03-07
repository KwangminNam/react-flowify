import { Fragment } from "react";
import type { EachProps } from "../types";

/**
 * Headless list iteration component with full positional awareness.
 *
 * Renders each item via a render-prop that receives metadata
 * (`isFirst`, `isLast`, `index`, `length`). Supports static or
 * dynamic separators and an empty state fallback.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Each items={users} renderEmpty={<p>No users.</p>}>
 *   {(user, { index, isFirst, isLast }) => (
 *     <UserCard user={user} highlight={isFirst} />
 *   )}
 * </Each>
 *
 * ```
 */
export function Each<T>({
  items,
  renderEmpty = null,
  children,
}: EachProps<T>) {
  if (items.length === 0) {
    return <>{renderEmpty}</>;
  }

  const length = items.length;

  return (
    <>
      {items.map((item, index) => {
        const meta = {
          index,
          isFirst: index === 0,
          isLast: index === length - 1,
          length,
        };

        return (
          <Fragment key={index}>
            {children(item, meta)}
          </Fragment>
        );
      })}
    </>
  );
}
