"use client";

import confetti from "canvas-confetti";
import Image from "next/image";

// Colores de nuestra paleta para el confeti (PLAN.md, pasada 4).
const CONFETTI_COLORS = ["#e70f0e", "#e1decc", "#474145"];

// Concepto de magicui.design/docs/components/confetti: una explosión de confeti al
// pulsar el botón. Colores de nuestra paleta, no los del demo.
function fireConfetti(origin: { x: number; y: number }) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  confetti({
    particleCount: 120,
    spread: 70,
    startVelocity: 45,
    origin,
    colors: CONFETTI_COLORS,
    zIndex: 300,
  });
  confetti({
    particleCount: 60,
    spread: 100,
    startVelocity: 30,
    origin,
    colors: CONFETTI_COLORS,
    zIndex: 300,
    scalar: 0.7,
  });
}

// Pantalla "clasificada" antes del portafolio: una ficha de expediente con los datos
// reales del cliente. El botón "Revelar" dentro de "Sobre mí" dispara el confeti y
// abre el portafolio. Concepto propio, traducido con nuestra paleta (bone, crimson,
// taupe), no el de ninguna ficha ajena.
export function Gate({ onReveal }: { onReveal: () => void }) {
  return (
    // Sin fondo propio: deja ver la misma textura del body (`globals.css`), no un negro plano.
    // Relleno lateral generoso para que la pestaña que sobresale no quede pegada al borde.
    <div className="fixed inset-0 z-[200] grid place-items-center overflow-y-auto px-10 py-10 sm:px-16">
      <div className="relative w-[min(94vw,560px)] -rotate-1">
        {/* Pestaña lateral, como la solapa de una carpeta de expediente. */}
        <div
          aria-hidden
          className="absolute -left-7 top-8 bottom-8 w-12 rounded-l-xl bg-crimson sm:-left-10 sm:w-14"
        >
          <span className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-[0.3em] text-black [writing-mode:vertical-rl]">
            Clasificado
          </span>
        </div>

        {/* La ficha. */}
        <div className="relative rounded-2xl border-2 border-black bg-bone p-8 text-black shadow-2xl sm:p-10">
          <Paperclip className="absolute -top-6 left-1/2 h-12 w-12 -translate-x-1/2 -rotate-12 text-black/70" />

          <div>
            <p className="font-display text-3xl uppercase leading-none sm:text-4xl">Expediente</p>
            <p className="font-display text-3xl uppercase leading-none sm:text-4xl">Del creador</p>
          </div>

          <div className="mt-6 grid grid-cols-[auto_1fr] gap-5">
            <div className="relative size-48 overflow-hidden rounded-lg border-2 border-black/70 sm:size-64">
              <Image src="/expediente-foto.jpg" alt="Juan Sebastian Mosquera" fill sizes="256px" className="object-cover" />
            </div>

            <div className="rounded-lg border-2 border-black/70 p-4">
              <p className="font-mono text-xs uppercase tracking-widest text-black/60">Sobre mí</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/classified-stamp.png"
                alt="Sello de clasificado"
                className="mx-auto mt-2 h-28 w-auto object-contain mix-blend-multiply sm:h-32"
              />
              <RevealButton onReveal={onReveal} />
            </div>
          </div>

          <dl className="mt-6 divide-y divide-black/20 border-2 border-black/70 font-mono text-sm uppercase">
            <Row label="Nombre" value="Juan Sebastian Mosquera" />
            <Row label="Rol" value="Community manager" />
            <Row label="Ubicación" value="Cali, Colombia" />
            <Row label="Expediente n.º" value="001" />
          </dl>

          <div className="mt-5 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-black/50">
            <span>Expediente · 2026</span>
            <span aria-hidden className="grid size-7 place-items-center rounded-full border border-crimson text-crimson">
              ●
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevealButton({ onReveal }: { onReveal: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        fireConfetti({ x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight });
        onReveal();
      }}
      className="mt-4 w-full rounded-xl bg-crimson py-3 font-mono text-sm uppercase tracking-widest text-black transition-transform hover:-translate-y-0.5"
    >
      Revelar portafolio
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2">
      <dt className="text-black/50">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}

function Paperclip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden>
      <path d="M8 10V7a4 4 0 0 1 8 0v9a2.5 2.5 0 0 1-5 0V8" />
    </svg>
  );
}
