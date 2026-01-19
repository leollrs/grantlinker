import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav: {
      about: 'About Us',
      services: 'Services',
      testimonials: 'Testimonials',
      contact: 'Contact'
    },
    hero: {
      title: 'GrantLinker',
      headline: 'AI-Powered Proposals, Automation & Digital Systems',
      subheadline: 'We help organizations secure funding and scale operations through intelligent systems, automation, and modern digital platforms.',
      cta: 'Book a Call',
      secondary: 'View Our Services'
    },
    about: {
      title: 'About Us',
      subtitle: 'AI-Powered Intelligence for Funding & Operations',
      description: 'GrantLinker is an AI-powered firm that combines funding intelligence, automation, and digital development to help organizations operate smarter, faster, and more efficiently.',
      points: [
        {
          title: 'AI-First Approach',
          desc: 'We leverage cutting-edge AI to streamline grant discovery, automate workflows, and build intelligent digital systems.'
        },
        {
          title: 'Long-Term Systems',
          desc: 'We build sustainable infrastructure, not one-off projects. Our solutions grow with your organization.'
        },
        {
          title: 'Trusted by Institutions',
          desc: 'Built for nonprofits, municipalities, and serious businesses that value intelligent, scalable solutions.'
        }
      ],
      cta: 'Learn How We Work'
    },
    services: {
      title: 'Our Services',
      subtitle: 'Intelligent solutions for funding and operational excellence',
      block1: {
        title: 'Proposals & Grant Intelligence',
        desc: 'AI-assisted grant discovery, opportunity filtering, and proposal support designed to save time and increase funding success.',
        items: [
          'Grant discovery & matching',
          'Eligibility analysis',
          'Opportunity summaries',
          'Strategic funding guidance',
          'Proposal support'
        ],
        cta: 'Explore Grant Services'
      },
      block2: {
        title: 'AI Solutions, Automation & Digital Development',
        desc: 'We design and implement intelligent systems that replace manual work and improve how organizations operate and communicate.',
        items: [
          'AI chatbots',
          'Workflow automation',
          'Appointment & reminder systems',
          'CRM integrations',
          'Websites and web applications',
          'Custom digital platforms'
        ],
        cta: 'Explore AI & Digital Solutions'
      }
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Results that speak for themselves',
      items: [
        {
          quote: 'GrantLinker transformed our grant process with AI-powered tools that saved us countless hours and improved our success rate.',
          author: 'Maria Rodriguez',
          role: 'Executive Director, Community Foundation'
        },
        {
          quote: 'The automation systems they built for us eliminated manual data entry and freed our team to focus on what matters most.',
          author: 'James Chen',
          role: 'Operations Manager, Municipal Services'
        },
        {
          quote: 'Their AI chatbot has revolutionized how we communicate with constituents. Professional, intelligent, and always available.',
          author: 'Patricia Williams',
          role: 'Director of Communications, Nonprofit Alliance'
        }
      ],
      cta: 'Start Your Project'
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Ready to unlock funding opportunities and build intelligent systems? Let\'s talk.',
      form: {
        name: "Full Name",
        org: "Organization Name",
        email: "Email Address",
        service: "Service Type",
        serviceOptions: {
          grant: "Grant Consulting",
          tech: "Technology & Automation",
          both: "Both Services"
        },
        message: "Message (optional)",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent! We'll get back to you soon.",
        error: "Could not send. Please try again.",
        privacy: "We respect your privacy. Your information will never be shared."
      }
    },
    footer: {
      tagline: "AI-powered funding and automation",
      rights: "All rights reserved."
    }
  },
  es: {
    nav: {
      about: 'Nosotros',
      services: 'Servicios',
      testimonials: 'Testimonios',
      contact: 'Contacto'
    },
    hero: {
      title: 'GrantLinker',
      headline: 'Propuestas, Automatización y Sistemas Digitales con IA',
      subheadline: 'Ayudamos a organizaciones a asegurar financiamiento y escalar operaciones mediante sistemas inteligentes, automatización y plataformas digitales modernas.',
      cta: 'Agendar Llamada',
      secondary: 'Ver Servicios'
    },
    about: {
      title: 'Nosotros',
      subtitle: 'Inteligencia Artificial para Financiamiento y Operaciones',
      description: 'GrantLinker es una firma impulsada por IA que combina inteligencia de financiamiento, automatización y desarrollo digital para ayudar a organizaciones a operar de manera más inteligente, rápida y eficiente.',
      points: [
        {
          title: 'Enfoque en IA',
          desc: 'Aprovechamos IA de vanguardia para optimizar la búsqueda de subvenciones, automatizar flujos de trabajo y construir sistemas digitales inteligentes.'
        },
        {
          title: 'Sistemas a Largo Plazo',
          desc: 'Construimos infraestructura sostenible, no proyectos únicos. Nuestras soluciones crecen con su organización.'
        },
        {
          title: 'Confianza Institucional',
          desc: 'Diseñado para organizaciones sin fines de lucro, municipalidades y empresas serias que valoran soluciones inteligentes y escalables.'
        }
      ],
      cta: 'Conoce Cómo Trabajamos'
    },
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones inteligentes para financiamiento y excelencia operativa',
      block1: {
        title: 'Propuestas e Inteligencia de Subvenciones',
        desc: 'Descubrimiento de subvenciones, filtrado de oportunidades y apoyo en propuestas con IA, diseñado para ahorrar tiempo y aumentar el éxito de financiamiento.',
        items: [
          'Descubrimiento y emparejamiento de subvenciones',
          'Análisis de elegibilidad',
          'Resúmenes de oportunidades',
          'Orientación estratégica de financiamiento',
          'Apoyo en propuestas'
        ],
        cta: 'Explorar Servicios de Subvenciones'
      },
      block2: {
        title: 'Soluciones de IA, Automatización y Desarrollo Digital',
        desc: 'Diseñamos e implementamos sistemas inteligentes que reemplazan el trabajo manual y mejoran cómo operan y comunican las organizaciones.',
        items: [
          'Chatbots con IA',
          'Automatización de flujos de trabajo',
          'Sistemas de citas y recordatorios',
          'Integraciones con CRM',
          'Sitios web y aplicaciones web',
          'Plataformas digitales personalizadas'
        ],
        cta: 'Explorar Soluciones de IA y Digitales'
      }
    },
    testimonials: {
      title: 'Lo Que Dicen Nuestros Clientes',
      subtitle: 'Resultados que hablan por sí mismos',
      items: [
        {
          quote: 'GrantLinker transformó nuestro proceso de subvenciones con herramientas impulsadas por IA que nos ahorraron incontables horas y mejoraron nuestra tasa de éxito.',
          author: 'María Rodríguez',
          role: 'Directora Ejecutiva, Fundación Comunitaria'
        },
        {
          quote: 'Los sistemas de automatización que construyeron para nosotros eliminaron la entrada manual de datos y liberaron a nuestro equipo para enfocarse en lo más importante.',
          author: 'James Chen',
          role: 'Gerente de Operaciones, Servicios Municipales'
        },
        {
          quote: 'Su chatbot con IA ha revolucionado cómo nos comunicamos con los ciudadanos. Profesional, inteligente y siempre disponible.',
          author: 'Patricia Williams',
          role: 'Directora de Comunicaciones, Alianza sin Fines de Lucro'
        }
      ],
      cta: 'Iniciar Tu Proyecto'
    },
    contact: {
      title: 'Contáctanos',
      subtitle: '¿Listo para desbloquear oportunidades de financiamiento y construir sistemas inteligentes? Hablemos.',
      form: {
        name: "Nombre Completo",
        org: "Nombre de la Organización",
        email: "Correo Electrónico",
        service: "Tipo de Servicio",
        serviceOptions: {
          grant: "Consultoría de Subvenciones",
          tech: "Tecnología y Automatización",
          both: "Ambos Servicios"
        },
        message: "Mensaje (opcional)",
        submit: "Enviar Mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado! Te responderemos pronto.",
        error: "No se pudo enviar. Intenta de nuevo.",
        privacy: "Respetamos tu privacidad. Tu información nunca será compartida."
      }
    },
    footer: {
      tagline: "Financiamiento y automatización impulsados por IA",
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