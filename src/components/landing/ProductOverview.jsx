import React from "react";
import { Check, Box, Clock, Bell } from "lucide-react";
import BeforeAfterComparison from "./BeforeAfterComparison";

export default function ProductOverview() {
  const benefits = [
    { icon: Box, text: "Un solo sistema, no múltiples apps" },
    { icon: Check, text: "Menos errores humanos" },
    { icon: Clock, text: "Operación 24/7 sin supervisión" },
    { icon: Bell, text: "Notificaciones inteligentes en tiempo real" },
  ];

  return (
    <section id="producto" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold text-white leading-[1.1] tracking-tight mb-4 sm:mb-6">
              Todo conectado.
              <br />
              Cero fricción.
            </h2>
            
            <p className="text-[16px] sm:text-[18px] text-[#9AA6B2] leading-relaxed mb-8 sm:mb-12">
              Un sistema que elimina trabajo manual y coordina tus operaciones automáticamente.
            </p>

            <div className="space-y-5 sm:space-y-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.text} className="flex items-start gap-3 sm:gap-5">
                    <div className="rounded-lg bg-emerald-500/10 p-2 sm:p-2.5 mt-0.5 sm:mt-1">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                    </div>
                    <p className="text-[15px] sm:text-[18px] text-white leading-relaxed pt-1 sm:pt-2">{benefit.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <BeforeAfterComparison />
          </div>
        </div>
      </div>
    </section>
  );
}