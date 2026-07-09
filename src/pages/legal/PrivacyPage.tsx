import LegalLayout from "../../components/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 22, 2026">
      <p>
        For <strong>COMMERCIAL WEBSITE ENGINE™</strong>, confidentiality, data privacy, and regulatory compliance are of utmost importance to build and maintain trust with our clients, partners, and the broader business community.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">1. Collection of Information</h2>
      <p>
        The only information voluntarily collected on this public business portal is that explicitly supplied by the user through our corporate inquiry form. This includes personal and professional contact data strictly necessary, such as full name, company name, corporate email address, and the specific description of the technical requirements.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">2. Use of Provided Information</h2>
      <p>
        The data provided will be processed in an automated manner by our technical relations team with the exclusive purpose of structuring responses to your operational inquiries, preparing customized quotes, or scheduling commercial validation calls. Under no circumstances will this data be transferred, sold, or leased to third parties without prior and formal written authorization.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">3. Retention and Security Measures</h2>
      <p>
        We adopt logical engineering measures to safeguard structured data in our systems from unauthorized access, accidental loss, or malicious alteration. We retain contact information in compliance with strict timelines established by applicable commercial information governance regulations, or until the owner formally requests its immediate removal.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">4. Access Rights Channels</h2>
      <p>
        You retain the right to access, rectify, or revoke consent for the processing of your information. To proceed with any request regarding the owner's rights, please interact directly through our formal channels described in the contact section, addressing our Data Protection Officer (DPO) and attaching your specific requirement.
      </p>
    </LegalLayout>
  );
}
