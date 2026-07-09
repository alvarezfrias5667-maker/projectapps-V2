import { supabase } from "../lib/supabaseClient";
import { BuyerProfile } from "../types/supabase";

export const buyerService = {
  async getProfile(userId: string): Promise<BuyerProfile | null> {
    const { data, error } = await supabase
      .from("buyer_profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching buyer profile:", error);
      return null;
    }
    return data;
  },

  async ensureProfile(userId: string, email: string, fullName?: string, companyName?: string): Promise<BuyerProfile | null> {
    const existing = await this.getProfile(userId);
    if (existing) return existing;

    const newProfile = {
      id: userId,
      email,
      full_name: fullName || email.split("@")[0],
      company_name: companyName || "Simulated Enterprise",
      role: "buyer"
    };

    const { data, error } = await supabase
      .from("buyer_profiles")
      .insert(newProfile)
      .select("*")
      .single();

    if (error) {
      console.error("Error creating buyer profile:", error);
      // Fallback: create mock profile or try once more
      return null;
    }
    return data;
  },

  async updateProfile(userId: string, updates: Partial<Omit<BuyerProfile, "id" | "email" | "created_at" | "updated_at">>): Promise<BuyerProfile | null> {
    const { data, error } = await supabase
      .from("buyer_profiles")
      .update(updates)
      .eq("id", userId)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating buyer profile:", error);
      throw error;
    }
    return data;
  }
};
