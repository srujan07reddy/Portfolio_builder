import { supabase } from "@/lib/supabase";

export interface Portfolio {
  id: string;
  owner_id: string;
  username: string;
  full_name?: string;
  bio?: string;
  template_choice: string;
  is_public: boolean;
  custom_domain?: string;
  domain_provider?: string;
  social_links?: Record<string, string>;
  show_domains: boolean;
  show_projects: boolean;
  show_consulting: boolean;
  show_custom: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortfolioInput {
  username?: string;
  full_name?: string;
  bio?: string;
  template_choice?: string;
  is_public?: boolean;
  custom_domain?: string;
  domain_provider?: string;
  social_links?: Record<string, string>;
  show_domains?: boolean;
  show_projects?: boolean;
  show_consulting?: boolean;
  show_custom?: boolean;
}

/**
 * Fetch portfolio by user ID
 */
export async function getPortfolio(userId: string): Promise<Portfolio | null> {
  try {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("owner_id", userId)
      .single();

    if (error) {
      console.error("Error fetching portfolio:", error);
      return null;
    }

    return data as Portfolio;
  } catch (err) {
    console.error("Unexpected error fetching portfolio:", err);
    return null;
  }
}

/**
 * Update portfolio by user ID
 */
export async function updatePortfolio(userId: string, data: PortfolioInput): Promise<Portfolio | null> {
  try {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    const { data: result, error } = await supabase
      .from("portfolios")
      .update(updateData)
      .eq("owner_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating portfolio:", error);
      return null;
    }

    return result as Portfolio;
  } catch (err) {
    console.error("Unexpected error updating portfolio:", err);
    return null;
  }
}

/**
 * Create initial portfolio after user signup
 */
export async function createInitialPortfolio(
  userId: string,
  username: string
): Promise<Portfolio | null> {
  try {
    const newPortfolio = {
      owner_id: userId,
      username,
      full_name: "",
      bio: "",
      template_choice: "Corporate_Glacier",
      is_public: false,
      custom_domain: null,
      domain_provider: "GoDaddy",
      social_links: {
        twitter: "",
        github: "",
        linkedin: "",
        email: "",
      },
      show_domains: true,
      show_projects: true,
      show_consulting: true,
      show_custom: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("portfolios")
      .insert([newPortfolio])
      .select()
      .single();

    if (error) {
      console.error("Error creating initial portfolio:", error);
      return null;
    }

    return data as Portfolio;
  } catch (err) {
    console.error("Unexpected error creating initial portfolio:", err);
    return null;
  }
}
