import type { Lang } from "./i18n";
import type { FormacionItem, MetricBarItem, Project, ProfileData } from "./portfolio";

// Traducción al inglés del caso de estudio de cada proyecto. Español (`portfolio.ts`) es la
// fuente de verdad: esto es una capa que se superpone encima cuando el idioma es "en", campo
// por campo (lo que no está acá, como `assets` o `logo`, no cambia con el idioma). Mismo criterio
// de siempre: no se inventa nada, es la traducción directa de lo que el cliente redactó en
// español.
type ProjectTranslation = {
  title?: string;
  ringLabel?: string;
  brief?: {
    challenge?: string;
    role?: string;
    highlights?: string[];
    result?: string;
    tags?: string[];
  };
  metrics?: {
    note?: string;
    viewsByType?: MetricBarItem[];
    interactionsByType?: MetricBarItem[];
    growth?: {
      totalViews?: string;
      netFollowers?: string;
      yTicks?: { value: number; label: string }[];
      xLabels?: { day: number; label: string }[];
    };
  };
};

const PROJECT_TRANSLATIONS_EN: Record<string, ProjectTranslation> = {
  "copa-voleibol": {
    title: "Int'l. Volleyball Cup, Santiago de Cali 2026",
    ringLabel: "Int'l\nVolleyball\nCup",
    metrics: {
      note: "Instagram, one month of campaign (Jul 8 – Aug 10). A faithful reading of the account's own metrics.",
      viewsByType: [
        { label: "Reels", value: 112000, display: "112K" },
        { label: "Stories", value: 46000, display: "46K" },
        { label: "Posts", value: 42000, display: "42K" },
        { label: "Live videos", value: 0, display: "0" },
      ],
      interactionsByType: [
        { label: "Reels", value: 3800, display: "3.8K" },
        { label: "Posts", value: 1100, display: "1.1K" },
        { label: "Stories", value: 809, display: "809" },
        { label: "Live videos", value: 0, display: "0" },
      ],
      growth: {
        totalViews: "200,305",
        netFollowers: "+356",
        yTicks: [
          { value: 0, label: "0" },
          { value: 12000, label: "12K" },
          { value: 24000, label: "24K" },
        ],
        xLabels: [
          { day: 0, label: "Jul 8" },
          { day: 16, label: "Jul 24" },
          { day: 33, label: "Aug 10" },
        ],
      },
    },
    brief: {
      challenge:
        "The International Volleyball Cup brought delegations and athletes from different countries to Cali, but before the first serve there was no digital community around the tournament at all. The brief was to build one from scratch: generate buzz ahead of time, bring people the stories behind each delegation, and keep interest alive day after day, from the opening ceremony to the final, without losing momentum at any point in the competition.",
      role: "Community Manager, Content Creator & Video Editor",
      highlights: [
        "Live audiovisual coverage and interviews with coaches and athletes from the different delegations.",
        "Vertical-format reel and TikTok editing (CapCut): cut pacing, subtitles, and music designed to hold the audience's attention.",
        "Scripts and copy aimed at driving real engagement, not just reach.",
        "Monthly metrics tracking to adjust the content strategy on the fly.",
      ],
      result:
        "Over 200,000 views in one month, with steady growth in engagement and new followers throughout the campaign.",
    },
  },
  "ceviche-co-xpress": {
    brief: {
      challenge:
        "Ceviche Co Xpress is a gourmet fast-food concept built for the U.S. market, where an English-speaking audience and an equally large Hispanic community coexist. The challenge wasn't just translation: it meant building two equally authentic voices that conveyed the same freshness and the same fast service, without either one feeling like a copy of the other.",
      role: "Bilingual Content Creator & Audiovisual Strategist",
      highlights: [
        "Reels and TikToks shot and edited in both Spanish and English.",
        "Adapted copy and key messaging to connect with multicultural audiences in the U.S.",
        "Dynamic CapCut editing focused on conveying the product's freshness and the speed of service.",
      ],
      tags: ["Bilingual (ES/EN)"],
    },
  },
  "presentaciones-corporativas": {
    title: "Corp. Presentations",
  },
  "protein-club": {
    brief: {
      challenge:
        "Protein Club, a healthy-eating and functional-drinks spot in Arbolatta Mall, frequently launches limited-edition products — a smoothie, a sandwich, a new menu item — and needed each launch to reach a fitness-minded audience that decides fast what to try. The content had to convey flavor and freshness in seconds, without losing sight of the nutritional value that's the brand's whole reason for being.",
      role: "Community Manager, Content Designer & Video Editor",
      highlights: [
        "Vertical reels for every launch, from the Passionfruit-Pineapple smoothie to the Ropa Vieja sandwich.",
        "Carousels and graphic pieces to keep the feed active between launches.",
        "Copy focused on flavor, freshness, and nutritional benefit, not just the product.",
        "Editorial calendar in Notion to keep the visuals and the strategy in sync.",
      ],
    },
  },
  "vlogs-personales": {
    title: "Personal Vlogs",
    brief: {
      challenge:
        "With no client or brief involved, this was a personal space to experiment with storytelling: workout routines, trips, and everyday life, shot and edited as lifestyle content. The idea was to understand from the inside how a vlog that keeps an audience watching actually gets built — the same craft I later apply to brand projects.",
      role: "Content Creator & Audiovisual Editor",
      highlights: [
        "Filming and editing vlogs for Reels and TikTok.",
        "Cutting techniques, music selection, transitions, and voice-over in CapCut.",
        "Storytelling with a strong opening hook, built to hold the audience from the first second.",
      ],
      tags: ["Personal content / vlog style"],
    },
  },
  "varas-grill": {
    brief: {
      challenge:
        "Varas Grill competes in the U.S. Hispanic dining market, where the decision to go to a restaurant almost always starts on social media. The content had to transport viewers to the place — the atmosphere, the people, the fire on the grill — before they ever set foot inside, with the same warmth the restaurant welcomes its guests with.",
      role: "Multimedia Content Creator & Video Editor",
      highlights: [
        "Video interviews shot and edited for social media.",
        "Scripts and audiovisual storytelling centered on the signature dishes and the restaurant's concept.",
        "Adapted into short formats to gain real reach on each platform.",
      ],
    },
  },
  "light-reaction": {
    brief: {
      challenge:
        "Light Reaction is a Brazilian Jiu-Jitsu academy, a discipline that sounds intimidating to many before they ever try it: the fear of not being fit enough, or of not understanding anything in the first class, scares off more people than the academy ever gets to see. The job was to take down those myths one by one and show that the first class is, above all, a starting point.",
      role: "Community Manager, Copywriter & Video Editor",
      highlights: [
        "Reels and short videos with pacing and subtitles, built to hook viewers from the first second.",
        "Empathetic, educational copy that demystifies the sport for anyone who's never trained.",
        "Strategic CTAs toward the free trial class, through DMs and the bio link, focused on real conversion.",
        "Direct, hands-on conversation management with every interested follower.",
      ],
    },
  },
};

