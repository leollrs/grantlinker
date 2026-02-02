import React, { useState } from 'react';
import { ModernPricingPage, PricingCard } from '@/components/ui/animated-glassy-pricing';
import { RippleButton } from '@/components/ui/multi-type-ripple-buttons';
import { Badge } from '@/components/ui/badge';
import { Check, Minus, MoveRight, PhoneCall } from 'lucide-react';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

const ROW1_PLANS = [
  {
    planName: 'Recepcionista IA',
    description: 'Atención automática de llamadas y citas 24/7.',
    price: 'Desde $199/mes',
    features: [
      'Atención de llamadas 24/7',
      'Agendamiento automático',
      'Transferencia inteligente',
    ],
    buttonText: 'Agendar llamada',
    buttonVariant: 'secondary',
  },
  {
    planName: 'Sistema Operativo',
    description: 'Automatización completa de operaciones con IA.',
    price: '$599/mes',
    features: [
      'Automatización de workflows',
      'CRM integrado',
      'Chatbot con IA',
      'Recordatorios automáticos',
      'Soporte prioritario',
    ],
    buttonText: 'Agendar llamada',
    isPopular: true,
    buttonVariant: 'primary',
  },
  {
    planName: 'Presencia + Auto',
    description: 'Sitio web profesional con automatización integrada.',
    price: '$997 + $599/mes',
    features: [
      'Sitio web profesional',
      'Sistema de automatización',
      'Integraciones personalizadas',
      'Soporte dedicado',
    ],
    buttonText: 'Agendar llamada',
    buttonVariant: 'primary',
  },
];

const ENTERPRISE = [
  {
    name: 'Implementación Completa',
    price: 'Desde $2,499',
    features: [
      'Infraestructura digital completa',
      'Automatización end-to-end',
      'Inteligencia de subvenciones',
      'Onboarding personalizado',
    ],
  },
  {
    name: 'Desarrollo Institucional',
    price: 'Desde $9,999+',
    enterprise: true,
    features: [
      'Arquitectura de sistemas completa',
      'Equipo dedicado de implementación',
      'SLA garantizado',
      'Solución enterprise a medida',
    ],
  },
];

// Comparison matrix features
const ALL_FEATURES = [
  'Atención de llamadas 24/7',
  'Agendamiento automático',
  'Transferencia inteligente',
  'Automatización de workflows',
  'CRM integrado',
  'Chatbot con IA',
  'Recordatorios automáticos',
  'Soporte prioritario',
  'Sitio web profesional',
  'Sistema de automatización',
  'Integraciones personalizadas',
  'Soporte dedicado',
];

const PLAN_FEATURES = [
  ROW1_PLANS[0].features,
  ROW1_PLANS[1].features,
  ROW1_PLANS[2].features,
];

const PLAN_NAMES = [
  'Recepcionista IA',
  'Sistema Operativo',
  'Presencia + Auto',
];

export default function Pricing() {
  const [showComparison, setShowComparison] = useState(false);

  const plansWithClick = ROW1_PLANS.map(plan => ({
    ...plan,
    onButtonClick: () => scrollTo('diagnostico'),
  }));

  return (
    <section id="planes" className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Glassy pricing with WebGL background */}
        <ModernPricingPage
          title={<>Infraestructura a tu <span className="text-emerald-400">medida</span></>}
          subtitle="Sin contratos largos. Escala cuando lo necesites. Cada plan incluye onboarding y soporte."
          plans={plansWithClick}
          showAnimatedBackground={true}
        />

        {/* Comparison toggle */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            {showComparison ? 'Ocultar comparación' : 'Comparar planes'}
          </button>
        </div>

        {/* Comparison matrix — md+ */}
        {showComparison && (
          <div className="mt-8 hidden md:block rounded-xl border border-border bg-card/40 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-6 text-left font-medium text-muted-foreground w-[40%]">Funcionalidad</th>
                  {PLAN_NAMES.map((p) => (
                    <th key={p} className="py-4 px-4 text-center font-medium">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_FEATURES.map((feature, i) => (
                  <tr key={feature} className={i < ALL_FEATURES.length - 1 ? 'border-b border-border/50' : ''}>
                    <td className="py-3 px-6 text-muted-foreground">{feature}</td>
                    {PLAN_FEATURES.map((feats, j) => (
                      <td key={j} className="py-3 px-4 text-center">
                        {feats.includes(feature) ? (
                          <Check className="inline h-4 w-4 text-emerald-500" aria-hidden />
                        ) : (
                          <Minus className="inline h-4 w-4 text-muted-foreground/30" aria-hidden />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Comparison — mobile */}
        {showComparison && (
          <div className="mt-8 md:hidden space-y-4">
            {PLAN_NAMES.map((name, idx) => (
              <div key={name} className="rounded-xl border border-border bg-card/40 p-5">
                <h4 className="text-sm font-semibold mb-3">{name}</h4>
                <ul className="space-y-2">
                  {ALL_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      {PLAN_FEATURES[idx].includes(feature) ? (
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground/30 shrink-0" aria-hidden />
                      )}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* ROW 2 — Enterprise cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {ENTERPRISE.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-xl border border-border bg-muted/30 p-7"
            >
              {plan.enterprise && (
                <Badge variant="outline" className="absolute -top-2.5 left-6 text-[11px] bg-background">
                  Enterprise
                </Badge>
              )}

              <h3 className="text-sm font-semibold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-[2px] h-4 w-4 text-emerald-500 shrink-0" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <RippleButton
                onClick={() => scrollTo(plan.enterprise ? 'contacto' : 'diagnostico')}
                variant="ghost"
                className="mt-8 w-full border border-border hover:bg-muted text-foreground text-sm font-medium"
              >
                <span className="flex items-center justify-center gap-2">
                  {plan.enterprise ? (
                    <>Contactar <PhoneCall className="h-4 w-4" aria-hidden /></>
                  ) : (
                    <>Agendar llamada <MoveRight className="h-4 w-4" aria-hidden /></>
                  )}
                </span>
              </RippleButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
