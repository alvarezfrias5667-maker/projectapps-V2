import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.updateUser({
        password: password,
      });
      if (resetError) throw resetError;

      setSubmitted(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please try requesting a new recovery link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="reset-password-page" className="min-h-[80vh] flex items-center justify-center bg-neutral-50 px-6 py-20 font-sans antialiased selection:bg-neutral-900 selection:text-white">
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
            Reset Password
          </h1>
          <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
            Choose a new secure password for your Buyer Portal™ profile.
          </p>
        </div>

        {/* Enterprise Reset Card */}
        <div className="bg-white border border-neutral-200 p-8 rounded-xl shadow-xs space-y-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 text-sm font-light placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 text-sm font-light placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition"
                />
              </div>

              {error && (
                <p className="text-xs text-center text-amber-600 font-medium">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-neutral-950 text-white hover:bg-neutral-800 disabled:bg-neutral-400 text-xs font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center justify-center gap-2"
              >
                <span>{loading ? "Updating..." : "Reset Password"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </form>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-neutral-900">Password Reset Complete</h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  Your secure profile password has been updated. Redirecting to login portal...
                </p>
              </div>
            </div>
          )}

          <div className="border-t border-neutral-100 pt-5 text-center">
            <Link 
              to="/login" 
              className="text-xs font-bold text-neutral-400 hover:text-neutral-950 uppercase tracking-wider transition"
            >
              Cancel and Return to Login
            </Link>
          </div>
        </div>

        {/* Scope Note */}
        <div className="flex items-start gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-[10px] text-neutral-500 font-light">
          <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-neutral-700">Security Note</p>
            <p className="leading-normal">
              To update your password, your session must be verified via the security link sent to your registered email address.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
