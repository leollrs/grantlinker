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
    <section className="py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="mb-12">
          <h2 className="text-[52px] font-bold text-white leading-[1.1] tracking-tight mb-6">
            Implementaciones empresariales
          </h2>
          <p className="text-[20px] text-[#9AA6B2] max-w-[700px]">
            Proyectos completos para organizaciones que necesitan automatización total.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-20">
          {IMPLEMENTATIONS.map((impl) => {
            const Icon = impl.icon;
            return (
              <div
                key={impl.name}
                className={`relative rounded-3xl border p-12 transition-all ${
                  impl.enterprise
                    ? "border-purple-500/30 bg-gradient-to-br from-purple-950/10 via-transparent to-emerald-950/5"
                    : "border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-white/20"
                }`}
              >
                {impl.enterprise && (
                  <div className="absolute -top-4 left-10">
                    <span className="inline-block rounded-full bg-purple-600 px-5 py-2 text-[12px] font-bold text-white uppercase tracking-wider">
                      Enterprise
                    </span>
                  </div>
                )}

                <div className="mb-10">
                  <div className={`inline-flex rounded-2xl p-4 ${
                    impl.enterprise ? "bg-purple-500/20" : "bg-emerald-500/20"
                  }`}>
                    <Icon className={`h-8 w-8 ${
                      impl.enterprise ? "text-purple-400" : "text-emerald-400"
                    }`} />
                  </div>
                </div>

                <h3 className="text-[32px] font-bold text-white mb-5 leading-tight">
                  {impl.name}
                </h3>
                
                <p className="text-[17px] text-[#9AA6B2] leading-relaxed mb-12">
                  {impl.description}
                </p>

                <div className="mb-12">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[13px] text-[#9AA6B2]">Desde</span>
                    <span className="text-[56px] font-bold text-white leading-none">
                      ${impl.price}
                    </span>
                  </div>
                  <p className="text-[15px] text-[#9AA6B2] mt-2">implementación</p>
                </div>

                <Button
                  onClick={() => scrollTo(impl.ctaLink)}
                  className={`w-full py-5 h-auto rounded-xl text-[16px] font-semibold ${
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