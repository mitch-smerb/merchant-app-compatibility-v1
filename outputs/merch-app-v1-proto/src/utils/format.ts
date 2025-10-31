export const getPrettyNumber = (num: number | undefined) =>
  Number.isInteger(num) ? num?.toFixed(0) : num?.toFixed(2);
