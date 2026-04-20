"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Layout, User, Globe, Share2, Settings, LogOut, AlertCircle, CheckCircle, Loader2, Eye, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getPortfolio, createInitialPortfolio, type Portfolio } from "@/lib/portfolio-service";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "sections" | "domain" | "social" | "settings">("profile");
  const [portfolioExists, setPortfolioExists] = useState(false);
  const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const [profile, setProfile] = useState({ full_name: "", username: "", bio: "", template_choice: "Corporate_Glacier", is_public: false });
  const [sections, setSections] = useState({ show_domains: true, show_projects: true, show_consulting: true, show_custom: false });
  const [domain, setDomain] = useState({ custom_domain: "", domain_provider: "GoDaddy" });
  const [social, setSocial] = useState({ twitter: "", github: "", linkedin: "", email: "" });

  useEffect(() => {
    const verifyAccessAndFetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { router.push("/login"); return; }
        
        setUserId(session.user.id);
        const portfolio = await getPortfolio(session.user.id);
        
        if (portfolio) {
          setPortfolioExists(true);
          setPortfolioData(portfolio);
          setProfile({
            full_name: portfolio.full_name || "",
            username: portfolio.username || "",
            bio: portfolio.bio || "",
            template_choice: portfolio.template_choice || "Corporate_Glacier",
            is_public: portfolio.is_public || false
          });
        } else {
          setPortfolioExists(false);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    verifyAccessAndFetchProfile();
  }, [router]);

  const handleSave = async () => {
    setError(""); setSuccess(""); setSaving(true);
    try {
      if (!profile.full_name.trim()) throw new Error("Display name is required");
      if (!profile.username.trim()) throw new Error("Username is required");
      if (profile.username.length < 3) throw new Error("Username must be at least 3 characters");
      if (!/^[a-zA-Z0-9_-]+$/.test(profile.username)) throw new Error("Username can only contain letters, numbers, hyphens, and underscores");
      const response = await fetch("/api/portfolio", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ profile, sections, domain, social }) });
      if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error || "Failed to save profile"); }
      setSuccess("Profile saved successfully!"); setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
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
      const result = await createInitialPortfolio(userId, profile.username);
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
              <span>User: <span className="text-blue-600 font-bold">{profile.username || "Unknown"}</span></span>
              <span className="ml-4">Status: <span className="text-emerald-600 font-bold">Active</span></span>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 transition-all text-sm font-bold uppercase tracking-wider rounded-lg">
              <LogOut className="w-4 h-4 inline mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="px-8 py-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-8 p-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm text-blue-600 font-bold uppercase tracking-widest">System Online</span>
            </div>
            <div className="text-sm text-slate-600">
              Portfolio: <span className={`font-bold ${profile.is_public ? 'text-emerald-600' : 'text-slate-500'}`}>{profile.is_public ? "Public" : "Private"}</span> |
              Template: <span className="text-blue-600 font-bold">{profile.template_choice}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-6">Navigation</h3>
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "sections", label: "Sections", icon: Layout },
                  { id: "domain", label: "Domain", icon: Globe },
                  { id: "social", label: "Social", icon: Share2 },
                  { id: "settings", label: "Settings", icon: Settings }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm font-bold uppercase tracking-wider ${
                        activeTab === item.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="w-4 h-4 inline mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl p-8 shadow-lg">
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
                <div className="text-center py-12 space-y-6">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight mb-2">Create Your Profile</h2>
                    <p className="text-slate-600">Set up your portfolio to get started with our platform</p>
                  </div>
                  
                  <div className="max-w-md mx-auto space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2 text-left">Username</label>
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                        placeholder="your-username"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCreatePortfolio}
                    disabled={creating}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    {creating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Create Portfolio
                      </>
                    )}
                  </button>
                </div>
              )}

              {activeTab === "profile" && portfolioExists && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Profile Configuration</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Display Name</label>
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

              {activeTab !== "profile" && (
                <div className="text-center py-12">
                  <Settings className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} configuration coming soon...</p>
                </div>
              )}

              {portfolioExists && (
              <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-4">
                <Link
                  href={`/${profile.username}`}
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
    </main>
  );
}
