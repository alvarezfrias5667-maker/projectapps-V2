import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Briefcase,
  Check,
  Code,
  Compass,
  Cpu,
  FileCode,
  FileText,
  FolderArchive,
  Layers,
  Lock,
  Network,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  const primaryPath = user ? "/solution-match" : "/login?redirect=/solution-match";
  const secondaryPath = user ? "/pricing" : "/login?redirect=/portfolio";

  const capabilities = [
    {
      title: "Sales & Revenue",
      desc: "Assets oriented toward reviewing business opportunities, sales signals, and potential monetization leaks.",
      result: "Enhanced commercial prioritization based on the scope of the evaluated asset.",
      icon: TrendingUp,
    },
    {
      title: "Operations",
      desc: "Structured systems for reviewing internal processes, repetitive tasks, and operational workflows.",
      result: "Useful foundation to evaluate efficiency, continuity, and the reduction of operational friction.",
      icon: Activity,
    },
    {
      title: "Marketing",
      desc: "Tools for analyzing acquisition, leads, campaigns, and growth signals.",
      result: "Better interpretation of acquisition opportunities and commercial tracking.",
      icon: Zap,
    },
    {
      title: "Security",
      desc: "Assets focused on review, traceability, risk control, and document trust.",
      result: "Greater clarity regarding events, logs, or risks based on implementation.",
      icon: Lock,
    },
    {
      title: "Content",
      desc: "Systems to organize, package, and manage digital materials or creative assets.",
      result: "Clearer structure for reviewing distribution, licensing, or internal usage.",
      icon: Users,
    },
    {
      title: "Commerce",
      desc: "Assets related to orders, commercial processes, catalogs, billing, or transactional flows.",
      result: "Optimized organization of the commercial flow depending on the use case.",
      icon: ShoppingBag,
    },
    {
      title: "Infrastructure",
      desc: "Technical foundations, connectors, or platform structures available for evaluation.",
      result: "Technical starting point for review, adaptation, or continuity.",
      icon: Network,
    },
    {
      title: "Education",
      desc: "Portals, knowledge structures, and materials oriented toward training or internal documentation.",
      result: "Better organization of learning and knowledge transfer.",
      icon: BookOpen,
    },
    {
      title: "Documents",
      desc: "Tools to generate, organize, or review enterprise documents and internal reports.",
      result: "Reduction of document friction based on rules and asset scope.",
      icon: FileCode,
    },
    {
      title: "Business Intelligence",
      desc: "Analysis, classification, or decision engines to turn information into actionable insights.",
      result: "Improved visibility over data, signals, or business priorities.",
      icon: Cpu,
    },
  ];

  const deliverables = [
    {
      title: "Available Application",
      desc: "Reviewable asset in its current state, subject to scope, availability, and technical validation.",
      icon: Layers,
    },
    {
      title: "Available Code",
      desc: "Existing technical material for review, continuity, or adaptation depending on the acquired model.",
      icon: Code,
    },
    {
      title: "Existing Documentation",
      desc: "Guides, notes, or materials available depending on the advancement level of the asset.",
      icon: FileText,
    },
    {
      title: "Applicable License",
      desc: "Terms of use subject to commercial scope, agreed terms, and availability.",
      icon: ShieldCheck,
    },
    {
      title: "White Label Option",
      desc: "Possible white-label option subject to private review and corresponding agreement.",
      icon: Sparkles,
    },
    {
      title: "Available Roadmap",
      desc: "Milestones, improvements, or pending tasks documented when included with the asset.",
      icon: BookOpen,
    },
    {
      title: "Transferable Materials",
      desc: "Asset elements available for transfer according to contract, scope, and model.",
      icon: Briefcase,
    },
    {
      title: "Transfer Process",
      desc: "Structured review of materials, delivery method, and continuity steps.",
      icon: Network,
    },
  ];

  const exampleScenarios = [
    {
      problem:
        "A company needs to reduce evaluation time before building an internal tool from scratch.",
      solution:
        "Reviews an available asset from the Operations department to determine if it can serve as an initial technical foundation.",
      result:
        "Expected outcome: identify whether to acquire, adapt, or discard the asset before investing in full-scale development.",
    },
    {
      problem:
        "A technical team seeks an advanced foundation to accelerate a security or traceability solution.",
      solution:
        "Evaluates a Project ZIP™ with an existing structure, available documentation, and identifiable technical debt.",
      result:
        "Expected outcome: make an informed decision on continuity, adaptation, or integration under their own team.",
    },
  ];

  const comparison = [
    {
      metric: "Evaluation Time",
      build: "Requires discovering scope, architecture, and viability from scratch.",
      acquire: "Review of existing assets.",
    },
    {
      metric: "Initial Cost",
      build: "May require high investment before validating if the solution is suitable.",
      acquire: "Prior evaluation of an already structured foundation.",
    },
    {
      metric: "Technical Risk",
      build: "Higher uncertainty regarding scope, dependencies, and actual timelines.",
      acquire: "Technical foundation available for evaluation.",
    },
    {
      metric: "Commercial Model",
      build: "Depends on proprietary development, vendors, or ongoing consulting.",
      acquire: "Acquisition model according to agreement.",
    },
  ];

  return (
    <div
      id="premium-home-page"
      className="min-h-screen overflow-x-hidden bg-white font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white"
    >
      <section
        id="elegant-hero"
        className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center justify-center space-y-10 px-6 pb-24 pt-32 text-center md:px-12"
      >
        <span
          id="hero-mini-tag"
          className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-neutral-900"
        >
          <Sparkles className="h-3.5 w-3.5 text-neutral-950" />
          Private Business Asset Marketplace™
        </span>

        <h1
          id="hero-display-head"
          className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-6xl md:text-7xl"
        >
          Explore enterprise software assets.
          <br />
          <span className="font-serif font-light text-neutral-500">
            Evaluate before building from scratch.
          </span>
        </h1>

        <p
          id="hero-subhead"
          className="max-w-3xl text-lg font-light leading-relaxed text-neutral-500 md:text-xl"
        >
          Explore enterprise software assets available for evaluation, acquisition, or transfer based on scope,
          availability, and applicable commercial terms.
        </p>

        <div id="hero-cta-group" className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            id="hero-primary-cta"
            to={primaryPath}
            className="inline-flex items-center gap-2 rounded bg-neutral-900 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all duration-150 hover:bg-neutral-800"
          >
            Find my solution <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            id="hero-secondary-cta"
            to={secondaryPath}
            className="rounded border border-neutral-200 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-800 transition-all duration-150 hover:bg-neutral-50"
          >
            Explore portfolio
          </Link>
        </div>

        <div
          id="hero-meta-footer"
          className="space-x-2 pt-6 font-mono text-xs uppercase tracking-wider text-neutral-400"
        >
          <span>Explore</span>
          <span className="text-neutral-300">•</span>
          <span>Evaluate</span>
          <span className="text-neutral-300">•</span>
          <span>Request Availability</span>
          <span className="text-neutral-300">•</span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-bold text-neutral-900">
            Project ZIP™
          </span>
        </div>
      </section>

      <section
        id="why-projectapps"
        className="border-y border-neutral-200 bg-neutral-50 px-6 py-24 md:px-12"
      >
        <div className="mx-auto max-w-4xl space-y-8">
          <span className="block font-mono text-[10px] font-black uppercase tracking-widest text-neutral-400">
            01. Evaluation before building
          </span>

          <h2
            id="why-title"
            className="text-3xl font-extrabold leading-tight tracking-tight text-neutral-950 md:text-5xl"
          >
            ProjectApps™ helps review structured digital assets before investing time and capital building
            from scratch.
          </h2>

          <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">
            <p className="text-sm font-light leading-relaxed text-neutral-500 md:text-base">
              <strong>ProjectApps™</strong> exists to reduce the evaluation and acquisition time of enterprise digital assets,
              allowing you to review structured options before building from scratch.
            </p>

            <p className="text-sm font-light leading-relaxed text-neutral-500 md:text-base">
              The objective is not to promise universal software or automatic results. The objective is to facilitate a clear
              process to explore, evaluate, and request asset availability based on actual scope.
            </p>
          </div>
        </div>
      </section>

      <section id="capabilities-section" className="mx-auto max-w-6xl space-y-12 px-6 py-24 md:px-12">
        <div className="space-y-2 text-center md:text-left">
          <span className="block font-mono text-[10px] font-black uppercase tracking-widest text-neutral-400">
            02. Portfolio Categories
          </span>

          <h2 id="capabilities-title" className="text-3xl font-extrabold tracking-tight text-neutral-900">
            Available Capabilities for Review
          </h2>

          <p className="max-w-xl text-sm font-light text-neutral-500">
            Each category groups enterprise software assets that can be evaluated based on need, availability, and commercial model.
          </p>
        </div>

        <div id="capabilities-grid" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, idx) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.title}
                id={`capability-card-${idx}`}
                className="group flex flex-col justify-between space-y-6 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-200 hover:border-neutral-400"
              >
                <div className="space-y-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-2.5 text-neutral-950">
                    <IconComponent className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-950">
                    {item.title}
                  </h3>

                  <p className="text-xs font-light leading-relaxed text-neutral-500">
                    {item.desc}
                  </p>
                </div>

                <div className="space-y-3 border-t border-neutral-100 pt-4">
                  <div className="space-y-1">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                      Possible outcome:
                    </span>

                    <p className="text-xs font-medium leading-relaxed text-neutral-800">
                      {item.result}
                    </p>
                  </div>

                  <Link
                    to="/solution-match"
                    className="inline-flex items-center gap-1 pt-2 text-[11px] font-black text-neutral-900 hover:underline"
                  >
                    Check availability <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="home-project-zip"
        className="relative overflow-hidden border-y border-neutral-900 bg-neutral-950 px-6 py-24 text-neutral-100 md:px-12"
      >
        <div className="absolute right-0 top-0 p-8 opacity-[0.03]">
          <FolderArchive className="h-64 w-64" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-200">
            <FolderArchive className="h-3.5 w-3.5 text-amber-400" />
            Direct delivery format
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Project ZIP™
            <br />
            <span className="mt-1 block font-serif text-2xl font-light text-neutral-400 md:text-4xl">
              Technical structure in its actual state of progress
            </span>
          </h2>

          <p className="max-w-3xl text-sm font-light leading-relaxed text-neutral-300 md:text-base">
            Project ZIP™ is a specific format for technical teams who wish to review an existing foundation and continue its development. It allows for review and continuity under your technical team's control.
          </p>

          <div className="grid grid-cols-1 gap-4 pt-4 text-xs sm:grid-cols-2">
            {[
              {
                title: "Available Code",
                text: "Existing files subject to technical review, scope, and delivery terms.",
              },
              {
                title: "Current Structure",
                text: "Folders, assets, and dependencies available in the project's actual state.",
              },
              {
                title: "Available Documentation",
                text: "Existing guides or notes based on the asset's stage of development.",
              },
              {
                title: "Available Roadmap",
                text: "Milestones, pending items, or continuity suggestions when documented.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <span className="block font-semibold text-neutral-100">{item.title}</span>
                  <p className="mt-1 font-light leading-relaxed text-neutral-400">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-5 text-xs text-neutral-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <p className="leading-relaxed">
              <strong>Technical Scope Note:</strong> This format does not imply production-ready software, unlimited support, or unagreed additional integrations. The review must be carried out on the actual state of the asset and the agreed conditions.
            </p>
          </div>

          <Link
            to="/pricing"
            className="inline-block whitespace-nowrap rounded bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-neutral-950 transition hover:bg-neutral-100"
          >
            View Full Portfolio
          </Link>
        </div>
      </section>

      <section id="what-you-receive" className="mx-auto max-w-6xl space-y-12 px-6 py-24 md:px-12">
        <div className="space-y-2 text-center md:text-left">
          <span className="block font-mono text-[10px] font-black uppercase tracking-widest text-neutral-400">
            03. Possible Materials
          </span>

          <h2 id="receive-title" className="text-3xl font-extrabold tracking-tight text-neutral-900">
            What can an asset include?
          </h2>

          <p className="max-w-xl text-sm font-light text-neutral-500">
            Deliverables depend on the asset type, technical state, commercial terms, and transfer conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item, idx) => {
            const IconComp = item.icon;

            return (
              <div
                key={item.title}
                id={`receive-card-${idx}`}
                className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-6 transition-all duration-150 hover:-translate-y-0.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-neutral-200 bg-white p-2 text-neutral-900">
                  <IconComp className="h-4 w-4" />
                </div>

                <h3 className="text-sm font-bold text-neutral-900">{item.title}</h3>

                <p className="text-xs font-light leading-relaxed text-neutral-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="use-cases-section"
        className="border-y border-neutral-200 bg-neutral-50 px-6 py-24 md:px-12"
      >
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-1 text-center md:text-left">
            <span className="block font-mono text-[10px] font-black uppercase tracking-widest text-neutral-400">
              04. Example Scenarios
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Example Evaluation Scenarios
            </h2>

            <p className="text-sm font-light text-neutral-500">
              Illustrative scenarios to understand how an asset can be evaluated before acquisition or adaptation.
            </p>
          </div>

          <div className="space-y-12">
            {exampleScenarios.map((scenario, idx) => (
              <div
                key={scenario.problem}
                id={`case-study-${idx}`}
                className="grid grid-cols-1 items-start gap-8 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm md:grid-cols-12"
              >
                <div className="md:col-span-2">
                  <span className="inline-block rounded-md bg-neutral-950 px-3 py-1 font-mono text-[10px] font-bold text-white">
                    SCENARIO #{idx + 1}
                  </span>
                </div>

                <div className="space-y-6 md:col-span-10">
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Problem:
                    </span>

                    <p className="text-sm font-light leading-relaxed text-neutral-700">
                      {scenario.problem}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 border-t border-neutral-100 pt-2 sm:grid-cols-2">
                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        Possible Review:
                      </span>

                      <p className="text-xs leading-relaxed text-neutral-600">
                        {scenario.solution}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        Expected Outcome:
                      </span>

                      <p className="text-xs font-medium leading-relaxed text-neutral-700">
                        {scenario.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="build-vs-acquire" className="mx-auto max-w-5xl space-y-12 px-6 py-24 md:px-12">
        <div className="space-y-2 text-center md:text-left">
          <span className="block font-mono text-[10px] font-black uppercase tracking-widest text-neutral-400">
            05. Decision Comparison
          </span>

          <h2 id="compare-title" className="text-3xl font-extrabold tracking-tight text-neutral-900">
            Build from Scratch vs Evaluate Existing Assets
          </h2>

          <p className="max-w-md text-sm font-light text-neutral-500">
            Compare possible paths before committing budget, technical team, or months of development.
          </p>
        </div>

        <div id="compare-table" className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-50 p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            <div>Metric</div>
            <div>Build from Scratch</div>
            <div className="text-neutral-950">ProjectApps™</div>
          </div>

          <div className="divide-y divide-neutral-200 text-xs">
            {comparison.map((row) => (
              <div key={row.metric} className="grid grid-cols-3 items-center gap-4 p-5">
                <div className="font-bold text-neutral-900">{row.metric}</div>
                <div className="font-light text-neutral-500">{row.build}</div>
                <div className="rounded border border-neutral-100 bg-neutral-50 p-2 font-medium text-neutral-950">
                  {row.acquire}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="elegant-cta" className="mx-auto max-w-5xl px-6 py-20 md:px-12">
        <div className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-8 text-center text-white md:p-16">
          <div className="absolute right-0 top-0 p-8 opacity-[0.02]">
            <Compass className="h-60 w-60" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl space-y-4">
            <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
              Explore, evaluate and request availability
            </span>

            <h2 id="cta-title" className="text-2xl font-extrabold tracking-tight md:text-4xl">
              Find the Right Asset to Evaluate.
            </h2>

            <p id="cta-desc" className="text-sm font-light leading-relaxed text-neutral-300 md:text-base">
              Explore the portfolio or use Solution Match™ to identify which category fits your objectives best.
            </p>

            <div id="cta-buttons" className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                id="cta-primary-btn"
                to={primaryPath}
                className="whitespace-nowrap rounded bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 transition hover:bg-neutral-100"
              >
                Find My Solution
              </Link>

              <Link
                id="cta-secondary-btn"
                to={secondaryPath}
                className="whitespace-nowrap rounded border border-neutral-700 bg-neutral-800 px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-200 transition hover:text-white"
              >
                Explore Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
