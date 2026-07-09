import LegalLayout from "../../components/LegalLayout";

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" lastUpdated="June 22, 2026">
      <p>
        This document establishes the legal exclusion framework governing the material displayed or distributed through this public portal.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">1. Solely Informational Nature</h2>
      <p>
        The commercial information contained in this portal is offered purely for promotional, informational, and commercial public relations purposes. Although the compiled technical material has been carefully drafted by our consulting engineers, no explicit or implicit warranty is assumed regarding the final level of adaptability, exact validity, or total accuracy applicable to the operational specificities of your company.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">2. Absence of Direct Technical Diagnosis</h2>
      <p>
        No content hosted in these sections replaces or serves as a formal technical audit, system feasibility study, or individualized technical diagnosis. The concrete operational specifications of your infrastructure must be thoroughly audited directly and independently by competent personnel.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">3. Exemption from Indirect Damages</h2>
      <p>
        <strong>COMMERCIAL WEBSITE ENGINE™</strong>, as well as its officers, employees, or affiliates, decline any legal liability for incidental or indirect damages or operational losses, work interruptions, data transfer failures, or lost profits that may arise directly or indirectly from the user's access to the website, their free interpretation of the explanatory articles displayed, or the eventual use of the portal.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">4. Agreement on Competent Jurisdiction</h2>
      <p>
        Any claim arising from the use of or access to the commercial and informational pages described here will be resolved amicably in the first instance, and should the disagreement persist, before the territorial jurisdiction of the courts of Madrid, Spain.
      </p>
    </LegalLayout>
  );
}
