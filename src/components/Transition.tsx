import { useTransition, type ReactNode, type TransitionStartFunction } from "react";

interface TransitionProps {
  fallback?: ReactNode;
  children: (
    isPending: boolean,
    startTransition: TransitionStartFunction
  ) => ReactNode;
}

export function Transition({ fallback, children }: TransitionProps) {
  const [isPending, startTransition] = useTransition();

  if (isPending && fallback) {
    return <>{fallback}</>;
  }

  return <>{children(isPending, startTransition)}</>;
}
