import React from "react";
import { Button } from "@/components/ui/button";
import { Globe, Phone, Zap } from "lucide-react";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const SERVICES = [
  {
    icon: Globe,
    name: "Presencia Digital",
    price: "247",
    period: "setup",
    description: "Website + formularios + citas",
    popular: false,
  },
  {
    icon: Phone,
    name: "Atención IA",
    price: "599",
    period: "mensual",
    description: "Recepcionista inteligente 24/7",
    popular: true,
  },
  {
    icon: Zap,
    name: "Infraestructura completa",
    price: "999",
    period: "mensual",
    description: "Sistema + IA + automatización básica",
    popular: false,
  },
];

export default function ModularServices() {
  return (
    <section className="py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="mb-20">
          <h2 className="text-[52px] font-bold text-white leading-[1.1] tracking-tight">
            Servicios modulares
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className={`relative rounded-2xl border p-10 transition-all ${
                  service.popular
                    ? "border-emerald-500/30 bg-gradient-to-b from-emerald-950/10 to-transparent"
                    : "border-white/10 bg-gradient-to-b from-white/[0.01] to-transparent hover:border-white/20"
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-8">
                    <span className="inline-block rounded-full bg-emerald-600 px-4 py-1.5 text-[11px] font-bold text-white uppercase tracking-wider">
                      Más popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <div className={`inline-flex rounded-xl p-3 ${
                    service.popular ? "bg-emerald-500/20" : "bg-white/5"
                  }`}>
                    <Icon className={`h-7 w-7 ${
                      service.popular ? "text-emerald-400" : "text-[#9AA6B2]"
                    }`} />
                  </div>
                </div>

                <h3 className="text-[24px] font-bold text-white mb-4">
                  {service.name}
                </h3>
                
                <p className="text-[15px] text-[#9AA6B2] leading-relaxed mb-10">
                  {service.description}
                </p>

                <div className="mb-10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[12px] text-[#9AA6B2]">Desde</span>
                    <span className="text-[44px] font-bold text-white leading-none">
                      ${service.price}
                    </span>
                    <span className="text-[15px] text-[#9AA6B2]">/{service.period}</span>
                  </div>
                </div>

                <Button
                  onClick={() => scrollTo("contacto")}
                  className={`w-full py-4 h-auto rounded-xl text-[15px] font-semibold ${
                    service.popular
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  Agendar llamada
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}