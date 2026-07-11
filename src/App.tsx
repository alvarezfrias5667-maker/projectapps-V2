import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";

import Footer from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { appRoutes } from "./routes/appRoutes";

const navigationItems = [
  {
    label: "Portfolio",
    to: "/portfolio",
  },
  {
    label: "Process",
    to: "/acquisition-process",
  },
  {
    label: "Protection",
    to: "/transaction-protection",
  },
  {
    label: "FAQ",
    to: "/faq",
  },
  {
    label: "Contact",
    to: "/contact",
  },
] as const;

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const accountPath = user ? "/dashboard" : "/login";
  const accountLabel = user ? "Buyer Portal™" : "Login";

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-6xl items-center justify-between px-6 md:px-12">
        <Link
          to="/"
          aria-label="ProjectApps home"
          className="group inline-flex shrink-0 items-center gap-2 text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
        >
          <Globe
            aria-hidden="true"
            className="h-5 w-5 text-neutral-800 transition-transform duration-300 group-hover:rotate-12"
          />

          <span className="text-xs font-extrabold uppercase tracking-wider sm:text-sm">
            PROJECTAPPS™
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-wider md:flex"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "transition-colors duration-200",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-neutral-950",
                  "focus-visible:ring-offset-4",
                  isActive
                    ? "font-bold text-neutral-950"
                    : "text-neutral-500 hover:text-neutral-950",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to={accountPath}
            className={[
              "shrink-0 rounded-lg border px-3.5 py-2",
              "text-[10px] font-bold uppercase tracking-widest",
              "transition-colors duration-200",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-neutral-950",
              "focus-visible:ring-offset-2",
              user
                ? "border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800"
                : "border-neutral-200 bg-neutral-100 text-neutral-950 hover:bg-neutral-200",
            ].join(" ")}
          >
            {accountLabel}
          </Link>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 md:hidden"
        >
          {isOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="flex flex-col gap-1 border-t border-neutral-200 bg-white px-6 py-4 text-xs font-semibold uppercase tracking-wider md:hidden"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-md px-2 py-2",
                  "transition-colors duration-200",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-neutral-950",
                  isActive
                    ? "font-bold text-neutral-950"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to={accountPath}
            className={[
              "mt-2 rounded-lg border px-4 py-3 text-center",
              "text-[10px] font-bold uppercase tracking-widest",
              "transition-colors duration-200",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-neutral-950",
              user
                ? "border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800"
                : "border-neutral-200 bg-neutral-100 text-neutral-950 hover:bg-neutral-200",
            ].join(" ")}
          >
            {accountLabel}
          </Link>
        </nav>
      )}
    </header>
  );
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return null;
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
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
        <ScrollToTop />

        <Layout>
          <Routes>
            {appRoutes.map((route) => {
              const PageComponent = route.element;

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.protected ? (
                      <ProtectedRoute>
                        <PageComponent />
                      </ProtectedRoute>
                    ) : (
                      <PageComponent />
                    )
                  }
                />
              );
            })}
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
