"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, BarChart3, Users2, Target, Mail, ArrowUpRight, ShieldCheck, Globe } from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface PortfolioData {
  full_name: string;
  bio: string;
  username: string;
  specialized_data?: {
    team_size?: string;
    mgmt_style?: string;
  };
  social_links?: Record<string, string>;
}

export default function DataForwardTemplate({ data }: { data: PortfolioData }) {
  const { specialized_data } = data;

  return (
    <div className={`${spaceGrotesk.className} min-h-screen bg-[#0B0F19] text-slate-300 selection:bg-indigo-500 selection:text-white relative p-6 md:p-12 overflow-x-hidden flex items-center justify-center`}>
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20 z-0"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        
        {/* DASHBOARD NAVBAR: Logo & Active Connection */}
        <div className="md:col-span-12 flex justify-between items-center bg-[#111827]/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <ShieldCheck size={18} />
            </div>
            <span className="font-black uppercase tracking-tight text-white">Ops_<span className="text-indigo-400">Sync</span></span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 uppercase tracking-widest font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Feed Connected</span>
          </div>
        </div>

        {/* DASHBOARD MAIN HERO: Operational Summary */}
        <div className="md:col-span-8 bg-[#111827] border border-slate-800 p-8 md:p-12 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/50 border border-indigo-900/50 rounded text-indigo-400 font-bold text-[10px] uppercase tracking-widest">
              <Briefcase size={12} /> Strategic Ops & Execution
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase">
              Optimizing <span className="text-indigo-400">Pipeline</span> efficiency & scale.
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
              {data.bio}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-6 mt-6">
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Direct Reports</div>
              <div className="text-xl font-bold text-white uppercase">{specialized_data?.team_size || "12-15"} Personnel</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Leadership Mode</div>
              <div className="text-xl font-bold text-white uppercase">{specialized_data?.mgmt_style || "Agile Leader"}</div>
            </div>
          </div>
        </div>

        {/* DASHBOARD SIDEBAR: Analytics Counters */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
          {[
            { label: "Efficiency", val: "94.2%", icon: BarChart3, color: "text-emerald-400" },
            { label: "Growth Delta", val: "+28.4%", icon: ArrowUpRight, color: "text-indigo-400" },
            { label: "Retention", val: "98.1%", icon: Users2, color: "text-cyan-400" },
            { label: "Execution", val: "100%", icon: Target, color: "text-rose-400" }
          ].map((stat) => (
            <div key={stat.label} className="p-6 bg-[#111827] border border-slate-800 rounded-2xl flex flex-col justify-between min-h-[140px]">
              <stat.icon className={`${stat.color}`} size={20} />
              <div>
                <div className="text-2xl font-bold text-white mb-0.5">{stat.val}</div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* DASHBOARD ROW 2: Expertise & Focus */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Strategic Vision", desc: "Formulating architectural maps to drive multi-layered execution goals." },
            { title: "Personnel Mentorship", desc: "Empowering individuals through diagnostic reviews and resource optimization." },
            { title: "Process Diagnostics", desc: "Isolating friction factors and optimizing workflows to facilitate rapid scaling." }
          ].map((item, i) => (
            <div key={item.title} className="p-8 bg-[#111827] border border-slate-800 rounded-2xl space-y-4">
              <div className="text-indigo-400 font-mono text-xs font-bold">// MODULE_0{i+1}</div>
              <h3 className="text-lg font-bold text-white uppercase">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* DASHBOARD ROW 3: Intake CTA / Social Footer */}
        <div className="md:col-span-12 bg-[#111827] border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-xl font-bold text-white uppercase">Operational Ingress</h3>
            <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Direct scheduling interface for leadership consultations.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {data.social_links?.email && (
              <a href={`mailto:${data.social_links.email}`} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2">
                <Mail size={14} /> Send Brief
              </a>
            )}
            {data.social_links?.linkedin && (
              <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#1F2937] hover:bg-slate-700 border border-slate-800 text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                LinkedIn Connection
              </a>
            )}
            {data.social_links?.custom_url && (
              <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#1F2937] hover:bg-slate-700 border border-slate-800 text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2">
                <Globe size={14} /> {data.social_links.custom_label || "Launch Portal"}
              </a>
            )}
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="md:col-span-12 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] pt-4">
          © {new Date().getFullYear()} Operations Sync // {data.full_name}
        </div>

      </div>
    </div>
  );
}
