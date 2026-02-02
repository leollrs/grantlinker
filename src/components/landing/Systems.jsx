
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles, Workflow, Globe, PhoneCall, ArrowRight, Check } from "lucide-react";

const PILLARS = [
  {
    key: "grants",
    title: "Inteligencia de Subvenciones",
    desc: "Encontramos, filtramos y apoyamos la aplicación a grants con IA.",
    icon: Sparkles,
    bullets: ["Búsqueda y matching automático", "Análisis de elegibilidad", "Soporte en propuestas"],
  },
  {
    key: "automation",
    title: "Automatización con IA",
    desc: "Workflows, CRM, chatbots, recordatorios y procesos automáticos.",
    icon: Workflow,
    bullets: ["Flujos de trabajo inteligentes", "Integración con CRM", "Chatbots y recordatorios"],
  },
  {
    key: "digital",
    title: "Infraestructura Digital",
    desc: "Sitios web, portales, formularios e integraciones.",
    icon: Globe,
    bullets: ["Sitios web profesionales", "Portales y formularios", "Integraciones a medida"],
  },
];

const RECEPTIONIST = {
  title: "Recepcionista IA",
  desc: "Atiende llamadas y agenda citas 24/7.",
  icon: PhoneCall,
  bullets: ["Atención 24/7 automática", "Agendamiento inteligente", "Transferencia de llamadas"],
};

export default function Systems() {
  return (
    <section id="sistemas" className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left intro */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
              Infraestructura modular
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Sistemas
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              No vendemos proyectos. Construimos sistemas: piezas modulares que se integran entre sí para
              operar con eficiencia y escalar sin añadir trabajo manual.
            </p>
          </div>

          {/* Pillars */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PILLARS.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.key} className="border bg-card/60">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background">
                          <Icon className="h-5 w-5" aria-hidden />
                        </div>
                        <div className="text-[11px] rounded-full border px-2 py-1 text-muted-foreground">
                          Pilar
                        </div>
                      </div>
                      <h3 className="mt-5 font-medium">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {item.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="mt-[2px] h-4 w-4 opacity-70" aria-hidden />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex items-center justify-between border-t pt-4">
                        <span className="text-xs text-muted-foreground">Ver detalles</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/70" aria-hidden />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Receptionist highlight */}
            <Card className="mt-6 border bg-muted/40">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border bg-background">
                      <RECEPTIONIST.icon className="h-5 w-5" aria-hidden />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{RECEPTIONIST.title}</h3>
                        <span className="rounded-full border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
                          24/7
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{RECEPTIONIST.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {RECEPTIONIST.bullets.map((b) => (
                          <span
                            key={b}
                            className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background"
                    >
                      Ver demo
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                    <a
                      href="#planes"
                      className="inline-flex items-center rounded-xl border bg-background px-4 py-2 text-sm font-semibold"
                    >
                      Ver planes
                    </a>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
