import { supabase } from "@/lib/supabase";

export interface Portfolio {
  id: string;
  owner_id: string;
  username: string;
  full_name: string;
  template_choice: string;
  bio: string;
  skills?: string[];
  social_links?: Record<string, string>;
}

/**
 * Fetch portfolio by user ID
 */
export async function getPortfolioByUserId(userId: string): Promise<Portfolio | null> {
  try {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("owner_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows found - not an error, just no portfolio yet
        return null;
      }
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
 * Save portfolio using upsert (insert or update)
 */
export async function savePortfolio(data: Partial<Portfolio>): Promise<Portfolio | null> {
  try {
    if (!data.owner_id) {
      throw new Error("owner_id is required to save portfolio");
    }

    const { data: result, error } = await supabase
      .from("portfolios")
      .upsert(data, { onConflict: "owner_id" })
      .select()
      .single();

    if (error) {
      console.error("Error saving portfolio:", error);
      return null;
    }

    return result as Portfolio;
  } catch (err) {
    console.error("Unexpected error saving portfolio:", err);
    return null;
  }
}
