"use client";
import React from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Cpu, Globe, ExternalLink, ChevronRight } from "lucide-react";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"] });

const GithubSVG = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const MailIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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
    <div className={`${firaCode.className} min-h-screen bg-[#070807] text-emerald-400 selection:bg-emerald-500 selection:text-black relative p-4 md:p-8 overflow-x-hidden`}>
      {/* Matrix / Scanning Overlay Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      
      {/* Background Matrix Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto border border-emerald-500/20 bg-[#0c0e0c]/90 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)] backdrop-blur-md">
        
        {/* Terminal Header Chrome */}
        <div className="bg-[#141814] border-b border-emerald-500/20 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Console dots */}
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/75 block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/75 block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/75 block"></span>
            </div>
            <div className="h-4 w-px bg-emerald-500/20 mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-xs text-emerald-500/60">
              <Terminal size={14} className="animate-pulse" />
              <span className="hidden sm:inline">bash - {data.username.toLowerCase()}@port-OS</span>
              <span className="inline sm:hidden">bash</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-emerald-500/60 text-xs">
            <span className="hidden sm:inline">PING 0.04ms</span>
            {specialized_data?.github_user && (
              <a href={`https://github.com/${specialized_data.github_user}`} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                <GithubSVG size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Console Body */}
        <div className="p-6 md:p-12 space-y-16">
          
          {/* Welcome Screen / Hero */}
          <section className="space-y-6">
            <div className="text-[10px] text-emerald-500/40 uppercase tracking-widest border border-emerald-500/20 px-3 py-1 rounded inline-block">
              System Boot: Success
            </div>
            <div className="space-y-4">
              <div className="text-sm text-emerald-500/60 font-mono">
                guest@port-OS:~$ <span className="text-white">whoami</span>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-black text-white tracking-tight uppercase"
              >
                {data.full_name}
              </motion.h1>
            </div>

            {/* Spec Matrix Block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-emerald-500/10 border border-emerald-500/20 rounded-lg overflow-hidden mt-8 text-xs">
              <div className="p-4 bg-[#0d100d]/80 space-y-1">
                <span className="text-[10px] text-emerald-500/40 uppercase block">Domain_Module</span>
                <span className="font-bold uppercase text-white">{specialized_data?.domain || "Engineer"}</span>
              </div>
              <div className="p-4 bg-[#0d100d]/80 space-y-1 border-emerald-500/10 sm:border-x">
                <span className="text-[10px] text-emerald-500/40 uppercase block">Specialization</span>
                <span className="font-bold uppercase text-white">{specialized_data?.specialization || "Systems Architect"}</span>
              </div>
              <div className="p-4 bg-[#0d100d]/80 space-y-1">
                <span className="text-[10px] text-emerald-500/40 uppercase block">Acquisition_Path</span>
                <span className="font-bold uppercase text-white">{specialized_data?.course || "Self-Taught"}</span>
              </div>
            </div>
          </section>

          {/* Bio Terminal Command */}
          <section className="space-y-4">
            <div className="text-sm text-emerald-500/60 font-mono">
              guest@port-OS:~$ <span className="text-white">cat bio.txt</span>
            </div>
            <div className="p-6 bg-emerald-950/5 border border-emerald-500/10 rounded-lg text-emerald-300 leading-relaxed text-sm md:text-base border-l-4 border-l-emerald-500">
              {data.bio}
            </div>
          </section>

          {/* Skills / Infrastructures */}
          <section className="space-y-6">
            <div className="text-sm text-emerald-500/60 font-mono">
              guest@port-OS:~$ <span className="text-white">lshw -class network -class cpu</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Distributed Systems', spec: 'Kubernetes / Go / gRPC' },
                { name: 'Cloud Infrastructure', spec: 'AWS / Terraform / CI-CD' },
                { name: 'Runtime Systems', spec: 'Rust / TypeScript / Node.js' },
                { name: 'Database Engines', spec: 'Postgres / Redis / VectorDB' }
              ].map((skill, i) => (
                <div key={skill.name} className="p-5 bg-emerald-950/10 border border-emerald-500/15 rounded-lg flex justify-between items-center group hover:border-emerald-400/50 transition-all cursor-crosshair">
                  <div className="space-y-1">
                    <div className="text-[10px] text-emerald-500/40 font-mono">NODE_0{i+1}</div>
                    <div className="text-sm font-bold text-white uppercase">{skill.name}</div>
                    <div className="text-[11px] text-emerald-500/60">{skill.spec}</div>
                  </div>
                  <ChevronRight size={16} className="text-emerald-500/30 group-hover:text-emerald-400 transition-colors" />
                </div>
              ))}
            </div>
          </section>

          {/* Contact Terminal Command */}
          <section className="space-y-8 border-t border-emerald-500/10 pt-12">
            <div className="text-sm text-emerald-500/60 font-mono">
              guest@port-OS:~$ <span className="text-white">ssh connection@outreach</span>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-lg font-black uppercase text-white tracking-wider">Secure_Connection_Parameters</h2>
              
              <div className="flex flex-wrap gap-4">
                {data.social_links?.email && (
                  <a href={`mailto:${data.social_links.email}`} className="px-5 py-3 border border-emerald-500/30 bg-[#0d100d] hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-xs font-bold uppercase transition-all rounded flex items-center gap-2.5">
                    <MailIcon size={14} /> connection@outreach
                  </a>
                )}
                {data.social_links?.github && (
                  <a href={data.social_links.github} target="_blank" rel="noreferrer" className="px-5 py-3 border border-emerald-500/30 bg-[#0d100d] hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-xs font-bold uppercase transition-all rounded flex items-center gap-2.5">
                    <GithubSVG size={14} /> git_profile
                  </a>
                )}
                {data.social_links?.linkedin && (
                  <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="px-5 py-3 border border-emerald-500/30 bg-[#0d100d] hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-xs font-bold uppercase transition-all rounded flex items-center gap-2.5">
                    <ExternalLink size={14} /> linkedin_tunnel
                  </a>
                )}
                {data.social_links?.custom_url && (
                  <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="px-5 py-3 border border-emerald-500/30 bg-[#0d100d] hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-xs font-bold uppercase transition-all rounded flex items-center gap-2.5">
                    <Globe size={14} /> {data.social_links.custom_label || "business_node"}
                  </a>
                )}
              </div>
            </div>
          </section>

        </div>

        {/* Console Status Bar */}
        <div className="bg-[#141814] border-t border-emerald-500/20 px-6 py-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-emerald-500/40 uppercase font-mono gap-4">
          <div>© {new Date().getFullYear()} CORE_OS // {data.full_name}</div>
          <div className="flex gap-6">
            <span>SECURE_CONNECTION: AES_256</span>
            <span>OS_STATUS: nominal</span>
          </div>
        </div>

      </div>
    </div>
  );
}
