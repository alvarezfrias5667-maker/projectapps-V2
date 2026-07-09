export interface ProposalInput {
  recommendedAsset: string;
  assetValueScore: number;
  annualSavings: number;
  potentialRevenueGain: number;
  paybackPeriod: string;
  roiScore: number;
  clientName?: string;
  clientIndustry?: string;
}

export interface ProposalOutput {
  recommendedAsset: string;
  clientName: string;
  assetValueScore: number;
  annualSavings: number;
  potentialRevenueGain: number;
  paybackPeriod: string;
  roiScore: number;
  implementationTimeline: string;
  recommendation: "Proceed" | "Hold" | "Refine";
  sections: {
    situacionDetectada: string;
    problemaPrincipal: string;
    solucionRecomendada: string;
    impactoEsperado: string;
    roiEstimado: string;
    timelineImplementacion: string;
    entregables: string[];
    recomendacionEjecutiva: string;
  };
  investmentSummary: {
    estimatedImplementationCost: number;
    ongoingMaintenanceValue: string;
    termType: string;
  };
}

export const DETERMINISTIC_TEMPLATES = {
  "Ready Revenue Asset": {
    timeline: "7-14 days",
    maintenance: "Update support and light hosting included in the commercial blueprint",
    deliverables: [
      "Commercial Asset instance with customized brand identity",
      "Step-by-step operating and lead-control manual",
      "Standard commercial license for perpetual unlimited use",
      "30-day initial technical integration support warranty"
    ]
  },
  "Growth Asset": {
    timeline: "4-6 weeks",
    maintenance: "Premium Gold support for conversion optimization and integrated analytics",
    deliverables: [
      "Advanced transactional funnel infrastructure and SEO optimization",
      "Real-time integrated analytics scripts and automated checkout flows",
      "Technical documentation of funnel IP transfer",
      "Corporate multi-domain extended license"
    ]
  },
  "Strategic Asset": {
    timeline: "6-12 weeks",
    maintenance: "Direct prioritized Level 3 support with core ProjectApps™ engineers",
    deliverables: [
      "Clean and perpetual transfer or creation of patentable source code",
      "Complete decentralized platform, audited under corporate cybersecurity standards",
      "Asset architecture and engineering level manuals",
      "Exclusive perpetual exploitation, distribution, or commercial sale rights"
    ]
  },
  "Enterprise White Label": {
    timeline: "4-8 weeks",
    maintenance: "Ongoing resale technical support and assigned brand consultant",
    deliverables: [
      "100% white label branded and customized platform, free of ProjectApps™ indicators",
      "Sales kit, technical documentation for resale to third parties, and instruction manuals",
      "Packaged platform ready for direct download and provisioning",
      "Unlimited licenses to resell under your own pricing structure"
    ]
  }
};
