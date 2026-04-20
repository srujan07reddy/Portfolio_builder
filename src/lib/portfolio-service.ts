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

export interface Project {
  id: string;
  portfolio_id: string;
  title: string;
  description?: string;
  tech_stack: string[];
  created_at: string;
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

/**
 * Fetch projects by portfolio ID
 */
export async function getProjectsByPortfolioId(portfolioId: string): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("portfolio_id", portfolioId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return data as Project[];
  } catch (err) {
    console.error("Unexpected error fetching projects:", err);
    return [];
  }
}

/**
 * Create a new project
 */
export async function createProject(project: Omit<Project, "id" | "created_at">): Promise<Project | null> {
  try {
    if (!project.portfolio_id) {
      throw new Error("portfolio_id is required to create project");
    }
    if (!project.title.trim()) {
      throw new Error("title is required to create project");
    }

    const { data, error } = await supabase
      .from("projects")
      .insert(project)
      .select()
      .single();

    if (error) {
      console.error("Error creating project:", error);
      return null;
    }

    return data as Project;
  } catch (err) {
    console.error("Unexpected error creating project:", err);
    return null;
  }
}
