// Mismo esquema que apps/kaze-studio: export estático servido en GitHub Pages bajo
// /<repo>/, con basePath solo activo en el build de CI (GITHUB_PAGES=true), para que
// `pnpm dev` y el build local sigan sirviendo desde la raíz.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = "/portafolio-juan-sebastian-mosquera";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGithubPages ? basePath : "",
  assetPrefix: isGithubPages ? basePath : "",
  env: {
    // `next/image` con `unoptimized` y los `<img>`/`url()` propios no anteponen el basePath
    // solos; cada referencia a un archivo de `public/` lo arma a mano con esta variable
    // (`lib/utils.ts#withBasePath`). Mismo esquema que apps/kaze-studio.
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? basePath : "",
  },
};

export default nextConfig;
