export interface SendEmailResult {
  success: boolean;
  providerId?: string;
  referenceNumber?: string;
  errorMessage?: string;
}

export const emailService = {
  /**
   * Sends a contact request / confirmation email via the secure Vercel Serverless Function (/api/contact).
   * Secrets like RESEND_API_KEY are kept safely on the server and never exposed to the client bundle.
   */
  async sendConfirmationEmail(params: {
    referenceNumber?: string;
    customerEmail: string;
    customerName: string;
    assetName: string;
    status?: string;
    message?: string;
    company?: string;
    objective?: string;
  }): Promise<SendEmailResult> {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referenceNumber: params.referenceNumber,
          customerEmail: params.customerEmail,
          customerName: params.customerName,
          assetName: params.assetName,
          status: params.status || "Recibida y pendiente de validación",
          message: params.message,
          company: params.company,
          objective: params.objective,
        }),
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok || responseData.success === false) {
        const errorMsg =
          responseData.error ||
          `Server returned HTTP ${response.status}: ${response.statusText}`;
        return {
          success: false,
          errorMessage: errorMsg,
        };
      }

      return {
        success: true,
        providerId: responseData.providerId,
        referenceNumber: responseData.referenceNumber,
      };
    } catch (err: any) {
      console.error("ProjectApps™ Client Email Service Error:", err);
      return {
        success: false,
        errorMessage:
          err.message || "Network error while connecting to secure contact API.",
      };
    }
  },
};
