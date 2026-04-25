"use client";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Rocket, Lightbulb, BookOpen, Mail, Link as LinkIcon, Compass, Globe } from "lucide-react";

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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-100 selection:text-cyan-700">
      <header className="px-8 py-10 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 rounded-2xl rotate-3 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Compass size={20} />
          </div>
          <span className="font-black text-xl tracking-tight">Student_<span className="text-cyan-500">Path</span></span>
        </div>
        <div className="flex gap-4">
          <a href="#contact" className="px-6 py-2 bg-slate-100 hover:bg-cyan-500 hover:text-white transition-all rounded-xl text-sm font-bold">
            Let's Talk
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-20">
        {/* Hero Section */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-100 rounded-full text-cyan-600 font-black text-[10px] uppercase tracking-widest mb-8"
            >
              <Rocket size={12} /> Class_of_{specialized_data?.grad_year || "2026"}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-12"
            >
              Building the <span className="text-cyan-500 underline decoration-8 underline-offset-8 decoration-cyan-100">future</span>, one project at a time.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 leading-relaxed max-w-xl"
            >
              {data.bio}
            </motion.p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
             <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 relative overflow-hidden group">
                <GraduationCap className="absolute -right-4 -bottom-4 text-slate-200 group-hover:text-cyan-100 transition-colors" size={160} />
                <div className="relative z-10">
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Institution</div>
                   <div className="text-2xl font-black text-slate-900">{specialized_data?.school || "University of Future"}</div>
                   <div className="mt-4 inline-block px-3 py-1 bg-white rounded-lg text-xs font-bold shadow-sm">
                      {specialized_data?.grad_year || "Pending"} Graduation
                   </div>
                </div>
             </div>
             <div className="p-8 bg-cyan-500 rounded-[2.5rem] text-white shadow-2xl shadow-cyan-500/20">
                <Lightbulb size={32} className="mb-6" />
                <div className="text-xl font-bold leading-tight">Currently exploring Distributed Systems and UI/UX Design.</div>
             </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="mb-40">
           <div className="flex items-center gap-4 mb-16">
             <h2 className="text-sm font-black text-slate-300 uppercase tracking-[0.4em]">Learning_Modules</h2>
             <div className="h-px flex-1 bg-slate-100"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { title: "Core Fundamentals", icon: BookOpen, color: "bg-orange-100 text-orange-600" },
               { title: "Project Labs", icon: Rocket, color: "bg-blue-100 text-blue-600" },
               { title: "Open Source", icon: LinkIcon, color: "bg-emerald-100 text-emerald-600" }
             ].map(item => (
               <div key={item.title} className="p-10 border-2 border-slate-50 rounded-[3rem] hover:border-cyan-100 transition-all group">
                 <div className={`w-14 h-14 ${item.color} rounded-2xl mb-8 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon size={24} />
                 </div>
                 <h4 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h4>
                 <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Implementing theory into practice through collaborative building and peer review sessions.
                 </p>
                 <div className="flex items-center gap-2 text-xs font-black uppercase text-cyan-500">
                    View Docs <ArrowRight size={14} className="ml-2" />
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* Footer / Contact Hub */}
        <footer id="contact" className="py-24 bg-slate-900 rounded-[3rem] text-white p-12 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[100px]"></div>
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-5xl font-black tracking-tighter mb-6 uppercase">LET'S <br /> <span className="text-cyan-400">BUILD.</span></h2>
                 <p className="text-slate-400 font-medium mb-10 max-w-xs">Excited to collaborate on student projects, research, or innovative ideas.</p>
              </div>
              <div className="flex flex-col gap-4">
                 {data.social_links?.email && (
                   <a href={`mailto:${data.social_links.email}`} className="px-8 py-5 bg-cyan-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-between">
                     Send Message <Mail size={16} />
                   </a>
                 )}
                 {data.social_links?.github && (
                   <a href={data.social_links.github} target="_blank" rel="noreferrer" className="px-8 py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-between">
                     Check GitHub <LinkIcon size={16} />
                   </a>
                 )}
                 {data.social_links?.linkedin && (
                   <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="px-8 py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-between">
                     LinkedIn <LinkIcon size={16} />
                   </a>
                 )}
                 {data.social_links?.custom_url && (
                   <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="px-8 py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-between">
                     {data.social_links.custom_label || "Other Project"} <Globe size={16} />
                   </a>
                 )}
              </div>
           </div>
           <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              <span>© {new Date().getFullYear()} Student Path // {data.full_name}</span>
              <span>Class of {specialized_data?.grad_year || "2026"}</span>
           </div>
        </footer>
      </main>
    </div>
  );
}

const ArrowRight = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
