import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Globe, ArrowRight, ShieldAlert, Mail } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError("");
    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) throw resetError;
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to send recovery link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="forgot-password-page" className="min-h-[80vh] flex items-center justify-center bg-neutral-50 px-6 py-20 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      <div className="w-full max-w-md space-y-8">
        
        {/* Logo and Headings */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center space-x-2 text-neutral-950 group justify-center">
            <Globe className="h-5 w-5 text-neutral-900" />
            <span className="font-extrabold tracking-widest text-xs uppercase">
              PROJECTAPPS™
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-neutral-950 tracking-tight">
            Account Recovery
          </h1>
          <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
            Request an access recovery link for your Buyer Portal™ profile.
          </p>
        </div>

        {/* Enterprise Recovery Card */}
        <div className="bg-white border border-neutral-200 p-8 rounded-xl shadow-xs space-y-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 text-sm font-light placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition"
                />
              </div>

              {error && (
                <p className="text-xs text-amber-600 font-medium text-center">
                  {error}
                </p>
              )}

              <div className="text-xs text-neutral-400 font-light leading-relaxed">
                An authorization token link will be transmitted to verify your identity. Opening this link will securely authenticate your session to reset your password.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-neutral-950 text-white hover:bg-neutral-800 disabled:bg-neutral-400 text-xs font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center justify-center gap-2"
              >
                <span>{loading ? "Sending..." : "Request Recovery Link"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-200">
                <Mail className="h-5 w-5 text-neutral-900" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-neutral-900">Recovery Link Dispatched</h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  A verification email has been dispatched to <strong className="text-neutral-800">{email}</strong>. Once received, click the recovery link to proceed.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/reset-password"
                  className="px-4 py-2.5 bg-neutral-950 text-white hover:bg-neutral-800 text-[10px] font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center gap-1.5"
                >
                  Proceed to Reset Screen <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}

          <div className="border-t border-neutral-100 pt-5 text-center">
            <Link 
              to="/login" 
              className="text-xs font-bold text-neutral-400 hover:text-neutral-950 uppercase tracking-wider transition"
            >
              Back to Login
            </Link>
          </div>
        </div>

        {/* Scope Note */}
        <div className="flex items-start gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-[10px] text-neutral-500 font-light">
          <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-neutral-700">Security Disclaimers</p>
            <p className="leading-normal">
              Password recovery uses industry-standard cryptographic reset tokens valid for 1 hour. Always verify that your email address is correctly registered.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
