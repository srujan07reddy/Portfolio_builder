import { supabase } from "@/lib/supabase";

export interface Portfolio {
  id: string;
  owner_id: string;
  username: string;
  full_name: string;
  template_choice: string;
  profession?: any;
  professions?: string[];
  category?: 'professional' | 'academic';
  bio: string;
  skills?: string[];
  social_links?: Record<string, string>;
  specialized_data?: Record<string, any>;
  sections?: Record<string, boolean>;
  custom_sections?: Array<{ title: string; content: string }>;
  theme_color?: string;
  avatar_url?: string;
  license_key?: string;
  is_public?: boolean;
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
 * Fetch all portfolios for a user
 */
export async function getPortfoliosByUserId(userId: string): Promise<Portfolio[]> {
  try {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("owner_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching portfolios:", error.message);
      return [];
    }

    return data as Portfolio[];
  } catch (err) {
    console.error("Unexpected error fetching portfolios:", err);
    return [];
  }
}

/**
 * Fetch a specific portfolio by ID
 */
export async function getPortfolioById(id: string): Promise<Portfolio | null> {
  try {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data as Portfolio;
  } catch (err) {
    return null;
  }
}

/**
 * Fetch portfolio by user ID (Backwards compatibility / helper for primary)
 */
export async function getPortfolioByUserId(userId: string): Promise<Portfolio | null> {
  const portfolios = await getPortfoliosByUserId(userId);
  // Return the published one, or the most recent one
  return portfolios.find(p => p.is_public) || portfolios[0] || null;
}

/**
 * Save portfolio using upsert (insert or update)
 */
export async function savePortfolio(data: Partial<Portfolio>): Promise<Portfolio | null> {
  try {
    if (!data.owner_id) {
      throw new Error("owner_id is required to save portfolio");
    }

    // Filter data to only include core columns to prevent 400 errors if schema is old
    const { id, owner_id, username, full_name, bio, template_choice, profession, is_public } = data;
    const cleanData = { id, owner_id, username, full_name, bio, template_choice, profession, is_public };

    const { data: result, error } = await supabase
      .from("portfolios")
      .upsert(cleanData)
      .select()
      .single();

    if (error) {
      console.error("Error saving portfolio:", error.message, error.details, error.hint, error.code);
      return null;
    }

    return result as Portfolio;
  } catch (err) {
    console.error("Unexpected error saving portfolio:", err);
    return null;
  }
}

/**
 * Set a portfolio as the primary published one
 */
export async function publishPortfolio(portfolioId: string, userId: string): Promise<boolean> {
  try {
    // 1. Unpublish all other portfolios for this user
    await supabase
      .from("portfolios")
      .update({ is_public: false })
      .eq("owner_id", userId);

    // 2. Publish the target portfolio
    const { error } = await supabase
      .from("portfolios")
      .update({ is_public: true })
      .eq("id", portfolioId)
      .eq("owner_id", userId);

    return !error;
  } catch (err) {
    return false;
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
      console.error("Error fetching projects:", error.message, error.details, error.hint, error.code);
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
      console.error("Error creating project:", error.message, error.details, error.hint, error.code);
      return null;
    }

    return data as Project;
  } catch (err) {
    console.error("Unexpected error creating project:", err);
    return null;
  }
}
