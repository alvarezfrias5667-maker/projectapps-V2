import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

interface AdminNotificationBody {
  requestId?: string;
}

interface AcquisitionRequest {
  id: string;
  user_id: string;
  asset_name: string | null;
  status: string | null;
  message: string | null;
  created_at: string;
}

const jsonResponse = (
  body: Record<string, unknown>,
  status: number,
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return jsonResponse(
        { success: false, message: "Method not allowed." },
        405,
      );
    }

    try {
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = Number(process.env.SMTP_PORT ?? "465");
      const smtpUser = process.env.SMTP_USER;
      const smtpPassword = process.env.SMTP_PASSWORD;
      const emailFrom = process.env.EMAIL_FROM;
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
      const supabaseUrl = process.env.SUPABASE_URL;
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (
        !smtpHost ||
        !smtpUser ||
        !smtpPassword ||
        !emailFrom ||
        !adminEmail ||
        !supabaseUrl ||
        !serviceRoleKey
      ) {
        console.error("Missing required server environment variables.");

        return jsonResponse(
          {
            success: false,
            message: "Email service is not configured.",
          },
          500,
        );
      }

      if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
        return jsonResponse(
          {
            success: false,
            message: "Invalid SMTP configuration.",
          },
          500,
        );
      }

      const body = (await request.json()) as AdminNotificationBody;
      const requestId = body.requestId?.trim();

      if (!requestId) {
        return jsonResponse(
          {
            success: false,
            message: "Request ID is required.",
          },
          400,
        );
      }

      /*
       * The server retrieves the real request from Supabase.
       * It does not trust customer details supplied by the browser.
       */
      const supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });

      const { data, error: requestError } = await supabase
        .from("acquisition_requests")
        .select("id, user_id, asset_name, status, message, created_at")
        .eq("id", requestId)
        .single<AcquisitionRequest>();

      if (requestError || !data) {
        console.error("Acquisition request lookup failed:", requestError);

        return jsonResponse(
          {
            success: false,
            message: "Acquisition request was not found.",
          },
          404,
        );
      }

      const { data: userData, error: userError } =
        await supabase.auth.admin.getUserById(data.user_id);

      if (userError) {
        console.error("User lookup failed:", userError);
      }

      const customerEmail = userData?.user?.email ?? "Not available";
      const assetName = data.asset_name ?? "Not specified";
      const status = data.status ?? "availability_requested";
      const submittedAt = new Date(data.created_at).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
      });

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
      });

      await transporter.verify();

      const emailResult = await transporter.sendMail({
        from: emailFrom,
        to: adminEmail,
        replyTo:
          customerEmail !== "Not available" ? customerEmail : undefined,
        subject: `[ProjectApps™] New acquisition request — ${requestId}`,
        text: [
          "A new ProjectApps™ acquisition request has been registered.",
          "",
          `Reference: ${data.id}`,
          `Customer email: ${customerEmail}`,
          `Requested asset: ${assetName}`,
          `Status: ${status}`,
          `Submitted: ${submittedAt} UTC`,
          "",
          "Customer information:",
          data.message ?? "No additional information supplied.",
        ].join("\n"),
        html: `
          <div style="max-width:680px;margin:0 auto;padding:32px;
                      font-family:Arial,sans-serif;color:#111827;">
            <h1 style="margin:0 0 8px;font-size:24px;">
              New acquisition request
            </h1>

            <p style="margin:0 0 28px;color:#6b7280;">
              A new request has been registered in ProjectApps™.
            </p>

            <table role="presentation"
                   style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px;border-bottom:1px solid #e5e7eb;
                           font-weight:700;">Reference</td>
                <td style="padding:10px;border-bottom:1px solid #e5e7eb;">
                  ${escapeHtml(data.id)}
                </td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #e5e7eb;
                           font-weight:700;">Customer email</td>
                <td style="padding:10px;border-bottom:1px solid #e5e7eb;">
                  ${escapeHtml(customerEmail)}
                </td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #e5e7eb;
                           font-weight:700;">Requested asset</td>
                <td style="padding:10px;border-bottom:1px solid #e5e7eb;">
                  ${escapeHtml(assetName)}
                </td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #e5e7eb;
                           font-weight:700;">Status</td>
                <td style="padding:10px;border-bottom:1px solid #e5e7eb;">
                  ${escapeHtml(status)}
                </td>
              </tr>
              <tr>
                <td style="padding:10px;font-weight:700;">Submitted</td>
                <td style="padding:10px;">
                  ${escapeHtml(submittedAt)} UTC
                </td>
              </tr>
            </table>

            <div style="margin-top:28px;padding:20px;background:#f8fafc;
                        border:1px solid #e5e7eb;border-radius:10px;">
              <strong>Customer information</strong>
              <p style="white-space:pre-wrap;margin:12px 0 0;line-height:1.6;">
                ${escapeHtml(
                  data.message ?? "No additional information supplied.",
                )}
              </p>
            </div>
          </div>
        `,
      });

      return jsonResponse(
        {
          success: true,
          providerId: emailResult.messageId,
        },
        200,
      );
    } catch (error) {
      console.error("Admin notification failed:", error);

      return jsonResponse(
        {
          success: false,
          message: "Unable to send the administrator notification.",
        },
        500,
      );
    }
  },
};