// Arma la versión del proyecto en el idioma pedido, superponiendo la traducción campo por campo
// sobre la base en español (`project`). En español devuelve el proyecto tal cual.
export function localizeProject(project: Project, lang: Lang): Project {
  if (lang === "es") return project;
  const tr = PROJECT_TRANSLATIONS_EN[project.slug];
  if (!tr) return project;
  return {
    ...project,
    title: tr.title ?? project.title,
    ringLabel: tr.ringLabel ?? project.ringLabel,
    brief: project.brief
      ? {
          ...project.brief,
          ...tr.brief,
        }
      : project.brief,
    metrics:
      project.metrics && tr.metrics
        ? {
            ...project.metrics,
            note: tr.metrics.note ?? project.metrics.note,
            viewsByType: tr.metrics.viewsByType ?? project.metrics.viewsByType,
            interactionsByType: tr.metrics.interactionsByType ?? project.metrics.interactionsByType,
            growth: {
              ...project.metrics.growth,
              totalViews: tr.metrics.growth?.totalViews ?? project.metrics.growth.totalViews,
              netFollowers: tr.metrics.growth?.netFollowers ?? project.metrics.growth.netFollowers,
              yTicks: tr.metrics.growth?.yTicks ?? project.metrics.growth.yTicks,
              xLabels: tr.metrics.growth?.xLabels ?? project.metrics.growth.xLabels,
            },
          }
        : project.metrics,
  };
}

// Traducción de las etiquetas de contacto (no de los valores: el correo, el teléfono, el link
// de LinkedIn son los mismos en cualquier idioma). WhatsApp y LinkedIn son nombres de marca,
// no cambian.
export const CONTACT_LABELS_EN: Partial<Record<string, string>> = {
  Correo: "Email",
  Teléfono: "Phone",
  Ubicación: "Location",
};

// Traducción del perfil (pasada 51), mismo criterio que `PROJECT_TRANSLATIONS_EN`: el español
// (`PROFILE` en `portfolio.ts`) es la fuente de verdad, esto es la traducción directa de lo que
// el cliente dio. `herramientas` no se traduce (son nombres de marca: CapCut, Canva, Notion).
const PROFILE_TRANSLATION_EN: {
  bio: string[];
  skills: string[];
  formacion: FormacionItem[];
} = {
  bio: [
    "Marketing and International Business professional, with a creative and proactive profile that turns every project into a chance for continuous improvement. The work connects content strategy with each brand's business goals: from the first idea to the finished piece, always keeping in mind what the audience needs and what the business needs.",
    "It includes end-to-end social media management and the production of dynamic audiovisual pieces for digital platforms, backed by hands-on command of the tools that make that process possible.",
  ],
  skills: [
    "Content strategy aligned with business goals",
    "End-to-end social media management",
    "Dynamic audiovisual production and editing",
    "Visual concept development and art direction",
    "Editorial calendar planning and organization",
    "Creative thinking applied to brand",
    "Proactivity and commitment to continuous improvement",
  ],
  formacion: [
    {
      titulo: "Marketing Professional — Marketing and International Business",
      institucion: "Universidad de San Buenaventura Cali",
      periodo: "2022 – Present",
    },
    {
      titulo: "Diploma in Marketing and Sales 5.0: Connecting Strategy, Technology, and the Customer",
      institucion: "Universidad de San Buenaventura Cali",
      periodo: "Jun. 2026",
    },
    {
      titulo: "C1 English Certificate",
      institucion: "Learn English, Cali",
    },
  ],
};

export function localizeProfile(profile: ProfileData, lang: Lang): ProfileData {
  if (lang === "es") return profile;
  return { ...profile, ...PROFILE_TRANSLATION_EN };
}
