import type { MetricBarItem } from "@/lib/portfolio";

// Barras horizontales propias (paleta del sitio) para reemplazar la captura de Instagram.
export function MetricBars({ items }: { items: MetricBarItem[] }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
            <span className="text-bone/70">{item.label}</span>
            <span className="text-bone">{item.display}</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-bone/10">
            <div className="h-full rounded-full bg-crimson" style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
