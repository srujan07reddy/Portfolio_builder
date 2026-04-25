"use client";

import { motion } from "framer-motion";

export default function CustomSection({ id, data, themeColor, template }: any) {
  if (!data) return null;

  const isStandard = template === "Standard";
  const isMinimalist = template === "Minimalist";

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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className={`text-sm tracking-[0.3em] uppercase mb-12 flex items-center gap-4 ${isStandard ? activeAccent : 'text-gray-400'}`}>
          {isStandard && <span className="w-8 h-[1px] bg-current" />}
          {data.title}
        </h3>
        
        <div className={`p-8 ${
          isStandard ? 'border border-gray-800 bg-black/40' : 
          isMinimalist ? 'border-b border-gray-100' : 
          'bg-white shadow-sm rounded-lg'
        }`}>
          <p className={`text-lg leading-relaxed whitespace-pre-wrap ${isMinimalist ? 'font-light' : ''}`}>
            {data.content}
          </p>
        </div>
      </motion.div>
    </section>
  );
}