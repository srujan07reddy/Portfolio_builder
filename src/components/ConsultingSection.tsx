"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ConsultingSection({ id, data }: any) {
  if (!data) return null;

  return (
    <section id={id} className="py-12 md:py-20 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 dark:bg-[#111] p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-800"
      >
        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
          {data.title}
        </h3>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-8 max-w-2xl">
          {data.headline}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {data.body}
          </p>
          {data.sub_body && (
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {data.sub_body}
            </p>
          )}
        </div>

        {/* Renders the CTA button ONLY if you created one in the CMS */}
        {data.action_button && (
          <Link 
            href={data.action_button.cta_url} 
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-md font-medium hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-colors"
          >
            {data.action_button.cta_text}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </motion.div>
    </section>
  );
}