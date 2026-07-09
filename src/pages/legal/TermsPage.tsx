import LegalLayout from "../../components/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms and Conditions of Use" lastUpdated="June 22, 2026">
      <p>
        Access to and use of this public commercial portal are strictly governed by the technical clauses detailed below.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">1. Intellectual and Industrial Property</h2>
      <p>
        All visual content, structural software architecture, displayed trademarks, including the <strong>COMMERCIAL WEBSITE ENGINE™</strong> brand, as well as advertising texts and logos, constitute reserved intellectual property. Any form of duplication, retransmission, or direct or indirect distribution of the commercial layout herein without our written consent is strictly prohibited.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">2. Limited Scope of the Portal</h2>
      <p>
        This portal exclusively performs public marketing functions to describe our range of services and technical consultations. No content displayed on this marketing portal constitutes a perfect contractual offer or commits the execution and implementation of specific architectures until it is rigorously backed by a Master Services Agreement (MSA) formally signed by the legal representatives of both parties.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">3. Platform Use Restrictions</h2>
      <p>
        The user agrees to make legitimate use of this website. The use of automated scrapers (web scrapers), hostile code injection through input fields, or any action aimed at interrupting bandwidth or degrading the infrastructure on which the corporate system portal operates is strictly prohibited.
      </p>

      <h2 className="text-lg font-bold text-neutral-900 mt-6 mb-2">4. Modifications of Legal Content</h2>
      <p>
        We reserve the exclusive right to make periodic adaptations and revisions to these terms of service to respond agilely to legislative changes or adjustments in the operating model of our technical consulting firm.
      </p>
    </LegalLayout>
  );
}
