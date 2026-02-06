import React from "react";
import { Phone, Brain, Database, Calendar, BarChart3 } from "lucide-react";

export default function SystemFlowDiagram() {
  const modules = [
    { icon: Phone, label: "Llamadas", status: "Activo", color: "emerald" },
    { icon: Brain, label: "IA", status: "Procesando", color: "blue" },
    { icon: Database, label: "CRM", status: "Conectado", color: "purple" },
    { icon: Calendar, label: "Citas", status: "Sincronizado", color: "amber" },
    { icon: BarChart3, label: "Reportes", status: "Actualizado", color: "pink" },
  ];

  const colors = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-500" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-500" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", dot: "bg-purple-500" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-500" },
    pink: { bg: "bg-pink-500/10", text: "text-pink-400", dot: "bg-pink-500" },
  };

  return (
    <div className="relative">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0F172A] p-8 sm:p-10 lg:p-12 backdrop-blur">
        <div className="space-y-0">
          {modules.map((module, i) => {
            const Icon = module.icon;
            const colorScheme = colors[module.color];
            
            return (
              <div key={i} className="relative">
                <div className={`rounded-xl border border-white/10 ${colorScheme.bg} p-5 sm:p-6 backdrop-blur-sm transition-all hover:border-${module.color}-500/30`}>
                  <div className="flex items-center gap-4">
                    <div className={`rounded-lg ${colorScheme.bg} p-3 border border-white/5`}>
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${colorScheme.text}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] sm:text-[16px] font-semibold text-white mb-1">
                        {module.label}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${colorScheme.dot} animate-pulse`} />
                        <p className={`text-[12px] sm:text-[13px] ${colorScheme.text} font-medium`}>
                          {module.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {i < modules.length - 1 && (
                  <div className="relative h-8 sm:h-10 flex items-center justify-center">
                    <div className="absolute inset-x-0 flex items-center justify-center">
                      <div className={`h-8 sm:h-10 w-px bg-gradient-to-b ${colorScheme.dot === "bg-emerald-500" ? "from-emerald-500/40" : colorScheme.dot === "bg-blue-500" ? "from-blue-500/40" : colorScheme.dot === "bg-purple-500" ? "from-purple-500/40" : colorScheme.dot === "bg-amber-500" ? "from-amber-500/40" : "from-pink-500/40"} to-transparent`} />
                    </div>
                    <div className="relative z-10 rounded-full bg-[#0F172A] border border-white/10 p-1.5">
                      <svg className="h-3 w-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <p className="text-[12px] sm:text-[13px] text-[#9AA6B2]">
            Flujo automatizado completo
          </p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[12px] sm:text-[13px] text-emerald-400 font-medium">
              En ejecución
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5 blur-3xl" />
    </div>
  );
}