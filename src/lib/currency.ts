// Indian Rupee formatting helpers.
// Use INR throughout the platform.

export const INR = "₹";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrFormatter2 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const inrCompact = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatINR(value: number, opts: { decimals?: boolean; compact?: boolean } = {}) {
  if (opts.compact) return inrCompact.format(value);
  return opts.decimals ? inrFormatter2.format(value) : inrFormatter.format(value);
}
