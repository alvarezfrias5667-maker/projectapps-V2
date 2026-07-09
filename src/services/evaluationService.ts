import { supabase } from "../lib/supabaseClient";
import { SavedEvaluation } from "../types/supabase";

export const evaluationService = {
  async getEvaluations(userId: string): Promise<SavedEvaluation[]> {
    const { data, error } = await supabase
      .from("saved_evaluations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching evaluations from Supabase:", error);
      return [];
    }
    return data || [];
  },

  async saveEvaluation(userId: string, evaluation: {
    report_code?: string;
    industry?: string;
    business_size?: string;
    budget?: string;
    problems_count?: number;
    goals_count?: number;
    summary?: string;
    executive_context?: string;
    selected_problems?: string[];
    selected_goals?: string[];
  }): Promise<SavedEvaluation | null> {
    const payload = {
      user_id: userId,
      report_code: evaluation.report_code || `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      industry: evaluation.industry,
      business_size: evaluation.business_size,
      budget: evaluation.budget,
      problems_count: evaluation.problems_count || 0,
      goals_count: evaluation.goals_count || 0,
      summary: evaluation.summary,
      executive_context: evaluation.executive_context,
      selected_problems: evaluation.selected_problems || [],
      selected_goals: evaluation.selected_goals || []
    };

    const { data, error } = await supabase
      .from("saved_evaluations")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      console.error("Error inserting evaluation into Supabase:", error);
      throw error;
    }
    return data;
  },

  async deleteEvaluation(userId: string, id: string): Promise<void> {
    const { error } = await supabase
      .from("saved_evaluations")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting evaluation from Supabase:", error);
      throw error;
    }
  }
};
