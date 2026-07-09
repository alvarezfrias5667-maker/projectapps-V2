export default function FAQSection() {
  const faqs = [
    {
      question: "¿Qué es un Ready Revenue Asset™?",
      answer: "Es un activo digital validado y 100% funcional diseñado con fines comerciales específicos, capaz de generar flujos transaccionales y captura de leads de forma inmediata tras su despliegue."
    },
    {
      question: "¿Qué incluye una implementación?",
      answer: "La implementación incluye la configuración inicial del activo en su entorno, aseguramiento de variables comerciales del negocio, personalización básica de identidad visual y transferencia del manual de operación."
    },
    {
      question: "¿Puedo comprar una licencia comercial?",
      answer: "Sí. Ofrecemos diferentes modalidades de licencia según las necesidades operativas de su negocio, incluyendo licencias de uso, licencias comerciales extendidas y planes multilicencia."
    },
    {
      question: "¿Puedo adquirir el código fuente de los activos?",
      answer: "Sí. Para ciertas categorías, especialmente en la capa Strategic Assets™, se otorga la opción de adquirir de forma total y perpetua el código fuente para garantizar soberanía absoluta y escalabilidad sin dependencias."
    },
    {
      question: "¿Qué incluye un Portfolio Project™?",
      answer: "Incluye activos integrales validados en producción del portafolio comercial de ProjectApps™, con esquemas, guías de diseño lógico y soporte de puesta en marcha para su negocio."
    },
    {
      question: "¿Qué incluye un Prompt Kit™?",
      answer: "Es un conjunto avanzado de directrices optimizadas de ingeniería de instrucciones estructuradas para gobernar las capas de automatización y flujos lógicos con total predictibilidad semántica."
    }
  ];

  return (
    <section id="faq-section" className="py-20 max-w-4xl mx-auto px-6 md:px-12">
      <h2 id="faq-title" className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-12 text-center">
        Preguntas Frecuentes
      </h2>
      <div id="faq-list" className="space-y-10">
        {faqs.map((faq, index) => (
          <div key={index} id={`faq-item-${index}`} className="border-b border-neutral-200 pb-8 last:border-b-0 animate-fade-in">
            <h3 className="text-lg font-bold text-neutral-900 mb-2">{faq.question}</h3>
            <p className="text-neutral-600 leading-relaxed text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
