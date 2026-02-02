import React from "react";
import { RippleButton } from "@/components/ui/ripple-button";
import { Badge } from "@/components/ui/badge";
import { MoveRight, PhoneCall } from "lucide-react";

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

const CORE_SERVICES = [
  {
    name: "Presencia Digital",
    description: "Sitio web profesional con pagos, formularios y citas online.",
    pricing: [
      "Desde $247 configuración",
      "Hosting desde $20/mes",
      "Chatbot opcional",
    ],
    cta: "Agendar llamada",
  },
  {
    name: "Atención IA",
    description:
      "Recepcionista inteligente por mensajes y llamadas. Atiende clientes 24/7.",
    pricing: [
      "After hours desde $299/mes",
      "24/7 desde $599/mes",
      "Precio varía por horas y volumen",
    ],
    cta: "Agendar llamada",
    popular: true,
  },
  {
    name: "Presencia + IA",
    description:
      "Website + recepción IA totalmente conectados en una sola base de datos.",
    pricing: [
      "$997 primer mes (setup)",
      "Luego el plan mensual de Atención IA elegido",
    ],
    cta: "Agendar llamada",
  },
];

const ADVANCED = [
  {
    name: "Automatización Empresarial",
    description:
      "Workflows, CRM, integraciones y sistemas internos para empresas en crecimiento.",
    pricing: [
      "Desde $2,499 configuración",
      "Mantenimiento mensual según alcance",
    ],
    cta: "Agendar diagnóstico",
  },
  {
    name: "Desarrollo Institucional",
    description:
      "Arquitectura completa, automatización a gran escala y soluciones enterprise.",
    pricing: [
      "Desde $9,999 configuración",
      "SLA y mantenimiento personalizados",
    ],
    cta: "Contactar",
    enterprise: true,
  },
];

function ServiceCard({ service }) {
  return (
    <div
      className={`relative flex flex-col rounded-xl border p-7 bg-card/60 ${
        service.popular ? "border-emerald-600 shadow-lg" : "border-border"
      }`}
    >
      {service.popular && (
        <Badge className="absolute -top-2.5 left-6 bg-emerald-600 text-white border-0 text-[11px]">
          Más popular
        </Badge>
      )}

      <h3 className="text-lg font-semibold">{service.name}</h3>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {service.description}
      </p>

      <ul className="mt-6 space-y-2 text-sm text-muted-foreground flex-1">
        {service.pricing.map((p) => (
          <li key={p}>• {p}</li>
        ))}
      </ul>

      <RippleButton
        onClick={() => scrollTo("diagnostico")}
        className="mt-8 w-full"
      >
        {service.cta}
        {service.enterprise ? (
          <PhoneCall className="h-4 w-4" />
        ) : (
          <MoveRight className="h-4 w-4" />
        )}
      </RippleButton>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="planes" className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Core */}
        <h2 className="text-3xl font-semibold mb-8">Servicios Principales</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {CORE_SERVICES.map((s) => (
            <ServiceCard key={s.name} service={s} />
          ))}
        </div>

        {/* Advanced */}
        <h2 className="text-3xl font-semibold mt-16 mb-8">
          Soluciones Avanzadas
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {ADVANCED.map((s) => (
            <ServiceCard key={s.name} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}