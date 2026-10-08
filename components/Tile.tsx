import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Tonos de la referencia sobre fondo negro: taupe, rojo, hueso y negro con borde hueso.
export const CARD_TONES = [
  "bg-taupe text-bone",
  "bg-crimson text-black",
  "bg-bone text-black",
  "bg-black text-bone border-2 border-bone",
];

// Tarjeta interactiva con bordes redondeados. Es un botón para abrir su modal.
export function Tile({
  tone = 0,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: number }) {
  return (
    <button
      type="button"
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl p-4 text-left transition-transform duration-300 hover:z-30 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone",
        CARD_TONES[tone % CARD_TONES.length],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
