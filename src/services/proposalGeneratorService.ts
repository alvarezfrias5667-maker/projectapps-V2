import { ProposalInput, ProposalOutput, DETERMINISTIC_TEMPLATES } from "../data/proposalTemplates";

export function generateProposal(input: ProposalInput): ProposalOutput {
  const assetScore = input.assetValueScore;
  const clientName = input.clientName || "Cliente Corporativo";
  const industry = input.clientIndustry || "General Business";

  // Guess the sub-category of the opportunity based on recommended asset name or score
  let detectedType: "Ready Revenue Asset" | "Growth Asset" | "Strategic Asset" | "Enterprise White Label" = "Ready Revenue Asset";
  
  const assetNameLower = input.recommendedAsset.toLowerCase();
  if (assetNameLower.includes("white") || assetNameLower.includes("label") || assetNameLower.includes("empresa")) {
    detectedType = "Enterprise White Label";
  } else if (assetNameLower.includes("compliance") || assetNameLower.includes("guard") || assetNameLower.includes("strategic") || assetScore < 75) {
    detectedType = "Strategic Asset";
  } else if (assetNameLower.includes("conversion") || assetNameLower.includes("growth") || assetScore >= 90) {
    detectedType = "Growth Asset";
  } else {
    detectedType = "Ready Revenue Asset";
  }

  const template = DETERMINISTIC_TEMPLATES[detectedType];

  // Logic to determine executive recommendation
  let execRec: "Proceed" | "Hold" | "Refine" = "Hold";
  if (assetScore >= 75 && input.roiScore >= 3.0) {
    execRec = "Proceed";
  } else if (assetScore >= 55 && input.roiScore >= 1.5) {
    execRec = "Refine";
  }

  // Cost estimates
  let estCost = 6500;
  if (detectedType === "Strategic Asset") {
    estCost = 15000;
  } else if (detectedType === "Enterprise White Label") {
    estCost = 9500;
  } else if (detectedType === "Growth Asset") {
    estCost = 5000;
  } else {
    estCost = 3000;
  }

  // Generate dynamic sections based on data
  const situacionDetectada = `A preliminary analysis of operational workflows has been completed for ${clientName} within the ${industry} sector. An outstanding technical opportunity was identified to monetize or automate the manual process through the immediate deployment of the digital asset "${input.recommendedAsset}".`;

  const problemaPrincipal = `The manual, repetitive, and centralized execution of the process generates critical inefficiencies that limit commercial scalability. This produces unnecessary operational delays, raising direct hourly/man labor costs and causing potential estimated revenue losses due to delivery delays facing end clients.`;

  const solucionRecomendada = `Deploy the "${input.recommendedAsset}" digital asset under the "${detectedType}" commercial category. This will resolve the inefficiency through top-tier standardized software developed by ProjectApps™, reducing dependence on manual processes to zero and enabling an agile operational foundation ready to be licensed or corporate resold.`;

  const impactoEsperado = `By automating this opportunity, ${clientName} will achieve an estimated direct annual savings of $${input.annualSavings.toLocaleString()} USD by eliminating engineering downtime or manual administration. Additionally, it is projected to open new customer acquisition channels with a potential revenue impact of up to $${input.potentialRevenueGain.toLocaleString()} USD annually.`;

  const roiEstimado = `The capital invested in the asset delivers an outstanding economic return with an approximate payback period of ${input.paybackPeriod}. This represents an estimated ROI impact multiplier of ${input.roiScore}x, positioning this asset as one of maximum technical profitability and minimal operational friction.`;

  const timelineImplementacion = `Implementation will be carried out sequentially within an estimated timeframe of ${template.timeline}. This includes visual identity customization, gateway provisioning, and technical compatibility testing.`;

  const recomendacionEjecutiva = execRec === "Proceed"
    ? `RESOLUTION: Proceed immediately (Proceed). The strength of the Asset Value Score™ of ${assetScore}/100 and the calculated financial return justify high-urgency development with immediate go-to-market.`
    : execRec === "Refine"
      ? `RESOLUTION: Refine and calibrate scope (Refine). It is suggested to optimize the asset architecture or trim the initial features to accelerate the return and maximize the estimated payback.`
      : `RESOLUTION: Technical Hold (Hold). It is suggested to prioritize other assets from the ProjectApps™ platform with lower technical implementation friction or higher organic immediate sales volume.`;

  return {
    recommendedAsset: input.recommendedAsset,
    clientName,
    assetValueScore: assetScore,
    annualSavings: input.annualSavings,
    potentialRevenueGain: input.potentialRevenueGain,
    paybackPeriod: input.paybackPeriod,
    roiScore: input.roiScore,
    implementationTimeline: template.timeline,
    recommendation: execRec,
    sections: {
      situacionDetectada,
      problemaPrincipal,
      solucionRecomendada,
      impactoEsperado,
      roiEstimado,
      timelineImplementacion,
      entregables: template.deliverables,
      recomendacionEjecutiva
    },
    investmentSummary: {
      estimatedImplementationCost: estCost,
      ongoingMaintenanceValue: template.maintenance,
      termType: detectedType === "Strategic Asset" ? "Full perpetual IP acquisition" : "Corporate commercial licensing"
    }
  };
}
