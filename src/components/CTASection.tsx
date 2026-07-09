import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section id="cta-section" className="py-20 bg-neutral-950 text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 id="cta-title" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          Encuentre el activo digital ideal para su crecimiento
        </h2>
        <p id="cta-subtitle" className="text-lg text-neutral-400 max-w-2xl mx-auto mb-8 font-light">
          Compare diferentes capas de licenciamiento y descubra mediante nuestro Solution Match™ el software exacto que de respuesta a sus requerimientos en minutos.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            id="cta-primary-btn"
            to="/solution-match"
            className="inline-block px-8 py-3 bg-white text-neutral-950 font-bold uppercase tracking-wider text-xs rounded hover:bg-neutral-100 transition duration-155 ease-in-out"
          >
            Encontrar Mi Solución
          </Link>
          <Link
            id="cta-secondary-btn"
            to="/pricing"
            className="inline-block px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded hover:bg-white/10 transition duration-155 ease-in-out"
          >
            Explorar Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
