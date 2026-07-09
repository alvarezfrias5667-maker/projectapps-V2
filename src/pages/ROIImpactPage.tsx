import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  PiggyBank, 
  Coins, 
  Hourglass, 
  Zap, 
  TrendingUp, 
  FileCode,
  ArrowRight,
  Calculator,
  RefreshCw,
  Cpu,
  BookmarkCheck,
  Building
} from "lucide-react";
import { calculateRoiImpact } from "../services/roiImpactService";
import { RoiInput, RoiResult, DEFAULT_ROI_INPUT } from "../data/roiRules";

export default function ROIImpactPage() {
  const [formData, setFormData] = useState<RoiInput>({ ...DEFAULT_ROI_INPUT });
  const [result, setResult] = useState<RoiResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Compute live calculation when formData changes for premium interactivity, 
  // or on submit.
  useEffect(() => {
    setResult(calculateRoiImpact(formData));
  }, [formData]);

  const handlePresetSelect = (presetType: "certi" | "conversion" | "compliance" | "bespoke") => {
    if (presetType === "certi") {
      setFormData({
        assetValueScore: 81,
        opportunityType: "Ready Revenue Asset",
        revenuePotential: "Medium-High",
        complexity: "Medium",
        currentHoursWastedPerMonth: 45,
        hourlyCostDollar: 35
      });
    } else if (presetType === "conversion") {
      setFormData({
        assetValueScore: 92,
        opportunityType: "Growth Asset",
        revenuePotential: "High",
        complexity: "Low",
        currentHoursWastedPerMonth: 60,
        hourlyCostDollar: 40
      });
    } else if (presetType === "compliance") {
      setFormData({
        assetValueScore: 74,
        opportunityType: "Strategic Asset",
        revenuePotential: "High",
        complexity: "High",
        currentHoursWastedPerMonth: 30,
        hourlyCostDollar: 50
      });
    } else {
      setFormData({
        assetValueScore: 88,
        opportunityType: "Enterprise White Label",
        revenuePotential: "High",
        complexity: "Medium",
        currentHoursWastedPerMonth: 80,
        hourlyCostDollar: 45
      });
    }
  };

  const getImpactBadgeColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      case "Medium-High":
        return "bg-teal-50 text-teal-800 border-teal-300";
      case "Medium":
        return "bg-amber-50 text-amber-800 border-amber-300";
      default:
        return "bg-neutral-50 text-neutral-800 border-neutral-300";
    }
  };

  const getRecBadgeColor = (rec: string) => {
    switch (rec) {
      case "Proceed":
        return "bg-neutral-900 text-white border-neutral-900";
      case "Refine":
        return "bg-amber-100 text-amber-900 border-amber-300";
      default:
        return "bg-red-50 text-red-900 border-red-200";
    }
  };

  return (
    <div id="roi-impact-page" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full mb-3">
          <Calculator className="h-3.5 w-3.5" /> ROI & Impact Engine™
        </span>
        <h1 id="roi-page-title" className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-4">
          Cálculo de Retorno Financiero e Impacto
        </h1>
        <p id="roi-page-subtitle" className="text-lg text-neutral-500 max-w-2xl mx-auto font-light">
          ¿Vale la pena construir esta oportunidad? Conozca el coste del problema, los ahorros anuales potenciales, el payback y ROI estimado de forma instantánea.
        </p>
      </div>

      {/* Preset Pre-loaders */}
      <div className="mb-12">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block text-center mb-4">
          Pre-cargar Datos de Evaluación de Activos
        </span>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handlePresetSelect("certi")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            CertiRapid (81 Score, Ready Asset)
          </button>
          <button
            onClick={() => handlePresetSelect("conversion")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            ConversionOS (92 Score, Growth Asset)
          </button>
          <button
            onClick={() => handlePresetSelect("compliance")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            ComplianceGuard (74 Score, Strategic Asset)
          </button>
          <button
            onClick={() => handlePresetSelect("bespoke")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            Enterprise Suite (88 Score, White Label)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form panel inputs */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 p-8 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-neutral-800" /> Parámetros Computacionales
          </h2>

          <div className="space-y-6">
            {/* Asset Value Score coming from asset intelligence */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Asset Value Score™ (Inteligencia Base)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.assetValueScore}
                  onChange={(e) => setFormData({ ...formData, assetValueScore: parseInt(e.target.value) })}
                  className="w-full accent-neutral-900"
                />
                <span className="text-sm font-black text-neutral-900 min-w-[32px] text-right">
                  {formData.assetValueScore}
                </span>
              </div>
            </div>

            {/* Opportunity Type */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Categoría del Activo
              </label>
              <select
                value={formData.opportunityType}
                onChange={(e) => setFormData({ ...formData, opportunityType: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              >
                <option value="Ready Revenue Asset">Ready Revenue Asset™</option>
                <option value="Growth Asset">Growth Asset™</option>
                <option value="Strategic Asset">Strategic Asset™</option>
                <option value="Enterprise White Label">Enterprise White Label™</option>
              </select>
            </div>

            {/* Revenue potential */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Potencial de Ingreso Comercial
              </label>
              <select
                value={formData.revenuePotential}
                onChange={(e) => setFormData({ ...formData, revenuePotential: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              >
                <option value="High">Alto (Mercado maduro con reventa)</option>
                <option value="Medium-High">Medio-Alto (Interés corporativo sustancial)</option>
                <option value="Medium">Medio (Casos de uso modulares)</option>
                <option value="Low">Bajo (Sectores nicho u optimización local)</option>
              </select>
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Complejidad del Desarrollo
              </label>
              <select
                value={formData.complexity}
                onChange={(e) => setFormData({ ...formData, complexity: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              >
                <option value="Low">Baja Complejidad (Rápida de desplegar)</option>
                <option value="Medium">Media Complejidad (Arquitectura modular)</option>
                <option value="High">Alta Complejidad (Integración IP profunda)</option>
              </select>
            </div>

            <div className="border-t border-neutral-150 pt-5 space-y-4">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                Métricas de Fricción Operativa (Manual)
              </span>

              {/* Hours wasted per month */}
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  Horas perdidas al mes en procesos manuales:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="160"
                    step="5"
                    value={formData.currentHoursWastedPerMonth ?? 40}
                    onChange={(e) => setFormData({ ...formData, currentHoursWastedPerMonth: parseInt(e.target.value) })}
                    className="w-full accent-neutral-900"
                  />
                  <span className="text-sm font-bold text-neutral-800 shrink-0 min-w-[50px] text-right">
                    {formData.currentHoursWastedPerMonth ?? 40} hrs
                  </span>
                </div>
              </div>

              {/* Hourly cost */}
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  Costo operativo ponderado ($ por hora):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="15"
                    max="150"
                    step="5"
                    value={formData.hourlyCostDollar ?? 35}
                    onChange={(e) => setFormData({ ...formData, hourlyCostDollar: parseInt(e.target.value) })}
                    className="w-full accent-neutral-900"
                  />
                  <span className="text-sm font-bold text-neutral-800 shrink-0 min-w-[50px] text-right">
                    ${formData.hourlyCostDollar ?? 35}/hr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output metrics calculation results */}
        <div className="lg:col-span-7 space-y-6">
          {result && (
            <div className="space-y-6">
              {/* Main ROI Metrics Grid */}
              <div id="roi-output-panel" className="bg-white border border-neutral-200 rounded-lg p-8 shadow-sm">
                <h3 className="text-lg font-extrabold text-neutral-900 mb-6 flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-neutral-800" /> Retorno Financiero Determinado
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {/* Metric 1 */}
                  <div className="p-5 bg-neutral-50/50 rounded-lg border border-neutral-100 flex items-start gap-4">
                    <div className="p-2 bg-emerald-50 rounded text-emerald-700">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Ahorro Anual Estimado</span>
                      <span className="text-2xl font-black text-neutral-900 block mt-1">
                        ${result.annualSavings.toLocaleString()} USD
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5 font-light">Eliminando ineficiencias del problema</span>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-5 bg-neutral-50/50 rounded-lg border border-neutral-100 flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded text-blue-700">
                      <Coins className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Potencial de Ingresos</span>
                      <span className="text-2xl font-black text-neutral-900 block mt-1">
                        ${result.potentialRevenueGain.toLocaleString()} USD
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5 font-light">Para licenciamiento o reventa corporativa</span>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-5 bg-neutral-50/50 rounded-lg border border-neutral-100 flex items-start gap-4">
                    <div className="p-2 bg-amber-50 rounded text-amber-700">
                      <Hourglass className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Período de Recuperación</span>
                      <span className="text-2xl font-black text-neutral-900 block mt-1">
                        {result.paybackPeriod}
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5 font-light">Payback teórico estimado</span>
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-5 bg-neutral-50/50 rounded-lg border border-neutral-100 flex items-start gap-4">
                    <div className="p-2 bg-purple-50 rounded text-purple-700">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Impacto ROI Estimado</span>
                      <span className="text-2xl font-black text-neutral-900 block mt-1">
                        {result.roiScore}x
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5 font-light">Valor anualizado vs coste de desarrollo</span>
                    </div>
                  </div>
                </div>

                {/* Sub-scores info blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50 p-6 rounded-lg border border-neutral-200 mb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">Nivel de Impacto Comercial</span>
                    <span className={`inline-block text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${getImpactBadgeColor(result.impactLevel)}`}>
                      Impacto {result.impactLevel}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">Recomendación Ejecutiva</span>
                    <span className={`inline-block text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${getRecBadgeColor(result.recommendation)}`}>
                      {result.recommendation === "Proceed" ? "Proceder con Construcción (Proceed)" : result.recommendation === "Refine" ? "Refinar Parámetros (Refine)" : "Baja Prioridad / Hold"}
                    </span>
                  </div>
                </div>

                {/* Narrative */}
                <div className="border border-neutral-200 p-4 rounded flex items-start gap-3">
                  <BookmarkCheck className="h-5 w-5 text-neutral-900 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Análisis Ponderado del Negocio:</h5>
                    <p className="text-xs text-neutral-600 font-light mt-1 leading-relaxed">
                      {result.shortExplanation} Al digitalizar este proceso mediante ProjectApps™, el valor total anual consolidado que se rescata es de{" "}
                      <strong>${result.totalEstimatedValue.toLocaleString()} USD</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* JSON Requirement (SALIDA DEBE CONTENER EJEMPLO JSON) */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-lg">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <FileCode className="h-4 w-4" /> JSON de Impacto ROI
                </span>
                <pre id="roi-json" className="bg-neutral-900 text-neutral-100 p-4 rounded text-xs overflow-x-auto font-mono leading-relaxed">
                  {JSON.stringify({
                    annualSavings: result.annualSavings,
                    potentialRevenueGain: result.potentialRevenueGain,
                    paybackPeriod: result.paybackPeriod,
                    roiScore: result.roiScore,
                    impactLevel: result.impactLevel,
                    recommendation: result.recommendation
                  }, null, 2)}
                </pre>
              </div>

              {/* Next phase simulation / CTA */}
              <div className="bg-neutral-950 p-8 rounded-lg text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="h-4.5 w-4.5 text-neutral-300" />
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-neutral-400">ProjectApps™ Ecosystem</span>
                </div>
                <h4 className="text-lg font-bold">Activo Listo para Licenciamiento</h4>
                <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed max-w-xl">
                  Asset Discovery™ detectó la oportunidad. Asset Intelligence™ confirmó su excelencia. ROI & Impact™ ratifica su rentabilidad comercial impecable. Obtenga asistencia comercial hoy mismo.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    to="/proposal"
                    className="px-5 py-2.5 bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider rounded hover:bg-neutral-100 transition whitespace-nowrap"
                  >
                    Generar Propuesta Comercial &rarr;
                  </Link>
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 bg-neutral-900 text-neutral-300 text-xs font-bold uppercase tracking-wider rounded border border-neutral-800 hover:text-white transition whitespace-nowrap"
                  >
                    Solicitar Disponibilidad
                  </Link>
                  <Link
                    to="/asset-discovery"
                    className="px-5 py-2.5 bg-neutral-900 text-neutral-300 text-xs font-bold uppercase tracking-wider rounded hover:text-white hover:bg-neutral-800 transition border border-neutral-800"
                  >
                    Volver a descubrimiento
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
