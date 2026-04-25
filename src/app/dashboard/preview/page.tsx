"use client";

import React, { useEffect, useState } from "react";
import PortfolioPreview from "@/components/PortfolioPreview";
import PublishButton from "@/components/PublishButton";
import { supabase } from "@/lib/supabase";
import { getPortfolioByUserId, type Portfolio } from "@/lib/portfolio-service";
import { Loader2 } from "lucide-react";

export default function DashboardPreview() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const data = await getPortfolioByUserId(session.user.id);
        setPortfolio(data);
        if (data) {
          const { data: projData } = await supabase
            .from("projects")
            .select("*")
            .eq("portfolio_id", data.id);
          setProjects(projData || []);
        }
      }
      setLoading(false);
    };
    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-950">
      <PortfolioPreview portfolio={portfolio} projects={projects} />
      <PublishButton />
    </div>
  );
}