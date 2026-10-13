"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage, useT } from "@/lib/i18n";
import { CONTACT, CONTACT_COLUMNS, PROFILE, PROJECTS } from "@/lib/portfolio";
import { CONTACT_LABELS_EN, localizeProfile, localizeProject } from "@/lib/portfolio.en";
import { cn, withBasePath } from "@/lib/utils";
import { CONTACT_TONE, ContactIcon } from "./ContactIcon";
import { LinkPreview } from "./LinkPreview";

// Enlaces que son páginas reales: llevan vista previa al pasar el cursor.
// Correo (mailto:) y teléfono (tel:) no abren una página, así que no la llevan.
const PREVIEWABLE = new Set(["whatsapp", "linkedin"]);
import { CardFan } from "./CardFan";
import { GrowthChart } from "./charts/GrowthChart";
import { MetricBars } from "./charts/MetricBars";
import { DriveEmbed } from "./DriveEmbed";
import { FanTile, buildFanItems, localizedLabel, toneFor, type FanItem } from "./FanTile";
import { LocationCard } from "./LocationCard";
import { Modal } from "./Modal";
import { ShineBorder } from "./ShineBorder";
import { TiltedCard } from "./TiltedCard";

const ITEMS = buildFanItems();

// Abanico en escritorio, carrusel en móvil, y un modal con la información de cada tarjeta.
export function Explorer() {
  const [open, setOpen] = useState<FanItem | null>(null);
  const { lang } = useLanguage();

  return (
    <>
      <CardFan items={ITEMS} onOpen={setOpen} />

      {/* Móvil: el abanico no cabe; se usa un carrusel horizontal con deslizamiento. */}
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:hidden">
        {ITEMS.map((item, i) => (
          <li key={item.key} className="w-[56vw] shrink-0 snap-center">
            <FanTile
              item={item}
              tone={toneFor(item, i)}
              className="aspect-[3/4] w-full"
              onClick={() => setOpen(item)}
            />
          </li>
        ))}
      </ul>

      <Modal open={open !== null} onClose={() => setOpen(null)} title={open ? localizedLabel(open, lang) : ""}>
        {open && <ModalBody item={open} />}
      </Modal>
    </>
  );
}

