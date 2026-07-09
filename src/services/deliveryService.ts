import {
  DeliveryInput,
  DeliveryResult,
  OFFICIAL_DELIVERABLES,
} from "../data/deliveryPackages";

export function generateDeliveryPackage(input: DeliveryInput): DeliveryResult {
  const packageType = input.packageType || "Ready Revenue Asset™";
  const deliveryModel = input.deliveryModel || "Implementation";

  const includedAssets =
    OFFICIAL_DELIVERABLES[packageType] ||
    OFFICIAL_DELIVERABLES["Ready Revenue Asset™"];

  let implementationIncluded = true;
  let documentationIncluded = true;
  let supportIncluded = true;
  let estimatedDelivery = "7-14 days";
  let handoverProtocol =
    "Implementation review, available materials, and initial guidance depending on the acquired modality.";

  if (packageType === "Strategic Asset™") {
    implementationIncluded = false;
    documentationIncluded = true;
    supportIncluded = true;
    estimatedDelivery = "2-4 weeks";
    handoverProtocol =
      "Strategic review, available documentation, and transferable materials according to scope.";
  } else if (packageType === "Growth Asset™") {
    implementationIncluded = true;
    documentationIncluded = true;
    supportIncluded = false;
    estimatedDelivery = "4-6 weeks";
    handoverProtocol =
      "Growth review, existing materials, and continuity guide subject to availability.";
  } else if (packageType === "Enterprise White Label™") {
    implementationIncluded = true;
    documentationIncluded = true;
    supportIncluded = true;
    estimatedDelivery = "4-8 weeks";
    handoverProtocol =
      "Private white-label review, applicable license, and transferable materials per agreement.";
  }

  return {
    purchaseType: packageType,
    includedAssets,
    deliveryFormat: deliveryModel,
    implementationIncluded,
    documentationIncluded,
    supportIncluded,
    estimatedDelivery,
    handoverProtocol,
  };
}