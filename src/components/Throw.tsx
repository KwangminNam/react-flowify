interface ThrowProps {
  error: Error;
}

export function Throw({ error }: ThrowProps): never {
  throw error;
}
