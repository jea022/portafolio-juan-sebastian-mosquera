"use client";

import { useRef } from "react";
import type { Asset } from "@/lib/portfolio";

// Embebe un archivo de Drive directo, sin subirlo a otro lado: el mismo visor público de
// Drive (`/preview`) para video, imagen y PDF. Es el único método que se comprobó que
// funciona sin pedir cuenta de Google (la miniatura `lh3` fallaba sin sesión iniciada;
// PLAN.md, pasada 29).
export function DriveEmbed({ asset, className }: { asset: Asset; className?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="relative">
      <iframe
        ref={iframeRef}
        src={`https://drive.google.com/file/d/${asset.driveId}/preview`}
        title={asset.label}
        allow="autoplay; fullscreen"
        allowFullScreen
        className={className ?? "aspect-video w-full rounded-xl"}
        style={{ border: 0 }}
      />
      <button
        type="button"
        onClick={() => iframeRef.current?.requestFullscreen()}
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
