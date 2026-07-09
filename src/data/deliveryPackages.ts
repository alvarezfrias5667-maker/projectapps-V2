export interface DeliveryInput {
  packageType:
    | "Strategic Asset™"
    | "Growth Asset™"
    | "Ready Revenue Asset™"
    | "Enterprise White Label™";
  deliveryModel: string;
  licenseType: string;
}

export interface DeliveryResult {
  purchaseType: string;
  includedAssets: string[];
  deliveryFormat: string;
  implementationIncluded: boolean;
  documentationIncluded: boolean;
  supportIncluded: boolean;
  estimatedDelivery: string;
  handoverProtocol: string;
}

export const OFFICIAL_DELIVERABLES: Record<
  | "Strategic Asset™"
  | "Growth Asset™"
  | "Ready Revenue Asset™"
  | "Enterprise White Label™",
  string[]
> = {
  "Strategic Asset™": [
    "Strategic documentation",
    "Executive summary",
    "Working materials",
    "Evolution guide",
  ],

  "Growth Asset™": [
    "Project available for review",
    "Available architecture",
    "Continuity guide",
    "Available documentation",
  ],

  "Ready Revenue Asset™": [
    "Available application",
    "Adaptation options",
    "Implementation materials",
    "Initial guidance",
  ],

  "Enterprise White Label™": [
    "Assets available for transfer",
    "White label materials",
    "Applicable license",
    "Available integration options",
  ],
};