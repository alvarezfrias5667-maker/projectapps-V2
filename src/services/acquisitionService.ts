import { supabase } from "../lib/supabaseClient";
import { AcquisitionRequest } from "../types/supabase";

interface RequestNotificationData {
  customerName: string;
  customerEmail: string;
  companyName?: string;
}

interface EmailApiResponse {
  success: boolean;
  providerId?: string;
  message?: string;
}

async function postEmailNotification(
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<EmailApiResponse> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as EmailApiResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Email notification failed.");
  }

  return result;
}

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

  async createRequest(
    userId: string,
    assetId: string | null,
    assetName: string,
    message = "",
    notificationData?: RequestNotificationData,
  ): Promise<AcquisitionRequest> {
    const payload = {
      user_id: userId,
      asset_id: assetId,
      asset_name: assetName,
      status: "availability_requested",
      message,
      notification_status: "pending",
      email_sent_at: null,
      provider_id: null,
      error_message: null,
    };

    const { data: createdRequest, error: insertError } = await supabase
      .from("acquisition_requests")
      .insert(payload)
      .select("*")
      .single();

    if (insertError || !createdRequest) {
      console.error("Error creating acquisition request:", insertError);
      throw insertError || new Error("The acquisition request was not created.");
    }

    if (!notificationData?.customerEmail) {
      const errorMessage =
        "The request was saved, but no customer email was provided.";

      await supabase
        .from("acquisition_requests")
        .update({
          notification_status: "failed",
          error_message: errorMessage,
        })
        .eq("id", createdRequest.id);

      console.error(errorMessage);
      return createdRequest;
    }

    const emailPayload = {
      requestId: createdRequest.id,
      customerName: notificationData.customerName,
      customerEmail: notificationData.customerEmail,
      companyName: notificationData.companyName || "",
      assetName,
      message,
      requestDate: createdRequest.created_at,
    };

    try {
      const customerResult = await postEmailNotification(
        "/api/send-customer-confirmation",
        emailPayload,
      );

      await supabase
        .from("acquisition_requests")
        .update({
          notification_status: "sent",
          email_sent_at: new Date().toISOString(),
          provider_id: customerResult.providerId || null,
          error_message: null,
        })
        .eq("id", createdRequest.id);

      // La notificación interna no debe invalidar el correo recibido por el cliente.
      try {
        await postEmailNotification(
          "/api/send-admin-notification",
          emailPayload,
        );
      } catch (adminEmailError) {
        console.error(
          "The customer email was sent, but the admin notification failed:",
          adminEmailError,
        );
      }
    } catch (customerEmailError) {
      const errorMessage =
        customerEmailError instanceof Error
          ? customerEmailError.message
          : "Unknown email notification error.";

      await supabase
        .from("acquisition_requests")
        .update({
          notification_status: "failed",
          email_sent_at: null,
          provider_id: null,
          error_message: errorMessage,
        })
        .eq("id", createdRequest.id);

      console.error(
        "Request saved, but customer confirmation email failed:",
        customerEmailError,
      );
    }

    return createdRequest;
  },
};
