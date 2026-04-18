"use client";

import { motion } from "framer-motion";
import { Terminal, User, Shield, FolderGit2, Briefcase, Layers } from "lucide-react";
import Link from "next/link";
import profileData from "../content/profile.json";

export default function Navbar() {
  // 1. Safely grab the dynamic blocks you built in the CMS
  const blocks = profileData.page_blocks || [];

  // 2. Map the CMS block types to the correct icons
  const getIcon = (type: string) => {
    switch (type) {
      case "identity_block": return <User className="w-4 h-4" />;
      case "domains_block": return <Shield className="w-4 h-4" />;
      case "projects_block": return <FolderGit2 className="w-4 h-4" />;
      case "consulting_block": return <Briefcase className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />; // For Custom Blocks
    }
  };

  // 3. Auto-generate the links based on your CMS data
  const navLinks = blocks.map((block: any) => {
    const rawTitle = block.title || "Section";
    // Cleans up "01 // IDENTITY" to just "IDENTITY"
    const cleanName = rawTitle.includes("//") ? rawTitle.split("//")[1].trim() : rawTitle;
    // Creates a safe scroll ID like "identity" or "custom-section"
    const sectionId = cleanName.toLowerCase().replace(/\s+/g, "-");

    return {
      name: cleanName,
      href: `#${sectionId}`,
      icon: getIcon(block.type)
    };
  });

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] as any }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4 pointer-events-none"
    >
      <div className="flex items-center gap-2 md:gap-6 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-lg pointer-events-auto">
        
        {/* Logo / Home Button */}
        <Link href="/" className="flex items-center gap-2 mr-4 group">
          <div className="p-1.5 rounded-md bg-gray-900 dark:bg-white text-white dark:text-black group-hover:bg-cyan-500 group-hover:text-white transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-bold tracking-tight text-sm hidden md:block">PORTFOLIO</span>
        </Link>

        {/* Dynamic Navigation Links */}
        <div className="flex items-center gap-1 md:gap-2 border-l border-gray-300 dark:border-gray-700 pl-4 md:pl-6">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-all"
            >
              <span className="hidden sm:block">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

      </div>
    </motion.nav>
  );
}