"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Título de la referencia: "PORTFOLIO" sólido con una capa en contorno desfasada.
// Se anima en bucle: el contorno entra desde arriba, el sólido se revela con clip,
// hay un tirón de glitch y el contorno queda como sombra.
// Animación propia de este título (no `GlitchTitle`, que es la versión de una sola capa usada
// en los modales): esta de doble capa se ve bien acá porque "PORTFOLIO" nunca envuelve a una
// segunda línea, que es justo lo que rompía esta técnica en los títulos del modal (pasada 42).
export function HeroTitle() {
  const solidRef = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const solid = solidRef.current;
    const ghost = ghostRef.current;
    if (!solid || !ghost) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(solid, { opacity: 1 });
      gsap.set(ghost, { opacity: 0.35 });
      return;
    }

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
    tl.fromTo(
      ghost,
      { yPercent: -35, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
    )
      .fromTo(
        solid,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power2.inOut" },
        "<0.1",
      )
      .to(solid, { skewX: -10, xPercent: -2, duration: 0.12, yoyo: true, repeat: 3, ease: "none" })
      .to(ghost, { opacity: 0.35, yPercent: 6, duration: 0.6, ease: "power2.out" }, "+=0.4");

    return () => {
      tl.kill();
    };
  }, []);

  const word = "PORTFOLIO";

  return (
    <h1 aria-label="Portfolio" className="relative inline-block font-display uppercase leading-none text-[clamp(34px,7.4vw,120px)]">
      <span
        aria-hidden
        ref={ghostRef}
        className="pointer-events-none absolute left-0 top-0 text-transparent [-webkit-text-stroke:1.5px_var(--color-bone)]"
        style={{ transform: "translateY(0)" }}
      >
        {word}
      </span>
      <span ref={solidRef} aria-hidden className="relative z-10 block">
        {word}
      </span>
    </h1>
  );
}
