import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { getCustomerConfirmationTemplate } from "../src/services/emailTemplates.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
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
    } = req.body || {};

    const targetEmail = customerEmail || req.body?.correo;
    const targetName = customerName || req.body?.nombre || "Valued Client";
    const targetAsset = assetName || req.body?.activoInteres || req.body?.categoria || "Enterprise Software Asset";
    const refNum = referenceNumber || `REF-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const requestStatus = status || "Recibida y pendiente de validación";

    if (!targetEmail || typeof targetEmail !== "string" || !targetEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        error: "Valid customer email address is required.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      console.error("Vercel Serverless Function error: RESEND_API_KEY environment variable is not configured.");
      return res.status(500).json({
        success: false,
        error: "Server email configuration missing: RESEND_API_KEY is not set on Vercel.",
      });
    }

    const fromAddress = process.env.EMAIL_FROM || "ProjectApps™ <notifications@projectapps.pro>";
    const contactEmailTo = process.env.CONTACT_EMAIL_TO;

    const resend = new Resend(apiKey.trim());

    const dateStr = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    const htmlContent = getCustomerConfirmationTemplate({
      referenceNumber: refNum,
      customerName: targetName,
      assetName: targetAsset,
      date: dateStr,
      status: requestStatus,
    });

    // Send customer confirmation email
    const { data: emailData, error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: [targetEmail],
      subject: `Confirmación de Solicitud de Disponibilidad [Ref: ${refNum}]`,
      html: htmlContent,
    });

    if (sendError) {
      console.error("Resend API error sending customer email:", sendError);
      return res.status(500).json({
        success: false,
        error: sendError.message || "Failed to dispatch email via Resend API.",
      });
    }

    // Optionally send internal admin notification if CONTACT_EMAIL_TO is configured
    if (contactEmailTo && contactEmailTo.trim() !== "") {
      try {
        await resend.emails.send({
          from: fromAddress,
          to: [contactEmailTo.trim()],
          subject: `[Internal Notification] New Availability Request: ${targetAsset} (${refNum})`,
          html: `<p><strong>New Request Received</strong></p>
                 <ul>
                   <li><strong>Ref:</strong> ${refNum}</li>
                   <li><strong>Name:</strong> ${targetName}</li>
                   <li><strong>Company:</strong> ${company || "N/A"}</li>
                   <li><strong>Email:</strong> ${targetEmail}</li>
                   <li><strong>Asset:</strong> ${targetAsset}</li>
                   <li><strong>Business Objective:</strong> ${objective || "N/A"}</li>
                   <li><strong>Message:</strong> ${message || "N/A"}</li>
                 </ul>`,
        });
      } catch (internalErr) {
        console.error("Warning: Failed to send internal notification copy:", internalErr);
      }
    }

    return res.status(200).json({
      success: true,
      providerId: emailData?.id || null,
      referenceNumber: refNum,
    });
  } catch (err: any) {
    console.error("Unhandled error in /api/contact handler:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "An unexpected server error occurred.",
    });
  }
}
