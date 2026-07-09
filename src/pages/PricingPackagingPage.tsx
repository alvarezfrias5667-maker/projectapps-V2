import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  HelpCircle, 
  Check, 
  Settings, 
  Layers, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  FileCode,
  ArrowRight,
  TrendingUp,
  Sliders,
  ChevronRight,
  Sparkles,
  Bookmark
} from "lucide-react";
import { determinePricingPackage } from "../services/pricingPackagingService";
import { PricingPackageInput, PricingPackageResult } from "../data/pricingPackages";

export default function PricingPackagingPage() {
  const [formData, setFormData] = useState<PricingPackageInput>({
    recommendedAsset: "CertiRapid Platform™",
    assetValueScore: 81,
    roiScore: 5.7,
    implementationTimeline: "10-15 días",
    recommendation: "Proceed"
  });

  const [packageResult, setPackageResult] = useState<PricingPackageResult | null>(null);

  useEffect(() => {
    setPackageResult(determinePricingPackage(formData));
  }, [formData]);

  const handleLoadPreset = (type: "certi" | "conversion" | "compliance" | "enterprise") => {
    if (type === "certi") {
      setFormData({
        recommendedAsset: "CertiRapid Platform™",
        assetValueScore: 81,
        roiScore: 5.7,
        implementationTimeline: "7-14 días",
        recommendation: "Proceed"
      });
    } else if (type === "conversion") {
      setFormData({
        recommendedAsset: "ConversionOS Pipeline™",
        assetValueScore: 92,
        roiScore: 11.5,
        implementationTimeline: "4-6 semanas",
        recommendation: "Proceed"
      });
    } else if (type === "compliance") {
      setFormData({
        recommendedAsset: "ComplianceGuard Vault™",
        assetValueScore: 74,
        roiScore: 3.1,
        implementationTimeline: "6-12 semanas",
        recommendation: "Refine"
      });
    } else {
      setFormData({
        recommendedAsset: "Global Retail Suite™",
        assetValueScore: 88,
        roiScore: 9.0,
        implementationTimeline: "4-8 semanas",
        recommendation: "Proceed"
      });
    }
  };

  return (
    <div id="pricing-packaging-page" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full mb-3">
          <Settings className="h-3 w-3" /> Pricing & Packaging Engine™
        </span>
        <h1 id="engine-title" className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-4">
          Diseño de Empaquetamiento y Modalidad Comercial
        </h1>
        <p id="engine-subtitle" className="text-lg text-neutral-500 max-w-2xl mx-auto font-light">
          Analice la oportunidad de negocio y determine la modalidad óptima de licenciamiento, soporte y nivel de inversión acorde al valor del activo.
        </p>
      </div>

      {/* Preset Pre-loaders */}
      <div className="mb-12">
        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block text-center mb-4">
          Cargar Tracción Consolidada de Motores Anteriores
        </span>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleLoadPreset("certi")}
            className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition shadow-sm"
          >
            CertiRapid™ (Value score: 81 / ROI: 5.7)
          </button>
          <button
            onClick={() => handleLoadPreset("conversion")}
            className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition shadow-sm"
          >
            ConversionOS™ (Value score: 92 / ROI: 11.5)
          </button>
          <button
            onClick={() => handleLoadPreset("compliance")}
            className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition shadow-sm"
          >
            ComplianceGuard™ (Value score: 74 / ROI: 3.1)
          </button>
          <button
            onClick={() => handleLoadPreset("enterprise")}
            className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition shadow-sm"
          >
            Global Retail Suite™ (Value score: 88 / ROI: 9.0)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Input panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-neutral-200 p-6 rounded-lg shadow-xs">
            <h2 className="text-sm font-bold text-neutral-900 mb-5 flex items-center gap-2 uppercase tracking-wide">
              <Sliders className="h-4 w-4" /> Parámetros de Entrada
            </h2>

            <div className="space-y-5">
              {/* Recommended Asset name */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Activo Comercial Evaluado
                </label>
                <input
                  type="text"
                  value={formData.recommendedAsset}
                  onChange={(e) => setFormData({ ...formData, recommendedAsset: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800 focus:outline-none focus:border-neutral-900"
                  placeholder="Ej: CertiRapid Platform"
                />
              </div>

              {/* Asset Value Score input with slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Asset Value Score™
                  </label>
                  <span className="text-xs font-bold text-neutral-800">{formData.assetValueScore}/100</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.assetValueScore}
                  onChange={(e) => setFormData({ ...formData, assetValueScore: parseInt(e.target.value) || 1 })}
                  className="w-full h-1.5 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                />
              </div>

              {/* ROI Score input with slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    ROI Score (Multiplicador)
                  </label>
                  <span className="text-xs font-bold text-neutral-800">{formData.roiScore}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="15"
                  step="0.1"
                  value={formData.roiScore}
                  onChange={(e) => setFormData({ ...formData, roiScore: parseFloat(e.target.value) || 0.5 })}
                  className="w-full h-1.5 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                />
              </div>

              {/* Implementation timeline input */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Timeline de Implementación Estimado
                </label>
                <input
                  type="text"
                  value={formData.implementationTimeline}
                  onChange={(e) => setFormData({ ...formData, implementationTimeline: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800 focus:outline-none focus:border-neutral-900"
                  placeholder="Ej: 7-14 días"
                />
              </div>

              {/* Recommendation Executive Selection */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Recomendación Ejecutiva
                </label>
                <select
                  value={formData.recommendation}
                  onChange={(e) => setFormData({ ...formData, recommendation: e.target.value as "Proceed" | "Hold" | "Refine" })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-800 bg-white focus:outline-none focus:border-neutral-900"
                >
                  <option value="Proceed">Proceed (Proceder)</option>
                  <option value="Refine">Refine (Ajustar Alcance)</option>
                  <option value="Hold">Hold (En Espera)</option>
                </select>
              </div>

            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-lg text-neutral-600">
            <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest block mb-2 flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5" /> Determinación de Modalidad
            </span>
            <p className="text-xs font-light leading-relaxed">
              El motor de clasificación mapea variables operativas agregando políticas del licenciatario para aislar entregables de primer nivel.
            </p>
          </div>
        </div>

        {/* Right Output panel */}
        <div className="lg:col-span-8 space-y-8">
          {packageResult && (
            <div className="space-y-8 animate-fade-in">
              {/* Packaging Sheet Presentation */}
              <div id="pricing-output-panel" className="bg-white border border-neutral-200 rounded-lg p-8 md:p-10 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-900"></div>

                {/* Packaging Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-neutral-100 pb-8 mb-8">
                  <div>
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Modalidad Comercial Sugerida</span>
                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight mt-1">{packageResult.packageType}</h2>
                    <p className="text-xs text-neutral-500 font-light mt-1 max-w-md">{packageResult.description}</p>
                  </div>
                  <div className="bg-neutral-900 text-neutral-100 px-5 py-3 rounded text-center shrink-0">
                    <span className="text-[9px] font-bold text-neutral-400 uppercase block tracking-wider">Inversión Estimada</span>
                    <span className="text-base font-extrabold block text-white mt-0.5">{packageResult.estimatedInvestment}</span>
                  </div>
                </div>

                {/* Key specs Grid */}
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-4">Ficha de Implementación</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="border border-neutral-150 p-4 rounded bg-neutral-50/50">
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Modelo de Entrega</span>
                    <span className="text-xs font-bold text-neutral-800 block mt-0.5">{packageResult.deliveryModel}</span>
                  </div>
                  <div className="border border-neutral-150 p-4 rounded bg-neutral-50/50">
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Nivel de Implementación</span>
                    <span className="text-xs font-bold text-neutral-800 block mt-0.5">{packageResult.implementationLevel}</span>
                  </div>
                  <div className="border border-neutral-150 p-4 rounded bg-neutral-50/50">
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Nivel de Soporte Tecnológico</span>
                    <span className="text-xs font-bold text-neutral-800 block mt-0.5">{packageResult.supportLevel}</span>
                  </div>
                  <div className="border border-neutral-150 p-4 rounded bg-neutral-50/50">
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Esquema / Tipo de Licencia</span>
                    <span className="text-xs font-bold text-neutral-800 block mt-0.5">{packageResult.licenseType}</span>
                  </div>
                </div>

                {/* Timeline & Active Asset */}
                <div className="bg-neutral-50 p-4 rounded border border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-neutral-600 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase block tracking-wider">Tiempo de Entrega</span>
                      <span className="text-xs font-bold text-neutral-900 block">{packageResult.timeline}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-neutral-600 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase block tracking-wider">Activo Estacionado</span>
                      <span className="text-xs font-bold text-neutral-900 block">{formData.recommendedAsset}</span>
                    </div>
                  </div>
                </div>

                {/* Included Items Section */}
                <div className="border-t border-neutral-100 pt-6">
                  <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" /> Componentes & Entregables Incluidos en {packageResult.packageType}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {packageResult.includedItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-neutral-50 p-3 rounded border border-neutral-150">
                        <span className="w-5 h-5 bg-neutral-900 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-neutral-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* JSON code blocks displaying Packaging representation */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-lg">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <FileCode className="h-4 w-4" /> JSON Final del Packaging (Packaging JSON)
                </span>
                <pre id="packaging-json" className="bg-neutral-900 text-neutral-100 p-4 rounded text-xs overflow-x-auto font-mono leading-relaxed">
                  {JSON.stringify({
                    packageType: packageResult.packageType,
                    deliveryModel: packageResult.deliveryModel,
                    implementationLevel: packageResult.implementationLevel,
                    supportLevel: packageResult.supportLevel,
                    licenseType: packageResult.licenseType,
                    estimatedInvestment: packageResult.estimatedInvestment,
                    timeline: packageResult.timeline,
                    includedItems: packageResult.includedItems
                  }, null, 2)}
                </pre>
              </div>

              {/* CTAs and back references */}
              <div className="flex flex-wrap gap-4 items-center justify-between pb-10">
                <Link
                  to="/proposal"
                  className="px-5 py-2.5 bg-neutral-100 text-neutral-800 hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider rounded transition"
                >
                  &larr; Volver a Propuesta
                </Link>

                <Link
                  to="/delivery"
                  className="px-6 py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider rounded transition flex items-center gap-1.5 shrink-0 animate-pulse"
                >
                  Diseñar Protocolo de Entrega &rarr;
                </Link>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
