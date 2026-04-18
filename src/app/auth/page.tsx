"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shield, Lock, Mail } from "lucide-react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage(error.message);
    else setMessage("Check your email for the confirmation link!");
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else window.location.href = "/dashboard"; // Go to builder after login
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-md border border-cyan-500/30 bg-black/80 p-8 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <div className="flex flex-col items-center mb-8">
          <Shield className="w-12 h-12 text-cyan-500 mb-2" />
          <h2 className="text-2xl font-bold text-white tracking-widest">IDENTITY_VERIFICATION</h2>
          <p className="text-cyan-700 text-[10px]">SECURE DATA UPLINK V2.0</p>
        </div>

        <form className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-cyan-600" />
            <input
              type="email"
              placeholder="OPERATOR_EMAIL"
              className="w-full bg-black border border-cyan-900 p-3 pl-10 text-cyan-400 focus:border-cyan-500 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-cyan-600" />
            <input
              type="password"
              placeholder="ACCESS_CODE"
              className="w-full bg-black border border-cyan-900 p-3 pl-10 text-cyan-400 focus:border-cyan-500 outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="bg-cyan-900/30 border border-cyan-500 text-cyan-500 p-3 hover:bg-cyan-500 hover:text-black transition-all font-bold"
            >
              {loading ? "PROCESSING..." : "LOGIN"}
            </button>
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="bg-white text-black p-3 hover:bg-cyan-400 transition-all font-bold"
            >
              SIGN_UP
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-6 p-3 border border-yellow-500/50 text-yellow-500 text-[12px] text-center">
            {message.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}