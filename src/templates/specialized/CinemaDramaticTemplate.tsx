"use client";
import React from "react";
import { motion } from "framer-motion";
import { Play, Clapperboard, Star, Camera, User, Mail, Globe } from "lucide-react";

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

  // Helper to extract YouTube ID or use a placeholder
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
    <div className="min-h-screen bg-black text-stone-200 font-sans selection:bg-stone-700 selection:text-white">
      {/* Immersive Video Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {embedUrl ? (
          <div className="absolute inset-0 z-0">
            <iframe 
              src={embedUrl}
              className="w-full h-full scale-[1.5] opacity-40 pointer-events-none"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-stone-900 opacity-50 z-0" />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

        <div className="relative z-20 h-full flex flex-col justify-end px-8 pb-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 text-stone-400 font-black uppercase tracking-[0.3em] text-xs">
              <Clapperboard size={16} />
              Featured_Performer
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
              {data.full_name}
            </h1>
            <div className="flex flex-wrap gap-6 items-center pt-8">
              <div className="px-6 py-3 border border-white/20 bg-white/10 backdrop-blur-md rounded-full flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                <Star className="text-yellow-500" size={16} />
                {specialized_data?.agency || "Independent Artist"}
              </div>
              <button className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Play size={24} fill="black" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-8 py-32">
        {/* Credits / Roles */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-24 mb-40">
          <div className="md:col-span-4">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-stone-500 mb-8 border-l-2 border-stone-800 pl-4">
              Selected_Works
            </h2>
            <div className="space-y-12">
              {specialized_data?.roles?.split(',').map((role, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <span className="text-stone-600 font-mono text-[10px] mb-2 block tracking-widest">PROJ_0{i+1}</span>
                  <h3 className="text-2xl font-bold uppercase group-hover:text-white transition-colors">{role.trim()}</h3>
                  <div className="h-px w-0 group-hover:w-full bg-stone-500 transition-all duration-500 mt-2" />
                </motion.div>
              )) || (
                <p className="text-stone-600 font-mono text-xs italic">Update your notable roles in the dashboard.</p>
              )}
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="space-y-12">
              <div className="flex items-center gap-4 text-stone-500">
                <User size={20} />
                <h2 className="text-xl font-bold uppercase tracking-tight">The Profile</h2>
              </div>
              <p className="text-4xl font-light leading-snug text-stone-300 italic">
                {data.bio}
              </p>
            </div>
          </div>
        </section>

        {/* Cinematic Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 h-[600px] bg-stone-900 rounded-2xl overflow-hidden relative group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
               <div className="absolute bottom-8 left-8">
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-2">Scene_01</span>
                 <h4 className="text-2xl font-bold uppercase text-white">Dramatic Monologue</h4>
               </div>
            </div>
            <div className="h-[600px] bg-stone-900 rounded-2xl overflow-hidden relative group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691523567-697424396261?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
               <div className="absolute bottom-8 left-8">
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-2">Still_02</span>
                 <h4 className="text-2xl font-bold uppercase text-white">Portrait Study</h4>
               </div>
            </div>
          </div>
        </section>

        {/* Footer / Contact Hub */}
        <footer id="contact" className="border-t border-stone-900 pt-24 pb-12 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter uppercase text-white">Direct_Outreach</h2>
          
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            {data.social_links?.email && (
              <a href={`mailto:${data.social_links.email}`} className="w-16 h-16 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-black transition-all group shadow-xl shadow-white/5">
                <Mail size={24} />
              </a>
            )}
            {data.social_links?.instagram && (
              <a href={data.social_links.instagram} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-black transition-all group shadow-xl shadow-white/5">
                <InstagramSVG size={24} />
              </a>
            )}
            {data.social_links?.linkedin && (
              <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-black transition-all group shadow-xl shadow-white/5">
                <div className="font-black text-xs">IN</div>
              </a>
            )}
            {data.social_links?.youtube && (
              <a href={data.social_links.youtube} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-black transition-all group shadow-xl shadow-white/5">
                <Play size={24} />
              </a>
            )}
            {data.social_links?.custom_url && (
              <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-black transition-all group shadow-xl shadow-white/5">
                <Globe size={24} />
              </a>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-stone-950">
            <div className="text-[10px] font-black text-stone-700 uppercase tracking-widest">
              © {new Date().getFullYear()} {data.full_name} // CINEMA_ARCHIVE
            </div>
            <div className="text-center md:text-right">
              <span className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-2">Representation</span>
              <p className="text-sm font-bold uppercase text-stone-500">{specialized_data?.agency || "Seeking Representation"}</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
