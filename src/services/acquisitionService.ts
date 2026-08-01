import { supabase } from "../lib/supabaseClient";
import type { AcquisitionRequest } from "../types/supabase";

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

    return (data ?? []) as AcquisitionRequest[];
  },

  async createRequest(
    userId: string,
    assetId: string | null,
    assetName: string,
    message = "",
    _customerEmailOrLegacyData?: string | Record<string, unknown>,
    _customerName?: string,
  ): Promise<AcquisitionRequest> {
    const payload = {
      user_id: userId,
      asset_id: assetId,
      asset_name: assetName,
      status: "availability_requested",
      message,
    };

    const { data: createdRequest, error } = await supabase
      .from("acquisition_requests")
      .insert(payload)
      .select("*")
      .single();

    if (error || !createdRequest) {
      console.error("Error creating acquisition request:", error);

      throw (
        error ||
        new Error("The acquisition request could not be created.")
      );
    }

    return createdRequest as AcquisitionRequest;
  },
};
