import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, FileCheck, Landmark, ShieldAlert, ArrowRight, BookOpen, Layers, Terminal, Sparkles, AlertCircle } from "lucide-react";

export default function FAQPage() {
  const sections = [
    {
      title: "Acquisition",
      icon: BookOpen,
      questions: [
        {
          q: "What exactly does the buyer acquire?",
          a: "Depending on the selected asset, the buyer may acquire a commercial license, an extended license, or access to transfer models available for certain categories."
        },
        {
          q: "How is an acquisition initiated?",
          a: "By submitting an availability request through the platform."
        },
        {
          q: "Is there a monthly subscription?",
          a: "No. ProjectApps™ does not operate under a recurring SaaS model."
        }
      ]
    },
    {
      title: "Project ZIP™",
      icon: Layers,
      questions: [
        {
          q: "What is a Project ZIP™?",
          a: "It represents the transfer of the actual available state of an existing business project."
        },
        {
          q: "What is included?",
          a: "Available code, project structure, existing documentation, and associated technical materials at the time of transfer."
        },
        {
          q: "Does it include new features?",
          a: "No. It reflects the actual state of the project at the time of acquisition."
        }
      ]
    },
    {
      title: "Implementation",
      icon: Landmark,
      questions: [
        {
          q: "Does it include hosting?",
          a: "No. The buyer maintains complete control of their infrastructure."
        },
        {
          q: "Does it include a domain?",
          a: "No."
        },
        {
          q: "Does it include deployment?",
          a: "It depends on the asset and the selected commercial model."
        }
      ]
    },
    {
      title: "Source Code",
      icon: Terminal,
      questions: [
        {
          q: "Can I acquire the source code?",
          a: "Certain categories allow access to source code transfer models."
        },
        {
          q: "Can I modify the asset?",
          a: "Modification rights depend on the acquired license or model."
        },
        {
          q: "Is there any dependency on ProjectApps™ servers?",
          a: "No. Assets are designed to minimize unnecessary external dependencies."
        }
      ]
    },
    {
      title: "Licensing",
      icon: Sparkles,
      questions: [
        {
          q: "What types of licenses are available?",
          a: "Commercial, extended, and exclusive licenses, as well as special models depending on availability."
        },
        {
          q: "Can I acquire exclusivity?",
          a: "Some assets support exclusive ownership models, subject to availability."
        },
        {
          q: "Can I request white-labeling?",
          a: "Yes, under specific categories and commercial terms."
        }
      ]
    }
  ];

  return (
    <div id="faq-page-container" className="bg-white text-neutral-900 pb-24 selection:bg-neutral-900 selection:text-white">
      
      {/* HERO SECTION */}
      <section id="faq-hero" className="pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto text-center space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full">
          Frequently Asked Questions
        </span>
        <h1 id="faq-hero-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
          Frequently Asked Questions
        </h1>
        <p id="faq-hero-subtitle" className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
          Everything related to licensing, digital assets, Project ZIP™, transfer, and acquisition.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/acquisition-process"
            className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded border border-transparent hover:bg-neutral-800 transition"
          >
            View Acquisition Process
          </Link>
          <Link
            to="/what-you-receive"
            className="px-6 py-2.5 bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded border border-transparent hover:bg-neutral-200 transition"
          >
            What Buyers Receive
          </Link>
        </div>
      </section>

      {/* CORE FAQ SECTIONS */}
      <section id="faq-body" className="px-6 md:px-12 max-w-4xl mx-auto space-y-16">
        {sections.map((section, sIdx) => {
          const SectionIcon = section.icon;
          return (
            <div key={sIdx} id={`faq-section-${sIdx}`} className="space-y-6 border-t border-neutral-150 pt-10 first:border-0 first:pt-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-neutral-100 text-neutral-900 rounded shrink-0">
                  <SectionIcon className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-black uppercase tracking-wider text-neutral-950">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-6">
                {section.questions.map((item, qIdx) => (
                  <div key={qIdx} className="space-y-2">
                    <h3 className="text-base font-bold text-neutral-900 flex items-start gap-2.5">
                      <span className="text-xs font-mono text-neutral-400 mt-1 font-bold">Q.</span>
                      {item.q}
                    </h3>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed pl-6">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA FINAL FAQ */}
      <section id="faq-cta" className="py-20 px-6 md:px-12 max-w-5xl mx-auto mt-16">
        <div className="bg-neutral-900 text-white rounded-xl p-8 md:p-16 text-center space-y-6 relative overflow-hidden border border-neutral-800">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Didn't find the answer?
            </h3>
            <p className="text-xs md:text-sm text-neutral-300 font-light leading-relaxed">
              Submit a request and our team will review your case.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider rounded hover:bg-neutral-100 transition inline-flex items-center gap-2 whitespace-nowrap"
              >
                Contact Acquisitions <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/acquisition-process"
                className="px-6 py-3 bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 text-xs font-bold uppercase tracking-wider rounded transition whitespace-nowrap"
              >
                View Acquisition Process
              </Link>
              <Link
                to="/what-you-receive"
                className="px-6 py-3 bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-bold uppercase tracking-wider rounded transition whitespace-nowrap"
              >
                What Buyers Receive
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
