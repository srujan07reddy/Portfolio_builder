"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function DomainsSection({ id, data }: any) {
  if (!data) return null;
  const domains = data.list || [];

  return (
    <section id={id} className="py-12 md:py-20 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">
          {data.title}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((domain: any, idx: number) => (
            <div 
              key={idx} 
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-[#111] transition-all duration-300"
            >
              <ShieldCheck className="w-8 h-8 text-cyan-500 mb-6" />
              <h4 className="text-xl font-bold mb-3">{domain.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {domain.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}