const neverResolve = new Promise<never>(() => {});

export function Suspend(): never {
  throw neverResolve;
}
