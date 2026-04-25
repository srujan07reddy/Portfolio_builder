import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CorporateTemplate({ siteData, activeTheme }: any) {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* PROFESSIONAL NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#home" className="font-black text-xl tracking-tighter uppercase">{siteData.hero.name}</a>
          <div className="flex gap-6 items-center">
            <a href="#home" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Home</a>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${activeTheme.text} hidden md:block`}>Internal Secure Link</span>
            <a href={`mailto:${siteData.links.email}`} className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-slate-700 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO: STRUCTURED & BOLD */}
      <section id="home" className="py-24 px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-6xl font-black leading-[1.1] mb-8 text-slate-900">
              Innovative Solutions. <br/>
              <span className={activeTheme.text}>Secure Infrastructure.</span>
            </h2>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              {siteData.hero.subtitle}
            </p>
            <div className="flex gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
                ))}
              </div>
              <p className="text-xs text-slate-500 flex items-center">Trusted by early-stage startups & scaleups</p>
            </div>
          </motion.div>
          <div className="relative">
            <img src={siteData.hero.avatar} className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Corporate Profile" />
          </div>
        </div>
      </section>

      {/* CAPABILITIES MATRIX */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h3 className="text-3xl font-black uppercase tracking-tighter">Core Competencies</h3>
          <span className="text-slate-400 font-mono text-sm">/ 02 / Capabilities</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {siteData.domains.list.map((domain: any, i: number) => (
            <div key={i} className="group cursor-default">
              <div className={`w-12 h-1 mb-6 ${activeTheme.accent} transition-all group-hover:w-full`}></div>
              <h4 className="font-bold mb-4">{domain.name}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{domain.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORPORATE ALIGNMENT (CRACK DEVS) */}
      <section className="py-24 px-8 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h3 className={`font-mono text-xs uppercase mb-8 ${activeTheme.text}`}>Partnership // Collaboration</h3>
            <h4 className="text-5xl font-black mb-8 leading-tight">{siteData.consulting.headline}</h4>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">{siteData.consulting.body}</p>
            <a href={siteData.links.linkedin} className={`px-10 py-4 ${activeTheme.accent} text-black font-black uppercase text-xs rounded hover:brightness-110 transition`}>
              {siteData.consulting.cta_text}
            </a>
          </div>
          <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
            <p className="text-white italic text-xl font-light leading-loose">
              &quot;{siteData.consulting.sub_body}&quot;
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className={`w-8 h-8 rounded ${activeTheme.accent}`}></div>
              <span className="font-bold uppercase text-xs tracking-widest">Strategy Report 2026</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}