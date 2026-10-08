"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

// Animación del título de la referencia ("PORTFOLIO"), generalizada para reusarla en cualquier
// título (ej. el del modal). Antes duplicaba el texto en dos capas (sólida + contorno); con un
// título que envuelve en varias líneas cada capa calculaba su propio ancho de forma distinta y
// el contorno terminaba desbordado en líneas que no correspondían ("se ve mal", con captura).
// Ahora es una sola capa de texto — nunca puede desalinearse consigo misma — con el efecto de
// glitch logrado por `text-shadow` (separación RGB tipo aberración cromática) en vez de un
// segundo bloque de texto.
export function GlitchTitle({
  text,
  as: Tag = "h1",
  id,
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, textShadow: "none" });
      return;
    }

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
    tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power3.out" })
      .to(el, {
        textShadow: "-3px 0 var(--color-crimson), 3px 0 var(--color-bone)",
        skewX: -6,
        x: -3,
        duration: 0.08,
        yoyo: true,
        repeat: 3,
        ease: "none",
      })
      .to(el, { textShadow: "0 0 0 transparent", skewX: 0, x: 0, duration: 0.4, ease: "power2.out" });

    return () => {
      tl.kill();
    };
  }, [text]);

  return (
    <Tag id={id} className={cn("font-display uppercase leading-none", className)}>
      <span ref={textRef} className="inline-block">
        {text}
      </span>
    </Tag>
  );
}
