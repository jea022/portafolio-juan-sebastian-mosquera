// Anillo circular de la referencia con una flecha y "ME" en el centro. Al pasar el cursor por una
// tarjeta, el centro muestra su nombre (`label`) y la flecha gira hacia ella (`angle`,
// el mismo ángulo polar con el que CardFan posiciona cada tarjeta en el arco).
// El texto del anillo gira con CSS; motion-safe respeta la preferencia de movimiento reducido.
export function MeRing({ label, angle = 270 }: { label?: string | null; angle?: number }) {
  // 270° es "arriba" en el arco (donde está el perfil), que es hacia donde apunta la flecha en reposo.
  const rotation = angle - 270;
  return (
    <div className="relative size-60">
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full motion-safe:animate-[spin_28s_linear_infinite]" aria-hidden>
        <defs>
          <path id="me-ring-path" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text className="fill-bone font-mono" style={{ fontSize: 11, letterSpacing: 1.2 }}>
          <textPath href="#me-ring-path">PORTFOLIO • JUAN SEBASTIAN MOSQUERA • COMMUNITY MANAGER •</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center font-display uppercase">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3 transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <path d="M12 19V5" />
          <path d="M6 11l6-6 6 6" />
        </svg>
        <span className="text-sm leading-tight">{label ?? "ME"}</span>
      </div>
    </div>
  );
}
