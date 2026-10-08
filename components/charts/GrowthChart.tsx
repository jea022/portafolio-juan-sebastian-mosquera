import type { GrowthPoint } from "@/lib/portfolio";

// Gráfica de línea propia (SVG, paleta del sitio) para reemplazar la captura de Instagram.
export function GrowthChart({
  series,
  yTicks,
  xLabels,
}: {
  series: GrowthPoint[];
  yTicks: { value: number; label: string }[];
  xLabels: { day: number; label: string }[];
}) {
  const width = 600;
  const height = 200;
  const padLeft = 48;
  const padRight = 12;
  const padTop = 10;
  const padBottom = 22;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const maxDay = Math.max(...series.map((p) => p.day));
  const maxValue = Math.max(...yTicks.map((t) => t.value), ...series.map((p) => p.value));

  const x = (day: number) => padLeft + (day / maxDay) * plotW;
  const y = (value: number) => padTop + plotH - (value / maxValue) * plotH;

  const linePath = series.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.day).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${x(series[series.length - 1].day).toFixed(1)},${y(0).toFixed(1)} L${x(series[0].day).toFixed(1)},${y(0).toFixed(1)} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Crecimiento de visualizaciones durante el mes de campaña">
      {yTicks.map((t) => (
        <g key={t.value}>
          <line x1={padLeft} x2={width - padRight} y1={y(t.value)} y2={y(t.value)} stroke="var(--color-bone)" strokeOpacity={0.12} />
          <text x={padLeft - 8} y={y(t.value)} textAnchor="end" dominantBaseline="middle" className="fill-bone/50 font-mono text-[9px]">
            {t.label}
          </text>
        </g>
      ))}
      <path d={areaPath} fill="var(--color-crimson)" fillOpacity={0.15} stroke="none" />
      <path d={linePath} fill="none" stroke="var(--color-crimson)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {xLabels.map((l) => (
        <text key={l.day} x={x(l.day)} y={height - 4} textAnchor="middle" className="fill-bone/50 font-mono text-[9px] uppercase">
          {l.label}
        </text>
      ))}
    </svg>
  );
}
