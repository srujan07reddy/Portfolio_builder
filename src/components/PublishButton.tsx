"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Cloud, Globe, Zap, Check, Loader } from "lucide-react";

export default function PublishButton() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const publishOptions = [
    {
      id: "netlify",
      name: "Netlify",
      icon: <Cloud className="w-8 h-8" />,
      description: "Free hosting with continuous deployment",
      features: ["Free tier", "GitHub integration", "Auto updates", "Instant deployment"],
      color: "from-cyan-500 to-blue-600",
      cta: "Deploy to Netlify"
    },
    {
      id: "vercel",
      name: "Vercel",
      icon: <Zap className="w-8 h-8" />,
      description: "Optimized for Next.js with global CDN",
      features: ["Next.js native", "Fast deployments", "Analytics included", "Free plan available"],
      color: "from-gray-800 to-black",
      cta: "Deploy to Vercel"
    },
    {
      id: "github_pages",
      name: "GitHub Pages",
      icon: <Globe className="w-8 h-8" />,
      description: "Free hosting directly from your repository",
      features: ["Completely free", "GitHub integration", "GitHub domain", "Easy setup"],
      color: "from-purple-600 to-pink-600",
      cta: "Deploy to GitHub Pages"
    }
  ];

  const domainOptions = [
    {
      id: "godaddy",
      name: "GoDaddy",
      description: "Register and manage domains",
      link: "https://www.godaddy.com"
    },
    {
      id: "namecheap",
      name: "Namecheap",
      description: "Affordable domain registration",
      link: "https://www.namecheap.com"
    },
    {
      id: "bluehost",
      name: "Bluehost",
      description: "Hosting + domain solutions",
      link: "https://www.bluehost.com"
    }
  ];

  const handlePublish = async (optionId: string) => {
    setIsPublishing(true);
    setPublishStatus("loading");
    
    try {
      // Simulate publishing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPublishStatus("success");
      setTimeout(() => {
        setShowModal(false);
        setPublishStatus("idle");
        setSelectedOption(null);
        setIsPublishing(false);
      }, 2000);
    } catch (error) {
      setPublishStatus("error");
      setTimeout(() => {
        setIsPublishing(false);
      }, 2000);
    }
  };

  return (
    <>
      {/* Publish Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        <Upload className="w-5 h-5" />
        Publish Site
      </motion.button>

      {/* Modal Backdrop */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isPublishing && setShowModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Publish Your Portfolio</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Hosting Options */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Choose Hosting Provider</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {publishOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        whileHover={{ scale: 1.02 }}
                        className={`p-6 rounded-lg border-2 transition-all text-left ${
                          selectedOption === option.id
                            ? "border-cyan-500 bg-cyan-500/10"
                            : "border-gray-600 bg-gray-800/50 hover:border-gray-500"
                        }`}
                      >
                        <div className={`bg-gradient-to-r ${option.color} p-3 rounded-lg w-fit mb-4`}>
                          {option.icon}
                        </div>
                        <h4 className="font-bold text-white mb-1">{option.name}</h4>
                        <p className="text-sm text-gray-400 mb-4">{option.description}</p>
                        <ul className="space-y-1">
                          {option.features.map((feature, idx) => (
                            <li key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                              <Check className="w-3 h-3 text-green-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Domain Registration */}
                <div className="border-t border-gray-700 pt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Get Your Domain</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {domainOptions.map((domain) => (
                      <motion.a
                        key={domain.id}
                        href={domain.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg border border-gray-600 bg-gray-800/50 hover:border-cyan-500 transition-all text-center"
                      >
                        <h4 className="font-bold text-white mb-2">{domain.name}</h4>
                        <p className="text-sm text-gray-400 mb-4">{domain.description}</p>
                        <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-sm font-medium text-white">
                          Visit Site
                        </button>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Publish Button */}
                <div className="border-t border-gray-700 pt-6 flex justify-end gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={isPublishing}
                    className="px-6 py-2 border border-gray-600 rounded-lg text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: selectedOption ? 1.05 : 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectedOption && handlePublish(selectedOption)}
                    disabled={!selectedOption || isPublishing}
                    className={`px-8 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${
                      selectedOption
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {publishStatus === "loading" && (
                      <Loader className="w-4 h-4 animate-spin" />
                    )}
                    {publishStatus === "success" && (
                      <Check className="w-4 h-4" />
                    )}
                    {publishStatus === "loading" ? "Publishing..." : publishStatus === "success" ? "Published!" : "Publish Now"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}