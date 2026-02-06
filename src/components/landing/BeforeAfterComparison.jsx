import React from "react";
import { X, Check } from "lucide-react";

export default function BeforeAfterComparison() {
  const before = [
    "Apps separadas",
    "Llamadas perdidas",
    "Citas manuales",
    "Seguimiento inconsistente"
  ];

  const after = [
    "Un solo sistema conectado",
    "IA atiende y filtra",
    "Citas automatizadas",
    "CRM + reportes en tiempo real"
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
      {/* Before Card */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-red-950/10 to-transparent p-6 sm:p-8 backdrop-blur">
        <p className="text-[13px] font-semibold text-[#9AA6B2] uppercase tracking-wider mb-6">
          Antes
        </p>
        
        <div className="space-y-4">
          {before.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div className="rounded-full bg-red-500/10 p-1 mt-0.5">
                <X className="h-4 w-4 text-red-400" />
              </div>
              <p className="text-[14px] sm:text-[15px] text-white/70 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* After Card */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-transparent p-6 sm:p-8 backdrop-blur">
        <p className="text-[13px] font-semibold text-emerald-400 uppercase tracking-wider mb-6">
          Con GrantLinker
        </p>
        
        <div className="space-y-4">
          {after.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                <Check className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="text-[14px] sm:text-[15px] text-white leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}