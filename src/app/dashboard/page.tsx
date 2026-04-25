"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, Layout, User, Globe, Share2, Settings, LogOut, AlertCircle, 
  CheckCircle, Loader2, Eye, Plus, Code2, Stethoscope, GraduationCap, 
  TrendingUp, Clapperboard, Briefcase, BookOpen, PenTool, Cpu, 
  Compass, X, Sparkles, Palette, Smartphone, Laptop, Layout as LayoutIcon, 
  Type, Layers, ChevronRight, Zap, Github, Shield, Copy 
} from "lucide-react";
import { 
  getPortfolioByUserId, savePortfolio, getProjectsByPortfolioId, 
  getPortfoliosByUserId, getPortfolioById, publishPortfolio, 
  type Portfolio, type Project 
} from "@/lib/portfolio-service";
import { supabase } from "@/lib/supabase";
import ProjectCard from "@/components/ProjectCard";
import AddProjectModal from "@/components/AddProjectModal";
import { ProfessionSelector, type ProfessionType } from "@/components/interactive/ProfessionSelector";
import dynamic from "next/dynamic";
import AIChat from "@/components/AIChat";

const ResumeAnalyzer = dynamic(() => import("@/components/ResumeAnalyzer"), {
  ssr: false,
  loading: () => (
    <div className="p-12 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
      <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Initializing AI Engine...</p>
    </div>
  ),
});

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "appearance" | "sections" | "domain" | "social" | "settings" | "ai_import" | "my_portfolios">("profile");
  const [portfolioExists, setPortfolioExists] = useState(false);
  const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null);
  const [allPortfolios, setAllPortfolios] = useState<Portfolio[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const router = useRouter();

  const [profile, setProfile] = useState({ full_name: "", username: "", bio: "", avatar_url: "", template_choice: "Standard", is_public: false, professions: ["general"] as ProfessionType[] });
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [sections, setSections] = useState({ show_domains: true, show_projects: true, show_consulting: true, show_custom: false });
  const [domain, setDomain] = useState({ custom_domain: "", domain_provider: "GoDaddy" });
  const [social, setSocial] = useState({ twitter: "", github: "", linkedin: "", email: "", youtube: "", instagram: "", custom_label: "", custom_url: "" });
  const [specializedData, setSpecializedData] = useState<Record<string, string>>({});
  const [customSections, setCustomSections] = useState<Array<{ title: string; content: string }>>([]);

  useEffect(() => {
    const verifyAccessAndFetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { router.push("/login"); return; }
        
        setUserId(session.user.id);
        const [portfolio, portfolios] = await Promise.all([
          getPortfolioByUserId(session.user.id),
          getPortfoliosByUserId(session.user.id)
        ]);
        
        setAllPortfolios(portfolios);
        
        if (portfolio) {
          setPortfolioExists(true);
          setPortfolioData(portfolio);
          setProfile({
            full_name: portfolio.full_name || "",
            username: portfolio.username || "",
            bio: portfolio.bio || "",
            avatar_url: portfolio.avatar_url || "",
            template_choice: portfolio.template_choice || "Standard",
            professions: Array.isArray(portfolio.professions) ? portfolio.professions as ProfessionType[] : (portfolio.profession ? [portfolio.profession as ProfessionType] : ["general"]),
            is_public: portfolio.is_public || false
          });
          setSocial(portfolio.social_links || { email: "", github: "", linkedin: "", twitter: "" } as any);
          setSpecializedData(portfolio.specialized_data || {});
          setCustomSections(portfolio.custom_sections || []);
          if (portfolio.sections) {
            setSections({ ...sections, ...portfolio.sections });
          }

          // Fetch projects for this portfolio
          const userProjects = await getProjectsByPortfolioId(portfolio.id);
          setProjects(userProjects);
        } else {
          setPortfolioExists(false);
          setProjects([]);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    verifyAccessAndFetchProfile();

    // REAL-TIME SUBSCRIPTION
    const portfolioChannel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolios', filter: `owner_id=eq.${userId}` },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
             // Handle background updates (like from AI or another tab)
             const updated = payload.new as Portfolio;
             if (updated.id === portfolioData?.id) {
               setPortfolioData(updated);
             }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(portfolioChannel);
    };
  }, [router, userId, portfolioData?.id]);

  const handleSave = async () => {
    setError(""); setSuccess(""); setSaving(true);
    try {
      if (!userId) throw new Error("User ID not found");
      if (!profile.full_name.trim()) throw new Error("Full name is required");
      if (!profile.username.trim()) throw new Error("Username is required");
      if (profile.username.length < 3) throw new Error("Username must be at least 3 characters");
      if (!/^[a-zA-Z0-9_-]+$/.test(profile.username)) throw new Error("Username can only contain letters, numbers, hyphens, and underscores");
      
      const result = await savePortfolio({
        id: portfolioData?.id,
        owner_id: userId,
        username: profile.username,
        full_name: profile.full_name,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        template_choice: profile.template_choice,
        profession: profile.professions[0] || "general",
        professions: profile.professions,
        social_links: social,
        specialized_data: specializedData,
        sections: sections,
        custom_sections: customSections
      });
      
      if (result) {
        setSuccess("Profile saved successfully!"); 
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error("Database error: Could not save portfolio data. Check if all fields are valid.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSwitchPortfolio = async (id: string) => {
    setLoading(true);
    try {
      const portfolio = await getPortfolioById(id);
      if (portfolio) {
        setPortfolioExists(true);
        setPortfolioData(portfolio);
        setProfile({
          full_name: portfolio.full_name || "",
          username: portfolio.username || "",
          bio: portfolio.bio || "",
          avatar_url: portfolio.avatar_url || "",
          template_choice: portfolio.template_choice || "Standard",
          professions: Array.isArray(portfolio.professions) ? portfolio.professions as ProfessionType[] : (portfolio.profession ? [portfolio.profession as ProfessionType] : ["general"]),
          is_public: portfolio.is_public || false
        });
        setSocial(portfolio.social_links || { email: "", github: "", linkedin: "", twitter: "" } as any);
        setSpecializedData(portfolio.specialized_data || {});
        setCustomSections(portfolio.custom_sections || []);
        if (portfolio.sections) {
          setSections({ ...sections, ...portfolio.sections });
        }
        const projs = await getProjectsByPortfolioId(portfolio.id);
        setProjects(projs);
        setSuccess(`Switched to portfolio: ${portfolio.full_name}`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError("Failed to switch portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    if (!userId) return;
    try {
      const ok = await publishPortfolio(id, userId);
      if (ok) {
        // Refresh list
        const portfolios = await getPortfoliosByUserId(userId);
        setAllPortfolios(portfolios);
        setSuccess("Portfolio published successfully!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError("Failed to publish portfolio");
    }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); localStorage.removeItem("user_session"); router.push("/"); };

  const handleCreatePortfolio = async () => {
    if (!userId || !profile.username.trim()) {
      setError("Username is required to create a portfolio");
      return;
    }
    
    setCreating(true);
    setError("");
    try {
      const result = await savePortfolio({
        owner_id: userId,
        username: profile.username,
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        template_choice: profile.template_choice || "Corporate_Glacier",
        profession: profile.professions[0] || "general",
        professions: profile.professions,
        skills: [],
        social_links: {}
      });
      if (result) {
        setPortfolioExists(true);
        setPortfolioData(result);
        setSuccess("Portfolio created successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error("Failed to create portfolio");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create portfolio");
    } finally {
      setCreating(false);
    }
  };

  const handleProjectAdded = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
    setSuccess("Project added successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">Loading Command Center</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 font-sans">
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#64748b_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <header className="relative z-50 px-8 py-6 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <h1 className="text-lg font-black tracking-tight text-slate-900">
              COMMAND<span className="text-blue-600">_CENTER</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm text-slate-600 uppercase tracking-widest">
              <span>Status: <span className="text-emerald-600 font-bold">Authenticated</span></span>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 transition-all text-sm font-bold uppercase tracking-wider rounded-lg">
              <LogOut className="w-4 h-4 inline mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="px-8 py-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-8 p-4 bg-white/60 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm text-blue-600 font-bold uppercase tracking-widest">System Online</span>
            </div>
            <div className="text-sm text-slate-600">
              Session established via secure gateway
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-2xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-6">Navigation</h3>
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "my_portfolios", label: "My Portfolios", icon: Layers },
                  { id: "ai_import", label: "AI Import", icon: Sparkles },
                  { id: "appearance", label: "Design & Industry", icon: LayoutIcon },
                  { id: "sections", label: "Active Sections", icon: LayoutIcon },
                  { id: "domain", label: "Domain", icon: Globe },
                  { id: "social", label: "Social", icon: Share2 },
                  { id: "settings", label: "Settings", icon: Settings }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm font-bold uppercase tracking-wider ${
                        activeTab === item.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="w-4 h-4 inline mr-3" />
                      {item.label}
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-xl p-8 shadow-2xl">
              {error && (
                <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-700 rounded-lg">
                  <AlertCircle className="w-5 h-5 inline mr-2" />
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-6 p-4 border border-emerald-300 bg-emerald-50 text-emerald-700 rounded-lg">
                  <CheckCircle className="w-5 h-5 inline mr-2" />
                  {success}
                </div>
              )}

              {activeTab === "profile" && !portfolioExists && (
                <div className="py-8">
                  {onboardingStep === 0 ? (
                    <div className="space-y-12">
                      <div className="text-center">
                        <div className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
                          Step_01: Identity_Type
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Select Your Profession</h2>
                        <p className="text-slate-500 font-medium max-w-lg mx-auto">
                          Our AI will tailor your portfolio components based on your industry.
                        </p>
                      </div>
                      
                      <ProfessionSelector 
                        selected={profile.professions}
                        onSelect={(types) => {
                          setProfile({ ...profile, professions: types });
                          setOnboardingStep(1);
                        }} 
                      />
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto text-center space-y-8 py-12">
                      <div className="mb-6">
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => setOnboardingStep(0)}
                          className="text-xs font-black text-blue-600 uppercase tracking-widest mb-8 hover:underline"
                        >
                          ← Change Profession
                        </motion.button>
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Plus className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight mb-2">Create Your Profile</h2>
                        <p className="text-slate-600">Secure your unique portfolio identifier</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="text-left">
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Portfolio_Identifier</label>
                          <input
                            type="text"
                            value={profile.username}
                            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-sm font-bold"
                            placeholder="e.g. john-doe-creative"
                          />
                        </div>

                        <motion.button
                          onClick={handleCreatePortfolio}
                          disabled={creating || !profile.username.trim()}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                        >
                          {creating ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Initializing...
                            </>
                          ) : (
                            <>
                              <span>Launch_Portfolio</span>
                              <Plus className="w-4 h-4" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "my_portfolios" && (
                <div className="space-y-12">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">My Portfolios</h2>
                      <p className="text-sm text-slate-500 font-medium">Manage multiple identities and publish your primary site.</p>
                    </div>
                    <button
                      onClick={() => {
                        setPortfolioData(null);
                        setPortfolioExists(false);
                        setProfile({ full_name: "", username: "", bio: "", avatar_url: "", template_choice: "Standard", is_public: false, professions: ["general"] });
                        setProjects([]);
                        setSuccess("Switched to fresh draft mode.");
                      }}
                      className="px-6 py-3 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <Plus size={16} /> Create_New_Draft
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allPortfolios.map((p) => (
                      <div key={p.id} className={`p-8 rounded-[2.5rem] border-2 transition-all ${portfolioData?.id === p.id ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-black text-slate-900">{p.full_name}</h3>
                              {p.is_public && (
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase tracking-widest rounded-full">Published</span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 font-mono">@{p.username}</p>
                          </div>
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${p.is_public ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 text-slate-400'}`}>
                            <Globe size={24} />
                          </div>
                        </div>

                        <div className="space-y-4">
                           <div className="flex gap-3">
                             <button
                               onClick={() => handleSwitchPortfolio(p.id)}
                               className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${portfolioData?.id === p.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                             >
                               {portfolioData?.id === p.id ? 'Currently Editing' : 'Switch & Edit'}
                             </button>
                             {!p.is_public && (
                               <button
                                 onClick={() => handlePublish(p.id)}
                                 className="px-6 py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all"
                               >
                                 Go_Live
                               </button>
                             )}
                           </div>
                           {p.is_public && (
                             <Link
                               href={`/${p.username}`}
                               target="_blank"
                               className="block w-full text-center py-3 border-2 border-slate-200 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                             >
                               View_Live_Site
                             </Link>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "ai_import" && (
                <div className="space-y-12">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">AI Resume Engine</h2>
                    <p className="text-sm text-slate-500 font-medium">Instantly build your portfolio by uploading your resume.</p>
                  </div>
                  <ResumeAnalyzer 
                    onAnalysisComplete={(data) => {
                      // 1. Update Profile & Core Info
                      setProfile({ 
                        ...profile, 
                        ...data.profile,
                        professions: data.profile.professions || profile.professions 
                      });
                      setSocial({ ...social, ...data.social });
                      
                      // 2. Update Specialized Industry Data (Domains/Roles)
                      setSpecializedData({ 
                        ...specializedData, 
                        ...data.specialized,
                        domain: data.specialized.expertise_areas?.[0] || specializedData.domain
                      });
                      
                      // 3. Auto-populate Projects
                      if (data.projects) {
                        const newProjects = data.projects.map((p: any) => ({
                          ...p,
                          portfolio_id: portfolioData?.id || "pending",
                          tech_stack: p.tech_stack || []
                        }));
                        setProjects(prev => [...newProjects, ...prev]);
                        
                        // Automatically enable the Project Gallery section if we have projects
                        setSections(prev => ({ ...prev, show_projects: true }));
                      }
                      
                      setSections(prev => ({ ...prev, ...data.sections }));
                      setCustomSections(data.custom_sections || []);
                      setSuccess("AI Analysis complete! Projects, roles, and expertise domains have been extracted.");
                      setTimeout(() => setSuccess(""), 5000);
                    }} 
                  />

                  {customSections.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 pt-12 border-t border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                          <CheckCircle size={18} />
                        </div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">AI Generated Sections Ready</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {customSections.map((section, idx) => (
                          <div key={idx} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                            <h4 className="text-xs font-black text-blue-600 uppercase tracking-tight mb-2">{section.title}</h4>
                            <p className="text-[10px] text-slate-500 line-clamp-3">{section.content}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center">
                        <button 
                          onClick={() => setActiveTab("sections")}
                          className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all"
                        >
                          Configure in Active Sections →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {activeTab === "profile" && portfolioExists && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Profile Configuration</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.full_name}
                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                        placeholder="Your Full Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Username</label>
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                        placeholder="your-username"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Professional Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white h-32 resize-none"
                      placeholder="Brief professional summary..."
                    />
                  </div>

                  {/* Specialized Fields based on Professions */}
                  {profile.professions.length > 0 && !profile.professions.includes("general") && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Industry_Specific_Data</h3>
                        <div className="h-px flex-1 bg-slate-100"></div>
                      </div>

                      <div className="grid grid-cols-1 gap-8">
                        {profile.professions.includes("engineer") && (
                          <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-[2.5rem] space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                <Code2 size={20} />
                              </div>
                              <h4 className="text-sm font-black text-blue-900 uppercase tracking-tight">Engineer_Specialization</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Course</label>
                                <input
                                  type="text"
                                  value={specializedData.course || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, course: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all bg-white text-sm"
                                  placeholder="e.g. Computer Science"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Technical Domain</label>
                                <input
                                  type="text"
                                  value={specializedData.domain || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, domain: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all bg-white text-sm"
                                  placeholder="e.g. AI / Cloud Infrastructure"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">GitHub Username</label>
                                <input
                                  type="text"
                                  value={specializedData.github_user || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, github_user: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all bg-white text-sm"
                                  placeholder="e.g. octocat"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Core Specialization</label>
                                <input
                                  type="text"
                                  value={specializedData.specialization || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, specialization: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all bg-white text-sm"
                                  placeholder="e.g. Neural Networks"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {profile.professions.includes("doctor") && (
                          <div className="p-8 bg-emerald-50/50 border border-emerald-100 rounded-[2.5rem] space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                <Stethoscope size={20} />
                              </div>
                              <h4 className="text-sm font-black text-emerald-900 uppercase tracking-tight">Medical_Credentials</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Medical License #</label>
                                <input
                                  type="text"
                                  value={specializedData.license || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, license: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all bg-white text-sm"
                                  placeholder="e.g. MD-12345678"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Specialization</label>
                                <input
                                  type="text"
                                  value={specializedData.specialty || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, specialty: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all bg-white text-sm"
                                  placeholder="e.g. Cardiology"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {profile.professions.includes("teacher") && (
                          <div className="p-8 bg-indigo-50/50 border border-indigo-100 rounded-[2.5rem] space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                <GraduationCap size={20} />
                              </div>
                              <h4 className="text-sm font-black text-indigo-900 uppercase tracking-tight">Academic_Context</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">University / Institution</label>
                                <input
                                  type="text"
                                  value={specializedData.university || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, university: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all bg-white text-sm"
                                  placeholder="e.g. Harvard University"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject Mastery</label>
                                <input
                                  type="text"
                                  value={specializedData.subject || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, subject: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all bg-white text-sm"
                                  placeholder="e.g. Theoretical Physics"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {profile.professions.includes("influencer") && (
                          <div className="p-8 bg-pink-50/50 border border-pink-100 rounded-[2.5rem] space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                                <TrendingUp size={20} />
                              </div>
                              <h4 className="text-sm font-black text-pink-900 uppercase tracking-tight">Influencer_Metrics</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Reach</label>
                                <input
                                  type="text"
                                  value={specializedData.total_reach || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, total_reach: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 transition-all bg-white text-sm"
                                  placeholder="e.g. 1.2M Followers"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Engagement Rate</label>
                                <input
                                  type="text"
                                  value={specializedData.engagement || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, engagement: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 transition-all bg-white text-sm"
                                  placeholder="e.g. 4.8%"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {profile.professions.includes("actor") && (
                          <div className="p-8 bg-violet-50/50 border border-violet-100 rounded-[2.5rem] space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                                <Clapperboard size={20} />
                              </div>
                              <h4 className="text-sm font-black text-violet-900 uppercase tracking-tight">Cinema_Credentials</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Demo Reel / Video Link</label>
                                <input
                                  type="text"
                                  value={specializedData.demo_url || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, demo_url: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 transition-all bg-white text-sm"
                                  placeholder="https://youtube.com/watch?v=..."
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Acting Agency</label>
                                <input
                                  type="text"
                                  value={specializedData.agency || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, agency: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 transition-all bg-white text-sm"
                                  placeholder="e.g. CAA / WME"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Notable Roles</label>
                                <input
                                  type="text"
                                  value={specializedData.roles || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, roles: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 transition-all bg-white text-sm"
                                  placeholder="e.g. Lead in 'Short Film'"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {profile.professions.includes("manager") && (
                          <div className="p-8 bg-amber-50/50 border border-amber-100 rounded-[2.5rem] space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                                <Briefcase size={20} />
                              </div>
                              <h4 className="text-sm font-black text-amber-900 uppercase tracking-tight">Management_Metrics</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Team Size Managed</label>
                                <input
                                  type="text"
                                  value={specializedData.team_size || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, team_size: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all bg-white text-sm"
                                  placeholder="e.g. 15+ members"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Management Style</label>
                                <input
                                  type="text"
                                  value={specializedData.mgmt_style || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, mgmt_style: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all bg-white text-sm"
                                  placeholder="e.g. Agile / Servant Leadership"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {profile.professions.includes("student") && (
                          <div className="p-8 bg-cyan-50/50 border border-cyan-100 rounded-[2.5rem] space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                                <BookOpen size={20} />
                              </div>
                              <h4 className="text-sm font-black text-cyan-900 uppercase tracking-tight">Academic_Journey</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current School</label>
                                <input
                                  type="text"
                                  value={specializedData.school || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, school: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all bg-white text-sm"
                                  placeholder="e.g. MIT"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Graduation Year</label>
                                <input
                                  type="text"
                                  value={specializedData.grad_year || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, grad_year: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all bg-white text-sm"
                                  placeholder="e.g. 2026"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {profile.professions.includes("editor") && (
                          <div className="p-8 bg-rose-50/50 border border-rose-100 rounded-[2.5rem] space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                                <PenTool size={20} />
                              </div>
                              <h4 className="text-sm font-black text-rose-900 uppercase tracking-tight">Editorial_Stack</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Medium</label>
                                <input
                                  type="text"
                                  value={specializedData.medium || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, medium: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 transition-all bg-white text-sm"
                                  placeholder="e.g. Video / Digital Content"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Software Stack</label>
                                <input
                                  type="text"
                                  value={specializedData.software || ""}
                                  onChange={(e) => setSpecializedData({ ...specializedData, software: e.target.value })}
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 transition-all bg-white text-sm"
                                  placeholder="e.g. Adobe Suite"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Projects Section */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="is_public"
                      checked={profile.is_public}
                      onChange={(e) => setProfile({ ...profile, is_public: e.target.checked })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="is_public" className="text-sm font-bold text-slate-900">
                      Make portfolio public
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "appearance" && portfolioExists && (
                <div className="space-y-12">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Appearance & Industry</h2>
                    <p className="text-sm text-slate-500">Define your professional identity and visual theme.</p>
                  </div>

                  <div className="space-y-6">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">01_ Primary_Industry</label>
                      <ProfessionSelector 
                        selected={profile.professions} 
                        onSelect={(types) => setProfile({ ...profile, professions: types })} 
                      />
                  </div>

                  <div className="space-y-6 pt-12 border-t border-slate-100">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">02_ Nested_Theme_Selection</label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setProfile({ ...profile, template_choice: "specialized_v1" })}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          profile.template_choice === "specialized_v1" || profile.template_choice === "Corporate_Glacier"
                            ? "border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-500/10"
                            : "border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                            <Layout size={20} />
                          </div>
                          <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Default</span>
                        </div>
                        <h4 className="font-black uppercase tracking-tight mb-1">
                          {(profile.professions[0] || 'general').toUpperCase()}_SPECIALIZED
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Our tailored engine for {(profile.professions[0] || 'general')}s with custom industry components.
                        </p>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setProfile({ ...profile, template_choice: "standard_classic" })}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          profile.template_choice === "standard_classic"
                            ? "border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-500/10"
                            : "border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                            <Eye size={20} />
                          </div>
                        </div>
                        <h4 className="font-black uppercase tracking-tight mb-1">STANDARD_CLASSIC</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          The original multi-purpose layout for a balanced professional look.
                        </p>
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "sections" && portfolioExists && (
                <div className="space-y-12">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Active Sections</h2>
                    <p className="text-sm text-slate-500 font-medium">Toggle and configure the modular components of your portfolio.</p>
                  </div>
                  <div className="space-y-6">
                    {([
                      { key: "show_domains", label: "Industry Expertise", description: "Skills and domains", icon: Globe },
                      { key: "show_projects", label: "Project Gallery", description: "Case studies and work", icon: Layout },
                      { key: "show_consulting", label: "Consulting", description: "Services and booking", icon: Briefcase },
                      { key: "show_custom", label: "Custom Feed", description: "Additional content", icon: Sparkles }
                    ] as const).map((item) => (
                      <div key={item.key} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5">
                        <div className="p-6 flex items-center justify-between bg-slate-50/50">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                              {React.createElement(item.icon, { size: 20 })}
                            </div>
                            <div>
                              <label className="text-sm font-black text-slate-900 uppercase tracking-tight">{item.label}</label>
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{item.description}</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={sections[item.key as keyof typeof sections]}
                              onChange={(e) => setSections({ ...sections, [item.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <AnimatePresence>
                          {sections[item.key as keyof typeof sections] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-slate-100 p-8"
                            >
                              {item.key === "show_projects" && (
                                <div className="space-y-6">
                                  <div className="flex items-center justify-between mb-4">
                                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live_Gallery_Control</h3>
                                     <button
                                       onClick={() => setShowAddProjectModal(true)}
                                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                                     >
                                       <Plus className="w-4 h-4" />
                                       Add_Project
                                     </button>
                                  </div>

                                  {projects.length === 0 ? (
                                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
                                      <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-4">No Projects Active</p>
                                      <button
                                        onClick={() => setShowAddProjectModal(true)}
                                        className="px-6 py-2 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-lg hover:border-blue-600 transition-all shadow-sm"
                                      >
                                        New Entry
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {projects.map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}

                              {item.key === "show_domains" && (
                                <div className="space-y-6">
                                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Industry_Specialization</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Core Skills (Comma separated)</label>
                                      <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all bg-white text-sm"
                                        placeholder="e.g. React, Next.js, Node.js"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Service Focus</label>
                                      <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all bg-white text-sm"
                                        placeholder="e.g. Full-stack Development"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {item.key === "show_consulting" && (
                                <div className="space-y-6">
                                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Service_Configuration</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Consulting Rate</label>
                                      <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all bg-white text-sm"
                                        placeholder="e.g. $150/hr"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Availability</label>
                                      <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all bg-white text-sm"
                                        placeholder="e.g. Mon-Fri, 9am-5pm"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {item.key === "show_custom" && (
                                <div className="space-y-6">
                                  <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Custom_AI_Sections</h3>
                                    <button 
                                      onClick={() => setCustomSections([...customSections, { title: "New Section", content: "" }])}
                                      className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                                    >
                                      + Add_Section
                                    </button>
                                  </div>
                                  {customSections.length === 0 ? (
                                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No custom sections generated yet.</p>
                                    </div>
                                  ) : (
                                    <div className="space-y-4">
                                      {customSections.map((section, idx) => (
                                        <div key={idx} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4">
                                          <div className="flex justify-between gap-4">
                                            <input 
                                              type="text"
                                              value={section.title}
                                              onChange={(e) => {
                                                const newSections = [...customSections];
                                                newSections[idx].title = e.target.value;
                                                setCustomSections(newSections);
                                              }}
                                              className="flex-1 text-sm font-bold text-slate-900 bg-slate-50 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                              placeholder="Section Title"
                                            />
                                            <button 
                                              onClick={() => setCustomSections(customSections.filter((_, i) => i !== idx))}
                                              className="text-red-400 hover:text-red-600"
                                            >
                                              <X size={16} />
                                            </button>
                                          </div>
                                          <textarea 
                                            value={section.content}
                                            onChange={(e) => {
                                              const newSections = [...customSections];
                                              newSections[idx].content = e.target.value;
                                              setCustomSections(newSections);
                                            }}
                                            className="w-full text-[12px] text-slate-600 bg-slate-50 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                                            placeholder="Section Content..."
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "appearance" && portfolioExists && (
                <div className="space-y-12">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Design & Industry</h2>
                    <p className="text-sm text-slate-500 font-medium">Customize your portfolio's visual identity and template.</p>
                  </div>

                  {/* Template Selection */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        <LayoutIcon size={18} />
                      </div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Portfolio Template</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: "standard_classic", name: "Standard Classic", desc: "Mono font, professional grid, clean borders" },
                        { id: "minimalist_modern", name: "Minimalist Modern", desc: "Sans font, spacious, subtle typography" }
                      ].map((tpl) => (
                        <button
                          key={tpl.id}
                          onClick={() => setPortfolioData({ ...portfolioData!, template_choice: tpl.id })}
                          className={`p-6 text-left border-2 rounded-2xl transition-all ${
                            portfolioData?.template_choice === tpl.id
                              ? "border-blue-500 bg-blue-50/50"
                              : "border-slate-100 hover:border-slate-200"
                          }`}
                        >
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">{tpl.name}</h4>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{tpl.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme Color */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                        <Palette size={18} />
                      </div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Accent Color</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {["Cyan", "Violet", "Emerald", "Ruby"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setPortfolioData({ ...portfolioData!, theme_color: color })}
                          className={`px-6 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                            portfolioData?.theme_color === color
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-100 hover:border-slate-200"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-${color.toLowerCase()}-500 shadow-lg`} />
                          <span className="text-xs font-black uppercase tracking-widest">{color}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-center p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 border-dashed">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Device Preview Controls</p>
                    <div className="flex justify-center gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-blue-500 transition-all">
                        <Laptop size={14} /> Desktop_Mode
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-blue-500 transition-all">
                        <Smartphone size={14} /> Mobile_Optimized
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "domain" && portfolioExists && (
                <div className="space-y-12">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Deployment & Hosting</h2>
                    <p className="text-sm text-slate-500 font-medium">Connect your portfolio to a live domain using professional free hosting.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { 
                        id: "vercel", 
                        name: "Vercel", 
                        desc: "Best for Next.js", 
                        icon: Zap, 
                        color: "bg-black text-white",
                        url: `https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world&env=NEXT_PUBLIC_PORTFOLIO_ID&envDescription=Enter%20your%20Portfolio%20ID%20from%20the%20dashboard&envLink=https%3A%2F%2F${profile.username}.vercel.app` 
                      },
                      { 
                        id: "netlify", 
                        name: "Netlify", 
                        desc: "Easy drag & drop", 
                        icon: Globe, 
                        color: "bg-[#00AD9F] text-white",
                        url: `https://app.netlify.com/start/deploy?repository=https://github.com/netlify/netlify-status-gate`
                      },
                      { 
                        id: "github", 
                        name: "GitHub Pages", 
                        desc: "Free for open source", 
                        icon: Github, 
                        color: "bg-[#24292F] text-white",
                        url: `https://github.com/new`
                      }
                    ].map((platform) => (
                      <div key={platform.id} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
                        <div className={`w-12 h-12 ${platform.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                          <platform.icon size={24} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">{platform.name}</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-6">{platform.desc}</p>
                        <a 
                          href={platform.url}
                          target="_blank"
                          className="block w-full text-center py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                        >
                          Deploy_to_{platform.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full text-[8px] font-black uppercase tracking-widest text-emerald-400">
                           <Shield size={12} /> Verification Active
                         </div>
                         <h3 className="text-3xl font-black leading-tight uppercase tracking-tighter">Secure <br /> Launch Hub</h3>
                         <p className="text-sm text-white/60 leading-relaxed">Your unique License Key is required to verify your site on external hosting platforms.</p>
                         
                         <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between gap-4 group/key">
                            <div>
                               <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Your_License_Key</p>
                               <code className="text-xs font-mono text-blue-400">{portfolioData?.id ? `PB-${portfolioData.id.slice(0,8).toUpperCase()}-${portfolioData.owner_id.slice(0,4).toUpperCase()}` : 'GENERATING_KEY...'}</code>
                            </div>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                               <Copy size={14} className="text-white/40" />
                            </button>
                         </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                          <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Required Env Variables</label>
                          <div className="space-y-2">
                             <div className="flex justify-between text-[10px] font-mono">
                               <span className="text-white/40">NEXT_PUBLIC_PORTFOLIO_ID</span>
                               <span className="text-emerald-400">REQUIRED</span>
                             </div>
                             <div className="flex justify-between text-[10px] font-mono">
                               <span className="text-white/40">LICENSE_KEY</span>
                               <span className="text-emerald-400">REQUIRED</span>
                             </div>
                          </div>
                        </div>
                        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all">
                          Finalize_&_Deploy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "social" && portfolioExists && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Social Links</h2>
                  <p className="text-slate-600">Connect your social media profiles.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: "twitter", label: "Twitter", placeholder: "https://twitter.com/username" },
                      { key: "github", label: "GitHub", placeholder: "https://github.com/username" },
                      { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
                      { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/username" },
                      { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@username" },
                      { key: "email", label: "Email", placeholder: "your@email.com" }
                    ].map((item) => (
                      <div key={item.key}>
                        <label className="block text-sm font-bold text-slate-900 mb-2">{item.label}</label>
                        <input
                          type="text"
                          value={social[item.key as keyof typeof social] || ""}
                          onChange={(e) => setSocial({ ...social, [item.key]: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                          placeholder={item.placeholder}
                        />
                      </div>
                    ))}
                    {/* Profile Photo */}
                    <div className="md:col-span-2 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 border-dashed flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-32 h-32 rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-inner group">
                        {profile.avatar_url ? (
                          <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <User size={48} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-4">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Photo URL</label>
                        <input
                          type="text"
                          value={profile.avatar_url || ""}
                          onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all bg-white text-sm"
                          placeholder="Paste a link to your image (LinkedIn, Drive, etc.)"
                        />
                        <p className="text-[10px] text-slate-400">Pro tip: Use a high-quality square headshot for the best look.</p>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Plus size={14} className="text-blue-600" /> Custom Business / External Link
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Button Label</label>
                          <input
                            type="text"
                            value={social.custom_label || ""}
                            onChange={(e) => setSocial({ ...social, custom_label: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                            placeholder="e.g. My Agency / Custom Site"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target URL</label>
                          <input
                            type="text"
                            value={social.custom_url || ""}
                            onChange={(e) => setSocial({ ...social, custom_url: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                            placeholder="https://yourbusiness.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && portfolioExists && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Settings</h2>
                  <p className="text-slate-600">Configure your portfolio preferences.</p>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Template Choice</label>
                    <select
                      value={profile.template_choice}
                      onChange={(e) => setProfile({ ...profile, template_choice: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                    >
                      <option value="Corporate_Glacier">Corporate Glacier (Premium Strategy)</option>
                      <option value="Standard">Standard (Tactical)</option>
                      <option value="Corporate">Corporate (Professional)</option>
                      <option value="Minimalist">Minimalist (Clean)</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab !== "profile" && !portfolioExists && (
                <div className="text-center py-12">
                  <Settings className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">Create a portfolio first to access {activeTab} settings.</p>
                </div>
              )}

              {portfolioExists && (
              <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-4">
                <Link
                  href="/dashboard/preview"
                  target="_blank"
                  className="px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold rounded-lg transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Link>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      {portfolioData && (
        <AddProjectModal
          isOpen={showAddProjectModal}
          onClose={() => setShowAddProjectModal(false)}
          portfolioId={portfolioData.id}
          onProjectAdded={handleProjectAdded}
        />
      )}
      <AIChat 
        currentData={{ profile, social, specializedData, sections, customSections, portfolioData }} 
        onDataUpdate={(newData) => {
          if (newData.profile) setProfile(newData.profile);
          if (newData.social) setSocial(newData.social);
          if (newData.specializedData) setSpecializedData(newData.specializedData);
          if (newData.sections) setSections(newData.sections);
          if (newData.customSections) setCustomSections(newData.customSections);
          if (newData.portfolioData) setPortfolioData(newData.portfolioData);
          setSuccess("AI Assistant updated your data!");
          setTimeout(() => setSuccess(""), 3000);
        }}
      />
    </main>
  );
}
