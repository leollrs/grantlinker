import React from "react";
import { Zap, Box, Clock, Link2, TrendingUp, Shield } from "lucide-react";

const BENEFITS = [
  { icon: Zap, title: "Automatización", description: "Reduce trabajo manual hasta 70%" },
  { icon: Box, title: "Centralización", description: "Todo en un solo panel" },
  { icon: Clock, title: "IA 24/7", description: "Atiende clientes fuera de horario" },
  { icon: Link2, title: "Integraciones", description: "Conecta WhatsApp, email y CRM" },
  { icon: TrendingUp, title: "Escalable", description: "Crece sin contratar más personal" },
  { icon: Shield, title: "Seguro", description: "Datos protegidos y privados" },
];

export default function BenefitsGrid() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            const isLarge = i < 3;
            
            return (
              <div
                key={benefit.title}
                className={`group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.01] to-transparent hover:border-emerald-500/30 transition-all ${
                  isLarge ? "p-8 sm:p-10 lg:p-12" : "p-6 sm:p-8 lg:p-10"
                }`}
              >
                <div className="rounded-xl bg-white/5 p-3 sm:p-4 inline-flex mb-5 sm:mb-6 group-hover:bg-emerald-500/10 transition-all">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#9AA6B2] group-hover:text-emerald-400 transition-colors" />
                </div>
                
                <h3 className={`font-bold text-white mb-2 sm:mb-3 ${
                  isLarge ? "text-[22px] sm:text-[26px]" : "text-[20px] sm:text-[22px]"
                }`}>
                  {benefit.title}
                </h3>
                
                <p className="text-[14px] sm:text-[16px] text-[#9AA6B2] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}