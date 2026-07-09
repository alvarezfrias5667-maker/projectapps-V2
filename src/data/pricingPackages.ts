export interface PricingPackageInput {
  recommendedAsset: string;
  assetValueScore: number;
  roiScore: number;
  implementationTimeline: string;
  recommendation: "Proceed" | "Hold" | "Refine";
}

export type PricingPackageType = 
  | "Strategic Asset™"
  | "Growth Asset™"
  | "Ready Revenue Asset™"
  | "Enterprise White Label™";

export interface PricingPackageResult {
  packageType: PricingPackageType;
  deliveryModel: string;
  implementationLevel: string;
  supportLevel: string;
  licenseType: string;
  estimatedInvestment: string;
  timeline: string;
  includedItems: string[];
  description: string;
}

export const BASE_PACKAGES_DEFINITIONS: Record<PricingPackageType, {
  deliveryModel: string;
  implementationLevel: string;
  supportLevel: string;
  licenseType: string;
  estimatedInvestment: string;
  includedItems: string[];
  description: string;
}> = {
  "Strategic Asset™": {
    deliveryModel: "Advisory & Blueprinting",
    implementationLevel: "High-Level Architecture + Prototyping",
    supportLevel: "L3 Direct Advisory",
    licenseType: "Proprietary IP Ownership",
    estimatedInvestment: "US$15,000 - US$25,000",
    description: "Diseñado para activos altamente defensivos que redefinirán su ventaja operativa o comercial primorosa.",
    includedItems: [
      "ADN™",
      "Executive Summary™",
      "Prompt Kit™",
      "Roadmap™"
    ]
  },
  "Growth Asset™": {
    deliveryModel: "Validation & Design Integration",
    implementationLevel: "Standard Conversion Funnel",
    supportLevel: "Growth Optimization Consulting",
    licenseType: "Extended Commercial License",
    estimatedInvestment: "US$5,000 - US$12,000",
    description: "Optimizado para la tracción veloz, checkouts simplificados y captación automatizada de audiencias masivas.",
    includedItems: [
      "Proyecto validado",
      "Arquitectura",
      "Roadmap",
      "Documentación"
    ]
  },
  "Ready Revenue Asset™": {
    deliveryModel: "Implementation",
    implementationLevel: "Full Setup & Personalization",
    supportLevel: "Standard Support SLA",
    licenseType: "Commercial License",
    estimatedInvestment: "US$3,000 - US$10,000",
    description: "Aplicación enteramente funcional de rápida puesta en marcha para automatizar las ineficiencias del negocio de inmediato.",
    includedItems: [
      "Aplicación funcional",
      "Personalización",
      "Implementación",
      "Capacitación"
    ]
  },
  "Enterprise White Label™": {
    deliveryModel: "Full Platform Delivery",
    implementationLevel: "Advanced Integrations & Whitelabeling",
    supportLevel: "Dedicated Account Manager Support",
    licenseType: "Unlimited Reseller License",
    estimatedInvestment: "US$10,000 - US$30,000",
    description: "Ideal para consultoras y corporaciones que buscan revender el software como propio de inmediato sin costos de I+D.",
    includedItems: [
      "Marca blanca",
      "Código fuente",
      "Licencia ampliada",
      "Integraciones avanzadas"
    ]
  }
};
