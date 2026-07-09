export interface DiscoveryInput {
  industry: string;
  businessType: string;
  recurringProblem: string;
  mainGoal: string;
  inefficientProcess: string;
  currentTools: string;
}

export interface DiscoveredAsset {
  opportunityName: string;
  opportunityType: "Ready Revenue Asset" | "Growth Asset" | "Strategic Asset" | "Enterprise White Label";
  problemDetected: string;
  potentialValue: "Alto" | "Muy Alto" | "Crítico";
  implementationComplexity: "Baja" | "Media" | "Alta";
  shortDescription: string;
  recommendedStack?: string[];
}

export const DISCOVERY_OPPORTUNITIES = [
  {
    id: "cert-automation",
    triggerProblem: "manual_doc",
    opportunityName: "CertiAutomate™ Platform",
    opportunityType: "Ready Revenue Asset" as const,
    problemDetected: "Generación manual de certificados y licencias regulatorias",
    potentialValue: "Alto" as const,
    implementationComplexity: "Media" as const,
    shortDescription: "Plataforma de automatización para emisión, firma y distribución masiva de credenciales operativas validadas.",
    recommendedStack: ["React", "PDF Generation Pipeline", "Metadata Verification Engine"]
  },
  {
    id: "lead-funnel",
    triggerProblem: "baja_conversion",
    opportunityName: "ConversionOS™ Pipeline",
    opportunityType: "Growth Asset" as const,
    problemDetected: "Fugas de conversión en embudos transaccionales y de registro",
    potentialValue: "Muy Alto" as const,
    implementationComplexity: "Baja" as const,
    shortDescription: "Capa de optimización de checkout e incentivos dinámicos en tiempo real para recuperar carritos y registros abandonados.",
    recommendedStack: ["React", "Tailwind CSS", "Intent Analytics Script"]
  },
  {
    id: "sec-audit",
    triggerProblem: "seguridad_gap",
    opportunityName: "ComplianceGuard™ Platform",
    opportunityType: "Strategic Asset" as const,
    problemDetected: "Riesgos latentes de privacidad de datos y falta de cumplimiento automatizado",
    potentialValue: "Crítico" as const,
    implementationComplexity: "Alta" as const,
    shortDescription: "Bóveda descentralizada para auditoría continua de firmas, hashing de contratos de servicios y reporte normativo automatizado.",
    recommendedStack: ["Web Crypto API", "Immutable Log Architecture", "React Admin Portal"]
  },
  {
    id: "scalability-bridge",
    triggerProblem: "costos_infra",
    opportunityName: "InfraSave™ Bridge",
    opportunityType: "Strategic Asset" as const,
    problemDetected: "Estructuras de hosting ineficientes y elevados costos de escalabilidad",
    potentialValue: "Alto" as const,
    implementationComplexity: "Alta" as const,
    shortDescription: "Motor de orquestación ligera de micro-servidores para aprovisionamiento preventivo según patrones de tráfico.",
    recommendedStack: ["Docker Templates", "Container Scheduler Service", "NodeJS Proxy Controller"]
  },
  {
    id: "task-trigger",
    triggerProblem: "procesos_rep",
    opportunityName: "WorkflowPilot™ Engine",
    opportunityType: "Ready Revenue Asset" as const,
    problemDetected: "Inversión excesiva de tiempo en digitalización manual y transcripciones repetitivas",
    potentialValue: "Muy Alto" as const,
    implementationComplexity: "Media" as const,
    shortDescription: "Suite de RPA (Robotic Process Automation) micro-modular que automatiza el traslado de datos entre aplicaciones sin usar costosas licencias externas.",
    recommendedStack: ["Task Scheduler", "Webhooks Integrator", "React Workflow Builder"]
  }
];

export const DEFAULT_DISCOVERY_RESULT: DiscoveredAsset = {
  opportunityName: "Custom Asset Architect™",
  opportunityType: "Ready Revenue Asset",
  problemDetected: "Gaps operativos y procesos manuales no estructurados",
  potentialValue: "Alto",
  implementationComplexity: "Media",
  shortDescription: "Estructura modular de automatización para interconectarse con herramientas comerciales existentes de forma inmediata.",
  recommendedStack: ["Custom Script Controller", "React Front-end Grid"]
};
