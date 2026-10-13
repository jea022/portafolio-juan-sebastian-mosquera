"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";

// Botón flotante fijo, visible siempre (incluso sobre la ficha "clasificada", que es
// `z-[200]`: por eso este queda en `z-[300]`). Muestra el idioma AL QUE cambia si se lo toca,
// no el actual (patrón común de selector de idioma). La animación es un "flip" de tarjeta
// (rotateX), a tono con el resto del sitio (ficha, carrusel de tarjetas).
//
// Antes esto usaba `AnimatePresence mode="wait"` con una animación de `exit`: el span viejo
// se quedaba pegado en pantalla indefinidamente (con sus estilos de "entrada" ya asentados,
// `opacity:1`/`transform:none`) porque esa coreografía depende de que el `exit` complete para
// recién ahí montar el span nuevo, y esa transición nunca terminaba de dispararse. Sin
// `AnimatePresence`: el cambio de `key` le basta a React para desmontar el span viejo y montar
// uno nuevo en el momento, que es lo único que hace falta para la animación de entrada.
export function LanguageToggle() {
  const { lang, toggle } = useLanguage();
  const target = lang === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
      className="fixed bottom-4 right-4 z-[300] grid size-12 place-items-center overflow-hidden rounded-full border-2 border-crimson bg-black/85 text-bone shadow-lg backdrop-blur transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
    >
      <motion.span
        key={target}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="font-mono text-xs font-bold uppercase tracking-widest"
      >
        {target}
      </motion.span>
    </button>
  );
}
