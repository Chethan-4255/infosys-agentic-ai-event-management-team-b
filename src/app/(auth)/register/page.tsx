export default function RegisterPage() { return <div className="p-8 text-2xl font-bold">Register Page (Kalaiselvam)</div>; }
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, User, Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { registerUser } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";
import { UserRole } from "../../../types";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("USER");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Please enter your full name.");
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
      const { user, token } = await registerUser(name.trim(), email.trim(), password, role);
      login(user, token);
      router.push("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left Brand Panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950 p-12 text-white lg:flex">
        <Link href="/dashboard" className="flex items-center gap-2.5 text-white">
          <Calendar className="h-8 w-8 text-emerald-400" />
          <span className="text-2xl font-extrabold tracking-tight">EventAI Portal</span>
        </Link>

        <div className="space-y-5">
          <span className="inline-block rounded-full bg-emerald-400/15 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            Free Instant Access
          </span>
          <h2 className="text-4xl font-extrabold leading-tight">
            Create Your EventAI Account in Seconds.
          </h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Register for hackathons, ideathons &amp; tech summits
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Browse verified venues with food ratings &amp; maps
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Get instant answers from the AI Event Assistant
            </li>
          </ul>
        </div>

        <p className="text-xs text-slate-400">© 2026 EventAI Portal · Infosys Internship Project</p>
      </div>

      {/* Right Register Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <Link href="/dashboard" className="mb-4 inline-flex items-center gap-2 text-teal-600 lg:hidden">
              <Calendar className="h-6 w-6" />
              <span className="text-lg font-bold text-slate-900">EventAI Portal</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Create an account</h1>
            <p className="mt-1 text-xs text-slate-500">Join builders, organizers, and attendees across India.</p>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Full Name</label>
              <div className="relative mt-1">
                <User className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Kalaiselvam R."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pr-4 pl-10 text-sm focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

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

            {/* Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">Account Role</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {[
                  { value: "USER", label: "Attendee (Participant)" },
                  { value: "ADMIN", label: "Organizer (Admin)" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRole(opt.value as UserRole)}
                    className={`rounded-xl border py-2 text-xs font-semibold transition ${
                      role === opt.value
                        ? "border-teal-600 bg-teal-50 text-teal-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
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
                  placeholder="Min. 6 characters"
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

            <div>
              <label className="block text-xs font-semibold text-slate-700">Confirm Password</label>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full rounded-xl border border-slate-200 py-2.5 pr-4 pl-10 text-sm focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:bg-slate-300"
            >
              {loading ? "Creating account..." : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-teal-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
