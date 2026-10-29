// POST /api/contact — Vercel serverless function.
//
// Sends the enquiry to the business inbox and a confirmation to the visitor via
// Brevo's transactional email API. The API key only ever lives on the server.
//
// Required environment variables (Vercel → Project → Settings → Environment Variables,
// or a local `.env` file for `npm run dev`):
//   BREVO_API_KEY    Brevo v3 API key (starts with "xkeysib-")
//   EMAIL_USER       Sender address — must be a verified sender in Brevo
//   RECIPIENT_EMAIL  Inbox that receives new enquiries
//
// This file has no relative imports on purpose, so Vercel can bundle it as-is.
// `vite.config.ts` reuses `handleContact` to serve the same endpoint in dev.

const BREVO_SEND_URL = 'https://api.brevo.com/v3/smtp/email';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  package_interest: string;
  message: string;
}

export interface ContactEnv {
  BREVO_API_KEY?: string;
  EMAIL_USER?: string;
  RECIPIENT_EMAIL?: string;
}

export interface ContactResponse {
  status: number;
  body: { success: boolean; error?: string; fields?: Partial<Record<keyof ContactPayload, string>> };
}

const LIMITS: Record<keyof ContactPayload, number> = {
  name: 120,
  email: 200,
  phone: 30,
  package_interest: 120,
  message: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validate(input: unknown) {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const data = {} as ContactPayload;
  const fields: Partial<Record<keyof ContactPayload, string>> = {};

  for (const key of Object.keys(LIMITS) as (keyof ContactPayload)[]) {
    const value = typeof raw[key] === 'string' ? (raw[key] as string).trim() : '';
    data[key] = value;
    if (value.length > LIMITS[key]) fields[key] = 'Too long';
  }

  if (!data.name) fields.name = 'Please enter your name';
  if (!EMAIL_RE.test(data.email)) fields.email = 'Please enter a valid email address';
  if (!PHONE_RE.test(data.phone)) fields.phone = 'Please enter a valid phone number';
  if (data.message.length < 5) fields.message = 'Please tell us a little more';

  // Honeypot: a hidden field real visitors never fill in.
  const isBot = typeof raw.company === 'string' && raw.company.trim() !== '';

  return { data, fields, isBot };
}

async function brevoSend(apiKey: string, payload: object) {
  const res = await fetch(BREVO_SEND_URL, {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json', 'api-key': apiKey },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Brevo ${res.status}: ${detail}`);
  }
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;color:#7a9b74;font-size:11px;letter-spacing:.14em;text-transform:uppercase;width:150px;vertical-align:top">${label}</td>
    <td style="padding:10px 0;color:#2d3e26;font-size:15px">${value}</td>
  </tr>`;
}

function shell(content: string) {
  return `<div style="background:#f0e8d4;padding:32px 16px;font-family:Georgia,'Times New Roman',serif">
  <div style="max-width:600px;margin:0 auto;background:#fffdf8;border:1px solid #e8d5b0;border-radius:14px;overflow:hidden">
    <div style="background:#1a2419;padding:28px 32px">
      <div style="color:#d9bc85;font-size:11px;letter-spacing:.45em;text-transform:uppercase">The</div>
      <div style="color:#faf3e3;font-size:26px;letter-spacing:.08em;text-transform:uppercase">Serenity Haven</div>
    </div>
    <div style="padding:32px;font-family:Arial,Helvetica,sans-serif">${content}</div>
  </div>
  <p style="text-align:center;color:#8a7a5e;font-size:11px;font-family:Arial,sans-serif;margin-top:16px">
    &copy; ${new Date().getFullYear()} The Serenity Haven &middot; serenityhavensupport@gmail.com
  </p>
</div>`;
}

function notificationHtml(d: ContactPayload) {
  const email = escapeHtml(d.email);
  const phone = escapeHtml(d.phone);
  return shell(`
    <h2 style="margin:0 0 18px;color:#2d3e26;font-family:Georgia,serif;font-weight:normal;font-size:22px">New enquiry from the website</h2>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #efe4cc;border-bottom:1px solid #efe4cc">
      ${row('Name', escapeHtml(d.name))}
      ${row('Email', `<a href="mailto:${email}" style="color:#8a6a2f">${email}</a>`)}
      ${row('Phone', `<a href="tel:${phone.replace(/[^\d+]/g, '')}" style="color:#8a6a2f">${phone}</a>`)}
      ${row('Package', escapeHtml(d.package_interest || 'Not specified'))}
    </table>
    <p style="margin:22px 0 8px;color:#7a9b74;font-size:11px;letter-spacing:.14em;text-transform:uppercase">Message</p>
    <div style="white-space:pre-wrap;color:#2d3e26;font-size:15px;line-height:1.65;background:#faf7f0;border-left:3px solid #c9a96e;padding:14px 16px;border-radius:4px">${escapeHtml(d.message)}</div>
    <p style="margin-top:22px;color:#8a7a5e;font-size:12px">Reply to this email to respond directly to ${escapeHtml(d.name)}.</p>
  `);
}

function confirmationHtml(d: ContactPayload) {
  return shell(`
    <p style="font-size:18px;color:#2d3e26;margin:0 0 14px">Dear ${escapeHtml(d.name)},</p>
    <p style="color:#4a5e42;line-height:1.75;font-size:15px">
      Thank you for reaching out to The Serenity Haven. We've received your enquiry${
        d.package_interest ? ` about <strong>${escapeHtml(d.package_interest)}</strong>` : ''
      } and one of our wellness experts will get back to you within one business day.
    </p>
    <p style="color:#4a5e42;line-height:1.75;font-size:15px">
      If it's urgent, you can call us on <a href="tel:+919974542678" style="color:#8a6a2f">+91 99745 42678</a>.
    </p>
    <p style="color:#7a9b74;font-style:italic;margin-top:26px;font-family:Georgia,serif;font-size:16px">
      With warmth &amp; care,<br /><span style="color:#2d3e26;font-style:normal">The Serenity Haven Team</span>
    </p>
  `);
}

export async function handleContact(input: unknown, env: ContactEnv): Promise<ContactResponse> {
  const { data, fields, isBot } = validate(input);

  if (isBot) return { status: 200, body: { success: true } };
  if (Object.keys(fields).length > 0) {
    return { status: 400, body: { success: false, error: 'Please check the highlighted fields.', fields } };
  }

  const { BREVO_API_KEY, EMAIL_USER, RECIPIENT_EMAIL } = env;
  if (!BREVO_API_KEY || !EMAIL_USER || !RECIPIENT_EMAIL) {
    console.error('[contact] Missing BREVO_API_KEY, EMAIL_USER or RECIPIENT_EMAIL');
    return { status: 500, body: { success: false, error: 'Our enquiry service is temporarily unavailable.' } };
  }

  const sender = { name: 'The Serenity Haven', email: EMAIL_USER };

  try {
    await brevoSend(BREVO_API_KEY, {
      sender,
      to: [{ email: RECIPIENT_EMAIL }],
      replyTo: { email: data.email, name: data.name },
      subject: `New enquiry: ${data.name} — ${data.package_interest || 'General'}`,
      htmlContent: notificationHtml(data),
    });
  } catch (err) {
    console.error('[contact] Failed to send notification:', err);
    return { status: 502, body: { success: false, error: 'We could not send your message right now.' } };
  }

  // The enquiry is already delivered; a failed confirmation shouldn't fail the request.
  try {
    await brevoSend(BREVO_API_KEY, {
      sender,
      to: [{ email: data.email, name: data.name }],
      subject: 'We received your enquiry — The Serenity Haven',
      htmlContent: confirmationHtml(data),
    });
  } catch (err) {
    console.error('[contact] Failed to send confirmation:', err);
  }

  return { status: 200, body: { success: true } };
}

// Minimal shapes of Vercel's Node request/response, to avoid an extra dependency.
interface VercelRequest {
  method?: string;
  body?: unknown;
}
interface VercelResponse {
  status(code: number): VercelResponse;
  setHeader(name: string, value: string): void;
  json(body: unknown): void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const result = await handleContact(body, process.env as ContactEnv);
  res.status(result.status).json(result.body);
}
