import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileCode,
  HeartHandshake,
  Layers,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { generateDeliveryPackage } from "../services/deliveryService";
import type { DeliveryInput } from "../data/deliveryPackages";

type PresetType = "ready" | "growth" | "strategic" | "enterprise";

const PACKAGE_PRESETS: Record<PresetType, DeliveryInput> = {
  ready: {
    packageType: "Ready Revenue Asset™",
    deliveryModel: "Implementation Review",
    licenseType: "Commercial License",
  },
  growth: {
    packageType: "Growth Asset™",
    deliveryModel: "Validation & Transfer Review",
    licenseType: "Extended Commercial License",
  },
  strategic: {
    packageType: "Strategic Asset™",
    deliveryModel: "Blueprint & IP Review",
    licenseType: "Strategic Use License",
  },
  enterprise: {
    packageType: "Enterprise White Label™",
    deliveryModel: "Private White Label Review",
    licenseType: "Enterprise License",
  },
};

const DELIVERY_COPY: Record<
  PresetType,
  {
    title: string;
    subtitle: string;
    bestFor: string;
    note: string;
  }
> = {
  ready: {
    title: "Ready Application",
    subtitle: "Ready Revenue Asset™",
    bestFor:
      "Companies that wish to deploy a functional solution with minimal preparation time.",
    note:
      "May include a functional application, initial configuration, available documentation, and commercial license subject to availability.",
  },
  growth: {
    title: "Growth Asset",
    subtitle: "Growth Asset™",
    bestFor:
      "Buyers looking for an advanced asset with expansion, adaptation, or commercial validation potential.",
    note:
      "May include a roadmap, existing architecture, available documentation, and materials associated with the asset's current state.",
  },
  strategic: {
    title: "Strategic Asset",
    subtitle: "Strategic Asset™",
    bestFor:
      "Teams that need to acquire structure, strategic direction, documentation, and conceptual intellectual property.",
    note:
      "May include ADN™, executive summary, roadmap, strategic documentation, and materials defined by scope.",
  },
  enterprise: {
    title: "Enterprise White Label",
    subtitle: "Enterprise White Label™",
    bestFor:
      "Companies that wish to operate, adapt, or distribute an asset under a private or proprietary brand model.",
    note:
      "May include available code, extended license, transferable materials, and special conditions based on agreement.",
  },
};

const DELIVERY_FLOW = [
  "Request",
  "Review",
  "Confirmation",
  "Agreement",
  "Transfer",
  "Delivery",
];

