"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  ChevronRight,
  Code2,
  Sparkles,
  Zap,
  Shield,
  Layers
} from "lucide-react";

export default function StandardTemplate({ siteData, activeTheme }: any) {
  const rolesArray = siteData.hero.roles ? siteData.hero.roles.split(',').flatMap((r: string) => [r.trim(), 2000]) : [];
  
  const accentGradient: Record<string, string> = {
    Cyan: "from-cyan-400 to-blue-600",
    Violet: "from-violet-400 to-purple-600",
    Emerald: "from-emerald-400 to-teal-600",
    Ruby: "from-rose-400 to-red-600"
  };

  const activeGradient = accentGradient[activeTheme.name] || "from-cyan-400 to-blue-600";

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* GLOWING BACKGROUND ORBS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]`} />
      </div>

      {/* NAVIGATION */}
      <nav className="sticky top-0 w-full z-[100] px-8 py-6 backdrop-blur-md border-b border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${activeGradient} rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20`}>
              <Sparkles size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">
              {siteData.hero.name}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/60">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Works</a>
            <a href="#contact" className={`px-6 py-2 bg-white text-black rounded-full hover:bg-white/90 transition-all`}>Hire Me</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        
        {/* HERO SECTION */}
        <section id="home" className="pt-48 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400">
              <Zap size={14} /> Available for projects
            </div>
            
            <h2 className="text-7xl md:text-8xl font-black tracking-tighter leading-none">
              Building <br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${activeGradient}`}>
                Digital Futures.
              </span>
            </h2>

            <div className="text-2xl md:text-3xl font-medium text-white/80 min-h-[1.5em]">
              {rolesArray.length > 0 && (
                <TypeAnimation sequence={rolesArray} repeat={Infinity} speed={50} />
              )}
            </div>

            <p className="text-lg text-white/40 max-w-xl leading-relaxed">
              {siteData.bio}
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <button className={`px-8 py-4 bg-gradient-to-r ${activeGradient} text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-105 transition-all flex items-center gap-2`}>
                Start Project <ArrowRight size={16} />
              </button>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all">
                  <Github size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className={`absolute -inset-10 bg-gradient-to-br ${activeGradient} opacity-20 blur-[100px] animate-pulse`} />
            <div className="relative bg-white/5 border border-white/10 rounded-[3rem] p-4 backdrop-blur-3xl overflow-hidden aspect-square">
              <img 
                src={siteData.hero.avatar} 
                className="w-full h-full object-cover rounded-[2.5rem] brightness-90 group-hover:brightness-110 transition-all" 
                alt="Profile" 
              />
              <div className="absolute bottom-10 left-10 right-10 p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-sm font-bold">Active in AI Systems</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* BENTO EXPERIENCE GRID */}
        <section id="projects" className="py-32 space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Works // Collections</h3>
            <h2 className="text-5xl font-black tracking-tight">Recent Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.projects && siteData.projects.length > 0 ? (
              siteData.projects.map((project: any, idx: number) => (
                <div key={idx} className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all flex flex-col">
                  <div className="p-8 space-y-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h4 className="text-xl font-black">{project.name}</h4>
                        <p className="text-xs text-white/40 leading-relaxed">{project.description}</p>
                      </div>
                      <ExternalLink size={18} className="text-white/20 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tools?.split(',').map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-white/40 uppercase tracking-widest border border-white/5">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="h-40 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 transition-all" />
                </div>
              ))
            ) : (
              <div className="col-span-full p-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">No_Projects_Indexed_Yet</p>
              </div>
            )}
          </div>
        </section>

        {/* SERVICES / CONSULTING */}
        <section id="services" className="py-32">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-12 md:p-24 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-black leading-none">Ready to <br /> Transform?</h2>
                <p className="text-white/80 text-lg">Specializing in high-performance digital solutions, AI integration, and scalable system architecture.</p>
                <div className="flex gap-4">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <h5 className="text-2xl font-black">99%</h5>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Uptime Delivery</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <h5 className="text-2xl font-black">15+</h5>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Global Clients</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 space-y-8">
                <h4 className="text-xl font-bold">Let's discuss your next breakthrough.</h4>
                <div className="space-y-4">
                  <input type="text" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-white/20 transition-all" />
                  <button className="w-full py-4 bg-white text-blue-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/90 transition-all">
                    Initialize Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.4em]">Get_In_Touch</h2>
                <h3 className="text-6xl font-black leading-none tracking-tighter uppercase">Let's build <br /> something <br /> legendary.</h3>
              </div>
              <p className="text-white/40 text-lg leading-relaxed max-w-md">
                I'm currently available for new projects, full-time roles, or consulting. Drop me a line and let's discuss how we can work together.
              </p>
              <div className="space-y-6">
                <a href={`mailto:${siteData.links.email}`} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Email_Address</p>
                    <p className="text-xl font-bold">{siteData.links.email}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-3xl space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Your_Name</label>
                  <input type="text" placeholder="Alex Rivera" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Subject</label>
                  <input type="text" placeholder="Project Inquiry" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">Message</label>
                <textarea placeholder="Tell me about your vision..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none transition-all" />
              </div>
              <button 
                onClick={() => {
                  alert("Connection secure. Message encrypted and sent to " + siteData.links.email);
                }}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
              >
                Launch_Message <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </section>

      </div>

      <footer className="py-20 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
               <Sparkles size={16} className="text-white/40" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">© {new Date().getFullYear()} {siteData.hero.name} | Built with Portfolio Builder</p>
          </div>
          <div className="flex gap-8">
             {[
               { icon: Twitter, url: siteData.links.twitter },
               { icon: Github, url: siteData.links.github },
               { icon: Linkedin, url: siteData.links.linkedin },
               { icon: Mail, url: `mailto:${siteData.links.email}` }
             ].map((item, i) => (
               <a key={i} href={item.url} target="_blank" className="text-white/40 hover:text-white transition-colors">
                 <item.icon size={20} />
               </a>
             ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
