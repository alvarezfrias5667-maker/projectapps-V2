import { IntelligenceInput, IntelligenceResult } from "../data/intelligenceRules";

export function evaluateAssetIntelligence(input: IntelligenceInput): IntelligenceResult {
  // Let's implement the specific ranges of parameters requested:
  // Demand Score: 0-25
  // Revenue Potential: 0-25
  // Reusability: 0-20
  // Competition: 0-15
  // Complexity: 0-15
  // Total: 0-100

  // 1. Demand Score (0-25)
  let demandScore = 15;
  if (input.potentialValue === "Critical") {
    demandScore = 25;
  } else if (input.potentialValue === "Very High") {
    demandScore = 22;
  } else if (input.potentialValue === "High") {
    demandScore = 18;
  }

  // 2. Revenue Potential (0-25)
  let revenueScore = 15;
  if (input.opportunityType === "Enterprise White Label") {
    revenueScore = 25;
  } else if (input.opportunityType === "Strategic Asset") {
    revenueScore = 23;
  } else if (input.opportunityType === "Growth Asset") {
    revenueScore = 20;
  } else if (input.opportunityType === "Ready Revenue Asset") {
    revenueScore = 18;
  }

  // Adjust slightly by potential value factor
  if (input.potentialValue === "Critical") {
    revenueScore = Math.min(25, revenueScore + 2);
  } else if (input.potentialValue === "High") {
    revenueScore = Math.max(0, revenueScore - 2);
  }

  // 3. Reusability Score (0-20)
  let reusabilityScore = 10;
  if (input.opportunityType === "Ready Revenue Asset") {
    reusabilityScore = 20;
  } else if (input.opportunityType === "Growth Asset") {
    reusabilityScore = 18;
  } else if (input.opportunityType === "Enterprise White Label") {
    reusabilityScore = 15;
  } else if (input.opportunityType === "Strategic Asset") {
    reusabilityScore = 12; // More bespoke IP but high-value
  }

  // 4. Competition Score (0-15) - lower competition yields higher score
  let competitionScore = 8;
  if (input.opportunityType === "Strategic Asset") {
    competitionScore = 15; // Hard to copy, bespoke code base
  } else if (input.opportunityType === "Enterprise White Label") {
    competitionScore = 12; // Specialized B2B white-labeling
  } else if (input.opportunityType === "Growth Asset") {
    competitionScore = 10; // Medium complexity growth flows
  } else if (input.opportunityType === "Ready Revenue Asset") {
    competitionScore = 8;  // Highly common utility layer
  }

  // 5. Complexity Score (0-15) - easier to implement means a higher feasibility score
  let complexityFeasibilityScore = 10;
  if (input.implementationComplexity === "Low") {
    complexityFeasibilityScore = 15;
  } else if (input.implementationComplexity === "Medium") {
    complexityFeasibilityScore = 11;
  } else if (input.implementationComplexity === "High") {
    complexityFeasibilityScore = 7;
  }

  const assetValueScore = demandScore + revenueScore + reusabilityScore + competitionScore + complexityFeasibilityScore;

  // Determine recommendation
  let buildRecommendation: "Build Immediately™" | "Strong Opportunity™" | "Validate Further™" | "Low Priority™" = "Low Priority™";
  if (assetValueScore >= 90) {
    buildRecommendation = "Build Immediately™";
  } else if (assetValueScore >= 75) {
    buildRecommendation = "Strong Opportunity™";
  } else if (assetValueScore >= 60) {
    buildRecommendation = "Validate Further™";
  }

  // Determine market fit level
  let marketFit: "High" | "Medium-High" | "Medium" | "Low" = "Medium";
  if (demandScore >= 22) {
    marketFit = "High";
  } else if (demandScore >= 18) {
    marketFit = "Medium-High";
  } else if (demandScore >= 12) {
    marketFit = "Medium";
  } else {
    marketFit = "Low";
  }

  // Determine revenue potential level
  let revPot: "High" | "Medium-High" | "Medium" | "Low" = "Medium";
  if (revenueScore >= 22) {
    revPot = "High";
  } else if (revenueScore >= 18) {
    revPot = "Medium-High";
  } else if (revenueScore >= 12) {
    revPot = "Medium";
  } else {
    revPot = "Low";
  }

  // Complexity level description
  let maxComplexity: "High" | "Medium" | "Low" = "Medium";
  if (input.implementationComplexity === "High") {
    maxComplexity = "High";
  } else if (input.implementationComplexity === "Medium") {
    maxComplexity = "Medium";
  } else {
    maxComplexity = "Low";
  }

  // Dynamic short reasoning
  let shortReason = "Repetitive problem with high commercial reusability potential across the platform.";
  if (input.opportunityType === "Strategic Asset") {
    shortReason = "Strategic asset with highly robust defensive IP protection and low competitor saturation.";
  } else if (input.opportunityType === "Enterprise White Label") {
    shortReason = "Unbeatable corporate acquisition margin and high potential for recurring resale.";
  } else if (input.opportunityType === "Growth Asset") {
    shortReason = "Excellent direct traction optimizer. Its ease of deployment ensures fast conversion flows.";
  } else if (input.implementationComplexity === "Low" && assetValueScore >= 75) {
    shortReason = "Very low technical friction and ultra-fast delivery. Recommended for immediate market validation.";
  }

  return {
    assetValueScore,
    buildRecommendation,
    marketFit,
    revenuePotential: revPot,
    complexity: maxComplexity,
    shortReason,
    breakdown: {
      demandScore,
      revenuePotentialScore: revenueScore,
      reusabilityScore,
      competitionScore,
      complexityScore: complexityFeasibilityScore
    }
  };
}
