import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

const WEBHOOK_URL = 'https://leollrs.app.n8n.cloud/webhook/ccf88576-571c-4927-aeb1-4d4ea16cee21';

const STEPS = [
  {
    question: 'Tipo de organización',
    key: 'orgType',
    options: [
      { value: 'nonprofit', label: 'Sin fines de lucro' },
      { value: 'municipality', label: 'Municipalidad / gobierno' },
      { value: 'clinic', label: 'Clínica / consultorio' },
      { value: 'business', label: 'Empresa' },
      { value: 'other', label: 'Otro' },
    ],
  },
  {
    question: 'Llamadas fuera de horario',
    key: 'missedCalls',
    options: [
      { value: 'yes_many', label: 'Sí, frecuentemente' },
      { value: 'yes_some', label: 'Sí, algunas veces' },
      { value: 'no', label: 'No es un problema' },
    ],
  },
  {
    question: '¿Cómo manejan citas actualmente?',
    key: 'appointments',
    options: [
      { value: 'manual', label: 'Manual (WhatsApp / teléfono)' },
      { value: 'excel', label: 'Excel / papel' },
      { value: 'basic_tool', label: 'Sistema básico' },
      { value: 'system', label: 'Automatizado' },
    ],
  },
  {
    question: 'Sitio web profesional',
    key: 'hasWebsite',
    options: [
      { value: 'yes_good', label: 'Sí, funciona bien' },
      { value: 'yes_outdated', label: 'Sí, pero desactualizado' },
      { value: 'no', label: 'No tenemos' },
    ],
  },
  {
    question: 'Objetivo principal',
    key: 'goal',
    options: [
      { value: 'funding', label: 'Asegurar financiamiento' },
      { value: 'automation', label: 'Automatizar operaciones' },
      { value: 'digital', label: 'Presencia digital' },
      { value: 'all', label: 'Todo lo anterior' },
    ],
  },
];

function getRecommendation(answers) {
  const { orgType, missedCalls, goal, hasWebsite, appointments } = answers;

  const reasons = [];

  // Desarrollo Institucional: municipality + all + manual + no website
  if (orgType === 'municipality' && goal === 'all' && (appointments === 'manual' || appointments === 'excel') && (hasWebsite === 'no' || hasWebsite === 'yes_outdated')) {
    reasons.push('Necesitas infraestructura digital completa');
    reasons.push('Operaciones manuales requieren automatización end-to-end');
    reasons.push('Solución enterprise con equipo dedicado');
    return { plan: 'Desarrollo Institucional', price: 'Desde $9,999+', reasons };
  }

  // Implementación Completa: municipal/nonprofit + funding/all
  if ((orgType === 'municipality' || orgType === 'nonprofit') && (goal === 'funding' || goal === 'all')) {
    reasons.push('Inteligencia de subvenciones para asegurar financiamiento');
    reasons.push('Automatización de operaciones integrada');
    reasons.push('Onboarding personalizado para tu organización');
    return { plan: 'Implementación Completa', price: 'Desde $2,499', reasons };
  }

  // Goal = all
  if (goal === 'all') {
    reasons.push('Necesitas una solución integral');
    reasons.push('Financiamiento, automatización y presencia digital');
    reasons.push('Onboarding personalizado incluido');
    return { plan: 'Implementación Completa', price: 'Desde $2,499', reasons };
  }

  // Clinic + frequent missed calls
  if (orgType === 'clinic' && missedCalls === 'yes_many') {
    reasons.push('Clínicas pierden pacientes con llamadas sin respuesta');
    reasons.push('Automatización de citas y recordatorios');
    reasons.push('Operaciones optimizadas desde el día uno');
    return { plan: 'Sistema Operativo Básico', price: '$599/mes', reasons };
  }

  // Frequent missed calls + manual/excel
  if (missedCalls === 'yes_many' && (appointments === 'manual' || appointments === 'excel')) {
    reasons.push('Estás perdiendo oportunidades con llamadas sin atender');
    reasons.push('Procesos manuales generan cuellos de botella');
    reasons.push('Automatización operativa con atención 24/7');
    return { plan: 'Sistema Operativo Básico', price: '$599/mes', reasons };
  }

  // No website + digital goal
  if ((hasWebsite === 'no' || hasWebsite === 'yes_outdated') && goal === 'digital') {
    reasons.push('Tu presencia digital necesita una base profesional');
    reasons.push('Sitio web con automatización integrada');
    reasons.push('Integraciones personalizadas incluidas');
    return { plan: 'Presencia + Automatización', price: '$997 instalación + $599/mes', reasons };
  }

  // Funding goal
  if (goal === 'funding') {
    reasons.push('Inteligencia de subvenciones para encontrar fondos');
    reasons.push('Análisis de elegibilidad automatizado');
    reasons.push('Soporte completo en propuestas');
    return { plan: 'Implementación Completa', price: 'Desde $2,499', reasons };
  }

  // Default
  reasons.push('Atención de llamadas 24/7 automatizada');
  reasons.push('Agendamiento inteligente incluido');
  reasons.push('El punto de partida ideal para escalar');
  return { plan: 'Recepcionista IA', price: 'Desde $199/mes', reasons };
}

function getLiveRecommendation(answers) {
  const keys = Object.keys(answers);
  if (keys.length === 0) return null;
  return getRecommendation(answers);
}

