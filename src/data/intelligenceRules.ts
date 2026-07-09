export interface IntelligenceInput {
  opportunityType: "Ready Revenue Asset" | "Growth Asset" | "Strategic Asset" | "Enterprise White Label";
  problemDetected: string;
  potentialValue: "High" | "Very High" | "Critical";
  implementationComplexity: "Low" | "Medium" | "High";
}

export interface IntelligenceResult {
  assetValueScore: number;
  buildRecommendation: "Build Immediately™" | "Strong Opportunity™" | "Validate Further™" | "Low Priority™";
  marketFit: "High" | "Medium-High" | "Medium" | "Low";
  revenuePotential: "High" | "Medium-High" | "Medium" | "Low";
  complexity: "High" | "Medium" | "Low";
  shortReason: string;
  breakdown: {
    demandScore: number;
    revenuePotentialScore: number;
    reusabilityScore: number;
    competitionScore: number;
    complexityScore: number;
  };
}

export const EXAMPLES_INTELLIGENCE: { input: IntelligenceInput; output: IntelligenceResult }[] = [
  {
    input: {
      opportunityType: "Ready Revenue Asset",
      problemDetected: "Manual certificate generation",
      potentialValue: "High",
      implementationComplexity: "Medium"
    },
    output: {
      assetValueScore: 81,
      buildRecommendation: "Strong Opportunity™",
      marketFit: "Medium-High",
      revenuePotential: "Medium-High",
      complexity: "Medium",
      shortReason: "Highly repetitive problem with strong standardization capability and fast go-to-market time.",
      breakdown: {
        demandScore: 18,
        revenuePotentialScore: 18,
        reusabilityScore: 20,
        competitionScore: 10,
        complexityScore: 15
      }
    }
  }
];
