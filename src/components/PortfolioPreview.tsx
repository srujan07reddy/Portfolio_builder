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
import DevPreciseTemplate from "@/templates/specialized/DevPreciseTemplate";
import AcademicCleanTemplate from "@/templates/specialized/AcademicCleanTemplate";
import CinemaDramaticTemplate from "@/templates/specialized/CinemaDramaticTemplate";
import VibrantSocialTemplate from "@/templates/specialized/VibrantSocialTemplate";
import EditorialRichTemplate from "@/templates/specialized/EditorialRichTemplate";
import DataForwardTemplate from "@/templates/specialized/DataForwardTemplate";
import ModularJourneyTemplate from "@/templates/specialized/ModularJourneyTemplate";
import ExpertTrustTemplate from "@/templates/specialized/ExpertTrustTemplate";
import CorporateGlacierTemplate from "@/templates/CorporateGlacier";
import CorporateTemplate from "@/templates/CorporateTemplate";
import MinimalistTemplate from "@/templates/MinimalistTemplate";
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

  const profileData = portfolio ? {
    ...portfolio,
    profession: portfolio.professions?.[0] || portfolio.profession || "general",
  } : null;

  const getTemplateBg = (prof?: string, templateChoice?: string) => {
    if (prof && prof !== 'general') {
      switch (prof) {
        case 'engineer':
        case 'architect':
        case 'data_scientist':
          return "bg-[#070807]";
        case 'teacher':
        case 'scholar':
          return "bg-[#FAF9F6]";
        case 'actor':
          return "bg-black";
        case 'influencer':
        case 'player':
        case 'coach':
        case 'scout':
          return "bg-slate-50";
        case 'editor':
        case 'artist':
          return "bg-[#fafaf9]";
        case 'manager':
        case 'executive':
        case 'coordinator':
          return "bg-[#0B0F19]";
        case 'student':
          return "bg-[#F8FAFC]";
        case 'doctor':
        case 'lawyer':
        case 'consultant':
          return "bg-[#F8FAFC]";
      }
    }
    
    // Fall back to template choice background for general/other professions
    switch (templateChoice) {
      case 'Corporate_Glacier':
        return "bg-slate-100";
      case 'Corporate':
        return "bg-white";
      case 'Minimalist':
        return "bg-gray-50";
      default:
        return "bg-[#050505]";
    }
  };

  const renderTemplate = () => {
    if (!profileData) return null;

    // If they explicitly selected a standard layout, render it regardless of profession
    const isStandardLayoutChoice = [
      'Standard', 'Corporate_Glacier', 'Corporate', 'Minimalist', 'standard_classic'
    ].includes(profileData.template_choice);

    if (isStandardLayoutChoice) {
      switch (profileData.template_choice) {
        case 'Corporate_Glacier':
          return <CorporateGlacierTemplate siteData={siteData} activeTheme={activeTheme} />;
        case 'Corporate':
          return <CorporateTemplate siteData={siteData} activeTheme={activeTheme} />;
        case 'Minimalist':
          return <MinimalistTemplate siteData={siteData} activeTheme={activeTheme} />;
        case 'Standard':
        case 'standard_classic':
        default:
          return <StandardTemplate siteData={siteData} activeTheme={activeTheme} />;
      }
    }

    // Otherwise, render the specialized layout based on their profession (default for specialized_v1)
    switch (profileData.profession) {
      case 'engineer':
      case 'architect':
      case 'data_scientist':
        return <DevPreciseTemplate data={profileData as any} />;
      case 'teacher':
      case 'scholar':
        return <AcademicCleanTemplate data={profileData as any} />;
      case 'actor':
        return <CinemaDramaticTemplate data={profileData as any} />;
      case 'influencer':
      case 'player':
      case 'coach':
      case 'scout':
        return <VibrantSocialTemplate data={profileData as any} />;
      case 'editor':
      case 'artist':
        return <EditorialRichTemplate data={profileData as any} />;
      case 'manager':
      case 'executive':
      case 'coordinator':
        return <DataForwardTemplate data={profileData as any} />;
      case 'student':
        return <ModularJourneyTemplate data={profileData as any} />;
      case 'doctor':
      case 'lawyer':
      case 'consultant':
        return <ExpertTrustTemplate data={profileData as any} />;
      default:
        return <StandardTemplate siteData={siteData} activeTheme={activeTheme} />;
    }
  };

  const portfolioContent = renderTemplate();

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
              className={`rounded-xl shadow-2xl overflow-hidden border border-gray-700 transition-colors duration-300 ${getTemplateBg(profileData?.profession, profileData?.template_choice)}`}
              style={{ aspectRatio: "16/10" }}
            >
              <div className="w-full h-full overflow-auto">
                <div className={`transition-colors duration-300 min-h-full ${getTemplateBg(profileData?.profession, profileData?.template_choice)}`}>
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
              {/* High-Fidelity Phone Frame Container */}
              <div 
                className="relative mx-auto bg-[#18181b] rounded-[52px] p-3.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] border border-zinc-800 ring-1 ring-white/10"
                style={{ width: "380px", height: "820px" }}
              >
                {/* Inner Bezel Border */}
                <div className="absolute inset-2.5 border-[2px] border-zinc-800/80 rounded-[42px] pointer-events-none z-20"></div>

                {/* Left Hardware Buttons */}
                <div className="w-[3px] h-6 bg-zinc-850 absolute -left-[2px] top-28 rounded-l border-y border-zinc-700/30"></div>
                <div className="w-[3px] h-12 bg-zinc-850 absolute -left-[2px] top-40 rounded-l border-y border-zinc-700/30"></div>
                <div className="w-[3px] h-12 bg-zinc-850 absolute -left-[2px] top-56 rounded-l border-y border-zinc-700/30"></div>

                {/* Right Power Button */}
                <div className="w-[3px] h-16 bg-zinc-850 absolute -right-[2px] top-44 rounded-r border-y border-zinc-700/30"></div>

                {/* Dynamic Island Pill */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-30 w-28 h-6 bg-black rounded-full pointer-events-none flex items-center justify-between px-3.5 shadow-inner">
                  {/* Camera lens glow */}
                  <div className="w-2 h-2 rounded-full bg-zinc-950 border border-zinc-900/80 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-900/30"></div>
                  </div>
                  {/* Sensor dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-950"></div>
                </div>

                <div 
                  className={`relative z-10 overflow-hidden rounded-[38px] w-full h-full ring-1 ring-black/40 transition-colors duration-300 ${getTemplateBg(profileData?.profession, profileData?.template_choice)}`}
                >
                  <div className={`w-full h-full overflow-y-auto overflow-x-hidden transition-colors duration-300 ${getTemplateBg(profileData?.profession, profileData?.template_choice)}`}>
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