import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  FileText, 
  Check, 
  ArrowRight,
  Sparkles,
  RefreshCw,
  Scale
} from "lucide-react";

export default function TransactionProtectionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    { number: "01", name: "Request", desc: "The acquirer formalizes their interest in a specific digital asset." },
    { number: "02", name: "Evaluation", desc: "Analysis of technical and operational compatibility under a formal NDA." },
    { number: "03", name: "Confirmation", desc: "Verification of ownership and actual availability of the asset by ProjectApps™." },
    { number: "04", name: "Agreement", desc: "Signing of the intellectual property transfer agreement and secure escrow deposit." },
    { number: "05", name: "Transfer", desc: "Guided migration of source code and credentials to the acquirer's servers." },
    { number: "06", name: "Delivery", desc: "Final audit, fund release, and closure of the transfer record." }
  ];

  const faqs = [
    {
      q: "How is the buyer protected?",
      a: "The buyer is protected by the ProjectApps™ escrow guarantee. The funds for the acquisition remain securely held and are only released to the seller once the buyer has formally audited and received the complete source code, database, and all agreed intellectual property."
    },
    {
      q: "How is the seller protected?",
      a: "We protect the seller by requiring strict prequalification of buyers (including validated proof of funds or investment horizons). Additionally, deep technical documentation and partial code are released gradually under strict non-disclosure agreements (NDAs) to prevent any plagiarism or copying."
    },
    {
      q: "Is the code delivered before payment?",
      a: "Code is not delivered directly to the buyer without the funds being previously deposited and locked in the ProjectApps™ escrow. This guarantees that the seller's payment is secured and that the buyer will receive the complete assets before the definitive transaction is finalized."
    },
    {
      q: "What happens if the asset is no longer available?",
      a: "If during the pre-validation phase it is confirmed that the asset has been withdrawn or exclusively acquired by another organization, the request is canceled immediately at no cost. In case of escrow deposits, funds are returned fully and immediately to the acquirer."
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div id="transaction-protection" className="bg-white text-neutral-900 pb-24 selection:bg-neutral-900 selection:text-white">
      
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto px-6 pt-32 text-center space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full border border-neutral-200">
          <ShieldCheck className="h-3.5 w-3.5 text-neutral-800" /> Transaction Protection Program™
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight">
          Secure Acquisitions and Absolute Trust
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
          We design a marketing ecosystem that eliminates the inherent risk of transferring source code and software intellectual property, guaranteeing smooth transactions for both parties.
        </p>
      </div>

      {/* Visual Sequence Box */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 md:p-12 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
              SECURE TRANSFER FLOW
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
              Acquisition Timeline
            </h2>
            <p className="text-xs text-neutral-500 font-light max-w-lg mx-auto">
              Each phase is overseen by ProjectApps™ to safeguard legal validity, transactional flow, and the delivery of logical assets.
            </p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative bg-white border border-neutral-200/85 p-5 rounded-2xl flex flex-col justify-between space-y-3 hover:border-neutral-400 transition">
                <div className="space-y-2">
                  <span className="text-2xl font-black text-neutral-200 font-mono block leading-none">
                    {step.number}
                  </span>
                  <h3 className="text-xs font-black text-neutral-950 uppercase tracking-wider">
                    {step.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {idx < 5 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-neutral-950 text-white rounded-full p-0.5 border border-white">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Twin Protections Grid (Comprador vs Vendedor) */}
      <div className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* COMPRADOR PROTECTION */}
        <div className="border border-neutral-200 rounded-3xl p-8 space-y-6 hover:border-neutral-400 transition bg-white">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
            <div className="h-10 w-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase font-black">COMPREHENSIVE WARRANTY</span>
              <h2 className="text-lg font-bold text-neutral-950 tracking-tight">
                Buyer Protection
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-5 w-5 bg-neutral-100 text-neutral-900 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-900">Exhaustive Prior Validation</h4>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                  We audit the asset code to ensure it is free from exploits, broken dependencies, or technical debt not reported in the catalog.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-5 w-5 bg-neutral-100 text-neutral-900 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-900">Availability Confirmation</h4>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                  We strictly verify total ownership of the code by the seller before publishing or starting a sales process.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-5 w-5 bg-neutral-100 text-neutral-900 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-900">Complete Document Review</h4>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                  We check that the legal transfer documentation transparently represents the possession and immutability of intellectual property.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-5 w-5 bg-neutral-100 text-neutral-900 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-900">Absolute Commercial Transparency</h4>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                  Zero surprise fees or recurring charges. The negotiated price is exactly what is settled for perpetual ownership.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* VENDEDOR PROTECTION */}
        <div className="border border-neutral-200 rounded-3xl p-8 space-y-6 hover:border-neutral-400 transition bg-white">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
            <div className="h-10 w-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase font-black">ASSET PROTECTION</span>
              <h2 className="text-lg font-bold text-neutral-950 tracking-tight">
                Seller Protection
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-5 w-5 bg-neutral-100 text-neutral-900 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-900">Inflexible Code Protection</h4>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                  The complete source code is never accessible by the acquirer until the agreed funds are in confirmed legal escrow.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-5 w-5 bg-neutral-100 text-neutral-900 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-900">Intellectual Property Protection</h4>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                  We guarantee that all copyrights remain with the seller during the initial negotiation phase under a binding NDA.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-5 w-5 bg-neutral-100 text-neutral-900 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-900">Immediate Mandatory NDA</h4>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                  No confidential information or database schema is shared without the digital signature of a non-disclosure agreement.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-5 w-5 bg-neutral-100 text-neutral-900 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-900">Gradual Information Access</h4>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                  We release architecture and integration data incrementally as transactional due diligence progresses.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ SECTION */}
      <div className="max-w-4xl mx-auto px-6 mt-24 space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
            <HelpCircle className="h-3.5 w-3.5" /> TRANSACTIONAL SUPPORT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light">
            Direct answers about security, escrow, and intellectual property transfer at ProjectApps™.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-neutral-50"
                >
                  <span className="text-xs sm:text-sm font-bold text-neutral-900">{item.q}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-neutral-500" /> : <ChevronDown className="h-4 w-4 text-neutral-500" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-neutral-500 font-light leading-relaxed border-t border-neutral-100">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <div className="bg-neutral-950 text-white rounded-3xl p-8 md:p-12 space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-bold">START SECURELY</span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Do you have an asset to sell or a project to acquire?</h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            Our legal and engineering team will guide you through each phase to ensure the transfer is completed seamlessly.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-3 bg-white text-neutral-950 hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-xl transition"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-transparent hover:bg-neutral-900 text-white border border-neutral-800 text-xs font-bold uppercase tracking-wider rounded-xl transition"
            >
              Contact a Specialist
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
