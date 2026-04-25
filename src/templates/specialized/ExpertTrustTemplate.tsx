"use client";
import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, Award, FileText, ClipboardList, Mail, Phone, Calendar, ShieldCheck, Globe } from "lucide-react";

interface PortfolioData {
  full_name: string;
  bio: string;
  username: string;
  specialized_data?: {
    license?: string;
    specialty?: string;
  };
  social_links?: Record<string, string>;
}

export default function ExpertTrustTemplate({ data }: { data: PortfolioData }) {
  const { specialized_data } = data;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <Stethoscope size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none mb-1">{data.full_name}</h1>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{specialized_data?.specialty || "Medical Practitioner"}</span>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
             <a href="#about" className="hover:text-blue-600 transition-colors">Specialty</a>
             <a href="#research" className="hover:text-blue-600 transition-colors">Research</a>
             <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-20">
        {/* Hero Section */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-2xl -z-10"></div>
             <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-blue-600 font-black text-[10px] uppercase tracking-widest mb-6"
                >
                  <ShieldCheck size={12} /> Verified_Practitioner
                </motion.div>
                <h2 className="text-5xl font-black text-slate-900 leading-tight mb-8">
                   Expert care driven by <span className="text-blue-600">precision</span> and empathy.
                </h2>
                <div className="space-y-6 mb-8">
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                         <Award size={20} />
                      </div>
                      <div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">License_Identifier</div>
                         <div className="text-sm font-bold text-slate-900">{specialized_data?.license || "MD-999000XXX"}</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                         <ClipboardList size={20} />
                      </div>
                      <div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Primary_Specialty</div>
                         <div className="text-sm font-bold text-slate-900">{specialized_data?.specialty || "General Medicine"}</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-10">
             <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-300 uppercase tracking-[0.4em]">Professional_Background</h3>
                <p className="text-2xl text-slate-600 leading-relaxed font-light">
                   {data.bio}
                </p>
             </div>
             <div className="flex gap-4">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 uppercase tracking-widest text-xs">
                   <Calendar size={16} /> Book Consultation
                </button>
             </div>
          </div>
        </section>

        {/* Clinical Focus Section */}
        <section id="about" className="mb-32">
           <div className="flex items-center gap-4 mb-16">
             <h2 className="text-sm font-black text-slate-300 uppercase tracking-[0.4em]">Clinical_Excellence</h2>
             <div className="h-px flex-1 bg-slate-100"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { title: "Diagnosis", desc: "Advanced diagnostic imaging and clinical assessment.", icon: ShieldCheck },
               { title: "Surgery", desc: "Minimally invasive and specialized surgical procedures.", icon: ClipboardList },
               { title: "Research", desc: "Published peer-reviewed studies in clinical research.", icon: FileText },
               { title: "Consulting", desc: "Expert medical advice for complex healthcare cases.", icon: Award }
             ].map(item => (
               <div key={item.title} className="p-8 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl hover:shadow-slate-200 transition-all group">
                 <item.icon className="text-blue-600 mb-6 group-hover:scale-110 transition-transform" size={24} />
                 <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                 <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
               </div>
             ))}
           </div>
        </section>

        {/* Footer / Contact Hub */}
        <footer id="contact" className="py-24 border-t border-slate-200">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6">Patient_Referrals_&_Consultation</h3>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">Establishing a baseline of <span className="text-blue-600 italic">trust</span> and care.</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {data.social_links?.email && (
                   <a href={`mailto:${data.social_links.email}`} className="p-8 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 text-center">
                      <Mail size={32} className="mx-auto mb-4" />
                      <div className="text-[10px] font-black uppercase tracking-widest">Email Consult</div>
                   </a>
                 )}
                 {data.social_links?.linkedin && (
                   <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="p-8 bg-white border border-slate-200 rounded-3xl hover:border-blue-600 transition-all text-center">
                      <div className="w-8 h-8 mx-auto mb-4 bg-slate-100 rounded-lg flex items-center justify-center font-black text-xs text-blue-600">IN</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">LinkedIn</div>
                   </a>
                 )}
                 {data.social_links?.custom_url && (
                   <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="p-8 bg-white border border-slate-200 rounded-3xl hover:border-blue-600 transition-all text-center">
                      <Globe size={32} className="mx-auto mb-4 text-slate-300" />
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{data.social_links.custom_label || "Medical Network"}</div>
                   </a>
                 )}
              </div>
           </div>
           <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>© {new Date().getFullYear()} Expert Trust // {data.full_name}</span>
              <div className="flex gap-8">
                 <span>Board Certified</span>
                 <span>HIPAA Compliant</span>
              </div>
           </div>
        </footer>
      </main>
    </div>
  );
}
