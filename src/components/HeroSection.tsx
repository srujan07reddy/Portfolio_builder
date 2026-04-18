"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function HeroSection({ data, themeColor, template }: any) {
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

  // Prepare the roles for the typewriter
  // Takes "Role 1, Role 2, Role 3" and turns it into [Role 1, 2000, Role 2, 2000...]
  const rolesArray = data.roles ? data.roles.split(',').flatMap((role: string) => [role.trim(), 2000]) : [];

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-20 scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row gap-10 items-start md:items-center"
      >
        {/* Profile Image with Template-based frame */}
        {data.avatar && (
          <div className={`relative shrink-0 ${isStandard ? 'p-1 border border-dashed border-gray-700' : ''}`}>
            <div className={`w-32 h-32 md:w-44 md:h-44 overflow-hidden ${isMinimalist ? 'rounded-full' : 'rounded-none border-2 border-white/10'}`}>
              <img src={data.avatar} alt="Professional Avatar" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            {isStandard && <div className={`absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 ${activeAccent.replace('text', 'border')}`} />}
          </div>
        )}

        <div className="flex-grow">
          <p className={`font-mono text-xs uppercase tracking-[0.4em] mb-4 ${activeAccent}`}>
            {isStandard ? "System Online // Initializing" : "Introduction"}
          </p>
          
          <h1 className={`text-6xl md:text-8xl font-bold tracking-tighter mb-4 ${isMinimalist ? 'italic' : ''}`}>
            {data.name}
          </h1>
          
          {/* THE ANIMATION IS BACK! */}
          <div className={`text-2xl md:text-4xl mb-8 min-h-[1.5em] ${isMinimalist ? 'font-light text-gray-400' : 'font-mono opacity-80'}`}>
            {rolesArray.length > 0 ? (
              <TypeAnimation
                sequence={rolesArray}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={isStandard} // Shows the blinking cursor in Standard mode
              />
            ) : (
              <span>{data.roles}</span>
            )}
          </div>
          
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
            {data.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            {data.tags && data.tags.split(',').map((tag: string, index: number) => (
              <span 
                key={index} 
                className={`px-4 py-1 text-[10px] font-mono uppercase tracking-widest transition-all ${
                  isStandard ? `border border-gray-800 bg-black text-gray-400 hover:${activeAccent}` : 
                  'bg-gray-100 dark:bg-gray-900 text-gray-600 rounded-full'
                }`}
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}