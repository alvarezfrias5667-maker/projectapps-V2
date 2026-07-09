import { 
  DiscoveryInput, 
  DiscoveredAsset, 
  DISCOVERY_OPPORTUNITIES, 
  DEFAULT_DISCOVERY_RESULT 
} from "../data/discoveryRules";

export function discoverAsset(input: DiscoveryInput): DiscoveredAsset {
  // 1. Direct match on recurringProblem
  const directMatch = DISCOVERY_OPPORTUNITIES.find(
    (opp) => opp.triggerProblem === input.recurringProblem
  );

  if (directMatch) {
    return {
      opportunityName: directMatch.opportunityName,
      opportunityType: directMatch.opportunityType,
      problemDetected: directMatch.problemDetected,
      potentialValue: directMatch.potentialValue,
      implementationComplexity: directMatch.implementationComplexity,
      shortDescription: directMatch.shortDescription
    };
  }

  // 2. Fallbacks based on keywords/inputs
  const processLower = (input.inefficientProcess || "").toLowerCase();
  const goalLower = (input.mainGoal || "").toLowerCase();
  const industryLower = (input.industry || "").toLowerCase();
  const toolsLower = (input.currentTools || "").toLowerCase();

  // If conversion, sales, leads goals
  if (
    processLower.includes("ventas") || 
    processLower.includes("conversión") || 
    processLower.includes("conversion") ||
    processLower.includes("leads") ||
    goalLower.includes("ventas") ||
    goalLower.includes("crecimiento")
  ) {
    const opp = DISCOVERY_OPPORTUNITIES.find(o => o.id === "lead-funnel") || DEFAULT_DISCOVERY_RESULT;
    return {
      opportunityName: opp.opportunityName,
      opportunityType: opp.opportunityType,
      problemDetected: "Ineficiencia detectada en el flujo de embudos directos de leads",
      potentialValue: opp.potentialValue,
      implementationComplexity: opp.implementationComplexity,
      shortDescription: opp.shortDescription
    };
  }

  // If automation, repetitive processes
  if (
    processLower.includes("manual") || 
    processLower.includes("repetitivo") || 
    processLower.includes("burocracia") ||
    toolsLower.includes("excel") ||
    processLower.includes("registro")
  ) {
    const opp = DISCOVERY_OPPORTUNITIES.find(o => o.id === "task-trigger") || DEFAULT_DISCOVERY_RESULT;
    return {
      opportunityName: opp.opportunityName,
      opportunityType: opp.opportunityType,
      problemDetected: "Gaps operativos y sobrecarga administrativa por tareas repetitivas",
      potentialValue: opp.potentialValue,
      implementationComplexity: opp.implementationComplexity,
      shortDescription: opp.shortDescription
    };
  }

  // If certificates, legal compliance
  if (
    processLower.includes("certi") || 
    processLower.includes("legal") || 
    processLower.includes("documento") ||
    goalLower.includes("cumplimiento")
  ) {
    const opp = DISCOVERY_OPPORTUNITIES.find(o => o.id === "cert-automation") || DEFAULT_DISCOVERY_RESULT;
    return {
      opportunityName: opp.opportunityName,
      opportunityType: opp.opportunityType,
      problemDetected: "Falta de estandarización en la emisión o control de certificados operativos",
      potentialValue: opp.potentialValue,
      implementationComplexity: opp.implementationComplexity,
      shortDescription: opp.shortDescription
    };
  }

  // Default fallback
  return DEFAULT_DISCOVERY_RESULT;
}
