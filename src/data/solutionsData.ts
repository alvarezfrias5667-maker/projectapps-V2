export interface Solution {
  id: string;
  internalCode: string;
  publicName: string;
  publicCategory: string;
  publicDescription: string;
  industries: string[];
  sizes: string[];
  problems: string[];
  objectives: string[];
  budgets: string[];
  expectedBenefit: string;
  estimatedTime: string;
  acquisitionModels: string[];
  additionalDetails: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    id: "credential-compliance-system",
    internalCode: "CR-001",
    publicName: "Credential & Compliance System™",
    publicCategory: "Document Intelligence",
    publicDescription:
      "Asset oriented towards organizing, validating, and accelerating processes related to credentials, certifications, and operational documentation.",
    industries: ["servicios", "finanzas", "salud"],
    sizes: ["pequena", "mediana"],
    problems: ["procesos", "lentitud"],
    objectives: ["cumplimiento", "reducir_costos"],
    budgets: ["bajo", "medio"],
    expectedBenefit:
      "Can reduce operational friction in document processes and improve compliance traceability.",
    estimatedTime: "1 to 2 weeks",
    acquisitionModels: ["Commercial License", "Project ZIP™", "Implementation Review"],
    additionalDetails: [
      "Document validation available depending on scope",
      "Structure prepared for audit processes",
      "Deliverable materials subject to the acquired modality",
    ],
  },
  {
    id: "visibility-acquisition-system",
    internalCode: "VO-001",
    publicName: "Visibility & Acquisition System™",
    publicCategory: "Marketing & Growth Intelligence",
    publicDescription:
      "Asset focused on improving commercial visibility, detecting acquisition opportunities, and strengthening digital presence.",
    industries: ["ecommerce", "tecnologia", "servicios"],
    sizes: ["pequena", "mediana", "grande"],
    problems: ["conversion", "lentitud"],
    objectives: ["aumentar_ventas", "automatizar"],
    budgets: ["bajo", "medio"],
    expectedBenefit:
      "Can help identify visibility gaps and improve commercial decisions related to customer acquisition.",
    estimatedTime: "1 to 2 weeks",
    acquisitionModels: ["Commercial License", "White Label Option", "Implementation Review"],
    additionalDetails: [
      "Digital presence evaluation",
      "Signals of commercial opportunity",
      "Adaptable structure according to business category",
    ],
  },
  {
    id: "rapid-launch-system",
    internalCode: "LQ-001",
    publicName: "Rapid Launch System™",
    publicCategory: "Product Discovery",
    publicDescription:
      "Asset designed to accelerate validation, launching, and initial structuring of digital initiatives.",
    industries: ["ecommerce", "servicios"],
    sizes: ["pequena", "mediana"],
    problems: ["lentitud", "conversion"],
    objectives: ["aumentar_ventas", "automatizar"],
    budgets: ["bajo", "medio"],
    expectedBenefit:
      "Can reduce preparation time for digital initiatives and improve speed-to-market.",
    estimatedTime: "2 weeks",
    acquisitionModels: ["Commercial License", "Project ZIP™", "Implementation Review"],
    additionalDetails: [
      "Initial launch structure",
      "Commercial validation flow",
      "Components available based on actual asset status",
    ],
  },
  {
    id: "security-validation-system",
    internalCode: "SS-001",
    publicName: "Security Validation System™",
    publicCategory: "Security & Trust Intelligence",
    publicDescription:
      "Asset oriented towards reviewing risks, operational exposure, and security signals within digital environments.",
    industries: ["tecnologia", "finanzas", "salud"],
    sizes: ["mediana", "grande"],
    problems: ["seguridad", "escalabilidad"],
    objectives: ["cumplimiento", "reducir_costos"],
    budgets: ["medio", "alto"],
    expectedBenefit:
      "Can support preventive review processes and prioritization of digital risks.",
    estimatedTime: "2 to 3 weeks",
    acquisitionModels: ["Commercial License", "White Label Option", "Implementation Review"],
    additionalDetails: [
      "Evaluation of risk signals",
      "Adaptable structure for internal processes",
      "Scope subject to modality and availability",
    ],
  },
  {
    id: "deployment-readiness-system",
    internalCode: "BR-001",
    publicName: "Deployment Readiness System™",
    publicCategory: "Infrastructure & Platform Intelligence",
    publicDescription:
      "Asset focused on preparing technical structures, deployments, and operational foundations for digital projects.",
    industries: ["tecnologia", "ecommerce", "finanzas"],
    sizes: ["mediana", "grande"],
    problems: ["escalabilidad", "lentitud"],
    objectives: ["automatizar", "reducir_costos"],
    budgets: ["medio", "alto"],
    expectedBenefit:
      "Can reduce technical preparation friction and improve consistency in initial deployments.",
    estimatedTime: "2 to 4 weeks",
    acquisitionModels: ["Commercial License", "Project ZIP™", "White Label Option"],
    additionalDetails: [
      "Technical structure available based on status",
      "Existing documentation where applicable",
      "Prepared for prior scope review",
    ],
  },
  {
    id: "workflow-blueprint-system",
    internalCode: "WB-001",
    publicName: "Workflow Blueprint System™",
    publicCategory: "Operations Intelligence",
    publicDescription:
      "Asset oriented towards structuring processes, workflows, and operational documentation for business execution.",
    industries: ["manufactura", "finanzas", "servicios"],
    sizes: ["mediana", "grande"],
    problems: ["procesos", "escalabilidad"],
    objectives: ["automatizar", "cumplimiento"],
    budgets: ["medio", "alto"],
    expectedBenefit:
      "Can facilitate the organization of internal processes and accelerate the definition of operational structures.",
    estimatedTime: "3 to 4 weeks",
    acquisitionModels: ["Strategic Acquisition", "Project ZIP™", "Commercial License"],
    additionalDetails: [
      "Process mapping",
      "Operational documentation available",
      "Roadmap subject to the actual state of the asset",
    ],
  },
  {
    id: "transaction-proof-system",
    internalCode: "TP-001",
    publicName: "Transaction Proof System™",
    publicCategory: "Compliance Intelligence",
    publicDescription:
      "Asset focused on validation, registration, and traceability of commercial operations and transactional documents.",
    industries: ["finanzas", "ecommerce", "servicios"],
    sizes: ["mediana", "grande"],
    problems: ["seguridad", "procesos"],
    objectives: ["cumplimiento", "automatizar"],
    budgets: ["medio", "alto"],
    expectedBenefit:
      "Can improve commercial traceability and documentary support for validation processes.",
    estimatedTime: "3 weeks",
    acquisitionModels: ["Commercial License", "White Label Option", "Project ZIP™"],
    additionalDetails: [
      "Structured record of operations",
      "Document validation available depending on scope",
      "Technical material subject to prior review",
    ],
  },
  {
    id: "growth-asset-portfolio",
    internalCode: "GA-001",
    publicName: "Growth Asset Portfolio™",
    publicCategory: "Growth Intelligence",
    publicDescription:
      "A suite of assets oriented towards customer acquisition, conversion, growth, and commercial expansion.",
    industries: ["ecommerce", "tecnologia", "servicios", "manufactura"],
    sizes: ["pequena", "mediana", "grande"],
    problems: ["conversion", "procesos"],
    objectives: ["aumentar_ventas", "automatizar"],
    budgets: ["medio", "alto"],
    expectedBenefit:
      "Can help identify growth opportunities and accelerate commercial initiatives.",
    estimatedTime: "4 to 6 weeks",
    acquisitionModels: ["Growth Acquisition", "Commercial License", "White Label Option"],
    additionalDetails: [
      "Assets subject to availability",
      "Categories organized by business objective",
      "Detailed information available after request",
    ],
  },
  {
    id: "strategic-asset-portfolio",
    internalCode: "SA-001",
    publicName: "Strategic Asset Portfolio™",
    publicCategory: "Decision Intelligence",
    publicDescription:
      "A suite of strategic assets oriented towards intellectual property, operational direction, and high-impact decisions.",
    industries: ["finanzas", "salud", "tecnologia", "manufactura"],
    sizes: ["grande"],
    problems: ["seguridad", "escalabilidad", "procesos"],
    objectives: ["cumplimiento", "reducir_costos", "automatizar"],
    budgets: ["alto"],
    expectedBenefit:
      "Can support strategic decisions, IP acquisition, and the acceleration of enterprise initiatives.",
    estimatedTime: "6 to 12 weeks",
    acquisitionModels: ["Strategic Acquisition", "White Label Option", "Project ZIP™"],
    additionalDetails: [
      "Private information available upon validation",
      "Transferable materials subject to acquired modality",
      "Scope subject to availability and agreement",
    ],
  },
];
