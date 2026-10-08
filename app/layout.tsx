import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono, Syne } from "next/font/google";
import "./globals.css";

// Tipografía confirmada (PLAN.md, pasadas 9 y 10): Syne para títulos,
// Bricolage Grotesque para el cuerpo y Space Mono para etiquetas.
const syne = Syne({ subsets: ["latin"], weight: ["800"], variable: "--font-syne" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });

export const metadata: Metadata = {
  title: "Juan Sebastian Mosquera · Portafolio",
  description: "Portafolio de edición de video y creación de contenido de Juan Sebastian Mosquera.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${bricolage.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
