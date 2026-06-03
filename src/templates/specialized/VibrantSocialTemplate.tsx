"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Heart, Share2, Globe, Mail, Zap } from "lucide-react";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

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
    <div className={`${outfit.className} min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-100 selection:text-rose-600 relative p-6 md:p-12 overflow-x-hidden flex items-center justify-center`}>
      {/* Playful Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none opacity-40 z-0"></div>

      <div className="max-w-4xl w-full grid grid-cols-2 md:grid-cols-12 gap-6 relative z-10">
        
        {/* BENTO HEADER: Username / Logo Badge */}
        <div className="col-span-2 md:col-span-12 flex justify-between items-center bg-white/70 backdrop-blur-md border border-slate-200/60 p-6 rounded-[2rem] shadow-sm">
          <div className="text-xl font-black italic tracking-tighter text-rose-500">
            {data.username.toLowerCase()}.<span className="text-slate-900">vibe</span>
          </div>
          <div className="px-4 py-1.5 bg-rose-50 border border-rose-100 rounded-full text-rose-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
            <Zap size={12} className="fill-rose-600 animate-bounce" /> Trending
          </div>
        </div>

        {/* BENTO 1: Name and Bio (Big widget) */}
        <div className="col-span-2 md:col-span-8 bg-gradient-to-tr from-rose-500 to-orange-500 text-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-rose-500/10 flex flex-col justify-between min-h-[300px]">
          <div className="text-sm font-bold uppercase tracking-widest opacity-80">Social Creator</div>
          <div className="space-y-4 my-6">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
              {data.full_name}
            </h1>
            <p className="text-sm md:text-base leading-relaxed opacity-95">
              {data.bio}
            </p>
          </div>
          <div className="text-xs font-mono opacity-80">STATUS: Live on Feed</div>
        </div>

        {/* BENTO 2: Reach Stats Widget */}
        <div className="col-span-1 md:col-span-4 bg-white border border-slate-200/60 p-8 rounded-[3rem] shadow-sm flex flex-col justify-between items-start">
          <Users className="text-rose-500" size={32} />
          <div>
            <div className="text-4xl font-black text-slate-900 mb-1">{specialized_data?.total_reach || "150K+"}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Reach</div>
          </div>
        </div>

        {/* BENTO 3: Engagement Metrics */}
        <div className="col-span-1 md:col-span-4 bg-[#0F172A] text-white p-8 rounded-[3rem] shadow-xl flex flex-col justify-between items-start">
          <TrendingUp className="text-emerald-400" size={32} />
          <div>
            <div className="text-4xl font-black mb-1">{specialized_data?.engagement || "4.8%"}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Engagement Index</div>
          </div>
        </div>

        {/* BENTO 4: Social Links Platforms Grid */}
        <div className="col-span-2 md:col-span-8 bg-white border border-slate-200/60 p-8 rounded-[3rem] shadow-sm flex flex-col justify-between gap-6">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Channels</div>
          
          <div className="grid grid-cols-3 gap-4 w-full">
            {data.social_links?.youtube ? (
              <a href={data.social_links.youtube} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-4 bg-red-50 hover:bg-red-100/50 rounded-2xl transition-all gap-2 text-red-600">
                <YoutubeSVG size={28} />
                <span className="text-xs font-bold">YouTube</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 opacity-40 rounded-2xl gap-2 text-slate-400">
                <YoutubeSVG size={28} />
                <span className="text-xs font-bold">YouTube</span>
              </div>
            )}

            {data.social_links?.instagram ? (
              <a href={data.social_links.instagram} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-4 bg-pink-50 hover:bg-pink-100/50 rounded-2xl transition-all gap-2 text-pink-600">
                <InstagramSVG size={28} />
                <span className="text-xs font-bold">Instagram</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 opacity-40 rounded-2xl gap-2 text-slate-400">
                <InstagramSVG size={28} />
                <span className="text-xs font-bold">Instagram</span>
              </div>
            )}

            {data.social_links?.twitter ? (
              <a href={data.social_links.twitter} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-4 bg-sky-50 hover:bg-sky-100/50 rounded-2xl transition-all gap-2 text-sky-600">
                <TwitterSVG size={28} />
                <span className="text-xs font-bold">Twitter</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 opacity-40 rounded-2xl gap-2 text-slate-400">
                <TwitterSVG size={28} />
                <span className="text-xs font-bold">Twitter</span>
              </div>
            )}
          </div>
        </div>

        {/* BENTO 5: Image Showcase strip */}
        <div className="col-span-2 md:col-span-12 bg-white border border-slate-200/60 p-6 rounded-[2.5rem] shadow-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Visual Feed</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1974&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop'
            ].map((url, i) => (
              <div key={i} className="aspect-square bg-slate-100 rounded-2xl overflow-hidden hover:scale-[1.03] transition-all cursor-pointer relative group border border-slate-200/30">
                <img src={url} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-rose-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="text-white fill-white" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BENTO 6: Booking CTA & Footer */}
        <div className="col-span-2 md:col-span-12 bg-white border border-slate-200/60 p-8 rounded-[3rem] shadow-sm text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900">Initiate Collaboration</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {data.social_links?.email && (
              <a href={`mailto:${data.social_links.email}`} className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all shadow-md">
                Send Collab Request
              </a>
            )}
            {data.social_links?.custom_url && (
              <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all shadow-md">
                {data.social_links.custom_label || "Creator Portfolio"}
              </a>
            )}
          </div>

          <div className="h-px bg-slate-100 w-full pt-4"></div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()} Creator Vibe • Built with Portfolio Builder
          </div>
        </div>

      </div>
    </div>
  );
}
