import { Fragment, type ReactNode } from "react";

interface EachProps<T> {
  items: T[];
  renderEmpty?: ReactNode;
  children: (item: T, index: number) => ReactNode;
}

function EachComponent<T>({
  items,
  renderEmpty = null,
  children,
}: EachProps<T>) {
  if (items.length === 0) {
    return <>{renderEmpty}</>;
  }

  return (
    <>
      {items.map((item, index) => (
        <Fragment key={index}>{children(item, index)}</Fragment>
      ))}
    </>
  );
}

function Separator({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

interface EachWithSeparatorProps<T> {
  items: T[];
  renderEmpty?: ReactNode;
  separator?: ReactNode;
  children: (item: T, index: number) => ReactNode;
}

function EachWithSeparator<T>({
  items,
  renderEmpty = null,
  separator,
  children,
}: EachWithSeparatorProps<T>) {
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

export const Each = Object.assign(EachWithSeparator, {
  Separator,
});
