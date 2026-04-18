"use client";

import { motion } from "framer-motion";

export default function IdentitySection({ id, data, themeColor, template }: any) {
  if (!data) return null;

  const isStandard = template === "Standard";
  const isMinimalist = template === "Minimalist";

  // Color Mapping
  const accentColors: Record<string, string> = {
    Cyan: "text-cyan-500",
    Violet: "text-violet-500",
    Emerald: "text-emerald-500",
    Ruby: "text-rose-500"
  };
  const activeAccent = accentColors[themeColor] || "text-cyan-500";

  return (
    <section id={id} className="scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, x: isStandard ? -20 : 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading Style Changes per Template */}
        <h3 className={`text-sm tracking-[0.3em] uppercase mb-12 flex items-center gap-4 ${isStandard ? activeAccent : 'text-gray-400'}`}>
          {isStandard && <span className="w-8 h-[1px] bg-current" />}
          {data.title}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8">
            <p className={`text-xl leading-relaxed ${isMinimalist ? 'font-light tracking-tight' : ''}`}>
              {data.bio}
            </p>
          </div>
          
          <div className="md:col-span-4 flex flex-col gap-4">
            {/* Stat Cards Change Style per Template */}
            <div className={`p-6 ${
              isStandard ? 'border border-gray-800 bg-black/40' : 
              isMinimalist ? 'border-b border-gray-100' : 
              'bg-white shadow-sm rounded-lg'
            }`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Projects Built</p>
              <p className={`text-4xl font-bold ${isStandard ? activeAccent : ''}`}>{data.stat_projects}</p>
            </div>

            <div className={`p-6 ${
              isStandard ? 'border border-gray-800 bg-black/40' : 
              isMinimalist ? 'border-b border-gray-100' : 
              'bg-white shadow-sm rounded-lg'
            }`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Leadership</p>
              <p className={`text-xl font-bold ${isStandard ? activeAccent : ''}`}>{data.stat_leadership}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
