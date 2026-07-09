import { Shield, Sparkles, FolderKanban, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingSection() {
  return (
    <section id="landing-features" className="py-20 bg-neutral-50 border-t border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div id="landing-header" className="text-center mb-16">
          <h2 id="landing-title" className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-4">
            Estructura Comercial Oficial de Activos
          </h2>
          <p id="landing-subtitle" className="text-lg text-neutral-500 max-w-2xl mx-auto font-light">
            Nuestros paquetes digitales listos para operar se distribuyen en tres capas optimizadas para la viabilidad de cualquier tamaño de negocio.
          </p>
        </div>
        
        <div id="landing-grid" className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Hero Layer */}
          <div id="layer-hero" className="space-y-4 bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
            <div className="p-2 w-10 h-10 rounded bg-neutral-100 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-neutral-900" />
            </div>
            <h3 id="layer-hero-title" className="text-lg font-bold text-neutral-900">Hero Layer™</h3>
            <p id="layer-hero-desc" className="text-neutral-600 leading-relaxed text-xs">
              Activos optimizados de visibilidad express y respuesta ágil en cumplimiento que se acoplan en cualquier stack inicial.
            </p>
            <div className="pt-2 border-t border-neutral-100 space-y-1.5">
              <span className="text-[10px] font-bold text-neutral-400 block uppercase tracking-widest">Activos Incluidos:</span>
              <ul className="text-xs text-neutral-700 space-y-1 font-medium">
                <li>• CertiRapid™</li>
                <li>• VisibilityOS™</li>
                <li>• LaunchQuick™</li>
              </ul>
            </div>
          </div>

          {/* Ready Layer */}
          <div id="layer-ready" className="space-y-4 bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
            <div className="p-2 w-10 h-10 rounded bg-neutral-100 flex items-center justify-center">
              <Shield className="h-6 w-6 text-neutral-900" />
            </div>
            <h3 id="layer-ready-title" className="text-lg font-bold text-neutral-900">Ready Layer™</h3>
            <p id="layer-ready-desc" className="text-neutral-600 leading-relaxed text-xs">
              Módulos empresariales completos y blueprints de infraestructura robusta listos para escalar operaciones complejas.
            </p>
            <div className="pt-2 border-t border-neutral-100 space-y-1.5">
              <span className="text-[10px] font-bold text-neutral-400 block uppercase tracking-widest">Activos Incluidos:</span>
              <ul className="text-xs text-neutral-700 space-y-1 font-medium">
                <li>• ScanSentinel™</li>
                <li>• BuildReady™</li>
                <li>• ForgeBlueprint™</li>
                <li>• BuyProof™</li>
              </ul>
            </div>
          </div>

          {/* Portfolio Layer */}
          <div id="layer-portfolio" className="space-y-4 bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
            <div className="p-2 w-10 h-10 rounded bg-neutral-100 flex items-center justify-center">
              <FolderKanban className="h-6 w-6 text-neutral-900" />
            </div>
            <h3 id="layer-portfolio-title" className="text-lg font-bold text-neutral-900">Portfolio Layer™</h3>
            <p id="layer-portfolio-desc" className="text-neutral-600 leading-relaxed text-xs">
              Código fuente patentable y activos de propiedad intelectual exclusivos concebidos con alta sofisticación comercial.
            </p>
            <div className="pt-2 border-t border-neutral-100 space-y-1.5">
              <span className="text-[10px] font-bold text-neutral-400 block uppercase tracking-widest">Activos Incluidos:</span>
              <ul className="text-xs text-neutral-700 space-y-1 font-medium">
                <li>• Growth Assets™</li>
                <li>• Strategic Assets™</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/solution-match"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded"
          >
            <CheckCircle className="h-4 w-4" /> Encontrar Mi Solución
          </Link>
        </div>
      </div>
    </section>
  );
}
