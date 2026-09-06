import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Indian Rupee formatting with lakh/crore awareness kept simple */
export function inr(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}

/** e.g. 1000 -> "1,000 kg" */
export function qty(value: number, unit = "kg"): string {
  return `${value.toLocaleString("en-IN")} ${unit}`;
}

export function pct(v: number): string {
  return `${v > 0 ? "+" : ""}${v}%`;
}
