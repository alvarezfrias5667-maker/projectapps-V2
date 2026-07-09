import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SOLUTIONS } from "../data/solutionsData";
import {
  Activity,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Compass,
  Cpu,
  FolderArchive,
  Globe,
  Info,
  LayoutGrid,
  Lightbulb,
  Lock,
  Network,
  Shield,
  ShoppingBag,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

type SolutionAsset = (typeof SOLUTIONS)[number];

const portfolioCategories = [
  {
    friendlyName: "Sales & Revenue",
    techName: "Revenue Intelligence",
    desc: "Assets oriented toward detecting commercial leaks, prioritizing opportunities, and improving monetization decisions.",
    icon: TrendingUp,
  },
  {
    friendlyName: "Decision Making",
    techName: "Decision Intelligence",
    desc: "Systems designed to organize operational signals and convert them into actionable decisions.",
    icon: Cpu,
  },
  {
    friendlyName: "Market Opportunities",
    techName: "Opportunity Intelligence",
    desc: "Tools to identify gaps, unmet demands, and evaluable business opportunities.",
    icon: Lightbulb,
  },
  {
    friendlyName: "Operations & Engineering",
    techName: "Operations Intelligence",
    desc: "Assets to streamline internal processes, reduce operational friction, and improve technical execution.",
    icon: Activity,
  },
  {
    friendlyName: "Security & Compliance",
    techName: "Security & Trust Intelligence",
    desc: "Systems focused on traceability, risk control, operational review, and document trust.",
    icon: Lock,
  },
  {
    friendlyName: "Marketing & Acquisition",
    techName: "Marketing & Growth Intelligence",
    desc: "Assets to evaluate campaigns, improve acquisition, and detect useful growth signals.",
    icon: Zap,
  },
  {
    friendlyName: "Content & Creators",
    techName: "Creator Intelligence",
    desc: "Systems to organize, package, and manage digital content assets or intellectual property.",
    icon: Users,
  },
  {
    friendlyName: "Commerce & Transactions",
    techName: "Commerce Intelligence",
    desc: "Tools oriented toward streamlining commercial flows, payments, orders, and digital sales processes.",
    icon: ShoppingBag,
  },
  {
    friendlyName: "Industry Modules",
    techName: "Industry Intelligence",
    desc: "Vertical assets adaptable to specific sectors with pre-structured business logic.",
    icon: Globe,
  },
  {
    friendlyName: "Infrastructure & Platform",
    techName: "Infrastructure & Platform Intelligence",
    desc: "Technical components to support flows, connectors, internal modules, and proprietary digital experiences.",
    icon: Network,
  },
];

const assetStatusList = [
  {
    name: "Ready Asset™",
    desc: "Asset with advanced structure available for review, technical validation, and potential transfer.",
    className: "bg-neutral-100 text-neutral-900 border border-neutral-300",
  },
  {
    name: "Growth Asset™",
    desc: "Asset oriented toward commercial expansion, operational improvement, or accelerating existing processes.",
    className: "bg-neutral-50 text-neutral-800 border border-neutral-200",
  },
  {
    name: "Strategic Asset™",
    desc: "Model with distinct logic, designed for selective acquisition or strategic use.",
    className: "bg-white text-neutral-700 border border-neutral-200",
  },
  {
    name: "Project ZIP™",
    desc: "Code package in its actual state of progress, suitable for review by a technical team.",
    className: "bg-neutral-200 text-neutral-900 border border-neutral-300",
  },
  {
    name: "White Label Option™",
    desc: "Commercial model subject to review of scope, terms, licensing, and availability.",
    className: "bg-amber-50 text-amber-900 border border-amber-200",
  },
];

const useCases = [
  {
    problem: "Detect business opportunities before investing in full development.",
    category: "Sales & Revenue",
    status: "Ready Asset™",
  },
  {
    problem: "Organize customer signals, campaigns, or leads to prioritize useful actions.",
    category: "Marketing & Acquisition",
    status: "Growth Asset™",
  },
  {
    problem: "Review operational or technical risks with clearer logic for internal teams.",
    category: "Security & Compliance",
    status: "Strategic Asset™",
  },
  {
    problem: "Accelerate construction with an already structured codebase.",
    category: "Infrastructure & Platform",
    status: "Project ZIP™",
  },
  {
    problem: "Evaluate an adaptable asset for private label, integration, or commercial use.",
    category: "Commerce & Transactions",
    status: "White Label Option™",
  },
];

function getAssetPublicName(asset: SolutionAsset) {
  return asset.publicName || "ProjectApps™ Asset";
}

function getAssetPublicDescription(asset: SolutionAsset) {
  return asset.publicDescription || "Software asset available for commercial and technical review.";
}

function getAssetPublicCategory(asset: SolutionAsset) {
  return asset.publicCategory || "Category to be confirmed";
}

export default function PricingPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("favoriteAssetIds");
      if (saved) setFavoriteIds(JSON.parse(saved));
    } catch {
      setFavoriteIds([]);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const updated = favoriteIds.includes(id)
      ? favoriteIds.filter((favoriteId) => favoriteId !== id)
      : [...favoriteIds, id];

    setFavoriteIds(updated);
    localStorage.setItem("favoriteAssetIds", JSON.stringify(updated));
  };

  return (
    <div id="pricing-page" className="mx-auto max-w-6xl space-y-20 px-6 py-20 md:px-12">
      <header className="space-y-5 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-900">
          <Shield className="h-3.5 w-3.5" />
          Private Business Asset Marketplace™
        </span>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-5xl">
          Portfolio Marketplace™
        </h1>

        <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-neutral-500 md:text-lg">
          Explore software assets available for evaluation, acquisition, or technical transfer based on scope,
          availability, and applicable commercial conditions.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-3">
          <Link
            to="/solution-match"
            className="rounded border border-transparent bg-neutral-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800"
          >
            Find My Solution
          </Link>

          <Link
            to="/acquisition-process"
            className="rounded border border-neutral-300 bg-neutral-50 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-800 transition hover:bg-neutral-100"
          >
            How Acquisitions Work
          </Link>

          <a
            href="#portfolio-categories"
            className="rounded border border-neutral-200 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-800 transition hover:bg-neutral-50"
          >
            View Categories
          </a>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 rounded-xl border border-neutral-200 bg-neutral-50 p-6 md:grid-cols-3">
        {[
          {
            label: "01. What do you acquire?",
            title: "Software Asset",
            text: "Code, functional structure, or technical package subject to scope review and delivery terms.",
          },
          {
            label: "02. Why is it different?",
            title: "Evaluable foundation",
            text: "Allows you to start from an existing structure rather than beginning each implementation from scratch.",
          },
          {
            label: "03. How is it delivered?",
            title: "Documented transfer",
            text: "Delivery can be made as an application, module, technical blueprint, or Project ZIP™ depending on availability.",
          },
        ].map((item) => (
          <div key={item.label} className="space-y-1">
            <span className="font-mono text-[10px] font-black uppercase text-neutral-400">{item.label}</span>
            <h2 className="text-sm font-bold text-neutral-900">{item.title}</h2>
            <p className="text-xs font-light leading-relaxed text-neutral-500">{item.text}</p>
          </div>
        ))}
      </section>

      <section id="portfolio-inventory" className="space-y-6 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-5 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center gap-2 text-base font-black uppercase tracking-wider text-neutral-950">
              <LayoutGrid className="h-4 w-4" />
              Portfolio Inventory™
            </h2>
            <p className="mt-0.5 text-xs font-light text-neutral-500">
              Indicative commercial inventory of assets available for evaluation.
            </p>
          </div>

          <span className="rounded bg-neutral-900 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
            Availability subject to review
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {[
            ["Categories", "Business areas"],
            ["Ready Assets", "Available for review"],
            ["Growth Assets", "Available for review"],
            ["Strategic Assets", "Available for review"],
            ["Project ZIP™", "Available for review"],
          ].map(([title, subtitle]) => (
            <div key={title} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{title}</span>
              <div className="mt-3 text-right">
                <span className="block text-sm font-black text-neutral-950">{subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="asset-status" className="space-y-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Catalog Classification
          </span>
          <h2 className="text-xl font-extrabold tracking-tight text-neutral-900">Asset Status™</h2>
          <p className="text-xs font-light text-neutral-500">
            Each status describes the maturity level and likely format of the asset.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {assetStatusList.map((status) => (
            <div
              key={status.name}
              className="flex flex-col justify-between space-y-4 rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-400"
            >
              <div>
                <span className={`mb-3 inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase ${status.className}`}>
                  {status.name}
                </span>
                <p className="text-xs font-light leading-relaxed text-neutral-500">{status.desc}</p>
              </div>

              <Link
                to="/solution-match"
                className="inline-flex items-center gap-1 self-start text-[10px] font-bold text-neutral-800 hover:underline"
              >
                Filter type <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio-categories" className="scroll-mt-24 space-y-8">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Dominios tecnológicos
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">Portfolio Categories™</h2>
          <p className="max-w-2xl text-sm font-light text-neutral-500">
            Assets are grouped by business area to facilitate evaluation, comparison, and request for availability.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {portfolioCategories.map((cat) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.techName}
                className="flex flex-col justify-between space-y-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-neutral-400"
              >
                <div className="space-y-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded border border-neutral-200 bg-neutral-100 text-neutral-950">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase leading-tight tracking-wide text-neutral-950">
                      {cat.friendlyName}
                    </h3>
                    <span className="mt-0.5 block font-mono text-[9px] text-neutral-400">
                      {cat.techName}
                    </span>
                  </div>

                  <p className="pt-1 text-[11px] font-light leading-relaxed text-neutral-500">{cat.desc}</p>
                </div>

                <Link
                  to="/solution-match"
                  className="group mt-2 flex items-center gap-1 text-[10px] font-bold text-neutral-800 hover:text-neutral-950"
                >
                  Explore Portfolio
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section id="project-zip-section" className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-8 text-neutral-100 md:p-12">
        <div className="absolute right-0 top-0 p-8 opacity-5">
          <FolderArchive className="h-48 w-48" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            <FolderArchive className="h-3.5 w-3.5 text-amber-400" />
            Source Package Review
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Project ZIP™</h2>

          <p className="text-sm font-light leading-relaxed text-neutral-300">
            Project ZIP™ involves the delivery of a technical package in its actual state of progress. It is designed for teams that want to review, continue, or adapt an existing foundation.
          </p>

          <div className="grid grid-cols-1 gap-3 pt-2 text-xs sm:grid-cols-2">
            {[
              "Source code available",
              "Logical project structure",
              "Documentation available based on progress",
              "Identifiable technical debt",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded border border-neutral-800 bg-neutral-900 p-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                <span className="font-medium text-neutral-200">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2.5 rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-[11px] text-neutral-400">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <p className="leading-relaxed">
              <strong>Scope Note:</strong> The transfer of a Project ZIP™ reflects the exact state of the asset at the time of review or signing. It does not imply custom development, unlimited support, or an automatic production guarantee without prior technical validation.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-block rounded bg-neutral-100 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 transition hover:bg-neutral-200"
          >
            Request availability
          </Link>
        </div>
      </section>

      <section id="portfolio-scale" className="space-y-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Portfolio Scale
          </span>
          <h2 className="text-xl font-extrabold tracking-tight text-neutral-900">Portfolio Scale™</h2>
          <p className="text-xs font-light text-neutral-500">
            Structure prepared for commercial evaluation, technical review, and selective acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              label: "Distribution",
              title: "Intelligence Categories",
              text: "Assets segmented by business areas to facilitate navigation and selection.",
            },
            {
              label: "Commercial Models",
              title: "Acquisition Models™",
              text: "Options subject to scope, availability, rights included, and agreed conditions.",
            },
            {
              label: "Maturity Level",
              title: "Ready, Growth, Strategic & ZIP",
              text: "Each asset can be evaluated based on progress, utility, technical status, and buyer needs.",
            },
          ].map((item) => (
            <div key={item.title} className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
              <span className="block font-mono text-[9px] font-bold uppercase text-neutral-400">{item.label}</span>
              <span className="block text-lg font-black text-neutral-950">{item.title}</span>
              <p className="text-xs font-light leading-relaxed text-neutral-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio-examples" className="space-y-8 pt-4">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Practical Cases</span>
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
            Software Asset Use Cases
          </h2>
          <p className="max-w-2xl text-sm font-light text-neutral-500">
            Examples of problems that can be addressed through evaluable assets in the portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.problem}
              className="flex flex-col justify-between space-y-4 rounded-lg border border-neutral-200 bg-neutral-50 p-6 transition hover:bg-neutral-100"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded bg-neutral-950 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-white">
                    Case #{index + 1}
                  </span>
                  <span className="text-right text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    {useCase.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                    Problem:
                  </span>
                  <p className="text-xs font-light leading-relaxed text-neutral-700">{useCase.problem}</p>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-neutral-200 pt-3 text-[10px]">
                <span className="font-bold uppercase tracking-wider text-neutral-400">Status:</span>
                <span className="font-bold text-neutral-800">{useCase.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="assets-catalog" className="space-y-8 pt-12">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Corporate Asset Catalog
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
            Assets available for evaluation
          </h2>
          <p className="max-w-2xl text-sm font-light text-neutral-500">
            Explore public assets in the portfolio. Internal names, technical identifiers, and proprietary logic are not displayed on this page.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((asset) => {
            const isFavorite = favoriteIds.includes(asset.id);

            return (
              <article
                key={asset.id}
                className="group relative flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-6 transition hover:border-neutral-400"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded bg-neutral-950 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                      ProjectApps™ Asset
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(asset.id)}
                      className={`flex cursor-pointer items-center justify-center rounded-lg border p-2 transition ${
                        isFavorite
                          ? "border-neutral-950 bg-neutral-950 text-white"
                          : "border-neutral-200 bg-white text-neutral-400 hover:border-neutral-300 hover:text-neutral-900"
                      }`}
                      aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
                      title={isFavorite ? "Remove from favorites" : "Save to favorites"}
                    >
                      {isFavorite ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-black uppercase tracking-tight text-neutral-950">
                      {getAssetPublicName(asset)}
                    </h3>

                    <p className="mt-1 line-clamp-3 text-xs font-light leading-relaxed text-neutral-500">
                      {getAssetPublicDescription(asset)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-neutral-100 pt-3">
                  <div className="flex justify-between gap-3 text-[11px]">
                    <span className="font-medium text-neutral-400">Category:</span>
                    <span className="text-right font-bold text-neutral-800">{getAssetPublicCategory(asset)}</span>
                  </div>

                  {"expectedBenefit" in asset && asset.expectedBenefit ? (
                    <div className="flex justify-between gap-3 text-[11px]">
                      <span className="font-medium text-neutral-400">Possible outcome:</span>
                      <span className="text-right font-bold text-neutral-800">{asset.expectedBenefit}</span>
                    </div>
                  ) : null}

                  {"estimatedTime" in asset && asset.estimatedTime ? (
                    <div className="flex justify-between gap-3 text-[11px]">
                      <span className="font-medium text-neutral-400">Estimated Window:</span>
                      <span className="text-right font-bold text-neutral-800">{asset.estimatedTime}</span>
                    </div>
                  ) : null}
                </div>

                <Link
                  to="/contact"
                  className="w-full rounded bg-neutral-900 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800"
                >
                  Request availability
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-8 text-center text-white md:p-12">
        <div className="absolute right-0 top-0 p-8 opacity-5">
          <Compass className="h-40 w-40" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl space-y-4">
          <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Software Asset Evaluation
          </span>

          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Ready to evaluate an asset from the portfolio?
          </h2>

          <p className="text-sm font-light leading-relaxed text-neutral-300">
            Identify which asset fits your business best and request a review of availability, scope, and conditions.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/solution-match"
              className="rounded bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 transition hover:bg-neutral-100"
            >
              Find My Solution
            </Link>

            <Link
              to="/acquisition-process"
              className="rounded border border-neutral-700 bg-neutral-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-200 transition hover:text-white"
            >
              How Acquisitions Work
            </Link>

            <Link
              to="/contact"
              className="rounded border border-neutral-800 bg-neutral-950 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-400 transition hover:text-neutral-200"
            >
              Request availability
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}