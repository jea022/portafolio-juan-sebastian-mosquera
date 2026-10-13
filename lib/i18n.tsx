"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

const STORAGE_KEY = "portfolio-lang";

type LanguageContextValue = {
  lang: Lang;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Envuelve toda la app (ver `layout.tsx`). Arranca en español siempre (primer render, server y
// cliente, tienen que coincidir); si había una elección guardada, se aplica recién después del
// montaje, en un efecto — por eso el toggle puede tardar un instante en reflejar lo guardado.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "es") setLang(stored);
    } catch {
      // Storage bloqueado (modo privado, etc.): se queda en español, sin romper nada.
    }
  }, []);

  // El atributo `lang` del `<html>` queda fijo en "es" en `layout.tsx` (es un Server Component,
  // no conoce el idioma elegido en el cliente); esto lo mantiene correcto para lectores de
  // pantalla y el corrector ortográfico del navegador.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === "es" ? "en" : "es";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Igual que arriba: si no se puede guardar, el cambio de idioma sigue andando en esta
        // visita, solo que no se recuerda para la próxima.
      }
      return next;
    });
  };

  return <LanguageContext.Provider value={{ lang, toggle }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return ctx;
}

// Textos cortos de interfaz (botones, etiquetas, encabezados). El contenido largo de cada
// proyecto (casos de estudio, métricas) vive aparte, en `portfolio.en.ts`, junto a un helper
// que arma la versión en inglés de cada `Project` sobre la base en español.
const UI_TEXT = {
  clasificado: { es: "Clasificado", en: "Classified" },
  expedienteTitle1: { es: "Expediente", en: "Creator's" },
  expedienteTitle2: { es: "Del creador", en: "File" },
  welcomeToMy: { es: "Bienvenido a mi", en: "Welcome to my" },
  sobreMi: { es: "Sobre mí", en: "About me" },
  selloAlt: { es: "Sello de clasificado", en: "Classified stamp" },
  revelarPortafolio1: { es: "Revelar", en: "Reveal" },
  revelarPortafolio2: { es: "Portafolio", en: "Portfolio" },
  nombreLabel: { es: "Nombre", en: "Name" },
  rolLabel: { es: "Rol", en: "Role" },
  ubicacionLabel: { es: "Ubicación", en: "Location" },
  expedienteNumLabel: { es: "Expediente n.º", en: "File no." },
  expedienteFooter: { es: "Expediente · 2026", en: "File · 2026" },
  perfil: { es: "Perfil", en: "Profile" },
  contacto: { es: "Contacto", en: "Contact" },
  communityManager: { es: "Community manager", en: "Community Manager" },
  formacionTitle: { es: "Formación", en: "Education" },
  skillsTitle: { es: "Skills a resaltar", en: "Skills to highlight" },
  herramientasTitle: { es: "Herramientas", en: "Tools" },
  contactIntro: {
    es: "Para proyectos, marcas o eventos que quieras contar en video. Elegí el canal que prefieras.",
    en: "For projects, brands, or events you want told on video. Pick whichever channel works best for you.",
  },
  correoLabel: { es: "Correo", en: "Email" },
  telefonoLabel: { es: "Teléfono", en: "Phone" },
  pendiente: { es: "Pendiente", en: "Pending" },
  horaLocal: { es: "Hora local", en: "Local time" },
  resultadosReales: { es: "Resultados reales", en: "Real results" },
  resultadoLabel: { es: "Resultado", en: "Result" },
  visualizacionesPorTipo: { es: "Visualizaciones por tipo", en: "Views by type" },
  interaccionesPorTipo: { es: "Interacciones por tipo", en: "Interactions by type" },
  crecimientoEnElMes: { es: "Crecimiento en el mes", en: "Growth this month" },
  visualizacionesWord: { es: "visualizaciones", en: "views" },
  seguidoresWord: { es: "seguidores", en: "followers" },
  growthChartAriaLabel: {
    es: "Crecimiento de visualizaciones durante el mes de campaña",
    en: "Growth in views during the campaign month",
  },
} as const;

export type UIKey = keyof typeof UI_TEXT;

export function useT() {
  const { lang } = useLanguage();
  return (key: UIKey) => UI_TEXT[key][lang];
}
