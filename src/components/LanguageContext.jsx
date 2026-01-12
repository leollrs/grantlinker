import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav: {
      services: "Services",
      clients: "Who We Serve",
      why: "Why Us",
      contact: "Contact"
    },
    hero: {
      headline: "Grants. Systems. Scale.",
      subheadline: "We help nonprofits, municipalities, and growing organizations secure funding and build the systems needed to scale.",
      cta: "Request a Consultation",
      secondary: "View Services"
    },
    services: {
      title: "What We Do",
      grant: {
        title: "Grant Consulting",
        items: ["Grant discovery", "Eligibility analysis", "Strategic guidance", "Funding pipelines"]
      },
      tech: {
        title: "Technology & Automation",
        items: ["Internal systems", "AI-powered workflows", "Reporting & dashboards", "Process automation"]
      },
      support: {
        title: "End-to-End Support",
        items: ["From opportunity → execution", "Built for scale and compliance"]
      }
    },
    clients: {
      title: "Who We Work With",
      subtitle: "Organizations that value compliance, structure, and long-term sustainability.",
      types: [
        { name: "Nonprofits", desc: "Mission-driven organizations ready to scale impact" },
        { name: "Municipalities", desc: "Local governments seeking federal and state funding" },
        { name: "Small & Mid-Sized Businesses", desc: "Growing companies building sustainable systems" },
        { name: "Education & Workforce Programs", desc: "Institutions investing in community development" }
      ]
    },
    why: {
      title: "Why GrantLinker",
      points: [
        "AI-assisted grant discovery",
        "Systems-first mindset",
        "Built for federal and foundation funding",
        "No fluff, no generic templates",
        "Designed for growth, not one-off wins"
      ]
    },
    contact: {
      title: "Let's Talk",
      subtitle: "Ready to secure funding and build scalable systems? Start the conversation.",
      form: {
        name: "Full Name",
        org: "Organization Name",
        email: "Email Address",
        service: "Service Type",
        serviceOptions: {
          grant: "Grant Consulting",
          tech: "Technology & Automation",
          both: "Both"
        },
        message: "Message (optional)",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully. We'll be in touch soon.",
        error: "Something went wrong. Please try again.",
        privacy: "We respect your privacy. Your information will never be shared."
      }
    },
    footer: {
      tagline: "Funding. Systems. Scale.",
      rights: "All rights reserved."
    }
  },
  es: {
    nav: {
      services: "Servicios",
      clients: "A Quién Servimos",
      why: "Por Qué Nosotros",
      contact: "Contacto"
    },
    hero: {
      headline: "Subvenciones. Sistemas. Escalabilidad.",
      subheadline: "Ayudamos a organizaciones sin fines de lucro, municipios y organizaciones en crecimiento a obtener financiamiento y construir los sistemas necesarios para escalar.",
      cta: "Solicitar Consulta",
      secondary: "Ver Servicios"
    },
    services: {
      title: "Lo Que Hacemos",
      grant: {
        title: "Consultoría de Subvenciones",
        items: ["Búsqueda de subvenciones", "Análisis de elegibilidad", "Orientación estratégica", "Pipelines de financiamiento"]
      },
      tech: {
        title: "Tecnología y Automatización",
        items: ["Sistemas internos", "Flujos de trabajo con IA", "Reportes y dashboards", "Automatización de procesos"]
      },
      support: {
        title: "Soporte Integral",
        items: ["De la oportunidad → a la ejecución", "Diseñado para escalar y cumplir normativas"]
      }
    },
    clients: {
      title: "Con Quién Trabajamos",
      subtitle: "Organizaciones que valoran el cumplimiento, la estructura y la sostenibilidad a largo plazo.",
      types: [
        { name: "Organizaciones Sin Fines de Lucro", desc: "Organizaciones con misión listas para escalar su impacto" },
        { name: "Municipios", desc: "Gobiernos locales buscando financiamiento federal y estatal" },
        { name: "Pequeñas y Medianas Empresas", desc: "Empresas en crecimiento construyendo sistemas sostenibles" },
        { name: "Programas Educativos y Laborales", desc: "Instituciones invirtiendo en desarrollo comunitario" }
      ]
    },
    why: {
      title: "Por Qué GrantLinker",
      points: [
        "Búsqueda de subvenciones asistida por IA",
        "Mentalidad enfocada en sistemas",
        "Diseñado para financiamiento federal y de fundaciones",
        "Sin relleno, sin plantillas genéricas",
        "Diseñado para el crecimiento, no para victorias únicas"
      ]
    },
    contact: {
      title: "Hablemos",
      subtitle: "¿Listo para asegurar financiamiento y construir sistemas escalables? Inicia la conversación.",
      form: {
        name: "Nombre Completo",
        org: "Nombre de la Organización",
        email: "Correo Electrónico",
        service: "Tipo de Servicio",
        serviceOptions: {
          grant: "Consultoría de Subvenciones",
          tech: "Tecnología y Automatización",
          both: "Ambos"
        },
        message: "Mensaje (opcional)",
        submit: "Enviar Mensaje",
        sending: "Enviando...",
        success: "Mensaje enviado exitosamente. Nos pondremos en contacto pronto.",
        error: "Algo salió mal. Por favor intenta de nuevo.",
        privacy: "Respetamos tu privacidad. Tu información nunca será compartida."
      }
    },
    footer: {
      tagline: "Financiamiento. Sistemas. Escalabilidad.",
      rights: "Todos los derechos reservados."
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}