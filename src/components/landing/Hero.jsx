import React from "react";
import { Button } from "@/components/ui/button";
import DashboardMockup from "./DashboardMockup";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 pb-24 sm:pb-32">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <h1 className="text-[42px] sm:text-[54px] lg:text-[64px] font-bold text-white leading-[1.05] tracking-tight mb-6">
              Automatiza tu operación completa con IA
            </h1>
            
            <p className="text-[18px] sm:text-[20px] text-[#9AA6B2] leading-relaxed mb-10 max-w-[520px]">
              Llamadas, citas, clientes y procesos internos funcionando 24/7 en un solo sistema.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollTo("contacto")}
                className="px-8 py-4 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-emerald-900/20"
              >
                Agendar llamada
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollTo("diagnostico")}
                className="px-8 py-4 h-auto rounded-xl border-[#1F2630] text-[#E8EEF5] hover:text-white hover:border-[#2A3441] bg-transparent hover:bg-white/5 text-[15px] font-semibold"
              >
                Ver demo
              </Button>
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="relative">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}