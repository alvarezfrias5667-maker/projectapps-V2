import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

type FooterLink = {
  label: string;
  to: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="app-footer"
      className="border-t border-neutral-200 bg-white px-6 py-16 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="space-y-5 md:col-span-5">
            <Link
              to="/"
              aria-label="ProjectApps home"
              className="inline-flex items-center text-sm font-black tracking-widest text-neutral-950"
            >
              PROJECTAPPS™
            </Link>

            <p className="max-w-sm text-sm font-light leading-relaxed text-neutral-500">
              Private Business Asset Marketplace™ to explore, evaluate, and
              request availability of enterprise software assets.
            </p>

            <Link
              to="/transaction-protection"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            >
              <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
              Transaction Protection™
            </Link>
          </div>

          {/* Acquisition */}
          <FooterColumn
            title="Acquisition"
            links={[
              {
                label: "Process",
                to: "/acquisition-process",
              },
              {
                label: "What You Receive",
                to: "/what-you-receive",
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
            ]}
          />

          {/* Legal */}
          <FooterColumn
            title="Legal"
            links={[
              {
                label: "Privacy",
                to: "/legal/privacy",
              },
              {
                label: "Terms",
                to: "/legal/terms",
              },
              {
                label: "Disclaimer",
                to: "/legal/disclaimer",
              },
              {
                label: "Login",
                to: "/login",
              },
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-neutral-200 pt-6 text-[10px] font-medium uppercase tracking-wider text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>© {year} ProjectApps™. All rights reserved.</p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            Request availability
            <ArrowRight aria-hidden="true" className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <nav aria-label={`${title} navigation`} className="space-y-4 md:col-span-2">
      <h2 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
        {title}
      </h2>

      <div className="flex flex-col space-y-2.5">
        {links.map((link) => (
          <Link
            key={`${title}-${link.to}`}
            to={link.to}
            className="text-xs font-semibold text-neutral-500 transition-colors hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
