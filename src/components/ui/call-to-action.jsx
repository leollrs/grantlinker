import React from "react";
import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

function CTA() {
  return (
    <section className="w-full py-16 sm:py-24 lg:py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col text-center bg-muted/60 border border-border rounded-2xl p-6 sm:p-10 lg:p-14 gap-8 items-center">
          <div>
            <Badge variant="secondary">Get started</Badge>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-balance text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold max-w-2xl">
              ¿Listo para escalar tu organización?
            </h3>

            <p className="text-base sm:text-lg leading-relaxed tracking-tight text-muted-foreground max-w-2xl">
              Te ayudamos a automatizar llamadas, citas y procesos internos para
              que tu equipo opere con menos fricción y más velocidad.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              className="gap-2 justify-center"
              onClick={() => scrollToId("diagnostico")}
            >
              Diagnóstico rápido <MoveRight className="w-4 h-4" />
            </Button>

            <Button
              className="gap-2 justify-center"
              onClick={() => scrollToId("contacto")}
            >
              Agendar llamada <PhoneCall className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            Sin contratos largos. Onboarding incluido. Escala cuando lo necesites.
          </p>
        </div>
      </div>
    </section>
  );
}

export { CTA };