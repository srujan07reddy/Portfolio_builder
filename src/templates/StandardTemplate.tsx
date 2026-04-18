"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
};

export default function StandardTemplate({ siteData, activeTheme }: any) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const rolesArray = siteData.hero.roles.split(',').map((r: string) => r.trim());
  const labTagsArray = siteData.lab.tags.split(',').map((tag: string) => tag.trim());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % rolesArray.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rolesArray.length]);

  return (
    <main className="min-h-screen bg-[#020202] text-slate-300 font-mono selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* 1. THE SCANNING GRID OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <motion.div 
          animate={{ y: ["0%", "100%"] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className={`h-[2px] w-full ${activeTheme.accent} opacity-20 blur-sm`}
        />
      </div>

      {/* 2. HUD NAVIGATION */}
      <nav className="fixed top-0 w-full z-[60] px-8 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${activeTheme.accent} animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]`}></div>
          <h1 className="text-sm font-black tracking-[0.3em] text-white">
            OPERATOR<span className={activeTheme.text}>_{siteData.hero.name.split(' ')[0].toUpperCase()}</span>
          </h1>
        </div>
        <div className="text-[10px] space-x-6 text-slate-500 hidden md:block uppercase tracking-widest">
          <span>Auth: <span className={activeTheme.text}>Level_04</span></span>
          <span>Status: <span className="text-green-500">Online</span></span>
        </div>
      </nav>

      <div className="pt-40 pb-20 px-8 md:px-24 max-w-7xl mx-auto space-y-40 relative z-10">
        
        {/* 3. TACTICAL HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="lg:col-span-8 space-y-8">
            <div className={`inline-block px-3 py-1 border ${activeTheme.border} ${activeTheme.text} text-[10px] tracking-[0.4em] uppercase mb-4`}>
              Secured_Profile.v2
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
              {siteData.hero.name}
            </h2>

            <div className="flex items-center gap-4 h-12 border-y border-white/5">
              <span className={`${activeTheme.text} text-2xl tracking-widest animate-pulse`}>&gt;</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-xl md:text-3xl font-bold text-white uppercase tracking-wider"
                >
                  {rolesArray[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              {siteData.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-6 pt-6">
              <a href={`mailto:${siteData.links.email}`} className={`group relative px-8 py-4 bg-transparent border ${activeTheme.border} ${activeTheme.text} overflow-hidden transition-all duration-300 hover:text-black`}>
                <div className={`absolute inset-0 w-0 group-hover:w-full transition-all duration-300 ${activeTheme.accent} z-0`}></div>
                <span className="relative z-10 text-xs font-bold uppercase tracking-widest">Establish Comms</span>
              </a>
              <a href={siteData.links.github} className="px-8 py-4 border border-white/10 text-white/40 text-xs font-bold uppercase tracking-widest hover:border-white/40 transition-all">
                Directory Access
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className={`absolute -inset-4 border ${activeTheme.border} opacity-20 rounded-full animate-spin-slow`}></div>
              <div className="absolute inset-0 rounded-full overflow-hidden border border-white/10 group">
                <img src={siteData.hero.avatar} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Professional Portfolio" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* 4. DOMAIN MATRIX (Bento Grid Style) */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <h3 className={`text-xs uppercase tracking-[0.5em] ${activeTheme.text}`}>Capability_Matrix</h3>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteData.domains.list.map((domain: any, i: number) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="p-8 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-4 font-mono text-[8px] opacity-20 ${activeTheme.text}`}>0{i+1}</div>
                <h4 className="text-lg font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{domain.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{domain.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. CONSULTING COMMAND (Crack Developers) */}
        <section className={`relative p-12 md:p-20 border ${activeTheme.border} bg-[#050505] overflow-hidden group`}>
          <div className={`absolute top-0 left-0 w-2 h-full ${activeTheme.accent} opacity-50`}></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            <div>
              <h3 className={`text-xs uppercase tracking-widest ${activeTheme.text} mb-8`}>Strategic_Alignment</h3>
              <h4 className="text-4xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">
                {siteData.consulting.headline}
              </h4>
              <p className="text-slate-400 leading-relaxed mb-8">{siteData.consulting.body}</p>
              <a href={siteData.links.linkedin} className={`inline-block px-10 py-5 ${activeTheme.accent} text-black font-black text-[10px] uppercase tracking-[0.3em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]`}>
                {siteData.consulting.cta_text}
              </a>
            </div>
            <div className="border border-white/10 p-8 bg-black/40 backdrop-blur-md">
              <p className="text-white/60 text-sm italic font-light leading-loose mb-6">
                "{siteData.consulting.sub_body}"
              </p>
              <div className="flex gap-2">
                <div className={`h-1 w-12 ${activeTheme.accent}`}></div>
                <div className="h-1 w-2 bg-white/20"></div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER BAR */}
      <footer className="px-8 py-10 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">
            &copy; 2026 Operations Terminal // Decrypting Innovation
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
             <a href={siteData.links.github} className="hover:text-white transition-colors">GitHub</a>
             <a href={siteData.links.linkedin} className="hover:text-white transition-colors">LinkedIn</a>
             <a href={`mailto:${siteData.links.email}`} className={activeTheme.text}>Establish_Comms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
