import React from "react";
import { Button } from "@/components/ui/button";
import WorkflowVisualization from "./WorkflowVisualization";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-48 pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/[0.03] blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="max-w-[600px]">
            <h1 className="text-[64px] font-bold text-white leading-[1.05] tracking-tight mb-8">
              Automatiza tu operación completa con IA
            </h1>
            
            <p className="text-[22px] text-[#9AA6B2] leading-[1.5] mb-12">
              Llamadas, citas, clientes y procesos internos funcionando 24/7 en un solo sistema.
            </p>

            <div className="flex gap-4">
              <Button
                onClick={() => scrollTo("contacto")}
                className="px-10 py-6 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[16px] font-semibold rounded-xl"
              >
                Agendar llamada
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollTo("producto")}
                className="px-10 py-6 h-auto rounded-xl border-white/10 text-white hover:text-white hover:border-white/20 bg-transparent hover:bg-white/5 text-[16px] font-semibold"
              >
                Ver cómo funciona
              </Button>
            </div>
          </div>

          <div>
            <WorkflowVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}