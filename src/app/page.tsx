"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Terminal, Globe, Eye, Rocket, Lock, ChevronRight, CheckCircle } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
};

const fadeAndSlide = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
};

function CapabilityCard({ index, title, description, icon, delay }: any) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay }}
      className="group bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <div className="absolute top-4 right-4 text-blue-600 font-bold text-xs opacity-60">{index}</div>
      <div className="mb-6 text-blue-600 group-hover:text-blue-700 transition-colors">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{title}</h4>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">

      {/* SUBTLE DOT MATRIX OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#64748b_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* PREMIUM NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <h1 className="text-lg font-black tracking-tight text-slate-900">
              PORTFOLIO<span className="text-blue-600">_BUILDER</span>
            </h1>
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/login" className="text-slate-700 hover:text-blue-700 transition-colors font-bold uppercase tracking-wider text-sm">
              LOGIN
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider transition-all rounded-lg">
              SIGN UP
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-8 md:px-24 max-w-7xl mx-auto space-y-20 relative z-10">

        {/* THE HOOK - IDENTITY GATEWAY */}
        <section className="text-center space-y-12">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-8">
              Strategic Systems & Secure Innovation
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-6">
              Portfolio Builder
            </h2>

            <div className="space-y-4 mb-8">
              {["Professional Portfolios", "Strategic Consulting", "Enterprise Security"].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial="hidden"
                  animate="visible"
                  variants={fadeAndSlide}
                  transition={{ delay: index * 0.2 }}
                  className="text-xl md:text-2xl font-bold text-blue-600 uppercase tracking-wider"
                >
                  {feature}
                </motion.div>
              ))}
            </div>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Create professional portfolios that showcase your expertise and attract premium clients. Enterprise-grade security, multiple templates, and seamless deployment for consultants, researchers, and tech professionals.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/signup" className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider transition-all rounded-lg shadow-lg hover:shadow-xl">
                <span>DEPLOY_PROFILE</span>
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="px-8 py-4 border-2 border-slate-300 text-slate-700 hover:border-slate-400 font-bold uppercase tracking-wider transition-all rounded-lg">
                Access Portal
              </Link>
            </div>
          </motion.div>
        </section>


        {/* THE WHY */}
        <section className="text-center space-y-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-8">
              Why Choose Portfolio Builder?<br/>
              <span className="text-blue-600">Professional portfolios that convert</span><br/>
              visitors into clients
            </h3>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Portfolio Builder empowers consultants, researchers, and tech professionals to create stunning portfolios that showcase their expertise and attract premium opportunities. With enterprise security, multiple professional templates, and seamless deployment, your professional identity becomes your competitive advantage.
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
                <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full border border-slate-200 shadow-lg">
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
            <CapabilityCard
              index="01"
              title="Strategic Consulting"
              description="Enterprise-grade portfolio solutions for cybersecurity researchers, AI engineers, and tech innovators."
              icon={<Shield className="w-6 h-6 text-blue-600" />}
              delay={0}
            />
            <CapabilityCard
              index="02"
              title="System Integration"
              description="Seamless integration with Supabase backend, authentication, and real-time data management."
              icon={<Terminal className="w-6 h-6 text-blue-600" />}
              delay={0.1}
            />
            <CapabilityCard
              index="03"
              title="Security Architecture"
              description="Row-level security, encrypted data storage, and enterprise-grade authentication systems."
              icon={<Lock className="w-6 h-6 text-blue-600" />}
              delay={0.2}
            />
            <CapabilityCard
              index="04"
              title="Template Ecosystem"
              description="Multiple professional templates including Corporate Glacier, Tactical Standard, and Minimalist designs."
              icon={<Eye className="w-6 h-6 text-blue-600" />}
              delay={0.3}
            />
            <CapabilityCard
              index="05"
              title="One-Click Deployment"
              description="Deploy to Vercel, Netlify, or GitHub Pages with custom domain support and SSL certificates."
              icon={<Rocket className="w-6 h-6 text-blue-600" />}
              delay={0.4}
            />
            <CapabilityCard
              index="06"
              title="Analytics & Insights"
              description="Built-in analytics dashboard with portfolio performance metrics and visitor tracking."
              icon={<Globe className="w-6 h-6 text-blue-600" />}
              delay={0.5}
            />
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
                { label: "System Status", status: "Operational", color: "text-emerald-400", icon: CheckCircle },
                { label: "Security Level", status: "Enterprise", color: "text-emerald-400", icon: Shield },
                { label: "Active Templates", status: "4 Available", color: "text-blue-400", icon: Terminal },
                { label: "Deployments", status: "100+", color: "text-blue-400", icon: Rocket }
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-3 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-slate-300 font-medium">{item.label}</span>
                  </div>
                  <span className={`font-bold ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>

            {/* INTELLIGENCE FEED */}
            <div className="bg-white/5 backdrop-blur-md border border-slate-700 rounded-2xl p-6">
              <h4 className="text-blue-400 font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Intelligence Feed
              </h4>
              <div className="space-y-3 font-mono text-xs bg-slate-900/50 p-4 rounded-lg">
                <div className="text-slate-400">[2024-12-18 14:23:15] Portfolio Builder v2.1 initialized</div>
                <div className="text-emerald-400">[2024-12-18 14:23:16] Supabase connection established</div>
                <div className="text-blue-400">[2024-12-18 14:23:17] Corporate Glacier template loaded</div>
                <div className="text-slate-400">[2024-12-18 14:23:18] Authentication system online</div>
                <div className="text-emerald-400">[2024-12-18 14:23:19] Security protocols active</div>
                <div className="text-blue-400">[2024-12-18 14:23:20] Ready for deployment</div>
              </div>
            </div>
          </div>
        </section>

        {/* PREMIUM CTA SECTION */}
        <section className="relative p-12 md:p-20 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-blue-600 mb-8 font-bold">Professional_Launch</h3>
              <h4 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                Ready to Launch Your<br/>
                Portfolio?
              </h4>
              <p className="text-slate-600 leading-relaxed mb-8">
                Join consultants and tech professionals who use Portfolio Builder to showcase their value with premium design, security, and fast deployment.
              </p>
              <Link href="/signup" className="inline-block px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl rounded-lg">
                SIGN UP
              </Link>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <p className="text-slate-700 text-sm leading-loose mb-6 italic">
                "Portfolio Builder transformed my professional presence overnight. The Corporate Glacier template perfectly captures the premium aesthetic my enterprise clients expect, and the security features give me complete peace of mind."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <div>
                  <p className="text-slate-900 font-bold">Strategic Consultant</p>
                  <p className="text-slate-600 text-xs">Cybersecurity & Digital Transformation Expert</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
