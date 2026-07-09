import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  Workflow, 
  Dna, 
  Info, 
  TrendingUp, 
  BarChart4, 
  FileCode 
} from "lucide-react";
import { IntelligenceInput, IntelligenceResult } from "../data/intelligenceRules";
import { evaluateAssetIntelligence } from "../services/assetIntelligenceService";

export default function AssetIntelligencePage() {
  const [formData, setFormData] = useState<IntelligenceInput>({
    opportunityType: "Ready Revenue Asset",
    problemDetected: "Manual generation of regulatory certificates and licenses",
    potentialValue: "High",
    implementationComplexity: "Medium"
  });

  const [evaluation, setEvaluation] = useState<IntelligenceResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);

    setTimeout(() => {
      const result = evaluateAssetIntelligence(formData);
      setEvaluation(result);
      setIsEvaluating(false);
    }, 750);
  };

  const handleLoadSample = (type: "Ready Revenue Asset" | "Growth Asset" | "Strategic Asset" | "Enterprise White Label") => {
    let sample: IntelligenceInput = {
      opportunityType: "Ready Revenue Asset",
      problemDetected: "Manual generation of commercial certificates and licenses",
      potentialValue: "High",
      implementationComplexity: "Medium"
    };

    if (type === "Strategic Asset") {
      sample = {
        opportunityType: "Strategic Asset",
        problemDetected: "Intellectual property risks and lack of immutable digital signatures",
        potentialValue: "Critical",
        implementationComplexity: "High"
      };
    } else if (type === "Growth Asset") {
      sample = {
        opportunityType: "Growth Asset",
        problemDetected: "High losses and leaks in massive conversion funnels",
        potentialValue: "Very High",
        implementationComplexity: "Low"
      };
    } else if (type === "Enterprise White Label") {
      sample = {
        opportunityType: "Enterprise White Label",
        problemDetected: "Corporate need to offer proprietary software without engineering costs",
        potentialValue: "Very High",
        implementationComplexity: "Medium"
      };
    }

    setFormData(sample);
    // Instant update
    const result = evaluateAssetIntelligence(sample);
    setEvaluation(result);
  };

  // Get color badges
  const getRecommendationColor = (rec: string) => {
    if (rec.includes("Immediately")) return "bg-emerald-100 text-emerald-900 border-emerald-300";
    if (rec.includes("Strong")) return "bg-teal-100 text-teal-900 border-teal-300";
    if (rec.includes("Validate")) return "bg-amber-100 text-amber-900 border-amber-300";
    return "bg-neutral-100 text-neutral-800 border-neutral-300";
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-700";
    if (score >= 75) return "text-teal-700";
    if (score >= 60) return "text-amber-700";
    return "text-neutral-500";
  };

  return (
    <div id="asset-intelligence-page" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full mb-3">
          <Cpu className="h-3.5 w-3.5" /> Asset Intelligence Engine™
        </span>
        <h1 id="intelligence-title" className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-4">
          Evaluation of Digital Opportunities
        </h1>
        <p id="intelligence-subtitle" className="text-lg text-neutral-500 max-w-2xl mx-auto font-light">
          Is this opportunity worth building? Evaluate development viability, competitiveness, and return on your assets under the sequential logic of ProjectApps™.
        </p>
      </div>

      {/* Preset Pre-loaders */}
      <div className="mb-12">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block text-center mb-4">
          Pre-load Examples of Existing Opportunities
        </span>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleLoadSample("Ready Revenue Asset")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            CertiRapid Platform (Ready Asset)
          </button>
          <button
            onClick={() => handleLoadSample("Growth Asset")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            ConversionOS Pipeline (Growth Asset)
          </button>
          <button
            onClick={() => handleLoadSample("Strategic Asset")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            ComplianceGuard Vault (Strategic Asset)
          </button>
          <button
            onClick={() => handleLoadSample("Enterprise White Label")}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded border border-neutral-200 transition"
          >
            Enterprise White Label
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form panel */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 p-8 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Workflow className="h-5 w-5 text-neutral-800" /> Viability Parameters
          </h2>

          <form onSubmit={handleEvaluate} className="space-y-6">
            {/* Asset Type */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Commercial Category of the Asset
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

            {/* Problem description */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Identified Operational Problem
              </label>
              <input
                type="text"
                value={formData.problemDetected}
                onChange={(e) => setFormData({ ...formData, problemDetected: e.target.value })}
                required
                placeholder="e.g., Manual generation of regulatory certificates"
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              />
            </div>

            {/* Potential Value */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Value and Urgency for the Customer
              </label>
              <select
                value={formData.potentialValue}
                onChange={(e) => setFormData({ ...formData, potentialValue: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              >
                <option value="High">High Value (Standard optimization)</option>
                <option value="Very High">Very High Value (Sovereignty and scalability)</option>
                <option value="Critical">Critical (Risk of fine or revenue loss)</option>
              </select>
            </div>

            {/* Implementation Complexity */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Technical Construction Complexity
              </label>
              <select
                value={formData.implementationComplexity}
                onChange={(e) => setFormData({ ...formData, implementationComplexity: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 transition"
              >
                <option value="Low">Low (Blueprint or light script)</option>
                <option value="Medium">Medium (Application with standard data gateway)</option>
                <option value="High">High (Cryptographic encryption or sophisticated IP)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isEvaluating}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 rounded transition disabled:opacity-55"
            >
              {isEvaluating ? "Calculating Factors..." : "Calculate Asset Value Score™"}
            </button>
          </form>
        </div>

        {/* Results display panel */}
        <div className="lg:col-span-7 space-y-6">
          {evaluation ? (
            <div className="space-y-6 animate-fade-in">
              {/* Asset Score Diagnostic Card */}
              <div id="intelligence-output" className="bg-white border border-neutral-200 rounded-lg p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Technical Viability Score</h3>
                    <p className="text-xs text-neutral-500 font-light mt-0.5">Calculated under deterministic rules based on the DNA of ProjectApps™</p>
                  </div>
                  <div className="flex items-baseline gap-1 bg-neutral-50 border border-neutral-100 px-4 py-2 rounded">
                    <span className={`text-4xl font-black ${scoreColor(evaluation.assetValueScore)}`}>
                      {evaluation.assetValueScore}
                    </span>
                    <span className="text-xs text-neutral-400 font-bold">/100</span>
                  </div>
                </div>

                {/* Score progress meters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 bg-neutral-50/50 p-6 rounded-lg border border-neutral-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Recommendation</span>
                    <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${getRecommendationColor(evaluation.buildRecommendation)}`}>
                      {evaluation.buildRecommendation}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Market Fit</span>
                    <span className="text-sm font-black text-neutral-950 uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-neutral-800" /> {evaluation.marketFit}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Revenue Potential</span>
                    <span className="text-sm font-black text-neutral-950 uppercase tracking-wider flex items-center gap-1">
                      <BarChart4 className="h-4 w-4 text-neutral-800" /> {evaluation.revenuePotential}
                    </span>
                  </div>
                </div>

                {/* Specific ranges breakdown */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">Specific Scores</h4>
                  
                  <div className="space-y-3">
                    {/* Demand */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-neutral-700 mb-1">
                        <span>Demand Score</span>
                        <span>{evaluation.breakdown.demandScore} / 25</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="bg-neutral-800 h-full rounded-full" style={{ width: `${(evaluation.breakdown.demandScore / 25) * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Revenue potential */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-neutral-700 mb-1">
                        <span>Revenue Potential</span>
                        <span>{evaluation.breakdown.revenuePotentialScore} / 25</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="bg-neutral-800 h-full rounded-full" style={{ width: `${(evaluation.breakdown.revenuePotentialScore / 25) * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Reusability */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-neutral-700 mb-1">
                        <span>Reusability Score</span>
                        <span>{evaluation.breakdown.reusabilityScore} / 20</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="bg-neutral-800 h-full rounded-full" style={{ width: `${(evaluation.breakdown.reusabilityScore / 20) * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Competition */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-neutral-700 mb-1">
                        <span>Competition Score</span>
                        <span>{evaluation.breakdown.competitionScore} / 15</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="bg-neutral-800 h-full rounded-full" style={{ width: `${(evaluation.breakdown.competitionScore / 15) * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Complexity */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-neutral-700 mb-1">
                        <span>Complexity Score (Technical viability)</span>
                        <span>{evaluation.breakdown.complexityScore} / 15</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="bg-neutral-800 h-full rounded-full" style={{ width: `${(evaluation.breakdown.complexityScore / 15) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Dynamic Reason */}
                <div className="p-4 bg-neutral-50 rounded border border-neutral-200 flex items-start gap-3">
                  <Info className="h-5 w-5 text-neutral-800 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">Commercial Intelligence Verdict:</h5>
                    <p className="text-xs text-neutral-600 mt-1 font-light leading-relaxed">{evaluation.shortReason}</p>
                  </div>
                </div>
              </div>

              {/* JSON representation (SALIDA REQUIREMENT) */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-lg">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <FileCode className="h-4 w-4" /> Integrated Output JSON
                </span>
                <pre id="json-intelligence" className="bg-neutral-900 text-neutral-100 p-4 rounded text-xs overflow-x-auto font-mono leading-relaxed">
                  {JSON.stringify({
                    assetValueScore: evaluation.assetValueScore,
                    buildRecommendation: evaluation.buildRecommendation,
                    marketFit: evaluation.marketFit,
                    revenuePotential: evaluation.revenuePotential,
                    complexity: evaluation.complexity,
                    shortReason: evaluation.shortReason
                  }, null, 2)}
                </pre>
              </div>

              {/* CTA */}
              <div className="bg-neutral-950 p-6 rounded-lg text-white flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="text-sm font-bold">Ready to calculate the financial impact?</h4>
                  <p className="text-xs text-neutral-400 mt-1 font-light">Interactively calculate the ROI and payback of the evaluated opportunity.</p>
                </div>
                <div className="flex gap-2.5 shrink-0">
                  <Link
                    to="/roi-impact"
                    className="px-5 py-2.5 bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider rounded hover:bg-neutral-100 transition whitespace-nowrap text-center"
                  >
                    Calculate ROI & Impact &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-neutral-300 rounded-lg p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-400 mb-4 shadow-sm">
                <Dna className="h-6 w-6 animate-pulse" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1">Awaiting Evaluation</h3>
              <p className="text-xs text-neutral-500 max-w-sm font-light leading-relaxed">
                Configure the parameters on the left or pre-load one of our model scenarios to calculate the <strong>Asset Value Score™</strong> of your digital opportunity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
