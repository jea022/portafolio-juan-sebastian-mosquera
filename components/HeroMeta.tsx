"use client";

import { useT } from "@/lib/i18n";

// Fila de nombre/rol bajo el hero. Aparte de `page.tsx` (Server Component) porque necesita
// `useT()`: convertir la página entera a Client Component le haría perder su `metadata`
// (gotcha de Next.js 16, ver CLAUDE.md).
export function HeroMeta() {
  const t = useT();
  return (
    <div className="mt-10 flex flex-col gap-1 font-mono text-xs uppercase tracking-widest sm:mt-4 sm:flex-row sm:justify-between sm:gap-0">
      <span>Juan Sebastian Mosquera</span>
      <span>{t("communityManager")}</span>
    </div>
  );
}
