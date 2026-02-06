import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const WEBHOOK_URL =
  "https://leollrs.app.n8n.cloud/webhook/ccf88576-571c-4927-aeb1-4d4ea16cee21";

const STEPS = [
  {
    question: "Tipo de organización",
    key: "orgType",
    options: [
      { value: "nonprofit", label: "Sin fines de lucro" },
      { value: "municipality", label: "Municipalidad / gobierno" },
      { value: "clinic", label: "Clínica / consultorio" },
      { value: "business", label: "Empresa" },
      { value: "other", label: "Otro" },
    ],
  },
  {
    question: "Sitio web profesional",
    key: "hasWebsite",
    options: [
      { value: "yes_good", label: "Sí, funciona bien" },
      { value: "yes_outdated", label: "Sí, pero desactualizado" },
      { value: "no", label: "No tenemos" },
    ],
  },
  {
    question: "Llamadas fuera de horario",
    key: "missedCalls",
    options: [
      { value: "yes_many", label: "Sí, frecuentemente" },
      { value: "yes_some", label: "Sí, algunas veces" },
      { value: "no", label: "No es un problema" },
    ],
  },
  {
    question: "Cobertura ideal de atención",
    key: "coverageNeed",
    options: [
      { value: "after_hours", label: "After-hours (noches / fines de semana)" },
      { value: "business_hours", label: "Horario laboral" },
      { value: "24_7", label: "24/7" },
    ],
  },
  {
    question: "Volumen mensual estimado (aprox.)",
    key: "volume",
    options: [
      { value: "low", label: "Bajo (pocas llamadas/mensajes)" },
      { value: "medium", label: "Medio" },
      { value: "high", label: "Alto" },
    ],
  },
  {
    question: "¿Cuántas personas lo usarán? (seats)",
    key: "seats",
    options: [
      { value: "solo", label: "1 persona" },
      { value: "small", label: "2–3 personas" },
      { value: "team", label: "4–10 personas" },
      { value: "multi", label: "Multi-locación / 10+ personas" },
    ],
  },
  {
    question: "Objetivo principal",
    key: "goal",
    options: [
      { value: "digital", label: "Presencia digital (web, pagos, citas)" },
      { value: "automation", label: "Automatizar operaciones" },
      { value: "funding", label: "Asegurar financiamiento" },
      { value: "all", label: "Todo lo anterior" },
    ],
  },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

function estimateAiStartingPrice(answers) {
  // You told me it varies by hours/volume/seats
  // This is NOT a final quote — just the correct "Desde" baseline.
  const coverage = answers.coverageNeed;
  if (coverage === "after_hours") return { from: 299, label: "After-hours desde $299/mes" };
  if (coverage === "24_7") return { from: 599, label: "24/7 desde $599/mes" };
  // business_hours: keep honest — still starts at after-hours baseline unless you set a different starting number.
  return { from: 299, label: "Desde $299/mes (según horario/volumen)" };
}

function getRecommendation(answers) {
  const orgType = answers.orgType;
  const hasWebsite = answers.hasWebsite;
  const missedCalls = answers.missedCalls;
  const goal = answers.goal;
  const seats = answers.seats;
  const volume = answers.volume;

  const reasons = [];

  const websiteNeeded = hasWebsite === "no" || hasWebsite === "yes_outdated";
  const needsComms =
    missedCalls === "yes_many" || missedCalls === "yes_some" || goal === "automation" || goal === "all";

  const isLarge =
    seats === "multi" || volume === "high" || orgType === "municipality";

  // 1) Enterprise triggers
  if (isLarge && (goal === "automation" || goal === "all" || goal === "funding")) {
    reasons.push("Operación grande o multi-locación requiere arquitectura robusta");
    reasons.push("Automatización + integraciones a medida (scope define mantenimiento)");
    if (orgType === "municipality") reasons.push("Sector gobierno suele requerir implementación más amplia");
    return {
      plan: "Desarrollo Institucional",
      headline: "Infraestructura a gran escala (enterprise)",
      priceLine: "Desde $9,999 (setup) + mantenimiento según alcance",
      pricingModel: "project",
      reasons,
      nextStepCta: { label: "Contactar", scrollTo: "contacto" },
    };
  }

  // 2) Automation project triggers
  if (goal === "automation" || goal === "funding" || goal === "all") {
    // If they also clearly need website + comms, still recommend automation project as the umbrella
    reasons.push("Necesitas automatizar procesos e integraciones, no solo un sitio web");
    reasons.push("El mantenimiento mensual se define según el alcance real del proyecto");
    if (goal === "funding") reasons.push("Podemos orientar la infraestructura para soportar procesos de financiamiento");
    return {
      plan: "Automatización Empresarial",
      headline: "Automatización a la medida para crecer",
      priceLine: "Desde $2,499 (setup) + mantenimiento según alcance",
      pricingModel: "project",
      reasons,
      nextStepCta: { label: "Agendar diagnóstico", scrollTo: "diagnostico" },
    };
  }

  // 3) Bundle triggers: website needed + comms needed
  if (websiteNeeded && needsComms) {
    const ai = estimateAiStartingPrice(answers);
    reasons.push("Necesitas web + atención IA conectadas (misma base de datos)");
    reasons.push("Citas online y llamadas comparten el mismo sistema");
    reasons.push("Ideal para capturar clientes 24/7 sin duplicar procesos");
    return {
      plan: "Presencia + IA (Bundle)",
      headline: "Website + Atención IA totalmente conectados",
      priceLine: `$997 primer mes + ${ai.label}`,
      pricingModel: "bundle",
      reasons,
      nextStepCta: { label: "Agendar llamada", scrollTo: "diagnostico" },
    };
  }

  // 4) Website-only triggers
  if (websiteNeeded && !needsComms) {
    reasons.push("Tu presencia digital necesita una base profesional");
    reasons.push("Setup desde $247 + hosting desde $20/mes");
    reasons.push("Chatbot es add-on si lo necesitas luego");
    return {
      plan: "Presencia Digital",
      headline: "Website profesional listo para convertir",
      priceLine: "Desde $247 (setup) + hosting desde $20/mes",
      pricingModel: "setup",
      reasons,
      nextStepCta: { label: "Agendar llamada", scrollTo: "diagnostico" },
    };
  }

  // 5) Default: Atención IA
  const ai = estimateAiStartingPrice(answers);
  reasons.push("Automatiza respuestas y atención al cliente según tu horario");
  reasons.push("Precio depende de horas, volumen y seats");
  reasons.push("Puedes integrarlo a tu CRM o usar el nuestro (si aplica)");
  return {
    plan: "Atención IA",
    headline: "Atención por mensajes y llamadas sin perder clientes",
    priceLine: ai.label,
    pricingModel: "monthly",
    reasons,
    nextStepCta: { label: "Agendar llamada", scrollTo: "diagnostico" },
  };
}

function getLiveRecommendation(answers) {
  if (Object.keys(answers).length === 0) return null;

  // If only orgType selected, show nothing yet (avoid misleading early recommendation)
  if (Object.keys(answers).length < 2) return null;

  return getRecommendation(answers);
}

export default function Diagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = STEPS.length;
  const current = STEPS[step];

  const liveRec = useMemo(() => getLiveRecommendation(answers), [answers]);
  const finalRec = submitted ? getRecommendation(answers) : null;

  const answeredSummary = STEPS.slice(0, step).map((s) => {
    const selected = s.options.find((o) => o.value === answers[s.key]);
    return { question: s.question, answer: selected?.label || "" };
  });

  const select = async (value) => {
    const updated = { ...answers, [current.key]: value };
    setAnswers(updated);

    const isLast = step >= total - 1;

    if (!isLast) {
      setStep((prev) => Math.min(prev + 1, total - 1));
      return;
    }

    setSubmitted(true);

    const rec = getRecommendation(updated);

    // Fire-and-forget to webhook
    try {
      void fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: updated,
          recommendation: rec,
          submittedAt: new Date().toISOString(),
          source: "grantlinker-diagnosis",
        }),
      });
    } catch {
      // ignore network errors in UI
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setSubmitted(false);
  };

  const back = () => {
    if (submitted) return;
    setStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section
      id="diagnostico"
      className="py-24 sm:py-32 border-t border-white/5"
    >
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[36px] sm:text-[44px] font-bold text-white leading-[1.1] tracking-tight mb-4">
            Sistema de Diagnóstico IA
          </h2>
          <p className="text-[16px] text-[#9AA6B2] max-w-[600px] mx-auto">
            Responde {STEPS.length} preguntas y recibe una recomendación personalizada en segundos.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden shadow-xl backdrop-blur">
          {/* Progress bar */}
          <div className="px-6 sm:px-8 py-5 border-b border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-medium text-white">
                {submitted ? "✓ Análisis completo" : `Pregunta ${step + 1} de ${total}`}
              </span>
              <span className="text-[12px] text-[#9AA6B2]">
                {submitted ? "100%" : `${Math.round(((step + 1) / total) * 100)}%`}
              </span>
            </div>
            <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full transition-all duration-300"
                style={{
                  width: submitted ? "100%" : `${((step + 1) / total) * 100}%`,
                }}
              />
            </div>
          </div>

          {submitted && finalRec ? (
            <div className="p-8 sm:p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 mb-5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                      Recomendación generada
                    </span>
                  </div>

                  <h3 className="text-[28px] sm:text-[32px] font-bold text-white tracking-tight mb-3">
                    {finalRec.plan}
                  </h3>
                  <p className="text-[16px] text-[#9AA6B2] mb-2">
                    {finalRec.headline}
                  </p>
                  <p className="text-[18px] font-semibold text-emerald-400 mb-6">
                    {finalRec.priceLine}
                  </p>

                  <div className="space-y-3 mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    {finalRec.reasons.map((r) => (
                      <div key={r} className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-500/10 p-1 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-[14px] text-[#9AA6B2] leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => scrollTo(finalRec.nextStepCta.scrollTo)}
                      className="w-full sm:w-auto px-7 py-3.5 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[14px] font-semibold rounded-xl shadow-lg shadow-emerald-900/20"
                    >
                      {finalRec.nextStepCta.label}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={reset}
                      className="w-full sm:w-auto px-7 py-3.5 h-auto text-[#9AA6B2] hover:text-white text-[14px] font-semibold rounded-xl border-white/10 hover:border-white/20 bg-transparent hover:bg-white/5"
                    >
                      Repetir análisis
                    </Button>
                  </div>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-10">
                  <p className="text-[11px] text-[#9AA6B2] uppercase tracking-wider mb-5">
                    Tus respuestas
                  </p>
                  <div className="space-y-4">
                    {STEPS.map((s) => {
                      const selected = s.options.find(
                        (o) => o.value === answers[s.key]
                      );
                      return (
                        <div key={String(s.key)} className="pb-4 border-b border-white/5 last:border-0">
                          <p className="text-[12px] text-[#9AA6B2] mb-1">
                            {s.question}
                          </p>
                          <p className="text-[14px] font-medium text-white">
                            {selected?.label || ""}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3">
              {/* Left - Question */}
              <div className="md:col-span-2 p-8 sm:p-10">
                <div className="mb-8">
                  <h3 className="text-[24px] sm:text-[28px] font-bold text-white mb-2 leading-tight">
                    {current.question}
                  </h3>
                  <p className="text-[13px] text-[#9AA6B2]">
                    Selecciona la opción que mejor describa tu situación
                  </p>
                </div>

                <div className="space-y-3">
                  {current.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => select(option.value)}
                      className="group w-full text-left px-5 py-4 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-[14px] text-[#9AA6B2] hover:text-white"
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.label}</span>
                        <div className="h-5 w-5 rounded-full border border-white/20 group-hover:border-emerald-500 group-hover:bg-emerald-500/20 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={back}
                    className="mt-6 text-[13px] text-[#9AA6B2] hover:text-white transition-colors flex items-center gap-2"
                  >
                    ← Pregunta anterior
                  </button>
                )}
              </div>

              {/* Right - Live preview */}
              <div className="border-t md:border-t-0 md:border-l border-white/5 p-6 sm:p-8 bg-white/[0.01]">
                <p className="text-[11px] text-[#9AA6B2] uppercase tracking-wider mb-5">
                  {liveRec ? "Analizando..." : "Progreso"}
                </p>

                {answeredSummary.length === 0 && !liveRec ? (
                  <p className="text-[13px] text-[#9AA6B2]/30">
                    Comienza respondiendo las preguntas
                  </p>
                ) : (
                  <div className="space-y-4">
                    {answeredSummary.map((a) => (
                      <div key={a.question} className="pb-3 border-b border-white/5">
                        <p className="text-[11px] text-[#9AA6B2] mb-1">
                          {a.question}
                        </p>
                        <p className="text-[13px] text-white">{a.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                {liveRec && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
                        Recomendación actual
                      </p>
                    </div>
                    <p className="text-[16px] font-bold text-white mb-1">
                      {liveRec.plan}
                    </p>
                    <p className="text-[13px] text-emerald-400 mb-3">
                      {liveRec.priceLine}
                    </p>

                    <div className="space-y-2">
                      {liveRec.reasons.slice(0, 2).map((r) => (
                        <div key={r} className="flex items-start gap-2">
                          <div className="h-1 w-1 rounded-full bg-emerald-500/60 mt-1.5 flex-shrink-0" />
                          <p className="text-[12px] text-[#9AA6B2] leading-relaxed">{r}</p>
                        </div>
                      ))}
                    </div>
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