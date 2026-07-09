import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Compass, 
  HelpCircle, 
  Layers, 
  FolderSync, 
  Flame, 
  CheckCircle, 
  Sparkles, 
  FileCode,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { discoverAsset } from "../services/assetDiscoveryService";
import { DiscoveryInput, DiscoveredAsset } from "../data/discoveryRules";

export default function AssetDiscoveryPage() {
  const [formData, setFormData] = useState<DiscoveryInput>({
    industry: "tecnologia",
    businessType: "B2B SaaS / Servicios",
    recurringProblem: "manual_doc",
    mainGoal: "automatizar",
    inefficientProcess: "",
    currentTools: ""
  });

  const [discoveredAsset, setDiscoveredAsset] = useState<DiscoveredAsset | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate short computation delay for visual feeling
    setTimeout(() => {
      const result = discoverAsset(formData);
      setDiscoveredAsset(result);
      setIsAnalyzing(false);
    }, 850);
  };

  const handleReset = () => {
    setDiscoveredAsset(null);
    setFormData({
      industry: "tecnologia",
      businessType: "B2B SaaS / Servicios",
      recurringProblem: "manual_doc",
      mainGoal: "automatizar",
      inefficientProcess: "",
      currentTools: ""
    });
  };

  return (
    <div id="asset-discovery-page" className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full mb-3">
          <Compass className="h-3 w-3" /> Asset Discovery Engine™
        </span>
        <h1 id="discovery-title" className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-4">
          Defina Nuevas Oportunidades Digitales
        </h1>
        <p id="discovery-subtitle" className="text-lg text-neutral-500 max-w-2xl mx-auto font-light">
          ¿Qué activo digital inexistente o nuevo debería nacer para su modelo de negocio? Responda el diagnóstico y deduzca un Listo Listo Listo Ready Revenue Asset™ viable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form panel */}
        <div className="lg:col-span-6 bg-white border border-neutral-200 p-8 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Layers className="h-5 w-5 text-neutral-800" /> Diagnóstico de Vacíos Operativos
          </h2>

          <form onSubmit={handleAnalyze} className="space-y-6">
            {/* Industry */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Industria / Vertical Comercial
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              >
                <option value="tecnologia">Tecnología y Software</option>
                <option value="finanzas">Finanzas y Seguros</option>
                <option value="ecommerce">Ecommerce y Retail</option>
                <option value="servicios">Servicios Consultivos / B2B</option>
                <option value="manufactura">Manufactura e Industrial</option>
                <option value="salud">Salud y Biotecnología</option>
              </select>
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Modelo de Negocio Actual
              </label>
              <input
                type="text"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                placeholder="Por ejemplo: B2B SaaS, Distribuidora Física, etc."
                required
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              />
            </div>

            {/* Recurring Problem */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Cuello de Botella Recurrente
              </label>
              <select
                value={formData.recurringProblem}
                onChange={(e) => setFormData({ ...formData, recurringProblem: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              >
                <option value="manual_doc">Emisión manual de reportes o certificados</option>
                <option value="baja_conversion">Pérdida de leads en el embudo transaccional</option>
                <option value="seguridad_gap">Riesgos regulatorios y auditorías tardías</option>
                <option value="costos_infra">Servidores lentos o infraestructuras costosas</option>
                <option value="procesos_rep">Pérdida de horas en copy-paste de datos</option>
              </select>
            </div>

            {/* Main Goal */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Objetivo Estratégico Principal
              </label>
              <select
                value={formData.mainGoal}
                onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              >
                <option value="automatizar">Automatización completa de tareas repetitivas</option>
                <option value="aumentar_ventas">Aumentar la conversión de leads / Visibilidad</option>
                <option value="cumplimiento">Asegurar cumplimiento legal y certificaciones</option>
                <option value="reducir_costos">Reducir costos de servidores y código</option>
              </select>
            </div>

            {/* Inefficient Process Description */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Proceso Más Ineficiente (Describa la tarea manual)
              </label>
              <textarea
                value={formData.inefficientProcess}
                onChange={(e) => setFormData({ ...formData, inefficientProcess: e.target.value })}
                placeholder="Ejemplo: 'Generamos reportes PDF de forma manual uno a uno cada lunes tardando 4 horas...'"
                rows={3}
                required
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              />
            </div>

            {/* Current Tools */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Herramientas Utilizadas Actualmente
              </label>
              <input
                type="text"
                value={formData.currentTools}
                onChange={(e) => setFormData({ ...formData, currentTools: e.target.value })}
                placeholder="Ejemplo: Planillas de Excel, WhatsApp manual, Gmail..."
                required
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 rounded transition disabled:opacity-55"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Analizando Patrones de Negocio...
                </>
              ) : (
                <>
                  Descubrir Activo Viable <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-6 space-y-6">
          {discoveredAsset ? (
            <div className="space-y-6">
              {/* Asset Discovery Card */}
              <div id="discovery-output-card" className="bg-neutral-950 text-white p-8 rounded-lg border border-neutral-800 shadow-md">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-white text-neutral-950 rounded">
                    ¡ACTIVO NUEVO RECOMENDADO!
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">ID: {Math.floor(Math.random() * 9000 + 1000)}</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-white mb-1">
                      {discoveredAsset.opportunityName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                        Capa: {discoveredAsset.opportunityType}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                        Complejidad: {discoveredAsset.implementationComplexity}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                        Valor de Mercado: {discoveredAsset.potentialValue}
                      </span>
                    </div>
                  </div>

                  <hr className="border-neutral-800" />

                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                      Problema Operativo Detectado:
                    </span>
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">
                      {discoveredAsset.problemDetected}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                      Descripción de la Solución de Comercio:
                    </span>
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">
                      {discoveredAsset.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider rounded hover:bg-neutral-100 transition"
                    >
                      Solicitar Fabricación / WhiteLabel de este Activo
                    </Link>
                  </div>
                </div>
              </div>

              {/* JSON Payload representation according to structural guidance (SALIDA) */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                    <FileCode className="h-4 w-4" /> Estructura JSON Oficial
                  </span>
                  <span className="text-[9px] uppercase tracking-wider bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded font-mono">
                    Output Payloads
                  </span>
                </div>
                <pre id="json-representation" className="bg-neutral-900 text-neutral-100 p-4 rounded text-xs overflow-x-auto font-mono leading-relaxed">
                  {JSON.stringify({
                    opportunityName: discoveredAsset.opportunityName,
                    opportunityType: discoveredAsset.opportunityType,
                    problemDetected: discoveredAsset.problemDetected,
                    potentialValue: discoveredAsset.potentialValue,
                    implementationComplexity: discoveredAsset.implementationComplexity,
                    shortDescription: discoveredAsset.shortDescription
                  }, null, 2)}
                </pre>
              </div>

              {/* Reset action */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-950 transition"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Re-evaluar otro escenario
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-neutral-300 rounded-lg p-12 text-center flex flex-col items-center justify-center h-full min-h-[350px]">
              <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-400 mb-4 shadow-sm">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1">Resultado de Descubrimiento Pendiente</h3>
              <p className="text-xs text-neutral-500 max-w-sm font-light">
                Complete el formulario de la izquierda con los problemas y procesos repetitivos de su organización para deducir una oportunidad de activo empresarial.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
