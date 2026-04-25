"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, Loader2, ArrowLeft, Shield, Terminal, ChevronRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      if (data?.session) {
        // Sync session to cookie for middleware
        await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session: data.session }),
        });

        localStorage.setItem("user_session", JSON.stringify(data.session));
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden flex items-center justify-center p-6">
      
      {/* SUBTLE DOT MATRIX OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#64748b_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8 font-bold uppercase tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio_Builder
          </Link>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
              Identity_Verification
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
              Access Portal
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Initialize secure session to Command Center
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-xs font-bold uppercase tracking-wider">{error}</p>
              </motion.div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Terminal className="w-3 h-3" />
                Auth_Identifier
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm text-sm font-medium"
                placeholder="your.email@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <span className="flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  Access_Key
                </span>
                <Link href="/forgot-password" title="Forgot Password" className="text-blue-600 hover:text-blue-700 normal-case tracking-normal font-bold">
                  Recovery?
                </Link>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm text-sm font-medium pr-12"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <span>Initialize_Login</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                <span className="bg-white px-4 text-slate-400">Social_Gateway</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={async () => {
                  await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/dashboard` } });
                }}
                className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm"
              >
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                Sign_In_With_Google
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: `${window.location.origin}/dashboard` } });
                  }}
                  className="flex items-center justify-center gap-3 px-4 py-3 bg-slate-900 border border-slate-900 rounded-xl hover:bg-black transition-all text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
                >
                  <img src="https://github.com/favicon.ico" className="w-4 h-4 invert" alt="GitHub" />
                  GitHub_ID
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await supabase.auth.signInWithOAuth({ provider: 'zoho', options: { redirectTo: `${window.location.origin}/dashboard` } });
                  }}
                  className="flex items-center justify-center gap-3 px-4 py-3 bg-[#f0483e] border border-[#f0483e] rounded-xl hover:bg-[#d0382e] transition-all text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
                >
                  <img src="https://www.zoho.com/favicon.ico" className="w-4 h-4" alt="Zoho" />
                  Zoho_Work
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-xs font-medium">
              Unauthorized access is monitored.{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-black uppercase tracking-wider ml-1">
                Create_Account
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            Encrypted
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            SOC-2
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
            Real-Time
          </span>
        </motion.div>
      </div>
    </main>
  );
}