function ModalBody({ item }: { item: FanItem }) {
  const { lang } = useLanguage();
  const t = useT();
  if (item.kind === "project") {
    const rawProject = PROJECTS.find((p) => p.slug === item.projectSlug);
    if (!rawProject) return null;
    const project = localizeProject(rawProject, lang);
    return (
      <>
        {project.brief && (
          <div className="max-w-2xl">
            <p className="font-body text-base text-bone/90">{project.brief.challenge}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone/50">{t("rolLabel")}</span>
              <span className="inline-flex items-center gap-2 rounded-md border border-bone/25 bg-bone/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-bone">
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-crimson" />
                {project.brief.role}
              </span>
              {project.brief.tags?.map((tag) => (
                <span key={tag} className="rounded-md bg-crimson px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-black">
                  {tag}
                </span>
              ))}
            </div>

            <ul className="mt-5 space-y-2">
              {project.brief.highlights.map((line) => (
                <li key={line} className="flex gap-3 font-body text-sm text-bone/80">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-crimson" />
                  {line}
                </li>
              ))}
            </ul>

          </div>
        )}

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.assets.map((asset) => (
            <li key={asset.driveId}>
              <TiltedCard>
                <ShineBorder className="h-full w-full">
                  <div className="h-full overflow-hidden rounded-2xl border-2 border-bone/30 bg-black">
                    <DriveEmbed
                      asset={asset}
                      className={
                        asset.kind === "pdf"
                          ? "h-56 w-full"
                          : asset.orientation === "horizontal"
                            ? "aspect-video w-full"
                            : "aspect-[9/16] w-full max-h-[70vh]"
                      }
                    />
                    <p className="p-3 font-mono text-xs uppercase tracking-widest text-bone/70">{asset.label}</p>
                  </div>
                </ShineBorder>
              </TiltedCard>
            </li>
          ))}
        </ul>

        {project.metrics && (
          <>
            <h3 className="mt-8 font-display text-xl uppercase">{t("resultadosReales")}</h3>
            <p className="mt-1 font-mono text-xs text-bone/60">{project.metrics.note}</p>

            {project.brief?.result && (
              <div className="mt-4 rounded-2xl border-2 border-crimson/50 bg-crimson/10 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-crimson">{t("resultadoLabel")}</p>
                <p className="mt-1 font-body text-sm text-bone">{project.brief.result}</p>
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-bone/20 p-4">
                <p className="font-mono text-xs uppercase tracking-widest text-bone/60">{t("visualizacionesPorTipo")}</p>
                <div className="mt-4">
                  <MetricBars items={project.metrics.viewsByType} />
                </div>
              </div>
              <div className="rounded-2xl border-2 border-bone/20 p-4">
                <p className="font-mono text-xs uppercase tracking-widest text-bone/60">{t("interaccionesPorTipo")}</p>
                <div className="mt-4">
                  <MetricBars items={project.metrics.interactionsByType} />
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border-2 border-bone/20 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-mono text-xs uppercase tracking-widest text-bone/60">{t("crecimientoEnElMes")}</p>
                <p className="font-mono text-xs text-bone/70">
                  <span className="text-bone">{project.metrics.growth.totalViews}</span> {t("visualizacionesWord")} ·{" "}
                  <span className="text-bone">{project.metrics.growth.netFollowers}</span> {t("seguidoresWord")}
                </p>
              </div>
              <div className="mt-4">
                <GrowthChart
                  series={project.metrics.growth.series}
                  yTicks={project.metrics.growth.yTicks}
                  xLabels={project.metrics.growth.xLabels}
                  ariaLabel={t("growthChartAriaLabel")}
                />
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  if (item.kind === "profile") {
    const profile = localizeProfile(PROFILE, lang);
    return (
      <>
        <p className="font-display text-3xl uppercase">Juan Sebastian Mosquera</p>
        <p className="mt-1 font-mono text-sm text-bone/70">{t("communityManager")}</p>

        <div className="mt-5 max-w-2xl space-y-3 font-body text-base text-bone/90">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h3 className="mt-8 font-display text-xl uppercase">{t("formacionTitle")}</h3>
        <ul className="mt-4 space-y-3">
          {profile.formacion.map((f) => (
            <li
              key={f.titulo}
              className="rounded-2xl border-2 border-bone/20 p-4 transition-colors hover:border-crimson"
            >
              <p className="font-body text-sm text-bone">{f.titulo}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-bone/60">{f.institucion}</p>
              {f.periodo && <p className="mt-1 font-mono text-[10px] uppercase text-bone/40">{f.periodo}</p>}
            </li>
          ))}
        </ul>

        <h3 className="mt-8 font-display text-xl uppercase">{t("skillsTitle")}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-md border border-bone/25 bg-bone/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-bone"
            >
              {skill}
            </li>
          ))}
        </ul>

        <h3 className="mt-8 font-display text-xl uppercase">{t("herramientasTitle")}</h3>
        <ul className="mt-4 flex flex-wrap gap-3">
          {profile.herramientas.map((tool) => (
            <li
              key={tool.name}
              className="flex items-center gap-2 rounded-md border border-bone/25 bg-bone/5 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-bone"
            >
              {tool.logo ? (
                <Image src={withBasePath(tool.logo)} alt="" width={16} height={16} className="size-4 object-contain" />
              ) : (
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-crimson" />
              )}
              {tool.name}
            </li>
          ))}
        </ul>
      </>
    );
  }

  // Contacto: cada dato viene de CONTACT. Lo que no esté confirmado se muestra como pendiente.
  return (
    <>
      <p className="max-w-md font-body text-base text-bone/80">{t("contactIntro")}</p>

      {/* Móvil: una sola lista en el orden de CONTACT. Sin LinkPreview: esa tarjeta flotante
          depende del hover, que no existe en celular, y ahí solo estorbaba. */}
      <ul className="mt-6 grid gap-3 sm:hidden">
        {CONTACT.map((row) => (
          <ContactRow key={row.key} row={row} preview={false} />
        ))}
      </ul>

      {/* Escritorio: 2 columnas armadas a mano con CONTACT_COLUMNS (primera solo correo +
          mapa, segunda el resto), no por grid-flow-column, que repartía parejo por conteo
          de filas en vez de por el agrupamiento que pidió el cliente. Las 4 tarjetas de
          dato (correo, teléfono, whatsapp, linkedin) comparten el mismo `minHeight` (96px)
          para quedar parejas entre sí, y se estiran a todo el ancho de su columna (sin
          `self-start`, que las achicaba al ancho de su contenido y las dejaba más angostas
          que el mapa, pasada 55). El mapa ocupa el alto de 2 tarjetas (WhatsApp + LinkedIn):
          96×2 + 12px de gap = 204px (`h-[204px]`), a pedido del cliente (pasada 57; la
          pasada 56 lo había dejado en 1 sola tarjeta, 96px). */}
      <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
        {CONTACT_COLUMNS.map((column, i) => {
          return (
            <ul key={i} className="flex flex-col gap-3">
              {column.map((key) => {
                const row = CONTACT.find((c) => c.key === key);
                if (!row) return null;
                return (
                  <ContactRow
                    key={row.key}
                    row={row}
                    preview={PREVIEWABLE.has(row.key)}
                    minHeight="min-h-[96px]"
                    mapClassName={row.key === "ubicacion" ? "h-[204px]" : undefined}
                  />
                );
              })}
            </ul>
          );
        })}
      </div>
    </>
  );
}

function ContactRow({
  row,
  preview,
  minHeight = "min-h-[76px]",
  mapClassName,
}: {
  row: (typeof CONTACT)[number];
  preview: boolean;
  // Alto mínimo de la fila (icono + texto): por default el tamaño natural, que en la columna
  // de escritorio de correo/mapa se agranda (ver más arriba) para igualar ambas columnas.
  minHeight?: string;
  mapClassName?: string;
}) {
  const { lang } = useLanguage();
  const t = useT();
  // Ubicación tiene su propia tarjeta (ciudad + hora local), en vez de la fila con ícono.
  if (row.key === "ubicacion" && row.value) {
    return (
      <li>
        <LocationCard city={row.value} className={mapClassName} />
      </li>
    );
  }
  const tone = CONTACT_TONE[row.key];
  // Solo la etiqueta se traduce (CONTACT_LABELS_EN): el valor (correo, teléfono, usuario de
  // LinkedIn) es el mismo dato real sea cual sea el idioma.
  const label = lang === "en" ? (CONTACT_LABELS_EN[row.label] ?? row.label) : row.label;
  return (
    <li className={cn("flex items-center gap-4 rounded-2xl border-2 border-bone/30 p-4", minHeight)}>
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl sm:size-12 ${tone.bg} ${tone.icon}`}>
        <ContactIcon name={row.key} />
      </span>
      <span className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-widest text-bone/60 sm:text-xs">{label}</span>
        {row.value ? (
          row.href ? (
            preview ? (
              <LinkPreview url={row.href} className="font-body text-base underline-offset-4 hover:underline sm:text-lg">
                {row.value}
              </LinkPreview>
            ) : (
              <a href={row.href} className="font-body text-base underline-offset-4 hover:underline sm:text-lg">
                {row.value}
              </a>
            )
          ) : (
            <span className="font-body text-base sm:text-lg">{row.value}</span>
          )
        ) : (
          <span className="font-mono text-xs uppercase text-crimson">{t("pendiente")}</span>
        )}
      </span>
    </li>
  );
}
