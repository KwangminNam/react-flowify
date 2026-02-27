import { Fragment, type ReactNode } from "react";
import type { EachProps, WithChildren } from "../types";

/**
 * Iterates over an array and renders each item via a render-prop.
 *
 * Supports an optional `separator` between items and a `renderEmpty`
 * fallback when the array is empty.
 *
 * @example
 * ```tsx
 * <Each
 *   items={users}
 *   separator={<Divider />}
 *   renderEmpty={<p>No users found.</p>}
 * >
 *   {(user, index) => <UserCard key={user.id} user={user} />}
 * </Each>
 * ```
 */
function EachComponent<T>({
  items,
  renderEmpty = null,
  separator,
  children,
}: EachProps<T>) {
  if (items.length === 0) {
    return <>{renderEmpty}</>;
  }

  return (
    <>
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && separator}
          {children(item, index)}
        </Fragment>
      ))}
    </>
  );
}

/**
 * A semantic marker component for separator content within `<Each>`.
 *
 * @example
 * ```tsx
 * <Each.Separator>
 *   <hr />
 * </Each.Separator>
 * ```
 */
function Separator({ children }: WithChildren) {
  return <>{children}</>;
}

export const Each = Object.assign(EachComponent, {
  Separator,
});
