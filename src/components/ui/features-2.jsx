import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles, Workflow, Globe, ChevronDown } from "lucide-react";

const DEFAULT_FEATURES = [
  {
    key: "grants",
    title: "Inteligencia de Subvenciones",
    desc: "Encontramos oportunidades reales, filtramos elegibilidad y aceleramos el proceso con IA.",
    icon: Sparkles,
    bullets: ["Búsqueda y matching automático", "Análisis de elegibilidad", "Soporte en propuestas"],
    more: [
      "Reportes claros (qué aplicar y qué no).",
      "Priorización por probabilidad / alineación.",
      "Estructura de propuesta y checklist por requisito.",
    ],
  },
  {
    key: "automation",
    title: "Automatización con IA",
    desc: "Conectamos tus operaciones para que el trabajo repetitivo desaparezca.",
    icon: Workflow,
    bullets: ["Workflows inteligentes", "Integración con CRM", "Recordatorios y seguimiento"],
    more: [
      "Automatización de tareas internas (asignaciones, seguimiento, alerts).",
      "Enrutamiento de leads / solicitudes según reglas.",
      "Historial y trazabilidad para operar sin perder información.",
    ],
  },
  {
    key: "digital",
    title: "Infraestructura Digital",
    desc: "Sitio, formularios y flujo digital conectado al mismo sistema.",
    icon: Globe,
    bullets: ["Sitios web profesionales", "Portales y formularios", "Integraciones a medida"],
    more: [
      "Landing optimizada para conversión (CTA + diagnóstico).",
      "Formularios conectados a tu base de datos.",
      "Integraciones con herramientas existentes (si lo permiten).",
    ],
  },
];

export function Features2({
  title = "Infraestructura modular",
  headline = "Sistemas construidos para escalar",
  subheadline = "No vendemos proyectos sueltos. Construimos piezas modulares que se integran entre sí para operar con eficiencia y crecer sin añadir trabajo manual.",
  items = DEFAULT_FEATURES,
}) {
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) => setOpenKey((p) => (p === key ? null : key));

  return (
    <section className="py-16 md:py-28">
      <div className="@container mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
            {title}
          </div>

          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            {headline}
          </h2>

          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            {subheadline}
          </p>
        </div>

        <div className="@min-4xl:grid-cols-3 mx-auto mt-10 grid max-w-sm gap-6 md:mt-16 md:max-w-none">
          {items.map((item) => {
            const Icon = item.icon;
            const isOpen = openKey === item.key;

            return (
              <Card key={item.key} className="group border-0 bg-muted shadow-none">
                <CardHeader className="pb-3 text-center">
                  <CardDecorator>
                    <Icon className="size-6" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </CardHeader>

                <CardContent className="text-center">
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start justify-center gap-2">
                        <span className="mt-[6px] h-1 w-1 rounded-full bg-muted-foreground/50" />
                        <span className="text-left">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* More info */}
                  <button
                    type="button"
                    onClick={() => toggle(item.key)}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-accent transition"
                  >
                    {isOpen ? "Menos info" : "Más info"}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-4 rounded-xl border bg-background/60 p-4 text-left">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {item.more.map((m) => (
                          <li key={m} className="flex items-start gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-foreground/40" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CardDecorator({ children }) {
  return (
    <div
      aria-hidden
      className="relative mx-auto size-28 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
    >
      <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
      <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">
        {children}
      </div>
    </div>
  );
}