/** Display helpers. Minus signs use U+2212 so figures align in mono. */

export const pct = (p: number, digits = 0) => `${(p * 100).toFixed(digits)}%`;

export const signed = (n: number, digits = 0) => {
  const v = Math.abs(n).toFixed(digits);
  if (Number(v) === 0) return (0).toFixed(digits);
  return `${n > 0 ? "+" : "−"}${v}`;
};

export const fixed = (n: number, digits = 0) => (n < 0 ? `−${Math.abs(n).toFixed(digits)}` : n.toFixed(digits));
