"use client";
import React from "react";
import { motion } from "framer-motion";
import { PenTool, AlignLeft, Type, Share, ArrowRight, ExternalLink, Mail, Globe } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface PortfolioData {
  full_name: string;
  bio: string;
  username: string;
  specialized_data?: {
    medium?: string;
    software?: string;
  };
  social_links?: Record<string, string>;
}

export default function EditorialRichTemplate({ data }: { data: PortfolioData }) {
  const { specialized_data } = data;

  return (
    <div className={`${playfair.className} min-h-screen bg-[#fafaf9] text-[#1c1917] selection:bg-[#1c1917] selection:text-white p-6 md:p-16 flex flex-col justify-between`}>
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Magazine Masthead */}
        <header className="border-b border-[#1c1917] pb-8 flex flex-col md:flex-row justify-between items-baseline gap-4">
          <div className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black leading-none pb-1">
            {data.full_name}
          </div>
          <div className="flex gap-8 text-[9px] font-sans font-black uppercase tracking-[0.3em] text-[#1c1917]/70">
            <span>Issue 01 // Content Strategy</span>
          </div>
        </header>

        {/* Magazine Hero: Large intersecting titles */}
        <main className="py-20 space-y-24">
          <section className="space-y-8">
            <div className="text-[9px] font-sans font-black uppercase tracking-[0.4em] text-stone-400">
              // Editorial Portfolio
            </div>
            
            <h1 className="text-[10vw] font-bold leading-[0.8] tracking-tighter uppercase select-none">
              Words That<br />
              <span className="italic text-stone-400 font-normal">Shape Mind.</span>
            </h1>
          </section>

          {/* Asymmetrical Description Block */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-stone-200 pt-12">
            <div className="md:col-span-4 space-y-4">
              <span className="text-[9px] font-sans font-black uppercase tracking-[0.2em] text-stone-400 block">Core Medium</span>
              <p className="text-sm font-sans font-bold uppercase text-stone-850 leading-tight">
                {specialized_data?.medium || "Editorial Strategy & Copywriting"}
              </p>
            </div>
            <div className="md:col-span-8">
              <p className="text-2xl md:text-3xl leading-relaxed text-stone-800 font-light italic">
                {data.bio}
              </p>
            </div>
          </section>

          {/* Lookbook Folio Lists */}
          <section className="space-y-12">
            <div className="flex justify-between items-end border-b border-stone-200 pb-4">
              <h2 className="text-3xl font-bold uppercase tracking-tight">Folio Index</h2>
              <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-400">Vol. 01 // Active</span>
            </div>

            <div className="space-y-12">
              {[
                { num: "01", title: "Narrative Synthesis", desc: "Long-form editorial architectures for brand curation." },
                { num: "02", title: "Modern Copy Hubs", desc: "Crafting modular landing guides that communicate trust." },
                { num: "03", title: "Documentary Edits", desc: "Integrating interviews, reviews, and case study diagnostics." }
              ].map((item) => (
                <div key={item.num} className="group flex flex-col md:flex-row justify-between items-baseline border-b border-stone-150 pb-8 gap-6 hover:translate-x-3 transition-all cursor-pointer">
                  <div className="flex items-baseline gap-6">
                    <span className="text-xs font-sans font-bold text-stone-300">{item.num}</span>
                    <div>
                      <h3 className="text-2xl font-bold uppercase text-[#1c1917] group-hover:italic transition-all">{item.title}</h3>
                      <p className="text-xs text-stone-500 font-sans mt-1">{item.desc}</p>
                      <div className="h-px w-0 group-hover:w-full bg-[#1c1917] transition-all duration-300 mt-2" />
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-stone-300 group-hover:text-black transition-colors" />
                </div>
              ))}
            </div>
          </section>

          {/* Luxury Editorial Block */}
          <section className="bg-[#1c1917] text-stone-150 rounded-[2.5rem] p-12 md:p-20 space-y-8 relative overflow-hidden">
            <div className="text-[9px] font-sans font-black uppercase tracking-[0.4em] text-stone-500">// Technical Suite</div>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Precision in every <br /><span className="italic text-stone-400 font-normal">content layer.</span>
            </h3>
            
            <div className="flex flex-wrap gap-3 font-sans">
              {specialized_data?.software?.split(',').map((tool) => (
                <span key={tool} className="px-4 py-2 border border-stone-800 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all cursor-default">
                  {tool.trim()}
                </span>
              )) || ['Adobe CC', 'Figma', 'Markdown', 'LaTeX'].map((tool) => (
                <span key={tool} className="px-4 py-2 border border-stone-850 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          {/* Social / Contact Index */}
          <section className="border-t border-stone-200 pt-16 text-center space-y-12">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Let&apos;s <span className="italic font-normal text-stone-400">Collaborate.</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-8 font-sans text-[10px] font-black uppercase tracking-widest text-[#1c1917]">
              {data.social_links?.email && (
                <a href={`mailto:${data.social_links.email}`} className="border-b border-black pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors flex items-center gap-1.5">
                  <Mail size={12} /> Email Desk
                </a>
              )}
              {data.social_links?.linkedin && (
                <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="border-b border-black pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors">
                  LinkedIn ID
                </a>
              )}
              {data.social_links?.custom_url && (
                <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="border-b border-black pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors flex items-center gap-1.5">
                  <Globe size={12} /> {data.social_links.custom_label || "Other Portfolio"}
                </a>
              )}
            </div>
          </section>

        </main>

      </div>

      {/* Editorial footer signature */}
      <footer className="max-w-5xl mx-auto w-full border-t border-stone-200 mt-20 pt-8 flex justify-between items-center text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-stone-400">
        <span>© {new Date().getFullYear()} Editorial Archive</span>
        <span>Issue 01 // Completed</span>
      </footer>

    </div>
  );
}
