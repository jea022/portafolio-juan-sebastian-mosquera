import type { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/portfolio";
import { withBasePath } from "@/lib/utils";
import { Tile } from "./Tile";

// Elementos del abanico: una tarjeta por proyecto/cliente (PLAN.md, pasada 29), la de perfil
// en el centro y la de contacto.
export type FanItem =
  | {
      kind: "project";
      key: string;
      label: string;
      projectSlug: string;
      logo?: string;
    }
  | { kind: "profile"; key: "profile"; label: "Perfil" }
  | { kind: "contact"; key: "contact"; label: "Contacto" };

// El perfil va primero, después los siete proyectos y al final el contacto.
export function buildFanItems(): FanItem[] {
  const projects: FanItem[] = PROJECTS.map((p) => ({
    kind: "project",
    key: `project-${p.slug}`,
    label: p.title,
    projectSlug: p.slug,
    logo: p.logo,
  }));
  const profile: FanItem = { kind: "profile", key: "profile", label: "Perfil" };
  const contact: FanItem = { kind: "contact", key: "contact", label: "Contacto" };
  return [profile, ...projects, contact];
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
  return (
    <Tile
      tone={tone}
      className={className}
      aria-label={item.label}
      {...rest}
    >
      {item.kind === "project" && (
        <>
          {item.logo ? (
            <>
              <Image src={withBasePath(item.logo)} alt={item.label} fill sizes="188px" className="absolute inset-0 -z-10 object-cover" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/5 to-transparent" />
            </>
          ) : (
            <span className="font-display text-xl uppercase leading-tight">{item.label}</span>
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
          <span className="font-mono text-[10px] uppercase tracking-widest text-bone">Perfil</span>
          <span className="mt-1 font-display text-base uppercase leading-tight text-bone">Juan Sebastian Mosquera</span>
          <span className="font-mono text-[10px] uppercase text-bone">Community manager</span>
        </>
      )}
      {item.kind === "contact" && (
        <>
          <Image src={withBasePath("/logos/contacto.png")} alt="Contacto" fill sizes="188px" className="absolute inset-0 -z-10 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/5 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-widest text-bone">Contacto</span>
        </>
      )}
    </Tile>
  );
}