export default function Diagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const current = STEPS[step];
  const total = STEPS.length;

  const liveRec = useMemo(() => getLiveRecommendation(answers), [answers]);

  const select = async (value) => {
    const updated = { ...answers, [current.key]: value };
    setAnswers(updated);

    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
      const rec = getRecommendation(updated);
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...updated,
            recommendedPlan: rec.plan,
            submittedAt: new Date().toISOString(),
            source: 'grantlinker-diagnosis',
          }),
        });
      } catch {}
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setSubmitted(false);
  };

  const finalRec = submitted ? getRecommendation(answers) : null;

  const answeredSummary = STEPS.slice(0, step).map((s) => {
    const selected = s.options.find((o) => o.value === answers[s.key]);
    return { question: s.question, answer: selected?.label || '' };
  });

  return (
    <section id="diagnostico" className="py-16 sm:py-24 md:py-28 lg:py-40 border-t border-[#1F2630]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2 className="text-[32px] sm:text-[36px] md:text-[44px] font-semibold text-[#E8EEF5] tracking-tight leading-[1.1] mb-3 sm:mb-4">
          Diagnóstico Inteligente
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#9AA6B2] mb-10 sm:mb-16 max-w-lg">
          Responde 5 preguntas. Recomendamos el sistema ideal para tu organización.
        </p>

        <div className="rounded-xl border border-[#1F2630] bg-[#11161C] overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-[#1F2630]">
            <span className="text-[12px] sm:text-[13px] text-[#9AA6B2]">
              {submitted ? 'Resultado' : `Paso ${step + 1} de ${total}`}
            </span>
            <div className="flex gap-0.5 sm:gap-1">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-4 sm:w-6 h-1 rounded-full transition-colors ${
                    submitted || i <= step ? 'bg-emerald-600' : 'bg-[#1F2630]'
                  }`}
                />
              ))}
            </div>
          </div>

          {submitted && finalRec ? (
            <div className="p-5 sm:p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                <div>
                  <p className="text-[11px] sm:text-[12px] text-emerald-500 font-medium uppercase tracking-wider mb-3 sm:mb-4">Plan recomendado</p>
                  <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#E8EEF5] tracking-tight mb-2">{finalRec.plan}</h3>
                  <p className="text-[14px] sm:text-[15px] text-[#9AA6B2] mb-4">{finalRec.price}</p>
                  <ul className="space-y-2 mb-6 sm:mb-8">
                    {finalRec.reasons.map((r) => (
                      <li key={r} className="text-[14px] text-[#9AA6B2]/70 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-emerald-500/60 flex-shrink-0 mt-2" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                    <Button className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-3 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg">
                      Agendar llamada
                    </Button>
                    <Button
                      variant="outline"
                      onClick={reset}
                      className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-3 h-auto text-[#9AA6B2] hover:text-[#E8EEF5] text-sm font-medium rounded-lg border-[#1F2630] hover:border-[#2A3441] bg-transparent hover:bg-transparent"
                    >
                      Repetir
                    </Button>
                  </div>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-[#1F2630] pt-6 md:pt-0 md:pl-8 lg:md:pl-10">
                  <p className="text-[12px] text-[#9AA6B2]/50 uppercase tracking-wider mb-4">Tus respuestas</p>
                  <div className="space-y-3">
                    {STEPS.map((s) => {
                      const selected = s.options.find((o) => o.value === answers[s.key]);
                      return (
                        <div key={s.key}>
                          <p className="text-[12px] text-[#9AA6B2]/50">{s.question}</p>
                          <p className="text-[13px] text-[#E8EEF5]">{selected?.label || ''}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-3 p-5 sm:p-6 md:p-10">
                <h3 className="text-[19px] sm:text-[22px] font-semibold text-[#E8EEF5] mb-6 sm:mb-8">
                  {current.question}
                </h3>
                <div className="space-y-2">
                  {current.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => select(option.value)}
                      className="w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg border border-[#1F2630] hover:border-[#2A3441] hover:bg-[#151B22] transition-all text-[13px] sm:text-[14px] text-[#9AA6B2] hover:text-[#E8EEF5]"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-5 sm:mt-6 text-[12px] sm:text-[13px] text-[#9AA6B2]/50 hover:text-[#9AA6B2] transition-colors"
                  >
                    Atrás
                  </button>
                )}
              </div>
              <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-[#1F2630] p-5 sm:p-6 md:p-8">
                <p className="text-[12px] text-[#9AA6B2]/40 uppercase tracking-wider mb-4">Respuestas</p>
                {answeredSummary.length === 0 && !liveRec ? (
                  <p className="text-[13px] text-[#9AA6B2]/30">Sin respuestas aún</p>
                ) : (
                  <div className="space-y-3">
                    {answeredSummary.map((a) => (
                      <div key={a.question}>
                        <p className="text-[12px] text-[#9AA6B2]/40">{a.question}</p>
                        <p className="text-[13px] text-[#E8EEF5]">{a.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                {liveRec && (
                  <div className="mt-6 pt-6 border-t border-[#1F2630]">
                    <p className="text-[12px] text-emerald-500/70 uppercase tracking-wider mb-3">Recomendación actual</p>
                    <p className="text-[15px] font-semibold text-[#E8EEF5] mb-1">{liveRec.plan}</p>
                    <p className="text-[12px] text-[#9AA6B2]/60 mb-3">{liveRec.price}</p>
                    <ul className="space-y-1.5">
                      {liveRec.reasons.map((r) => (
                        <li key={r} className="text-[12px] text-[#9AA6B2]/50 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-emerald-500/40 flex-shrink-0 mt-1.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}