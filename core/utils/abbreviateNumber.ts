export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const SI_PREFIXES = [
  { value: 1, symbol: "" },
  { value: 1e3, symbol: "k" },
  { value: 1e6, symbol: "M" },
  { value: 1e9, symbol: "B" },
  { value: 1e12, symbol: "T" },
  { value: 1e15, symbol: "P" },
  { value: 1e18, symbol: "E" },
];

// https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
export const abbreviateNumber = (number: any) => {
  if (number === 0) return number;

  let numberFixed: number | string;

  const tier = SI_PREFIXES.filter((n) => number >= n.value).pop();
  if (tier) {
    numberFixed = (number / tier.value).toFixed(2);
  }
  return `$${numberFixed}${tier?.symbol}`;
};
