import { supabase } from "../lib/supabaseClient";
import { ExportLog } from "../types/supabase";

export const exportService = {
  async getLogs(userId: string): Promise<ExportLog[]> {
    const { data, error } = await supabase
      .from("export_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching export logs:", error);
      return [];
    }
    return data || [];
  },

  async logExport(userId: string, evaluationId: string | null, exportType: string): Promise<ExportLog | null> {
    const payload = {
      user_id: userId,
      evaluation_id: evaluationId,
      export_type: exportType
    };

    const { data, error } = await supabase
      .from("export_logs")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      console.error("Error creating export log:", error);
      // Fail silently to avoid interrupting user flows
      return null;
    }
    return data;
  }
};
