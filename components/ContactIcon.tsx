import type { ContactKey } from "@/lib/portfolio";

// Íconos propios en SVG, sin sumar una librería de íconos por un solo modal.
const PATHS: Record<ContactKey, React.ReactNode> = {
  correo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  telefono: (
    <path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1Z" />
  ),
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.75 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
      <path d="M8.5 8.5c-.3.6-.5 1.3-.2 2.2.5 1.7 2.8 4 4.5 4.5.9.3 1.6.1 2.2-.2l.6-1-2-1-.6.6c-.8-.3-2-1.5-2.3-2.3l.6-.6-1-2Z" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5v6M7.5 7.8v.01M12 16.5v-3.6c0-1.3.9-2.4 2.3-2.4 1.3 0 2.2 1 2.2 2.4v3.6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  ubicacion: (
    <>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

// Colores por canal: marca real para WhatsApp, LinkedIn e Instagram; a nuestro criterio
// para correo, teléfono y ubicación. Todos verificados contra WCAG 1.4.11 (3:1 mínimo
// para íconos, no el 4.5:1 de texto).
export const CONTACT_TONE: Record<ContactKey, { bg: string; icon: string }> = {
  correo: { bg: "bg-amber-600", icon: "text-white" },
  telefono: { bg: "bg-sky-600", icon: "text-white" },
  whatsapp: { bg: "bg-[#128C7E]", icon: "text-white" }, // verde azulado oficial de WhatsApp
  linkedin: { bg: "bg-[#0A66C2]", icon: "text-white" }, // azul oficial de LinkedIn
  instagram: { bg: "bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]", icon: "text-white" },
  ubicacion: { bg: "bg-violet-500", icon: "text-white" },
};

export function ContactIcon({ name }: { name: ContactKey }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
      {PATHS[name]}
    </svg>
  );
}
