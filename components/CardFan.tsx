"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FanTile, toneFor, type FanItem } from "./FanTile";
import { MeRing } from "./MeRing";

// Abanico de la referencia: un arco con las tarjetas (grupos, perfil y contacto).
// El "ME" de abajo muestra el nombre de la tarjeta bajo el cursor.
const R = 380; // mitad del disco (el disco mide 2R)
const WHEEL_TOP = 60; // el centro del disco queda en y = WHEEL_TOP + R
const ARC = 290; // distancia del centro del disco a cada tarjeta (más separación entre tarjetas)
const CARD_W = 188;
const CARD_H = 251; // 3:4, formato vertical
const CONTAINER_H = 640;
// El anillo mide 240 px y queda centrado en el centro del arco.
const RING_SIZE = 240;
const RING_TOP = WHEEL_TOP + R - RING_SIZE / 2;

const round = (n: number) => Math.round(n * 100) / 100;
// Cuánto se abren las vecinas cuando una tarjeta está activa: la inmediata se corre
// este ángulo completo, y las siguientes cada vez menos (se divide entre la distancia).
const SPREAD_DEG = 30;

export function CardFan({ items, onOpen }: { items: FanItem[]; onOpen: (item: FanItem) => void }) {
  // El índice y el ángulo van con la etiqueta: el índice abre espacio en las vecinas,
  // el ángulo hace que la flecha del anillo gire hacia la tarjeta activa.
  const [active, setActive] = useState<{ index: number; label: string; angle: number } | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const swayRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = wheel.querySelectorAll("[data-card]");
    const ctx = gsap.context(() => {
      // Entrada: las tarjetas aparecen desde el centro del arco.
      gsap.from(cards, {
        opacity: 0,
        scale: 0.4,
        duration: 0.9,
        ease: "back.out(1.6)",
        stagger: { each: 0.08, from: "center" },
      });
      // Meneo continuo del abanico. Arranca después de la entrada.
      swayRef.current = gsap.to(wheel, {
        rotation: 5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
    }, wheel);

    return () => ctx.revert();
  }, []);

  const pause = () => swayRef.current?.pause();
  const play = () => swayRef.current?.play();

  return (
    <div className="hidden sm:block">
      <div
        className="relative mx-auto w-[1000px] max-w-full overflow-hidden"
        style={{ height: CONTAINER_H }}
        onMouseEnter={pause}
        onMouseLeave={() => {
          play();
          setActive(null);
        }}
      >
        <div
          ref={wheelRef}
          className="absolute left-1/2"
          style={{ top: WHEEL_TOP, width: R * 2, height: R * 2, marginLeft: -R }}
        >
          {items.map((item, i) => {
            // Arco sobre la mitad superior, de 190° a 350°, con los elementos repartidos.
            const angle = 190 + (i * 160) / (items.length - 1);
            // Si hay una tarjeta activa y es otra, esta se corre para abrirle espacio:
            // la vecina inmediata se mueve el ángulo completo, las siguientes cada vez menos.
            let effectiveAngle = angle;
            if (active && active.index !== i) {
              const distance = i - active.index;
              effectiveAngle = angle + (Math.sign(distance) * SPREAD_DEG) / Math.abs(distance);
            }
            const rad = (effectiveAngle * Math.PI) / 180;
            const cx = R + ARC * Math.cos(rad);
            const cy = R + ARC * Math.sin(rad);
            // Inclinación de abanico: los extremos giran menos de 40°, no quedan de lado.
            const style = {
              left: round(cx - CARD_W / 2),
              top: round(cy - CARD_H / 2),
              width: CARD_W,
              height: CARD_H,
              transform: `rotate(${round((effectiveAngle - 270) * 0.45)}deg)`,
              // La de la izquierda queda encima de la de su derecha (antes era al revés).
              zIndex: items.length - i,
              transitionProperty: "left, top, transform, translate",
              transitionDuration: "300ms",
              transitionTimingFunction: "ease-out",
            };

            return (
              <FanTile
                key={item.key}
                item={item}
                tone={toneFor(item, i)}
                data-card
                className="absolute h-full"
                style={style}
                onMouseEnter={() => {
                  pause();
                  setActive({ index: i, label: item.label, angle });
                }}
                onMouseLeave={() => {
                  play();
                  setActive(null);
                }}
                onClick={() => onOpen(item)}
              />
            );
          })}
        </div>

        {/* Justo debajo de las tarjetas. Sin nada en hover, la flecha apunta al perfil (270°, "arriba"). */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: RING_TOP }}>
          <MeRing label={active?.label ?? null} angle={active?.angle ?? 270} />
        </div>
      </div>
    </div>
  );
}
