import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  Copy,
  FileText,
  Globe,
  Lock,
  Printer,
  ShieldAlert,
  Check,
  Plus,
  Download
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { evaluationService } from "../services/evaluationService";
import { githubExportService, ExportManifest } from "../services/githubExportService";
import { exportService } from "../services/exportService";

export default function ExportCenterPage() {
  const { user, loading: authLoading } = useAuth();
  const [savedEvaluations, setSavedEvaluations] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // GitHub Export Center State
  const [selectedEvalId, setSelectedEvalId] = useState<string>("");
  const [generatedManifest, setGeneratedManifest] = useState<ExportManifest | null>(null);
  const [copiedManifest, setCopiedManifest] = useState(false);
  const [githubMessage, setGithubMessage] = useState("");
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
        if (evals.length > 0) {
          setSelectedEvalId(evals[0].id);
        }
      } catch (err) {
        console.error("Error loading export evaluations:", err);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [user, authLoading]);

  const handleCopySummary = (evalItem: any) => {
    const problemsText = evalItem.selected_problems && evalItem.selected_problems.length > 0
      ? evalItem.selected_problems.join(", ")
      : `${evalItem.problems_count} custom challenges identified`;

    const goalsText = evalItem.selected_goals && evalItem.selected_goals.length > 0
      ? evalItem.selected_goals.join(", ")
      : `${evalItem.goals_count} commercial targets defined`;

    const summaryText = `=====================================================
PROJECTAPPS™ EXECUTIVE ASSESSMENT REPORT
=====================================================
Report Code: ${evalItem.report_code || `REP-${evalItem.id.slice(0, 4).toUpperCase()}`}
Report ID: ${evalItem.id}
Generated Date: ${new Date(evalItem.created_at).toLocaleDateString()}
Organization Identity: ${user?.email || "Unknown"}
Industry: ${evalItem.industry}
Business Size Scale: ${evalItem.business_size}
Target Allocation Budget: ${evalItem.budget}

CHALLENGES IDENTIFIED:
${problemsText}

COMMERCIAL TARGETS DEFINED:
${goalsText}

${evalItem.executive_context ? `EXECUTIVE CONTEXT:\n${evalItem.executive_context}\n` : ""}
=====================================================
This document represents an executive appraisal of operational-software compatibility. All specifications are securely stored.
=====================================================`;

    navigator.clipboard.writeText(summaryText).then(async () => {
      setCopiedId(evalItem.id);
      setTimeout(() => setCopiedId(null), 2500);
      if (user) {
        await exportService.logExport(user.id, evalItem.id, "clipboard_summary_copied");
      }
    });
  };

  const handleDownloadZip = async (evalItem: any) => {
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      const problemsText = evalItem.selected_problems && evalItem.selected_problems.length > 0
        ? evalItem.selected_problems.map((p: string) => `* ${p}`).join("\n")
        : `* ${evalItem.problems_count} custom challenges identified`;

      const goalsText = evalItem.selected_goals && evalItem.selected_goals.length > 0
        ? evalItem.selected_goals.map((g: string) => `* ${g}`).join("\n")
        : `* ${evalItem.goals_count} commercial targets defined`;

      const summaryText = `=====================================================
PROJECTAPPS™ EXECUTIVE ASSESSMENT REPORT
=====================================================
Report Code: ${evalItem.report_code || `REP-${evalItem.id.slice(0, 4).toUpperCase()}`}
Report ID: ${evalItem.id}
Generated Date: ${new Date(evalItem.created_at).toLocaleDateString()}
Organization Identity: ${user?.email || "Unknown"}
Industry: ${evalItem.industry}
Business Size Scale: ${evalItem.business_size}
Target Allocation Budget: ${evalItem.budget}

CHALLENGES IDENTIFIED:
${problemsText}

COMMERCIAL TARGETS DEFINED:
${goalsText}

${evalItem.executive_context ? `EXECUTIVE CONTEXT:\n${evalItem.executive_context}\n` : ""}
=====================================================
This document represents an executive appraisal of operational-software compatibility.
=====================================================`;

      zip.file("README.md", `# PROJECTAPPS™ Technical Hand-off Package\n\nThis archive contains the compiled buyer intelligence report for the industry segment: **${evalItem.industry}**.\n\n## Contents\n- \`report_summary.txt\`: Plaintext executive assessment document.\n- \`metadata.json\`: Structured JSON representation of the diagnostic details.\n\nGenerated secure and offline-ready.`);
      zip.file("report_summary.txt", summaryText);
      zip.file("metadata.json", JSON.stringify({
        report_code: evalItem.report_code || `REP-${evalItem.id.slice(0, 4).toUpperCase()}`,
        id: evalItem.id,
        created_at: evalItem.created_at,
        industry: evalItem.industry,
        business_size: evalItem.business_size,
        budget: evalItem.budget,
        selected_problems: evalItem.selected_problems || [],
        selected_goals: evalItem.selected_goals || [],
        executive_context: evalItem.executive_context || ""
      }, null, 2));

      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `projectapps_intelligence_${evalItem.id.slice(0, 8)}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      if (user) {
        await exportService.logExport(user.id, evalItem.id, "project_zip_downloaded");
      }
    } catch (err) {
      console.error("Failed to generate ZIP", err);
    }
  };

  const handlePrintAll = async () => {
    if (user) {
      await exportService.logExport(user.id, null, "print_all_triggered");
    }
    window.print();
  };

  const handleConnectGitHub = () => {
    if (!githubExportService.isConfigured()) {
      setGithubMessage("GitHub export is not configured yet. (Missing VITE_GITHUB_CLIENT_ID environment variable)");
      return;
    }
    setGithubMessage("");
    window.location.href = githubExportService.getAuthorizeUrl();
  };

  const handlePrepareExport = async () => {
    const selectedEval = savedEvaluations.find((e) => e.id === selectedEvalId);
    if (!selectedEval) {
      setGithubMessage("Please select an evaluation to prepare first.");
      return;
    }
    setGithubMessage("");
    const manifest = githubExportService.generateManifest({
      id: selectedEval.id,
      created_at: selectedEval.created_at,
      industry: selectedEval.industry,
      business_size: selectedEval.business_size,
      budget: selectedEval.budget,
      problems_count: selectedEval.problems_count,
      goals_count: selectedEval.goals_count,
    });
    setGeneratedManifest(manifest);

    if (user) {
      await exportService.logExport(user.id, selectedEval.id, "github_manifest_prepared");
    }
  };

  const handleCopyManifest = () => {
    if (!generatedManifest) return;
    const text = JSON.stringify(generatedManifest, null, 2);
    navigator.clipboard.writeText(text).then(async () => {
      setCopiedManifest(true);
      setTimeout(() => setCopiedManifest(false), 2000);

      if (user) {
        await exportService.logExport(user.id, selectedEvalId || null, "github_manifest_copied");
      }
    });
  };

  if (authLoading || loadingData) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-white px-6 py-20">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-neutral-400 font-mono tracking-widest uppercase">
            Opening Export Center...
          </p>
        </div>
      </div>
    );
  }

  // If not logged in, show access card
  if (!user) {
    return (
      <div id="export-center-page" className="min-h-[85vh] flex items-center justify-center bg-neutral-50 px-6 py-24 font-sans antialiased selection:bg-neutral-900 selection:text-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center space-y-3">
            <Link to="/" className="inline-flex items-center space-x-2 text-neutral-950 group justify-center">
              <Globe className="h-5 w-5 text-neutral-900" />
              <span className="text-xs font-black tracking-widest text-neutral-950 group-hover:text-neutral-700 transition">
                PROJECTAPPS™
              </span>
            </Link>
            <h1 className="text-2xl font-extrabold text-neutral-950 tracking-tight">
              Export Center™ Access
            </h1>
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
              Please sign in to retrieve, format, and generate print ready intelligence documents.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 p-8 rounded-xl shadow-xs text-center space-y-6">
            <div className="mx-auto h-12 w-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-200">
              <Lock className="h-5 w-5 text-neutral-800" />
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto">
              Buyer intelligence reports are encrypted inside your private cloud space. You must authenticate to authorize safe decryption.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full py-3 px-6 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center justify-center gap-2"
              >
                <span>Authorize Portal Session</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/"
                className="text-xs font-bold text-neutral-400 hover:text-neutral-950 transition uppercase tracking-wider"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="export-center-page" className="bg-neutral-50 min-h-screen text-neutral-900 pb-24 font-sans antialiased selection:bg-neutral-900 selection:text-white print:bg-white print:text-black">
      <div className="max-w-6xl mx-auto px-6 pt-32 print:pt-4">
        
        {/* Navigation Breadcrumb - Hidden on Print */}
        <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-neutral-900 transition uppercase tracking-wider"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Buyer Portal™</span>
          </Link>

          <Link
            to="/solution-match"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-950 text-[10px] font-bold uppercase tracking-widest rounded-lg transition"
          >
            <Plus className="h-3.5 w-3.5 text-neutral-800" />
            <span>Run New Assessment</span>
          </Link>
        </div>

        {/* Header Section */}
        <header className="border-b border-neutral-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 print:hidden">
              <span className="px-2 py-0.5 text-[8px] font-bold tracking-widest text-neutral-900 bg-white uppercase rounded border border-neutral-200">
                Secure Exports
              </span>
              <span className="text-xs text-neutral-400 font-light">•</span>
              <span className="text-[11px] text-neutral-500 font-light">
                Session: <strong className="text-neutral-700">{user.email}</strong>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 uppercase print:text-2xl">
              Export Center™
            </h1>
            
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xl">
              Review, print, and export your saved buyer intelligence. Formatted cleanly for print and clipboard sharing to coordinate validation with internal teams.
            </p>
          </div>

          <div className="flex gap-3 print:hidden">
            <button
              onClick={handlePrintAll}
              disabled={savedEvaluations.length === 0}
              className="px-5 py-2.5 bg-neutral-950 text-white hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-xs font-bold uppercase tracking-widest rounded-lg transition flex items-center gap-1.5"
            >
              <Printer className="h-3.5 w-3.5" />
              Print All Reports
            </button>
          </div>
        </header>

        {/* Saved Assessments */}
        <main className="mt-12 space-y-8">
          {savedEvaluations.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-dashed border-neutral-300 max-w-2xl mx-auto space-y-5 print:hidden">
              <div className="mx-auto h-12 w-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-200">
                <FileText className="h-5 w-5 text-neutral-400" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-bold text-neutral-950 uppercase tracking-wide">No saved buyer intelligence found</p>
                <p className="text-xs text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
                  You have not saved any operational diagnostics yet. Run our Solution Match assessment to generate real-time evaluations first.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/solution-match"
                  className="px-6 py-3 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center gap-1.5"
                >
                  <span>Identify Compatible Assets</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {savedEvaluations.map((item) => {
                const reportCopied = copiedId === item.id;
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs hover:border-neutral-400 transition flex flex-col md:flex-row print:border-neutral-300 print:shadow-none print:my-4"
                  >
                    {/* Information panel */}
                    <div className="p-6 flex-1 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 uppercase rounded border border-neutral-200">
                              REPORT CODE: {item.report_code || `REP-${item.id.slice(0,4).toUpperCase()}`}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-light">
                              {new Date(item.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-sm font-black text-neutral-950 uppercase tracking-wide">
                            Compatible Assets Assessment • {item.industry}
                          </h3>
                        </div>

                        <span className="text-[9px] font-mono tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 uppercase rounded border border-emerald-100 font-bold self-start sm:self-center">
                          ACTIVE SECURE DATA
                        </span>
                      </div>

                      {/* Dimensions grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-neutral-50 p-4 rounded-lg border border-neutral-200 print:bg-white print:border-neutral-300">
                        <div className="space-y-0.5">
                          <span className="block text-[8px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                            Industry Sector
                          </span>
                          <span className="text-xs font-bold text-neutral-800 capitalize">
                            {item.industry}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="block text-[8px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                            Business Size
                          </span>
                          <span className="text-xs font-bold text-neutral-800">
                            {item.business_size}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="block text-[8px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                            Budget Target
                          </span>
                          <span className="text-xs font-bold text-neutral-800">
                            {item.budget}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="block text-[8px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                            Status Indicator
                          </span>
                          <span className="text-xs font-bold text-neutral-800">
                            Verified Real-time
                          </span>
                        </div>
                      </div>

                      {/* Problem and Goals list details if available */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-1 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                            Challenges Identified ({item.problems_count})
                          </h4>
                          {item.selected_problems && item.selected_problems.length > 0 ? (
                            <ul className="space-y-1 text-xs text-neutral-600 font-light">
                              {item.selected_problems.map((prob: string, i: number) => (
                                <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                                  <span className="text-neutral-400 shrink-0">•</span>
                                  <span>{prob}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-neutral-500 font-light">
                              {item.problems_count} functional roadblocks identified during evaluation.
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-1 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                            Targets Defined ({item.goals_count})
                          </h4>
                          {item.selected_goals && item.selected_goals.length > 0 ? (
                            <ul className="space-y-1 text-xs text-neutral-600 font-light">
                              {item.selected_goals.map((goal: string, i: number) => (
                                <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                                  <span className="text-neutral-400 shrink-0">•</span>
                                  <span>{goal}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-neutral-500 font-light">
                              {item.goals_count} commercial optimization goals requested by buyer.
                            </p>
                          )}
                        </div>
                      </div>

                      {item.executive_context && (
                        <div className="space-y-2 border-t border-neutral-100 pt-4">
                          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                            Executive Buyer Brief
                          </h4>
                          <p className="text-xs text-neutral-600 font-light leading-relaxed italic bg-neutral-50 p-3 rounded border border-neutral-200">
                            "{item.executive_context}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Panel - Hidden on Print */}
                    <div className="bg-neutral-50 border-t md:border-t-0 md:border-l border-neutral-200 p-6 flex flex-row md:flex-col justify-center gap-3 shrink-0 w-full md:w-56 print:hidden">
                      <button
                        onClick={() => handleCopySummary(item)}
                        className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition inline-flex items-center justify-center gap-1.5 ${
                          reportCopied
                            ? "bg-emerald-600 text-white"
                            : "bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-800"
                        }`}
                      >
                        {reportCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-neutral-500" />
                            <span>Copy Summary</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDownloadZip(item)}
                        className="w-full py-2.5 px-4 bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-lg transition inline-flex items-center justify-center gap-1.5"
                      >
                        <Download className="h-3.5 w-3.5 text-neutral-500" />
                        <span>Download ZIP™</span>
                      </button>

                      <button
                        onClick={() => {
                          window.print();
                        }}
                        className="w-full py-2.5 px-4 bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-lg transition inline-flex items-center justify-center gap-1.5"
                      >
                        <Printer className="h-3.5 w-3.5 text-neutral-500" />
                        <span>Print Report</span>
                      </button>

                      <Link
                        to="/contact"
                        className="w-full py-2.5 px-4 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center justify-center gap-1"
                      >
                        <span>Check Availability</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* Enterprise Integrations Section */}
        <section className="mt-16 border-t border-neutral-200 pt-12 print:hidden">
          <div className="space-y-1 mb-6">
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-950">
              Enterprise Hand-off & Integrations
            </h2>
            <p className="text-xs text-neutral-500 font-light">
              Retrieve direct downloadable packages or explore official repository configurations to synchronize specifications with your technical review team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project ZIP Export Card */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-neutral-900 text-white p-1.5 rounded-md">
                    <Download className="h-4 w-4 shrink-0" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-neutral-950">
                    Project ZIP™ Export Center
                  </h3>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-neutral-800">
                    Technical Specification Bundle
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-medium">
                    Package all architectural mappings and diagnostics into a single archive.
                  </p>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    Downloads an offline-ready file bundle containing README specifications, JSON structured diagnostics, and plain text briefings.
                  </p>
                </div>

                {savedEvaluations.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <label className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                      Select Diagnostic to Package
                    </label>
                    <select
                      value={selectedEvalId}
                      onChange={(e) => {
                        setSelectedEvalId(e.target.value);
                      }}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 text-xs focus:outline-none focus:border-neutral-950"
                    >
                      {savedEvaluations.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.report_code || `REP-${e.id.slice(0, 4).toUpperCase()}`} • {e.industry} ({new Date(e.created_at).toLocaleDateString()})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  disabled={savedEvaluations.length === 0}
                  onClick={() => {
                    const selectedEval = savedEvaluations.find((e) => e.id === selectedEvalId);
                    if (selectedEval) {
                      handleDownloadZip(selectedEval);
                    }
                  }}
                  className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition text-center flex items-center justify-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Project ZIP™</span>
                </button>
              </div>
            </div>

            {/* GitHub Repository Delivery Card */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-neutral-900 text-white p-1.5 rounded-md">
                    <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-neutral-950">
                    GitHub Integration
                  </h3>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-neutral-800">
                    Official Repository & Templates
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-medium">
                    Fork, clone, or browse official open-source template configurations.
                  </p>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    Access our secure production repositories directly. Includes preset deployment workflows for Vercel, Docker files, and clean environment templates.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={handleConnectGitHub}
                  className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-bold uppercase tracking-widest rounded-lg transition text-center flex items-center justify-center gap-1.5"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>View on GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footnotes and Limitations Disclaimer */}
        <div className="mt-12 flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-5 text-[10px] text-neutral-500 font-light leading-relaxed max-w-3xl mx-auto print:hidden">
          <ShieldAlert className="h-4.5 w-4.5 shrink-0 text-amber-500 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-neutral-800">Operational Notice & Document Authenticity</p>
            <p>
              These reports are generated on-demand to map cloud-hosted operational goals with existing software asset profiles. No formal guarantees of transaction completion, system integration, or immediate transfer of Intellectual Property are implied.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
