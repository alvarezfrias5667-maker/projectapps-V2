import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed."
    });
  }

  try {

    const {
      customerName,
      customerEmail,
      assetName,
      requestId,
      requestDate
    } = req.body;


    //------------SMTP HOSTINGER---------------//

    const transporter = nodemailer.createTransport({

      host: process.env.SMTP_HOST,

      port: Number(process.env.SMTP_PORT),

      secure: true,

      auth: {

        user: process.env.SMTP_USER,

        pass: process.env.SMTP_PASSWORD

      }

    });


    //------------EMAIL TEMPLATE---------------//

    const htmlTemplate = `

    <div style="font-family:Arial,sans-serif;
    max-width:700px;
    margin:auto;
    padding:30px;
    border:1px solid #e5e5e5;
    border-radius:12px;">

    <h2>
    ProjectApps™
    </h2>

    <h3>
    Request Successfully Received
    </h3>

    <p>
    Dear ${customerName},
    </p>

    <p>
    We have successfully received your asset availability request.
    </p>

    <br>

    <b>Reference Number</b><br>
    ${requestId}

    <br><br>

    <b>Requested Asset</b><br>
    ${assetName}

    <br><br>

    <b>Date</b><br>
    ${requestDate}

    <br><br>

    <b>Current Status</b><br>
    Availability Requested

    <br><br>

    Our technical acquisition team will review the
    commercial compatibility details provided and
    contact you within approximately 24-48 business
    hours when applicable.

    <br><br>

    This confirmation does not guarantee availability,
    licensing, pricing approval or asset transfer.

    <br><br>

    Thank you for choosing ProjectApps™.

    </div>

    `;


    //----------------SEND EMAIL----------------//

    const result = await transporter.sendMail({

      from: process.env.EMAIL_FROM,

      to: customerEmail,

      subject:
      `[ProjectApps™] Request Received - Ref: ${requestId}`,

      html: htmlTemplate

    });


    return res.status(200).json({

      success: true,

      providerId: result.messageId

    });


  } catch (error: any) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

}
