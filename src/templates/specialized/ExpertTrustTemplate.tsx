"use client";
import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, Award, FileText, ClipboardList, Mail, Globe, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

interface PortfolioData {
  full_name: string;
  bio: string;
  username: string;
  specialized_data?: {
    license?: string;
    specialty?: string;
  };
  social_links?: Record<string, string>;
}

export default function ExpertTrustTemplate({ data }: { data: PortfolioData }) {
  const { specialized_data } = data;

  return (
    <div className={`${plusJakarta.className} min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 selection:text-blue-700`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Sticky Verification Sidebar Card */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-100/50 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                  <Stethoscope size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 block">Verified Operator</span>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">{data.full_name}</h1>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">License ID</span>
                  <span className="font-mono font-bold text-slate-800">{specialized_data?.license || "LIC-99882200-B"}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Specialty</span>
                  <span className="font-bold text-slate-800">{specialized_data?.specialty || "Advisory Lead"}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Status</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Active
                  </span>
                </div>
              </div>

              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                <Calendar size={14} /> Schedule Consult
              </button>
            </div>
          </aside>

          {/* RIGHT: Scrollable Diagnostic Details */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* Professional Background */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-blue-600" size={20} />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Executive Summary</h2>
              </div>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
                {data.bio}
              </p>
            </section>

            {/* Clinical / Expertise Focus */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Diagnostic Focus Areas</h3>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Risk Mitigation", desc: "Detailed diagnostic auditing to isolate operational bottleneck variables.", icon: ShieldCheck },
                  { title: "Strategic Advisory", desc: "Consultative planning maps to align leadership parameters.", icon: ClipboardList },
                  { title: "Research Integrity", desc: "Peer-reviewed analysis matrices for regulatory validation.", icon: FileText },
                  { title: "Scale Deployment", desc: "Optimizing pipeline operations to facilitate growth objectives.", icon: Award }
                ].map(item => (
                  <div key={item.title} className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-all group">
                    <item.icon className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={20} />
                    <h4 className="text-base font-bold mb-2 text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Credentials / Referrals */}
            <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px]"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight uppercase">Direct Intake Hub</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Referrals, corporate intakes, or advisory request logs can be dispatched immediately.</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {data.social_links?.email && (
                    <a href={`mailto:${data.social_links.email}`} className="p-5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all text-center font-bold uppercase tracking-widest text-[10px]">
                      Email Intake Desk
                    </a>
                  )}
                  {data.social_links?.linkedin && (
                    <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-center font-bold uppercase tracking-widest text-[10px] text-slate-300">
                      LinkedIn ID
                    </a>
                  )}
                  {data.social_links?.custom_url && (
                    <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-center font-bold uppercase tracking-widest text-[10px] text-slate-300">
                      {data.social_links.custom_label || "Consultation Portal"}
                    </a>
                  )}
                </div>
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* Corporate Compliance Footer */}
      <footer className="bg-white border-t border-slate-200 mt-24 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest gap-4">
          <span>© {new Date().getFullYear()} Expert Trust System // {data.full_name}</span>
          <div className="flex gap-6">
            <span>Security: HIPAA Certified</span>
            <span>Logs: Encrypted</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
