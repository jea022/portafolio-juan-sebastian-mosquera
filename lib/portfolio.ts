// Portafolio organizado por proyecto/cliente (PLAN.md, pasada 29): cada carpeta real del
// Drive de Sebastián es un proyecto. Los videos e imágenes se embeben directo desde Drive
// (el archivo sigue siendo del cliente, no se sube a ningún otro lado), con el visor público
// `drive.google.com/file/d/ID/preview` para video y PDF, y la miniatura `lh3` para imagen.
// IDs reales sacados del Drive el 2026-10-07; no son datos inventados.

export type AssetKind = "video" | "image" | "pdf";

export type Asset = {
  kind: AssetKind;
  driveId: string;
  label: string;
  // Orientación real del archivo (comprobada abriendo cada uno en Drive, pasada 44): todo el
  // video y la imagen del cliente es vertical (reels e historias), por eso es el default
  // cuando no se especifica. Solo hace falta marcar "horizontal" si algún archivo nuevo lo es.
  // No aplica a "pdf" (son documentos de varias páginas, no una sola proporción).
  orientation?: "vertical" | "horizontal";
};

// Texto del caso de estudio de cada proyecto (pasada 38). Contenido base: documento del cliente
// "Contexto de cada proyecto" (Google Docs, 2026-10-08), reescrito en tono de portafolio
// profesional. `result` solo lleva cifra cuando el cliente la dio; no se inventan números.
export type ProjectBrief = {
  challenge: string;
  role: string;
  highlights: string[];
  result?: string;
  tags?: string[];
};

// Datos reales de resultado (pasada 41), leídos a mano de las capturas de Instagram que pasó
// el cliente (no se exportan datos exactos desde Instagram, así que esto es una lectura fiel
// del gráfico/las barras que se ven en pantalla, no una cifra exacta día por día). Se grafican
// con nuestros propios componentes en vez de incrustar la captura.
export type MetricBarItem = { label: string; value: number; display: string };
export type GrowthPoint = { day: number; value: number };

export type ProjectMetrics = {
  note: string;
  viewsByType: MetricBarItem[];
  interactionsByType: MetricBarItem[];
  growth: {
    totalViews: string;
    netFollowers: string;
    series: GrowthPoint[];
    yTicks: { value: number; label: string }[];
    xLabels: { day: number; label: string }[];
  };
};

export type Project = {
  slug: string;
  title: string;
  assets: Asset[];
  // Métricas reales de resultado, cuando existen. No se inventan cifras.
  metrics?: ProjectMetrics;
  // Logo de la marca (carpeta "LOGOS" del Drive), usado como portada de la tarjeta. No todos
  // los proyectos tienen uno (p. ej. Presentaciones Corporativas no es una sola marca).
  logo?: string;
  // Caso de estudio escrito. Falta en los proyectos que el cliente todavía no redactó
  // (Presentaciones Corporativas) — no se inventa contexto donde no lo dieron.
  brief?: ProjectBrief;
};

