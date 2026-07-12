import React, { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, ArrowRight, ShieldAlert, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    // Check if there is an active session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        if (session) {
          setHasSession(true);
        }
        setSessionChecked(true);
      }
    });

    // Listen for auth changes to capture asynchronous session load
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        if (session) {
          setHasSession(true);
        }
        setSessionChecked(true);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
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

      // Clear the password recovery flag and sign out from the temporary session
      sessionStorage.removeItem("isPasswordRecovery");
      await supabase.auth.signOut();

      setSubmitted(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please try requesting a new recovery link.");
    } finally {
      setLoading(false);
    }
  };

  if (!sessionChecked) {
    return (
      <div id="reset-password-loading" className="min-h-[80vh] flex items-center justify-center bg-neutral-50 px-6 py-20 font-sans antialiased">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-neutral-400 font-mono tracking-widest uppercase animate-pulse">
            Verifying Recovery Session...
          </p>
        </div>
      </div>
    );
  }

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
          {!hasSession ? (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200">
                <ShieldAlert className="h-5 w-5 text-amber-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-neutral-900">Invalid or Expired Link</h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  The password recovery link has expired or is invalid. Please request a new recovery link.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/forgot-password"
                  className="px-4 py-2.5 bg-neutral-950 text-white hover:bg-neutral-800 text-[10px] font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center gap-1.5"
                >
                  Request New Link <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ) : !submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-4 pr-11 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 text-sm font-light placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-4 pr-11 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 text-sm font-light placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-center text-amber-600 font-medium animate-shake">
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
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200 animate-bounce">
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
