"use client";

import confetti from "canvas-confetti";
import Image from "next/image";
import { useT } from "@/lib/i18n";
import { withBasePath } from "@/lib/utils";

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
  const t = useT();
  return (
    // Sin fondo propio: deja ver la misma textura del body (`globals.css`), no un negro plano.
    // Relleno lateral generoso para que la pestaña que sobresale no quede pegada al borde.
    <div className="fixed inset-0 z-[200] grid grid-cols-1 place-items-center overflow-y-auto px-10 py-10 sm:px-16">
      {/* Antes era `w-[min(94vw,560px)]`: ese ancho se calcula sobre el viewport entero, sin
          restarle el padding lateral del contenedor (`px-10`/`sm:px-16`), así que la suma de
          ambos superaba el ancho real de la pantalla y el navegador agregaba scroll horizontal
          (no solo un recorte visual). Eso ya se corrigió, pero en un celular real seguía
          quedando un resto de scroll que el panel de preview no reproducía (seguramente por
          cómo Safari calcula el bounding box de un elemento rotado). Dos capas de seguridad en
          el breakpoint base para que esto no vuelva a pasar nunca, sea cual sea la causa exacta:
          `w-[90%]` (no `w-full`, deja margen de sobra) y sin rotación (`-rotate-1` solo desde
          `sm:`, que es donde si entraba sin problema). */}
      <div className="relative mx-auto w-[90%] max-w-[35rem] sm:w-full sm:-rotate-1">
        {/* Pestaña lateral, como la solapa de una carpeta de expediente. */}
        <div
          aria-hidden
          className="absolute -left-7 top-8 bottom-8 w-12 rounded-l-xl bg-crimson sm:-left-10 sm:w-14"
        >
          <span className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-[0.3em] text-black [writing-mode:vertical-rl]">
            {t("clasificado")}
          </span>
        </div>

        {/* La ficha. Padding más chico en el breakpoint base (`p-4`): con la ficha angosta
            a propósito (`w-[90%]`, ver arriba) este padding más chico le devuelve ancho de
            contenido de sobra al título, la foto y el botón. */}
        <div className="relative rounded-2xl border-2 border-black bg-bone p-4 text-black shadow-2xl sm:p-10">
          <Paperclip className="absolute -top-6 left-1/2 h-12 w-12 -translate-x-1/2 -rotate-12 text-black/70" />

          <div>
            {/* `text-lg` en el breakpoint base: con la ficha más angosta (`w-[90%]`, ver arriba)
                hace falta este tamaño para que quede margen de sobra, no solo que entre justo. */}
            <p className="font-display text-lg uppercase leading-none sm:text-4xl">{t("expedienteTitle1")}</p>
            <p className="font-display text-lg uppercase leading-none sm:text-4xl">{t("expedienteTitle2")}</p>
          </div>

          {/* `minmax(0,1fr)` (no `1fr` solo) deja que esta columna se achique por debajo del
              ancho mínimo de su contenido: sin eso, el botón/sello empujaban la ficha fuera
              de la pantalla en celulares angostos. `gap-2` y el `p-2` de la caja de "Sobre mí"
              (en vez de `gap-5`/`p-4`) le dejan más ancho de contenido a esa columna en mobile,
              con la ficha más angosta (`w-[90%]`, ver arriba). */}
          <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-2 sm:gap-5">
            {/* `w-28` sin alto fijo (no `size-28`) en el breakpoint base: por default una grilla
                estira sus celdas a la altura de la fila (`align-items: stretch`), así que sin
                una altura explícita la foto termina exactamente tan alta como la caja de
                "Sobre mí" de al lado, en vez de quedar más baja (antes la foto era un cuadrado
                fijo de 112px, más chica que esa caja). En `sm:` sigue siendo cuadrada (`size-64`,
                ningún pedido de cambiarla ahí). */}
            <div className="relative w-28 overflow-hidden rounded-lg border-2 border-black/70 sm:size-64">
              <Image src={withBasePath("/expediente-foto.jpg")} alt="Juan Sebastian Mosquera" fill sizes="256px" className="object-cover" />
            </div>

            <div className="min-w-0 rounded-lg border-2 border-black/70 p-2 sm:p-4">
              <p className="font-mono text-xs uppercase tracking-widest text-black/60">{t("sobreMi")}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath("/classified-stamp.png")}
                alt={t("selloAlt")}
                className="mx-auto mt-2 h-auto max-h-28 w-full object-contain mix-blend-multiply sm:max-h-32"
              />
              {/* `hidden sm:block`: en mobile el botón se mudó debajo de toda la fila (ver más
                  abajo), para que esta caja no tenga que competir por ancho con el botón además
                  de la foto. En escritorio sigue acá adentro, como siempre. */}
              <RevealButton onReveal={onReveal} className="hidden sm:block" />
            </div>
          </div>

          {/* El botón en mobile: debajo de la foto y "Sobre mí" (no adentro de esa caja), para
              que tenga todo el ancho de la ficha en vez de pelear por los ~100px que le quedaban
              a esa columna. `sm:hidden` porque en escritorio sigue adentro de la caja (ver arriba). */}
          <div className="mt-3 sm:hidden">
            <RevealButton onReveal={onReveal} />
          </div>

          <dl className="mt-6 divide-y divide-black/20 border-2 border-black/70 font-mono text-sm uppercase">
            <Row label={t("nombreLabel")} value="Juan Sebastian Mosquera" />
            <Row label={t("rolLabel")} value={t("communityManager")} />
            <Row label={t("ubicacionLabel")} value="Cali, Colombia" />
            <Row label={t("expedienteNumLabel")} value="001" />
          </dl>

          <div className="mt-5 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-black/50">
            <span>{t("expedienteFooter")}</span>
            <span aria-hidden className="grid size-7 place-items-center rounded-full border border-crimson text-crimson">
              ●
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevealButton({ onReveal, className }: { onReveal: () => void; className?: string }) {
  const t = useT();
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        fireConfetti({ x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight });
        onReveal();
      }}
      // Ya no hace falta una versión angosta (`text-xs`/`tracking-wide`): este botón ahora
      // siempre tiene de sobra el ancho de toda la ficha, sea el bloque de mobile (debajo de la
      // foto y "Sobre mí") o el de escritorio (adentro de esa caja, que ahí sí es espaciosa).
      className={`mt-4 w-full rounded-xl bg-crimson py-2 font-mono text-sm uppercase leading-tight tracking-widest text-black transition-transform hover:-translate-y-0.5 ${className ?? ""}`}
    >
      <span className="block">{t("revelarPortafolio1")}</span>
      <span className="block">{t("revelarPortafolio2")}</span>
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
