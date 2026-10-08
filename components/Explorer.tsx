"use client";

import { useState } from "react";
import { CONTACT, PROJECTS } from "@/lib/portfolio";
import { CONTACT_TONE, ContactIcon } from "./ContactIcon";
import { LinkPreview } from "./LinkPreview";

// Enlaces que son páginas reales: llevan vista previa al pasar el cursor.
// Correo (mailto:) y teléfono (tel:) no abren una página, así que no la llevan.
const PREVIEWABLE = new Set(["whatsapp", "linkedin", "instagram"]);
import { CardFan } from "./CardFan";
import { GrowthChart } from "./charts/GrowthChart";
import { MetricBars } from "./charts/MetricBars";
import { DriveEmbed } from "./DriveEmbed";
import { FanTile, buildFanItems, toneFor, type FanItem } from "./FanTile";
import { LocationCard } from "./LocationCard";
import { Modal } from "./Modal";
import { ShineBorder } from "./ShineBorder";
import { TiltedCard } from "./TiltedCard";

const ITEMS = buildFanItems();

// Abanico en escritorio, carrusel en móvil, y un modal con la información de cada tarjeta.
export function Explorer() {
  const [open, setOpen] = useState<FanItem | null>(null);

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

      <Modal open={open !== null} onClose={() => setOpen(null)} title={open ? open.label : ""}>
        {open && <ModalBody item={open} />}
      </Modal>
    </>
  );
}

function ModalBody({ item }: { item: FanItem }) {
  if (item.kind === "project") {
    const project = PROJECTS.find((p) => p.slug === item.projectSlug);
    if (!project) return null;
    return (
      <>
        {project.brief && (
          <div className="max-w-2xl">
            <p className="font-body text-base text-bone/90">{project.brief.challenge}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Rol</span>
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
            <h3 className="mt-8 font-display text-xl uppercase">Resultados reales</h3>
            <p className="mt-1 font-mono text-xs text-bone/60">{project.metrics.note}</p>

            {project.brief?.result && (
              <div className="mt-4 rounded-2xl border-2 border-crimson/50 bg-crimson/10 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-crimson">Resultado</p>
                <p className="mt-1 font-body text-sm text-bone">{project.brief.result}</p>
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-bone/20 p-4">
                <p className="font-mono text-xs uppercase tracking-widest text-bone/60">Visualizaciones por tipo</p>
                <div className="mt-4">
                  <MetricBars items={project.metrics.viewsByType} />
                </div>
              </div>
              <div className="rounded-2xl border-2 border-bone/20 p-4">
                <p className="font-mono text-xs uppercase tracking-widest text-bone/60">Interacciones por tipo</p>
                <div className="mt-4">
                  <MetricBars items={project.metrics.interactionsByType} />
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border-2 border-bone/20 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-mono text-xs uppercase tracking-widest text-bone/60">Crecimiento en el mes</p>
                <p className="font-mono text-xs text-bone/70">
                  <span className="text-bone">{project.metrics.growth.totalViews}</span> visualizaciones ·{" "}
                  <span className="text-bone">{project.metrics.growth.netFollowers}</span> seguidores
                </p>
              </div>
              <div className="mt-4">
                <GrowthChart
                  series={project.metrics.growth.series}
                  yTicks={project.metrics.growth.yTicks}
                  xLabels={project.metrics.growth.xLabels}
                />
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  if (item.kind === "profile") {
    return (
      <>
        <p className="font-display text-3xl uppercase">Juan Sebastian Mosquera</p>
        <p className="mt-1 font-mono text-sm text-bone/70">Community manager</p>
      </>
    );
  }

  // Contacto: cada dato viene de CONTACT. Lo que no esté confirmado se muestra como pendiente.
  return (
    <>
      <p className="max-w-md font-body text-base text-bone/80">
        Para proyectos, marcas o eventos que quieras contar en video. Elegí el canal que prefieras.
      </p>
      {/* `grid-rows-3` normal reparte el alto por igual entre filas (las estira a todas al
          tamaño de la más alta, el mapa). Con filas `auto` cada una mide solo lo que necesita. */}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:grid-flow-col sm:[grid-template-rows:repeat(3,auto)]">
      {CONTACT.map((row) => {
        // Ubicación tiene su propia tarjeta (ciudad + hora local), en vez de la fila con ícono.
        if (row.key === "ubicacion" && row.value) {
          return (
            <li key={row.key}>
              <LocationCard city={row.value} />
            </li>
          );
        }
        const tone = CONTACT_TONE[row.key];
        return (
          <li key={row.key} className="flex items-center gap-4 self-start rounded-2xl border-2 border-bone/30 p-4">
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone.bg} ${tone.icon}`}>
              <ContactIcon name={row.key} />
            </span>
            <span className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone/60">{row.label}</span>
              {row.value ? (
                row.href ? (
                  PREVIEWABLE.has(row.key) ? (
                    <LinkPreview url={row.href} className="font-body text-base underline-offset-4 hover:underline">
                      {row.value}
                    </LinkPreview>
                  ) : (
                    <a href={row.href} className="font-body text-base underline-offset-4 hover:underline">
                      {row.value}
                    </a>
                  )
                ) : (
                  <span className="font-body text-base">{row.value}</span>
                )
              ) : (
                <span className="font-mono text-xs uppercase text-crimson">Pendiente</span>
              )}
            </span>
          </li>
        );
      })}
      </ul>
    </>
  );
}
