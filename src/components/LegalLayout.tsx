import React from "react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div id="legal-layout-container" className="py-20 px-6 max-w-3xl mx-auto">
      <header className="border-b border-neutral-200 pb-6 mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
          Documento Informativo Comercial
        </span>
        <h1 id="legal-title" className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-2">{title}</h1>
        <p id="legal-updated" className="text-sm text-neutral-500">Última actualización: {lastUpdated}</p>
      </header>
      <article id="legal-body" className="prose prose-neutral max-w-none text-neutral-600 space-y-6 text-sm leading-relaxed">
        {children}
      </article>
    </div>
  );
}
