import React from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Clock, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Code, 
  FileText, 
  FolderArchive, 
  Info, 
  Gem,
  Award
} from "lucide-react";

export default function WhatYouReceivePage() {
  return (
    <div id="what-you-receive-page" className="bg-white text-neutral-900 pb-24 selection:bg-neutral-900 selection:text-white">
      
      {/* HERO SECTION */}
      <section id="receive-hero" className="pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto text-center space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full">
          Delivery Transparency & Clarity
        </span>
        <h1 id="receive-hero-title" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950 leading-tight">
          What Buyers Receive
        </h1>
        <p id="receive-hero-subtitle" className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
          We explain transparently what each acquisition modality can include so that your engineering team can make informed decisions.
        </p>
      </section>

      {/* CORE CARDS (EDITORIAL APPLE STYLE, LARGE SPACING) */}
      <section id="receive-tiers" className="px-6 md:px-12 max-w-5xl mx-auto space-y-16">
        
        {/* Tier 1: Ready Revenue Asset™ */}
        <div id="tier-ready-revenue" className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center hover:border-neutral-300 transition duration-155">
          <div className="md:col-span-5 space-y-4">
            <div className="p-3 bg-white w-12 h-12 rounded-xl text-neutral-950 border border-neutral-200 flex items-center justify-center">
              <Gem className="h-6 w-6 text-neutral-800" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-950">
              Ready Revenue Asset™
            </h2>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              Turnkey solution for accelerated operations. Conceived for organizations that prioritize an express launch with real-world tested logic.
            </p>
          </div>
          <div className="md:col-span-7 bg-white border border-neutral-150 p-6 md:p-8 rounded-xl space-y-4">
            <span className="text-[10px] font-mono text-neutral-400 font-black block uppercase tracking-widest">
              PACKAGE COMPONENTS
            </span>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Functional Application</strong>
                  <span className="text-xs text-neutral-500 font-light">Interactive and functional structure ready for deployment on your own cloud or local server.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Guided Initial Setup</strong>
                  <span className="text-xs text-neutral-500 font-light">Simplified scripts or guidelines to launch the application quickly and optimally.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Basic Documentation</strong>
                  <span className="text-xs text-neutral-500 font-light">Explanatory manual detailing the file architecture and required dependencies.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Standard Commercial License</strong>
                  <span className="text-xs text-neutral-500 font-light">Perpetual right to operate the software within your organization with no recurring fees.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Tier 2: Growth Asset™ */}
        <div id="tier-growth-asset" className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center hover:border-neutral-300 transition duration-155">
          <div className="md:col-span-5 space-y-4">
            <div className="p-3 bg-white w-12 h-12 rounded-xl text-neutral-950 border border-neutral-200 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-neutral-800" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-950">
              Growth Asset™
            </h2>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              Logical modules focused on traction and stable data pipelines. Ideal for optimizing existing systems or automating complex conversion flows.
            </p>
          </div>
          <div className="md:col-span-7 bg-white border border-neutral-150 p-6 md:p-8 rounded-xl space-y-4">
            <span className="text-[10px] font-mono text-neutral-400 font-black block uppercase tracking-widest">
              PACKAGE COMPONENTS
            </span>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Advanced Structured Project</strong>
                  <span className="text-xs text-neutral-500 font-light">Code with a higher level of modularity and pipelines to process transactional flows.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Available Technical Roadmap</strong>
                  <span className="text-xs text-neutral-500 font-light">Guide with suggested milestones to drive future software evolution and improvements.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Existing Integration Architecture</strong>
                  <span className="text-xs text-neutral-500 font-light">Documented models of how logical APIs and data interact.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Associated Technical Materials</strong>
                  <span className="text-xs text-neutral-500 font-light">Additional logical resources and mocked validation databases.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Tier 3: Project ZIP™ */}
        <div id="tier-project-zip" className="bg-neutral-950 text-neutral-100 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-neutral-900">
          <div className="md:col-span-5 space-y-4">
            <div className="p-3 bg-neutral-905 w-12 h-12 rounded-xl text-white border border-neutral-800 flex items-center justify-center">
              <FolderArchive className="h-6 w-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Project ZIP™
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Raw and advanced source code exactly as originally written. Designed exclusively for trained engineers who demand self-management and perpetual code sovereignty.
            </p>
          </div>
          <div className="md:col-span-7 bg-neutral-900 border border-neutral-805 p-6 md:p-8 rounded-xl space-y-4">
            <span className="text-[10px] font-mono text-neutral-450 font-black block uppercase tracking-widest">
              PACKAGE COMPONENTS
            </span>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-100 block font-bold">Real Work-in-Progress Source Code</strong>
                  <span className="text-xs text-neutral-400 font-light">Clean and modular logic without closed binaries, ready for direct download.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-100 block font-bold">Repository Assets & Resources</strong>
                  <span className="text-xs text-neutral-400 font-light">Icons, compiled Tailwind styles, and basic environment variables.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-100 block font-bold">Logical Structure & Dependencies</strong>
                  <span className="text-xs text-neutral-400 font-light">Definition of base packages ready to run in Node or other runtimes.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Tier 4: Enterprise White Label™ */}
        <div id="tier-white-label" className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center hover:border-neutral-400 transition duration-155">
          <div className="md:col-span-5 space-y-4">
            <div className="p-3 bg-white w-12 h-12 rounded-xl text-neutral-950 border border-neutral-200 flex items-center justify-center">
              <Award className="h-6 w-6 text-neutral-900" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-950">
              Enterprise White Label™
            </h2>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              The ultimate commercial freedom. Authorizes complete rebranding of the software, custom logo replacement, third-party resale, or perpetual sub-licensing with no subsequent fees.
            </p>
          </div>
          <div className="md:col-span-7 bg-white border border-neutral-150 p-6 md:p-8 rounded-xl space-y-4">
            <span className="text-[10px] font-mono text-neutral-400 font-black block uppercase tracking-widest">
              PACKAGE COMPONENTS
            </span>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Source Code with Multi-Brand Support</strong>
                  <span className="text-xs text-neutral-500 font-light">Easily configurable to host multiple organizations under independent brands.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">White Label</strong>
                  <span className="text-xs text-neutral-500 font-light">Specific documentation explaining how to remove original credits and logos.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Extended Commercial License</strong>
                  <span className="text-xs text-neutral-500 font-light">Formalized agreement allowing unlimited commercialization or resale of the solution.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-neutral-900 mt-1 shrink-0" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Transfer Materials</strong>
                  <span className="text-xs text-neutral-500 font-light">Transfer under strict terms of total technological inheritance of intellectual property.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </section>

      {/* TRANSPARENCY DISCLAIMER */}
      <section id="transparency-disclaimer" className="py-12 px-6 md:px-12 max-w-4xl mx-auto mt-8">
        <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-xl flex items-start gap-4">
          <Info className="h-5 w-5 text-neutral-800 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider">Technical Scope Clarification</h4>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              The elements included in the final delivery strictly depend on the specific modality acquired under contract. Please review your formal quote in detail or contact a technical officer during the validation stage.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="receive-cta" className="py-12 px-6 md:px-12 max-w-5xl mx-auto mt-12">
        <div className="bg-neutral-900 text-white rounded-xl p-8 md:p-16 text-center space-y-6 relative overflow-hidden border border-neutral-800">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Ready to take the next step?
            </h3>
            <p className="text-xs md:text-sm text-neutral-300 font-light leading-relaxed">
              Start by evaluating portfolio compatibilities or request availability for a specific logical category of interest.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/pricing"
                className="px-6 py-3 bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider rounded hover:bg-neutral-100 transition inline-flex items-center gap-2"
              >
                See Full Catalog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 text-xs font-bold uppercase tracking-wider rounded transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
