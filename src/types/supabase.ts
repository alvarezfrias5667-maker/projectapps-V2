export interface Database {
  public: {
    Tables: {
      buyer_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company_name: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company_name?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          company_name?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      saved_evaluations: {
        Row: {
          id: string;
          user_id: string;
          report_code: string | null;
          industry: string | null;
          business_size: string | null;
          budget: string | null;
          problems_count: number;
          goals_count: number;
          summary: string | null;
          executive_context: string | null;
          selected_problems: any; // jsonb
          selected_goals: any; // jsonb
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          report_code?: string | null;
          industry?: string | null;
          business_size?: string | null;
          budget?: string | null;
          problems_count?: number;
          goals_count?: number;
          summary?: string | null;
          executive_context?: string | null;
          selected_problems?: any;
          selected_goals?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          report_code?: string | null;
          industry?: string | null;
          business_size?: string | null;
          budget?: string | null;
          problems_count?: number;
          goals_count?: number;
          summary?: string | null;
          executive_context?: string | null;
          selected_problems?: any;
          selected_goals?: any;
          created_at?: string;
        };
      };
      favorite_assets: {
        Row: {
          id: string;
          user_id: string;
          asset_id: string;
          asset_name: string;
          asset_category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          asset_id: string;
          asset_name: string;
          asset_category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          asset_id?: string;
          asset_name?: string;
          asset_category?: string | null;
          created_at?: string;
        };
      };
      acquisition_requests: {
        Row: {
          id: string;
          user_id: string;
          asset_id: string | null;
          asset_name: string;
          status: string;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          asset_id?: string | null;
          asset_name: string;
          status?: string;
          message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          asset_id?: string | null;
          asset_name?: string;
          status?: string;
          message?: string | null;
          created_at?: string;
        };
      };
      export_logs: {
        Row: {
          id: string;
          user_id: string;
          evaluation_id: string | null;
          export_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          evaluation_id?: string | null;
          export_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          evaluation_id?: string | null;
          export_type?: string;
          created_at?: string;
        };
      };
    };
  };
}

export type BuyerProfile = Database["public"]["Tables"]["buyer_profiles"]["Row"];
export type SavedEvaluation = Database["public"]["Tables"]["saved_evaluations"]["Row"];
export type FavoriteAsset = Database["public"]["Tables"]["favorite_assets"]["Row"];
export type AcquisitionRequest = Database["public"]["Tables"]["acquisition_requests"]["Row"];
export type ExportLog = Database["public"]["Tables"]["export_logs"]["Row"];
