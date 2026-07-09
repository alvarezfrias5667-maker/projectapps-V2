import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Workflow, 
  CheckCircle, 
  Layers, 
  Sparkles, 
  FileCode,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  Briefcase,
  ShieldAlert,
  Info,
  Layers3,
  Calendar
} from "lucide-react";
import { generateProposal } from "../services/proposalGeneratorService";
import { ProposalInput, ProposalOutput } from "../data/proposalTemplates";

export default function ProposalPage() {
  const [formData, setFormData] = useState<ProposalInput>({
    recommendedAsset: "CertiRapid Platform",
    assetValueScore: 81,
    annualSavings: 15750,
    potentialRevenueGain: 21500,
    paybackPeriod: "3 meses",
    roiScore: 5.7,
    clientName: "Corporativo Nova S.A.",
    clientIndustry: "Servicios Financieros & FinTech"
  });

  const [proposalOutput, setProposalOutput] = useState<ProposalOutput | null>(null);

  useEffect(() => {
    setProposalOutput(generateProposal(formData));
  }, [formData]);

  const handleLoadTemplatePreset = (type: "certi" | "conversion" | "compliance" | "enterprise") => {
    if (type === "certi") {
      setFormData({
        recommendedAsset: "CertiRapid Platform™",
        assetValueScore: 81,
        annualSavings: 18900,
        potentialRevenueGain: 12600,
        paybackPeriod: "3 meses",
        roiScore: 4.8,
        clientName: "Inmobiliaria Futura SL",
        clientIndustry: "PropTech & Real Estate"
      });
    } else if (type === "conversion") {
      setFormData({
        recommendedAsset: "ConversionOS Pipeline™",
        assetValueScore: 92,
        annualSavings: 28800,
        potentialRevenueGain: 45000,
        paybackPeriod: "2 meses",
        roiScore: 11.5,
        clientName: "SaaS Retail Logistics",
        clientIndustry: "E-Commerce & Distribución"
      });
    } else if (type === "compliance") {
      setFormData({
        recommendedAsset: "ComplianceGuard Vault™",
        assetValueScore: 74,
        annualSavings: 18000,
        potentialRevenueGain: 28000,
        paybackPeriod: "6 meses",
        roiScore: 3.1,
        clientName: "MedHealth Diagnostics Group",
        clientIndustry: "Tecnología de la Salud (HealthTech)"
      });
    } else {
      setFormData({
        recommendedAsset: "Global Retail Suite™",
        assetValueScore: 88,
        annualSavings: 33600,
        potentialRevenueGain: 52000,
        paybackPeriod: "2 meses",
        roiScore: 9.0,
        clientName: "Grupo Multicomercios Global",
        clientIndustry: "Servicios Corporativos B2B"
      });
    }
  };

  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case "Proceed":
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded text-[11px] font-black uppercase tracking-wider">PROCEED™ (Proceder de Inmediato)</span>;
      case "Refine":
        return <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded text-[11px] font-black uppercase tracking-wider">REFINE™ (Optimizar alcance)</span>;
      default:
        return <span className="px-3 py-1 bg-neutral-100 text-neutral-800 border border-neutral-300 rounded text-[11px] font-black uppercase tracking-wider">HOLD™ (En espera técnica)</span>;
    }
  };

  return (
    <div id="proposal-page" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full mb-3">
          <FileText className="h-3.5 w-3.5" /> Proposal Generator™
        </span>
        <h1 id="proposal-title" className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-4">
          Generación de Propuestas Comerciales
        </h1>
        <p id="proposal-subtitle" className="text-lg text-neutral-500 max-w-2xl mx-auto font-light">
          Consolide la tracción detectada por los motores de ProjectApps™ en una propuesta ejecutiva formal pre-estructurada y calcule los entregables llave en mano.
        </p>
      </div>

      {/* Preset Pre-loaders */}
      <div className="mb-12">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block text-center mb-4">
          Pre-cargar Propuesta a partir de Motores Previos
        </span>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleLoadTemplatePreset("certi")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            CertiRapid (81 Score, Ready Asset)
          </button>
          <button
            onClick={() => handleLoadTemplatePreset("conversion")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            ConversionOS (92 Score, Growth Asset)
          </button>
          <button
            onClick={() => handleLoadTemplatePreset("compliance")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            ComplianceGuard (74 Score, Strategic Asset)
          </button>
          <button
            onClick={() => handleLoadTemplatePreset("enterprise")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            White Label Suite (88 Score)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column options inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-neutral-200 p-6 rounded-lg shadow-sm">
            <h2 className="text-sm font-bold text-neutral-900 mb-5 flex items-center gap-2 uppercase tracking-wide">
              <Workflow className="h-4 w-4" /> Datos Consolidados
            </h2>

            <div className="space-y-4">
              {/* Recommended Asset */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  Activo Comercial Recomendado
                </label>
                <input
                  type="text"
                  value={formData.recommendedAsset}
                  onChange={(e) => setFormData({ ...formData, recommendedAsset: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800 focus:outline-none focus:border-neutral-900"
                  placeholder="Ej: CertiRapid Platform"
                />
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  Nombre del Cliente / Empresa
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800 focus:outline-none focus:border-neutral-900"
                  placeholder="Ej: Banco Mercantil"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  Industria de Operación
                </label>
                <input
                  type="text"
                  value={formData.clientIndustry || ""}
                  onChange={(e) => setFormData({ ...formData, clientIndustry: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800 focus:outline-none focus:border-neutral-900"
                  placeholder="Ej: FinTech"
                />
              </div>

              <div className="border-t border-neutral-100 pt-3 grid grid-cols-2 gap-3">
                {/* Score */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Value Score
                  </label>
                  <input
                    type="number"
                    value={formData.assetValueScore}
                    onChange={(e) => setFormData({ ...formData, assetValueScore: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800 font-bold"
                  />
                </div>

                {/* ROI */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    ROI Score
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.roiScore}
                    onChange={(e) => setFormData({ ...formData, roiScore: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Savings */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Ahorro ($)
                  </label>
                  <input
                    type="number"
                    value={formData.annualSavings}
                    onChange={(e) => setFormData({ ...formData, annualSavings: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800"
                  />
                </div>

                {/* Profit */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Ganancia ($)
                  </label>
                  <input
                    type="number"
                    value={formData.potentialRevenueGain}
                    onChange={(e) => setFormData({ ...formData, potentialRevenueGain: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800"
                  />
                </div>
              </div>

              {/* Payback period */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  Retorno de Inversión (Payback)
                </label>
                <input
                  type="text"
                  value={formData.paybackPeriod}
                  onChange={(e) => setFormData({ ...formData, paybackPeriod: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800"
                  placeholder="Ej: 3 meses"
                />
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 text-neutral-100 p-5 rounded-lg border border-neutral-800">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Garantía del Activo</span>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Los activos digitales de <strong>ProjectApps™</strong> se entregan con control total corporativo, exentos de dependencias externas ocultas y listos para licenciamiento o propiedad absoluta de su IP.
            </p>
          </div>
        </div>

        {/* Right column generated proposal output */}
        <div className="lg:col-span-8 space-y-8">
          {proposalOutput && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Proposal document view */}
              <div id="proposal-output-panel" className="bg-white border border-neutral-200 rounded-lg p-10 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-900"></div>

                {/* Executive document header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-neutral-100 pb-8 mb-8">
                  <div>
                    <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">ProjectApps™ Executive Proposal</h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5 uppercase tracking-wider">Business Asset Commerce Platform™</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block tracking-wider">Document Code</span>
                    <span className="text-xs font-mono font-bold text-neutral-800 block">PA-PROP-{proposalOutput.recommendedAsset.toUpperCase().substring(0,4)}-2026</span>
                  </div>
                </div>

                {/* Sub title meta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-neutral-50/50 p-4 rounded border border-neutral-150">
                  <div>
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Dirigido a:</span>
                    <span className="text-xs font-bold text-neutral-800 block">{proposalOutput.clientName}</span>
                    <span className="text-[10px] text-neutral-500 font-light block">{formData.clientIndustry}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Activo Recomendado:</span>
                    <span className="text-xs font-black text-neutral-900 block">{proposalOutput.recommendedAsset}</span>
                    <span className="text-[10px] text-neutral-500 font-light block">Asset Value Score™: {proposalOutput.assetValueScore}/100</span>
                  </div>
                </div>

                {/* Sections 1 to 8 requirements */}
                <div className="space-y-8">
                  {/* Section 1 */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5 border-b border-neutral-150 pb-1">
                      <span className="w-5 h-5 bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-800 font-bold rounded">1</span> 
                      Situación Detectada
                    </h4>
                    <p className="text-sm font-light text-neutral-600 leading-relaxed">
                      {proposalOutput.sections.situacionDetectada}
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5 border-b border-neutral-150 pb-1">
                      <span className="w-5 h-5 bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-800 font-bold rounded">2</span> 
                      Problema Principal
                    </h4>
                    <p className="text-sm font-light text-neutral-600 leading-relaxed">
                      {proposalOutput.sections.problemaPrincipal}
                    </p>
                  </div>

                  {/* Section 3 */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5 border-b border-neutral-150 pb-1">
                      <span className="w-5 h-5 bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-800 font-bold rounded">3</span> 
                      Solución Recomendada
                    </h4>
                    <p className="text-sm font-medium text-neutral-800 leading-relaxed bg-neutral-50 p-4 rounded border-l-2 border-neutral-900">
                      {proposalOutput.sections.solucionRecomendada}
                    </p>
                  </div>

                  {/* Section 4 & 5 Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Section 4 */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5 border-b border-neutral-150 pb-1">
                        <span className="w-5 h-5 bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-800 font-bold rounded">4</span> 
                        Impacto Esperado
                      </h4>
                      <p className="text-xs font-light text-neutral-600 leading-relaxed">
                        {proposalOutput.sections.impactoEsperado}
                      </p>
                    </div>

                    {/* Section 5 */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5 border-b border-neutral-150 pb-1">
                        <span className="w-5 h-5 bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-800 font-bold rounded">5</span> 
                        ROI Estimado
                      </h4>
                      <p className="text-xs font-light text-neutral-600 leading-relaxed">
                        {proposalOutput.sections.roiEstimado}
                      </p>
                    </div>
                  </div>

                  {/* Section 6 & Investment Timeline */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5 border-b border-neutral-150 pb-1">
                      <span className="w-5 h-5 bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-800 font-bold rounded">6</span> 
                      Timeline de Implementación
                    </h4>
                    <div className="flex items-center gap-3 bg-neutral-50 p-4 rounded border border-neutral-200">
                      <Calendar className="h-5 w-5 text-neutral-700 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-neutral-800 block">Tiempo estimado: {proposalOutput.implementationTimeline}</span>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5">{proposalOutput.sections.timelineImplementacion}</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 7 - Deliverables list */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5 border-b border-neutral-150 pb-1">
                      <span className="w-5 h-5 bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-800 font-bold rounded">7</span> 
                      Entregables Incluidos (Deliverables™)
                    </h4>
                    <ul className="space-y-2 mt-3">
                      {proposalOutput.sections.entregables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-light text-neutral-600">
                          <CheckCircle className="h-4 w-4 text-neutral-800 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 8 - Executive Recommendation */}
                  <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                      <span className="w-5 h-5 bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold rounded">8</span> 
                      Recomendación Ejecutiva (Executive Recommendation™)
                    </h4>
                    <div className="mb-3">
                      {getRecommendationBadge(proposalOutput.recommendation)}
                    </div>
                    <p className="text-xs text-neutral-600 italic font-light leading-relaxed">
                      "{proposalOutput.sections.recomendacionEjecutiva}"
                    </p>
                  </div>
                </div>

                {/* Investment summary card footer */}
                <div className="mt-10 border-t border-dashed border-neutral-200 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-500 font-light">
                  <div>
                    <span className="font-bold text-neutral-800 block mb-1">Esquema de Inversión</span>
                    <p>Inversión única estimada de desarrollo: <strong className="text-neutral-900">${proposalOutput.investmentSummary.estimatedImplementationCost.toLocaleString()} USD</strong></p>
                    <p className="mt-1">Esquema legal: <span className="text-neutral-900">{proposalOutput.investmentSummary.termType}</span></p>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-800 block mb-1">Mantenimiento & Garantía</span>
                    <p>{proposalOutput.investmentSummary.ongoingMaintenanceValue}</p>
                  </div>
                </div>
              </div>

              {/* JSON representation (REGLAS: El resultado debe mostrarse también como JSON.) */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-lg">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <FileCode className="h-4 w-4" /> JSON de la Propuesta (Deterministic Format)
                </span>
                <pre id="proposal-json" className="bg-neutral-900 text-neutral-100 p-4 rounded text-xs overflow-x-auto font-mono leading-relaxed">
                  {JSON.stringify({
                    recommendedAsset: proposalOutput.recommendedAsset,
                    assetValueScore: proposalOutput.assetValueScore,
                    annualSavings: proposalOutput.annualSavings,
                    potentialRevenueGain: proposalOutput.potentialRevenueGain,
                    paybackPeriod: proposalOutput.paybackPeriod,
                    roiScore: proposalOutput.roiScore,
                    implementationTimeline: proposalOutput.implementationTimeline,
                    recommendation: proposalOutput.recommendation
                  }, null, 2)}
                </pre>
              </div>

              {/* Navigation Back / Next CTAs */}
              <div className="flex flex-wrap gap-4 items-center justify-between pb-10">
                <Link
                  to="/roi-impact"
                  className="px-5 py-2.5 bg-neutral-100 text-neutral-800 hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider rounded transition"
                >
                  &larr; Volver a Cálculo ROI
                </Link>

                <Link
                  to="/pricing-packaging"
                  className="px-6 py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider rounded transition flex items-center gap-1.5"
                >
                  Diseñar Empaquetamiento Comercial &rarr;
                </Link>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
