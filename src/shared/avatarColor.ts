/** Flat light/shadow planes, shared by the artwork and the color picker. */
export function shadeHex(hex: string, factor: number): string {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  const value = parseInt(hex.slice(1), 16);
  const channel = (shift: number) =>
    Math.min(255, Math.max(0, Math.round(((value >> shift) & 255) * factor)));
  return `#${[channel(16), channel(8), channel(0)]
    .map((part) => part.toString(16).padStart(2, "0"))
    .join("")}`;
}
