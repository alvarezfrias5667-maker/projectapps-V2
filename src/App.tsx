import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";
import Footer from "./components/Footer";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Scroll to top on navigation path change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-neutral-900 group">
          <Globe className="h-5 w-5 text-neutral-800 transition-transform group-hover:rotate-12 duration-300" />
          <span className="font-extrabold tracking-wider text-xs sm:text-sm uppercase">
            PROJECTAPPS™
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <Link
            to="/pricing"
            className={`transition-colors duration-155 ${location.pathname === "/pricing" ? "text-neutral-950 font-bold" : "hover:text-neutral-950"}`}
          >
            Portfolio
          </Link>
          <Link
            to="/acquisition-process"
            className={`transition-colors duration-155 ${location.pathname === "/acquisition-process" ? "text-neutral-950 font-bold" : "hover:text-neutral-950"}`}
          >
            Process
          </Link>
          <Link
            to="/transaction-protection"
            className={`transition-colors duration-155 ${location.pathname === "/transaction-protection" ? "text-neutral-950 font-bold" : "hover:text-neutral-950"}`}
          >
            Protection
          </Link>
          <Link
            to="/faq"
            className={`transition-colors duration-155 ${location.pathname === "/faq" ? "text-neutral-950 font-bold" : "hover:text-neutral-950"}`}
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            className={`transition-colors duration-155 ${location.pathname === "/contact" ? "text-neutral-950 font-bold" : "hover:text-neutral-950"}`}
          >
            Contact
          </Link>
          {user ? (
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 bg-neutral-950 text-white hover:bg-neutral-800 rounded-lg transition duration-155 text-[10px] font-bold tracking-widest uppercase shrink-0"
            >
              Buyer Portal™
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-3.5 py-1.5 bg-neutral-100 text-neutral-950 hover:bg-neutral-200 rounded-lg transition duration-155 text-[10px] font-bold tracking-widest uppercase shrink-0 border border-neutral-200"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-neutral-800 focus:outline-none"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 py-4 px-6 space-y-3 flex flex-col text-xs font-semibold uppercase tracking-wider">
          <Link
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className={`py-1 ${location.pathname === "/pricing" ? "text-neutral-950 font-bold" : "text-neutral-500"}`}
          >
            Portfolio
          </Link>
          <Link
            to="/acquisition-process"
            onClick={() => setIsOpen(false)}
            className={`py-1 ${location.pathname === "/acquisition-process" ? "text-neutral-950 font-bold" : "text-neutral-500"}`}
          >
            Process
          </Link>
          <Link
            to="/transaction-protection"
            onClick={() => setIsOpen(false)}
            className={`py-1 ${location.pathname === "/transaction-protection" ? "text-neutral-950 font-bold" : "text-neutral-500"}`}
          >
            Protection
          </Link>
          <Link
            to="/faq"
            onClick={() => setIsOpen(false)}
            className={`py-1 ${location.pathname === "/faq" ? "text-neutral-950 font-bold" : "text-neutral-500"}`}
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={`py-1 ${location.pathname === "/contact" ? "text-neutral-950 font-bold" : "text-neutral-500"}`}
          >
            Contact
          </Link>
          {user ? (
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="py-2.5 px-4 bg-neutral-950 text-white rounded-lg text-center font-bold tracking-widest uppercase text-[10px]"
            >
              Buyer Portal™
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="py-2.5 px-4 bg-neutral-100 text-neutral-950 rounded-lg text-center font-bold tracking-widest uppercase text-[10px] border border-neutral-200"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans antialiased selection:bg-neutral-900 selection:text-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            {appRoutes.map((route) => {
              const Element = route.element;
              return (
                <Route
                  path={route.path}
                  element={
                    route.protected ? (
                      <ProtectedRoute>
                        <Element />
                      </ProtectedRoute>
                    ) : (
                      <Element />
                    )
                  }
                  {...({ key: route.path } as any)}
                />
              );
            })}
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
