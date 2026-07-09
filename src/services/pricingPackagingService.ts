import { 
  PricingPackageInput, 
  PricingPackageResult, 
  PricingPackageType, 
  BASE_PACKAGES_DEFINITIONS 
} from "../data/pricingPackages";

export function determinePricingPackage(input: PricingPackageInput): PricingPackageResult {
  const assetNameLower = input.recommendedAsset.toLowerCase();
  let selectedType: PricingPackageType = "Ready Revenue Asset™";

  // Deterministic rule hierarchy
  if (assetNameLower.includes("white") || assetNameLower.includes("label") || assetNameLower.includes("global") || assetNameLower.includes("suite")) {
    selectedType = "Enterprise White Label™";
  } else if (input.roiScore < 3.5 || assetNameLower.includes("compliance") || assetNameLower.includes("guard") || assetNameLower.includes("strategic")) {
    selectedType = "Strategic Asset™";
  } else if (input.assetValueScore >= 90 || assetNameLower.includes("conversion") || assetNameLower.includes("pipeline") || assetNameLower.includes("growth")) {
    selectedType = "Growth Asset™";
  } else {
    selectedType = "Ready Revenue Asset™";
  }

  const baseConfig = BASE_PACKAGES_DEFINITIONS[selectedType];

  return {
    packageType: selectedType,
    deliveryModel: baseConfig.deliveryModel,
    implementationLevel: baseConfig.implementationLevel,
    supportLevel: baseConfig.supportLevel,
    licenseType: baseConfig.licenseType,
    estimatedInvestment: baseConfig.estimatedInvestment,
    timeline: input.implementationTimeline || "7-14 días",
    includedItems: baseConfig.includedItems,
    description: baseConfig.description
  };
}
