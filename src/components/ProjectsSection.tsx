"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function ProjectsSection({ id, data, themeColor }: any) {
  if (!data) return null;
  const projects = data.projects_list || [];

  return (
    <section id={id} className="py-12 md:py-20 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
          {data.title}
        </h3>
        {data.subtitle && (
          <p className="text-gray-400 mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">
            {data.subtitle}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj: any, idx: number) => (
            <div 
              key={idx} 
              className="group p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] hover:border-cyan-500 transition-all duration-300 flex flex-col h-full"
            >
              <h4 className="text-xl font-bold mb-3 group-hover:text-cyan-500 transition-colors">
                {proj.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                {proj.description}
              </p>
              
              <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100 dark:border-gray-900">
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  {proj.tools}
                </p>
                {proj.url && (
                  <Link 
                    href={proj.url} 
                    target="_blank" 
                    className="text-gray-400 hover:text-cyan-500 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}