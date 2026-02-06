import React from "react";
import { Zap, Box, Clock, Link2, TrendingUp, Shield } from "lucide-react";

const BENEFITS = [
  {
    icon: Zap,
    title: "Automatización",
    description: "Reduce trabajo manual hasta 70%",
  },
  {
    icon: Box,
    title: "Centralización",
    description: "Todo en un solo panel",
  },
  {
    icon: Clock,
    title: "IA 24/7",
    description: "Atiende clientes incluso fuera de horario",
  },
  {
    icon: Link2,
    title: "Integraciones",
    description: "Conecta WhatsApp, email y CRM",
  },
  {
    icon: TrendingUp,
    title: "Escalable",
    description: "Crece sin contratar más personal",
  },
  {
    icon: Shield,
    title: "Seguro",
    description: "Datos protegidos y privados",
  },
];

export default function BenefitsGrid() {
  return (
    <section className="py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-16">
          <h2 className="text-[36px] sm:text-[44px] font-bold text-white leading-[1.1] tracking-tight mb-4">
            Por qué GrantLinker
          </h2>
          <p className="text-[16px] text-[#9AA6B2] max-w-[600px] mx-auto">
            Tecnología empresarial que trabaja por ti, no contra ti.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-8 hover:border-white/20 transition-all"
              >
                <div className="rounded-xl bg-white/5 p-3 inline-flex mb-5 group-hover:bg-emerald-500/10 transition-colors">
                  <Icon className="h-6 w-6 text-[#9AA6B2] group-hover:text-emerald-400 transition-colors" />
                </div>
                
                <h3 className="text-[20px] font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                
                <p className="text-[14px] text-[#9AA6B2] leading-relaxed">
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