"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import profileData from "../content/profile.json";
import themeData from "../content/theme.json";
import HeroSection from "./HeroSection";
import IdentitySection from "./IdentitySection";
import DomainsSection from "./DomainsSection";
import ProjectsSection from "./ProjectsSection";
import ConsultingSection from "./ConsultingSection";
import CustomSection from "./CustomSection";
import StandardTemplate from "@/templates/StandardTemplate";
import Navbar from "./Navbar";
import { type Portfolio } from "@/lib/portfolio-service";

interface PortfolioPreviewProps {
  portfolio?: Portfolio | null;
  projects?: any[];
}

export default function PortfolioPreview({ portfolio, projects = [] }: PortfolioPreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [showPreview, setShowPreview] = useState(true);
  
  // Format data for templates
  const themeColor = portfolio?.theme_color || themeData.theme_color || "Cyan";
  const template = portfolio?.template_choice === "minimalist_modern" ? "Minimalist" : "Standard";

  const siteData = {
    hero: {
      name: portfolio?.full_name || "Your Name",
      roles: portfolio?.professions?.join(", ") || "Strategic Consultant",
      avatar: "/images/avatar-placeholder.png",
    },
    bio: portfolio?.bio || "Professional bio here...",
    links: {
      email: portfolio?.social_links?.email || "",
      github: portfolio?.social_links?.github || "",
      linkedin: portfolio?.social_links?.linkedin || ""
    },
    domains: {
      list: portfolio?.specialized_data?.expertise_areas?.map((name: string) => ({ name, description: "Expertise in this area." })) || []
    },
    projects: projects.map(p => ({
      name: p.title,
      description: p.description,
      tools: p.tech_stack?.join(", ") || ""
    })),
    consulting: {
      headline: portfolio?.specialized_data?.tagline || "Strategic Alignment",
      body: portfolio?.bio || "Professional consulting services."
    }
  };

  const activeTheme = {
    name: themeColor,
    accent: `bg-${themeColor.toLowerCase()}-500`,
    text: `text-${themeColor.toLowerCase()}-500`,
    border: `border-${themeColor.toLowerCase()}-500/50`
  };

  const portfolioContent = <StandardTemplate siteData={siteData} activeTheme={activeTheme} />;

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
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-600 transition-all mr-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
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
              <div className="relative mx-auto" style={{ width: "390px" }}>
                <div 
                  className="absolute inset-0 bg-black rounded-[40px] z-20"
                  style={{
                    border: "12px solid #1a1a1a",
                  }}
                />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 w-40 h-8 bg-black rounded-b-3xl" />
                <div 
                  className="relative z-10 bg-white dark:bg-[#0a0a0a] overflow-hidden rounded-[36px]"
                  style={{ 
                    width: "366px", 
                    height: "812px",
                    margin: "12px"
                  }}
                >
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