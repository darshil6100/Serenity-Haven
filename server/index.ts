// ── Brevo REST API — browser-safe, no SDK needed ──────────────────────────────
//
// Mirrors the same pattern used in emailService.ts.
// No backend, no express — calls Brevo's v3 REST endpoint directly
// from the browser using the native fetch API.

const BREVO_SEND_URL = 'https://api.brevo.com/v3/smtp/email';

async function brevoSend(payload: object): Promise<{ messageId?: string }> {
  const apiKey = import.meta.env.VITE_BREVO_API_KEY as string | undefined;
  if (!apiKey) throw new Error('VITE_BREVO_API_KEY is not configured');

  const res = await fetch(BREVO_SEND_URL, {
    method:  'POST',
    headers: {
      'accept':       'application/json',
      'content-type': 'application/json',
      'api-key':      apiKey,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({})) as Record<string, unknown>;

  if (!res.ok) {
    throw new Error(
      (data.message as string) ?? `Brevo error ${res.status}: ${res.statusText}`,
    );
  }

  return data as { messageId?: string };
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ContactFormData {
  name:             string;
  email:            string;
  phone:            string;
  package_interest: string;
  message:          string;
}

export interface ContactSendResult {
  success:    boolean;
  messageId?: string;
  error?:     string;
}

// ── Email HTML builders ───────────────────────────────────────────────────────

function buildNotificationHtml(data: ContactFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c5aa0; border-bottom: 3px solid #2c5aa0; padding-bottom: 10px;">
        New Query from Serenity Haven
      </h2>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Package Interest:</strong> ${data.package_interest || 'Not specified'}</p>
      </div>
      <div style="margin: 20px 0;">
        <h3 style="color: #2c5aa0;">Message:</h3>
        <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2c5aa0; line-height: 1.6;">
          ${data.message}
        </p>
      </div>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
      <p style="color: #666; font-size: 12px;">
        <em>Submitted at: ${new Date().toLocaleString()}</em>
      </p>
    </div>
  `;
}

function buildConfirmationHtml(name: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #7a9b74, #c9a96e); padding: 32px 36px; border-radius: 12px 12px 0 0;">
        <div style="color: #fff; font-size: 22px; font-weight: 800;">Serenity Haven</div>
        <div style="color: rgba(255,255,255,0.85); font-size: 13px; margin-top: 4px;">Your wellness journey begins here</div>
      </div>
      <div style="padding: 32px 36px; background: #fffdf8; border: 1px solid #e8d5b0; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 18px; color: #2d3e26; font-weight: 600;">Dear ${name},</p>
        <p style="color: #4a5e42; line-height: 1.7;">
          Thank you for reaching out to Serenity Haven. We have received your query and one of our wellness experts will get back to you shortly.
        </p>
        <p style="color: #4a5e42; line-height: 1.7;">
          In the meantime, we invite you to explore our retreat packages and begin envisioning your path to wellbeing.
        </p>
        <p style="color: #7a9b74; font-style: italic; margin-top: 24px;">
          With warmth &amp; care,<br />
          <strong style="color: #2d3e26;">The Serenity Haven Team</strong>
        </p>
        <hr style="border: none; border-top: 1px solid #e8d5b0; margin: 24px 0;" />
        <p style="color: #b0a090; font-size: 11px; text-align: center;">
          &copy; ${new Date().getFullYear()} Serenity Haven &middot; serenityhavensupport@gmail.com
        </p>
      </div>
    </div>
  `;
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function sendContactEmail(data: ContactFormData): Promise<ContactSendResult> {
  const senderEmail    = import.meta.env.VITE_EMAIL_USER     as string | undefined;
  const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL as string | undefined;

  if (!senderEmail)    return { success: false, error: 'VITE_EMAIL_USER is not configured' };
  if (!recipientEmail) return { success: false, error: 'VITE_RECIPIENT_EMAIL is not configured' };

  try {
    // 1. Notify the business owner
    const { messageId } = await brevoSend({
      to:          [{ email: recipientEmail }],
      replyTo:     { email: data.email, name: data.name },
      sender:      { name: 'Serenity Haven', email: senderEmail },
      subject:     `New Query: ${data.name} — ${data.package_interest || 'General Inquiry'}`,
      htmlContent: buildNotificationHtml(data),
    });

    // 2. Auto-confirmation to the visitor
    await brevoSend({
      to:          [{ email: data.email, name: data.name }],
      sender:      { name: 'Serenity Haven', email: senderEmail },
      subject:     'We received your query — Serenity Haven',
      htmlContent: buildConfirmationHtml(data.name),
    });

    return { success: true, messageId };

  } catch (err: unknown) {
    console.error('Contact email send error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Failed to send email' };
  }
}