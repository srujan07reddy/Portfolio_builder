"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Award, Mail, ChevronRight, Quote, Book } from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"] });

interface PortfolioData {
  full_name: string;
  bio: string;
  username: string;
  specialized_data?: {
    subject?: string;
    university?: string;
    philosophy?: string;
  };
  social_links?: Record<string, string>;
}

export default function AcademicCleanTemplate({ data }: { data: PortfolioData }) {
  const { specialized_data } = data;

  // Split bio into first character (for drop cap) and the rest
  const bioText = data.bio || "Professional biography here...";
  const firstLetter = bioText.charAt(0);
  const remainingBio = bioText.slice(1);

  return (
    <div className={`${lora.className} min-h-screen bg-[#FAF9F6] text-[#1E293B] selection:bg-[#E2E8F0] selection:text-slate-900 p-8 md:p-16 flex flex-col justify-between`}>
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Editorial Journal Header */}
        <header className="border-b-2 border-double border-slate-300 py-6 text-center space-y-2">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 font-sans">
            Curriculum Vitæ & Documentation
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none italic">
            {data.full_name}
          </h1>
          <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-500 pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span>{specialized_data?.university || "Independent Scholar"}</span>
            <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span>{specialized_data?.subject || "General Pedagogy"}</span>
          </div>
        </header>

        {/* Main Document Body */}
        <main className="py-16 space-y-20">
          
          {/* Philosophical Opening / Drop Cap Bio */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline">
            <div className="md:col-span-4 border-r-0 md:border-r border-slate-200 pr-0 md:pr-8 py-2">
              <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Subject Mastery</span>
              <div className="text-xl font-bold italic text-slate-900 leading-snug">
                {specialized_data?.subject || "Curriculum Design & Educational Philosophy"}
              </div>
            </div>
            
            <div className="md:col-span-8 space-y-6">
              <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-slate-400 block">Personal Manifesto</span>
              <p className="text-lg md:text-xl leading-relaxed text-slate-800 text-justify">
                <span className="float-left text-6xl md:text-7xl font-bold leading-[0.8] pr-3 pt-1 text-slate-900 font-serif">
                  {firstLetter}
                </span>
                {remainingBio}
              </p>
            </div>
          </section>

          {/* Academic Philosophy Quote */}
          {specialized_data?.philosophy && (
            <section className="bg-slate-100/50 border border-slate-200/60 rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6">
              <Quote className="mx-auto text-slate-300" size={32} />
              <p className="text-xl md:text-2xl italic leading-relaxed text-slate-700 font-medium">
                &quot;{specialized_data.philosophy}&quot;
              </p>
              <div className="h-0.5 w-16 bg-slate-300 mx-auto"></div>
            </section>
          )}

          {/* Areas of Expertise / Syllabus */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-xs font-sans font-black uppercase tracking-[0.3em] text-slate-400">Curriculum & Research Areas</h3>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Curriculum Design", desc: "Crafting structured course timelines and digital resource matrices." },
                { title: "Differentiated Instruction", desc: "Adapting lesson objectives to meet the specific requirements of cohorts." },
                { title: "Educational Tech Systems", desc: "Integrating modern software tools directly into classroom teaching models." },
                { title: "Formative Assessments", desc: "Implementing progressive diagnostic analytics to monitor student progression." }
              ].map((item, i) => (
                <div key={item.title} className="pb-6 border-b border-slate-200 space-y-2 group">
                  <div className="flex items-center gap-4">
                    <span className="font-sans font-bold text-xs text-slate-400">0{i+1}.</span>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:italic transition-all">{item.title}</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed pl-8">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact / Publications Links */}
          <section className="border-t-2 border-double border-slate-300 pt-16 space-y-8">
            <div className="text-center">
              <h3 className="text-xs font-sans font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Scholarly Connections</h3>
              
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs font-sans font-bold uppercase tracking-wider">
                {data.social_links?.email && (
                  <a href={`mailto:${data.social_links.email}`} className="text-slate-600 hover:text-slate-900 border-b border-slate-300 pb-1 hover:border-slate-900 transition-all flex items-center gap-1.5">
                    <Mail size={12} /> Email Consult
                  </a>
                )}
                {data.social_links?.linkedin && (
                  <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 border-b border-slate-300 pb-1 hover:border-slate-900 transition-all">
                    Professional Network
                  </a>
                )}
                {data.social_links?.custom_url && (
                  <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 border-b border-slate-300 pb-1 hover:border-slate-900 transition-all flex items-center gap-1.5">
                    <Book size={12} /> {data.social_links.custom_label || "Research Repository"}
                  </a>
                )}
                {data.social_links?.twitter && (
                  <a href={data.social_links.twitter} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 border-b border-slate-300 pb-1 hover:border-slate-900 transition-all">
                    Twitter / X
                  </a>
                )}
              </div>
            </div>
          </section>

        </main>

      </div>

      {/* Editorial Footer */}
      <footer className="max-w-4xl mx-auto w-full border-t border-slate-200 mt-20 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400 gap-4">
        <span>© {new Date().getFullYear()} {data.full_name}</span>
        <div className="flex gap-6">
          <span>Documentation Index: verified</span>
          <span>Archival Code: academic-v1</span>
        </div>
      </footer>

    </div>
  );
}
