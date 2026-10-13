"use client";

import { useRef, useState } from "react";
import type { Asset } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

// Embebe un archivo de Drive directo, sin subirlo a otro lado: el mismo visor público de
// Drive (`/preview`) para video, imagen y PDF. Es el único método que se comprobó que
// funciona sin pedir cuenta de Google (la miniatura `lh3` fallaba sin sesión iniciada;
// PLAN.md, pasada 29).
//
// Pasada 61: el visor de Drive tiene un tope de reproducciones anónimas por día; superado,
// bloquea el video para todo visitante sin sesión. Los videos se migran a YouTube (no
// listado) de a uno (`asset.youtubeId`, `lib/portfolio.ts`); mientras no tengan ese campo
// siguen embebidos desde Drive. `youtube-nocookie.com` evita cookies de seguimiento hasta
// que se reproduce.
export function DriveEmbed({ asset, className }: { asset: Asset; className?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src = asset.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${asset.youtubeId}`
    : `https://drive.google.com/file/d/${asset.driveId}/preview`;

  // `touch-action: pan-y` (ver abajo) no alcanza solo en iOS Safari: no respeta de forma
  // confiable el touch-action del padre en iframes de otro origen, así que el visor de Drive se
  // queda con el gesto de arrastre y la página no scrollea (tarjeta de Copa Voleibol, con 3
  // imágenes embebidas). Mientras no está `activated`, el iframe no recibe toques en absoluto
  // (`pointer-events: none`): el arrastre nunca llega a Drive y scrollea la página como
  // cualquier otro contenido. El primer toque activa el embed para poder interactuar con él.
  const [activated, setActivated] = useState(false);

  return (
    <div className="relative">
      <iframe
        ref={iframeRef}
        src={src}
        title={asset.label}
        allow="autoplay; fullscreen"
        allowFullScreen
        className={cn("touch-pan-y", className ?? "aspect-video w-full rounded-xl")}
        style={{ border: 0, pointerEvents: activated ? "auto" : "none" }}
      />
      {!activated && (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label={`Activar ${asset.label}`}
          className="absolute inset-0 grid place-items-center bg-black/10"
        >
          <span className="grid size-12 place-items-center rounded-full border border-bone/40 bg-black/70 text-bone backdrop-blur">
            {asset.kind === "video" ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 size-5" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            )}
          </span>
        </button>
      )}
      <button
        type="button"
        onClick={() => {
          setActivated(true);
          iframeRef.current?.requestFullscreen();
        }}
        aria-label="Pantalla completa"
        className="absolute bottom-2 right-2 grid size-8 place-items-center rounded-full border border-bone/30 bg-black/70 text-bone backdrop-blur transition-colors hover:bg-bone hover:text-black"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      </button>
    </div>
  );
}