export default function DeliveryPage() {
  const [selectedPreset, setSelectedPreset] = useState<PresetType>("ready");
  const formData = PACKAGE_PRESETS[selectedPreset];

  const deliveryResult = useMemo(() => {
    return generateDeliveryPackage(formData);
  }, [formData]);

  const selectedCopy = DELIVERY_COPY[selectedPreset];

  return (
    <main id="delivery-page" className="bg-white text-neutral-900 px-6 py-24 md:px-12">
      <section className="mx-auto max-w-6xl">
        <header className="mb-20 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-900">
            <Truck className="h-3.5 w-3.5" aria-hidden="true" />
            Delivery Preview™
          </span>

          <h1 className="mx-auto mb-5 max-w-4xl text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl">
            Delivery preview for enterprise assets.
          </h1>

          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-neutral-500 sm:text-lg">
            Review what each acquisition modality can include before requesting a formal review of availability, scope, and transfer.
          </p>
        </header>

        <section className="mb-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {(["ready", "growth", "strategic", "enterprise"] as PresetType[]).map(
              (type) => {
                const copy = DELIVERY_COPY[type];
                const isActive = selectedPreset === type;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedPreset(type)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      isActive
                        ? "border-neutral-950 bg-neutral-950 text-white"
                        : "border-neutral-200 bg-neutral-50 text-neutral-900 hover:border-neutral-400"
                    }`}
                  >
                    <span
                      className={`mb-2 block text-[10px] font-bold uppercase tracking-widest ${
                        isActive ? "text-neutral-400" : "text-neutral-400"
                      }`}
                    >
                      {copy.subtitle}
                    </span>

                    <h2 className="text-sm font-black uppercase tracking-tight">
                      {copy.title}
                    </h2>

                    <p
                      className={`mt-3 text-[11px] font-light leading-relaxed ${
                        isActive ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      {copy.bestFor}
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-4">
            <section className="rounded-3xl border border-neutral-200 bg-neutral-50 p-7">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Selected Modality
              </span>

              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-950">
                {selectedCopy.title}
              </h2>

              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-400">
                {deliveryResult.purchaseType}
              </p>

              <p className="mt-5 text-sm font-light leading-relaxed text-neutral-600">
                {selectedCopy.note}
              </p>

              <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Estimated Window
                </span>

                <span className="mt-1 block text-sm font-black text-neutral-950">
                  {deliveryResult.estimatedDelivery}
                </span>
              </div>
            </section>

            <section className="rounded-3xl border border-neutral-800 bg-neutral-950 p-7 text-white">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Conditional Scope
                </span>
              </div>

              <p className="text-xs font-light leading-relaxed text-neutral-300">
                This view is a commercial reference. The final elements depend on the acquired modality, asset availability, prior validation, and corresponding transfer agreement.
              </p>

              <Link
                to="/transaction-protection"
                className="mt-5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white hover:underline"
              >
                View Transaction Protection™
                <ArrowRight className="h-3 w-3" />
              </Link>
            </section>
          </aside>

          <section className="space-y-8 lg:col-span-8">
            <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
              <header className="mb-8 border-b border-neutral-100 pb-8">
                <div className="mb-4 flex items-center gap-2">
                  <Package className="h-6 w-6 text-neutral-900" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Delivery Scope Preview™
                  </span>
                </div>

                <h3 className="max-w-2xl text-3xl font-extrabold tracking-tight text-neutral-950">
                  What the buyer can receive under this modality.
                </h3>

                <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-neutral-500">
                  ProjectApps™ structures each delivery based on the asset type, license, real state of the project, and scope agreed upon before transfer.
                </p>
              </header>

              <section className="space-y-10">
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-neutral-950">
                    <Layers className="h-4 w-4 text-neutral-700" />
                    Elements that may be included
                  </h4>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {deliveryResult.includedAssets.map((asset) => (
                      <div
                        key={asset}
                        className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
                      >
                        <CheckCircle className="h-4 w-4 shrink-0 text-neutral-900" />
                        <span className="text-xs font-bold text-neutral-700">
                          {asset}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-8">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-neutral-950">
                    <BookOpen className="h-4 w-4 text-neutral-700" />
                    Possible operational scope
                  </h4>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <ScopeCard
                      eyebrow="Implementation"
                      title="Deployment review"
                      included={deliveryResult.implementationIncluded}
                    />

                    <ScopeCard
                      eyebrow="Documentation"
                      title="Existing material"
                      included={deliveryResult.documentationIncluded}
                    />

                    <ScopeCard
                      eyebrow="Advisory"
                      title="Support per scope"
                      included={deliveryResult.supportIncluded}
                    />
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-8">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-neutral-950">
                    <HeartHandshake className="h-4 w-4 text-neutral-700" />
                    Delivery Process
                  </h4>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
                    {DELIVERY_FLOW.map((step, index) => (
                      <div
                        key={step}
                        className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-center"
                      >
                        <span className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-bold text-white">
                          {index + 1}
                        </span>

                        <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-700">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-xs font-light leading-relaxed text-neutral-600">
                    {deliveryResult.handoverProtocol}. Final delivery is defined solely after validating availability, license conditions, and specific scope of the asset.
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-8">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-neutral-950">
                    <FileCode className="h-4 w-4 text-neutral-700" />
                    What is not automatically promised
                  </h4>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ExclusionItem text="Does not include new features unless specifically agreed." />
                    <ExclusionItem text="Does not guarantee final production if the asset is Project ZIP™." />
                    <ExclusionItem text="Does not include hosting, domain, or external payments by default." />
                    <ExclusionItem text="Does not deliver confidential materials before commercial validation." />
                  </div>
                </div>
              </section>
            </article>

            <nav className="flex flex-wrap items-center justify-between gap-4 pb-10">
              <Link
                to="/what-you-receive"
                className="rounded-xl bg-neutral-100 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-800 transition hover:bg-neutral-200"
              >
                See what the buyer receives
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-1.5 rounded-xl bg-neutral-950 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800"
              >
                Request Delivery Review
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </nav>
          </section>
        </div>
      </section>
    </main>
  );
}

function ScopeCard({
  eyebrow,
  title,
  included,
}: {
  eyebrow: string;
  title: string;
  included: boolean;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
      <div>
        <span className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400">
          {eyebrow}
        </span>

        <span className="mt-1 block text-xs font-bold text-neutral-800">
          {title}
        </span>
      </div>

      <div className="mt-4">
        {included ? (
          <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-800">
            May apply
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase text-neutral-500">
            Per scope
          </span>
        )}
      </div>
    </div>
  );
}

function ExclusionItem({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <span className="text-xs font-light leading-relaxed text-neutral-600">
        {text}
      </span>
    </div>
  );
}