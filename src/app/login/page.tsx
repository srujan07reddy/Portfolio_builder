"use client";
import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Loader2, ArrowLeft, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Store session and redirect
      localStorage.setItem("user_session", JSON.stringify(data.session));
      router.push("/dashboard");
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Access Your Command Center
            </h2>
            <p className="text-slate-600">
              Enter your strategic operations dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
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
                <Link href="/forgot-password" className="float-right text-xs text-blue-600 hover:text-blue-700">
                  Forgot?
                </Link>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                placeholder="Enter your password"
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
                  Accessing Command Center...
                </>
              ) : (
                "Access Command Center"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600 text-sm">
              New to Portfolio Builder?{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-bold">
                Deploy Your Profile
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