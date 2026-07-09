import { RoiInput, RoiResult } from "../data/roiRules";

export function calculateRoiImpact(input: RoiInput): RoiResult {
  const hoursPerMonth = input.currentHoursWastedPerMonth ?? 30;
  const hourlyCost = input.hourlyCostDollar ?? 30;

  // 1. Coste estimado y ahorro anual estimado
  // Ahorro anual directo = Horas desperdiciadas/año * Costo de hora
  const annualSavings = hoursPerMonth * 12 * hourlyCost;

  // 2. Incremento potencial de ingresos base por categoría
  let baseRevenueGain = 15000;
  if (input.opportunityType === "Enterprise White Label") {
    baseRevenueGain = 35000;
  } else if (input.opportunityType === "Strategic Asset") {
    baseRevenueGain = 28000;
  } else if (input.opportunityType === "Growth Asset") {
    baseRevenueGain = 22000;
  } else if (input.opportunityType === "Ready Revenue Asset") {
    baseRevenueGain = 14000;
  }

  // Multiplicador del potencial de ingresos expresado
  let revenuePotentialMultiplier = 1.0;
  if (input.revenuePotential === "High") {
    revenuePotentialMultiplier = 1.5;
  } else if (input.revenuePotential === "Medium-High") {
    revenuePotentialMultiplier = 1.25;
  } else if (input.revenuePotential === "Medium") {
    revenuePotentialMultiplier = 0.9;
  } else if (input.revenuePotential === "Low") {
    revenuePotentialMultiplier = 0.5;
  }

  // Multiplicador de madurez del Score (0.5 a 1.25)
  const scoreMultiplier = 0.5 + (input.assetValueScore / 100) * 0.75;

  const potentialRevenueGain = Math.round(baseRevenueGain * revenuePotentialMultiplier * scoreMultiplier);

  // 3. Costo teórico de implementación para calcular Payback y ROI
  let implementationCost = 5000;
  if (input.complexity === "High") {
    implementationCost = 15000;
  } else if (input.complexity === "Medium") {
    implementationCost = 6500;
  } else if (input.complexity === "Low") {
    implementationCost = 2500;
  }

  const totalAnnualValue = annualSavings + potentialRevenueGain;
  const monthlyBusinessValue = totalAnnualValue / 12;

  // 4. Tiempo estimado de recuperación (Payback Period)
  let paybackMonths = implementationCost / (monthlyBusinessValue || 1);
  paybackMonths = Math.max(1, Math.round(paybackMonths * 10) / 10); // redondeo a 1 decimal
  
  let paybackPeriod = `${Math.ceil(paybackMonths)} meses`;
  if (Math.ceil(paybackMonths) === 1) {
    paybackPeriod = "1 mes";
  }

  // 5. ROI Estimado expresado como multiplicador (e.g. 5.2x inversión)
  let roiScore = totalAnnualValue / implementationCost;
  roiScore = Math.round(roiScore * 10) / 10;

  // 6. Nivel de Impacto
  let impactLevel: "High" | "Medium-High" | "Medium" | "Low" = "Medium";
  if (roiScore >= 5.0) {
    impactLevel = "High";
  } else if (roiScore >= 3.0) {
    impactLevel = "Medium-High";
  } else if (roiScore >= 1.5) {
    impactLevel = "Medium";
  } else {
    impactLevel = "Low";
  }

  // 7. Recomendación de negocio
  let recommendation: "Proceed" | "Hold" | "Refine" = "Hold";
  if (input.assetValueScore >= 75 && roiScore >= 3.0) {
    recommendation = "Proceed";
  } else if (input.assetValueScore >= 55 && roiScore >= 1.5) {
    recommendation = "Refine";
  } else {
    recommendation = "Hold";
  }

  // Explicación corta adaptada
  let shortExplanation = "The asset delivers a solid financial return driven by internal process optimization.";
  if (input.opportunityType === "Enterprise White Label") {
    shortExplanation = "High profitability leveraged on external licensing with minimal maintenance overhead.";
  } else if (roiScore > 6.0) {
    shortExplanation = "Brilliant synergy of a high volume of saved hours and an excellent opportunity for external monetization.";
  } else if (input.complexity === "High" && roiScore < 2.0) {
    shortExplanation = "High construction complexity that tempers the initial return. Consider simplifying the architecture.";
  }

  return {
    annualSavings,
    potentialRevenueGain,
    paybackPeriod,
    roiScore,
    impactLevel,
    recommendation,
    totalEstimatedValue: totalAnnualValue,
    shortExplanation
  };
}
