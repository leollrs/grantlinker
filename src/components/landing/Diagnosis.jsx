import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const WEBHOOK_URL =
  "https://leollrs.app.n8n.cloud/webhook/ccf88576-571c-4927-aeb1-4d4ea16cee21";

type OrgType = "nonprofit" | "municipality" | "clinic" | "business" | "other";
type WebsiteState = "yes_good" | "yes_outdated" | "no";
type AppointmentState = "manual" | "excel" | "basic_tool" | "system";
type MissedCalls = "yes_many" | "yes_some" | "no";
type Goal = "automation" | "digital" | "funding" | "all";

type CoverageNeed = "after_hours" | "business_hours" | "24_7";
type Volume = "low" | "medium" | "high";
type Seats = "solo" | "small" | "team" | "multi";

type Answers = {
  orgType?: OrgType;
  missedCalls?: MissedCalls;
  appointments?: AppointmentState;
  hasWebsite?: WebsiteState;
  goal?: Goal;

  // new, to match your pricing model
  coverageNeed?: CoverageNeed;
  volume?: Volume;
  seats?: Seats;
};

const STEPS: Array<{
  question: string;
  key: keyof Answers;
  options: Array<{ value: any; label: string }>;
}> = [
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

type RecTier =
  | "Presencia Digital"
  | "Atención IA"
  | "Presencia + IA (Bundle)"
  | "Automatización Empresarial"
  | "Desarrollo Institucional";

type Recommendation = {
  plan: RecTier;
  headline: string;
  priceLine: string;
  pricingModel: "setup" | "monthly" | "bundle" | "project";
  reasons: string[];
  nextStepCta: { label: string; scrollTo: "diagnostico" | "contacto" | "planes" };
};

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

function estimateAiStartingPrice(answers: Answers) {
  // You told me it varies by hours/volume/seats
  // This is NOT a final quote — just the correct "Desde" baseline.
  const coverage = answers.coverageNeed;
  if (coverage === "after_hours") return { from: 299, label: "After-hours desde $299/mes" };
  if (coverage === "24_7") return { from: 599, label: "24/7 desde $599/mes" };
  // business_hours: keep honest — still starts at after-hours baseline unless you set a different starting number.
  return { from: 299, label: "Desde $299/mes (según horario/volumen)" };
}

function getRecommendation(answers: Answers): Recommendation {
  const orgType = answers.orgType;
  const hasWebsite = answers.hasWebsite;
  const missedCalls = answers.missedCalls;
  const goal = answers.goal;
  const seats = answers.seats;
  const volume = answers.volume;

  const reasons: string[] = [];

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

function getLiveRecommendation(answers: Answers) {
  if (Object.keys(answers).length === 0) return null;

  // If only orgType selected, show nothing yet (avoid misleading early recommendation)
  if (Object.keys(answers).length < 2) return null;

  return getRecommendation(answers);
}

export default function Diagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const total = STEPS.length;
  const current = STEPS[step];

  const liveRec = useMemo(() => getLiveRecommendation(answers), [answers]);
  const finalRec = submitted ? getRecommendation(answers) : null;

  const answeredSummary = STEPS.slice(0, step).map((s) => {
    const selected = s.options.find((o) => o.value === answers[s.key]);
    return { question: s.question, answer: selected?.label || "" };
  });

  const select = async (value: any) => {
    const updated: Answers = { ...answers, [current.key]: value };
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
      className="py-16 sm:py-24 md:py-28 lg:py-40 border-t border-[#1F2630]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2 className="text-[32px] sm:text-[36px] md:text-[44px] font-semibold text-[#E8EEF5] tracking-tight leading-[1.1] mb-3 sm:mb-4">
          Diagnóstico Inteligente
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#9AA6B2] mb-10 sm:mb-16 max-w-lg">
          Responde {STEPS.length} preguntas. Te damos una recomendación inicial (no cotización final).
        </p>

        <div className="rounded-xl border border-[#1F2630] bg-[#11161C] overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-[#1F2630]">
            <span className="text-[12px] sm:text-[13px] text-[#9AA6B2]">
              {submitted ? "Resultado" : `Paso ${step + 1} de ${total}`}
            </span>
            <div className="flex gap-0.5 sm:gap-1">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-4 sm:w-6 h-1 rounded-full transition-colors ${
                    submitted || i <= step ? "bg-emerald-600" : "bg-[#1F2630]"
                  }`}
                />
              ))}
            </div>
          </div>

          {submitted && finalRec ? (
            <div className="p-5 sm:p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                <div>
                  <p className="text-[11px] sm:text-[12px] text-emerald-500 font-medium uppercase tracking-wider mb-3 sm:mb-4">
                    Recomendación
                  </p>
                  <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#E8EEF5] tracking-tight mb-2">
                    {finalRec.plan}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#9AA6B2] mb-1">
                    {finalRec.headline}
                  </p>
                  <p className="text-[14px] sm:text-[15px] text-[#9AA6B2] mb-5">
                    {finalRec.priceLine}
                  </p>

                  <ul className="space-y-2 mb-6 sm:mb-8">
                    {finalRec.reasons.map((r) => (
                      <li
                        key={r}
                        className="text-[14px] text-[#9AA6B2]/70 flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-emerald-500/60 flex-shrink-0 mt-2" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                    <Button
                      onClick={() => scrollTo(finalRec.nextStepCta.scrollTo)}
                      className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-3 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg"
                    >
                      {finalRec.nextStepCta.label}
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

                <div className="border-t md:border-t-0 md:border-l border-[#1F2630] pt-6 md:pt-0 md:pl-8">
                  <p className="text-[12px] text-[#9AA6B2]/50 uppercase tracking-wider mb-4">
                    Tus respuestas
                  </p>
                  <div className="space-y-3">
                    {STEPS.map((s) => {
                      const selected = s.options.find(
                        (o) => o.value === answers[s.key]
                      );
                      return (
                        <div key={String(s.key)}>
                          <p className="text-[12px] text-[#9AA6B2]/50">
                            {s.question}
                          </p>
                          <p className="text-[13px] text-[#E8EEF5]">
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
            <div className="grid md:grid-cols-5">
              {/* Left */}
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
                    onClick={back}
                    className="mt-5 sm:mt-6 text-[12px] sm:text-[13px] text-[#9AA6B2]/50 hover:text-[#9AA6B2] transition-colors"
                  >
                    Atrás
                  </button>
                )}
              </div>

              {/* Right */}
              <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-[#1F2630] p-5 sm:p-6 md:p-8">
                <p className="text-[12px] text-[#9AA6B2]/40 uppercase tracking-wider mb-4">
                  Respuestas
                </p>

                {answeredSummary.length === 0 && !liveRec ? (
                  <p className="text-[13px] text-[#9AA6B2]/30">
                    Sin respuestas aún
                  </p>
                ) : (
                  <div className="space-y-3">
                    {answeredSummary.map((a) => (
                      <div key={a.question}>
                        <p className="text-[12px] text-[#9AA6B2]/40">
                          {a.question}
                        </p>
                        <p className="text-[13px] text-[#E8EEF5]">{a.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                {liveRec && (
                  <div className="mt-6 pt-6 border-t border-[#1F2630]">
                    <p className="text-[12px] text-emerald-500/70 uppercase tracking-wider mb-3">
                      Recomendación actual
                    </p>
                    <p className="text-[15px] font-semibold text-[#E8EEF5] mb-1">
                      {liveRec.plan}
                    </p>
                    <p className="text-[12px] text-[#9AA6B2]/70 mb-1">
                      {liveRec.headline}
                    </p>
                    <p className="text-[12px] text-[#9AA6B2]/60 mb-3">
                      {liveRec.priceLine}
                    </p>

                    <ul className="space-y-1.5">
                      {liveRec.reasons.map((r) => (
                        <li
                          key={r}
                          className="text-[12px] text-[#9AA6B2]/50 flex items-start gap-2"
                        >
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