import React from "react";
import { Check, Box, AlertCircle, Clock } from "lucide-react";

export default function ProductOverview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Benefits */}
          <div>
            <h2 className="text-[36px] sm:text-[44px] font-bold text-white leading-[1.1] tracking-tight mb-4">
              Todo conectado.
              <br />
              Cero fricción.
            </h2>
            
            <p className="text-[16px] text-[#9AA6B2] leading-relaxed mb-10">
              Un sistema que elimina trabajo manual y coordina tus operaciones automáticamente.
            </p>

            <div className="space-y-5">
              <Benefit icon={Box} text="Un solo sistema, no múltiples apps" />
              <Benefit icon={Check} text="Menos errores humanos" />
              <Benefit icon={Clock} text="Operación 24/7 sin supervisión" />
              <Benefit icon={AlertCircle} text="Notificaciones inteligentes en tiempo real" />
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0F172A] p-8 shadow-2xl">
              {/* Mini workflow visualization */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-32 rounded bg-white/10" />
                    <div className="h-2 w-24 rounded bg-white/5 mt-2" />
                  </div>
                </div>
                
                <div className="ml-5 border-l-2 border-dashed border-white/10 h-6" />
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-40 rounded bg-white/10" />
                    <div className="h-2 w-28 rounded bg-white/5 mt-2" />
                  </div>
                </div>
                
                <div className="ml-5 border-l-2 border-dashed border-white/10 h-6" />
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-36 rounded bg-white/10" />
                    <div className="h-2 w-20 rounded bg-white/5 mt-2" />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[11px] text-[#9AA6B2] uppercase tracking-wider">
                  Flujo automatizado
                </p>
                <p className="text-[13px] text-white font-medium mt-2">
                  Sin intervención manual
                </p>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({ icon: Icon, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg bg-emerald-500/10 p-2 mt-0.5">
        <Icon className="h-5 w-5 text-emerald-400" />
      </div>
      <p className="text-[16px] text-white leading-relaxed">{text}</p>
    </div>
  );
}