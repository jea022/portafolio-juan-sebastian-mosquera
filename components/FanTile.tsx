"use client";

import type { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import { useLanguage, useT, type Lang } from "@/lib/i18n";
import { PROJECTS } from "@/lib/portfolio";
import { localizeProject } from "@/lib/portfolio.en";
import { withBasePath } from "@/lib/utils";
import { Tile } from "./Tile";

// Elementos del abanico: una tarjeta por proyecto/cliente (PLAN.md, pasada 29), la de perfil
// en el centro y la de contacto. `labelEn`/`ringLabelEn` se calculan una sola vez acá (las
// traducciones son datos estáticos, no cambian en runtime): lo que sí es dinámico es CUÁL de
// los dos se muestra, y eso lo resuelven `localizedLabel`/`localizedRingLabel` más abajo, con
// el idioma actual (`useLanguage()`) en el momento de renderizar.
export type FanItem =
  | {
      kind: "project";
      key: string;
      label: string;
      labelEn?: string;
      ringLabel?: string;
      ringLabelEn?: string;
      projectSlug: string;
      logo?: string;
    }
  | { kind: "profile"; key: "profile"; label: "Perfil" }
  | { kind: "contact"; key: "contact"; label: "Contacto" };

// El perfil va primero, después los siete proyectos y al final el contacto.
export function buildFanItems(): FanItem[] {
  const projects: FanItem[] = PROJECTS.map((p) => {
    const en = localizeProject(p, "en");
    return {
      kind: "project",
      key: `project-${p.slug}`,
      label: p.title,
      labelEn: en.title,
      ringLabel: p.ringLabel,
      ringLabelEn: en.ringLabel,
      projectSlug: p.slug,
      logo: p.logo,
    };
  });
  const profile: FanItem = { kind: "profile", key: "profile", label: "Perfil" };
  const contact: FanItem = { kind: "contact", key: "contact", label: "Contacto" };
  return [profile, ...projects, contact];
}

// Texto a mostrar según el idioma actual: para proyectos, el título traducido si existe; para
// perfil/contacto, la palabra equivalente (son solo dos, no justifica meterlas en `UI_TEXT`
// e importar `useT` acá, que crearía un ciclo con `portfolio.en.ts`).
export function localizedLabel(item: FanItem, lang: Lang): string {
  if (item.kind === "project") return lang === "en" ? (item.labelEn ?? item.label) : item.label;
  if (item.kind === "profile") return lang === "en" ? "Profile" : "Perfil";
  return lang === "en" ? "Contact" : "Contacto";
}

// Igual que `localizedLabel`, pero para el texto del anillo central (`MeRing`): usa `ringLabel`
// si el proyecto lo define (ver pasada del anillo de Voleibol), si no cae al título normal.
export function localizedRingLabel(item: FanItem, lang: Lang): string {
  if (item.kind !== "project") return localizedLabel(item, lang);
  if (lang === "en") return item.ringLabelEn ?? item.labelEn ?? item.label;
  return item.ringLabel ?? item.label;
}

// Tono según el elemento: el perfil es hueso y el contacto negro con borde.
export function toneFor(item: FanItem, index: number) {
  if (item.kind === "profile") return 2;
  if (item.kind === "contact") return 3;
  return index;
}

export function FanTile({
  item,
  tone,
  className,
  ...rest
}: { item: FanItem; tone: number; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { lang } = useLanguage();
  const t = useT();
  const label = localizedLabel(item, lang);
  return (
    <Tile
      tone={tone}
      className={className}
      aria-label={label}
      {...rest}
    >
      {item.kind === "project" && (
        <>
          {item.logo ? (
            <>
              <Image src={withBasePath(item.logo)} alt={label} fill sizes="188px" className="absolute inset-0 -z-10 object-cover" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/5 to-transparent" />
              {/* Subtítulo solo en mobile (`sm:hidden`): en escritorio el nombre del proyecto ya
                  se ve en el anillo central (`MeRing`) al pasar el cursor, así que acá sobraría;
                  en celular no hay anillo, así que sin esto la tarjeta no dice qué proyecto es
                  hasta que se abre. */}
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone sm:hidden">{label}</span>
            </>
          ) : (
            <span className="font-display text-xl uppercase leading-tight">{label}</span>
          )}
        </>
      )}
      {item.kind === "profile" && (
        <>
          <Image
            src={withBasePath("/perfil-foto.jpg")}
            alt=""
            fill
            sizes="(min-width: 640px) 188px, 56vw"
            className="absolute inset-0 -z-10 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />
          {/* `sm:hidden`: en escritorio este rótulo es redundante con el anillo central. */}
          <span className="font-mono text-[10px] uppercase tracking-widest text-bone sm:hidden">{label}</span>
          <span className="mt-1 font-display text-base uppercase leading-tight text-bone">Juan Sebastian Mosquera</span>
          <span className="font-mono text-[10px] uppercase text-bone">{t("communityManager")}</span>
        </>
      )}
      {item.kind === "contact" && (
        <>
          <Image src={withBasePath("/logos/contacto.png")} alt={label} fill sizes="188px" className="absolute inset-0 -z-10 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/5 to-transparent" />
          {/* `sm:hidden`: en escritorio este rótulo es redundante con el anillo central. */}
          <span className="font-mono text-xs uppercase tracking-widest text-bone sm:hidden">{label}</span>
        </>
      )}
    </Tile>
  );
}
