"use client";
import React from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Cpu, Globe, ExternalLink, ChevronRight } from "lucide-react";

const GithubSVG = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface PortfolioData {
  full_name: string;
  bio: string;
  username: string;
  specialized_data?: {
    course?: string;
    domain?: string;
    specialization?: string;
    github_user?: string;
  };
  social_links?: Record<string, string>;
}

export default function DevPreciseTemplate({ data }: { data: PortfolioData }) {
  const { specialized_data } = data;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-emerald-500 font-mono selection:bg-emerald-500 selection:text-black">
      {/* Scanning Overlay Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      <header className="border-b border-emerald-900/30 p-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Terminal className="text-emerald-500 animate-pulse" size={20} />
          <span className="text-sm font-black uppercase tracking-tighter">
            SYS_OPERATOR: <span className="text-white">{data.username.toUpperCase()}</span>
          </span>
        </div>
        <div className="flex gap-4">
          {specialized_data?.github_user && (
            <a href={`https://github.com/${specialized_data.github_user}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <GithubSVG size={18} />
            </a>
          )}
          <Globe size={18} className="opacity-50" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-3 py-1 border border-emerald-500/30 rounded text-[10px] mb-8 uppercase font-bold tracking-[0.2em]"
          >
            Initializing_Identity_Protocol...
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase"
          >
            {data.full_name}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-emerald-900/30 py-8"
          >
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-900 font-black uppercase block">Technical_Domain</span>
              <span className="text-sm text-emerald-400 font-bold uppercase">{specialized_data?.domain || "Generalist"}</span>
            </div>
            <div className="space-y-1 border-emerald-900/30 md:border-x md:px-6">
              <span className="text-[10px] text-emerald-900 font-black uppercase block">Specialization</span>
              <span className="text-sm text-emerald-400 font-bold uppercase">{specialized_data?.specialization || "Engineering"}</span>
            </div>
            <div className="space-y-1 md:pl-6">
              <span className="text-[10px] text-emerald-900 font-black uppercase block">Course_Origin</span>
              <span className="text-sm text-emerald-400 font-bold uppercase">{specialized_data?.course || "Self-Taught"}</span>
            </div>
          </motion.div>
        </section>

        {/* Bio / About */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest flex items-center gap-2">
              <Code2 size={12} /> Mission_Manifesto
            </h2>
          </div>
          <div className="md:col-span-3">
            <p className="text-emerald-400/80 leading-relaxed text-lg">
              {data.bio}
            </p>
          </div>
        </section>

        {/* Technical Capabilities */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <Cpu className="text-emerald-500" size={24} />
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Core_Infrastructures</h2>
            <div className="h-px flex-1 bg-emerald-900/30"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Distributed Systems', 'Cloud Native Architecture', 'Advanced Algorithms', 'Cyber-Security Ops'].map((skill, i) => (
              <motion.div 
                key={skill}
                whileHover={{ x: 10 }}
                className="flex items-center justify-between p-6 bg-emerald-950/20 border border-emerald-900/30 group hover:border-emerald-500 transition-all cursor-crosshair"
              >
                <div className="flex items-center gap-4">
                  <span className="text-emerald-900 font-black">0{i+1}</span>
                  <span className="text-sm font-bold uppercase group-hover:text-white transition-colors">{skill}</span>
                </div>
                <ChevronRight className="text-emerald-900 group-hover:text-emerald-500" size={16} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact / Footer */}
        <footer id="contact" className="pt-20 border-t border-emerald-900/30">
          <div className="mb-12">
            <h2 className="text-[10px] font-black text-emerald-900 uppercase tracking-[0.4em] mb-8">Establish_Connection</h2>
            <div className="flex flex-wrap gap-4">
              {data.social_links?.email && (
                <a href={`mailto:${data.social_links.email}`} className="px-6 py-3 bg-emerald-950/30 border border-emerald-900/50 hover:border-emerald-500 hover:bg-emerald-500/10 text-xs font-bold uppercase transition-all flex items-center gap-3">
                   <Mail size={14} /> Send_Email
                </a>
              )}
              {data.social_links?.github && (
                <a href={data.social_links.github} target="_blank" rel="noreferrer" className="px-6 py-3 bg-emerald-950/30 border border-emerald-900/50 hover:border-emerald-500 hover:bg-emerald-500/10 text-xs font-bold uppercase transition-all flex items-center gap-3">
                   <GithubSVG size={14} /> GitHub_Repo
                </a>
              )}
              {data.social_links?.custom_url && (
                <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-emerald-950/30 border border-emerald-900/50 hover:border-emerald-500 hover:bg-emerald-500/10 text-xs font-bold uppercase transition-all flex items-center gap-3">
                   <Globe size={14} /> {data.social_links.custom_label || "Business_Site"}
                </a>
              )}
              {data.social_links?.linkedin && (
                <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 bg-emerald-950/30 border border-emerald-900/50 hover:border-emerald-500 hover:bg-emerald-500/10 text-xs font-bold uppercase transition-all flex items-center gap-3">
                   <ExternalLink size={14} /> LinkedIn_ID
                </a>
              )}
              {data.social_links?.twitter && (
                <a href={data.social_links.twitter} target="_blank" rel="noreferrer" className="px-6 py-3 bg-emerald-950/30 border border-emerald-900/50 hover:border-emerald-500 hover:bg-emerald-500/10 text-xs font-bold uppercase transition-all flex items-center gap-3">
                   <ExternalLink size={14} /> Twitter_Feed
                </a>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-30 text-[10px]">
            <div>© {new Date().getFullYear()} CORE_OS_PORTFOLIO // ALL_RIGHTS_RESERVED</div>
            <div className="flex gap-6 uppercase font-bold tracking-widest">
              <span>Status: Active</span>
              <span>Uptime: 99.9%</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

const Mail = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
