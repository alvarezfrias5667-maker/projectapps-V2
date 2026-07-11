import React, { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Globe, ArrowRight, ShieldAlert } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { buyerService } from "../services/buyerService";
import { evaluationService } from "../services/evaluationService";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();

  const redirectPath = searchParams.get("redirect") || "/dashboard";

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      navigate(redirectPath);
    }
  }, [user, loading, redirectPath, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/login?redirect=${encodeURIComponent(redirectPath)}`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setMessage(err.message || "Google authentication failed.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }
    setMessage("Processing request...");

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login?redirect=${encodeURIComponent(redirectPath)}`
          }
        });
        if (error) throw error;
        if (data.user) {
          await buyerService.ensureProfile(data.user.id, email);
          setMessage("Registration successful! Redirecting...");
          setTimeout(() => {
            navigate(redirectPath);
          }, 1000);
        } else {
          setMessage("Check your email to confirm registration or sign in.");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          // Fallback auto-signup for developer testing/ease of use
          if (error.message.includes("Invalid login credentials") || error.message.includes("does not exist")) {
            setMessage("Account not found. Provisioning new Buyer Portal™ profile...");
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${window.location.origin}/login?redirect=${encodeURIComponent(redirectPath)}`
              }
            });
            if (signUpError) throw signUpError;
            if (signUpData.user) {
              await buyerService.ensureProfile(signUpData.user.id, email);
              setMessage("Profile created. Redirecting...");
              
              // If there is a pending evaluation, save it
              const pending = localStorage.getItem("pendingEvaluation");
              if (pending) {
                try {
                  const parsed = JSON.parse(pending);
                  await evaluationService.saveEvaluation(signUpData.user.id, {
                    industry: parsed.industry,
                    business_size: parsed.business_size,
                    budget: parsed.budget,
                    problems_count: parsed.problemsCount || parsed.selectedProblems?.length || 0,
                    goals_count: parsed.goalsCount || parsed.selectedGoals?.length || 0,
                    summary: parsed.summary,
                    executive_context: parsed.executiveContext || parsed.executive_context,
                    selected_problems: parsed.selectedProblems || parsed.selected_problems,
                    selected_goals: parsed.selectedGoals || parsed.selected_goals,
                    report_code: parsed.reportCode || parsed.report_code
                  });
                  localStorage.removeItem("pendingEvaluation");
                } catch (err) {
                  console.error("Error auto-saving pending evaluation:", err);
                }
              }

              setTimeout(() => {
                navigate(redirectPath);
              }, 1000);
              return;
            }
          }
          throw error;
        }

        if (data.user) {
          await buyerService.ensureProfile(data.user.id, email);
          
          // Save any pending evaluation
          const pending = localStorage.getItem("pendingEvaluation");
          if (pending) {
            try {
              const parsed = JSON.parse(pending);
              await evaluationService.saveEvaluation(data.user.id, {
                industry: parsed.industry,
                business_size: parsed.business_size,
                budget: parsed.budget,
                problems_count: parsed.problemsCount || parsed.selectedProblems?.length || 0,
                goals_count: parsed.goalsCount || parsed.selectedGoals?.length || 0,
                summary: parsed.summary,
                executive_context: parsed.executiveContext || parsed.executive_context,
                selected_problems: parsed.selectedProblems || parsed.selected_problems,
                selected_goals: parsed.selectedGoals || parsed.selected_goals,
                report_code: parsed.reportCode || parsed.report_code
              });
              localStorage.removeItem("pendingEvaluation");
            } catch (err) {
              console.error("Error auto-saving pending evaluation", err);
            }
          }

          setMessage("Access verified. Redirecting...");
          setTimeout(() => {
            navigate(redirectPath);
          }, 800);
        }
      }
    } catch (err: any) {
      setMessage(err.message || "Authentication failed. Please verify credentials.");
    }
  };

  return (
    <div id="login-page" className="min-h-[80vh] flex items-center justify-center bg-neutral-50 px-6 py-20 font-sans antialiased selection:bg-neutral-900 selection:text-white">
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
            {isSignUp ? "Create Buyer Profile" : "Buyer Portal™ Login"}
          </h1>
          <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
            {isSignUp 
              ? "Register for a secure portal to manage evaluations and view software assets."
              : "Access your saved evaluations, solution matches, and software assets portfolio."}
          </p>
        </div>

        {/* Enterprise Login Card */}
        <div className="bg-white border border-neutral-200 p-8 rounded-xl shadow-xs space-y-6">
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

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                  Password
                </label>
                {!isSignUp && (
                  <Link 
                    to="/forgot-password" 
                    className="text-[10px] font-bold text-neutral-400 hover:text-neutral-950 uppercase tracking-wider transition"
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 text-sm font-light placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition"
              />
            </div>

            {message && (
              <p className={`text-xs text-center font-medium ${message.includes("Redirecting") || message.includes("successful") || message.includes("created") ? "text-emerald-600" : "text-amber-600"}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-6 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center justify-center gap-2"
            >
              <span>{isSignUp ? "Register Account" : "Login"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-neutral-200"></div>
              <span className="flex-shrink mx-4 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-neutral-200"></div>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-6 bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 text-xs font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center justify-center gap-2"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>

          </form>

          <div className="border-t border-neutral-100 pt-5 text-center flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-bold text-neutral-500 hover:text-neutral-950 uppercase tracking-wider transition underline"
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
            <Link 
              to="/pricing" 
              className="text-[10px] font-bold text-neutral-400 hover:text-neutral-950 uppercase tracking-widest transition"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>

        {/* Scope Note */}
        <div className="flex items-start gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-[10px] text-neutral-500 font-light">
          <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-neutral-700">Enterprise Identity & Access Manager</p>
            <p className="leading-normal">
              Authentication is integrated with standard corporate identity protocols. Credentials are encrypted and handled safely via secure cloud identity providers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
