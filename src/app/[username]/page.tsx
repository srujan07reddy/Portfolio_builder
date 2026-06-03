"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
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
import { sanitizeInput } from "@/lib/validation";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PublicPortfolio() {
  const params = useParams();
  const rawUsername = params.username as string;
  
  // Sanitize username to prevent XSS and SQL injection
  const username = sanitizeInput(rawUsername).toLowerCase().trim();

  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        // Validate username format before querying
        if (!username || username.length < 3 || username.length > 30) {
          setError(true);
          setErrorMessage("Invalid username format");
          setLoading(false);
          return;
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
          setError(true);
          setErrorMessage("Invalid username format");
          setLoading(false);
          return;
        }

        // Query database for public portfolio with explicit access control
        const { data: portfolioData, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('username', username)
          .eq('is_public', true) // Only fetch public portfolios
          .single();
        
        // Verify data integrity - portfolio should be public
        if (portfolioData && portfolioData.is_public !== true) {
          setError(true);
          setErrorMessage('Portfolio not found');
          setLoading(false);
          return;
        }
        
        const data = portfolioData;

        if (data) {
          const { data: projData } = await supabase
            .from("projects")
            .select("*")
            .eq("portfolio_id", data.id);
          setProjects(projData || []);
        }

        if (error) {
          // Don't leak information about whether user exists
          setError(true);
          setErrorMessage("Portfolio not found");
        } else if (!data) {
          setError(true);
          setErrorMessage("Portfolio not found");
        } else {
          // Sanitize user data before rendering
          const sanitizedData = {
            ...data,
            full_name: sanitizeInput(data.full_name || ""),
            bio: sanitizeInput(data.bio || ""),
            username: sanitizeInput(data.username || ""),
            profession: data.professions?.[0] || data.profession || "general",
          };
          setProfile(sanitizedData);

          // Check if current user is owner to show back to dashboard button
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData?.session?.user?.id === data.owner_id) {
            setIsOwner(true);
          }
        }
      } catch (err: any) {
        setError(true);
        setErrorMessage("Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchPortfolio();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-mono text-xs flex-col gap-3">
        <Loader2 className="w-6 h-6 animate-spin" />
        <div className="animate-pulse">DECRYPTING_BIO_DATA_FOR_{username?.toUpperCase()}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-mono p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2 uppercase">Error: Node_Not_Found</h1>
          <p className="text-gray-500 text-xs text-wrap break-all max-w-sm">
            {errorMessage}
          </p>
        </div>
      </div>
    );
  }

  // If found, render the actual template based on profession
  if (!profile) return null;

  const themeColor = profile.theme_color || "Cyan";
  const siteData = {
    hero: {
      name: profile.full_name || "Your Name",
      roles: profile.professions?.join(", ") || profile.profession || "Strategic Consultant",
      avatar: profile.avatar_url || "/images/avatar-placeholder.png",
    },
    bio: profile.bio || "Professional bio here...",
    links: {
      email: profile.social_links?.email || "",
      github: profile.social_links?.github || "",
      linkedin: profile.social_links?.linkedin || ""
    },
    domains: {
      list: profile.specialized_data?.expertise_areas?.map((name: string) => ({ name, description: "Expertise in this area." })) || []
    },
    projects: projects.map(p => ({
      name: p.title,
      description: p.description,
      tools: p.tech_stack?.join(", ") || ""
    })),
    consulting: {
      headline: profile.specialized_data?.tagline || "Strategic Alignment",
      body: profile.bio || "Professional consulting services."
    }
  };

  const activeTheme = {
    name: themeColor,
    accent: `bg-${themeColor.toLowerCase()}-500`,
    text: `text-${themeColor.toLowerCase()}-500`,
    border: `border-${themeColor.toLowerCase()}-500/50`
  };

  const renderTemplate = () => {
    // If they explicitly selected a standard layout, render it regardless of profession
    const isStandardLayoutChoice = [
      'Standard', 'Corporate_Glacier', 'Corporate', 'Minimalist', 'standard_classic'
    ].includes(profile.template_choice);

    if (isStandardLayoutChoice) {
      switch (profile.template_choice) {
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
    switch (profile.profession) {
      case 'engineer':
      case 'architect':
      case 'data_scientist':
        return <DevPreciseTemplate data={profile} />;
      case 'teacher':
      case 'scholar':
        return <AcademicCleanTemplate data={profile} />;
      case 'actor':
        return <CinemaDramaticTemplate data={profile} />;
      case 'influencer':
      case 'player':
      case 'coach':
      case 'scout':
        return <VibrantSocialTemplate data={profile} />;
      case 'editor':
      case 'artist':
        return <EditorialRichTemplate data={profile} />;
      case 'manager':
      case 'executive':
      case 'coordinator':
        return <DataForwardTemplate data={profile} />;
      case 'student':
        return <ModularJourneyTemplate data={profile} />;
      case 'doctor':
      case 'lawyer':
      case 'consultant':
        return <ExpertTrustTemplate data={profile} />;
      default:
        return <StandardTemplate siteData={siteData} activeTheme={activeTheme} />;
    }
  };

  return (
    <>
      {renderTemplate()}
      {isOwner && (
        <div className="fixed bottom-6 left-6 z-[999]">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-[0_10px_25px_rgba(59,130,246,0.3)] transition-all border border-blue-500 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      )}
    </>
  );
}