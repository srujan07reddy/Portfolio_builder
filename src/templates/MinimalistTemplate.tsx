import { motion } from "framer-motion";

export default function MinimalistTemplate({ siteData, activeTheme }: any) {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-black selection:text-white">
      <nav className="p-10 flex justify-between items-center max-w-7xl mx-auto">
        <a href="#home" className="text-2xl font-black tracking-tighter">S.REDDY</a>
        <div className="flex gap-8 text-sm font-medium text-gray-500 uppercase">
          <a href="#home" className="hover:text-black transition-colors">Home</a>
          <a href={`mailto:${siteData.links.email}`}>Email</a>
          <a href={siteData.links.linkedin}>LinkedIn</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-10 py-20 space-y-40">
        <header id="home">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12">
            BUILDING <br/> <span className="text-gray-300">FUTURE</span> <br/> SYSTEMS.
          </motion.h2>
          <p className="text-2xl text-gray-600 max-w-xl leading-relaxed font-medium">
            {siteData.hero.subtitle}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 border-t border-gray-200 pt-20">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Consulting Strategy</h3>
            <p className="text-xl text-gray-700 leading-relaxed">{siteData.consulting.body}</p>
          </div>
          <div className="space-y-12">
            {siteData.domains.list.slice(0, 2).map((d: any, i: number) => (
              <div key={i}>
                <h4 className="font-bold text-lg mb-2">{d.name}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}