import React from "react";
import { CTA } from "@/components/ui/call-to-action";

function CTADemo() {
  return (
    <div className="w-full">
      <CTA />
      {/* Mock targets so the buttons can scroll */}
      <div id="diagnostico" className="h-[600px]" />
      <div id="contacto" className="h-[600px]" />
    </div>
  );
}

export { CTADemo };