"use client";

import { useT } from "@/lib/i18n";

// "Welcome to my" sobre el título "PORTFOLIO". Aparte de `page.tsx` (Server Component) por el
// mismo motivo que `HeroMeta.tsx`: necesita `useT()` y convertir la página entera a Client
// Component le haría perder su `metadata` (gotcha de Next.js 16, ver CLAUDE.md).
export function HeroEyebrow() {
  const t = useT();
  return (
    <div className="flex items-start justify-between font-mono text-xs uppercase tracking-widest">
      <span>{t("welcomeToMy")}</span>
    </div>
  );
}
