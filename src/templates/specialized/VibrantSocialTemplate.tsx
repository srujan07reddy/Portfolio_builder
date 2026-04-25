"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Heart, Share2, ExternalLink, Zap } from "lucide-react";

const YoutubeSVG = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 11.72 1 11.72s0 3.58.46 5.3a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2c.46-1.72.46-5.3.46-5.3s0-3.58-.46-5.3z" />
    <polygon points="9.75 15.02 15.5 11.72 9.75 8.42 9.75 15.02" />
  </svg>
);

const InstagramSVG = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterSVG = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

interface PortfolioData {
  full_name: string;
  bio: string;
  username: string;
  specialized_data?: {
    total_reach?: string;
    engagement?: string;
    platform?: string;
  };
  social_links?: Record<string, string>;
}

export default function VibrantSocialTemplate({ data }: { data: PortfolioData }) {
  const { specialized_data } = data;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-600">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <nav className="relative z-50 px-8 py-6 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0">
        <div className="text-2xl font-black italic tracking-tighter text-rose-500">
          {data.username.toLowerCase()}.<span className="text-slate-900">live</span>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-slate-900 text-white font-bold rounded-full text-sm hover:bg-rose-600 transition-all">
            Collab Now
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        {/* Hero Section */}
        <section className="mb-32 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1 bg-rose-50 border border-rose-100 rounded-full text-rose-600 font-bold text-xs uppercase tracking-widest mb-8"
          >
            <Zap size={14} className="fill-rose-600" />
            Trending_Now
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-black text-slate-900 leading-[0.9] tracking-tight mb-12 uppercase"
          >
            {data.full_name}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed mb-16"
          >
            {data.bio}
          </motion.p>

          {/* Social Stats Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-gradient-to-br from-rose-500 to-orange-500 rounded-[2.5rem] text-white shadow-2xl shadow-rose-500/20"
            >
              <Users className="mb-4" size={32} />
              <div className="text-4xl font-black mb-1">{specialized_data?.total_reach || "100K+"}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Total Reach</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20"
            >
              <TrendingUp className="mb-4 text-emerald-400" size={32} />
              <div className="text-4xl font-black mb-1">{specialized_data?.engagement || "4.2%"}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Avg. Engagement</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] text-slate-900"
            >
              <Zap className="mb-4 text-rose-500" size={32} />
              <div className="text-4xl font-black mb-1">Viral</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Content Status</div>
            </motion.div>
          </div>
        </section>

        {/* Platforms Hub */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-16 border-y border-slate-100">
             {data.social_links?.youtube ? (
               <a href={data.social_links.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-400 font-bold grayscale hover:grayscale-0 transition-all cursor-pointer">
                 <YoutubeSVG size={32} />
                 <span className="text-xl">Youtube</span>
               </a>
             ) : (
               <div className="flex items-center gap-4 text-slate-200 font-bold grayscale">
                 <YoutubeSVG size={32} />
                 <span className="text-xl">Youtube</span>
               </div>
             )}
             
             {data.social_links?.instagram ? (
               <a href={data.social_links.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-400 font-bold grayscale hover:grayscale-0 transition-all cursor-pointer">
                 <InstagramSVG size={32} />
                 <span className="text-xl">Instagram</span>
               </a>
             ) : (
               <div className="flex items-center gap-4 text-slate-200 font-bold grayscale">
                 <InstagramSVG size={32} />
                 <span className="text-xl">Instagram</span>
               </div>
             )}

             {data.social_links?.twitter ? (
               <a href={data.social_links.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-400 font-bold grayscale hover:grayscale-0 transition-all cursor-pointer">
                 <TwitterSVG size={32} />
                 <span className="text-xl">Twitter</span>
               </a>
             ) : (
               <div className="flex items-center gap-4 text-slate-200 font-bold grayscale">
                 <TwitterSVG size={32} />
                 <span className="text-xl">Twitter</span>
               </div>
             )}
          </div>
        </section>

        {/* Content Preview Grid */}
        <section className="mb-40">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 text-center mb-16">Latest_Creations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
               'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1974&auto=format&fit=crop',
               'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop',
               'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop'
             ].map((url, i) => (
               <div key={i} className="aspect-square bg-slate-100 rounded-3xl overflow-hidden hover:scale-105 transition-all cursor-pointer relative group">
                 <img src={url} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-rose-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Heart className="text-white" size={32} fill="white" />
                 </div>
               </div>
             ))}
          </div>
        </section>

        {/* Footer / Contact Hub */}
        <footer id="contact" className="text-center py-24 border-t border-slate-100">
           <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter uppercase">Let's <span className="text-rose-500">Connect.</span></h2>
           
           <div className="flex flex-wrap justify-center gap-6 mb-16">
              {data.social_links?.email && (
                <a href={`mailto:${data.social_links.email}`} className="px-10 py-5 bg-rose-500 hover:bg-rose-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-rose-500/20">
                  Send Collaboration Invite
                </a>
              )}
              {data.social_links?.linkedin && (
                <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-slate-900/20">
                  Business LinkedIn
                </a>
              )}
              {data.social_links?.custom_url && (
                <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-orange-500/20">
                  {data.social_links.custom_label || "Business Site"}
                </a>
              )}
           </div>

           <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Official Portfolio of {data.full_name} // © {new Date().getFullYear()}</div>
        </footer>
      </main>
    </div>
  );
}
