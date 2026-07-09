import React from "react";
import { Link } from "react-router-dom";
import { 
  Compass, 
  ArrowRight, 
  Check, 
  X, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Clock, 
  FileCheck2, 
  Briefcase, 
  CheckCircle2, 
  FolderArchive, 
  Lock, 
  HelpCircle,
  FileCode,
  Sparkles,
  Info,
  ChevronRight,
  Database,
  ArrowUpRight
} from "lucide-react";

export default function AcquisitionProcessPage() {
  const steps = [
    {
      num: "01",
      title: "Explore Portfolio™",
      desc: "Revise categorías disponibles.",
      details: "Examine detalladamente las áreas lógicas de negocio, clasificaciones de estados de activos e inventarios en tiempo real de nuestra plataforma."
    },
    {
      num: "02",
      title: "Request Availability™",
      desc: "Envíe una solicitud.",
      details: "Complete nuestro protocolo de solicitud formal indicando su nivel de interés y necesidades específicas de integración corporativa."
    },
    {
      num: "03",
      title: "Executive Preview™",
      desc: "Reciba un resumen ejecutivo.",
      details: "Acceda a una ficha técnica validada con el alcance exacto, estado real y la modalidad comercial idónea sugerida."
    },
    {
      num: "04",
      title: "Commercial Validation™",
      desc: "Validación de compatibilidad y alcance.",
      details: "Coordinación técnica para asegurar que el activo satisface plenamente sus capacidades de infraestructura y objetivos."
    },
    {
      num: "05",
      title: "Acquisition Agreement™",
      desc: "Definición de condiciones.",
      details: "Formalización contractual que rige el traspaso, derechos de uso comercial, marcas blancas y exclusión de regalías."
    },
    {
      num: "06",
      title: "Payment™",
      desc: "Confirmación de pago.",
      details: "Transacción única garantizada bajo estrictos estándares de validación para proteger el flujo transaccional."
    },
    {
      num: "07",
      title: "Transfer™",
      desc: "Entrega de materiales incluidos.",
      details: "Traspaso directo y seguro del código base o el paquete Project ZIP™ correspondiente hacia sus servidores."
    }
  ];

  const trustSignals = [
    {
      title: "Process Documentation™",
      desc: "Cada etapa está protocolizada y documentada formalmente para evitar sorpresas o vacíos de gestión."
    },
    {
      title: "Executive Preview™",
      desc: "Inspeccione el alcance estructural validado sin revelar detalles sensibles de lógica privada."
    },
    {
      title: "Commercial Validation™",
      desc: "Aseguramos que la tecnología se adecue fielmente a sus sistemas internos antes de autorizar firmas."
    },
    {
      title: "Structured Transfer™",
      desc: "Modelos limpios de transferencia de código fuente que garantizan una herencia tecnológica directa."
    },
    {
      title: "Written Communication™",
      desc: "Trazabilidad completa mediante acuerdos y correspondencia escrita para salvaguarda de ambas partes."
    },
    {
      title: "Intellectual Property Protection™",
      desc: "Garantía de cesión legal y exención perpetua de reclamaciones de derechos de autor corporativos."
    }
  ];

  return (
    <div id="acquisition-process-page" className="bg-white text-neutral-900 pb-24 selection:bg-neutral-900 selection:text-white">
      
      {/* HERO SECTION */}
      <section id="process-hero" className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto text-center space-y-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full">
          Private Business Asset Marketplace™
        </span>
        <h1 id="process-title" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight max-w-4xl mx-auto">
          How ProjectApps™ Acquisitions Work
        </h1>
        <p id="process-subtitle" className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
          Cada adquisición sigue un proceso diseñado para proteger tanto al comprador como al propietario del activo.
        </p>
      </section>

      {/* SECCIÓN 1: WHY PROJECTAPPS™ EXISTS (Editorial layout) */}
      <section id="why-exists-section" className="py-20 px-6 md:px-12 bg-neutral-50 border-t border-b border-neutral-200/60">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block mb-2">
              PROPÓSITO CORPORATIVO
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-950 tracking-tight leading-tight">
              Why ProjectApps™ Exists
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-sm md:text-base text-neutral-600 font-light leading-relaxed">
            <p>
              La mayoría de las empresas invierte meses construyendo herramientas antes de validar si realmente necesitan existir. Esto devora presupuestos y agota la energía creativa de los equipos de ingeniería en tareas de re-invención de lógica ya solucionada.
            </p>
            <p className="font-medium text-neutral-900">
              ProjectApps™ ayuda a descubrir, evaluar y adquirir activos empresariales ya estructurados para acelerar resultados y reducir riesgo de ejecución de forma inmediata.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: HOW ACQUISITIONS WORK (Visual timeline) */}
      <section id="timeline-section" className="py-24 px-6 md:px-12 max-w-5xl mx-auto space-y-16">
        <div className="text-center md:text-left space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
            FLUJO DE ADQUISICIÓN SEGURO
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            How Acquisitions Work
          </h2>
          <p className="text-sm text-neutral-500 font-light max-w-xl">
            Siete pasos técnicos estandarizados diseñados bajo metodologías de resguardo de capital e información confidencial.
          </p>
        </div>

        {/* Elegant Vertical Timeline */}
        <div id="visual-timeline" className="relative border-l border-neutral-200 pl-6 md:pl-10 ml-4 md:ml-6 space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} id={`timeline-step-${idx}`} className="relative">
              {/* Timeline indicator circle */}
              <div className="absolute -left-[35px] md:-left-[51px] top-1 bg-white border-2 border-neutral-900 w-5 h-5 rounded-full flex items-center justify-center z-10">
                <div className="bg-neutral-900 w-1.5 h-1.5 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <span className="text-xs font-mono font-bold text-neutral-400 block">{step.num} / ETAPA</span>
                  <h3 className="text-base font-black text-neutral-900 tracking-tight mt-0.5">
                    {step.title}
                  </h3>
                </div>
                <div className="md:col-span-9 space-y-1.5">
                  <p className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                    {step.desc}
                  </p>
                  <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 3: EXECUTIVE PREVIEW™ (What is shown vs not shown) */}
      <section id="executive-preview-section" className="py-24 px-6 md:px-12 bg-neutral-950 text-neutral-100 border-t border-b border-neutral-900">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest text-neutral-300 uppercase font-black bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
              <Sparkles className="h-3 w-3 text-amber-400" /> Executive Preview™
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Executive Preview™
            </h2>
            <p className="text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
              Antes de cualquier adquisición, los interesados reciben información suficiente para evaluar la oportunidad sin comprometer materiales confidenciales. Esto permite mitigar riesgos antes del desembolso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* What is shown */}
            <div className="bg-neutral-900 border border-neutral-805 p-8 rounded-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">Información Compartida</span>
              </div>
              <ul className="space-y-3.5 text-xs">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-100 block">Categoría y Módulo Lógico</strong>
                    <span className="text-neutral-400 font-light">Identificación clara de la solución y su pilar comercial.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-100 block">Estado del Activo (Asset Status™)</strong>
                    <span className="text-neutral-400 font-light">Clasificación de madurez (Ready, Growth, Project ZIP™).</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-100 block">Nivel de Avance</strong>
                    <span className="text-neutral-400 font-light">Detalle pragmático del estatus de la arquitectura lógica.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-100 block">Modalidad Comercial</strong>
                    <span className="text-neutral-400 font-light">Derechos comerciales cedidos, opciones multimarca y reventa.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-100 block">Alcance General</strong>
                    <span className="text-neutral-400 font-light">Límites funcionales cubiertos por el código disponible.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* What is NOT shown */}
            <div className="bg-neutral-900 border border-neutral-805 p-8 rounded-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                <div className="p-1 bg-red-500/20 text-red-400 rounded">
                  <X className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">Materiales Protegidos</span>
              </div>
              <ul className="space-y-3.5 text-xs">
                <li className="flex items-start gap-2.5">
                  <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-200 block">Código Fuente Interno</strong>
                    <span className="text-neutral-450 font-light">El código fuente se resguarda estrictamente hasta la transferencia.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-200 block">Repositorios Privados Activos</strong>
                    <span className="text-neutral-450 font-light">Acceso a carpetas estructuradas de desarrollo de ingeniería en vivo.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-200 block">Prompts de Configuración Sensibles</strong>
                    <span className="text-neutral-450 font-light">Lógicas de modelado de inteligencia o credenciales de calibración.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-200 block">Arquitectura Completa Identificable</strong>
                    <span className="text-neutral-450 font-light">Diagramas detallados de red privada o base de datos.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-200 block">Documentación Privada Comercial</strong>
                    <span className="text-neutral-450 font-light">Manuales de despliegue interno o claves confidenciales.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: DUE DILIGENCE™ */}
      <section id="due-diligence-section" className="py-24 px-6 md:px-12 max-w-4xl mx-auto space-y-6 text-center md:text-left">
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block">
          CONTROL DE CALIDAD COMERCIAL
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Due Diligence™
        </h2>
        <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed max-w-3xl">
          Los compradores reciben información validada sobre el estado actual del activo antes de cualquier adquisición formal. Nuestro objetivo primordial es <strong>reducir la incertidumbre técnica y facilitar decisiones comerciales sumamente informadas</strong> que prevengan riesgos operativos o de código inservible.
        </p>
      </section>

      {/* SECCIÓN 5: WHAT YOU RECEIVE™ (Large premium cards with details) */}
      <section id="what-you-receive-section" className="py-24 px-6 md:px-12 bg-neutral-50 border-t border-b border-neutral-200/60">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
              CATÁLOGO DE ACUERDOS
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              What You Receive™
            </h2>
            <p className="text-sm text-neutral-500 font-light max-w-md">
              Modalidades de entrega adaptadas al grado de sofisticación técnica de su organización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Ready Revenue Asset */}
            <div className="bg-white border border-neutral-200 p-8 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-neutral-900 bg-neutral-100 rounded uppercase">
                  Ready Revenue Asset™
                </div>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  Lógica completamente operativa enfocada en un acoplamiento acelerado para iniciar facturación o control comercial en tiempo récord.
                </p>
                <div className="pt-2">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-2 font-bold">Puede Incluir:</span>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Aplicación funcional</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Configuración inicial</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Documentación existente</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Licencia comercial</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2: Growth Asset */}
            <div className="bg-white border border-neutral-200 p-8 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-neutral-900 bg-neutral-100 rounded uppercase">
                  Growth Asset™
                </div>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  Proyectos sofisticados con pipelines de datos estables optimizados para captación o administración de tracción comercial robusta.
                </p>
                <div className="pt-2">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-2 font-bold">Puede Incluir:</span>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Proyecto avanzado</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Roadmap disponible</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Arquitectura existente</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Materiales asociados</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3: Project ZIP */}
            <div className="bg-white border border-neutral-200 p-8 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-neutral-900 bg-neutral-100 rounded uppercase">
                  Project ZIP™
                </div>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  Lógica y código puro empaquetados en su estado actual, ideales para equipos que requieren soberanía absoluta y desarrollo interno.
                </p>
                <div className="pt-2">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-2 font-bold">Puede Incluir:</span>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Código fuente actual</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Assets disponibles</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Estado real de avance</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Estructura del proyecto</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 4: Enterprise White Label */}
            <div className="bg-white border border-neutral-200 p-8 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-amber-900 bg-amber-50 rounded uppercase">
                  Enterprise White Label™
                </div>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  Flexibilidad absoluta de marca y licencias expandidas que conceden libertad legal para sub-licenciar sin regalías ni intermediarios.
                </p>
                <div className="pt-2">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-2 font-bold">Puede Incluir:</span>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Código disponible</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Marca blanca</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Licencia ampliada</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Materiales transferibles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-100 border border-neutral-200 p-5 rounded-lg flex items-start gap-3 text-xs text-neutral-600 max-w-4xl mx-auto">
            <Info className="h-4.5 w-4.5 text-neutral-800 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Nota de Transparencia Legal:</strong> Los elementos incluidos descritos anteriormente dependen estrictamente de la modalidad comercial formalizada y seleccionada para la adquisición del activo respectivo.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: PROTECTION FOR BOTH PARTIES™ */}
      <section id="protection-parties" className="py-24 px-6 md:px-12 max-w-4xl mx-auto space-y-6 text-center">
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block">
          EQUILIBRIO CONTRACTUAL
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Protection For Both Parties™
        </h2>
        <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
          ProjectApps™ protege rigurosamente la propiedad intelectual de todos los activos digitales en su portfolio. Los compradores reciben información fidedigna y validada suficiente para evaluar de manera racional la oportunidad, mientras que los creadores y propietarios originales resguardan sus materiales lógicos y arquitecturas confidenciales hasta completar la debida validación y el protocolo de adquisición.
        </p>
      </section>

      {/* SECCIÓN 7: TRUST SIGNALS™ (Premium cards grid) */}
      <section id="trust-signals" className="py-24 px-6 md:px-12 bg-neutral-50 border-t border-b border-neutral-200/60">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
              SISTEMA DE SEGURIDAD COMERCIAL
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              Trust Signals™
            </h2>
            <p className="text-sm text-neutral-500 font-light">
              Protocolos que rigen el ecosistema privado de ProjectApps™.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustSignals.map((signal, idx) => (
              <div 
                key={idx}
                id={`trust-signal-${idx}`}
                className="bg-white border border-neutral-200/80 p-6 rounded-lg space-y-3 hover:border-neutral-400 transition"
              >
                <h4 className="text-sm font-bold text-neutral-950 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full inline-block"></span>
                  {signal.title}
                </h4>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  {signal.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 8: AFTER ACQUISITION™ */}
      <section id="after-acquisition" className="py-24 px-6 md:px-12 max-w-4xl mx-auto space-y-6 text-center">
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block">
          ETAPA DE DESPLIEGUE Y SOBERANÍA
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
          What Happens After Acquisition?
        </h2>
        <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
          Dependiendo de la modalidad adquirida, el comprador recibe los materiales incluidos de forma inmediata y directa. Su organización asume la administración, personalización, revestimiento de marca (White Label) o despliegue del activo bajo las condiciones de herencia tecnológica correspondientes, asegurando un salto de meses de ingeniería manual.
        </p>
      </section>

      {/* CTA FINAL */}
      <section id="elegant-process-cta" className="py-12 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="bg-neutral-900 text-white rounded-xl p-8 md:p-16 text-center space-y-6 relative overflow-hidden border border-neutral-800">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase block">
              Inicie su evaluación hoy
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Ready To Explore Available Assets?
            </h3>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              Explore categorías disponibles o solicite disponibilidad para una oportunidad específica.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                to="/pricing"
                className="px-6 py-3 bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider rounded hover:bg-neutral-100 transition whitespace-nowrap"
              >
                Explore Portfolio
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 text-xs font-bold uppercase tracking-wider rounded transition whitespace-nowrap"
              >
                Request Availability
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
