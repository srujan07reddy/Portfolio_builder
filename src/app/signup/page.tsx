"use client";
import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle, Loader2, ArrowLeft } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      setSuccess(true);
      setMessage("Check your email for the verification link!");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio Builder
        </Link>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Deploy Your Profile
            </h2>
            <p className="text-slate-600">
              Create your strategic professional identity
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Verification Email Sent</h3>
              <p className="text-slate-600 text-sm">
                Check your email and click the verification link to activate your account.
              </p>
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
              >
                Proceed to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-6">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p className="text-emerald-700 text-sm">{message}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
                  Professional Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  placeholder="your.email@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-slate-900 mb-2">
                  Secure Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Deploying Profile...
                  </>
                ) : (
                  "Deploy Profile"
                )}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-slate-600 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold">
                Access Portal
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 mb-4">Enterprise-grade security & privacy</p>
          <div className="flex justify-center gap-6 text-xs text-slate-400">
            <span>🔒 Encrypted</span>
            <span>🛡️ SOC 2 Compliant</span>
            <span>⚡ Real-time Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
}