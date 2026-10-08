"use client";

import { useEffect, useState } from "react";

// Cali, Colombia está en America/Bogota: GMT-5 todo el año, sin horario de verano.
// Se usa Intl con esa zona horaria para que la hora sea la real de la ciudad,
// sin importar en qué horario esté quien mira la página.
const CITY_TIMEZONE = "America/Bogota";

// Mosaico 2x2 de mosaicos (tiles) de OpenStreetMap, centrado al sur de Cali, entre los
// barrios Valle del Lili y Ciudad Jardín (coordenadas aproximadas: 3.335 N, -76.533 O).
// Es la fuente de mapas pública y sin clave de API (mismo criterio que el mapa de Google
// sin API key de Landing multisección). Se usan como imágenes fijas, sin los controles de
// zoom ni el visor interactivo del embed anterior, que se veían como un mapa de Google.
const TILE_Z = 14;
// Antes [4709, 4710]: la ventana se corrió un tile hacia el oeste (izquierda) para que se vea
// más ciudad, sin mover el punto real (sigue en el mismo tile 4709, ahora el segundo del par).
const TILE_X = [4708, 4709];
const TILE_Y = [8039, 8040];
// Posición del punto dentro del mosaico de 2x2. Recalculada para la nueva ventana: la fracción
// es relativa al ancho total (2 tiles), no al centro geométrico del recorte.
const MARKER_LEFT = "74%";
const MARKER_TOP = "35%";

export function LocationCard({ city }: { city: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("es-CO", {
          timeZone: CITY_TIMEZONE,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex h-56 flex-col justify-end overflow-hidden rounded-2xl border-2 border-bone/30 p-4">
      {/* Mosaico de mapa real de Cali (OpenStreetMap). Totalmente blanco y negro: `grayscale`
          quita el color y `invert` deja el fondo negro con las calles en blanco. */}
      <div
        aria-hidden
        className="absolute inset-0 grid grid-cols-2 grid-rows-2"
        // `invert(1)` dejaba el fondo en negro puro, y `brightness` no puede aclarar un negro
        // puro (multiplicar 0 sigue dando 0). Con un invert parcial el fondo queda gris oscuro
        // en vez de negro, y ahí `brightness` sí lo aclara.
        style={{ filter: "grayscale(1) invert(0.85) brightness(1.3) contrast(1)" }}
      >
        {TILE_Y.map((y) =>
          TILE_X.map((x) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${x}-${y}`}
              src={`https://tile.openstreetmap.org/${TILE_Z}/${x}/${y}.png`}
              alt=""
              width={256}
              height={256}
              style={{ width: "100%", height: "100%", maxWidth: "none", objectFit: "cover" }}
            />
          )),
        )}
      </div>
      {/* Oscurece el mapa hacia abajo para que el texto se lea. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <span
        aria-hidden
        className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300 motion-safe:animate-ping"
        style={{ left: MARKER_LEFT, top: MARKER_TOP }}
      />
      <span
        aria-hidden
        className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300"
        style={{ left: MARKER_LEFT, top: MARKER_TOP }}
      />

      <span aria-hidden className="absolute right-3 top-3 font-mono text-[8px] uppercase tracking-widest text-bone/40">
        © OpenStreetMap
      </span>

      <div className="relative">
        <p className="font-display text-xl uppercase leading-tight">{city}</p>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-bone/70">
          {time ?? "--:--"} GMT-5 · Hora local
        </p>
      </div>
    </div>
  );
}
