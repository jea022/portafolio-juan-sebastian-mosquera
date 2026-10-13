"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";

// Envuelve todo el contenido (ficha clasificada + portafolio) para darle una transición visual
// al cambiar de idioma: un desenfoque + fundido breve (`.lang-switch-flash`, `globals.css`), sin
// desmontar nada (no usa `key`, así que no se pierde el estado de la ficha, el carrusel ni los
// modales abiertos). El primer render no anima: solo cuando `lang` cambia de verdad.
export function LanguageContentWrapper({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const [animating, setAnimating] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setAnimating(true);
    const id = setTimeout(() => setAnimating(false), 500);
    return () => clearTimeout(id);
  }, [lang]);

  return <div className={animating ? "lang-switch-flash" : undefined}>{children}</div>;
}
