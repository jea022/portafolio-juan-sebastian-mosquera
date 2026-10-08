import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Concepto de magicui.design/docs/components/shine-border: un brillo que recorre el borde
// en bucle, con una máscara que solo deja ver el marco. Colores de nuestra paleta (crimson,
// bone, taupe) en vez de los del demo. Es puro CSS, sin JS: no hace falta "use client".
export function ShineBorder({
  children,
  className,
  borderRadius = 16,
  borderWidth = 2,
  duration = 10,
  colors = ["var(--color-crimson)", "var(--color-bone)", "var(--color-taupe)"],
}: {
  children: ReactNode;
  className?: string;
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  colors?: string[];
}) {
  return (
    <div className={cn("relative", className)} style={{ borderRadius }}>
      <div
        aria-hidden
        className="shine-border-glow pointer-events-none absolute inset-0"
        style={
          {
            borderRadius,
            padding: borderWidth,
            backgroundImage: `radial-gradient(transparent, transparent, ${colors.join(", ")}, transparent, transparent)`,
            backgroundSize: "300% 300%",
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            animation: `shine ${duration}s linear infinite`,
          } as CSSProperties
        }
      />
      {children}
    </div>
  );
}
