import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function HeroSection() {
  const { user } = useAuth();

  const solutionMatchPath = user
    ? "/solution-match"
    : "/login?redirect=/solution-match";

  return (
    <section
      id="hero-section"
      aria-labelledby="hero-title"
      className="mx-auto max-w-6xl px-6 py-24 text-center md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <span className="mb-7 inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900 sm:text-xs">
          <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
          Private Business Asset Marketplace™
        </span>

        <h1
          id="hero-title"
          className="text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-950 sm:text-5xl md:text-7xl"
        >
          Before building business software from scratch,{" "}
          <span className="font-serif font-medium text-neutral-500">
            find out whether a ready-to-acquire solution already exists.
          </span>
        </h1>

        <p
          id="hero-subtitle"
          className="mx-auto mt-7 max-w-3xl text-lg font-light leading-relaxed text-neutral-600 sm:text-xl"
        >
          ProjectApps™ helps companies discover and evaluate business software
          assets available for acquisition, adaptation, or deployment—reducing
          development time, unnecessary cost, and execution risk.
        </p>

        <div
          id="hero-actions"
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            id="hero-primary-cta"
            to={solutionMatchPath}
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-neutral-950 bg-neutral-950 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            Find a Matching Solution
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>

          <Link
            id="hero-secondary-cta"
            to="/portfolio"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-neutral-300 bg-white px-7 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-800 transition-colors duration-200 hover:border-neutral-500 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            Explore Available Assets
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-neutral-400">
          Compare existing alternatives before committing budget, technical
          capacity, and months of internal development.
        </p>
      </div>
    </section>
  );
}
