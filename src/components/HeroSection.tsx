import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section id="hero-section" className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded-full mb-6">
        <Sparkles className="h-3 w-3" /> ProjectApps™ Private Business Asset Marketplace™
      </span>
      <h1 id="hero-title" className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 mb-6 leading-tight">
        Aplicaciones empresariales listas para implementar y <span className="text-neutral-600 font-medium font-serif">activos digitales validados</span> para acelerar resultados de negocio.
      </h1>
      <p id="hero-subtitle" className="text-xl text-neutral-500 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
        La primera plataforma de comercio de activos que conecta negocios maduros con propiedad intelectual y soluciones funcionales de entrega inmediata.
      </p>
      <div id="hero-actions" className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          id="hero-primary-cta"
          to="/solution-match"
          className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 border border-transparent text-sm font-semibold rounded-md text-white hover:bg-neutral-800 transition duration-155 ease-in-out uppercase tracking-wider"
        >
          Encontrar Mi Solución
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link
          id="hero-secondary-cta"
          to="/pricing"
          className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-sm font-semibold rounded-md text-neutral-700 bg-white hover:bg-neutral-50 transition duration-155 ease-in-out uppercase tracking-wider"
        >
          Explorar Portfolio
        </Link>
      </div>
    </section>
  );
}
