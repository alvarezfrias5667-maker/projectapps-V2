export interface ExportManifest {
  projectName: string;
  reportId: string;
  createdDate: string;
  industry: string;
  businessSize: string;
  budget: string;
  problemsCount: number;
  goalsCount: number;
  exportTimestamp: string;
  note: string;
}

const githubClientId = (import.meta as any).env.VITE_GITHUB_CLIENT_ID || "";
const githubRedirectUri = (import.meta as any).env.VITE_GITHUB_REDIRECT_URI || "";

export const githubExportService = {
  isConfigured(): boolean {
    const isValidId = typeof githubClientId === "string" && githubClientId.length > 0 && !githubClientId.includes("your_github_client_id_here");
    const isValidUri = typeof githubRedirectUri === "string" && githubRedirectUri.length > 0 && !githubRedirectUri.includes("your_github_redirect_uri_here");
    return isValidId && isValidUri;
  },

  getAuthorizeUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: githubClientId,
      redirect_uri: githubRedirectUri,
      scope: "repo,user",
      response_type: "code",
      state: state || ""
    });
    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  },

  generateManifest(evaluation: {
    id: string;
    created_at?: string;
    industry?: string | null;
    business_size?: string | null;
    budget?: string | null;
    problems_count?: number;
    goals_count?: number;
  }): ExportManifest {
    return {
      projectName: "ProjectApps™",
      reportId: evaluation.id,
      createdDate: evaluation.created_at ? new Date(evaluation.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
      industry: evaluation.industry || "Unspecified",
      businessSize: evaluation.business_size || "Unspecified",
      budget: evaluation.budget || "Unspecified",
      problemsCount: evaluation.problems_count || 0,
      goalsCount: evaluation.goals_count || 0,
      exportTimestamp: new Date().toISOString(),
      note: "Generated for developer handoff review."
    };
  }
};
