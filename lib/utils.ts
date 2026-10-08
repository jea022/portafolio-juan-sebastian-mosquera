import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Mismo helper que packages/ui/src/lib/utils.ts. Se copia y no se importa para no
// acoplar esta app a @no-name/ui (regla de extracción de CLAUDE.md).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// En GitHub Pages la app vive bajo /portafolio-juan-sebastian-mosquera/, no en la raíz.
// `next/image` con `unoptimized` y cualquier `<img>`/`url()` propio no anteponen ese
// basePath solos (a diferencia del JS/CSS que arma el propio Next): cada referencia a un
// archivo de `public/` pasa por acá. En local (`pnpm dev`/build sin GITHUB_PAGES) la
// variable queda vacía y no cambia nada. Mismo esquema que apps/kaze-studio.
export function withBasePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
