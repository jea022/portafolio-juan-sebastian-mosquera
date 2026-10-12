import { Explorer } from "@/components/Explorer";
import { HeroTitle } from "@/components/HeroTitle";
import { PortfolioGate } from "@/components/PortfolioGate";

// Antes del portafolio hay una ficha "clasificada" (PortfolioGate); su botón "Revelar" la
// cierra y recién ahí se monta este contenido, con el hero tipográfico y el abanico de tarjetas.
export default function Home() {
  return (
    <PortfolioGate>
    <main className="mx-auto max-w-6xl">
      <section className="relative border-b-2 border-bone px-4 py-8 sm:px-8">
        <Cross className="left-3 top-3" />
        <Cross className="right-3 top-3" />
        <Cross className="bottom-3 left-3" />
        <Cross className="bottom-3 right-3" />

        <div className="flex items-start justify-between font-mono text-xs uppercase tracking-widest">
          <span>Welcome to my</span>
        </div>

        <div className="relative flex justify-center py-10">
          <div aria-hidden className="absolute inset-y-[-12%] left-1/2 w-[16%] -translate-x-1/2 rounded-2xl bg-crimson" />
          <div className="relative">
            <HeroTitle />
          </div>
        </div>

        {/* `mt-10` en el breakpoint base: el cuadrado rojo detrás del título se extiende un
            poco más abajo que su contenedor (`inset-y-[-12%]`); el cliente pidió más aire acá
            además de separarlo de que no quedara pegado al nombre (antes `mt-4`). En `sm:` hay
            más espacio natural por el padding mayor de la sección, así que vuelve a `sm:mt-4`.
            `flex-col` en el breakpoint base: en celulares angostos el nombre completo y el rol
            no entran uno al lado del otro y quedaban pegados sin espacio ("MOSQUERACOMMUNITY");
            en `sm:` sí entran en una fila con `justify-between` como antes. */}
        <div className="mt-10 flex flex-col gap-1 font-mono text-xs uppercase tracking-widest sm:mt-4 sm:flex-row sm:justify-between sm:gap-0">
          <span>Juan Sebastian Mosquera</span>
          <span>Community manager</span>
        </div>
      </section>

      <section className="relative overflow-hidden py-6">
        <Explorer />
      </section>
    </main>
    </PortfolioGate>
  );
}

function Cross({ className }: { className: string }) {
  return (
    <span aria-hidden className={`absolute font-mono text-lg leading-none ${className}`}>
      +
    </span>
  );
}
