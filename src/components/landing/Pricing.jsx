import React, { useState } from 'react';
import { RippleButton } from '@/components/ui/ripple-button';
import { Badge } from '@/components/ui/badge';
import { Check, Minus, MoveRight, PhoneCall } from 'lucide-react';

const PLANS = [
  {
    name: 'Recepcionista IA',
    price: '$199',
    period: '/mes',
    prefix: 'Desde',
    popular: false,
    enterprise: false,
    features: [
      'Atención de llamadas 24/7',
      'Agendamiento automático',
      'Transferencia inteligente',
    ],
  },
  {
    name: 'Sistema Operativo Básico',
    price: '$599',
    period: '/mes',
    popular: true,
    enterprise: false,
    features: [
      'Automatización de workflows',
      'CRM integrado',
      'Chatbot con IA',
      'Recordatorios automáticos',
      'Soporte prioritario',
    ],
  },
  {
    name: 'Presencia + Automatización',
    price: '$997',
    period: ' instalación + $599/mes',
    popular: false,
    enterprise: false,
    features: [
      'Sitio web profesional',
      'Sistema de automatización',
      'Integraciones personalizadas',
      'Soporte dedicado',
    ],
  },
];

const ENTERPRISE = [
  {
    name: 'Implementación Completa',
    price: '$2,499',
    prefix: 'Desde',
    enterprise: false,
    features: [
      'Infraestructura digital completa',
      'Automatización end-to-end',
      'Inteligencia de subvenciones',
      'Onboarding personalizado',
    ],
  },
  {
    name: 'Desarrollo Institucional',
    price: '$9,999+',
    prefix: 'Desde',
    enterprise: true,
    features: [
      'Arquitectura de sistemas completa',
      'Equipo dedicado de implementación',
      'SLA garantizado',
      'Solución enterprise a medida',
    ],
  },
];

// Union of all ROW1 features for comparison matrix
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

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function Pricing() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="planes" className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
            Planes
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Infraestructura a tu medida
          </h2>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground leading-relaxed">
            Sin contratos largos. Escala cuando lo necesites. Cada plan incluye onboarding y soporte.
          </p>
        </div>

        {/* ROW 1 — Plan cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-7 ${
                plan.popular
                  ? 'border-emerald-600/60 bg-card shadow-lg shadow-emerald-600/5'
                  : 'border-border bg-card/60'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2.5 left-6 bg-emerald-600 text-white hover:bg-emerald-600 border-0 text-[11px]">
                  Más popular
                </Badge>
              )}

              <h3 className="text-sm font-semibold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                {plan.prefix && (
                  <span className="text-xs text-muted-foreground">{plan.prefix}</span>
                )}
                <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
                <span className="text-xs text-muted-foreground">{plan.period}</span>
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
                onClick={() => scrollTo('diagnostico')}
                className="mt-8 w-full"
                variant={plan.popular ? 'default' : 'outline'}
              >
                Agendar llamada
                <MoveRight className="h-4 w-4" aria-hidden />
              </RippleButton>
            </div>
          ))}
        </div>

        {/* Comparison toggle */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            {showComparison ? 'Ocultar comparación' : 'Comparar planes'}
          </button>
        </div>

        {/* Comparison matrix — md+ only */}
        {showComparison && (
          <div className="mt-8 hidden md:block rounded-xl border border-border bg-card/40 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-6 text-left font-medium text-muted-foreground w-[40%]">Funcionalidad</th>
                  {PLANS.map((p) => (
                    <th key={p.name} className="py-4 px-4 text-center font-medium">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_FEATURES.map((feature, i) => (
                  <tr key={feature} className={i < ALL_FEATURES.length - 1 ? 'border-b border-border/50' : ''}>
                    <td className="py-3 px-6 text-muted-foreground">{feature}</td>
                    {PLANS.map((plan) => (
                      <td key={plan.name} className="py-3 px-4 text-center">
                        {plan.features.includes(feature) ? (
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

        {/* Comparison — mobile (stacked) */}
        {showComparison && (
          <div className="mt-8 md:hidden space-y-4">
            {PLANS.map((plan) => (
              <div key={plan.name} className="rounded-xl border border-border bg-card/40 p-5">
                <h4 className="text-sm font-semibold mb-3">{plan.name}</h4>
                <ul className="space-y-2">
                  {ALL_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      {plan.features.includes(feature) ? (
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
                {plan.prefix && (
                  <span className="text-xs text-muted-foreground">{plan.prefix}</span>
                )}
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
                variant="outline"
                className="mt-8 w-full"
              >
                {plan.enterprise ? (
                  <>
                    Contactar
                    <PhoneCall className="h-4 w-4" aria-hidden />
                  </>
                ) : (
                  <>
                    Agendar llamada
                    <MoveRight className="h-4 w-4" aria-hidden />
                  </>
                )}
              </RippleButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
