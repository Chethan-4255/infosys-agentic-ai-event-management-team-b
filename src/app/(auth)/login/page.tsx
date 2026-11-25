"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, UserCheck, RefreshCw } from "lucide-react";
import { loginUser } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";

function generateCaptcha(length = 6): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Captcha State
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCaptchaCode(generateCaptcha());
  }, []);

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptchaInput("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 4) {
      setError("Please enter a valid password.");
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setError("Captcha verification failed. Please enter the new code.");
      refreshCaptcha();
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await loginUser(email, password);
      login(user, token);
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("demo1234");
    setError("");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left Brand Panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950 p-12 text-white lg:flex">
        <Link href="/dashboard" className="flex items-center gap-2.5 text-white">
          <Calendar className="h-8 w-8 text-emerald-400" />
          <span className="text-2xl font-extrabold tracking-tight">EventAI Portal</span>
        </Link>

        <div className="space-y-4">
          <span className="inline-block rounded-full bg-emerald-400/15 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            Infosys Internship Capstone
          </span>
          <h2 className="text-4xl font-extrabold leading-tight">
            Plan, Discover &amp; Experience Smart Events.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            Sign in to reserve seats at top hackathons, explore state-wise convention centers, and get real-time answers from our RAG-powered AI Assistant.
          </p>
        </div>

        <p className="text-xs text-slate-400">© 2026 EventAI Portal · Frontend &amp; AI Event Suite</p>
      </div>

      {/* Right Login Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <Link href="/dashboard" className="mb-4 inline-flex items-center gap-2 text-teal-600 lg:hidden">
              <Calendar className="h-6 w-6" />
              <span className="text-lg font-bold text-slate-900">EventAI Portal</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="mt-1 text-xs text-slate-500">Enter your credentials to access your event workspace.</p>
          </div>

          {/* Neutral Demo Fill */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Quick Demo Fill</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemo("attendee@eventai.com")}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:border-teal-500 hover:text-teal-700"
              >
                <UserCheck className="h-3.5 w-3.5 text-teal-600" /> Attendee Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemo("admin@eventai.com")}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:border-amber-500 hover:text-amber-700"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600" /> Admin Demo
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Email Address</label>
              <div className="relative mt-1">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 py-2.5 pr-4 pl-10 text-sm focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 py-2.5 pr-10 pl-10 text-sm focus:border-teal-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Security Captcha Verification */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">Security Verification</label>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex select-none items-center justify-center rounded-xl border border-dashed border-teal-300 bg-teal-50/70 px-4 py-2 font-mono text-base font-extrabold tracking-[0.25em] text-teal-900 line-through decoration-teal-400/60">
                  {captchaCode || "------"}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  title="Refresh Captcha"
                  className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-teal-700"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-center font-mono text-sm font-bold uppercase tracking-widest focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:bg-slate-300"
            >
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-teal-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
