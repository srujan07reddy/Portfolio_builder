"use client";
import React from "react";
import { motion } from "framer-motion";
import { Play, Clapperboard, Star, Camera, User, Mail, Globe, Film } from "lucide-react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"] });

const InstagramSVG = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface PortfolioData {
  full_name: string;
  bio: string;
  username: string;
  specialized_data?: {
    demo_url?: string;
    agency?: string;
    roles?: string;
  };
  social_links?: Record<string, string>;
}

export default function CinemaDramaticTemplate({ data }: { data: PortfolioData }) {
  const { specialized_data } = data;

  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${match[2]}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(specialized_data?.demo_url);

  return (
    <div className={`${syne.className} min-h-screen bg-black text-stone-200 selection:bg-amber-500 selection:text-black relative overflow-x-hidden`}>
      
      {/* Immersive Video Hero */}
      <section className="relative h-[90vh] w-full overflow-hidden flex flex-col justify-end">
        {embedUrl ? (
          <div className="absolute inset-0 z-0">
            <iframe 
              src={embedUrl}
              className="w-full h-full scale-[1.5] opacity-30 pointer-events-none"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-stone-950 opacity-40 z-0" />
        )}
        
        {/* Spotlight Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none z-10" />

        <div className="relative z-20 w-full px-6 md:px-12 pb-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-amber-500 font-bold uppercase tracking-[0.4em] text-xs">
              <Film size={16} className="animate-pulse" />
              <span>Spotlight Featured Performer</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
              {data.full_name}
            </h1>
            
            <div className="flex flex-wrap gap-4 items-center pt-4">
              <div className="px-6 py-2.5 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-stone-300">
                ★ {specialized_data?.agency || "Independent Performer"}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Theatrical Section */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-24 space-y-32">
        
        {/* Credit Reels / Notable Roles */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-stone-900 pt-16">
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Selected Credits</span>
            <h2 className="text-3xl font-black uppercase text-white tracking-tight leading-none">Notable<br />Repertoire</h2>
          </div>
          
          <div className="md:col-span-8 space-y-12">
            {specialized_data?.roles?.split(',').map((role, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group border-b border-stone-900 pb-6 flex justify-between items-baseline"
              >
                <div className="space-y-1">
                  <span className="text-stone-700 font-mono text-[9px] block tracking-widest">ACT_0{i+1}</span>
                  <h3 className="text-xl md:text-2xl font-bold uppercase text-white group-hover:text-amber-500 transition-colors">{role.trim()}</h3>
                </div>
                <div className="w-8 h-px bg-stone-850 group-hover:w-16 bg-amber-500 transition-all duration-300"></div>
              </motion.div>
            )) || (
              <p className="text-stone-500 font-mono text-xs italic">Update notable credentials in editor.</p>
            )}
          </div>
        </section>

        {/* Biography Block */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-12">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-6">Manifesto & Mission</div>
            <p className="text-2xl md:text-4xl font-light leading-snug text-stone-300 italic max-w-4xl">
              &quot;{data.bio}&quot;
            </p>
          </div>
        </section>

        {/* Cinematic Media Showcase */}
        <section className="space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Theatrical Capture</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[250px] sm:h-[450px] bg-stone-900 rounded-xl overflow-hidden relative group border border-stone-900">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
               <div className="absolute bottom-6 left-6">
                 <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500 block mb-1">STILL_01</span>
                 <h4 className="text-xl font-bold uppercase text-white">Dramatic Monologue</h4>
               </div>
            </div>
            <div className="h-[250px] sm:h-[450px] bg-stone-900 rounded-xl overflow-hidden relative group border border-stone-900">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691523567-697424396261?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
               <div className="absolute bottom-6 left-6">
                 <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500 block mb-1">STILL_02</span>
                 <h4 className="text-xl font-bold uppercase text-white">Character Study</h4>
               </div>
            </div>
          </div>
        </section>

        {/* Contact Outreach / Footer */}
        <footer id="contact" className="border-t border-stone-900 pt-24 pb-12 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">Direct_Booking</h2>
            <p className="text-sm text-stone-500 uppercase tracking-widest">Connect for bookings, auditions, or representation invites.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {data.social_links?.email && (
              <a href={`mailto:${data.social_links.email}`} className="w-14 h-14 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-xl">
                <Mail size={20} />
              </a>
            )}
            {data.social_links?.instagram && (
              <a href={data.social_links.instagram} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-xl">
                <InstagramSVG size={20} />
              </a>
            )}
            {data.social_links?.custom_url && (
              <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-xl">
                <Globe size={20} />
              </a>
            )}
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-700 uppercase tracking-widest gap-4 border-t border-stone-950 pt-8">
            <div>© {new Date().getFullYear()} {data.full_name} {"//"} Performance Archive</div>
            <div>Status: Available</div>
          </div>
        </footer>

      </main>

    </div>
  );
}
