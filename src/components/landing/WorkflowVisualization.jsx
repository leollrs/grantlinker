import React from "react";
import { Phone, Calendar, Database, Zap, BarChart3 } from "lucide-react";

export default function WorkflowVisualization() {
  const modules = [
    { icon: Phone, label: "Atención IA", status: "Activo" },
    { icon: Calendar, label: "Citas", status: "Conectado" },
    { icon: Database, label: "CRM", status: "Sincronizado" },
    { icon: Zap, label: "Automatización", status: "Ejecutando" },
    { icon: BarChart3, label: "Reportes", status: "Actualizado" },
  ];

  return (
    <div className="relative">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0F172A] p-5 sm:p-8 lg:p-10 backdrop-blur">
        <div className="space-y-3 sm:space-y-5">
          {modules.map((module, i) => {
            const Icon = module.icon;
            return (
              <div key={i}>
                <div className="flex items-center gap-3 sm:gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 sm:p-5 hover:border-emerald-500/20 transition-all group">
                  <div className="rounded-lg bg-emerald-500/10 p-2 sm:p-3 group-hover:bg-emerald-500/20 transition-all">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] sm:text-[16px] font-semibold text-white mb-1">
                      {module.label}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[12px] sm:text-[13px] text-emerald-400 font-medium">
                        {module.status}
                      </p>
                    </div>
                  </div>

                  {i < modules.length - 1 && (
                    <svg className="hidden sm:block h-5 w-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>

                {i < modules.length - 1 && (
                  <div className="flex justify-center py-1 sm:py-2">
                    <div className="h-4 sm:h-6 w-px bg-gradient-to-b from-emerald-500/50 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/5 flex items-center justify-between">
          <p className="text-[12px] sm:text-[13px] text-[#9AA6B2]">Sistema operativo completo</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <p className="text-[12px] sm:text-[13px] text-emerald-400 font-medium">En línea</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent blur-2xl" />
    </div>
  );
}