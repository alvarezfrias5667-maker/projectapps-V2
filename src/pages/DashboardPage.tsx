import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  Clock,
  Compass,
  FileText,
  FolderCheck,
  Lock,
  LogOut,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import { SOLUTIONS, Solution } from "../data/solutionsData";
import { useAuth } from "../hooks/useAuth";
import { evaluationService } from "../services/evaluationService";
import { favoritesService } from "../services/favoritesService";
import { acquisitionService } from "../services/acquisitionService";

export default function DashboardPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [savedAssets, setSavedAssets] = useState<Solution[]>([]);
  const [savedEvaluations, setSavedEvaluations] = useState<any[]>([]);
  const [acquisitionRequests, setAcquisitionRequests] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      if (!authLoading) {
        setLoadingData(false);
      }
      return;
    }

    const loadData = async () => {
      setLoadingData(true);
      try {
        const evals = await evaluationService.getEvaluations(user.id);
        setSavedEvaluations(evals);

        const favs = await favoritesService.getFavorites(user.id);
        const matchingSolutions = SOLUTIONS.filter((sol) =>
          favs.some((fav) => fav.asset_id === sol.id)
        );
        setSavedAssets(matchingSolutions);

        const requests = await acquisitionService.getRequests(user.id);
        setAcquisitionRequests(requests);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [user, authLoading]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const removeFavorite = async (assetId: string) => {
    if (!user) return;
    try {
      await favoritesService.removeFavorite(user.id, assetId);
      setSavedAssets((prev) => prev.filter((item) => item.id !== assetId));
    } catch (err) {
      console.error("Error removing favorite asset:", err);
    }
  };

  const removeEvaluation = async (id: string) => {
    if (!user) return;
    try {
      await evaluationService.deleteEvaluation(user.id, id);
      setSavedEvaluations((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting evaluation:", err);
    }
  };

  if (authLoading || loadingData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white px-6 py-20">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-neutral-400 font-mono tracking-widest uppercase">
            Loading Executive Portal...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white px-6 py-20">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="mx-auto h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200">
            <Lock className="h-5 w-5 text-neutral-800" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-neutral-950 tracking-tight">
              Private Access
            </h1>
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-sm mx-auto">
              Please sign in to view your saved evaluations, favorite software assets, and active acquisition requests.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              to="/login"
              className="w-full py-3 px-6 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest rounded-xl transition inline-flex items-center justify-center gap-2"
            >
              Access Buyer Portal™
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              to="/solution-match"
              className="text-xs font-bold text-neutral-500 hover:text-neutral-950 transition uppercase tracking-wider"
            >
              Take Solution Compatibility Test
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="buyer-portal-page" className="bg-white text-neutral-900 pb-24">
      <div className="max-w-6xl mx-auto px-6 pt-32">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-100 pb-8">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-neutral-900 bg-neutral-100 uppercase rounded border border-neutral-200">
              <User className="h-3 w-3 text-neutral-800" />
              Buyer Portal™
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
              Executive Buyer Space™
            </h1>

            <p className="text-xs text-neutral-500 font-light">
              Active Session: <span className="font-semibold text-neutral-800">{user.email}</span>
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/solution-match"
              className="px-5 py-2.5 bg-neutral-50 border border-neutral-200 hover:border-neutral-400 text-neutral-900 text-[11px] font-bold uppercase tracking-wider rounded-xl transition flex items-center gap-1.5"
            >
              <Compass className="h-3.5 w-3.5" />
              New Evaluation
            </Link>

            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <SummaryCard label="Saved Assets" value={savedAssets.length} icon={<Bookmark className="h-4 w-4" />} />
          <SummaryCard label="Saved Evaluations" value={savedEvaluations.length} icon={<FileText className="h-4 w-4" />} />
          <SummaryCard label="Active Requests" value={acquisitionRequests.length} icon={<FolderCheck className="h-4 w-4" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-4">
              <SectionTitle title="My Saved Executive Assessments™" />

              {savedEvaluations.length === 0 ? (
                <EmptyState
                  title="No saved evaluations."
                  text="Begin an executive assessment to evaluate which software asset categories match your business profile."
                  actionLabel="Start Evaluation"
                  actionTo="/solution-match"
                />
              ) : (
                <div className="space-y-4">
                  {savedEvaluations.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-neutral-200 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-400 transition"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 uppercase rounded border border-neutral-200">
                            {item.report_code || `REP-${item.id.slice(0, 4).toUpperCase()}`}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-light flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-xs font-black text-neutral-950 uppercase tracking-wide">
                          Corporate Diagnostic • {item.industry}
                        </h3>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-500 font-light">
                          <span>Size: <strong className="text-neutral-700">{item.business_size}</strong></span>
                          <span>Investment: <strong className="text-neutral-700">{item.budget}</strong></span>
                          <span>Challenges: <strong className="text-neutral-700">{item.problems_count}</strong></span>
                          <span>Goals: <strong className="text-neutral-700">{item.goals_count}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <Link
                          to="/export-center"
                          className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition"
                        >
                          Export
                        </Link>

                        <button
                          onClick={() => removeEvaluation(item.id)}
                          className="p-1.5 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-50 rounded-lg transition"
                          title="Delete Evaluation"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="space-y-4">
              <SectionTitle title="My Bookmarked Software Assets" />

              {savedAssets.length === 0 ? (
                <EmptyState
                  title="No saved assets."
                  text="Explore our software portfolio and bookmark systems that you would like to inspect or acquire."
                  actionLabel="Explore Portfolio"
                  actionTo="/pricing"
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="bg-white border border-neutral-200 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-neutral-400 transition"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[9px] font-mono font-bold bg-neutral-950 text-white rounded px-2 py-0.5 uppercase tracking-wide">
                            Saved Asset™
                          </span>

                          <button
                            onClick={() => removeFavorite(asset.id)}
                            className="p-1 text-neutral-300 hover:text-red-600 rounded transition"
                            title="Remove Favorite"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <span className="text-[10px] text-neutral-400 font-bold uppercase">
                          {asset.publicCategory}
                        </span>

                        <h3 className="text-sm font-black text-neutral-950 uppercase tracking-tight">
                          {asset.publicName}
                        </h3>

                        <p className="text-[11px] text-neutral-500 font-light leading-relaxed line-clamp-2">
                          {asset.publicDescription}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                        <span className="text-neutral-400 uppercase font-mono font-bold">
                          Delivery Lead Time:
                        </span>
                        <span className="font-bold text-neutral-800">{asset.estimatedTime}</span>
                      </div>

                      <Link
                        to="/contact"
                        className="w-full text-center py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-[9px] font-bold uppercase tracking-widest rounded transition"
                      >
                        Request Availability
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-12">
            <section className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-neutral-800" />
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
                  Intelligence Export
                </span>
              </div>

              <h3 className="text-xs font-black uppercase tracking-wider text-neutral-950">
                Export Center™
              </h3>

              <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Review, print, and export your saved buyer intelligence diagnostics to clipboard or print documents.
              </p>

              <Link
                to="/export-center"
                className="w-full text-center py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center justify-center gap-1.5"
              >
                <span>Open Export Center™</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </section>

            <section className="space-y-4">
              <SectionTitle title="Acquisition Requests" />

              {acquisitionRequests.length === 0 ? (
                <EmptyState
                  title="No active requests."
                  text="When you request availability for a software asset, your acquisition status will be displayed here."
                  actionLabel="Request Asset"
                  actionTo="/contact"
                />
              ) : (
                <div className="space-y-4">
                  {acquisitionRequests.map((request) => (
                    <div key={request.id} className="bg-neutral-50 border border-neutral-200 p-5 rounded-2xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase">
                          {request.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5 capitalize">
                          {request.status.replace(/_/g, " ")}
                        </span>
                      </div>
                      <h3 className="text-xs font-black text-neutral-950 uppercase tracking-wide">
                        {request.asset_name || "Software Asset Request"}
                      </h3>
                      {request.message && (
                        <p className="text-[11px] text-neutral-500 italic font-light line-clamp-2">
                          "{request.message}"
                        </p>
                      )}
                      <p className="text-[10px] text-neutral-400 font-mono">
                        {new Date(request.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="bg-neutral-950 text-white rounded-2xl p-6 space-y-4 border border-neutral-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-neutral-100" />
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
                  Protection
                </span>
              </div>

              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                Transaction Protection™
              </h3>

              <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
                ProjectApps™ utilizes a private validation, escrow, and source-code transfer process to protect both buyers and software asset owners during transaction.
              </p>

              <Link
                to="/transaction-protection"
                className="text-[10px] font-bold text-white hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                Learn About Protection <ArrowRight className="h-3 w-3" />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-neutral-400 uppercase font-black">
          {label}
        </span>
        <span className="text-neutral-400">{icon}</span>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-3xl font-black text-neutral-950">{value}</span>
        <span className="text-xs text-neutral-400">Current</span>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-2">
      {title}
    </h2>
  );
}

function EmptyState({
  title,
  text,
  actionLabel,
  actionTo,
}: {
  title: string;
  text: string;
  actionLabel: string;
  actionTo: string;
}) {
  return (
    <div className="bg-neutral-50 rounded-xl p-8 text-center border border-dashed border-neutral-300">
      <p className="text-sm font-bold text-neutral-900 mb-2">{title}</p>
      <p className="text-xs text-neutral-400 font-light mb-5 max-w-md mx-auto">
        {text}
      </p>

      <Link
        to={actionTo}
        className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:underline uppercase tracking-wider"
      >
        {actionLabel}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}