import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Mismo helper que packages/ui/src/lib/utils.ts. Se copia y no se importa para no
// acoplar esta app a @no-name/ui (regla de extracción de CLAUDE.md).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