// Orden del abanico pedido por el cliente (pasada 37): Voleibol, Ceviche, Presentaciones,
// Protein Club, Vlogs, Varas Grill, Light Reaction. El perfil va antes y el contacto después,
// eso lo arma `buildFanItems()` en `FanTile.tsx`.
export const PROJECTS: Project[] = [
  {
    slug: "copa-voleibol",
    title: "Copa Internacional de Voleibol, Santiago de Cali 2026",
    logo: "/logos/copa-voleibol.png",
    assets: [
      { kind: "video", driveId: "1lhzjxU9j06rBCHg5bAKisMDtfJiHUj9v", label: "Recap del último día" },
      { kind: "video", driveId: "1-_LHbOEXun7hWo_w5x9phjwpxRSPuXGZ", label: "Entrevista al coach Ramval" },
      { kind: "video", driveId: "16T_5t7zyTFF6P3kCYdy_ZJW7rzFBSdtS", label: "Entrevista a jugadores de Toluca" },
      { kind: "image", driveId: "1peqgE-FCaSTBVyRyKogGP3oN2ZV2xIb0", label: "Historia de Instagram" },
      { kind: "image", driveId: "18dkwfzV7_orqYh0p_uFzqnqJjpkyAd2y", label: "Carrusel publicado (18,8 mil alcance)" },
      { kind: "image", driveId: "1hP9e1XvxBSlKkZQTx9QOZuPsIpQNkKoN", label: "Flyer: próxima edición en Cartagena" },
    ],
    metrics: {
      note: "Instagram, un mes de campaña (8 jul – 10 ago). Lectura fiel de las métricas propias de la cuenta.",
      viewsByType: [
        { label: "Reels", value: 112000, display: "112 mil" },
        { label: "Historias", value: 46000, display: "46 mil" },
        { label: "Publicaciones", value: 42000, display: "42 mil" },
        { label: "Videos en vivo", value: 0, display: "0" },
      ],
      interactionsByType: [
        { label: "Reels", value: 3800, display: "3,8 mil" },
        { label: "Publicaciones", value: 1100, display: "1,1 mil" },
        { label: "Historias", value: 809, display: "809" },
        { label: "Videos en vivo", value: 0, display: "0" },
      ],
      growth: {
        totalViews: "200.305",
        netFollowers: "+356",
        series: [
          { day: 0, value: 2000 },
          { day: 3, value: 8200 },
          { day: 6, value: 6200 },
          { day: 8, value: 7600 },
          { day: 11, value: 15500 },
          { day: 13, value: 23600 },
          { day: 15, value: 21200 },
          { day: 16, value: 24000 },
          { day: 18, value: 9200 },
          { day: 20, value: 4100 },
          { day: 22, value: 1600 },
          { day: 25, value: 800 },
          { day: 27, value: 4200 },
          { day: 30, value: 1200 },
          { day: 33, value: 400 },
        ],
        yTicks: [
          { value: 0, label: "0" },
          { value: 12000, label: "12 mil" },
          { value: 24000, label: "24 mil" },
        ],
        xLabels: [
          { day: 0, label: "8 jul" },
          { day: 16, label: "24 jul" },
          { day: 33, label: "10 ago" },
        ],
      },
    },
    brief: {
      challenge:
        "La Copa Internacional de Voleibol trajo a Cali delegaciones y atletas de distintos países, pero antes del primer saque no existía ninguna comunidad digital alrededor del torneo. El encargo fue construirla desde cero: generar expectativa previa, acercarle a la gente las historias detrás de cada delegación y sostener el interés día a día, desde la inauguración hasta la final, sin perder ritmo en ningún momento de la competencia.",
      role: "Community Manager, Creador de Contenido y Editor de Video",
      highlights: [
        "Cobertura audiovisual en vivo y entrevistas a coaches y deportistas de las distintas delegaciones.",
        "Edición de reels y TikToks en formato vertical (CapCut): ritmo de corte, subtítulos y música pensados para retener a la audiencia.",
        "Guiones y copies orientados a generar interacción real, no solo alcance.",
        "Seguimiento mensual de métricas para ajustar la estrategia de contenido sobre la marcha.",
      ],
      result:
        "Más de 200.000 reproducciones en un mes, con crecimiento sostenido de interacciones y seguidores nuevos durante toda la campaña.",
    },
  },
  {
    slug: "ceviche-co-xpress",
    title: "Ceviche Co Xpress (USA)",
    logo: "/logos/ceviche-co-xpress.png",
    assets: [
      { kind: "video", driveId: "1DiqLnqUhjjqI5cmCrOqJjnSpGvgaoq6u", label: "Video (inglés)" },
      { kind: "video", driveId: "1hhz2DyR5eou7OC28O1JcQH2D7U8jSLup", label: "Video (original)" },
    ],
    brief: {
      challenge:
        "Ceviche Co Xpress es un concepto de comida rápida gourmet pensado para el mercado norteamericano, donde conviven un público angloparlante y una comunidad hispana igual de grande. El reto no era solo traducir: había que construir dos voces igual de auténticas, que transmitieran la misma frescura y la misma rapidez de servicio sin que ninguna se sintiera una copia de la otra.",
      role: "Content Creator Bilingüe y Estratega Audiovisual",
      highlights: [
        "Reels y TikToks grabados y editados en español e inglés.",
        "Adaptación de copies y mensajes clave para conectar con audiencias multiculturales en EE. UU.",
        "Edición dinámica en CapCut, con foco en transmitir la frescura del producto y la rapidez del servicio.",
      ],
      tags: ["Bilingüe (ES/EN)"],
    },
  },
  {
    slug: "presentaciones-corporativas",
    title: "Presentaciones Corporativas",
    logo: "/logos/presentaciones-corporativas.png",
    assets: [
      { kind: "pdf", driveId: "1RbhKCMvrpi2PtFlfOYNxMWmClWd3FFE0", label: "Qienergy" },
      { kind: "pdf", driveId: "15Af9emdJ9dBO8A9RxTlfMuqFV1EtGo8p", label: "MK Producciones" },
    ],
  },
  {
    slug: "protein-club",
    title: "Protein Club",
    logo: "/logos/protein-club.png",
    assets: [{ kind: "video", driveId: "1QTUwc358OsSpF-7Dgg_0hHlJGzp21Y_b", label: "Así se prepara un burrito" }],
    brief: {
      challenge:
        "Protein Club, su local de alimentación saludable y bebidas funcionales en Arbolatta Mall, lanza productos de edición limitada con frecuencia — un batido, un sándwich, una opción nueva del menú — y necesitaba que cada lanzamiento llegara a un público fitness que decide rápido qué probar. El contenido tenía que transmitir sabor y frescura en segundos, sin perder de vista el valor nutricional que es la razón de ser de la marca.",
      role: "Community Manager, Diseñador de Contenidos y Editor de Video",
      highlights: [
        "Reels verticales para cada lanzamiento, del batido Maracuyá-Piña al Sándwich de Ropa Vieja.",
        "Carruseles y piezas gráficas para mantener el feed activo entre lanzamientos.",
        "Copy enfocado en sabor, frescura y beneficio nutricional, no solo en el producto.",
        "Calendario editorial en Notion para coordinar lo visual con lo estratégico.",
      ],
    },
  },
  {
    slug: "vlogs-personales",
    title: "Vlogs Personales",
    logo: "/logos/vlogs-personales.png",
    assets: [
      { kind: "video", driveId: "1JgyIbV2-a8zrUom7gLM_b_VUQr3S6Md7", label: "Gimnasio" },
      { kind: "video", driveId: "1KvyZhilmOqTuzzFp8T4e59KvsHg9OMKR", label: "Viaje" },
    ],
    brief: {
      challenge:
        "Sin cliente ni brief de por medio, este fue un espacio propio para experimentar con narrativa: rutinas de entrenamiento, viajes y el día a día, grabados y editados como contenido de estilo de vida. La idea era entender desde adentro cómo se construye un vlog que retiene a la audiencia — el mismo oficio que después aplico en proyectos de marca.",
      role: "Creador de Contenido y Editor Audiovisual",
      highlights: [
        "Grabación y montaje de vlogs para Reels y TikTok.",
        "Técnicas de corte, selección musical, transiciones y voice-over en CapCut.",
        "Storytelling con hook inicial, pensado para retener a la audiencia desde el primer segundo.",
      ],
      tags: ["Contenido personal / estilo vlog"],
    },
  },
  {
    slug: "varas-grill",
    title: "Varas Grill (USA)",
    logo: "/logos/varas-grill.png",
    assets: [
      { kind: "video", driveId: "1RIByZXFB8veFXLQH8h3DQF_LLAqmAj_I", label: "Entrevista" },
      { kind: "video", driveId: "1DBBBhRTkvk_3KLKKXjIv7fUY6v3-uU1p", label: "Invitación al evento" },
    ],
    brief: {
      challenge:
        "Varas Grill compite en el mercado gastronómico hispano de Estados Unidos, donde la decisión de ir a un restaurante casi siempre arranca en redes. El contenido tenía que transportar al espectador al lugar — el ambiente, la gente, el fuego de la parrilla — antes de que pusiera un pie adentro, con la misma calidez con la que el lugar recibe a sus comensales.",
      role: "Creador de Contenido Multimedia y Video Editor",
      highlights: [
        "Videoentrevistas grabadas y editadas para redes sociales.",
        "Guiones y narrativa audiovisual centrados en los platos estrella y la propuesta del lugar.",
        "Adaptación a formatos cortos para ganar alcance real en cada plataforma.",
      ],
    },
  },
  {
    slug: "light-reaction",
    title: "Light Reaction Jiu Jitsu",
    logo: "/logos/light-reaction.png",
    assets: [
      { kind: "video", driveId: "1eCtu0A8WK65aKzVeRfwlprHrLO0Fvf88", label: "3 mitos sobre el BJJ" },
      { kind: "video", driveId: "1VTIev_sS-Iyd7u4Y8cI9I5ObiwNDF3b-", label: "Así se entrena" },
    ],
    brief: {
      challenge:
        "Light Reaction es una academia de Jiu-Jitsu Brasileño, una disciplina que para muchos suena intimidante antes de probarla: el miedo a no tener el nivel físico suficiente, o a no entender nada en la primera clase, frena a más gente de la que la academia alcanza a ver. El trabajo fue derribar esos mitos uno por uno y mostrar que la primera clase es, sobre todo, un punto de partida.",
      role: "Community Manager, Copywriter y Editor de Video",
      highlights: [
        "Reels y videos cortos con ritmo y subtítulos, pensados para enganchar desde el primer segundo.",
        "Copies empáticos y educativos que desmitifican la práctica del deporte para quien nunca entrenó.",
        "CTAs estratégicos hacia la clase de cortesía, por DM y enlace en bio, con foco en conversión real.",
        "Gestión directa de la conversación con cada usuario interesado.",
      ],
    },
  },
];

// Datos de contacto reales del cliente. Los que falten quedan en null y el modal muestra "Pendiente".
export type ContactKey = "correo" | "telefono" | "whatsapp" | "linkedin" | "instagram" | "ubicacion";

export const CONTACT: { label: string; key: ContactKey; value: string | null; href: string | null }[] = [
  { label: "Correo", key: "correo", value: "mosquera0107@gmail.com", href: "mailto:mosquera0107@gmail.com" },
  { label: "Teléfono", key: "telefono", value: "+57 350 4391876", href: "tel:+573504391876" },
  { label: "Ubicación", key: "ubicacion", value: "Cali, Colombia", href: null },
  { label: "WhatsApp", key: "whatsapp", value: "+57 350 4391876", href: "https://wa.me/573504391876" },
  {
    label: "LinkedIn",
    key: "linkedin",
    value: "/in/sebastián-mosquera",
    href: "https://www.linkedin.com/in/sebasti%C3%A1n-mosquera-816367417/",
  },
  { label: "Instagram", key: "instagram", value: "@sebas.107", href: "https://www.instagram.com/sebas.107" },
];
