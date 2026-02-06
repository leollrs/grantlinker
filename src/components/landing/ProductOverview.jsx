import React from "react";
import { Check, Box, Clock, Bell } from "lucide-react";

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
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0F172A] p-6 sm:p-10 lg:p-12">
              <div className="space-y-4 sm:space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 sm:h-3 rounded bg-white/10" style={{ width: `${90 - i * 10}%` }} />
                      <div className="h-2 rounded bg-white/5" style={{ width: `${70 - i * 10}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/5">
                <p className="text-[11px] sm:text-[13px] text-[#9AA6B2] uppercase tracking-wider mb-2">
                  Flujo automatizado
                </p>
                <p className="text-[14px] sm:text-[15px] text-white font-medium">
                  Sin intervención manual
                </p>
              </div>
            </div>

            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}