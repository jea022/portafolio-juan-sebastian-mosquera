"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Gate } from "./Gate";
import { Preloader } from "./Preloader";

// Antes de mostrar el portafolio (los `children`, que llegan del Server Component de la
// página), se ve la ficha "clasificada". El botón "Revelar" la cierra y recién ahí se monta
// el portafolio real, así sus animaciones de entrada (título, abanico) arrancan en ese momento.
// Mientras tanto, el Preloader va cargando en segundo plano los videos, imágenes y PDF de
// los proyectos, para que al entrar ya estén listos o casi.
export function PortfolioGate({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      {!revealed && <Preloader />}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="gate"
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Gate onReveal={() => setRevealed(true)} />
          </motion.div>
        )}
      </AnimatePresence>
      {revealed && children}
    </>
  );
}
