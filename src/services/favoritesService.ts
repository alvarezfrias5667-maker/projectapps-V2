import { supabase } from "../lib/supabaseClient";
import { FavoriteAsset } from "../types/supabase";

export const favoritesService = {
  async getFavorites(userId: string): Promise<FavoriteAsset[]> {
    const { data, error } = await supabase
      .from("favorite_assets")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching favorite assets:", error);
      return [];
    }
    return data || [];
  },

  async addFavorite(userId: string, assetId: string, assetName: string, assetCategory?: string): Promise<FavoriteAsset | null> {
    const payload = {
      user_id: userId,
      asset_id: assetId,
      asset_name: assetName,
      asset_category: assetCategory || "Uncategorized"
    };

    const { data, error } = await supabase
      .from("favorite_assets")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      console.error("Error adding favorite asset:", error);
      throw error;
    }
    return data;
  },

  async removeFavorite(userId: string, assetId: string): Promise<void> {
    const { error } = await supabase
      .from("favorite_assets")
      .delete()
      .eq("user_id", userId)
      .eq("asset_id", assetId);

    if (error) {
      console.error("Error removing favorite asset:", error);
      throw error;
    }
  }
};
