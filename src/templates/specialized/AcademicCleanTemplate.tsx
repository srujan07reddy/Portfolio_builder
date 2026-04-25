"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Award, Mail, ChevronRight, Quote } from "lucide-react";

interface PortfolioData {
  full_name: string;
  bio: string;
  username: string;
  specialized_data?: {
    subject?: string;
    university?: string;
    philosophy?: string;
  };
  social_links?: Record<string, string>;
}

export default function AcademicCleanTemplate({ data }: { data: PortfolioData }) {
  const { specialized_data } = data;

  return (
    <div className="min-h-screen bg-[#fcfcf9] text-slate-800 font-serif selection:bg-amber-100 selection:text-slate-900">
      <header className="max-w-5xl mx-auto px-8 py-12 flex justify-between items-baseline border-b border-slate-200">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{data.full_name}</h1>
        <nav className="flex gap-8 text-sm font-medium uppercase tracking-widest font-sans text-slate-500">
          <a href="#about" className="hover:text-slate-900 transition-colors">Philosophy</a>
          <a href="#specialty" className="hover:text-slate-900 transition-colors">Curriculum</a>
          <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-24">
        {/* Hero Section */}
        <section className="mb-40 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-amber-600 font-sans font-bold uppercase tracking-widest text-xs mb-6"
          >
            <GraduationCap size={16} />
            Academic Portfolio // {specialized_data?.subject || "Educator"}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-12 italic"
          >
            Empowering through <span className="text-amber-700">knowledge</span> and mentorship.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-12 pt-12 border-t border-slate-100 font-sans"
          >
            <div>
              <span className="text-[10px] text-slate-400 font-black uppercase block mb-1">Institution</span>
              <span className="text-sm font-bold">{specialized_data?.university || "Independent Educator"}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-black uppercase block mb-1">Subject_Mastery</span>
              <span className="text-sm font-bold">{specialized_data?.subject || "Curriculum Design"}</span>
            </div>
          </motion.div>
        </section>

        {/* Philosophy Block */}
        <section id="about" className="mb-40 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h3 className="text-sm font-black text-slate-300 uppercase tracking-[0.3em] sticky top-32">
              Teaching_Philosophy
            </h3>
          </div>
          <div className="md:col-span-8 relative">
            <Quote className="absolute -left-12 -top-6 text-amber-100" size={80} />
            <div className="relative z-10">
              <p className="text-2xl text-slate-700 leading-relaxed font-medium italic mb-8">
                "{specialized_data?.philosophy || "Education is not the filling of a pail, but the lighting of a fire."}"
              </p>
              <p className="text-slate-500 font-sans leading-loose text-lg">
                {data.bio}
              </p>
            </div>
          </div>
        </section>

        {/* Curriculum / Skills */}
        <section id="specialty" className="mb-40">
          <div className="flex items-center gap-6 mb-16">
            <h3 className="text-2xl font-bold text-slate-900">Curriculum & Areas of Expertise</h3>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            {[
              { title: "Curriculum Development", desc: "Designing comprehensive learning paths for diverse age groups." },
              { title: "Differentiated Instruction", desc: "Adapting methods to meet individual student needs and learning styles." },
              { title: "Educational Technology", desc: "Integrating modern digital tools to enhance classroom engagement." },
              { title: "Student Assessment", desc: "Implementing formative and summative evaluations to track growth." }
            ].map((item) => (
              <div key={item.title} className="bg-white p-10 hover:bg-slate-50 transition-colors group">
                <BookOpen className="text-amber-600 mb-6 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-500 font-sans text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action / Contact */}
        <section id="contact" className="py-24 bg-slate-900 rounded-[3rem] text-center px-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to collaborate?</h3>
            <p className="text-slate-400 font-sans mb-12 max-w-xl mx-auto">
              I am always open to discussing new educational projects, curriculum opportunities, or guest lectures.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 font-sans">
              {data.social_links?.email && (
                <a href={`mailto:${data.social_links.email}`} className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-xl shadow-amber-900/20">
                  <Mail size={14} /> Send Email
                </a>
              )}
              {data.social_links?.linkedin && (
                <a href={data.social_links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all border border-white/10">
                  LinkedIn Profile
                </a>
              )}
              {data.social_links?.twitter && (
                <a href={data.social_links.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all border border-white/10">
                  Twitter / X
                </a>
              )}
              {data.social_links?.custom_url && (
                <a href={data.social_links.custom_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all border border-white/10">
                  {data.social_links.custom_label || "View More"}
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-8 py-12 border-t border-slate-200 text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400 flex flex-col md:flex-row justify-between items-center gap-6">
        <span>© {new Date().getFullYear()} {data.full_name} // Academic Portfolio</span>
        <div className="flex gap-6">
           {data.social_links?.github && <a href={data.social_links.github} target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">GitHub</a>}
           {data.social_links?.email && <a href={`mailto:${data.social_links.email}`} className="hover:text-slate-900 transition-colors">Contact</a>}
        </div>
      </footer>
    </div>
  );
}
