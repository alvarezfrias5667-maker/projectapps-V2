import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Cpu,
  RotateCcw,
  ShieldCheck,
  Check,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Target,
  Layers,
  FileText,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { evaluationService } from "../services/evaluationService";

interface EvaluationData {
  industry: string;
  businessSize: string;
  mainProblems: string[];
  goals: string[];
  budget: string;
  openText: string;
}

interface SavedEvaluation {
  id: string;
  date: string;
  industry: string;
  businessSize: string;
  budget: string;
  problemsCount: number;
  goalsCount: number;
  executiveContext: string;
  selectedProblems: string[];
  selectedGoals: string[];
}

export default function SolutionMatchPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState<EvaluationData>({
    industry: "",
    businessSize: "",
    mainProblems: [],
    goals: [],
    budget: "",
    openText: "",
  });

  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);

  const industries = [
    { value: "tecnologia", label: "Tecnología y Software" },
    { value: "ecommerce", label: "E-Commerce y Retail" },
    { value: "finanzas", label: "Finanzas y Fintech" },
    { value: "salud", label: "Salud y Biotecnología" },
    { value: "manufactura", label: "Manufactura y Logística" },
    { value: "servicios", label: "Servicios Profesionales" },
    { value: "educacion", label: "Educación" },
    { value: "otro", label: "Otro Sector" },
  ];

  const businessSizes = [
    { value: "pequena", label: "1–10 colaboradores" },
    { value: "mediana_11_50", label: "11–50 colaboradores" },
    { value: "mediana_51_100", label: "51–100 colaboradores" },
    { value: "grande_101_500", label: "101–500 colaboradores" },
    { value: "grande_500", label: "Más de 500 colaboradores" },
  ];

  const mainProblems = [
    { value: "procesos", label: "Procesos manuales repetitivos" },
    { value: "costos", label: "Costos operativos elevados" },
    { value: "conversion", label: "Baja conversión comercial" },
    { value: "infraestructura_lim", label: "Infraestructura limitada" },
    { value: "escalabilidad", label: "Escalabilidad insuficiente" },
    { value: "automatizacion", label: "Falta de automatización" },
    { value: "visibilidad", label: "Falta de visibilidad operativa" },
    { value: "cumplimiento", label: "Riesgos de cumplimiento" },
    { value: "integracion", label: "Problemas de integración" },
    { value: "otro_desafio", label: "Otro desafío" },
  ];

  const goals = [
    { value: "ingresos", label: "Incrementar ingresos" },
    { value: "costos_op", label: "Reducir costos operativos" },
    { value: "automatizar", label: "Automatizar procesos" },
    { value: "escalar", label: "Escalar operaciones" },
    { value: "eficiencia", label: "Mejorar eficiencia" },
    { value: "infraestructura_opt", label: "Optimizar infraestructura" },
    { value: "propiedad_int", label: "Adquirir propiedad intelectual" },
    { value: "lanzamiento", label: "Acelerar lanzamiento de productos" },
    { value: "riesgos", label: "Reducir riesgos operativos" },
  ];

  const budgets = [
    { value: "fase_inicial", label: "Fase Inicial" },
    { value: "crecimiento", label: "Crecimiento" },
    { value: "expansion", label: "Expansión" },
    { value: "corporativo", label: "Corporativo" },
    { value: "enterprise", label: "Enterprise" },
  ];

  const isFormComplete =
    formData.industry !== "" &&
    formData.businessSize !== "" &&
    formData.mainProblems.length > 0 &&
    formData.goals.length > 0 &&
    formData.budget !== "" &&
    formData.openText.trim().length > 10;

  const handleSelectSingle = (
    field: "industry" | "businessSize" | "budget",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectMultiple = (field: "mainProblems" | "goals", value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return { ...prev, [field]: updated };
    });
  };

  const handleCalculate = (event: FormEvent) => {
    event.preventDefault();
    if (!isFormComplete) return;

    setIsSubmitting(true);

    window.setTimeout(() => {
      setShowResults(true);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      industry: "",
      businessSize: "",
      mainProblems: [],
      goals: [],
      budget: "",
      openText: "",
    });

    setShowResults(false);
    setSaveStatus(false);
  };

  const getLabel = (
    options: { value: string; label: string }[],
    value: string
  ) => options.find((item) => item.value === value)?.label || value;

  const getSelectedLabels = (
    options: { value: string; label: string }[],
    values: string[]
  ) =>
    values
      .map((value) => options.find((item) => item.value === value)?.label)
      .filter(Boolean) as string[];

  const handleSaveEvaluation = async () => {
    const evaluationPayload = {
      industry: getLabel(industries, formData.industry),
      business_size: getLabel(businessSizes, formData.businessSize),
      businessSize: getLabel(businessSizes, formData.businessSize),
      budget: getLabel(budgets, formData.budget),
      problemsCount: formData.mainProblems.length,
      problems_count: formData.mainProblems.length,
      goalsCount: formData.goals.length,
      goals_count: formData.goals.length,
      executiveContext: formData.openText.trim(),
      executive_context: formData.openText.trim(),
      selectedProblems: getSelectedLabels(mainProblems, formData.mainProblems),
      selected_problems: getSelectedLabels(mainProblems, formData.mainProblems),
      selectedGoals: getSelectedLabels(goals, formData.goals),
      selected_goals: getSelectedLabels(goals, formData.goals),
    };

    if (!user) {
      localStorage.setItem("pendingEvaluation", JSON.stringify(evaluationPayload));
      navigate("/login");
      return;
    }

    try {
      await evaluationService.saveEvaluation(user.id, {
        industry: evaluationPayload.industry,
        business_size: evaluationPayload.business_size,
        budget: evaluationPayload.budget,
        problems_count: evaluationPayload.problems_count,
        goals_count: evaluationPayload.goals_count,
        executive_context: evaluationPayload.executive_context,
        selected_problems: evaluationPayload.selected_problems,
        selected_goals: evaluationPayload.selected_goals,
      });
      setSaveStatus(true);
    } catch (err) {
      console.error("Error saving evaluation to Supabase:", err);
    }
  };

  const getWhyBulletPoints = () => {
    const bullets: string[] = [];

    bullets.push(
      `Opera principalmente en ${getLabel(industries, formData.industry)}.`
    );

    bullets.push(
      `Su estructura actual corresponde a ${getLabel(
        businessSizes,
        formData.businessSize
      )}.`
    );

    const selectedProblems = getSelectedLabels(mainProblems, formData.mainProblems);
    if (selectedProblems.length > 0) {
      bullets.push(
        `Los desafíos priorizados incluyen: ${selectedProblems
          .slice(0, 3)
          .join(", ")}.`
      );
    }

    const selectedGoals = getSelectedLabels(goals, formData.goals);
    if (selectedGoals.length > 0) {
      bullets.push(
        `Los objetivos estratégicos incluyen: ${selectedGoals
          .slice(0, 3)
          .join(", ")}.`
      );
    }

    bullets.push(
      `Su horizonte de inversión fue clasificado como ${getLabel(
        budgets,
        formData.budget
      )}.`
    );

    return bullets;
  };

  return (
    <div
      id="solution-match-page"
      className="bg-white text-neutral-900 pb-24 selection:bg-neutral-900 selection:text-white"
    >
      {!showResults ? (
        <div className="max-w-3xl mx-auto px-6 pt-32">
          <header
            id="decision-system-header"
            className="text-center space-y-4 mb-20"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full border border-neutral-200">
              <Cpu className="h-3.5 w-3.5 text-neutral-800" />
              ProjectApps™ Decision System
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight max-w-2xl mx-auto">
              Descubra qué activo digital puede generar mayor impacto en su
              organización.
            </h1>

            <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto font-light leading-relaxed">
              Complete una evaluación estratégica de compatibilidad para
              identificar categorías de activos alineadas con sus objetivos de
              crecimiento, eficiencia y adquisición digital.
            </p>
          </header>

          <form onSubmit={handleCalculate} className="space-y-16">
            <QuestionBlock
              step="PREGUNTA 01 OF 05"
              title="¿En qué industria opera principalmente su organización?"
              options={industries}
              selected={formData.industry}
              onSelect={(value) => handleSelectSingle("industry", value)}
              multiple={false}
            />

            <QuestionBlock
              step="PREGUNTA 02 OF 05"
              title="¿Cuál es el tamaño actual de su organización?"
              options={businessSizes}
              selected={formData.businessSize}
              onSelect={(value) => handleSelectSingle("businessSize", value)}
              multiple={false}
            />

            <QuestionBlock
              step="PREGUNTA 03 OF 05 • SELECCIÓN MÚLTIPLE"
              title="¿Qué desafíos afectan actualmente el rendimiento de su negocio?"
              options={mainProblems}
              selected={formData.mainProblems}
              onSelect={(value) => handleSelectMultiple("mainProblems", value)}
              multiple
            />

            <QuestionBlock
              step="PREGUNTA 04 OF 05 • SELECCIÓN MÚLTIPLE"
              title="¿Qué resultados desea alcanzar durante los próximos 12 meses?"
              options={goals}
              selected={formData.goals}
              onSelect={(value) => handleSelectMultiple("goals", value)}
              multiple
            />

            <QuestionBlock
              step="PREGUNTA 05 OF 05"
              title="¿Cuál es su horizonte de inversión para iniciativas estratégicas?"
              options={budgets}
              selected={formData.budget}
              onSelect={(value) => handleSelectSingle("budget", value)}
              multiple={false}
              threeColumns
            />

            <div className="space-y-6 pt-8 border-t border-neutral-200">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
                  CONTEXTO EJECUTIVO
                </span>

                <h2 className="text-xl sm:text-2xl md:text-[24px] font-bold text-neutral-950 tracking-tight leading-tight">
                  Cuéntenos qué intenta construir, resolver o acelerar.
                </h2>

                <p className="text-sm text-neutral-500 font-light">
                  Comparta brevemente el contexto de su organización, los
                  desafíos actuales o los objetivos que desea alcanzar.
                </p>
              </div>

              <textarea
                value={formData.openText}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    openText: event.target.value,
                  }))
                }
                rows={5}
                required
                placeholder="Buscamos automatizar procesos internos, reducir costos operativos y acelerar la implementación de activos digitales que permitan escalar nuestras operaciones durante los próximos 12 meses."
                className="w-full px-5 py-4 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-base font-light placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition duration-150"
              />
            </div>

            <div className="pt-10 flex flex-col items-center justify-center space-y-4">
              <button
                type="submit"
                disabled={!isFormComplete || isSubmitting}
                className={`w-full max-w-md inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-200 ${
                  isFormComplete && !isSubmitting
                    ? "bg-neutral-950 text-white hover:bg-neutral-800 shadow-lg hover:shadow-xl cursor-pointer"
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                }`}
              >
                {isSubmitting ? (
                  <span>Analizando compatibilidades...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    Generar Evaluación Ejecutiva
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </button>

              {!isFormComplete && (
                <p className="text-xs text-neutral-400 font-light text-center">
                  Complete todas las preguntas y comparta un contexto breve para
                  habilitar la evaluación.
                </p>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div id="results-dashboard" className="max-w-4xl mx-auto px-6 pt-32">
          <header className="text-center space-y-4 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[10px] font-bold tracking-widest text-neutral-900 bg-neutral-100 rounded-full border border-neutral-200 uppercase">
              <ShieldCheck className="h-3.5 w-3.5 text-neutral-800" />
              Executive Report Finalizado
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-950 leading-tight">
              Executive Compatibility Report™
            </h1>

            <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
              Basado en la información proporcionada, identificamos las
              categorías de activos con mayor alineación estratégica para
              acelerar crecimiento, eficiencia operativa y capacidad de
              ejecución.
            </p>

            <div className="pt-6 flex justify-center">
              {saveStatus ? (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-xl">
                  <Check className="h-4 w-4 stroke-[3]" />
                  Informe almacenado correctamente en su Executive Buyer Space™
                </div>
              ) : (
                <button
                  onClick={handleSaveEvaluation}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition shadow-sm hover:shadow-md cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  Guardar en Buyer Portal™
                </button>
              )}
            </div>
          </header>

          <section className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-8 mb-10 space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-bold">
              Executive Alignment Summary™
            </span>

            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Su organización presenta señales compatibles con iniciativas de
              crecimiento, optimización operativa y fortalecimiento de activos
              digitales. La combinación de desafíos actuales, objetivos
              estratégicos y horizonte de inversión sugiere compatibilidad con
              activos orientados a acelerar resultados sin iniciar desarrollos
              desde cero.
            </p>
          </section>

          <section className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 mb-12 space-y-6">
            <div className="border-b border-neutral-100 pb-3">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-bold">
                ¿Por qué recibió esta recomendación?
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getWhyBulletPoints().map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-start gap-2.5 text-xs text-neutral-700 leading-relaxed font-light"
                >
                  <Check className="h-4 w-4 text-neutral-900 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl space-y-1 text-xs">
              <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                Contexto Ejecutivo Compartido
              </span>
              <p className="text-neutral-600 font-light italic leading-relaxed">
                &ldquo;{formData.openText}&rdquo;
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-2">
              Categorías de activos recomendadas
            </h2>

            <RecommendationCard
              icon={<TrendingUp className="h-3 w-3 text-neutral-500" />}
              badge="Excelente Ajuste"
              eyebrow="RECOMENDACIÓN #1"
              title="Revenue Intelligence Assets™"
              description="Activos orientados a acelerar ingresos, optimizar adquisición comercial y mejorar eficiencia de monetización mediante estructuras digitales listas para evaluación e implementación."
              benefit="Puede apoyar crecimiento comercial, conversión y priorización de oportunidades de ingresos."
              capability="Adquisición comercial • Conversión • Monetización"
              dark
            />

            <RecommendationCard
              icon={<Target className="h-3 w-3 text-neutral-500" />}
              badge="Recomendación Prioritaria"
              eyebrow="RECOMENDACIÓN #2"
              title="Visibility Intelligence Assets™"
              description="Activos enfocados en visibilidad digital, descubrimiento de oportunidades comerciales y fortalecimiento de canales de adquisición."
              benefit="Puede ayudar a mejorar presencia digital, detectar oportunidades y reducir dependencia de adquisición improvisada."
              capability="Visibilidad • Descubrimiento • Adquisición"
            />

            <RecommendationCard
              icon={<Layers className="h-3 w-3 text-neutral-500" />}
              badge="Alta Compatibilidad"
              eyebrow="RECOMENDACIÓN #3"
              title="Execution & Deployment Assets™"
              description="Activos preparados para acelerar implementación, reducir tiempo de ejecución y facilitar el despliegue de nuevas iniciativas digitales."
              benefit="Puede reducir fricción de lanzamiento y apoyar ejecución más rápida de proyectos empresariales."
              capability="Implementación • Ejecución • Despliegue"
            />
          </section>

          <section className="mt-14 bg-neutral-50 border border-neutral-200 p-8 rounded-2xl space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block text-center">
              Próximos Pasos Recomendados™
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                "Explorar categorías sugeridas",
                "Revisar disponibilidad",
                "Solicitar información ejecutiva",
                "Iniciar proceso de adquisición",
                "Coordinar transferencia",
              ].map((step, index) => (
                <div
                  key={step}
                  className="rounded-xl bg-white border border-neutral-200 p-4 text-center"
                >
                  <span className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-white text-[10px] font-bold">
                    {index + 1}
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-5">
              <Link
                to="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition"
              >
                Explorar Portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition"
              >
                Solicitar Disponibilidad
              </Link>
            </div>
          </section>

          <div className="pt-8 flex justify-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-neutral-600 uppercase tracking-wider transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Realizar Nuevo Diagnóstico
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionBlock({
  step,
  title,
  options,
  selected,
  onSelect,
  multiple,
  threeColumns,
}: {
  step: string;
  title: string;
  options: { value: string; label: string }[];
  selected: string | string[];
  onSelect: (value: string) => void;
  multiple: boolean;
  threeColumns?: boolean;
}) {
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block">
          {step}
        </span>

        <h2 className="text-xl sm:text-2xl md:text-[24px] font-bold text-neutral-950 tracking-tight leading-tight">
          {title}
        </h2>
      </div>

      <div
        className={`grid grid-cols-1 gap-3.5 pt-2 ${
          threeColumns ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
        }`}
      >
        {options.map((option) => {
          const isSelected = Array.isArray(selected)
            ? selected.includes(option.value)
            : selected === option.value;

          return (
            <button
              type="button"
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`px-5 py-4 text-left text-sm md:text-base rounded-xl border transition-all duration-150 font-medium flex items-center justify-between group ${
                isSelected
                  ? "border-neutral-950 bg-neutral-950 text-white shadow-sm"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50/50"
              }`}
            >
              <span>{option.label}</span>

              <div
                className={`h-5 w-5 ${
                  multiple ? "rounded" : "rounded-full"
                } border flex items-center justify-center shrink-0 ${
                  isSelected
                    ? "border-white bg-white text-neutral-950"
                    : "border-neutral-300 bg-transparent"
                }`}
              >
                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RecommendationCard({
  icon,
  badge,
  eyebrow,
  title,
  description,
  benefit,
  capability,
  dark,
}: {
  icon: React.ReactNode;
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  benefit: string;
  capability: string;
  dark?: boolean;
}) {
  return (
    <article className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 hover:border-neutral-400 transition-all duration-200 relative overflow-hidden">
      <div
        className={`absolute right-0 top-0 px-4 py-1.5 rounded-bl-xl text-[10px] font-bold tracking-widest uppercase ${
          dark
            ? "bg-neutral-950 text-white"
            : "bg-neutral-100 text-neutral-800 border-l border-b border-neutral-200"
        }`}
      >
        {badge}
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase font-black flex items-center gap-1.5">
            {icon}
            {eyebrow}
          </span>

          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            {title}
          </h3>
        </div>

        <p className="text-sm font-light text-neutral-500 leading-relaxed max-w-3xl">
          {description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
              Beneficio esperado
            </span>

            <p className="text-xs text-neutral-700 font-medium">{benefit}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
              Capacidad estratégica
            </span>

            <p className="text-xs text-neutral-700 font-medium">{capability}</p>
          </div>
        </div>
      </div>
    </article>
  );
}