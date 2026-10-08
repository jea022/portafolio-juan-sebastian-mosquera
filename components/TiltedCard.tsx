"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

// Concepto de reactbits.dev/components/tilted-card: la tarjeta se inclina en 3D según la
// posición del cursor, con un resorte. Se traduce el movimiento con `motion` (ya es
// dependencia del proyecto, PLAN.md pasada 15); el contenido de la tarjeta es el nuestro.
const SPRING = { stiffness: 220, damping: 20, mass: 0.6 };

export function TiltedCard({ children, className }: { children: ReactNode; className?: string }) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), SPRING);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), SPRING);
  const scale = useSpring(1, SPRING);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseEnter={() => scale.set(1.04)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        scale.set(1);
      }}
      style={{ perspective: 800 }}
      className={cn("h-full w-full", className)}
    >
      <motion.div style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
