"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

// Alto aproximado de la tarjeta (imagen 225 + relleno y borde) y separación del enlace.
// Se usa para decidir si hay espacio para abrirla hacia abajo o si conviene hacia arriba.
const PREVIEW_H = 240;
const GAP = 12;

// Concepto de github.com/aceternity (LinkPreview): al pasar el cursor sobre el enlace,
// se ve una captura en vivo del sitio. Se traduce la estructura y el movimiento con
// nuestros tokens; el contenido y los colores no son los del demo.
// La captura la genera microlink.io (servicio externo, sin datos propios): al pasar el
// cursor, la URL del enlace se envía a ese servicio para pedir la imagen.
function screenshotUrl(url: string) {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.width": "960",
    "viewport.height": "600",
  });
  return `https://api.microlink.io/?${params.toString()}`;
}

export function LinkPreview({ url, children, className }: { url: string; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Posición en la ventana (no relativa al enlace): así el portal puede flotar por fuera
  // del modal sin que su scroll interno la recorte.
  const [anchor, setAnchor] = useState<{ left: number; top: number; direction: "down" | "up" } | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => setMounted(true), []);

  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 100, damping: 15 });

  const updateAnchor = () => {
    const r = linkRef.current?.getBoundingClientRect();
    if (!r) return;
    // Si no entra hacia abajo pero sí hacia arriba, se abre hacia arriba.
    const fitsBelow = r.bottom + GAP + PREVIEW_H <= window.innerHeight;
    const fitsAbove = r.top - GAP - PREVIEW_H >= 0;
    const direction = !fitsBelow && fitsAbove ? "up" : "down";
    setAnchor({
      left: r.left + r.width / 2,
      top: direction === "up" ? r.top - GAP - PREVIEW_H : r.bottom + GAP,
      direction,
    });
  };

  // Si hay scroll (de la página o del modal) mientras está abierta, la reubica.
  useEffect(() => {
    if (!open) return;
    updateAnchor();
    window.addEventListener("scroll", updateAnchor, true);
    window.addEventListener("resize", updateAnchor);
    return () => {
      window.removeEventListener("scroll", updateAnchor, true);
      window.removeEventListener("resize", updateAnchor);
    };
  }, [open]);

  return (
    <a
      ref={linkRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onMouseEnter={() => {
        updateAnchor();
        setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) / 2);
      }}
    >
      {children}

      {mounted &&
        anchor &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.span
                initial={{ opacity: 0, y: anchor.direction === "up" ? -16 : 16, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: anchor.direction === "up" ? -16 : 16, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ position: "fixed", left: anchor.left, top: anchor.top, x: translateX }}
                className="pointer-events-none z-[100] -translate-x-1/2"
              >
                <span className="block overflow-hidden rounded-2xl border-2 border-bone bg-black p-1 shadow-xl">
                  {/* Captura remota de microlink.io: no es una imagen propia del proyecto. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshotUrl(url)}
                    width={360}
                    height={225}
                    alt=""
                    // Ancho fijo: dentro del portal, el `max-width: 100%` base de Tailwind
                    // seguía recortando el ancho real de la imagen.
                    style={{ width: 360, height: 225, maxWidth: "none" }}
                    className="rounded-xl"
                  />
                </span>
              </motion.span>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </a>
  );
}
