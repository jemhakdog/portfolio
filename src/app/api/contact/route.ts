import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate name
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    // Validate email
    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Validate message
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 100 || message.length > 4000) {
      return NextResponse.json(
        { error: "Input exceeds allowed character limits." },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL;
    const emailPass = process.env.APP_PASSWORD;

    if (!emailUser || !emailPass) {
      console.error("Missing EMAIL or APP_PASSWORD in environment variables.");
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeMessage = message.trim();

    await transporter.sendMail({
      from: `"${safeName} (Portfolio)" <${emailUser}>`,
      to: emailUser,
      replyTo: safeEmail,
      subject: `Project Inquiry / Direct Brief: ${safeName}`,
      text: `New direct brief received from portfolio contact form:\n\nName: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}\n`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">
          <h2 style="margin-top: 0; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">New Direct Brief Received</h2>
          <p style="margin: 16px 0 8px 0; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Sender Details</p>
          <ul style="list-style: none; padding: 0; margin: 0 0 16px 0; font-size: 15px;">
            <li style="margin-bottom: 6px;"><strong>Name:</strong> ${safeName.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</li>
            <li style="margin-bottom: 6px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a></li>
          </ul>
          <p style="margin: 16px 0 8px 0; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Project Brief</p>
          <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${safeMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
          <hr style="margin: 24px 0 16px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">Sent directly from Jem Carlo Austria's Portfolio Contact Form.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Direct brief sent successfully!",
    });
  } catch (error: unknown) {
    console.error("Error sending contact email:", error);
    const errMessage =
      error instanceof Error ? error.message : "Failed to dispatch email.";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
