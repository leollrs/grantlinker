import React from "react";
import { Button } from "@/components/ui/button";
import { Blocks, Building2 } from "lucide-react";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const IMPLEMENTATIONS = [
  {
    icon: Blocks,
    name: "Automatización Empresarial",
    price: "2,499",
    description: "CRM + workflows + integraciones + sistemas internos",
    cta: "Agendar diagnóstico",
    ctaLink: "diagnostico",
    enterprise: false,
  },
  {
    icon: Building2,
    name: "Infraestructura Institucional",
    price: "9,999",
    description: "Arquitectura completa + IA + automatización total + soporte dedicado",
    cta: "Contactar ventas",
    ctaLink: "contacto",
    enterprise: true,
  },
];

export default function EnterpriseImplementations() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold text-white leading-[1.1] tracking-tight mb-4 sm:mb-6">
            Implementaciones empresariales
          </h2>
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#9AA6B2] max-w-[700px]">
            Proyectos completos para organizaciones que necesitan automatización total.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mt-12 sm:mt-16 lg:mt-20">
          {IMPLEMENTATIONS.map((impl) => {
            const Icon = impl.icon;
            return (
              <div
                key={impl.name}
                className={`relative rounded-2xl sm:rounded-3xl border p-8 sm:p-10 lg:p-12 transition-all ${
                  impl.enterprise
                    ? "border-purple-500/30 bg-gradient-to-br from-purple-950/10 via-transparent to-emerald-950/5"
                    : "border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-white/20"
                }`}
              >
                {impl.enterprise && (
                  <div className="absolute -top-3 sm:-top-4 left-6 sm:left-10">
                    <span className="inline-block rounded-full bg-purple-600 px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-[12px] font-bold text-white uppercase tracking-wider">
                      Enterprise
                    </span>
                  </div>
                )}

                <div className="mb-8 sm:mb-10">
                  <div className={`inline-flex rounded-xl sm:rounded-2xl p-3 sm:p-4 ${
                    impl.enterprise ? "bg-purple-500/20" : "bg-emerald-500/20"
                  }`}>
                    <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${
                      impl.enterprise ? "text-purple-400" : "text-emerald-400"
                    }`} />
                  </div>
                </div>

                <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-white mb-4 sm:mb-5 leading-tight">
                  {impl.name}
                </h3>
                
                <p className="text-[15px] sm:text-[17px] text-[#9AA6B2] leading-relaxed mb-10 sm:mb-12">
                  {impl.description}
                </p>

                <div className="mb-10 sm:mb-12">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[12px] sm:text-[13px] text-[#9AA6B2]">Desde</span>
                    <span className="text-[44px] sm:text-[52px] lg:text-[56px] font-bold text-white leading-none">
                      ${impl.price}
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-[15px] text-[#9AA6B2] mt-2">implementación</p>
                </div>

                <Button
                  onClick={() => scrollTo(impl.ctaLink)}
                  className={`w-full py-4 sm:py-5 h-auto rounded-xl text-[15px] sm:text-[16px] font-semibold ${
                    impl.enterprise
                      ? "bg-purple-600 hover:bg-purple-500 text-white"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                  }`}
                >
                  {impl.cta}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}