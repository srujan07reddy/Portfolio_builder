"use client";
import React from "react";
import { motion } from "framer-motion";
import { PenTool, AlignLeft, Type, Share, ArrowRight, ExternalLink, Mail } from "lucide-react";

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
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-serif selection:bg-[#1c1917] selection:text-white">
      <header className="px-12 py-10 flex justify-between items-center sticky top-0 bg-[#fafaf9]/80 backdrop-blur-md z-50">
        <div className="text-xl font-bold tracking-tighter border-b-2 border-black">
          {data.full_name}
        </div>
        <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] font-sans">
          <a href="#" className="hover:line-through transition-all">Journal</a>
          <a href="#" className="hover:line-through transition-all">Portfolio</a>
          <a href="#" className="hover:line-through transition-all">About</a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-12 py-32">
        {/* Hero Section */}
        <section className="mb-60">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-stone-400"
          >
            <PenTool size={12} /> Editorial_Mastery // {specialized_data?.medium || "Content Strategy"}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12vw] font-bold leading-[0.85] tracking-tighter mb-24"
          >
            Words_that <br />
            <span className="italic text-stone-400">Resonate.</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-stone-200 pt-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 block mb-4">Core_Focus</span>
              <p className="text-lg font-bold leading-tight uppercase font-sans">
                {specialized_data?.medium || "Content Direction & Editorial Oversight"}
              </p>
            </div>
            <div className="md:col-span-8">
              <p className="text-3xl leading-snug text-stone-800">
                {data.bio}
              </p>
            </div>
          </div>
        </section>

        {/* Work Grid */}
        <section className="mb-60">
          <div className="flex justify-between items-end mb-20">
             <h2 className="text-6xl font-bold tracking-tighter">Selected_Folio</h2>
             <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">Vol. 01 / 2024</div>
          </div>

          <div className="space-y-32">
             {[
               { title: "The Art of Digital Narrative", category: "Long-form / Culture", year: "2023" },
               { title: "Editing for the Modern Web", category: "Technical / UX", year: "2024" },
               { title: "Synthesizing Chaos into Content", category: "Strategy / Brand", year: "2023" }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ x: 20 }}
                 className="group border-b border-stone-200 pb-12 cursor-pointer flex flex-col md:flex-row justify-between items-baseline gap-8"
               >
                 <div className="flex items-baseline gap-8">
                    <span className="text-[10px] font-black font-sans text-stone-300">0{i+1}</span>
                    <h3 className="text-4xl md:text-6xl font-bold group-hover:italic transition-all">{item.title}</h3>
                 </div>
                 <div className="flex items-center gap-12 font-sans">
                    <span className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">{item.category}</span>
                    <ArrowRight className="text-stone-300 group-hover:text-black transition-colors" size={24} />
                 </div>
               </motion.div>
             ))}
          </div>
        </section>

        {/* Tools Section */}
        <section className="bg-[#1c1917] text-stone-100 rounded-[4rem] p-24 mb-60 overflow-hidden relative">
          <Type className="absolute -right-20 -bottom-20 text-stone-800" size={400} />
          <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-stone-500">Tech_Stack_&_Tools</h3>
            <div className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-12 max-w-2xl">
              Precision in every <span className="text-stone-500">software layer.</span>
            </div>
            <div className="flex flex-wrap gap-4">
               {specialized_data?.software?.split(',').map(tool => (
                 <span key={tool} className="px-6 py-3 border border-stone-700 rounded-full text-xs font-bold uppercase tracking-widest font-sans hover:bg-stone-100 hover:text-black transition-all cursor-default">
                   {tool.trim()}
                 </span>
               )) || ['Adobe CC', 'Figma', 'Markdown', 'LaTeX'].map(tool => (
                 <span key={tool} className="px-6 py-3 border border-stone-700 rounded-full text-xs font-bold uppercase tracking-widest font-sans">
                   {tool}
                 </span>
               ))}
            </div>
          </div>
        </section>

        {/* Footer / Contact Hub */}
        <footer id="contact" className="pt-32 pb-20 border-t border-stone-200 text-center">
           <h2 className="text-8xl md:text-[15vw] font-bold tracking-tighter mb-16 leading-none">LET'S <br /> <span className="italic text-stone-400">CONNECT.</span></h2>
           
           <div className="flex flex-wrap justify-center gap-12 font-sans mb-32">
              {data.social_links?.email && (
                <a href={`mailto:${data.social_links.email}`} className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 hover:text-stone-500 transition-colors flex items-center gap-2">
                  <Mail size={14} /> Send Email
                </a>
              )}
              {data.social_links?.linkedin && (
                <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 hover:text-stone-500 transition-colors">
                  LinkedIn
                </a>
              )}
              {data.social_links?.twitter && (
                <a href={data.social_links.twitter} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 hover:text-stone-500 transition-colors">
                  Twitter / X
                </a>
              )}
              {data.social_links?.github && (
                <a href={data.social_links.github} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 hover:text-stone-500 transition-colors">
                  GitHub
                </a>
              )}
              {data.social_links?.instagram && (
                <a href={data.social_links.instagram} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 hover:text-stone-500 transition-colors">
                  Instagram
                </a>
              )}
              {data.social_links?.youtube && (
                <a href={data.social_links.youtube} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 hover:text-stone-500 transition-colors">
                  YouTube
                </a>
              )}
              {data.social_links?.custom_url && (
                <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 hover:text-stone-500 transition-colors">
                  {data.social_links.custom_label || "Portfolio_Plus"}
                </a>
              )}
           </div>

           <div className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-300">© {new Date().getFullYear()} {data.full_name} // Editorial Archive</div>
        </footer>
      </main>
    </div>
  );
}
