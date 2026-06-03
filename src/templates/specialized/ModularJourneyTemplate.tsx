"use client";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Rocket, Lightbulb, BookOpen, Mail, Link as LinkIcon, Compass, Globe } from "lucide-react";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

interface PortfolioData {
  full_name: string;
  bio: string;
  username: string;
  specialized_data?: {
    school?: string;
    grad_year?: string;
  };
  social_links?: Record<string, string>;
}

export default function ModularJourneyTemplate({ data }: { data: PortfolioData }) {
  const { specialized_data } = data;

  return (
    <div className={`${dmSans.className} min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-cyan-100 selection:text-cyan-700 relative p-6 md:p-12 overflow-x-hidden flex items-center justify-center`}>
      
      {/* Dynamic Background dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40 z-0"></div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        
        {/* TIMELINE HEADER */}
        <div className="md:col-span-12 flex justify-between items-center bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-2xl rotate-3 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Compass size={20} />
            </div>
            <span className="font-black text-xl tracking-tight">Student_<span className="text-cyan-500">Path</span></span>
          </div>
          <div className="text-[10px] font-black uppercase text-cyan-600 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full">
            Class of {specialized_data?.grad_year || "2026"}
          </div>
        </div>

        {/* TIMELINE HERO CARD */}
        <div className="md:col-span-12 bg-white border border-slate-200/80 p-8 md:p-12 rounded-[2.5rem] shadow-sm space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-100 rounded-full text-cyan-600 font-black text-[10px] uppercase tracking-widest">
            <Rocket size={12} /> Education Path
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Building the <span className="text-cyan-500 underline decoration-4 underline-offset-4 decoration-cyan-100">future</span>, one semester at a time.
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
            {data.bio}
          </p>
        </div>

        {/* TIMELINE GRID / JOURNEY STEPS */}
        <div className="md:col-span-12 space-y-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Path Semesters</h3>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <div className="relative border-l-2 border-cyan-100 pl-6 ml-4 space-y-8 py-2">
            {[
              { year: "Semester 04", title: "Distributed Lab Projects", desc: "Implementing fault-tolerant cluster runtimes and REST API modules.", inst: specialized_data?.school || "University of Future" },
              { year: "Semester 03", title: "Full-Stack Development Focus", desc: "Building database schemas and responsive UI dashboards.", inst: specialized_data?.school || "University of Future" },
              { year: "Semester 02", title: "Algorithms & Paradigms", desc: "Focusing on data structures, sorting efficiency, and systems logic.", inst: specialized_data?.school || "University of Future" }
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-10 top-1 w-8 h-8 rounded-full border-4 border-[#F8FAFC] bg-cyan-500 flex items-center justify-center text-white text-[10px] font-black group-hover:scale-110 transition-transform">
                  {3 - idx}
                </div>
                
                <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:border-cyan-200 transition-all">
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600">{step.year}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{step.inst}</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TIMELINE ROW 3: Outreach CTA / Social Footer */}
        <div className="md:col-span-12 bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[90px]"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight uppercase">Let&apos;s build projects.</h2>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">Always looking to collaborate on student projects, research, or open source.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              {data.social_links?.email && (
                <a href={`mailto:${data.social_links.email}`} className="p-4 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-all text-center font-bold uppercase tracking-widest text-[10px] flex items-center justify-between px-6">
                  Send Mail Intake <Mail size={14} />
                </a>
              )}
              {data.social_links?.github && (
                <a href={data.social_links.github} target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-center font-bold uppercase tracking-widest text-[10px] text-slate-300 flex items-center justify-between px-6">
                  GitHub Profile <LinkIcon size={14} />
                </a>
              )}
              {data.social_links?.custom_url && (
                <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-center font-bold uppercase tracking-widest text-[10px] text-slate-300 flex items-center justify-between px-6">
                  {data.social_links.custom_label || "Other Project"} <Globe size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="md:col-span-12 text-center text-[9px] font-black text-slate-450 uppercase tracking-[0.4em] pt-4">
          © {new Date().getFullYear()} Student Path // {data.full_name}
        </div>

      </div>
    </div>
  );
}
