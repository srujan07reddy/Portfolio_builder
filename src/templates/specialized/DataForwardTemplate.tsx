"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, BarChart3, Users2, Target, Mail, ArrowUpRight, ShieldCheck, Globe } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      <nav className="max-w-6xl mx-auto px-8 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <ShieldCheck size={18} />
          </div>
          <span className="font-black uppercase tracking-tight text-lg">Executive_<span className="text-blue-600">Sync</span></span>
        </div>
        <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
          <a href="#strategy" className="hover:text-blue-600 transition-colors">Strategy</a>
          <a href="#impact" className="hover:text-blue-600 transition-colors">Impact</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-20">
        {/* Hero Section */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded text-blue-600 font-black text-[10px] uppercase tracking-widest mb-6"
            >
              <Briefcase size={12} /> Strategic_Leadership
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-black text-slate-900 leading-tight mb-8"
            >
              Building <span className="text-blue-600">scalable</span> teams and impact.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg"
            >
              {data.bio}
            </motion.p>

            <div className="flex gap-6">
               <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Managed</div>
                  <div className="text-2xl font-black text-blue-600">{specialized_data?.team_size || "10+"} Members</div>
               </div>
               <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Philosophy</div>
                  <div className="text-lg font-bold leading-none">{specialized_data?.mgmt_style || "Servant Lead"}</div>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] blur-3xl -z-10"></div>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: "Efficiency", val: "94%", icon: BarChart3, color: "text-emerald-500" },
                 { label: "Growth", val: "+28%", icon: ArrowUpRight, color: "text-blue-500" },
                 { label: "Retention", val: "98%", icon: Users2, color: "text-indigo-500" },
                 { label: "Execution", val: "100%", icon: Target, color: "text-rose-500" }
               ].map((stat, i) => (
                 <motion.div 
                   key={stat.label}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.3 + (i * 0.1) }}
                   className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50"
                 >
                   <stat.icon className={`${stat.color} mb-4`} size={24} />
                   <div className="text-3xl font-black text-slate-900 mb-1">{stat.val}</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section id="strategy" className="mb-32">
           <div className="flex items-center gap-4 mb-16">
             <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em]">Operational_DNA</h2>
             <div className="h-px flex-1 bg-slate-200"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { title: "Strategic Vision", desc: "Aligning long-term goals with tactical execution to ensure sustainable growth." },
               { title: "Team Mentorship", desc: "Empowering individuals to excel through coaching and resource management." },
               { title: "Process Optimization", desc: "Eliminating bottlenecks and streamlining workflows for maximum output." }
             ].map(item => (
               <div key={item.title} className="space-y-4">
                 <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">{item.title}</h4>
                 <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                 <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
               </div>
             ))}
           </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-24 bg-slate-900 rounded-[3rem] text-white p-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-10 blur-[100px]"></div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h3 className="text-4xl font-black mb-8 uppercase tracking-tighter">Ready for the next <span className="text-blue-500">Milestone?</span></h3>
                 <p className="text-slate-400 leading-relaxed mb-10 max-w-sm">
                    Currently open to leadership opportunities and advisory roles in high-growth ecosystems.
                 </p>
                 <a 
                   href={`mailto:${data.username}@example.com`}
                   className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/20"
                 >
                   Initiate Contact <Mail size={16} />
                 </a>
              </div>
              <div className="grid grid-cols-1 gap-4 font-mono text-[10px] text-slate-500">
                 <div className="p-6 border border-slate-800 rounded-2xl bg-slate-800/30">
                    <span className="text-blue-500">01_</span> DIRECT_REPORTS: {specialized_data?.team_size || "10-20"}
                 </div>
                 <div className="p-6 border border-slate-800 rounded-2xl bg-slate-800/30">
                    <span className="text-blue-500">02_</span> MANAGEMENT_MODEL: {specialized_data?.mgmt_style || "AGILE_FLUID"}
                 </div>
                 <div className="p-6 border border-slate-800 rounded-2xl bg-slate-800/30">
                    <span className="text-blue-500">03_</span> STATUS: READY_FOR_DEPLOYMENT
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer id="contact" className="max-w-6xl mx-auto px-8 py-20 border-t border-slate-200">
         <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-md">
               <h2 className="text-4xl font-black tracking-tighter mb-6 uppercase">Let's <span className="text-blue-600">Connect.</span></h2>
               <p className="text-slate-500 font-medium leading-relaxed">Open for strategic leadership roles, advisory positions, or board memberships.</p>
            </div>
            <div className="flex flex-wrap gap-4">
               {data.social_links?.email && (
                 <a href={`mailto:${data.social_links.email}`} className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-3">
                   <Mail size={14} /> Send Brief
                 </a>
               )}
               {data.social_links?.linkedin && (
                 <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-blue-600 transition-all shadow-sm flex items-center gap-3">
                   LinkedIn
                 </a>
               )}
               {data.social_links?.twitter && (
                 <a href={data.social_links.twitter} target="_blank" rel="noreferrer" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-blue-600 transition-all shadow-sm flex items-center gap-3">
                   Twitter
                 </a>
               )}
               {data.social_links?.custom_url && (
                 <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="px-8 py-4 bg-blue-50 border border-blue-100 text-blue-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center gap-3">
                   <Globe size={14} /> {data.social_links.custom_label || "Business Venture"}
                 </a>
               )}
            </div>
         </div>
         <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>© {new Date().getFullYear()} Executive Sync // {data.full_name}</span>
            <div className="flex gap-8">
               <span>Status: Active</span>
               <span>Region: Global</span>
            </div>
         </div>
      </footer>
    </div>
  );
}
