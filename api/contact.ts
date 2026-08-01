import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);

    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`,
    });
  }

  try {
    const {
      referenceNumber,
      customerEmail,
      customerName,
      assetName,
      status,
      message,
      company,
      objective,
    } = req.body ?? {};

    const targetEmail =
      typeof customerEmail === "string"
        ? customerEmail.trim()
        : typeof req.body?.correo === "string"
          ? req.body.correo.trim()
          : "";

    const targetName =
      typeof customerName === "string" && customerName.trim()
        ? customerName.trim()
        : typeof req.body?.nombre === "string" && req.body.nombre.trim()
          ? req.body.nombre.trim()
          : "Valued Client";

    const targetAsset =
      typeof assetName === "string" && assetName.trim()
        ? assetName.trim()
        : typeof req.body?.activoInteres === "string" &&
            req.body.activoInteres.trim()
          ? req.body.activoInteres.trim()
          : typeof req.body?.categoria === "string" &&
              req.body.categoria.trim()
            ? req.body.categoria.trim()
            : "Enterprise Software Asset";

    const refNum =
      typeof referenceNumber === "string" && referenceNumber.trim()
        ? referenceNumber.trim()
        : `REF-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;

    const requestStatus =
      typeof status === "string" && status.trim()
        ? status.trim()
        : "Received and pending validation";

    if (!targetEmail || !targetEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        error: "A valid customer email address is required.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const fromAddress =
      process.env.EMAIL_FROM?.trim() ||
      "ProjectApps <notifications@projectapps.pro>";
    const contactEmailTo = process.env.CONTACT_EMAIL_TO?.trim();

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured in Vercel.");

      return res.status(500).json({
        success: false,
        error: "Server email configuration is incomplete.",
      });
    }

    if (!contactEmailTo) {
      console.error("CONTACT_EMAIL_TO is not configured in Vercel.");

      return res.status(500).json({
        success: false,
        error: "Administrative contact email is not configured.",
      });
    }

    const resend = new Resend(apiKey);

    const dateStr = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Santo_Domingo",
    }).format(new Date());

    const customerHtml = `
      <!doctype html>
      <html lang="en">
        <body style="margin:0;padding:32px;background:#f5f5f5;font-family:Arial,sans-serif;color:#171717;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;padding:32px;">
            <h1 style="margin:0 0 16px;font-size:24px;">Request received</h1>

            <p>Hello ${escapeHtml(targetName)},</p>

            <p>
              ProjectApps has received your request regarding
              <strong>${escapeHtml(targetAsset)}</strong>.
            </p>

            <div style="margin:24px 0;padding:20px;background:#fafafa;border:1px solid #e5e5e5;border-radius:8px;">
              <p style="margin:0 0 8px;">
                <strong>Reference:</strong> ${escapeHtml(refNum)}
              </p>
              <p style="margin:0 0 8px;">
                <strong>Status:</strong> ${escapeHtml(requestStatus)}
              </p>
              <p style="margin:0;">
                <strong>Date:</strong> ${escapeHtml(dateStr)}
              </p>
            </div>

            <p>
              Your information will be reviewed and we will contact you by email
              if additional details are required.
            </p>

            <p style="margin-top:32px;color:#737373;font-size:13px;">
              ProjectApps
            </p>
          </div>
        </body>
      </html>
    `;

    const customerResult = await resend.emails.send({
      from: fromAddress,
      to: [targetEmail],
      subject: `ProjectApps request received — ${refNum}`,
      html: customerHtml,
      replyTo: contactEmailTo,
    });

    if (customerResult.error) {
      console.error(
        "Resend customer email error:",
        customerResult.error
      );

      return res.status(500).json({
        success: false,
        customerEmailSent: false,
        adminEmailSent: false,
        error:
          customerResult.error.message ||
          "Customer confirmation email could not be sent.",
      });
    }

    const adminHtml = `
      <!doctype html>
      <html lang="en">
        <body style="font-family:Arial,sans-serif;color:#171717;">
          <h2>New ProjectApps request</h2>

          <ul>
            <li><strong>Reference:</strong> ${escapeHtml(refNum)}</li>
            <li><strong>Name:</strong> ${escapeHtml(targetName)}</li>
            <li><strong>Company:</strong> ${escapeHtml(company || "N/A")}</li>
            <li><strong>Email:</strong> ${escapeHtml(targetEmail)}</li>
            <li><strong>Asset:</strong> ${escapeHtml(targetAsset)}</li>
            <li><strong>Objective:</strong> ${escapeHtml(objective || "N/A")}</li>
            <li><strong>Message:</strong> ${escapeHtml(message || "N/A")}</li>
          </ul>
        </body>
      </html>
    `;

    const adminResult = await resend.emails.send({
      from: fromAddress,
      to: [contactEmailTo],
      subject: `New ProjectApps request — ${refNum}`,
      html: adminHtml,
      replyTo: targetEmail,
    });

    if (adminResult.error) {
      console.error("Resend admin email error:", adminResult.error);

      return res.status(500).json({
        success: false,
        customerEmailSent: true,
        adminEmailSent: false,
        providerId: customerResult.data?.id ?? null,
        referenceNumber: refNum,
        error:
          adminResult.error.message ||
          "Administrative notification could not be sent.",
      });
    }

    return res.status(200).json({
      success: true,
      customerEmailSent: true,
      adminEmailSent: true,
      providerId: customerResult.data?.id ?? null,
      adminProviderId: adminResult.data?.id ?? null,
      referenceNumber: refNum,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";

    console.error("Unhandled /api/contact error:", error);

    return res.status(500).json({
      success: false,
      customerEmailSent: false,
      adminEmailSent: false,
      error: message,
    });
  }
}
