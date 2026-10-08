import { PROJECTS } from "@/lib/portfolio";
import { DriveEmbed } from "./DriveEmbed";

// Mientras se ve la ficha "clasificada", esto precarga en segundo plano los videos,
// imágenes y PDF de los 7 proyectos: cuando el visitante entra al portafolio y abre un
// modal, el visor de Drive ya empezó a cargar (la miniatura y el reproductor, no el video
// completo; eso solo se descarga si alguien le da play). Oculto pero no con `display:none`,
// que en algunos navegadores pausa la carga de los iframes.
// `metrics` no entra acá: son datos de gráficas propias (pasada 41), no assets de Drive.
export function Preloader() {
  const allAssets = PROJECTS.flatMap((p) => p.assets);
  return (
    <div
      aria-hidden
      style={{ position: "fixed", top: 0, left: 0, width: 1, height: 1, overflow: "hidden", opacity: 0 }}
      className="pointer-events-none"
    >
      {allAssets.map((asset) => (
        <DriveEmbed key={asset.driveId} asset={asset} className="h-px w-px" />
      ))}
    </div>
  );
}
