import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
};

const fadeAndSlide = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
};

export default function CorporateGlacierTemplate({ siteData, activeTheme }: any) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">

      {/* SUBTLE DOT MATRIX OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#64748b_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* PREMIUM NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#home" className="flex items-center gap-4 group">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <h1 className="text-lg font-black tracking-tight text-slate-900">
              {siteData.hero.name}
            </h1>
          </a>
          <div className="flex gap-6 items-center">
            <a href="#home" className="text-xs text-slate-600 uppercase tracking-widest hover:text-blue-600 transition-colors">Home</a>
            <span className="text-xs text-slate-600 uppercase tracking-widest hidden md:block">
              Strategic Systems & Secure Innovation
            </span>
            <a href={`mailto:${siteData.links?.email || 'contact@example.com'}`} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all rounded-lg">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-8 md:px-24 max-w-7xl mx-auto space-y-32 relative z-10">

        {/* PREMIUM HERO SECTION */}
        <section id="home" className="text-center space-y-12">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-8">
              Premium Strategy Consultant
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-6">
              {siteData.hero.name}
            </h2>

            <div className="space-y-4 mb-8">
              {siteData.hero.roles.split(', ').map((role: string, index: number) => (
                <motion.div
                  key={role}
                  initial="hidden"
                  animate="visible"
                  variants={fadeAndSlide}
                  transition={{ delay: index * 0.2 }}
                  className="text-xl md:text-2xl font-bold text-blue-600 uppercase tracking-wider"
                >
                  {role}
                </motion.div>
              ))}
            </div>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              {siteData.hero.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href={`mailto:${siteData.links?.email || 'contact@example.com'}`} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider transition-all rounded-lg">
                Start Consultation
              </a>
              <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 hover:border-slate-400 font-bold uppercase tracking-wider transition-all rounded-lg">
                View Portfolio
              </button>
            </div>
          </motion.div>
        </section>

        {/* TRUST STRIP */}
        <section className="py-8">
          <div className="flex items-center gap-8 overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {["PostgreSQL", "Python", "SOC", "n8n", "Next.js", "Supabase", "TypeScript", "Tailwind CSS"].map((tech) => (
                <span key={tech} className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* THE WHY SECTION */}
        <section className="text-center space-y-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-8">
              I work at the intersection of<br/>
              <span className="text-blue-600">defense, digital transformation,</span><br/>
              and innovation
            </h3>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {siteData.page_blocks?.find((block: any) => block.type === 'identity_block')?.bio || 'Strategic systems architect specializing in secure innovation and digital transformation.'}
            </p>
          </motion.div>
        </section>

        {/* BLUEPRINT PREVIEW */}
        <section className="space-y-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Portfolio Preview</h3>
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl shadow-2xl blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full border border-slate-200">
                  <span className="text-slate-900 font-bold uppercase tracking-wider">Unlock Your Command Center</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CAPABILITY MATRIX - WHITE GLASSMORPHISM */}
        <section className="space-y-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Core Capabilities</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Strategic Consulting", desc: "Enterprise-grade solutions for digital transformation and security architecture." },
              { title: "System Integration", desc: "Seamless integration of complex systems and workflows using modern technologies." },
              { title: "Risk Assessment", desc: "Comprehensive security audits and risk mitigation strategies." },
              { title: "Innovation Leadership", desc: "Pioneering new approaches to cybersecurity and automation challenges." },
              { title: "Technical Architecture", desc: "Designing scalable, secure infrastructure for mission-critical applications." },
              { title: "Knowledge Transfer", desc: "Mentoring and training programs for technical teams and organizations." }
            ].map((capability, index) => (
              <motion.div
                key={capability.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <h4 className="text-lg font-bold text-slate-900 mb-3">{capability.title}</h4>
                <p className="text-slate-600 leading-relaxed">{capability.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* OPERATIONS HUB */}
        <section className="bg-slate-900 text-white rounded-3xl p-12 md:p-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Operations Hub</h3>
            <p className="text-slate-400">Real-time system status and intelligence feed</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* STATUS INDICATORS */}
            <div className="space-y-6">
              {[
                { label: "System Status", status: "Operational", color: "text-emerald-400" },
                { label: "Security Level", status: "Enhanced", color: "text-emerald-400" },
                { label: "Innovation Pipeline", status: "Active", color: "text-blue-400" },
                { label: "Client Projects", status: "6+", color: "text-blue-400" }
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>

            {/* INTELLIGENCE FEED */}
            <div className="bg-white/5 backdrop-blur-md border border-slate-700 rounded-2xl p-6">
              <h4 className="text-blue-400 font-bold mb-4 uppercase tracking-wider text-sm">Intelligence Feed</h4>
              <div className="space-y-3 font-mono text-xs">
                <div className="text-slate-400">[2024-12-18 14:23:15] System initialized successfully</div>
                <div className="text-emerald-400">[2024-12-18 14:23:16] Security protocols active</div>
                <div className="text-blue-400">[2024-12-18 14:23:17] Innovation pipeline updated</div>
                <div className="text-slate-400">[2024-12-18 14:23:18] Client consultation scheduled</div>
                <div className="text-emerald-400">[2024-12-18 14:23:19] Risk assessment completed</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}