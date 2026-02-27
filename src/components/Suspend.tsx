const infiniteThenable = { then() {} };

export const Suspend = Object.assign(
  (): null => {
    throw infiniteThenable;
  },
  {
    displayName: "Suspend",
  }
);
