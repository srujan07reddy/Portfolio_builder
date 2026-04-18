"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import StandardTemplate from "@/templates/StandardTemplate";
import { sanitizeInput } from "@/lib/validation";
import { Loader2 } from "lucide-react";

export default function PublicPortfolio() {
  const params = useParams();
  const rawUsername = params.username as string;
  
  // Sanitize username to prevent XSS and SQL injection
  const username = sanitizeInput(rawUsername).toLowerCase().trim();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
          };
          setProfile(sanitizedData);
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

  // If found, render the actual template with sanitized data
  return profile ? <StandardTemplate data={profile} /> : null;
}