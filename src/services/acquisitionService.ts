import { supabase } from "../lib/supabaseClient";
import { AcquisitionRequest } from "../types/supabase";

export const acquisitionService = {
  async getRequests(userId: string): Promise<AcquisitionRequest[]> {
    const { data, error } = await supabase
      .from("acquisition_requests")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching acquisition requests:", error);
      return [];
    }
    return data || [];
  },

  async createRequest(userId: string, assetId: string | null, assetName: string, message?: string): Promise<AcquisitionRequest | null> {
    const payload = {
      user_id: userId,
      asset_id: assetId,
      asset_name: assetName,
      status: "availability_requested",
      message: message || ""
    };

    const { data, error } = await supabase
      .from("acquisition_requests")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      console.error("Error creating acquisition request:", error);
      throw error;
    }
    return data;
  }
};
