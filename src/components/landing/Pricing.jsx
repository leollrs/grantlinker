import React from "react";
import { Button } from "@/components/ui/button";
import { Globe, Phone, Zap } from "lucide-react";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const SERVICES = [
  {
    icon: Globe,
    name: "Presencia Digital",
    description: "Website profesional + formularios + citas online",
    price: "247",
    period: "setup",
    cta: "Agendar llamada",
    popular: false,
  },
  {
    icon: Phone,
    name: "Atención IA",
    description: "Recepcionista inteligente 24/7",
    price: "599",
    period: "mes",
    cta: "Agendar llamada",
    popular: true,
  },
  {
    icon: Zap,
    name: "Infraestructura completa",
    description: "Sistema + IA + automatización total",
    price: "999",
    period: "mes",
    cta: "Agendar diagnóstico",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="planes" className="py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-16">
          <h2 className="text-[36px] sm:text-[44px] font-bold text-white leading-[1.1] tracking-tight mb-4">
            Servicios diseñados para escalar
          </h2>
          <p className="text-[16px] text-[#9AA6B2] max-w-[600px] mx-auto">
            Comienza con lo que necesitas hoy. Expande cuando tu operación lo pida.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className={`relative rounded-2xl border p-8 transition-all ${
                  service.popular
                    ? "border-emerald-500/50 bg-gradient-to-b from-emerald-950/20 to-transparent scale-105 shadow-xl shadow-emerald-900/10"
                    : "border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent hover:border-white/20"
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-emerald-600 px-4 py-1 text-[11px] font-semibold text-white uppercase tracking-wider">
                      Más popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className={`inline-flex rounded-xl p-3 ${
                    service.popular ? "bg-emerald-500/20" : "bg-white/5"
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      service.popular ? "text-emerald-400" : "text-[#9AA6B2]"
                    }`} />
                  </div>
                </div>

                <h3 className="text-[24px] font-bold text-white mb-3">
                  {service.name}
                </h3>
                
                <p className="text-[14px] text-[#9AA6B2] leading-relaxed mb-8 min-h-[40px]">
                  {service.description}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] text-[#9AA6B2]">Desde</span>
                    <span className="text-[48px] font-bold text-white leading-none">
                      ${service.price}
                    </span>
                    <span className="text-[14px] text-[#9AA6B2]">/{service.period}</span>
                  </div>
                </div>

                <Button
                  onClick={() => scrollTo(service.cta === "Agendar diagnóstico" ? "diagnostico" : "contacto")}
                  className={`w-full py-3 h-auto rounded-xl text-[14px] font-semibold ${
                    service.popular
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {service.cta}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}