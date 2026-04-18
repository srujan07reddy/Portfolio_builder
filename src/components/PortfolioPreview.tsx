"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Eye, EyeOff } from "lucide-react";
import profileData from "../content/profile.json";
import themeData from "../content/theme.json";
import HeroSection from "./HeroSection";
import IdentitySection from "./IdentitySection";
import DomainsSection from "./DomainsSection";
import ProjectsSection from "./ProjectsSection";
import ConsultingSection from "./ConsultingSection";
import Navbar from "./Navbar";

export default function PortfolioPreview() {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [showPreview, setShowPreview] = useState(true);
  
  const themeColor = themeData.theme_color || "Cyan";
  const template = themeData.template || "Standard";

  const templateClasses: Record<string, string> = {
    Standard: "bg-[#050505] text-gray-300 font-mono",
    Minimalist: "bg-white text-black font-sans",
    Corporate: "bg-slate-50 text-slate-900 font-serif"
  };

  const activeSkin = templateClasses[template] || templateClasses.Standard;

  const renderBlock = (block: any, index: number) => {
    const rawTitle = block.title || "Section";
    const cleanName = rawTitle.includes("//") ? rawTitle.split("//")[1].trim() : rawTitle;
    const sectionId = cleanName.toLowerCase().replace(/\s+/g, "-");

    const props = { 
      key: index, 
      id: sectionId, 
      data: block, 
      themeColor, 
      template 
    };

    switch (block.type) {
      case 'identity_block': return <IdentitySection {...props} />;
      case 'domains_block': return <DomainsSection {...props} />;
      case 'projects_block': return <ProjectsSection {...props} />;
      case 'consulting_block': return <ConsultingSection {...props} />;
      default: return null;
    }
  };

  const portfolioContent = (
    <main className={`min-h-screen transition-colors duration-700 ${activeSkin}`}>
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <HeroSection data={profileData.hero} themeColor={themeColor} template={template} />
        <div className="flex flex-col gap-32">
          {profileData.page_blocks?.map((block, index) => renderBlock(block, index))}
        </div>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      {/* Header Controls */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Portfolio Preview</h2>
            <div className="flex items-center gap-2 ml-6">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-all ${
                  showPreview 
                    ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50' 
                    : 'bg-gray-700/30 text-gray-400 border border-gray-600/50'
                }`}
              >
                {showPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {showPreview ? "Visible" : "Hidden"}
              </button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-3 bg-gray-900/50 rounded-lg p-2 border border-gray-700">
            <button
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                viewMode === "desktop"
                  ? "bg-cyan-500 text-black"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="text-sm font-medium">Desktop</span>
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                viewMode === "mobile"
                  ? "bg-cyan-500 text-black"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-medium">Mobile</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Preview Container */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showPreview ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          className={`transition-all duration-300 ${showPreview ? '' : 'pointer-events-none'}`}
        >
          {/* Desktop View */}
          {viewMode === "desktop" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-700"
              style={{ aspectRatio: "16/10" }}
            >
              <div className="w-full h-full overflow-auto">
                <div className="bg-white dark:bg-[#0a0a0a]">
                  {portfolioContent}
                </div>
              </div>
            </motion.div>
          )}

          {/* Mobile View */}
          {viewMode === "mobile" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center items-start py-8"
            >
              {/* Phone Frame */}
              <div className="relative mx-auto" style={{ width: "390px" }}>
                {/* Phone Bezel - Outer Frame */}
                <div 
                  className="absolute inset-0 bg-black rounded-[40px] z-20"
                  style={{
                    border: "12px solid #1a1a1a",
                  }}
                />
                
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 w-40 h-8 bg-black rounded-b-3xl" />

                {/* Screen Content - Inner */}
                <div 
                  className="relative z-10 bg-white dark:bg-[#0a0a0a] overflow-hidden rounded-[36px]"
                  style={{ 
                    width: "366px", 
                    height: "812px",
                    margin: "12px"
                  }}
                >
                  {/* Mobile Content Wrapper */}
                  <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-white dark:bg-[#0a0a0a]">
                    <div className="w-full">
                      {portfolioContent}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Preview Status Footer */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-center text-gray-400 text-sm">
          <p>
            {viewMode === "desktop" 
              ? "Desktop Preview (1920x1080) • Viewing portfolio as visitors will see it"
              : "Mobile Preview (375x812) • Responsive design optimized for mobile devices"}
          </p>
        </div>
      </div>
    </div>
  );
}