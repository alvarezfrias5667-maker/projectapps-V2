export interface RoiInput {
  assetValueScore: number;
  opportunityType: "Ready Revenue Asset" | "Growth Asset" | "Strategic Asset" | "Enterprise White Label";
  revenuePotential: "High" | "Medium-High" | "Medium" | "Low";
  complexity: "High" | "Medium" | "Low";
  currentHoursWastedPerMonth?: number;
  hourlyCostDollar?: number;
}

export interface RoiResult {
  annualSavings: number;
  potentialRevenueGain: number;
  paybackPeriod: string;
  roiScore: number;
  impactLevel: "High" | "Medium-High" | "Medium" | "Low";
  recommendation: "Proceed" | "Hold" | "Refine";
  totalEstimatedValue: number;
  shortExplanation: string;
}

export const DEFAULT_ROI_INPUT: RoiInput = {
  assetValueScore: 81,
  opportunityType: "Ready Revenue Asset",
  revenuePotential: "Medium-High",
  complexity: "Medium",
  currentHoursWastedPerMonth: 40,
  hourlyCostDollar: 35
};
